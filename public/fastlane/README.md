# Fastlane

Life's single-threaded stream.

## What is Fastlane?

Fastlane is a personal timeline - a place to capture day-to-day thoughts, moments, and observations. Unlike polished blog posts, Fastlane entries are quick captures of what's on my mind.

The name comes from "The Millionaire Fastlane" by MJ DeMarco - a book about choosing the fast lane in life, building systems, and accelerating toward your goals. I'm a huge fan, and this space represents the lane I've chosen.

I also think of life as single-threaded - every day you wake up on the same lane as yesterday, no branching, no parallel paths. Just forward motion. This is my personal lane.

## Access

Navigate to `/fastlane` - there's no navigation link. If you're here, you found it.

## Creating Entries

Each entry is a markdown file with minimal frontmatter:

```yaml
---
title: "Your title here"
date: "YYYY-MM-DD"
tags: ["optional", "tags"]  # Optional
---

Your content here...
```

### File Naming Convention

Files follow the pattern: `YYYY-MM-DD-slug.md`

Example: `2026-01-21-building-in-public.md`

The date prefix ensures chronological ordering in the filesystem while the slug becomes the URL path.

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Entry title |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `tags` | No | Array of lowercase tags |

**Note:** Unlike blog posts, `excerpt`, `featured_image`, and `author` are not required. Excerpts are auto-generated from content.

## Philosophy

- **Quick to create** - Minimal friction for capturing thoughts
- **Authentic voice** - No need for polish or structure
- **Chronological** - Sorted by date, newest first
- **Discoverable but not advertised** - No navigation link, accessed directly
