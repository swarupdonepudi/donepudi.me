import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllCourses,
  getCourse,
  getCourseLessons,
  getDifficultyColor,
} from '@/lib/courses';
import Header from '@/components/Header';
import CourseMarkdownRenderer from '@/components/courses/CourseMarkdownRenderer';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  BarChart3,
  PlayCircle,
  CheckCircle2,
} from 'lucide-react';

interface CoursePageProps {
  params: {
    courseSlug: string;
  };
}

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map((course) => ({
    courseSlug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const course = await getCourse(params.courseSlug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${course.frontmatter.title} | Courses`,
    description: course.frontmatter.description,
    openGraph: {
      title: course.frontmatter.title,
      description: course.frontmatter.description,
      type: 'website',
      images: course.frontmatter.featured_image
        ? [course.frontmatter.featured_image]
        : [],
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourse(params.courseSlug);

  if (!course) {
    notFound();
  }

  const lessons = await getCourseLessons(params.courseSlug);
  const firstLesson = lessons[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />

      {/* Back link */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Course content */}
      <article className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Course header */}
            <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-sm p-8 md:p-10 mb-8">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                    course.frontmatter.difficulty
                  )}`}
                >
                  <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
                  {course.frontmatter.difficulty.charAt(0).toUpperCase() +
                    course.frontmatter.difficulty.slice(1)}
                </span>
                {course.frontmatter.duration && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-gray-500/30 text-gray-400">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {course.frontmatter.duration}
                  </span>
                )}
              </div>

              {/* Title and description */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {course.frontmatter.title}
              </h1>
              <p className="text-xl text-gray-400 mb-6">
                {course.frontmatter.description}
              </p>

              {/* Tags */}
              {course.frontmatter.tags && course.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {course.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Course overview content */}
            {course.content && (
              <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-sm p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                  About This Course
                </h2>
                <CourseMarkdownRenderer content={course.content} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Start button */}
              {firstLesson && (
                <Link
                  href={`/courses/${params.courseSlug}/${firstLesson.slug}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  <PlayCircle className="w-5 h-5" />
                  Start Course
                </Link>
              )}

              {/* Course stats */}
              <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg p-6">
                <h3 className="font-semibold text-lg text-white mb-4">
                  Course Info
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Lessons</dt>
                    <dd className="text-gray-300 font-medium">
                      {lessons.length}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Difficulty</dt>
                    <dd className="text-gray-300 font-medium capitalize">
                      {course.frontmatter.difficulty}
                    </dd>
                  </div>
                  {course.frontmatter.duration && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Duration</dt>
                      <dd className="text-gray-300 font-medium">
                        {course.frontmatter.duration}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Syllabus */}
              <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-cyan-500/20">
                  <h3 className="font-semibold text-lg text-white">Syllabus</h3>
                </div>
                <nav className="py-2">
                  {lessons.map((lesson, index) => (
                    <Link
                      key={lesson.slug}
                      href={`/courses/${params.courseSlug}/${lesson.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/5 transition-colors group"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium group-hover:bg-cyan-500/20">
                        {lesson.frontmatter.order}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 group-hover:text-white truncate">
                          {lesson.frontmatter.title}
                        </p>
                        {lesson.frontmatter.duration && (
                          <p className="text-xs text-gray-500">
                            {lesson.frontmatter.duration}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Back to courses link */}
        <div className="mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 rounded-md text-sm font-medium text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all courses
          </Link>
        </div>
      </article>
    </div>
  );
}
