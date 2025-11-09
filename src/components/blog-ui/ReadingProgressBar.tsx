'use client';

import { useState, useEffect } from 'react';
import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function ReadingProgressBar() {
  const { theme } = useBlogTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-transparent">
      <div
        className={`h-full transition-all duration-150 ease-out ${
          theme === 'dark'
            ? 'bg-linear-to-r from-[#00eaff] to-[#8b5cf6]'
            : 'bg-linear-to-r from-[#0ea5e9] to-[#7c3aed]'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
