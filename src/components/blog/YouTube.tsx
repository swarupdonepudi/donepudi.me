'use client';

import React, { useEffect, useRef } from 'react';

interface YouTubeProps {
  videoId?: string;
  url?: string;
  title?: string;
  className?: string;
}

/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - youtube.com/watch?v=VIDEO_ID
 * - youtu.be/VIDEO_ID
 * - youtube.com/shorts/VIDEO_ID
 * - youtube.com/embed/VIDEO_ID
 */
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Performance-optimized YouTube embed using lite-youtube-embed
 * Lazy loads the full YouTube player only when user clicks
 * Saves ~224KB of resources before interaction
 */
export default function YouTube({ videoId, url, title, className = '' }: YouTubeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine the video ID from either prop
  const id = videoId || (url ? extractVideoId(url) : null);

  useEffect(() => {
    // Dynamically import lite-youtube-embed to ensure it's only loaded on client
    import('lite-youtube-embed').catch((err) => {
      console.error('Failed to load lite-youtube-embed:', err);
    });
  }, []);

  if (!id) {
    console.error('YouTube component: No valid video ID provided');
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`youtube-wrapper my-6 rounded-lg overflow-hidden border border-cyan-500/20 ${className}`}
    >
      <lite-youtube
        videoid={id}
        playlabel={title || 'Play video'}
        style={{
          backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`,
        }}
      />
    </div>
  );
}

// TypeScript declaration for the lite-youtube custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          videoid: string;
          playlabel?: string;
        },
        HTMLElement
      >;
    }
  }
}

