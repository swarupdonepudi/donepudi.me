# Bootstrap Courses Section with Teaching Components

**Date**: January 21, 2026
**Type**: Feature
**Areas**: Content, UI Components, Navigation, Design System

## Summary

Built a complete courses section for donepudi.me with specialized teaching components, course/lesson management infrastructure, and starter content for "Practical Unix" and "Terraform Fundamentals" courses. The system supports interactive learning with terminal demonstrations, callouts, command explanations, and progress tracking. The courses section is fully functional but temporarily removed from navigation while content is being developed.

## Motivation / Background

The portfolio site had Blog for written content and Talks for presentations, but lacked a structured way to teach technical skills through hands-on courses. Creating courses allows sharing knowledge in a more structured, progressive format with interactive elements that books and blog posts can't provide.

### Goals
- Create reusable teaching components suitable for technical education
- Build a flexible course/lesson system that scales
- Provide rich interactive elements (terminal blocks, callouts, command breakdowns)
- Start with two practical courses: Unix fundamentals and Terraform
- Maintain consistency with existing Blog/Talks patterns

## What Changed

Added a complete courses infrastructure to the site with:

1. **Content Management System**: Course and lesson data models, file-based content in markdown
2. **Teaching Components**: Specialized UI components for technical education
3. **Three-Level Navigation**: Courses list → Course overview → Individual lessons
4. **Sample Content**: Two starter courses with initial lessons
5. **Progress Tracking**: Visual indicators and lesson navigation

### Key Features/Components

**Course Library** (`src/lib/courses.ts`):
- `Course` and `Lesson` TypeScript interfaces with frontmatter definitions
- Functions to fetch courses, lessons, and adjacent lessons for navigation
- Progress calculation utilities
- Difficulty color mapping

**Teaching Components** (7 components in `src/components/courses/`):

1. **Terminal** - Interactive terminal display with:
   - macOS-style window chrome with traffic light buttons
   - Command line with optional prompt (`$`)
   - Output section for command results
   - Copy-to-clipboard functionality

2. **Callout** - Contextual information boxes with variants:
   - `info` (blue) - General information
   - `warning` (yellow) - Cautions and warnings
   - `tip` (green) - Helpful tips and best practices
   - `danger` (red) - Critical warnings

3. **CommandExplain** - Interactive command breakdown:
   - Hover/click on command parts to see explanations
   - Color-coded by type (command, flag, argument, option)
   - Legend showing what each color represents

4. **LessonNavigation** - Next/previous lesson buttons:
   - Smart routing (back to course when at boundaries)
   - Progress context ("Lesson X of Y")
   - Completion indication on final lesson

5. **CourseProgress** - Visual progress bar:
   - Percentage and lesson count display
   - Smooth animations
   - Gradient fill (cyan to blue)

6. **CourseSidebar** - Course outline navigation:
   - Expandable/collapsible
   - Current lesson highlighted
   - Checkmarks for completed lessons
   - Integrated progress bar

7. **CourseMarkdownRenderer** - Extended markdown renderer:
   - All standard markdown with course-specific styling
   - Support for custom HTML components in markdown
   - Enhanced code blocks and tables
   - Callout shorthand tags (`<tip>`, `<warning>`, etc.)

**Page Structure**:

Three pages following Next.js App Router patterns:

1. `/courses` - Course listing with difficulty badges, duration, lesson counts
2. `/courses/[courseSlug]` - Course overview with syllabus sidebar
3. `/courses/[courseSlug]/[lessonSlug]` - Lesson content with sidebar navigation

## Implementation Details

### Content Structure

Courses stored in `public/courses/` with this hierarchy:

```
public/courses/
├── practical-unix/
│   ├── index.md           # Course metadata
│   └── lessons/
│       ├── 01-introduction.md
│       └── 02-navigation.md
└── terraform/
    ├── index.md
    └── lessons/
        └── 01-introduction.md
```

### Frontmatter Schema

**Course metadata**:
```yaml
---
title: Practical Unix
description: Master essential Unix commands...
difficulty: beginner | intermediate | advanced
duration: 4 hours
tags: [unix, linux, command-line]
status: draft | published
---
```

**Lesson metadata**:
```yaml
---
title: Getting Started with the Terminal
order: 1
duration: 15 min
objectives:
  - Understand what a shell is
  - Run your first commands
---
```

### Component Patterns

**Terminal Component Example**:
```tsx
<Terminal 
  command="ls -la /home" 
  output="drwxr-xr-x 5 user staff 160 Dec 14 10:30 ."
  title="List directory contents"
/>
```

**Callout in Markdown**:
```markdown
<tip>
Use tab completion to avoid typos and save time!
</tip>
```

**Command Explanation**:
```tsx
<CommandExplain parts={[
  { text: 'grep', explanation: 'Search for patterns', type: 'command' },
  { text: '-r', explanation: 'Recursive search', type: 'flag' },
  { text: 'pattern', explanation: 'Text to find', type: 'argument' }
]} />
```

### Data Flow

```
Markdown files → courses.ts library → Page components → Teaching components
                     ↓
                State/Progress → Sidebar/Navigation
```

Static generation at build time:
- `generateStaticParams()` creates routes for all courses/lessons
- Content parsed once, cached in build artifacts
- Fast page loads with no runtime markdown parsing

### Design System Integration

All components use existing design tokens:
- Colors: cyan-400 primary, gray-300/400 text
- Backgrounds: black/40 with backdrop blur
- Borders: cyan-500/20 for subtle separation
- Spacing: consistent with blog/talks patterns

## Visual/UX Impact

**Course Listing** (`/courses`):
- Grid layout with course cards
- Difficulty badges (color-coded: green/yellow/red)
- Duration and lesson count badges
- Featured images for courses
- Hover effects with shadow and border color shift

**Course Overview** (`/courses/[slug]`):
- Hero section with course metadata
- Markdown content area for course description
- Sticky sidebar with:
  - "Start Course" CTA button (gradient cyan-blue)
  - Course stats (lessons, difficulty, duration)
  - Full syllabus with clickable lesson list

**Lesson Page** (`/courses/[slug]/[lesson]`):
- Breadcrumb navigation showing course title
- Progress bar in header (shows X of Y lessons)
- Two-column layout:
  - Main content area (lesson markdown)
  - Sidebar with course outline
- Learning objectives highlighted at top
- Prev/Next navigation at bottom
- Special "Completed!" state on final lesson

**Interactive Elements**:
- Terminal blocks with realistic styling
- Callout boxes with icons and color coding
- Hoverable command explanations
- Smooth transitions and animations throughout

## Sample Content

### Practical Unix Course
**Target Audience**: Developers new to command line
**Difficulty**: Beginner
**Content**:
- Introduction: Shell basics, first commands, command structure
- Navigation: Filesystem hierarchy, `cd`, `pwd`, `ls`, shortcuts

Focus on practical, hands-on learning:
- Real command examples
- Common gotchas highlighted
- Practice exercises
- Tips from years of Unix experience

### Terraform Course
**Target Audience**: DevOps engineers starting with IaC
**Difficulty**: Intermediate
**Content**:
- Introduction: What is Terraform, installation, first configuration, workflow (init/plan/apply)

Focus on concepts and hands-on:
- Simple local provider for learning without cloud costs
- Understanding state management
- Best practices from the start

## Benefits

**For Visitors**:
- Structured learning path from beginner to advanced topics
- Interactive examples they can copy and try
- Visual feedback on progress through courses
- Mobile-friendly responsive design
- Fast page loads (static generation)

**For Content Creation**:
- Simple markdown-based authoring
- Reusable components via custom tags
- Consistent structure enforced by frontmatter
- Easy to add new courses and lessons
- Version controlled content

**For Development**:
- TypeScript types ensure data consistency
- Component library enables rich interactions
- Static generation = fast performance
- Follows existing patterns (similar to blog/talks)
- Easy to extend with new teaching components

## Technical Implementation

### Library Functions

Key utilities in `courses.ts`:

```typescript
getAllCourses() → Course[]
getCourse(slug) → Course | null
getCourseLessons(courseSlug) → Lesson[]
getLesson(courseSlug, lessonSlug) → Lesson | null
getAdjacentLessons(courseSlug, lessonSlug) → { prev, next }
getLessonProgress(lessons, currentSlug) → { current, total, percentage }
getDifficultyColor(difficulty) → string
```

### Component Architecture

**Terminal Component**:
- Client component (`'use client'`)
- Clipboard API for copy functionality
- Conditional sections (header, command, output)
- Accessible button with visual feedback

**Callout Component**:
- Variant-based styling (info/warning/tip/danger)
- Icon mapping with lucide-react
- Flexible children content
- Default titles per variant

**CourseSidebar**:
- Collapsible with animation
- Current lesson highlighted
- Past lessons marked with checkmarks
- Click to navigate to any lesson

### Markdown Rendering

Extended `react-markdown` with custom components:

```typescript
<ReactMarkdown
  components={{
    terminal: (props) => <Terminal {...props} />,
    tip: (props) => <Callout variant="tip" {...props} />,
    // ... other custom components
  }}
>
  {content}
</ReactMarkdown>
```

Supports both:
- HTML tags in markdown: `<terminal command="ls" />`
- Shorthand tags: `<tip>Use this approach</tip>`

### Routing and Static Generation

Next.js App Router patterns:

```typescript
// Generate static paths at build time
export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map(course => ({
    courseSlug: course.slug
  }));
}
```

All pages pre-rendered:
- `/courses` - static
- `/courses/practical-unix` - static
- `/courses/practical-unix/01-introduction` - static
- etc.

## Build Output

Successful build with all routes generated:

```
Route (app)
├ ○ /courses
├ ● /courses/[courseSlug]
│   ├ /courses/practical-unix
│   └ /courses/terraform
└ ● /courses/[courseSlug]/[lessonSlug]
    ├ /courses/practical-unix/01-introduction
    ├ /courses/practical-unix/02-navigation
    └ /courses/terraform/01-introduction

○ (Static)  prerendered as static content
● (SSG)     prerendered as static HTML
```

Total: 6 new static pages

## Current Status

**Implemented**:
- ✅ Complete course infrastructure
- ✅ All teaching components
- ✅ Three-level page hierarchy
- ✅ Course and lesson management
- ✅ Two starter courses with lessons
- ✅ Progress tracking
- ✅ Navigation and sidebar
- ✅ Responsive design
- ✅ Build verification

**Temporarily Disabled**:
- ⏸️ "Courses" link removed from header navigation (will be re-added when content is ready)

**Remaining Work**:
- Additional lesson content for Practical Unix
- Additional lesson content for Terraform
- More courses as content develops
- Potential enhancements:
  - Quiz/assessment components
  - Code playground integration
  - Video embedding
  - Completion tracking (localStorage)
  - Certificate generation

## Design Decisions

**Why file-based content?**
- Follows proven pattern from blog/talks
- Easy to edit, version control, and review
- Fast static generation
- No database needed

**Why custom markdown components?**
- Standard markdown lacks interactive elements
- Custom components provide richer learning experience
- Extensible - can add more component types
- Maintains content readability (looks like enhanced markdown)

**Why three-level hierarchy?**
- Scales well (courses → lessons → sections)
- Matches mental model of online courses
- Allows course overview before diving in
- Easy navigation between related content

**Why static generation?**
- Fast page loads for learners
- SEO friendly
- No server runtime needed
- Content rarely changes minute-to-minute

**Why remove from navigation temporarily?**
- Content still being developed
- Better UX to launch with complete courses
- Internal/preview access still works via direct URLs
- Easy to re-enable by adding one line to nav array

## Files Created

**Library**:
- `src/lib/courses.ts` (202 lines)

**Components** (7 files, ~600 lines):
- `src/components/courses/Terminal.tsx`
- `src/components/courses/Callout.tsx`
- `src/components/courses/CommandExplain.tsx`
- `src/components/courses/LessonNavigation.tsx`
- `src/components/courses/CourseProgress.tsx`
- `src/components/courses/CourseSidebar.tsx`
- `src/components/courses/CourseMarkdownRenderer.tsx`

**Pages** (3 files, ~400 lines):
- `src/app/courses/page.tsx`
- `src/app/courses/[courseSlug]/page.tsx`
- `src/app/courses/[courseSlug]/[lessonSlug]/page.tsx`

**Content** (5 files):
- `public/courses/practical-unix/index.md`
- `public/courses/practical-unix/lessons/01-introduction.md`
- `public/courses/practical-unix/lessons/02-navigation.md`
- `public/courses/terraform/index.md`
- `public/courses/terraform/lessons/01-introduction.md`

**Modified**:
- `src/components/Header.tsx` (added/removed "Courses" link)
- `src/components/Home.jsx` (nav update - reverted)

Total: **16 new files, ~1400 lines of code**

## Impact

**Content Creators**:
- New medium for sharing knowledge
- Structured format encourages thoroughness
- Reusable components speed up lesson creation

**Developers (Future)**:
- Clean patterns to follow for new courses
- Component library for technical content
- Well-documented code structure

**Site Visitors (When Launched)**:
- New way to learn from practical, hands-on courses
- Progress tracking keeps motivation high
- Interactive elements aid understanding

**Portfolio Impact**:
- Demonstrates full-stack capability (content to component design)
- Shows teaching/mentoring ability
- Differentiates from typical developer portfolios

## Related Work

**Similar Patterns**:
- Blog system (`src/app/blog/`, `src/lib/blog.ts`)
- Talks system (`src/app/talks/`, `src/lib/talks.ts`)
- Markdown rendering (`src/components/blog/MarkdownRenderer.tsx`)

**Leveraged Components**:
- UI library (`src/components/ui/`) for buttons, etc.
- Design tokens (colors, spacing) from existing system
- Layout patterns (header, navigation) consistent site-wide

**Future Connections**:
- Could link blog posts to relevant course lessons
- Could reference course concepts in talks
- Could create "learning paths" across all content types

## Future Enhancements

**Content**:
- Complete Practical Unix (file operations, text processing, pipes, scripting)
- Complete Terraform (providers, resources, modules, state, best practices)
- New courses: Kubernetes, Docker, CI/CD, Cloud platforms

**Features**:
- Code playgrounds (embed sandboxes for safe experimentation)
- Video integration (complement lessons with recorded demos)
- Quizzes/assessments (test understanding)
- Progress persistence (track completion across sessions)
- Course completion certificates
- Discussion/comments per lesson
- Search across course content
- Course recommendations based on skill level
- Dark/light mode toggle (currently dark only)

**Analytics**:
- Track which lessons are most viewed
- Identify where learners drop off
- Measure time spent on lessons
- A/B test different teaching approaches

## Lessons Learned

**Component Design**:
- Interactive components need both visual and keyboard accessibility
- Reusable components need flexible APIs (props for all customization)
- Copy-to-clipboard is essential for code examples

**Content Structure**:
- Frontmatter enforces consistency
- Order field better than relying on file naming
- Objectives at lesson start set clear expectations

**Technical**:
- Static generation works great for educational content
- TypeScript types catch data inconsistencies early
- Following existing patterns speeds development

**UX**:
- Progress indicators motivate completion
- Sidebar navigation prevents getting lost
- Interactive elements (hover, click) increase engagement

---

**Status**: ✅ Implemented (hidden from navigation until content complete)

**Next Steps**: Create additional lesson content to complete initial course offerings, then re-enable navigation link to publicly launch courses section.
