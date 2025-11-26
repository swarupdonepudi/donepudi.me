import {
  getMarkdownContent,
  scanMarkdownFiles,
  generateExcerpt,
  sortByDate,
  MarkdownContent,
  FrontmatterData,
} from './content';

/**
 * Blog-specific utilities
 */

export interface BlogPostFrontmatter extends FrontmatterData {
  title: string;
  date: string;
  excerpt?: string;
  featured_image?: string;
  author?: string;
  tags?: string[];
}

export interface BlogPost extends MarkdownContent {
  frontmatter: BlogPostFrontmatter;
}

const BLOG_DIR = 'public/blog';

/**
 * Get all blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const markdownFiles = scanMarkdownFiles(BLOG_DIR);
  const posts: BlogPost[] = [];

  for (const file of markdownFiles) {
    const post = await getBlogPost(file);
    if (post) {
      posts.push(post);
    }
  }

  // Sort by date, newest first
  return sortByDate(posts);
}

/**
 * Get a single blog post by slug or file path
 */
export async function getBlogPost(slugOrPath: string): Promise<BlogPost | null> {
  let filePath: string;

  // If it's already a path, use it
  if (slugOrPath.includes('/')) {
    filePath = slugOrPath;
  } else {
    // Try to find the file by slug, accounting for date prefixes (YYYY-MM-DD-)
    const fs = await import('fs');
    const path = await import('path');
    const blogPath = path.join(process.cwd(), BLOG_DIR);
    
    // First try exact match (backward compatibility with non-dated files)
    const exactMatch = `${BLOG_DIR}/${slugOrPath}.md`;
    if (fs.existsSync(path.join(process.cwd(), exactMatch))) {
      filePath = exactMatch;
    } else {
      // Search for files with date prefix (YYYY-MM-DD-slug.md)
      const files = fs.readdirSync(blogPath);
      const matchingFile = files.find(file => {
        // Match pattern: YYYY-MM-DD-{slug}.md
        const datePrefix = /^\d{4}-\d{2}-\d{2}-/;
        if (datePrefix.test(file) && file.endsWith('.md')) {
          const fileWithoutDate = file.replace(datePrefix, '');
          return fileWithoutDate === `${slugOrPath}.md`;
        }
        return false;
      });
      
      if (matchingFile) {
        filePath = `${BLOG_DIR}/${matchingFile}`;
      } else {
        // Also check for directory with index.md
        const dirPath = `${BLOG_DIR}/${slugOrPath}/index.md`;
        if (fs.existsSync(path.join(process.cwd(), dirPath))) {
          filePath = dirPath;
        } else {
          // File not found
          filePath = `${BLOG_DIR}/${slugOrPath}.md`; // Will return null below
        }
      }
    }
  }

  const content = await getMarkdownContent(filePath);
  
  if (!content) {
    return null;
  }

  // Ensure required fields exist
  if (!content.frontmatter.title) {
    console.warn(`Blog post ${filePath} is missing required 'title' field`);
    return null;
  }

  if (!content.frontmatter.date) {
    console.warn(`Blog post ${filePath} is missing required 'date' field`);
    return null;
  }

  // Generate excerpt if not provided
  if (!content.frontmatter.excerpt && content.content) {
    content.frontmatter.excerpt = generateExcerpt(content.content);
  }

  return content as BlogPost;
}

/**
 * Get blog post metadata (without full content)
 */
export async function getBlogPostMetadata(slug: string): Promise<BlogPostFrontmatter | null> {
  const post = await getBlogPost(slug);
  return post ? post.frontmatter : null;
}

/**
 * Get recent blog posts (limit number)
 */
export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.slice(0, limit);
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => 
    post.frontmatter.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const tagsSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.frontmatter.tags?.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}


