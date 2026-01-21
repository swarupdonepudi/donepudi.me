'use client';

import React from 'react';
import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';

type CalloutVariant = 'info' | 'warning' | 'tip' | 'danger';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

const variantConfig = {
  info: {
    icon: Info,
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-400',
  },
  tip: {
    icon: Lightbulb,
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-400',
    titleColor: 'text-green-400',
  },
  danger: {
    icon: AlertCircle,
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-400',
    titleColor: 'text-red-400',
  },
};

const defaultTitles: Record<CalloutVariant, string> = {
  info: 'Note',
  warning: 'Warning',
  tip: 'Tip',
  danger: 'Danger',
};

/**
 * Callout component for highlighting important information
 * Variants: info, warning, tip, danger
 */
export default function Callout({
  variant = 'info',
  title,
  children,
}: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  const displayTitle = title || defaultTitles[variant];

  return (
    <div
      className={`my-6 rounded-lg border ${config.borderColor} ${config.bgColor} p-4`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          <p className={`font-semibold mb-1 ${config.titleColor}`}>
            {displayTitle}
          </p>
          <div className="text-gray-300 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
