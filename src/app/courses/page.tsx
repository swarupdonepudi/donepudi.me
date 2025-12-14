import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCourses, getDifficultyColor } from '@/lib/courses';
import Header from '@/components/Header';
import { BookOpen, Clock, BarChart3, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Courses | Swarup Donepudi',
  description: 'Practical courses on Unix, Terraform, and cloud infrastructure',
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />

      {/* Header - add padding-top to account for fixed nav */}
      <div className="pt-20 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Courses
          </h1>
          <p className="text-xl text-gray-400">
            Practical, hands-on courses to level up your infrastructure skills
          </p>
        </div>
      </div>

      {/* Courses grid */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {courses.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No courses available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="block group"
              >
                <div className="h-full bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg hover:border-cyan-400/50 transition-all duration-200 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10">
                  {/* Course image */}
                  {course.frontmatter.featured_image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={course.frontmatter.featured_image}
                        alt={course.frontmatter.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${getDifficultyColor(
                          course.frontmatter.difficulty
                        )}`}
                      >
                        <BarChart3 className="w-3 h-3 mr-1" />
                        {course.frontmatter.difficulty.charAt(0).toUpperCase() +
                          course.frontmatter.difficulty.slice(1)}
                      </span>
                      {course.frontmatter.duration && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border border-gray-500/30 text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {course.frontmatter.duration}
                        </span>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border border-cyan-500/30 text-cyan-400">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {course.lessonCount} lessons
                      </span>
                    </div>

                    {/* Title and description */}
                    <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {course.frontmatter.title}
                    </h2>
                    <p className="text-gray-400 text-base mb-4 line-clamp-2">
                      {course.frontmatter.description}
                    </p>

                    {/* Tags */}
                    {course.frontmatter.tags && course.frontmatter.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.frontmatter.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300">
                      Start Learning
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
