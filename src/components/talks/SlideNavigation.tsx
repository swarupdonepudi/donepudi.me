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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Navigation buttons - Top on mobile, Right on desktop */}
      <div className="flex gap-2 md:gap-3 justify-center md:order-2">
        <button
          onClick={onPrevious}
          disabled={isFirstSlide}
          className="inline-flex items-center gap-2 px-3 py-2 md:px-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-medium transition-colors"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden md:inline">Previous</span>
        </button>
        <button
          onClick={onNext}
          disabled={isLastSlide}
          className="inline-flex items-center gap-2 px-3 py-2 md:px-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:from-pink-600 hover:to-violet-600 transition-colors"
          aria-label="Next slide"
        >
          <span className="hidden md:inline">Next</span>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Progress indicator - Bottom on mobile, Left on desktop */}
      <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start md:order-1">
        <span className="text-xs md:text-sm font-semibold text-white/60">
          <span className="hidden sm:inline">Slide </span>{currentSlide + 1}<span className="hidden sm:inline"> of {totalSlides}</span><span className="sm:hidden">/{totalSlides}</span>
        </span>
        <ProgressBar current={currentSlide + 1} total={totalSlides} />
      </div>
    </div>
  );
}

