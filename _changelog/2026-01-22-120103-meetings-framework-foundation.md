# Meetings Framework Foundation

**Date**: January 22, 2026
**Type**: Feature
**Areas**: Meetings, UI Components, Routing, Cursor Rules

## Summary

Built a production-grade meetings framework at `donepudi.me/meets` for creating and presenting tailored meeting decks. The framework includes a presentation engine with keyboard/touch navigation, 20+ reusable slide primitives adapted for donepudi.me's design system, a guest registry for organizing meetings, and comprehensive Cursor rules for AI-assisted deck creation.

## Motivation / Background

Inspired by the planton.ai meets micro-app, this framework enables preparing polished, web-native presentations for meetings with companies, investors, partners, advisors, and individuals. Instead of PowerPoint or Google Slides, presentations live as React components with version control, shareable URLs, and presenter notes.

### Goals

- Create memorable, easy-to-share URLs (`donepudi.me/meets/acme`)
- Build reusable presentation primitives matching donepudi.me's design language
- Enable AI-assisted deck creation through structured Cursor rules
- Support keyboard navigation, touch swipe, and presenter notes
- Maintain version history through git and dated meeting URLs

## What Changed

### URL Structure

```
/meets                    → Index page
/meets/[guest]            → Latest meeting for guest
/meets/[guest]/[date]     → Specific dated meeting
```

Example: `/meets/example/2026-01-25-1000`

### Key Components

**Presentation Engine** (`MeetingsDeck.tsx`):
- Hash-based slide navigation for deep linking (`#slide-id`)
- Keyboard shortcuts: arrows, space, N (notes), F (fullscreen), Home
- Touch swipe support for mobile presentations
- AnimatePresence slide transitions
- Presenter notes state management

**Shared Primitives** (`shared/primitives.tsx`):
20+ components with donepudi.me's cyan/violet theme:

| Category | Components |
|----------|-----------|
| Layout | `Slide`, `SlideHeader`, `Grid`, `TwoCol` |
| Typography | `SlideTitle`, `SlideSubtitle`, `SectionTag`, `CardTitle`, `CardText` |
| Cards | `Card`, `QuoteBox`, `Callout`, `HighlightCard`, `NumberedCard` |
| Data | `Metric`, `StatsGrid`, `Comparison`, `FlowDiagram` |
| Lists | `Checklist`, `IconList` |
| Badges | `Badge`, `DemoBadge` |

**Navigation** (`shared/navigation.tsx`):
- Progress bar with cyan→violet gradient
- Dot navigation for quick slide jumping
- Footer controls with keyboard hints
- Mobile swipe hint on first slide

**Presenter Notes** (`shared/presenter-notes.tsx`):
- Toggle with N key
- Amber-themed overlay panel
- Inline slot variant for embedded notes

**Guest Registry** (`guests/index.ts`):
- `GuestConfig` type for meeting metadata
- `getGuestConfig()`, `getLatestGuestConfig()`, `listGuests()` functions
- Date format: `yyyy-mm-dd-hhmm` for precise scheduling

## Implementation Details

### Design Token Adaptation

The framework uses donepudi.me's design language instead of planton.ai's:

| Aspect | planton.ai | donepudi.me |
|--------|------------|-------------|
| Primary gradient | Pink → Violet | Cyan → Violet |
| Background | `#0a0a12` | `#110D1F` |
| Section tags | Violet | Cyan |
| CTA buttons | Pink/Violet | Cyan/Violet |

### Routing Architecture

```
src/app/meets/
├── page.tsx                    # Index with redirect
├── layout.tsx                  # Shared metadata
└── [guest]/
    ├── page.tsx                # Latest meeting (SSG)
    └── [date]/
        ├── page.tsx            # Dated meeting (SSG)
        └── MeetingsDeckClient.tsx  # Client wrapper
```

### Example Deck

Created a 5-slide example deck demonstrating all major patterns:

1. **S01Cover** - Title slide with gradient text and meeting details
2. **S02Problem** - Problem framing with danger-variant cards
3. **S03Solution** - Solution with Checklist and IconList
4. **S04Stats** - StatsGrid, Comparison, and Metric components
5. **S05ThankYou** - Closing with QuoteBox and contact info

### Cursor Rules

**`create-donepudi-me-meeting-deck.mdc`** - 5-phase workflow:
1. Information Gathering - Guest profile, meeting details, content
2. Implementation - Create folder, slides, config, registry entry
3. Review - Dev server preview with keyboard navigation
4. Build Verification - `npm run build` iteration
5. Changelog - Document the new deck

**`update-donepudi-me-meeting-deck.mdc`** - Iterative refinement:
- Feedback-driven updates with hot reload
- Session tracking for changelog generation
- Build verification on completion

## Visual/UX Impact

### Presentation Experience

- Full-screen, distraction-free slides
- Smooth AnimatePresence transitions between slides
- Progress indicator shows position in deck
- Dot navigation for quick slide access
- Presenter notes hidden from audience, visible to presenter with N key

### Mobile Support

- Touch swipe for navigation
- Responsive typography scaling
- Compact navigation controls on small screens
- Swipe hint on first slide

### Keyboard Workflow

| Key | Action |
|-----|--------|
| → / Space | Next slide |
| ← | Previous slide |
| N | Toggle presenter notes |
| F | Toggle fullscreen |
| Home / H | First slide |
| End | Last slide |

## Benefits

### For Meeting Preparation

- **Version controlled**: All presentations in git with full history
- **Shareable URLs**: `donepudi.me/meets/acme` is memorable and professional
- **Presenter notes**: Built-in talking points without separate note cards
- **AI-assisted creation**: Cursor rules streamline deck creation

### For Presentation Delivery

- **Web-native**: No exports, no compatibility issues
- **Keyboard-friendly**: Professional navigation during live presentations
- **Mobile support**: Works on tablets for informal settings
- **Deep linking**: Share specific slides for follow-up discussions

### For Development

- **Reusable primitives**: 20+ components for future decks
- **Consistent patterns**: All decks share the same structure
- **Type-safe**: Full TypeScript throughout
- **Static export**: Works with GitHub Pages deployment

## Impact

### Files Created

| Category | Count | Examples |
|----------|-------|----------|
| Route files | 5 | `page.tsx`, `layout.tsx`, `MeetingsDeckClient.tsx` |
| Component files | 4 | `MeetingsDeck.tsx`, `primitives.tsx`, `navigation.tsx`, `presenter-notes.tsx` |
| Registry | 1 | `guests/index.ts` |
| Example slides | 5 | `S01Cover.tsx` through `S05ThankYou.tsx` |
| Example config | 1 | `example/config.ts` |
| Cursor rules | 2 | `create-donepudi-me-meeting-deck.mdc`, `update-donepudi-me-meeting-deck.mdc` |
| **Total** | **18** | |

### Routes Added

- `/meets` - Meetings index
- `/meets/example` - Example deck (latest)
- `/meets/example/2026-01-25-1000` - Dated example deck

## Related Work

- **planton.ai meets**: Inspiration for architecture and patterns
- **donepudi.me talks**: Existing presentation system for conference talks
- **donepudi.me design system**: Cyan/violet theme, shadcn/ui components

## Future Enhancements

- **PDF export**: Generate static PDFs for offline sharing
- **Meeting templates**: Sales, investor, partner deck templates
- **Analytics**: Track which slides resonate with guests
- **Scheduling integration**: Connect with calendar for upcoming meetings

---

**Status**: ✅ Live
**URLs**: 
- Index: `donepudi.me/meets`
- Example: `donepudi.me/meets/example`
