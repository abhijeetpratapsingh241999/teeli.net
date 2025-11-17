"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const BlogThemeToggle = dynamic(() => import('@/components/BlogThemeToggle'), { ssr: false });

type Theme = 'dark' | 'light';

interface BlogThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const BlogThemeContext = createContext<BlogThemeContextType | undefined>(undefined);

export function BlogThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Initialize theme on mount - only on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('blog-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document when it changes - only after mount
  useEffect(() => {
    if (!mounted) return;
    
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    localStorage.setItem('blog-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Use default theme during SSR to prevent hydration mismatch
  const displayTheme = mounted ? theme : 'dark';

  // Hide theme toggle on specific pages
  const hideToggleOnPages = ['/blog/about', '/blog/authors', '/blog/newsletter'];
  const shouldShowToggle = mounted && !hideToggleOnPages.includes(pathname);

  return (
    <BlogThemeContext.Provider value={{ theme: displayTheme, toggleTheme }}>
      {children}
      
      {/* Global Theme Toggle - Hidden on About, Authors, Newsletter pages */}
      {shouldShowToggle && (
        <div className="fixed bottom-8 right-8 z-50">
          <BlogThemeToggle />
        </div>
      )}
    </BlogThemeContext.Provider>
  );
}

export function useBlogTheme() {
  const context = useContext(BlogThemeContext);
  if (!context) {
    throw new Error('useBlogTheme must be used within BlogThemeProvider');
  }
  return context;
}


