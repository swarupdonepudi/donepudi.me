# Fix Talk 404 Error with Conditional Date Prefix Stripping

**Date**: November 29, 2025  
**Type**: Bug Fix  
**Areas**: Talks, URL Routing, Content Management

## Summary

Fixed a 404 error on talk pages caused by unintended date prefix stripping in talk URLs. After implementing date prefixes for blog posts to enable clean URLs, the shared slug generation function also stripped dates from talk URLs, breaking the routing. Implemented conditional date stripping that preserves dates in talk URLs while removing them from blog URLs, restoring the intended URL structure for both content types.

## Motivation / Background

During the November 26 date prefix implementation for blog posts, a shared utility function `generateSlugFromPath()` was updated to strip date prefixes from all file paths. This was intentional for blogs (enabling URLs like `/blog/planton-will-become-the-next-postman` instead of `/blog/2025-11-25-planton-will-become-the-next-postman`), but it inadvertently affected talks as well.

**The Problem**:
- Talk folder: `public/talks/2025-11-29-hyderabad-cncf-meetup/`
- Generated slug: `hyderabad-cncf-meetup` (date stripped)
- Expected URL: `/talks/2025-11-29-hyderabad-cncf-meetup/`
- Actual URL attempt: `/talks/hyderabad-cncf-meetup/` → **404 Not Found**

Unlike blogs where date-free URLs are desirable for SEO and readability, talks should retain date prefixes in their URLs to maintain chronological context and event timing information.

### Goals

- ✅ Fix 404 error on talk pages
- ✅ Preserve date prefixes in talk URLs (`/talks/2025-11-29-hyderabad-cncf-meetup/`)
- ✅ Maintain date-free URLs for blog posts (`/blog/planton-will-become-the-next-postman`)
- ✅ Keep backward compatibility with existing URL patterns

## What Changed

### Core Fix

Updated `generateSlugFromPath()` in [`src/lib/content.ts`](src/lib/content.ts) to conditionally strip date prefixes based on content type:

**Before** (line 59):
```typescript
return sanitizeSlug(stripDatePrefix(dirName));
```

**After**:
```typescript
// Only strip date prefix for blog content, keep it for talks
const shouldStripDate = filePath.includes('/blog/');
return sanitizeSlug(shouldStripDate ? stripDatePrefix(dirName) : dirName);
```

The fix checks if the file path contains `/blog/` and only applies date stripping for blog content, leaving talk URLs intact with their date prefixes.

### Implementation Details

**File Modified**: `src/lib/content.ts`

**Changes**:
1. Added `shouldStripDate` boolean check based on file path
2. Applied conditional logic in both index file handling (line 60) and regular file handling (line 65)
3. Maintained the existing `stripDatePrefix()` function unchanged

**Code Structure**:
```typescript
export function generateSlugFromPath(filePath: string): string {
  const basename = path.basename(filePath, path.extname(filePath));
  
  // Only strip date prefix for blog content, keep it for talks
  const shouldStripDate = filePath.includes('/blog/');
  
  if (basename === 'index' || basename === 'README') {
    const parentDir = path.dirname(filePath);
    const dirName = path.basename(parentDir);
    return sanitizeSlug(shouldStripDate ? stripDatePrefix(dirName) : dirName);
  }
  
  // Strip date prefix from filename only for blog content
  const withoutDatePrefix = shouldStripDate ? stripDatePrefix(basename) : basename;
  
  return sanitizeSlug(withoutDatePrefix);
}
```

## Testing & Verification

### Build Verification

Build succeeded with correct route generation:

**Talk Routes (with dates)**:
- `/talks/2025-11-29-hyderabad-cncf-meetup`
- `/talks/2025-11-29-hyderabad-cncf-meetup/organizer`
- `/talks/2025-11-29-hyderabad-cncf-meetup/present`

**Blog Routes (without dates)**:
- `/blog/planton-will-become-the-next-postman`
- `/blog/what-i-learned-from-elon-musk-biography`
- `/blog/july-month-reflection-balance-breakthroughs-resilience`

### Browser Testing

**Talk Page** (`http://localhost:4173/talks/2025-11-29-hyderabad-cncf-meetup/`):
- ✅ Loads successfully with full content
- ✅ Page title renders correctly
- ✅ Navigation functional
- ✅ "Start Presenting" button accessible
- ✅ Copy Markdown button works

**Blog Page** (`http://localhost:4173/blog/planton-will-become-the-next-postman`):
- ✅ Loads successfully with full content
- ✅ Images render correctly
- ✅ Navigation functional
- ✅ No regressions in existing functionality

## Benefits

### Immediate Fix
- **404 error resolved**: Talk pages now load at their correct URLs
- **No breaking changes**: Existing blog URLs continue to work
- **Minimal code change**: Single function modification

### URL Structure Clarity
- **Blogs**: Clean, SEO-friendly URLs without dates
  - Example: `/blog/planton-will-become-the-next-postman`
- **Talks**: Chronological URLs with event context
  - Example: `/talks/2025-11-29-hyderabad-cncf-meetup`

### Developer Experience
- **Clear intent**: URL patterns reflect content type purposes
- **Maintainable**: Conditional logic is simple and easy to understand
- **Extensible**: Can add more content types with specific URL patterns

## Impact

### For Site Visitors
- **Working navigation**: All talk links now function correctly
- **No confusion**: Date-prefixed talk URLs provide clear event context
- **Consistent experience**: Both blog and talk content accessible

### For Content Management
- **File organization**: Date-prefixed folders remain organized chronologically
- **URL flexibility**: Different URL patterns for different content types
- **Future-proof**: Pattern supports additional content types

## Related Work

**Previous Changes**:
- `2025-11-26-070027-add-date-prefixes-to-blog-posts-and-images.md` - Original date prefix implementation that introduced this bug
- `2025-11-23-114916-mobile-ux-improvements-talk-page-restructure.md` - Recent talk page improvements now accessible again

**Dependencies**:
- Shared utility functions in `src/lib/content.ts`
- Blog-specific utilities in `src/lib/blog.ts`
- Talk-specific utilities in `src/lib/talks.ts`

## Technical Notes

### Why Different URL Patterns?

**Blogs** strip dates because:
- SEO benefits from clean, descriptive URLs
- Blog posts are discovered through search and topic, not date
- Timeless content should have timeless URLs

**Talks** keep dates because:
- Event context matters (when did this happen?)
- Talks are time-bound events
- Chronological ordering is important for event listings

### Backward Compatibility

The fix maintains backward compatibility:
- Existing blog URLs continue to work (date stripping still applied)
- No URL redirects needed
- Static site generation produces correct routes

---

**Status**: ✅ Live

**Files Modified**: 1 (`src/lib/content.ts`)

**Lines Changed**: 3 lines modified in one function

**Testing**: Build successful, browser verification completed for both content types

