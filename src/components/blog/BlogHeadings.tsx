'use client';

import { ReactNode } from 'react';
import { BLOG_SPACING, BLOG_TYPOGRAPHY } from '@/lib/blog/theme-config';

interface HeadingProps {
  children: ReactNode;
  theme: 'light' | 'dark';
  className?: string;
}

export function BlogH1({ children, theme, className = '' }: HeadingProps) {
  return (
    <h1 
      className={`${BLOG_TYPOGRAPHY.h1} ${BLOG_SPACING.h1} text-center md:text-left ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      } ${className}`}
    >
      {children}
    </h1>
  );
}

export function BlogH2({ children, theme, className = '' }: HeadingProps) {
  return (
    <div className={className}>
      <div className={`w-16 sm:w-20 h-0.5 sm:h-1 rounded-full ${BLOG_SPACING.h2} ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-600'
      }`} />
      <h2 
        className={`${BLOG_TYPOGRAPHY.h2} mb-5 sm:mb-6 md:mb-7 text-center md:text-left ${
          theme === 'dark' ? 'text-white' : 'text-blue-900'
        }`}
      >
        {children}
      </h2>
    </div>
  );
}

export function BlogH3({ children, theme, className = '' }: HeadingProps) {
  return (
    <h3 
      className={`${BLOG_TYPOGRAPHY.h3} ${BLOG_SPACING.h3} ${
        theme === 'dark' ? 'text-white' : 'text-blue-800'
      } ${className}`}
    >
      {children}
    </h3>
  );
}

interface ListItemProps {
  children: ReactNode;
  theme: 'light' | 'dark';
  type?: 'bullet' | 'number';
  number?: string;
}

export function BlogListItem({ children, theme, type = 'bullet', number }: ListItemProps) {
  if (type === 'number' && number) {
    return (
      <div className={`flex items-start gap-2 sm:gap-3 ml-2 sm:ml-4 ${BLOG_SPACING.list}`}>
        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs sm:text-sm font-bold ${
          theme === 'dark' 
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
            : 'bg-blue-100 text-blue-700 border border-blue-300'
        }`}>
          {number}
        </div>
        <span className={`flex-1 ${BLOG_TYPOGRAPHY.body} ${
          theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
        }`}>
          {children}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-2 sm:gap-3 ml-2 sm:ml-4 ${BLOG_SPACING.list}`}>
      <svg 
        className={`w-5 h-5 sm:w-6 sm:h-6 mt-0.5 flex-shrink-0 ${
          theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
        }`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span className={`flex-1 ${BLOG_TYPOGRAPHY.body} ${
        theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
      }`}>
        {children}
      </span>
    </div>
  );
}

export function BlogParagraph({ children, theme, className = '' }: HeadingProps) {
  return (
    <p 
      className={`${BLOG_SPACING.paragraph} ${BLOG_TYPOGRAPHY.body} ${
        theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
      } ${className}`}
    >
      {children}
    </p>
  );
}
