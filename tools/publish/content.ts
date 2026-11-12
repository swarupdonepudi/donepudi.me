// The publisher's whole job, as pure functions over the repository: it reads the Markdown under content/ (the
// posts in content/blog/ and the talks in content/talks/<talk>/index.md) and returns every file it makes under
// site/, by its path there. The posts and their index at /blog/, the talks and their index at /talks/, the
// sitemap, robots.txt, and the home page with its "Writing" list rewritten between its two markers. Nothing here
// writes a file or reads a clock: tools/publish/run.ts writes what this returns, and its --check (and the tests)
// compares it with what is committed, so site/ is never stale against content/.
//
// Addresses are the ones the old site gave each file, kept exactly so every link anyone saved still lands: the
// date comes off a post's file name, a talk keeps its folder's name, and punctuation is dropped (`slugFor`).
// Markdown becomes HTML by a small renderer for what the posts use (headings, paragraphs, lists, quotes, fenced
// code highlighted at build time by highlight.ts, rules, images with captions, links, bold, italic, inline code and
// keycaps, pipe tables, callouts, a prompt card, and embeds from content/blog/embeds/) and the one tag they add,
// <youtube>, drawn as a link card that loads nothing from YouTube. Every other piece of HTML in a post is refused, and every word is escaped,
// so nothing in a post becomes markup the page didn't intend. Images are the WebP copies under
// site/blog/images/ (each post's cover also has a 1200×627 JPEG there for link previews); a post naming one that
// isn't there fails the build.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { escape } from "./escape.ts";
import { highlightLines, isShell, languageLabel } from "./highlight.ts";

export const ORIGIN = "https://donepudi.me";
const HOME_START = "<!-- writing:start -->";
const HOME_END = "<!-- writing:end -->";

export type Kind = "blog" | "talks";
export type Entry = {
  kind: Kind;
  source: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover: string | null;
  body: string;
  meta: Record<string, string>;
};

/** The old site's address rule, kept exactly (src/lib/content.ts before the rebuild). */
export function slugFor(path: string): string {
  const stripDate = path.includes("/blog/");
  const name = basename(path, extname(path));
  const raw = name === "index" || name === "README" ? basename(dirname(path)) : name;
  const without = stripDate ? raw.replace(/^\d{4}-\d{2}-\d{2}-/, "") : raw;
  return without.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

/** The frontmatter shapes the files use: `key: "string"`, `key: bare`, and `key: ["a", "b"]`. */
export function frontmatter(text: string): { meta: Record<string, string>; tags: string[]; body: string } {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) throw new Error("no frontmatter");
  const meta: Record<string, string> = {};
  let tags: string[] = [];
  for (const line of (match[1] ?? "").split("\n")) {
    const kv = /^([A-Za-z_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    const key = kv[1] ?? "";
    const value = (kv[2] ?? "").trim();
    if (value.startsWith("[")) tags = [...value.matchAll(/"([^"]*)"/g)].map((m) => m[1] ?? "");
    else meta[key] = value.replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
  }
  if (tags.length > 0) meta.tags = tags.join(", ");
  return { meta, tags, body: text.slice(match[0].length) };
}

export { escape };

/** The image a post names, as the WebP copy the site serves. */
function webp(src: string): string {
  return src.replace(/^\/blog\/images\//, "/blog/images/").replace(/\.(png|jpe?g)$/i, ".webp");
}

/** A heading the page's "In this post" list links to. */
export type Heading = { level: 2 | 3; id: string; text: string };
/** What a post's page lends the renderer: its embeds (content/blog/embeds/), and a list to collect its headings in. */
export type RenderOptions = { embed?: (name: string) => string; headings?: Heading[]; ids?: Set<string> };

/** Keys written as inline code that open with a modifier (`⌘T`, `⌥⇧F`) read as keycaps. */
const KEYS = /^[⌘⌥⌃⇧]/;

function inline(text: string): string {
  const runs: string[] = [];
  const pattern = /(`[^`\n]+`)|(!\[([^\]]*)\]\(([^)\s]+)\))|(\[([^\]]+)\]\(([^)\s]+)\))|(\*\*(?=\S)[^*]*?\S\*\*)|(\*(?=\S)[^*]*?\S\*|_(?=\S)[^_]*?\S_)/g;
  let at = 0;
  for (const m of text.matchAll(pattern)) {
    const start = m.index ?? 0;
    runs.push(escape(text.slice(at, start)));
    if (m[1]) {
      const code = m[1].slice(1, -1);
      runs.push(KEYS.test(code) ? `<kbd>${escape(code)}</kbd>` : `<code>${escape(code)}</code>`);
    } else if (m[2]) runs.push(`<img src="${escape(webp(m[4] ?? ""))}" alt="${escape(m[3] ?? "")}" loading="lazy">`);
    else if (m[5]) runs.push(`<a href="${escape(m[7] ?? "")}">${inline(m[6] ?? "")}</a>`);
    else if (m[8]) runs.push(`<strong>${inline(m[8].slice(2, -2))}</strong>`);
    else if (m[9]) runs.push(`<em>${inline(m[9].slice(1, -1))}</em>`);
    at = start + m[0].length;
  }
  runs.push(escape(text.slice(at)));
  return runs.join("");
}

function youtube(tag: string): string {
  const attrs = Object.fromEntries([...tag.matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1] ?? "", m[2] ?? ""]));
  const href = attrs.url ?? (attrs.videoid ? `https://www.youtube.com/watch?v=${attrs.videoid}` : "");
  if (!href) throw new Error(`a <youtube> with no video: ${tag}`);
  return `<p class="watch"><a href="${escape(href)}"><span class="watch-label">Watch on YouTube</span> ${escape(attrs.title ?? "the video")}</a></p>`;
}

/** A heading's address in its page: its words, lowercased, joined by hyphens, and never one the page already has. */
function headingId(text: string, ids: Set<string>): string {
  const words = text.replace(/[`*_]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  // An id opens with a letter: a numbered heading ("1. The look") drops its number, and anything else left without a letter gets one.
  const trimmed = words.replace(/^\d+-(?=[a-z])/, "");
  const base = /^[a-z]/.test(trimmed) ? trimmed : `s-${trimmed || "section"}`;
  let id = base;
  for (let n = 2; ids.has(id); n++) id = `${base}-${n}`;
  ids.add(id);
  return id;
}

/** A fenced block: highlighted, under a strip with its file name or language and a Copy button the page's script shows. */
function codeBlock(info: string, code: string): string {
  const lang = info.split(/\s+/)[0] ?? "";
  if (lang === "prompt") return promptCard(code);
  const title = /title="([^"]*)"/.exec(info)?.[1];
  const label = languageLabel(lang);
  const name = title ?? label;
  const head = `<figcaption class="code-head">${name ? `<span class="code-title">${escape(name)}</span>` : ""}${title && label ? `<span class="code-lang">${escape(label)}</span>` : ""}<button class="copy" type="button" data-copy hidden>Copy</button></figcaption>`;
  return `<figure class="code${isShell(lang) ? " code-wrap" : ""}">${head}<pre class="code-body"><code>${highlightLines(code, lang).join("\n")}</code></pre></figure>`;
}

/** A prompt for the reader's own coding agent: a card with its first lines, "Show the whole prompt", and "Copy prompt". */
function promptCard(code: string): string {
  const lines = code.split("\n").length;
  return `<section class="prompt" aria-label="A prompt for your coding agent" data-prompt>
<div class="prompt-head"><p class="prompt-kicker">Prompt · ${lines} lines</p><p class="prompt-title">Give this to your coding agent</p><button class="copy copy-big" type="button" data-copy hidden>Copy prompt</button></div>
<pre class="prompt-body"><code>${escape(code)}</code></pre>
<div class="prompt-foot"><button class="prompt-more" type="button" data-expand hidden>Show the whole prompt</button></div>
</section>`;
}

/** A pipe table's cells, without the outer pipes. */
function cells(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function table(rows: string[]): string {
  const [head = "", , ...body] = rows;
  const labels = cells(head);
  const th = labels.map((cell) => `<th scope="col">${inline(cell)}</th>`).join("");
  // Each cell carries its column's name, which a phone shows above it once the table stacks into cards.
  const tr = body.map((row) => `<tr>${cells(row).map((cell, n) => `<td data-label="${escape((labels[n] ?? "").replace(/[`*_]/g, ""))}">${inline(cell)}</td>`).join("")}</tr>`).join("");
  return `<div class="table-wrap"><table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}

const CALLOUTS: Record<string, string> = { note: "Note", tip: "Tip", warning: "Watch out", fix: "What fixed it" };

/** Markdown to HTML, for what the posts and talks use. Anything else that looks like HTML is refused. */
export function render(markdown: string, options: RenderOptions = {}): string {
  const ids = options.ids ?? new Set<string>();
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  const isBlank = (line: string | undefined): boolean => line === undefined || line.trim() === "";
  const isRule = (line: string | undefined): boolean => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(line ?? "");
  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (isBlank(line)) { i++; continue; }
    if (/^\s*```/.test(line)) {
      const info = line.trim().slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i] ?? "")) code.push(lines[i++] ?? "");
      i++;
      out.push(codeBlock(info, code.join("\n")));
      continue;
    }
    if (/^\s*<youtube\b/.test(line)) { out.push(youtube(line)); i++; continue; }
    if (/^\s*</.test(line)) throw new Error(`raw HTML in a post: ${line.slice(0, 60)}`);
    const embed = /^\s*!\[\[([a-z0-9-]+)\]\]\s*$/.exec(line);
    if (embed) {
      if (!options.embed) throw new Error(`an embed with nowhere to read it from: ${line.trim()}`);
      out.push(options.embed(embed[1] ?? ""));
      i++;
      continue;
    }
    const heading = /^(#{1,6})\s+(.*?)\s*#*$/.exec(line);
    if (heading) {
      const level = Math.min(Math.max((heading[1] ?? "").length, 2), 4);
      const text = heading[2] ?? "";
      const id = headingId(text, ids);
      if (level <= 3) options.headings?.push({ level: level as 2 | 3, id, text: text.replace(/[`*_]/g, "") });
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      i++;
      continue;
    }
    if (/^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
    if (/^\s*\|/.test(line) && isRule(lines[i + 1])) {
      const rows: string[] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i] ?? "")) rows.push(lines[i++] ?? "");
      out.push(table(rows));
      continue;
    }
    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i] ?? "")) quote.push((lines[i++] ?? "").replace(/^\s*>\s?/, ""));
      const callout = /^\[!(NOTE|TIP|WARNING|FIX)\]\s*(.*)$/i.exec(quote[0] ?? "");
      if (callout) {
        const kind = (callout[1] ?? "").toLowerCase();
        const title = callout[2]?.trim() || CALLOUTS[kind] || "";
        out.push(`<div class="callout" role="note" data-kind="${kind}"><p class="callout-title">${inline(title)}</p>${render(quote.slice(1).join("\n"), { ...options, ids })}</div>`);
      } else out.push(`<blockquote>${render(quote.join("\n"), { ...options, ids })}</blockquote>`);
      continue;
    }
    const bullet = /^\s*[-*+]\s+/;
    const numbered = /^\s*\d+[.)]\s+/;
    if (bullet.test(line) || numbered.test(line)) {
      const ordered = numbered.test(line);
      const marker = ordered ? numbered : bullet;
      const items: string[] = [];
      while (i < lines.length && marker.test(lines[i] ?? "")) {
        let item = (lines[i++] ?? "").replace(marker, "");
        while (i < lines.length && !isBlank(lines[i]) && !marker.test(lines[i] ?? "") && /^\s{2,}\S/.test(lines[i] ?? "")) item += " " + (lines[i++] ?? "").trim();
        items.push(`<li>${inline(item)}</li>`);
      }
      out.push(ordered ? `<ol>${items.join("")}</ol>` : `<ul>${items.join("")}</ul>`);
      continue;
    }
    const image = /^\s*!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/.exec(line);
    if (image) {
      const caption = image[3] ? `<figcaption>${inline(image[3])}</figcaption>` : "";
      out.push(`<figure><img src="${escape(webp(image[2] ?? ""))}" alt="${escape(image[1] ?? "")}" loading="lazy">${caption}</figure>`);
      i++;
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && !isBlank(lines[i]) && !/^(#{1,6}\s|\s*```|\s*>|\s*[-*+]\s|\s*\d+[.)]\s|\s*<|\s*\|)/.test(lines[i] ?? "")) para.push((lines[i++] ?? "").trim());
    if (para.length === 0) throw new Error(`unparsed line: ${line.slice(0, 60)}`);
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  return out.join("\n");
}

/** "20 March 2025" for "2025-03-20". */
export function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${months[(m ?? 1) - 1]} ${y}`;
}

export function entries(root: string): Entry[] {
  const list: Entry[] = [];
  const blogDir = join(root, "content", "blog");
  for (const file of readdirSync(blogDir).filter((name) => /^\d{4}-\d{2}-\d{2}-.*\.md$/.test(name)).sort()) {
    const source = `content/blog/${file}`;
    const { meta, tags, body } = frontmatter(readFileSync(join(root, source), "utf8"));
    list.push({ kind: "blog", source, slug: slugFor(`/${source}`), title: meta.title ?? "", date: meta.date ?? file.slice(0, 10), excerpt: meta.excerpt ?? "", tags, cover: meta.featured_image ?? null, body, meta });
  }
  const talksDir = join(root, "content", "talks");
  for (const dir of readdirSync(talksDir).filter((name) => /^\d{4}-\d{2}-\d{2}-/.test(name)).sort()) {
    const source = `content/talks/${dir}/index.md`;
    const { meta, tags, body } = frontmatter(readFileSync(join(root, source), "utf8"));
    list.push({ kind: "talks", source, slug: slugFor(`/${source}`), title: meta.title ?? "", date: meta.date ?? dir.slice(0, 10), excerpt: meta.excerpt ?? "", tags, cover: null, body, meta });
  }
  return list;
}

/** The tab's title: the page's own, then the name, within the 70 characters a search result shows. */
function titleTag(title: string): string {
  const full = `${title} · Swarup Donepudi`;
  if (full.length <= 70) return full;
  if (title.length <= 70) return title;
  return `${title.slice(0, 69).replace(/\s+\S*$/, "")}…`;
}

type Page = { path: string; title: string; description: string; type: "website" | "article"; image: string; published?: string; body: string; intent: string; reading?: boolean };

function page(p: Page): string {
  const url = `${ORIGIN}${p.path}`;
  return `<!DOCTYPE html>
<!-- ${p.intent} Made by tools/publish from content/; edit the Markdown, not this file. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${escape(titleTag(p.title))}</title>
  <meta name="description" content="${escape(p.description)}">
  <meta name="theme-color" content="#f7f4ee" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#171512" media="(prefers-color-scheme: dark)">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="${p.type}">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${escape(p.title)}">
  <meta property="og:description" content="${escape(p.description)}">
  <meta property="og:image" content="${ORIGIN}${p.image}">${p.published ? `\n  <meta property="article:published_time" content="${p.published}">\n  <meta property="article:author" content="Swarup Donepudi">` : ""}
  <meta name="twitter:card" content="${p.image === "/img/share.jpg" ? "summary" : "summary_large_image"}">
  <link rel="icon" type="image/png" sizes="192x192" href="/img/icon-192.png">
  <link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
  <link rel="stylesheet" href="/style.css">${p.reading ? '\n  <script type="module" src="/post.js"></script>' : ""}
</head>
<body${p.reading ? ' class="reading"' : ""}>
  <header class="bar">
    <a class="brand" href="/">donepudi.me</a>
    <nav class="bar-nav" aria-label="Site">
      <a class="bar-link" href="/blog/">Writing</a>
      <a class="bar-link" href="/talks/">Talks</a>
      <a class="bar-link" href="/feedback">Talk to me</a>
    </nav>
  </header>

  <main>
${p.body}
  </main>

  <footer class="foot">
    <span>Swarup Donepudi</span>
    <a href="/">donepudi.me</a>
  </footer>
</body>
</html>
`;
}

function shareImage(root: string, entry: Entry): string {
  if (!entry.cover) return "/img/share.jpg";
  const name = basename(entry.cover).replace(/\.cover\.(png|jpe?g)$/i, "");
  const path = `/blog/images/${name}.share.jpg`;
  if (!existsSync(join(root, "site", path))) throw new Error(`${entry.source}: no share picture ${path}`);
  return path;
}

/** The pieces a post can embed (`![[name]]`): content/blog/embeds/<name>.html or .svg, checked to hold no script, style or handler. */
function embedFrom(root: string): (name: string) => string {
  return (name) => {
    const found = ["html", "svg"].map((ext) => join(root, "content", "blog", "embeds", `${name}.${ext}`)).find((path) => existsSync(path));
    if (!found) throw new Error(`no embed named ${name} in content/blog/embeds/`);
    const text = readFileSync(found, "utf8").replace(/^<!--[\s\S]*?-->\n?/, "").trim();
    if (/<script|<style|\sstyle=|\son[a-z]+=|javascript:|<iframe|<object|<embed/i.test(text)) throw new Error(`${name}: an embed may hold no script, style or handler`);
    return text;
  };
}

/** Minutes to read, at 230 words a minute, counting prose and leaving out code. */
function readingMinutes(body: string): number {
  const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/** "In this post": each section, with its subsections under it. */
function contents(headings: Heading[]): string {
  const items: string[] = [];
  let open = false;
  for (const h of headings) {
    const link = `<a href="#${h.id}">${escape(h.text)}</a>`;
    if (h.level === 2) {
      if (open) items.push("</ol></li>");
      open = false;
      items.push(`<li>${link}`);
      const next = headings[headings.indexOf(h) + 1];
      if (next?.level === 3) { items.push('<ol class="toc-sub">'); open = true; } else items.push("</li>");
    } else if (open) items.push(`<li><a href="#${h.id}">${escape(h.text.replace(/^\d+[.)]\s+/, ""))}</a></li>`);
  }
  if (open) items.push("</ol></li>");
  return `<nav class="toc" aria-label="In this post"><p class="toc-title">In this post</p><ol>${items.join("")}</ol></nav>`;
}

const PHOTO = '<img class="byline-photo" src="/img/avatar.webp" width="1000" height="1000" alt="">';

function postPage(root: string, e: Entry, older: Entry | undefined, newer: Entry | undefined): string {
  // The page's opening picture: an embed when the post names one (cover_embed), otherwise its cover image.
  const embed = embedFrom(root);
  const cover = e.meta.cover_embed
    ? `\n      <div class="post-cover">${embed(e.meta.cover_embed)}</div>`
    : e.cover ? `\n      <figure class="post-cover"><img src="${escape(webp(e.cover))}" alt="" width="1600" height="900"></figure>` : "";
  const headings: Heading[] = [];
  const body = render(e.body, { embed, headings });
  const toc = headings.filter((h) => h.level === 2).length >= 4 ? `\n        ${contents(headings)}` : "";
  const tags = e.tags.length ? `<span class="byline-tags">${e.tags.map(escape).join(" · ")}</span>` : "";
  const pager = [
    newer ? `<a class="pager-link" href="/blog/${newer.slug}/"><span class="pager-label">Newer</span><span class="pager-title">${escape(newer.title)}</span></a>` : "",
    older ? `<a class="pager-link pager-older" href="/blog/${older.slug}/"><span class="pager-label">Older</span><span class="pager-title">${escape(older.title)}</span></a>` : "",
  ].join("");
  return page({
    path: `/blog/${e.slug}/`, title: e.title, description: e.excerpt || e.title, type: "article", image: shareImage(root, e), published: e.date, reading: true,
    intent: `donepudi.me/blog/${e.slug}/: the post "${e.title.replace(/--/g, "-")}" (${e.source}).`,
    body: `    <article class="post${toc ? " post-long" : ""}">
      <header class="post-head">
        <p class="post-meta"><time datetime="${e.date}">${longDate(e.date)}</time><span aria-hidden="true">·</span><span>${readingMinutes(e.body)} min read</span></p>
        <h1>${escape(e.title)}</h1>${e.excerpt ? `\n        <p class="lede">${escape(e.excerpt)}</p>` : ""}
        <p class="byline">${PHOTO}<span class="byline-text"><span class="byline-name">Swarup Donepudi</span>${tags}</span></p>
      </header>${cover}
      <div class="post-grid">${toc}
        <div class="post-body">
${body}
        </div>
        <footer class="post-foot">
        <div class="author">${PHOTO.replace("byline-photo", "author-photo")}<div class="author-text"><p class="author-name">Written by Swarup Donepudi</p><p class="author-line">Platform engineer since 2015. I write about platform engineering, and the coding agents I build with every day.</p><p class="author-links"><a href="/blog/">More writing</a> · <a href="/feedback">Talk to me about this post</a></p></div></div>${pager ? `\n          <nav class="pager" aria-label="More posts">${pager}</nav>` : ""}
        </footer>
      </div>
    </article>`,
  });
}

function talkPage(e: Entry): string {
  const where = [e.meta.event, e.meta.location].filter(Boolean).map((s) => escape(s ?? "")).join(" · ");
  return page({
    path: `/talks/${e.slug}/`, title: e.title, description: e.excerpt || e.title, type: "article", image: "/img/share.jpg", published: e.date,
    intent: `donepudi.me/talks/${e.slug}/: the talk "${e.title.replace(/--/g, "-")}" (${e.source}).`,
    body: `    <article class="post">
      <p class="post-meta"><time datetime="${e.date}">${longDate(e.date)}</time> · ${where}</p>
      <h1>${escape(e.title)}</h1>${e.excerpt ? `\n      <p class="lede">${escape(e.excerpt)}</p>` : ""}
      <div class="post-body">
${render(e.body)}
      </div>
      <p class="post-end"><a href="/talks/">All talks</a> · <a href="/feedback">Invite me to speak</a></p>
    </article>`,
  });
}

function listItem(e: Entry, base: string): string {
  return `        <li><a href="/${base}/${e.slug}/"><span class="list-meta"><time datetime="${e.date}">${longDate(e.date)}</time></span><span class="list-title">${escape(e.title)}</span>${e.excerpt ? `<span class="list-line">${escape(e.excerpt)}</span>` : ""}</a></li>`;
}

function indexPage(kind: Kind, list: Entry[]): string {
  const blog = kind === "blog";
  return page({
    path: `/${kind}/`, title: blog ? "Writing" : "Talks", type: "website", image: "/img/share.jpg",
    description: blog ? "Everything I've written, newest first." : "Talks I've given on platform engineering, and how to invite me to yours.",
    intent: blog ? "donepudi.me/blog/: every post, newest first." : "donepudi.me/talks/: every talk, newest first, and the way to invite him.",
    body: `    <section class="listing" aria-labelledby="title">
      <h1 id="title">${blog ? "Writing" : "Talks"}</h1>
      <p class="lede">${blog ? "Everything I've written, newest first." : 'Platform engineering, in rooms full of engineers. Want me at yours? <a href="/feedback">Send an invitation</a>.'}</p>
      <ol class="entries">
${list.map((e) => listItem(e, kind)).join("\n")}
      </ol>
    </section>`,
  });
}

function homeWriting(posts: Entry[]): string {
  return `${HOME_START}
    <section class="writing" aria-labelledby="writing">
      <div class="section-head">
        <h2 id="writing">Writing</h2>
        <a class="more-link" href="/blog/">All writing</a>
      </div>
      <ol class="entries">
${posts.slice(0, 5).map((e) => listItem(e, "blog")).join("\n")}
      </ol>
    </section>
    ${HOME_END}`;
}

function sitemap(paths: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${ORIGIN}${path}</loc></url>`).join("\n")}
</urlset>
`;
}

/** Every file the publisher makes, by its path under site/, with its whole text. */
export function build(root: string): Map<string, string> {
  const all = entries(root);
  const posts = all.filter((e) => e.kind === "blog").sort((a, b) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug));
  const talks = all.filter((e) => e.kind === "talks").sort((a, b) => b.date.localeCompare(a.date));
  const files = new Map<string, string>();
  posts.forEach((e, n) => files.set(`blog/${e.slug}/index.html`, postPage(root, e, posts[n + 1], posts[n - 1])));
  for (const e of talks) files.set(`talks/${e.slug}/index.html`, talkPage(e));
  files.set("blog/index.html", indexPage("blog", posts));
  files.set("talks/index.html", indexPage("talks", talks));
  files.set("sitemap.xml", sitemap(["/", "/feedback", "/updates", "/blog/", ...posts.map((e) => `/blog/${e.slug}/`), "/talks/", ...talks.map((e) => `/talks/${e.slug}/`)]));
  files.set("robots.txt", `# donepudi.me is a public home page: every crawler may read all of it.\nUser-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
  const home = readFileSync(join(root, "site", "index.html"), "utf8");
  const start = home.indexOf(HOME_START);
  const end = home.indexOf(HOME_END);
  if (start < 0 || end < 0) throw new Error("site/index.html has no writing markers");
  files.set("index.html", home.slice(0, start) + homeWriting(posts) + home.slice(end + HOME_END.length));
  return files;
}

/** The images under site/blog/images/ the generated pages name. */
export function imagesNamed(files: Map<string, string>): Set<string> {
  const named = new Set<string>();
  for (const text of files.values()) {
    for (const m of text.matchAll(/(?:src="|content="https:\/\/donepudi\.me)\/(blog\/images\/[^"]+)"/g)) named.add(m[1] ?? "");
  }
  return named;
}
