'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Markdown renderer component for blog posts and talk content
 * Inspired by project-planton MDXRenderer component
 */
export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Custom heading components with anchor links
          h1: ({ children, ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-3xl font-semibold mt-6 mb-3 text-gray-800" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-2xl font-semibold mt-5 mb-2 text-gray-800" {...props}>
              {children}
            </h3>
          ),
          // Custom paragraph
          p: ({ children, ...props }) => (
            <p className="text-gray-700 leading-relaxed mb-4" {...props}>
              {children}
            </p>
          ),
          // Custom links
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 underline"
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
                className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono"
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
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props}>
              {children}
            </pre>
          ),
          // Custom blockquote
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4"
              {...props}
            >
              {children}
            </blockquote>
          ),
          // Custom lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props}>
              {children}
            </ol>
          ),
          // Custom images
          img: ({ src, alt, ...props }) => (
            <img
              src={src}
              alt={alt || ''}
              className="rounded-lg my-4 w-full h-auto"
              {...props}
            />
          ),
          // Custom table
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-200" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-700" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-2 border-t text-gray-700" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}


