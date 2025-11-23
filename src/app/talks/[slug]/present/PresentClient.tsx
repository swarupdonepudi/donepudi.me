'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Home } from 'lucide-react';

/**
 * Presentation page wrapper - dynamically loads talk-specific presentation component
 * Inspired by planton.ai DemoPage.tsx
 */
export default function PresentClient() {
  const params = useParams();
  const slug = (params?.slug || '') as string;
  const [PresentationComponent, setPresentationComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically import the talk-specific presentation component
    import(`@/components/talks/${slug}/TalkPresentation`)
      .then((module) => {
        setPresentationComponent(() => module.default);
      })
      .catch((err) => {
        console.error(`Failed to load presentation for ${slug}:`, err);
        setError('Presentation not available');
      });
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Presentation Not Available
          </h1>
          <p className="text-gray-400 mb-8">
            The presentation component for this talk has not been created yet.
          </p>
          <a
            href={`/talks/${slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Talk
          </a>
        </div>
      </div>
    );
  }

  if (!PresentationComponent) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading presentation...</div>
      </div>
    );
  }

  return <PresentationComponent />;
}


