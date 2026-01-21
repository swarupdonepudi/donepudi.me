import {
  getMarkdownContent,
  scanMarkdownFiles,
  generateExcerpt,
  sortByDate,
  MarkdownContent,
  FrontmatterData,
} from './content';

/**
 * Fastlane-specific utilities
 * 
 * Fastlane is a personal timeline - quick captures of thoughts and moments.
 * Unlike blog posts, entries are minimal: just title, date, and optional tags.
 */

export interface FastlaneEntryFrontmatter extends FrontmatterData {
  title: string;
  date: string;
  tags?: string[];
}

export interface FastlaneEntry extends MarkdownContent {
  frontmatter: FastlaneEntryFrontmatter;
  excerpt: string;
}

const FASTLANE_DIR = 'public/fastlane';

/**
 * Get all fastlane entries sorted by date (newest first)
 */
export async function getAllFastlaneEntries(): Promise<FastlaneEntry[]> {
  const markdownFiles = scanMarkdownFiles(FASTLANE_DIR);
  const entries: FastlaneEntry[] = [];

  for (const file of markdownFiles) {
    const entry = await getFastlaneEntry(file);
    if (entry) {
      entries.push(entry);
    }
  }

  return sortByDate(entries);
}

/**
 * Get a single fastlane entry by slug or file path
 */
export async function getFastlaneEntry(slugOrPath: string): Promise<FastlaneEntry | null> {
  let filePath: string;

  if (slugOrPath.includes('/')) {
    // Already a path
    filePath = slugOrPath;
  } else {
    // Find file by slug, accounting for date prefixes (YYYY-MM-DD-)
    const fs = await import('fs');
    const path = await import('path');
    const fastlanePath = path.join(process.cwd(), FASTLANE_DIR);

    // First try exact match (backward compatibility)
    const exactMatch = `${FASTLANE_DIR}/${slugOrPath}.md`;
    if (fs.existsSync(path.join(process.cwd(), exactMatch))) {
      filePath = exactMatch;
    } else {
      // Search for files with date prefix (YYYY-MM-DD-slug.md)
      const files = fs.readdirSync(fastlanePath);
      const matchingFile = files.find(file => {
        const datePrefix = /^\d{4}-\d{2}-\d{2}-/;
        if (datePrefix.test(file) && file.endsWith('.md')) {
          const fileWithoutDate = file.replace(datePrefix, '');
          return fileWithoutDate === `${slugOrPath}.md`;
        }
        return false;
      });

      if (matchingFile) {
        filePath = `${FASTLANE_DIR}/${matchingFile}`;
      } else {
        // File not found
        filePath = `${FASTLANE_DIR}/${slugOrPath}.md`;
      }
    }
  }

  const content = await getMarkdownContent(filePath);

  if (!content) {
    return null;
  }

  // Validate required fields
  if (!content.frontmatter.title) {
    console.warn(`Fastlane entry ${filePath} is missing required 'title' field`);
    return null;
  }

  if (!content.frontmatter.date) {
    console.warn(`Fastlane entry ${filePath} is missing required 'date' field`);
    return null;
  }

  // Generate excerpt from content
  const excerpt = generateExcerpt(content.content, 150);

  return {
    ...content,
    frontmatter: content.frontmatter as FastlaneEntryFrontmatter,
    excerpt,
  };
}

/**
 * Get recent fastlane entries (for potential homepage widget or other uses)
 */
export async function getRecentFastlaneEntries(limit: number = 5): Promise<FastlaneEntry[]> {
  const allEntries = await getAllFastlaneEntries();
  return allEntries.slice(0, limit);
}

/**
 * Get all unique tags from fastlane entries
 */
export async function getAllFastlaneTags(): Promise<string[]> {
  const allEntries = await getAllFastlaneEntries();
  const tagsSet = new Set<string>();

  allEntries.forEach(entry => {
    entry.frontmatter.tags?.forEach(tag => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}
