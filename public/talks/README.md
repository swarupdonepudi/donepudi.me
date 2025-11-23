# Adding New Talks

## Overview

This directory contains talk metadata and organizer notes. Each talk has its own folder with markdown files and an optional presentation component.

## Directory Structure

```
/talks/YYYY-MM-DD-event-name/
  index.md           # Talk introduction (public)
  organizer.md       # Organizer notes (hidden URL)
```

## Creating a New Talk

1. Create a directory with the format: `YYYY-MM-DD-event-name/`
2. Add `index.md` with talk introduction
3. Add `organizer.md` with notes for event organizers
4. Optionally create a presentation component (see below)

## Talk Introduction (index.md)

```markdown
---
title: "Your Talk Title"
event: "Event Name"
date: "2025-11-29"
location: "City, Country"
audience_size: "50-100"
excerpt: "Brief description of the talk"
has_presentation: true
status: "upcoming"
---

# Your Talk Title

## Overview

Description of what the talk covers...

## What You'll Learn

- Point 1
- Point 2
- Point 3
```

### Required Frontmatter

- `title`: Talk title
- `event`: Event name
- `date`: Talk date (YYYY-MM-DD)

### Optional Frontmatter

- `location`: Event location
- `audience_size`: Expected number of attendees
- `excerpt`: Brief description
- `has_presentation`: Whether there's a presentation component
- `status`: "upcoming" or "completed" (auto-detected from date)
- `video_url`: Link to recording
- `slides_url`: Link to downloadable slides

## Organizer Notes (organizer.md)

This file contains information for event organizers. It's not linked from the public pages but accessible via direct URL.

```markdown
---
title: "Organizer Notes"
---

# Organizer Notes: Event Name

## Speaker Bio

### Short Version

Your 50-word bio...

### Long Version

Your 150-word bio...

## Talk Requirements

### Technical Needs

- Projector requirements
- Internet needs
- Audio requirements

## Contact

Your contact information for the organizer
```

## Creating a Presentation Component

For sophisticated slide-based presentations:

1. Create a folder: `/src/components/talks/YYYY-MM-DD-event-name/`
2. Create `TalkPresentation.tsx` (see example in `2025-11-29-hyderabad-cncf-meetup/`)

The presentation will be accessible at: `/talks/YYYY-MM-DD-event-name/present`

### Presentation Features

- Arrow key navigation
- Progress bar
- Home button
- Keyboard shortcuts
- Full React/TypeScript for custom slides

## URLs

For a talk with slug `2025-11-29-event-name`:

- **List**: `/talks`
- **Talk home**: `/talks/2025-11-29-event-name`
- **Presentation**: `/talks/2025-11-29-event-name/present`
- **Organizer notes**: `/talks/2025-11-29-event-name/organizer` (hidden, not linked)

## Publishing

1. Add your talk folder to `/public/talks/`
2. Commit and push
3. The static site will regenerate automatically

## Tips

- Use descriptive folder names with dates
- Keep frontmatter complete for better display
- Organizer notes are hidden but not encrypted
- Presentations can be as simple or complex as you need

## Examples

See `2025-11-29-hyderabad-cncf-meetup/` for a complete example.


