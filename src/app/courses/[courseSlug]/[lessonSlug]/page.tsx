import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllCourses,
  getCourse,
  getCourseLessons,
  getLesson,
  getAdjacentLessons,
  getLessonProgress,
} from '@/lib/courses';
import Header from '@/components/Header';
import CourseMarkdownRenderer from '@/components/courses/CourseMarkdownRenderer';
import CourseSidebar from '@/components/courses/CourseSidebar';
import LessonNavigation from '@/components/courses/LessonNavigation';
import CourseProgress from '@/components/courses/CourseProgress';
import { ArrowLeft, Clock, Target } from 'lucide-react';

interface LessonPageProps {
  params: {
    courseSlug: string;
    lessonSlug: string;
  };
}

export async function generateStaticParams() {
  const courses = await getAllCourses();
  const params: { courseSlug: string; lessonSlug: string }[] = [];

  for (const course of courses) {
    const lessons = await getCourseLessons(course.slug);
    for (const lesson of lessons) {
      params.push({
        courseSlug: course.slug,
        lessonSlug: lesson.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const course = await getCourse(params.courseSlug);
  const lesson = await getLesson(params.courseSlug, params.lessonSlug);

  if (!course || !lesson) {
    return {
      title: 'Lesson Not Found',
    };
  }

  return {
    title: `${lesson.frontmatter.title} | ${course.frontmatter.title}`,
    description: lesson.frontmatter.objectives?.[0] || course.frontmatter.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const course = await getCourse(params.courseSlug);
  const lesson = await getLesson(params.courseSlug, params.lessonSlug);

  if (!course || !lesson) {
    notFound();
  }

  const lessons = await getCourseLessons(params.courseSlug);
  const { prev, next } = await getAdjacentLessons(
    params.courseSlug,
    params.lessonSlug
  );
  const progress = getLessonProgress(lessons, params.lessonSlug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />

      {/* Back link and progress */}
      <div className="pt-20 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              href={`/courses/${params.courseSlug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {course.frontmatter.title}
            </Link>
            <div className="w-full sm:w-64">
              <CourseProgress
                current={progress.current}
                total={progress.total}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lesson content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              <CourseSidebar
                courseSlug={params.courseSlug}
                courseTitle={course.frontmatter.title}
                lessons={lessons.map((l) => ({
                  slug: l.slug,
                  title: l.frontmatter.title,
                  duration: l.frontmatter.duration,
                  order: l.frontmatter.order,
                }))}
                currentLessonSlug={params.lessonSlug}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <article className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-sm p-6 md:p-10">
              {/* Lesson header */}
              <header className="mb-8 pb-6 border-b border-cyan-500/20">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <span>Lesson {lesson.frontmatter.order}</span>
                  {lesson.frontmatter.duration && (
                    <>
                      <span className="text-cyan-500/50">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {lesson.frontmatter.duration}
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {lesson.frontmatter.title}
                </h1>

                {/* Learning objectives */}
                {lesson.frontmatter.objectives &&
                  lesson.frontmatter.objectives.length > 0 && (
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 mt-4">
                      <h2 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        What you'll learn
                      </h2>
                      <ul className="space-y-1">
                        {lesson.frontmatter.objectives.map((objective, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-300 flex items-start gap-2"
                          >
                            <span className="text-cyan-400 mt-1">•</span>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </header>

              {/* Lesson content */}
              <CourseMarkdownRenderer content={lesson.content} />

              {/* Navigation */}
              <LessonNavigation
                courseSlug={params.courseSlug}
                courseTitle={course.frontmatter.title}
                prevLesson={
                  prev
                    ? { slug: prev.slug, title: prev.frontmatter.title }
                    : null
                }
                nextLesson={
                  next
                    ? { slug: next.slug, title: next.frontmatter.title }
                    : null
                }
                currentLesson={progress.current}
                totalLessons={progress.total}
              />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
