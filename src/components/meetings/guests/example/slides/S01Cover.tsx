'use client';

import { Slide } from '../../../shared/primitives';

/**
 * Cover slide - Title slide with meeting details
 *
 * Pattern: Use for opening slide of every deck
 * Variant: "cover" provides gradient background
 */
export default function S01Cover() {
  return (
    <Slide variant="cover">
      <div className="text-center max-w-3xl mx-auto">
        {/* Main title with gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Meetings
          </span>
          <span className="text-white"> Framework</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/80 font-medium mb-6">
          A demonstration of slide primitives and patterns
        </p>

        {/* Meeting details */}
        <div className="space-y-2 text-sm sm:text-base text-white/50">
          <p>
            <span className="text-white/70 font-medium">Presenter:</span> Swarup Donepudi
          </p>
          <p>
            <span className="text-white/70 font-medium">Date:</span> January 25, 2026
          </p>
          <p>
            <span className="text-white/70 font-medium">Location:</span> Virtual
          </p>
        </div>

        {/* Visual accent */}
        <div className="mt-10 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-100" />
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse delay-200" />
        </div>
      </div>
    </Slide>
  );
}
