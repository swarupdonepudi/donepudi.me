'use client';

import { Slide, Badge, QuoteBox } from '../../../shared/primitives';

/**
 * Thank You slide - Closing slide with contact and next steps
 *
 * Pattern: Use for final slide of every deck
 * Shows: QuoteBox, Badge, contact information layout
 */
export default function S05ThankYou() {
  return (
    <Slide variant="cover">
      <div className="text-center max-w-3xl mx-auto">
        {/* Thank you message */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6">
          Thank You! 🙏
        </h1>

        {/* Question prompt */}
        <p className="text-2xl sm:text-3xl text-cyan-400 font-semibold mb-10">
          Questions?
        </p>

        {/* Quote */}
        <QuoteBox
          attribution="— The Meetings Framework Philosophy"
          className="mb-10 text-left"
        >
          Great presentations are built from great components. 
          Consistent patterns create professional results.
        </QuoteBox>

        {/* Contact information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <p className="text-white font-semibold mb-2">Connect</p>
            <p className="text-white/60 text-sm">linkedin.com/in/swarupdonepudi</p>
            <p className="text-white/60 text-sm">swarup@donepudi.me</p>
          </div>
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <p className="text-white font-semibold mb-2">Portfolio</p>
            <p className="text-white/60 text-sm">donepudi.me</p>
            <p className="text-white/60 text-sm">planton.ai</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-10 flex justify-center gap-3">
          <Badge variant="cyan">Available for collaboration</Badge>
          <Badge variant="purple">Book a call</Badge>
        </div>
      </div>
    </Slide>
  );
}
