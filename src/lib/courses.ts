import {
  getMarkdownContent,
  generateExcerpt,
  sortByDate,
  MarkdownContent,
  FrontmatterData,
} from './content';
import fs from 'fs';
import path from 'path';

/**
 * Course-specific utilities for managing courses and lessons
 */

export interface CourseFrontmatter extends FrontmatterData {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  tags: string[];
  featured_image?: string;
  status?: 'draft' | 'published';
}

export interface LessonFrontmatter extends FrontmatterData {
  title: string;
  order: number;
  duration?: string;
  objectives?: string[];
}

export interface Course extends MarkdownContent {
  frontmatter: CourseFrontmatter;
  lessonCount: number;
}

export interface Lesson extends MarkdownContent {
  frontmatter: LessonFrontmatter;
  courseSlug: string;
}

const COURSES_DIR = 'public/courses';

/**
 * Get all courses
 */
export async function getAllCourses(): Promise<Course[]> {
  try {
    const coursesPath = path.join(process.cwd(), COURSES_DIR);
    
    if (!fs.existsSync(coursesPath)) {
      return [];
    }

    const entries = fs.readdirSync(coursesPath, { withFileTypes: true });
    const courses: Course[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const course = await getCourse(entry.name);
        if (course && course.frontmatter.status !== 'draft') {
          courses.push(course);
        }
      }
    }

    // Sort by title alphabetically
    return courses.sort((a, b) => 
      a.frontmatter.title.localeCompare(b.frontmatter.title)
    );
  } catch (error) {
    console.error('Error getting all courses:', error);
    return [];
  }
}

/**
 * Get a single course by slug
 */
export async function getCourse(slug: string): Promise<Course | null> {
  const filePath = `${COURSES_DIR}/${slug}/index.md`;
  const content = await getMarkdownContent(filePath);

  if (!content) {
    return null;
  }

  // Ensure required fields exist
  if (!content.frontmatter.title) {
    console.warn(`Course ${filePath} is missing required 'title' field`);
    return null;
  }

  if (!content.frontmatter.description) {
    console.warn(`Course ${filePath} is missing required 'description' field`);
    return null;
  }

  // Count lessons
  const lessons = await getCourseLessons(slug);

  return {
    ...content,
    slug,
    frontmatter: content.frontmatter as CourseFrontmatter,
    lessonCount: lessons.length,
  };
}

/**
 * Get all lessons for a course
 */
export async function getCourseLessons(courseSlug: string): Promise<Lesson[]> {
  try {
    const lessonsPath = path.join(process.cwd(), COURSES_DIR, courseSlug, 'lessons');
    
    if (!fs.existsSync(lessonsPath)) {
      return [];
    }

    const files = fs.readdirSync(lessonsPath);
    const lessons: Lesson[] = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const lessonSlug = file.replace('.md', '');
        const lesson = await getLesson(courseSlug, lessonSlug);
        if (lesson) {
          lessons.push(lesson);
        }
      }
    }

    // Sort by order
    return lessons.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
  } catch (error) {
    console.error(`Error getting lessons for course ${courseSlug}:`, error);
    return [];
  }
}

/**
 * Get a single lesson by course and lesson slug
 */
export async function getLesson(courseSlug: string, lessonSlug: string): Promise<Lesson | null> {
  const filePath = `${COURSES_DIR}/${courseSlug}/lessons/${lessonSlug}.md`;
  const content = await getMarkdownContent(filePath);

  if (!content) {
    return null;
  }

  // Ensure required fields exist
  if (!content.frontmatter.title) {
    console.warn(`Lesson ${filePath} is missing required 'title' field`);
    return null;
  }

  if (content.frontmatter.order === undefined) {
    console.warn(`Lesson ${filePath} is missing required 'order' field`);
    return null;
  }

  return {
    ...content,
    slug: lessonSlug,
    courseSlug,
    frontmatter: content.frontmatter as LessonFrontmatter,
  };
}

/**
 * Get adjacent lessons (prev/next) for navigation
 */
export async function getAdjacentLessons(
  courseSlug: string,
  currentLessonSlug: string
): Promise<{ prev: Lesson | null; next: Lesson | null }> {
  const lessons = await getCourseLessons(courseSlug);
  const currentIndex = lessons.findIndex(l => l.slug === currentLessonSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? lessons[currentIndex - 1] : null,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null,
  };
}

/**
 * Get lesson progress info
 */
export function getLessonProgress(
  lessons: Lesson[],
  currentLessonSlug: string
): { current: number; total: number; percentage: number } {
  const currentIndex = lessons.findIndex(l => l.slug === currentLessonSlug);
  const current = currentIndex + 1;
  const total = lessons.length;
  const percentage = Math.round((current / total) * 100);

  return { current, total, percentage };
}

/**
 * Get difficulty color class
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'intermediate':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'advanced':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}
