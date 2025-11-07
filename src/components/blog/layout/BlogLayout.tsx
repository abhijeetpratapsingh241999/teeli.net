/**
 * Blog Layout Wrapper Component
 * Provides consistent layout structure for all blog posts
 * 
 * Features:
 * - Unified header/footer structure
 * - Theme-aware background
 * - Consistent spacing and max-width
 * - Responsive padding
 * - Scroll-aware header behavior
 * 
 * Usage:
 * <BlogLayout theme={theme}>
 *   <BlogArticle post={post} />
 * </BlogLayout>
 */

"use client";

import { ReactNode, useState, useEffect } from 'react';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';
import { getThemeConfig, BLOG_TRANSITIONS, type BlogTheme } from '@/lib/blog/theme-config';

// Lazy load footer for better performance
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

interface BlogLayoutProps {
  children: ReactNode;
  theme: BlogTheme;
  showBackButton?: boolean;
  showThemeToggle?: boolean;
}

export default function BlogLayout({ 
  children, 
  theme,
  showBackButton = true,
  showThemeToggle = true,
}: BlogLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const themeConfig = getThemeConfig(theme);

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 200) {
        if (currentScrollY < lastScrollY) {
          setIsScrolled(false); // Scrolling up
        } else {
          setIsScrolled(true); // Scrolling down
        }
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <main 
      className={`relative min-h-screen w-full overflow-x-hidden ${BLOG_TRANSITIONS.colors} ${themeConfig.bg.main}`}
    >
      {/* Header */}
      {!isScrolled && (
        <div className="fixed top-0 left-0 right-0 z-50 animate-fadeInDown">
          <Header />
        </div>
      )}

      {/* Back to Blog Button */}
      {showBackButton && (
        <div className="fixed bottom-4 sm:bottom-8 left-2 sm:left-4 md:left-8 z-40">
          <a
            href="/blog"
            className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-1 sm:gap-2"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back to Blog</span>
            <span className="sm:hidden">Back</span>
          </a>
        </div>
      )}

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 pt-32 pb-16 sm:pb-24 md:pb-32">
        {children}
      </article>

      {/* Footer */}
      <Footer />
    </main>
  );
}
