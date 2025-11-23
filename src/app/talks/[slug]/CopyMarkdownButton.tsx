'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyMarkdownButtonProps {
  content: string;
}

export default function CopyMarkdownButton({ content }: CopyMarkdownButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-colors"
      title={copied ? "Copied!" : "Copy Markdown"}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          <span className="hidden sm:inline">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          <span className="hidden sm:inline">Copy Markdown</span>
        </>
      )}
    </button>
  );
}

