# Adding Blog Posts

## Overview

This directory contains blog posts in Markdown format. Each post is a `.md` file with frontmatter metadata.

## Creating a New Post

### Option 1: Single File

Create a file named `your-post-slug.md`:

```markdown
---
title: "Your Post Title"
date: "2025-11-23"
excerpt: "A brief summary of your post"
author: "Swarup Donepudi"
tags: ["platform-engineering", "devops"]
featured_image: "/blog/your-post-slug/hero.png"
---

# Your Post Title

Your content here...
```

### Option 2: Directory with Images

Create a directory named `your-post-slug/` with an `index.md` file:

```
/blog/your-post-slug/
  index.md
  hero.png
  diagram.png
```

## Required Frontmatter

- `title`: Post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `excerpt`: Brief summary (optional, auto-generated if not provided)

## Optional Frontmatter

- `author`: Author name (defaults to your name)
- `tags`: Array of tags for categorization
- `featured_image`: Path to hero image

## Formatting

### Code Blocks

Use triple backticks with language specification:

\`\`\`typescript
const example = "code";
\`\`\`

### Images

Reference images from the public directory:

```markdown
![Alt text](/blog/post-slug/image.png)
```

### Links

```markdown
[Link text](https://example.com)
```

## Publishing

1. Create your markdown file in `/public/blog/`
2. Commit and push to the repository
3. The static site will regenerate automatically

## Tips

- Keep excerpts under 200 characters
- Use descriptive slugs (filename becomes URL)
- Add tags for discoverability
- Include a featured image for better presentation

## Examples

See `welcome.md` for a complete example.


