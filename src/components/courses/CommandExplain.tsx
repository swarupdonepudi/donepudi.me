'use client';

import React, { useState } from 'react';

interface CommandPart {
  text: string;
  explanation: string;
  type?: 'command' | 'flag' | 'argument' | 'option' | 'pipe' | 'redirect';
}

interface CommandExplainProps {
  parts: CommandPart[];
  title?: string;
}

const typeColors: Record<string, string> = {
  command: 'text-cyan-400 hover:bg-cyan-500/20',
  flag: 'text-yellow-400 hover:bg-yellow-500/20',
  argument: 'text-green-400 hover:bg-green-500/20',
  option: 'text-purple-400 hover:bg-purple-500/20',
  pipe: 'text-gray-400 hover:bg-gray-500/20',
  redirect: 'text-orange-400 hover:bg-orange-500/20',
};

/**
 * CommandExplain component for breaking down commands with explanations
 * Each part can be hovered/clicked to show its explanation
 */
export default function CommandExplain({ parts, title }: CommandExplainProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="my-6 rounded-lg border border-cyan-500/30 bg-black/60 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 bg-gray-900/80 border-b border-cyan-500/20">
        <span className="text-sm text-gray-400">
          {title || 'Command Breakdown'}
        </span>
      </div>

      {/* Command display */}
      <div className="p-4 font-mono text-sm">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-green-400 select-none mr-1">$</span>
          {parts.map((part, index) => (
            <button
              key={index}
              className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                typeColors[part.type || 'command']
              } ${activeIndex === index ? 'ring-1 ring-current' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              {part.text}
            </button>
          ))}
        </div>
      </div>

      {/* Explanation panel */}
      <div className="border-t border-cyan-500/20 bg-gray-950/50 p-4 min-h-[60px]">
        {activeIndex !== null ? (
          <div className="flex items-start gap-3">
            <code
              className={`px-2 py-0.5 rounded text-sm font-mono ${
                typeColors[parts[activeIndex].type || 'command'].split(' ')[0]
              } bg-black/40`}
            >
              {parts[activeIndex].text}
            </code>
            <p className="text-gray-300 text-sm leading-relaxed">
              {parts[activeIndex].explanation}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            Hover or click on any part of the command to see its explanation
          </p>
        )}
      </div>

      {/* Legend */}
      <div className="border-t border-cyan-500/20 bg-gray-900/40 px-4 py-2">
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-gray-400">Command</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-gray-400">Flag</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-gray-400">Argument</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-gray-400">Option</span>
          </span>
        </div>
      </div>
    </div>
  );
}
