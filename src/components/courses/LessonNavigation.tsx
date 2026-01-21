'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

interface LessonInfo {
  slug: string;
  title: string;
}

interface LessonNavigationProps {
  courseSlug: string;
  courseTitle: string;
  prevLesson: LessonInfo | null;
  nextLesson: LessonInfo | null;
  currentLesson: number;
  totalLessons: number;
}

/**
 * LessonNavigation component for navigating between lessons
 * Shows prev/next buttons and progress context
 */
export default function LessonNavigation({
  courseSlug,
  courseTitle,
  prevLesson,
  nextLesson,
  currentLesson,
  totalLessons,
}: LessonNavigationProps) {
  return (
    <div className="mt-12 pt-8 border-t border-cyan-500/20">
      {/* Progress indicator */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400">
          Lesson {currentLesson} of {totalLessons}
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-stretch gap-4">
        {/* Previous lesson */}
        <div className="flex-1">
          {prevLesson ? (
            <Link
              href={`/courses/${courseSlug}/${prevLesson.slug}`}
              className="flex items-center gap-3 p-4 rounded-lg border border-cyan-500/20 bg-black/40 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all group h-full"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-xs text-gray-500 mb-1">Previous</p>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                  {prevLesson.title}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              href={`/courses/${courseSlug}`}
              className="flex items-center gap-3 p-4 rounded-lg border border-cyan-500/20 bg-black/40 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all group h-full"
            >
              <Home className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-xs text-gray-500 mb-1">Back to</p>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                  {courseTitle}
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* Next lesson */}
        <div className="flex-1">
          {nextLesson ? (
            <Link
              href={`/courses/${courseSlug}/${nextLesson.slug}`}
              className="flex items-center justify-end gap-3 p-4 rounded-lg border border-cyan-500/20 bg-black/40 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all group h-full"
            >
              <div className="text-right min-w-0">
                <p className="text-xs text-gray-500 mb-1">Next</p>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                  {nextLesson.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
            </Link>
          ) : (
            <Link
              href={`/courses/${courseSlug}`}
              className="flex items-center justify-end gap-3 p-4 rounded-lg border border-green-500/30 bg-green-500/10 hover:border-green-400/50 hover:bg-green-500/20 transition-all group h-full"
            >
              <div className="text-right min-w-0">
                <p className="text-xs text-green-400 mb-1">Completed!</p>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                  Back to Course
                </p>
              </div>
              <Home className="w-5 h-5 text-green-400 flex-shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
