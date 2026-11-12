# Writing a post

A post is one Markdown file, `content/blog/YYYY-MM-DD-<slug>.md`. Its address is `/blog/<slug>/` (the date comes off). `npm run publish` makes its page under `site/blog/`; `npm run check` fails if `site/` is stale.

## Frontmatter

```yaml
title: "The post's title"            # 70 characters or fewer reads best
date: "2026-11-12"
excerpt: "One or two sentences."      # the lede under the title, the description and the link preview's text
author: "Swarup Donepudi"
tags: ["claude-code", "vs-code"]
featured_image: "/blog/images/<file>.cover.png"   # optional; needs <file>.share.jpg, and <file>.cover.webp unless cover_embed is set
cover_embed: "projects-mode"                     # optional; an embed shown where the cover would be
share_kicker: "Claude Code · VS Code"            # optional; the small line on the link preview picture
```

The link preview picture: `node tools/cover/share.ts content/blog/<file>.md` writes `site/blog/images/<file>.share.jpg` from the title (`tools/cover/share.html`).

## What the Markdown can hold

- Headings (`##`, `###`): a post with four or more `##` sections gets "In this post".
- Code: ` ```json title="settings.json" ` is highlighted and shows the file name; ` ```sh ` lines wrap. Every block has a Copy button.
- A prompt for the reader's coding agent: ` ```prompt `. It becomes a card with "Copy prompt", folded to its first lines.
- Keys: inline code that opens with a modifier, `` `⌘T` ``, is a keycap.
- Tables: GitHub's pipe tables.
- Callouts: a quote whose first line is `[!NOTE]`, `[!TIP]`, `[!WARNING]` or `[!FIX]`, optionally followed by a title.
- Images: `![alt](/blog/images/name.png "caption")`; the page serves the `.webp` beside it.
- Embeds: `![[name]]` on its own line puts `content/blog/embeds/name.html` (or `.svg`) into the page. An embed holds no script, style or handler; it uses classes from `site/style.css`.
- YouTube: `<youtube videoid="…" title="…"></youtube>`, a link card. Any other HTML is refused.
