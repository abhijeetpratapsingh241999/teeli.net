'use client';

import { useBlogTheme } from '@/components/BlogThemeProvider';
import { ReactNode } from 'react';

interface CalloutProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'success' | 'quote';
}

export default function Callout({ children, type = 'info' }: CalloutProps) {
  const { theme } = useBlogTheme();

  const typeStyles = {
    info: theme === 'dark'
      ? 'border-cyan-500/30 bg-cyan-950/30 text-cyan-200'
      : 'border-cyan-300 bg-cyan-50 text-cyan-900',
    warning: theme === 'dark'
      ? 'border-yellow-500/30 bg-yellow-950/30 text-yellow-200'
      : 'border-yellow-300 bg-yellow-50 text-yellow-900',
    success: theme === 'dark'
      ? 'border-green-500/30 bg-green-950/30 text-green-200'
      : 'border-green-300 bg-green-50 text-green-900',
    quote: theme === 'dark'
      ? 'border-purple-500/30 bg-purple-950/30 text-purple-200 italic'
      : 'border-purple-300 bg-purple-50 text-purple-900 italic',
  };

  return (
    <div className={`my-6 sm:my-8 p-4 sm:p-6 rounded-lg border-2 ${typeStyles[type]}`}>
      <div className="text-sm sm:text-base md:text-lg leading-relaxed">
        {children}
      </div>
    </div>
  );
}
