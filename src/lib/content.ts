import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Shared content utilities for markdown parsing and file system operations
 * Inspired by project-planton site/src/app/docs/utils/fileSystem.ts
 */

export interface FrontmatterData {
  title?: string;
  date?: string;
  excerpt?: string;
  [key: string]: any;
}

export interface MarkdownContent {
  frontmatter: FrontmatterData;
  content: string;
  slug: string;
}

/**
 * Read and parse markdown file with frontmatter
 */
export async function getMarkdownContent(filePath: string): Promise<MarkdownContent | null> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data as FrontmatterData,
      content,
      slug: generateSlugFromPath(filePath),
    };
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    return null;
  }
}

/**
 * Generate clean slug from file path
 */
export function generateSlugFromPath(filePath: string): string {
  // Extract filename without extension
  const basename = path.basename(filePath, path.extname(filePath));
  
  // Only strip date prefix for blog content, keep it for talks
  const shouldStripDate = filePath.includes('/blog/');
  
  // If it's index.md, use the parent directory name
  if (basename === 'index' || basename === 'README') {
    const parentDir = path.dirname(filePath);
    const dirName = path.basename(parentDir);
    return sanitizeSlug(shouldStripDate ? stripDatePrefix(dirName) : dirName);
  }
  
  // Strip date prefix from filename only for blog content
  const withoutDatePrefix = shouldStripDate ? stripDatePrefix(basename) : basename;
  
  return sanitizeSlug(withoutDatePrefix);
}

/**
 * Strip date prefix (YYYY-MM-DD-) from filename
 */
function stripDatePrefix(str: string): string {
  // Match and remove YYYY-MM-DD- pattern at the start
  return str.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/**
 * Sanitize string to be URL-safe slug
 */
export function sanitizeSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars except spaces and hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Scan directory for markdown files
 */
export function scanMarkdownFiles(dirPath: string): string[] {
  try {
    const fullPath = path.join(process.cwd(), dirPath);
    
    if (!fs.existsSync(fullPath)) {
      return [];
    }

    const entries = fs.readdirSync(fullPath, { withFileTypes: true });
    const markdownFiles: string[] = [];

    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Look for index.md or README.md in subdirectories
        const indexPath = path.join(entryPath, 'index.md');
        const readmePath = path.join(entryPath, 'README.md');
        
        if (fs.existsSync(path.join(process.cwd(), indexPath))) {
          markdownFiles.push(indexPath);
        } else if (fs.existsSync(path.join(process.cwd(), readmePath))) {
          markdownFiles.push(readmePath);
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Skip README.md at root level (typically documentation, not content)
        if (entry.name !== 'README.md') {
          markdownFiles.push(entryPath);
        }
      }
    }

    return markdownFiles;
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    return [];
  }
}

/**
 * Format date string to readable format
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Generate excerpt from content if not provided in frontmatter
 */
export function generateExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/[*_~`]/g, '') // Remove formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Truncate at last complete sentence or word
  const truncated = plainText.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastPeriod > maxLength * 0.7) {
    return truncated.substring(0, lastPeriod + 1);
  }

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }

  return truncated + '...';
}

/**
 * Sort items by date (newest first)
 */
export function sortByDate<T extends { frontmatter: { date?: string } }>(items: T[]): T[] {
  return items.sort((a, b) => {
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return dateB - dateA; // Newest first
  });
}


