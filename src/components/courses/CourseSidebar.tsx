'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, BookOpen, CheckCircle2, Circle } from 'lucide-react';
import CourseProgress from './CourseProgress';

interface LessonItem {
  slug: string;
  title: string;
  duration?: string;
  order: number;
}

interface CourseSidebarProps {
  courseSlug: string;
  courseTitle: string;
  lessons: LessonItem[];
  currentLessonSlug?: string;
  className?: string;
}

/**
 * CourseSidebar component for showing course outline with current lesson highlighted
 */
export default function CourseSidebar({
  courseSlug,
  courseTitle,
  lessons,
  currentLessonSlug,
  className = '',
}: CourseSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const currentIndex = currentLessonSlug 
    ? lessons.findIndex(l => l.slug === currentLessonSlug) + 1
    : 0;

  return (
    <div className={`bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-cyan-500/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <div className="text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Course</p>
            <p className="text-sm font-medium text-white">{courseTitle}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Progress bar */}
      {currentLessonSlug && (
        <div className="px-4 pb-3">
          <CourseProgress 
            current={currentIndex} 
            total={lessons.length} 
            size="sm" 
          />
        </div>
      )}

      {/* Lesson list */}
      {isExpanded && (
        <div className="border-t border-cyan-500/20">
          <nav className="py-2">
            {lessons.map((lesson, index) => {
              const isActive = lesson.slug === currentLessonSlug;
              const isPast = currentLessonSlug 
                ? lessons.findIndex(l => l.slug === currentLessonSlug) > index
                : false;

              return (
                <Link
                  key={lesson.slug}
                  href={`/courses/${courseSlug}/${lesson.slug}`}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 border-l-2 border-cyan-400'
                      : 'hover:bg-cyan-500/5 border-l-2 border-transparent'
                  }`}
                >
                  <span className="flex-shrink-0">
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : isActive ? (
                      <Circle className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-600" />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm truncate ${
                        isActive
                          ? 'text-cyan-400 font-medium'
                          : isPast
                          ? 'text-gray-400'
                          : 'text-gray-300'
                      }`}
                    >
                      {lesson.order}. {lesson.title}
                    </p>
                    {lesson.duration && (
                      <p className="text-xs text-gray-500">{lesson.duration}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
