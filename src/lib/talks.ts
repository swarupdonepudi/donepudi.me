import {
  getMarkdownContent,
  scanMarkdownFiles,
  generateExcerpt,
  sortByDate,
  MarkdownContent,
  FrontmatterData,
} from './content';
import path from 'path';

/**
 * Talks-specific utilities
 */

export interface TalkFrontmatter extends FrontmatterData {
  title: string;
  event: string;
  date: string;
  location?: string;
  audience_size?: string;
  excerpt?: string;
  has_presentation?: boolean;
  status?: 'upcoming' | 'completed';
  video_url?: string;
  slides_url?: string;
}

export interface Talk extends MarkdownContent {
  frontmatter: TalkFrontmatter;
}

const TALKS_DIR = 'public/talks';

/**
 * Get all talks
 */
export async function getAllTalks(): Promise<Talk[]> {
  const markdownFiles = scanMarkdownFiles(TALKS_DIR);
  const talks: Talk[] = [];

  for (const file of markdownFiles) {
    // Only get index.md files (talk introductions)
    if (file.endsWith('index.md')) {
      const talk = await getTalk(file);
      if (talk) {
        talks.push(talk);
      }
    }
  }

  // Sort by date, newest/upcoming first
  return sortByDate(talks);
}

/**
 * Get a single talk by slug or file path
 */
export async function getTalk(slugOrPath: string): Promise<Talk | null> {
  let filePath: string;

  // If it's already a path, use it
  if (slugOrPath.includes('/')) {
    filePath = slugOrPath;
  } else {
    // Try to find the talk directory
    filePath = `${TALKS_DIR}/${slugOrPath}/index.md`;
  }

  const content = await getMarkdownContent(filePath);
  
  if (!content) {
    return null;
  }

  // Ensure required fields exist
  if (!content.frontmatter.title) {
    console.warn(`Talk ${filePath} is missing required 'title' field`);
    return null;
  }

  if (!content.frontmatter.event) {
    console.warn(`Talk ${filePath} is missing required 'event' field`);
    return null;
  }

  if (!content.frontmatter.date) {
    console.warn(`Talk ${filePath} is missing required 'date' field`);
    return null;
  }

  // Generate excerpt if not provided
  if (!content.frontmatter.excerpt && content.content) {
    content.frontmatter.excerpt = generateExcerpt(content.content);
  }

  // Determine status based on date if not explicitly set
  if (!content.frontmatter.status) {
    const talkDate = new Date(content.frontmatter.date);
    const now = new Date();
    content.frontmatter.status = talkDate > now ? 'upcoming' : 'completed';
  }

  return content as Talk;
}

/**
 * Get organizer notes for a talk
 */
export async function getTalkOrganizerNotes(slug: string): Promise<MarkdownContent | null> {
  const filePath = `${TALKS_DIR}/${slug}/organizer.md`;
  return await getMarkdownContent(filePath);
}

/**
 * Check if talk has a presentation component
 */
export function hasPresentationComponent(slug: string): boolean {
  try {
    const fs = require('fs');
    const presentationPath = path.join(
      process.cwd(),
      'src',
      'components',
      'talks',
      slug,
      'TalkPresentation.tsx'
    );
    return fs.existsSync(presentationPath);
  } catch (error) {
    return false;
  }
}

/**
 * Get upcoming talks
 */
export async function getUpcomingTalks(): Promise<Talk[]> {
  const allTalks = await getAllTalks();
  const now = new Date();
  
  return allTalks
    .filter(talk => new Date(talk.frontmatter.date) > now)
    .sort((a, b) => {
      // Sort upcoming talks by date, soonest first
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateA - dateB;
    });
}

/**
 * Get past talks
 */
export async function getPastTalks(): Promise<Talk[]> {
  const allTalks = await getAllTalks();
  const now = new Date();
  
  return allTalks
    .filter(talk => new Date(talk.frontmatter.date) <= now)
    .sort((a, b) => {
      // Sort past talks by date, most recent first
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });
}

/**
 * Get talk metadata (without full content)
 */
export async function getTalkMetadata(slug: string): Promise<TalkFrontmatter | null> {
  const talk = await getTalk(slug);
  return talk ? talk.frontmatter : null;
}

/**
 * Get recent talks (limit number)
 */
export async function getRecentTalks(limit: number = 3): Promise<Talk[]> {
  const allTalks = await getAllTalks();
  return allTalks.slice(0, limit);
}


