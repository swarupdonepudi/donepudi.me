'use client';

import React from 'react';

interface CourseProgressProps {
  current: number;
  total: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * CourseProgress component for showing visual progress through a course
 */
export default function CourseProgress({
  current,
  total,
  showLabel = true,
  size = 'md',
}: CourseProgressProps) {
  const percentage = Math.round((current / total) * 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">
            Lesson {current} of {total}
          </span>
          <span className="text-sm font-medium text-cyan-400">{percentage}%</span>
        </div>
      )}
      <div
        className={`w-full bg-gray-800 rounded-full overflow-hidden ${sizeClasses[size]}`}
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
