'use client';

import { useBlogTheme } from '@/components/BlogThemeProvider';
import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3;
}

export default function Heading({ children, level }: HeadingProps) {
  const { theme } = useBlogTheme();

  const baseClasses = 'font-heading font-bold';
  
  const levelStyles = {
    1: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 mt-8 sm:mt-12 text-center md:text-left ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`,
    2: `text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 mt-8 sm:mt-10 text-center md:text-left ${
      theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
    }`,
    3: `text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3 mt-6 sm:mt-8 ${
      theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
    }`,
  };

  if (level === 1) {
    return <h1 className={`${baseClasses} ${levelStyles[1]}`}>{children}</h1>;
  }
  if (level === 2) {
    return <h2 className={`${baseClasses} ${levelStyles[2]}`}>{children}</h2>;
  }
  return <h3 className={`${baseClasses} ${levelStyles[3]}`}>{children}</h3>;
}
