# Fastlane: Personal Timeline Feature

**Date**: January 21, 2026
**Type**: Feature
**Areas**: Fastlane, Blog, UI Components, Content Management, Design

## Summary

Added a new "Fastlane" feature - a personal timeline accessible at `/fastlane` for capturing day-to-day thoughts and moments without the overhead of polished blog posts. The feature includes accordion-style expand/collapse, shareable links, and seamless integration with the site's gradient aesthetic. Also removed black box backgrounds across blog and fastlane pages for a cleaner, more cohesive visual experience.

## Motivation / Background

There's a category of content that happens day-to-day that deserves a home - quick observations, reflections, and moments that don't warrant a full blog post but are worth capturing. These authentic captures of what's on my mind needed a dedicated space.

The name "Fastlane" comes from "The Millionaire Fastlane" by MJ DeMarco - representing the lane I've chosen for my life. Combined with my own concept of life being "single-threaded" (no branching, no parallel paths, just forward motion one day at a time), this creates a meaningful personal timeline.

### Goals

- Create a frictionless way to capture thoughts without blog post overhead
- Make entries expandable in-place (single-page experience)
- Allow entries to be shareable via dedicated URLs
- Keep the feature discoverable but not prominently advertised (no nav link)
- Remove visual clutter (black box backgrounds) for cleaner aesthetic

## What Changed

### New Fastlane Feature

Created a complete personal timeline system mirroring the blog architecture but optimized for quick captures.

**Content Layer**:
- `public/fastlane/` - Content directory with markdown entries
- `public/fastlane/README.md` - Documentation for the content system
- Minimal frontmatter: just `title`, `date`, and optional `tags`
- File naming: `YYYY-MM-DD-slug.md` (date prefix stripped from URLs)

**Library Layer**:
- `src/lib/fastlane.ts` - TypeScript utilities for reading/parsing entries
- Interfaces: `FastlaneEntry`, `FastlaneEntryFrontmatter`
- Functions: `getAllFastlaneEntries()`, `getFastlaneEntry()`, `getRecentFastlaneEntries()`
- Auto-generated excerpts from content (150 chars)

**Page Layer**:
- `src/app/fastlane/page.tsx` - Timeline listing page
- `src/app/fastlane/[slug]/page.tsx` - Individual entry page for sharing

**Component Layer**:
- `src/components/fastlane/FastlaneTimeline.tsx` - Client component with accordion behavior

### Accordion UX

The timeline page features a unique single-page experience:

- **Click to expand**: Entry content appears in-place
- **Click to collapse**: Content disappears
- **Single expansion**: Only one entry expanded at a time
- **No animations**: Instant show/hide (no sliding accordion effect)
- **Action icons on hover**:
  - Link icon - copies shareable URL to clipboard (shows checkmark on success)
  - External link icon - opens entry in new tab
  - Chevron - visual indicator of expand/collapse state

### Black Box Background Removal

Removed the dark card styling (`bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg`) from:

| Page | Before | After |
|------|--------|-------|
| `/blog` | Black box cards for each post | Clean entries blending with gradient |
| `/blog/[slug]` | Black box wrapper around content | Content flows against gradient |
| `/fastlane/[slug]` | Black box wrapper around content | Content flows against gradient |

This creates a more cohesive Hey Calendar-inspired aesthetic where content breathes against the gradient background.

### List Styling Fix

Fixed ordered list rendering in `MarkdownRenderer.tsx` where numbers appeared on separate lines from content. Changed from `list-inside` to standard list positioning with proper padding.

### Cursor Rule

Created `.cursor/rules/add-donepudi-me-fastlane-entry.mdc` for quick entry creation:
- Trigger: "fastlane:" or "add to fastlane"
- Auto-generates slug from title
- Creates file with proper naming convention
- Preserves authentic voice (no over-polishing)
- Suggests relevant tags

## Implementation Details

### File Structure

```
donepudi.me/
├── public/fastlane/
│   ├── README.md
│   ├── 2026-01-21-why-i-named-it-fastlane.md
│   └── 2026-01-21-the-platform-that-shouldnt-exist.md
├── src/
│   ├── lib/fastlane.ts
│   ├── app/fastlane/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── components/fastlane/
│       └── FastlaneTimeline.tsx
└── .cursor/rules/
    └── add-donepudi-me-fastlane-entry.mdc
```

### Key Technical Decisions

**Client-safe date formatting**: The `FastlaneTimeline` component needed its own `formatDate` function since it's a client component and can't import from `content.ts` (which uses Node's `fs` module).

**Date prefix stripping**: Updated `src/lib/content.ts` to strip date prefixes for both `/blog/` and `/fastlane/` paths, ensuring clean URLs like `/fastlane/why-i-named-it-fastlane` instead of `/fastlane/2026-01-21-why-i-named-it-fastlane`.

**No back navigation on detail pages**: Individual fastlane entry pages intentionally have no breadcrumb or back link - if someone lands there via a shared link, they see just the content.

**Reused MarkdownRenderer**: The existing blog markdown renderer is shared with fastlane, ensuring consistent content rendering without code duplication.

## Visual/UX Impact

### Timeline Page (`/fastlane`)

- Header: "Fastlane" title with "Life's single-threaded stream" subtitle
- Entries show: date (cyan), title (white), excerpt (gray), tags (subtle pills)
- Hover reveals action icons (copy link, external link, chevron)
- Click expands full content in-place
- Content renders with full markdown support (headings, lists, code, etc.)

### Individual Entry Page (`/fastlane/[slug]`)

- Clean layout with just header navigation
- Date, title, tags at top
- Full markdown content
- No back navigation (intentional for sharing)

### Blog Pages (Updated)

- Post cards no longer have black box backgrounds
- Content on detail pages flows directly against gradient
- More spacious, breathable design

## Benefits

### For Content Creation
- **Zero friction**: Just title, date, and content - no featured images or excerpts required
- **Quick capture**: Cursor rule handles file naming and frontmatter
- **Authentic voice**: No over-polishing, preserves raw thoughts

### For Visitors
- **Discoverability**: Only accessible by typing `/fastlane` (no nav link)
- **Shareable**: Individual entries have dedicated URLs with OpenGraph metadata
- **Seamless experience**: Expand/collapse without page navigation

### For Design Consistency
- **Unified aesthetic**: Black box removal creates cohesive gradient-based design
- **Better readability**: Content breathes against the background
- **Hey Calendar inspiration**: Modern, clean timeline feel

## Impact

### Pages Added
- `/fastlane` - Timeline listing
- `/fastlane/[slug]` - Individual entries (2 initial entries)

### Files Modified
- `src/lib/content.ts` - Date prefix stripping for fastlane
- `src/components/blog/MarkdownRenderer.tsx` - List styling fix
- `src/app/blog/page.tsx` - Black box removal
- `src/app/blog/[slug]/page.tsx` - Black box removal

### Files Created
- `src/lib/fastlane.ts`
- `src/app/fastlane/page.tsx`
- `src/app/fastlane/[slug]/page.tsx`
- `src/components/fastlane/FastlaneTimeline.tsx`
- `public/fastlane/README.md`
- `public/fastlane/2026-01-21-why-i-named-it-fastlane.md`
- `public/fastlane/2026-01-21-the-platform-that-shouldnt-exist.md`
- `.cursor/rules/add-donepudi-me-fastlane-entry.mdc`

## Related Work

- Blog system implementation (shared architecture pattern)
- Talks system (similar content management approach)
- Site gradient design (aesthetic consistency)

## Future Enhancements

The architecture supports future additions without refactoring:
- Year/month filtering
- Tag-based filtering
- Search functionality
- RSS feed
- Homepage widget showing recent entries

---

**Status**: ✅ Live
