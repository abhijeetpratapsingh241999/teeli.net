"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface BlogThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const BlogThemeContext = createContext<BlogThemeContextType | undefined>(undefined);

export function BlogThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

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

  return (
    <BlogThemeContext.Provider value={{ theme: displayTheme, toggleTheme >
      {children}
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


