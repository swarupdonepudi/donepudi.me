'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Link as LinkIcon, Check } from 'lucide-react';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';

/**
 * Client-safe date formatter
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

interface FastlaneEntry {
  slug: string;
  content: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
    tags?: string[];
  };
}

interface FastlaneTimelineProps {
  entries: FastlaneEntry[];
}

export default function FastlaneTimeline({ entries }: FastlaneTimelineProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const toggleEntry = (slug: string) => {
    setExpandedSlug(expandedSlug === slug ? null : slug);
  };

  const copyLink = async (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/fastlane/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const openInNewPage = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`/fastlane/${slug}`, '_blank');
  };

  return (
    <div className="space-y-1">
      {entries.map((entry) => {
        const isExpanded = expandedSlug === entry.slug;
        const isCopied = copiedSlug === entry.slug;

        return (
          <article
            key={entry.slug}
            className="relative"
          >
            {/* Clickable header */}
            <div
              onClick={() => toggleEntry(entry.slug)}
              className="relative py-8 px-6 -mx-6 rounded-lg hover:bg-white/[0.02] transition-all duration-200 cursor-pointer group"
            >
              {/* Date and action icons row */}
              <div className="flex items-center justify-between mb-3">
                <time
                  dateTime={entry.frontmatter.date}
                  className="text-sm font-medium text-cyan-400"
                >
                  {formatDate(entry.frontmatter.date)}
                </time>

                {/* Action icons */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Copy link */}
                  <button
                    onClick={(e) => copyLink(entry.slug, e)}
                    className="p-1.5 rounded-md hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition-colors"
                    title="Copy link"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <LinkIcon className="w-4 h-4" />
                    )}
                  </button>

                  {/* Open in new page */}
                  <button
                    onClick={(e) => openInNewPage(entry.slug, e)}
                    className="p-1.5 rounded-md hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition-colors"
                    title="Open in new page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  {/* Expand/collapse indicator */}
                  <div className={`p-1.5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors mb-3">
                {entry.frontmatter.title}
              </h2>

              {/* Excerpt (only when collapsed) */}
              {!isExpanded && (
                <p className="text-gray-400 text-base leading-relaxed mb-4">
                  {entry.excerpt}
                </p>
              )}

              {/* Tags */}
              {entry.frontmatter.tags && entry.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400/70 border border-cyan-500/20 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-6 -mx-6 pb-8 pt-2">
                <MarkdownRenderer content={entry.content} />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
