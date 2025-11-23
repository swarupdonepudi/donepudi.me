'use client';

import React, { ReactNode } from 'react';
import { Home } from 'lucide-react';
import SlideNavigation from './SlideNavigation';
import ProgressBar from './ProgressBar';

interface TalkLayoutProps {
  children: ReactNode;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrevious: () => void;
  onHome: () => void;
  talkSlug: string;
}

/**
 * Common layout for all talk presentations
 * Provides consistent navigation and controls
 */
export default function TalkLayout({
  children,
  currentSlide,
  totalSlides,
  onNext,
  onPrevious,
  onHome,
  talkSlug,
}: TalkLayoutProps) {
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#110D1F] flex flex-col">
      {/* Home button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={onHome}
          className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-sm rounded-md transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      {/* Main content - slide */}
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden px-4">
        {children}
      </div>

      {/* Navigation footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#110D1F] to-transparent pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-8">
          <SlideNavigation
            currentSlide={currentSlide}
            totalSlides={totalSlides}
            onNext={onNext}
            onPrevious={onPrevious}
            isFirstSlide={isFirstSlide}
            isLastSlide={isLastSlide}
          />

          {/* Keyboard shortcuts hint */}
          <div className="text-center mt-4">
            <p className="text-xs text-white/40">
              Use{' '}
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">
                ←
              </kbd>{' '}
              /{' '}
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">
                →
              </kbd>{' '}
              to navigate,{' '}
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">
                ESC
              </kbd>{' '}
              to go home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

