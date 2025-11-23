'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

/**
 * Visual progress indicator
 */
export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-48 bg-white/20 rounded-full h-1.5">
      <div
        className="bg-gradient-to-r from-pink-500 to-violet-500 h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}


