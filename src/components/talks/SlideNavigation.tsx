'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrevious: () => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
}

/**
 * Slide navigation controls with progress indicator
 */
export default function SlideNavigation({
  currentSlide,
  totalSlides,
  onNext,
  onPrevious,
  isFirstSlide,
  isLastSlide,
}: SlideNavigationProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Progress indicator */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-white/60">
          Slide {currentSlide + 1} of {totalSlides}
        </span>
        <ProgressBar current={currentSlide + 1} total={totalSlides} />
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          disabled={isFirstSlide}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={isLastSlide}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:from-pink-600 hover:to-violet-600 transition-colors"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

