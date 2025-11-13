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
      ? 'border-purple-500/30 bg-purple-950/30 text-purple-200'
      : 'border-purple-300 bg-purple-50 text-purple-900',
  };

  return (
    <div className={`my-6 sm:my-8 rounded-xl shadow-lg ${typeStyles[type]} relative`}>
      {/* Quote Icon Badge - Floating */}
      {type === 'quote' && (
        <div className={`absolute -left-4 top-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 ${
          theme === 'dark' ? 'bg-green-500' : 'bg-green-600'
        }`}>
          <svg 
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
          </svg>
        </div>
      )}
      
      {/* Content */}
      <div className={`p-6 sm:p-8 border-l-4 rounded-xl ${
        type === 'quote' ? 'pl-10 sm:pl-12' : ''
      }`}>
        <div className={`text-base sm:text-lg md:text-xl leading-relaxed ${
          type === 'quote' ? 'font-serif italic font-medium text-lg sm:text-xl md:text-2xl' : ''
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
}
