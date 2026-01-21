'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import YouTube from './YouTube';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Markdown renderer component for blog posts and talk content
 * Styled for dark backgrounds with cyan accents
 */
export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Custom heading components with gradient text
          h1: ({ children, ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-3xl font-semibold mt-6 mb-3 text-gray-100" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-2xl font-semibold mt-5 mb-2 text-gray-200" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-300" {...props}>
              {children}
            </h4>
          ),
          // Custom paragraph
          p: ({ children, ...props }) => (
            <p className="text-gray-300 leading-relaxed mb-4" {...props}>
              {children}
            </p>
          ),
          // Custom links
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/50"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          // Custom code blocks
          code: ({ className, children, ...props }) => {
            const inline = !className;
            return inline ? (
              <code
                className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono border border-cyan-500/30"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Custom pre for code blocks
          pre: ({ children, ...props }) => (
            <pre className="bg-black/60 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-cyan-500/20" {...props}>
              {children}
            </pre>
          ),
          // Custom blockquote
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-cyan-500 pl-4 italic text-gray-400 my-4 bg-cyan-500/5 py-2"
              {...props}
            >
              {children}
            </blockquote>
          ),
          // Custom lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-300" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-gray-300 pl-2" {...props}>
              {children}
            </li>
          ),
          // Custom strong (bold)
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-white" {...props}>
              {children}
            </strong>
          ),
          // Custom em (italic)
          em: ({ children, ...props }) => (
            <em className="italic text-gray-200" {...props}>
              {children}
            </em>
          ),
          // Custom images
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt || ''}
              className="rounded-lg my-4 w-full h-auto border border-cyan-500/20"
              {...props}
            />
          ),
          // Custom horizontal rule
          hr: (props) => (
            <hr className="my-8 border-cyan-500/30" {...props} />
          ),
          // Custom table
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4 border border-cyan-500/20 rounded-lg">
              <table className="min-w-full divide-y divide-cyan-500/20" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th className="px-4 py-2 bg-cyan-500/10 text-left text-sm font-semibold text-gray-200" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-2 border-t border-cyan-500/20 text-gray-300" {...props}>
              {children}
            </td>
          ),
          // Custom YouTube component via rehype-raw (lowercase because rehype-raw converts to lowercase)
          youtube: ({ node, ...props }: any) => {
            const videoId = props.videoid || props.videoid || props.videoId;
            const url = props.url;
            const title = props.title;
            return <YouTube videoId={videoId} url={url} title={title} />;
          },
        } as any}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
