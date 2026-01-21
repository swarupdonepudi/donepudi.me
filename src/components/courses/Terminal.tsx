'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  command: string;
  output?: string;
  title?: string;
  showPrompt?: boolean;
  copyable?: boolean;
}

/**
 * Terminal component for displaying commands with optional output
 * Features: copy button, syntax highlighting, optional output section
 */
export default function Terminal({
  command,
  output,
  title,
  showPrompt = true,
  copyable = true,
}: TerminalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-cyan-500/30 bg-black/60">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {title && (
            <span className="ml-2 text-sm text-gray-400 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              {title}
            </span>
          )}
        </div>
        {copyable && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-cyan-400 transition-colors rounded hover:bg-cyan-500/10"
            title="Copy command"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Command section */}
      <div className="p-4 font-mono text-sm">
        <div className="flex items-start gap-2">
          {showPrompt && (
            <span className="text-green-400 select-none">$</span>
          )}
          <code className="text-gray-100 break-all">{command}</code>
        </div>
      </div>

      {/* Output section */}
      {output && (
        <div className="border-t border-cyan-500/20 bg-gray-950/50 p-4 font-mono text-sm">
          <pre className="text-gray-400 whitespace-pre-wrap overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
