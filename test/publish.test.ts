// The publisher (tools/publish): site/ matches what content/ makes, every post and talk keeps the address the
// old site gave it, no Markdown file is ever served, and nothing in a post can become markup it didn't intend.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { build, render, slugFor } from "../tools/publish/content.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const published = build(root);

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [relative(join(root, "site"), path).split(sep).join("/")];
  });
}

describe("the publisher", () => {
  it.each([...published.keys()])("left site/%s as content/ makes it (npm run publish)", (path) => {
    const file = join(root, "site", path);
    expect(existsSync(file) ? readFileSync(file, "utf8") : null).toBe(published.get(path));
  });

  it("keeps every address the old site gave a post or a talk", () => {
    // From the old site's src/lib/content.ts: the date off a post, a talk's folder name kept, punctuation dropped.
    expect(slugFor("/content/blog/2025-11-25-planton-will-become-the-next-postman.md")).toBe("planton-will-become-the-next-postman");
    expect(slugFor("/content/blog/2025-03-18-37-signals-in-datacenter.md")).toBe("37-signals-in-datacenter");
    expect(slugFor("/content/talks/2025-11-29-hyderabad-cncf-meetup/index.md")).toBe("2025-11-29-hyderabad-cncf-meetup");
    expect(slugFor("/content/blog/2025-01-01-shouldn't stop.md")).toBe("shouldnt-stop");
    const posts = readdirSync(join(root, "content", "blog")).filter((name) => /^\d{4}-\d{2}-\d{2}-.*\.md$/.test(name));
    // The old site had 17 posts; every one still answers, and so does every post written since.
    expect(posts.filter((name) => name < "2026-11-11").length).toBe(17);
    for (const name of posts) expect(published.has(`blog/${slugFor(`/content/blog/${name}`)}/index.html`)).toBe(true);
    expect(published.has("talks/2025-11-29-hyderabad-cncf-meetup/index.html")).toBe(true);
  });

  it("serves no Markdown file", () => {
    expect(listFiles(join(root, "site")).filter((path) => path.endsWith(".md"))).toEqual([]);
  });

  it("lists the sitemap in robots.txt by its absolute address", () => {
    expect(published.get("robots.txt")).toContain("Sitemap: https://donepudi.me/sitemap.xml");
    expect(published.get("sitemap.xml")).toContain("<loc>https://donepudi.me/blog/planton-will-become-the-next-postman/</loc>");
  });

  it("escapes every word and refuses raw HTML", () => {
    expect(render("A <b>bold</b> claim & more")).toBe("<p>A &lt;b&gt;bold&lt;/b&gt; claim &amp; more</p>");
    expect(() => render("<script>alert(1)</script>")).toThrow(/raw HTML/);
    expect(render('<youtube videoid="abc" title="A talk"></youtube>')).toBe('<p class="watch"><a href="https://www.youtube.com/watch?v=abc"><span class="watch-label">Watch on YouTube</span> A talk</a></p>');
    expect(render("![A picture](/blog/images/a.png)")).toBe('<figure><img src="/blog/images/a.webp" alt="A picture" loading="lazy"></figure>');
  });
});
