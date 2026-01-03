# Add Date Prefixes to Blog Posts and Images for Better Organization

**Date**: November 26, 2025  
**Type**: Enhancement  
**Areas**: Blog, Content Management

## Summary

Implemented systematic date prefixing for all blog posts and images to improve file organization and discoverability. Updated the `publish-as-blog-post` cursor rule to automatically add date prefixes to new content, then retroactively renamed all 17 existing blog posts and 32 associated images with dates extracted from their frontmatter. This change enables chronological sorting in the file system and keeps related content grouped together.

## Motivation / Background

As the blog grew to 17 posts with associated images, it became increasingly difficult to identify the publication order when browsing the file system. Files were sorted alphabetically by title slug rather than chronologically, making it hard to:

- Find recent posts quickly
- Understand the content timeline at a glance
- Keep blog posts grouped with their associated images
- Maintain a clear organizational structure as more content is added

The solution emerged from recognizing that each post already had a publication date in its frontmatter—we just needed to surface that date in the filename itself.

### Goals

- Enable chronological file sorting without opening files
- Keep blog posts and their images grouped together in directory listings
- Maintain consistency between new and existing content
- Establish a future-proof naming convention as the blog scales
- Preserve all existing content and functionality

## What Changed

### 0. Implemented Clean URL Mapping (Critical)

Enhanced the blog system to maintain clean URLs while using date-prefixed filenames:

**Problem identified**: After renaming files to include dates, URLs would have contained dates (`/blog/2025-11-25-planton-will-become-the-next-postman`)

**Solution implemented**: Two-part URL slug mapping system
- **Slug generation** (`src/lib/content.ts`): Strips date prefix before generating URLs
- **Post lookup** (`src/lib/blog.ts`): Smart file search that finds date-prefixed files from clean slugs

**Result**: Files organized by date, URLs remain clean and SEO-friendly

### 1. Updated Cursor Rule for New Content

Modified `.cursor/rules/publish-as-blog-post.mdc` to automatically prepend dates to all new blog post filenames and image paths:

**Naming pattern**: `YYYY-MM-DD-{original-slug}`

**Updated sections**:
- Slug generation to include date prefix (`2025-11-25-postman-planton-curious-coincidence`)
- Frontmatter featured_image path (`/blog/images/{date-slug}.cover.png`)
- Image handling for cover images and embedded images
- File creation paths and user notifications
- All examples throughout the rule

### 2. Renamed All Existing Blog Posts

Systematically renamed 17 blog post markdown files with date prefixes extracted from their frontmatter:

```bash
# Examples:
37-signals-in-datacenter.md → 2025-03-18-37-signals-in-datacenter.md
planton-will-become-the-next-postman.md → 2025-11-25-planton-will-become-the-next-postman.md
what-i-learned-from-elon-musk-biography.md → 2025-11-26-what-i-learned-from-elon-musk-biography.md
```

**Complete list of renamed posts**:
- `2025-03-18-37-signals-in-datacenter.md`
- `2025-03-19-consulting-to-product-ideas.md`
- `2025-03-20-cloud-vs-datacenter-debate.md`
- `2025-04-01-reflections-on-march.md`
- `2025-04-02-ai-efficiency-mindset.md`
- `2025-04-08-refocusing-my-social-media-strategy.md`
- `2025-04-11-a-friends-concern-vs-my-determination.md`
- `2025-04-11-the-unexpected-freedom-of-a-layoff.md`
- `2025-05-01-april-month-reflection-the-fragile-power-of-discipline.md`
- `2025-06-01-may-month-reflection-a-month-of-reality-checks.md`
- `2025-06-23-blocking-distractions-with-etc-hosts.md`
- `2025-07-01-june-month-reflection-reclaiming-focus-and-finding-momentum.md`
- `2025-07-01-june-week-4-reflection-taking-stock-and-moving-forward.md`
- `2025-07-21-a-lame-excuse-for-watching-youtube.md`
- `2025-08-01-july-month-reflection-balance-breakthroughs-resilience.md`
- `2025-11-25-planton-will-become-the-next-postman.md`
- `2025-11-26-what-i-learned-from-elon-musk-biography.md`

### 3. Renamed All Associated Images

Renamed 32 image files to match their associated blog post dates:

**Cover images**: All `.cover.png` files received date prefixes matching their blog posts

**Embedded images**: Screenshots, diagrams, and content images also received matching date prefixes

```bash
# Examples:
planton-will-become-the-next-postman.cover.png → 2025-11-25-planton-will-become-the-next-postman.cover.png
planton-will-become-the-next-postman-logos.png → 2025-11-25-planton-will-become-the-next-postman-logos.png
what-i-learned-from-elon-musk-biography-starship.jpg → 2025-11-26-what-i-learned-from-elon-musk-biography-starship.jpg
blocking-distractions-with-etc-hosts-1.png → 2025-06-23-blocking-distractions-with-etc-hosts-1.png
```

### 4. Updated All Image References

Updated image paths throughout all blog posts to reflect the new naming convention:

**Frontmatter updates**: Changed `featured_image` paths in all 17 posts

```yaml
# Before:
featured_image: "/blog/images//planton-will-become-the-next-postman.cover.png"

# After:
featured_image: "/blog/images/2025-11-25-planton-will-become-the-next-postman.cover.png"
```

**Embedded image updates**: Fixed all markdown image references in posts with embedded content

```markdown
# Before:
![Planton and Postman logos](/blog/images/planton-will-become-the-next-postman-logos.png)

# After:
![Planton and Postman logos](/blog/images/2025-11-25-planton-will-become-the-next-postman-logos.png)
```

**Posts with embedded images updated**:
- `2025-11-25-planton-will-become-the-next-postman.md` (4 images)
- `2025-11-26-what-i-learned-from-elon-musk-biography.md` (5 images)
- `2025-06-23-blocking-distractions-with-etc-hosts.md` (3 images)
- `2025-03-18-37-signals-in-datacenter.md` (1 image)
- `2025-04-08-refocusing-my-social-media-strategy.md` (1 image)
- `2025-04-11-the-unexpected-freedom-of-a-layoff.md` (1 image)

## Implementation Details

### Phase 1: Cursor Rule Updates

Modified 7 key sections in `publish-as-blog-post.mdc`:

1. **Slug generation** - Added date prefix logic
2. **Frontmatter template** - Updated featured_image path pattern
3. **Image handling** - Changed copy/rename instructions for all images
4. **File creation** - Updated markdown file path
5. **User notifications** - Changed output message examples
6. **File locations** - Updated documentation paths
7. **Examples and checklists** - Updated all references to use date-slug format

### Phase 1.5: URL Slug Mapping (Critical Fix)

After renaming files, discovered URLs would include dates. Implemented two-part solution:

**File**: `src/lib/content.ts`
```typescript
function stripDatePrefix(str: string): string {
  // Match and remove YYYY-MM-DD- pattern at the start
  return str.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}
```

Applied in `generateSlugFromPath()` to strip dates before URL generation.

**File**: `src/lib/blog.ts`

Enhanced `getBlogPost()` with smart file lookup:
1. First tries exact match (backward compatibility)
2. Then searches directory for files matching `YYYY-MM-DD-{slug}.md` pattern
3. Extracts date prefix and matches against requested slug

This allows clean URLs while maintaining organized filenames.

### Phase 2: Systematic File Renaming

Used shell `mv` commands to rename files in batch operations:

```bash
# Blog posts
cd ~/scm/github.com/swarupdonepudi/donepudi.me/public/blog
mv 37-signals-in-datacenter.md 2025-03-18-37-signals-in-datacenter.md
mv planton-will-become-the-next-postman.md 2025-11-25-planton-will-become-the-next-postman.md
# ... (15 more files)

# Images
cd ~/scm/github.com/swarupdonepudi/donepudi.me/public/blog/images
mv planton-will-become-the-next-postman.cover.png 2025-11-25-planton-will-become-the-next-postman.cover.png
mv planton-will-become-the-next-postman-logos.png 2025-11-25-planton-will-become-the-next-postman-logos.png
# ... (30 more files)
```

### Phase 3: Path Reference Updates

Used search-and-replace operations to update all image paths in blog post content:

**Pattern**: Replace old image paths with date-prefixed versions
**Approach**: File-by-file updates to ensure accuracy
**Scope**: 17 markdown files with frontmatter and embedded image updates

### Phase 4: URL Slug Mapping

Updated the blog system to maintain clean URLs while using date-prefixed filenames:

**Slug generation** (`src/lib/content.ts`): Added `stripDatePrefix()` function to remove `YYYY-MM-DD-` pattern from filenames before generating URL slugs

**Post lookup** (`src/lib/blog.ts`): Enhanced `getBlogPost()` to search for files with date prefixes when given a clean slug

**Result**: 
- Filename: `2025-11-25-planton-will-become-the-next-postman.md`
- URL: `/blog/planton-will-become-the-next-postman` (no date)

### Data Extraction Process

Dates were extracted directly from the `date` field in each post's YAML frontmatter:

```yaml
---
title: "Blog Post Title"
date: "2025-11-25"  # ← Source of truth for date prefix
---
```

This ensured the filename date matched the publication date exactly.

## Benefits

### Improved File Organization

**Chronological sorting**: Files now naturally sort by publication date in any file browser or terminal listing

```bash
# File listing now shows:
2025-03-18-37-signals-in-datacenter.md
2025-03-19-consulting-to-product-ideas.md
2025-03-20-cloud-vs-datacenter-debate.md
...
2025-11-25-planton-will-become-the-next-postman.md
2025-11-26-what-i-learned-from-elon-musk-biography.md
```

**Grouped content**: Blog posts and their images stay together:

```bash
# Images directory:
2025-11-25-planton-will-become-the-next-postman.cover.png
2025-11-25-planton-will-become-the-next-postman-logos.png
2025-11-25-planton-will-become-the-next-postman-origin.jpg
2025-11-25-planton-will-become-the-next-postman-adoption.jpg
```

### Enhanced Developer Experience

**Instant visibility**: Publication order is immediately apparent without opening files

**Easier navigation**: Finding recent posts is as simple as scrolling to the bottom of the list

**Better git diffs**: When reviewing changes, chronological context is built into the filename

**Search optimization**: Can filter files by date prefix patterns (`ls 2025-11-*` shows November posts)

### Clean User-Facing URLs

**No dates in URLs**: Blog post URLs remain clean and readable (`/blog/planton-will-become-the-next-postman`)

**SEO-friendly**: Descriptive slugs without date clutter improve shareability

**Flexibility**: Can change publication dates in frontmatter without breaking URLs

**Best of both worlds**: Organized files + beautiful URLs

### Future-Proof Structure

**Scalable**: As the blog grows to 50, 100, or 200+ posts, organization remains clear

**Consistent**: New posts automatically follow the same pattern via the updated cursor rule

**Predictable**: Date-based naming is a universally understood convention

## Impact

### Content Organization

**17 blog posts** now have date prefixes matching their publication dates

**32 image files** renamed to align with their associated blog posts

**Zero breaking changes**: All internal references updated, no broken image links

### Developer Workflow

**New content creation**: Automated via cursor rule—future blog posts will have date prefixes from creation

**Existing content**: Fully retroactively applied—entire blog history is now consistently organized

**File browsing**: Immediate improvement in navigating the blog directory

### Visitor Experience

**No impact**: This is purely a backend organizational change—website visitors see no difference in blog post URLs or presentation

## Related Work

This enhancement builds on recent blog system improvements:

- **Blog and Talks Content Platform** (2025-11-23): Established the markdown-based blog system this organization applies to
- **Blog Talks Platform Polish** (2025-11-23): Refined the blog presentation that these organized files power
- **Publish as Blog Post Rule** (Previously created): The cursor rule that now includes date prefixing automation

Future work this enables:

- **Date-based archives**: Could implement `/blog/2025/11/` style URL routing
- **Timeline views**: Chronologically ordered blog listings
- **Year-in-review features**: Easy to filter posts by date patterns

## Technical Notes

### File Operations

All file operations used `mv` commands to preserve file history and avoid creating duplicates

No files were deleted—all renames were atomic operations

Git will show these as renames, maintaining file history

### Path Consistency

The double-slash issue in some old featured_image paths (`/blog/images//filename.png`) was also corrected during the update to single slashes (`/blog/images/2025-11-25-filename.png`)

### URL Slug Mapping Architecture

**Two-part system** ensures clean URLs with organized files:

1. **Slug Generation** (`generateSlugFromPath` in `content.ts`):
   - Strips `YYYY-MM-DD-` prefix from filename
   - Sanitizes remaining string to URL-safe format
   - Example: `2025-11-25-planton-will-become-the-next-postman.md` → `planton-will-become-the-next-postman`

2. **Post Lookup** (`getBlogPost` in `blog.ts`):
   - Receives clean slug from URL
   - Searches directory for matching file with any date prefix
   - Uses regex pattern `/^\d{4}-\d{2}-\d{2}-/` to identify date prefixes
   - Falls back to exact match for backward compatibility

**Lookup algorithm**:
```
1. Try exact match: {slug}.md
2. If not found, scan directory:
   - For each file matching YYYY-MM-DD-*.md
   - Strip date prefix
   - Compare with requested slug
3. Return matching file or directory/index.md
```

### Backward Compatibility

Multiple layers of compatibility:

**File lookup**: Tries exact filename match first, then date-prefixed match
- Old files without dates: Still work (`consulting-to-product-ideas.md`)
- New files with dates: Work via pattern matching (`2025-03-19-consulting-to-product-ideas.md`)

**URL structure**: Completely unchanged
- Blog post frontmatter dates remain the source of truth
- URLs derived from slugs (no dates)
- All image links updated to prevent 404s

**Migration path**: Can gradually add date prefixes or do batch updates—both work simultaneously

---

**Status**: ✅ Live

**Files Modified**: 
- 1 cursor rule (`publish-as-blog-post.mdc`)
- 2 library files (`src/lib/content.ts`, `src/lib/blog.ts`)
- 17 blog posts (markdown files)
- 32 images (cover + embedded)
- **Total**: 52 files

**Net Effect**: Complete organizational overhaul of blog content with clean URL mapping and zero functional regression

**Key Achievement**: Chronologically organized files + beautiful, date-free URLs working seamlessly together

