import React from 'react';
import Link from 'next/link';
import { getThemeConfig, BLOG_SPACING, BLOG_RADIUS, BLOG_TYPOGRAPHY } from '@/lib/blog/theme-config';

interface ButtonConfig {
  text: string;
  href: string;
}

interface BlogCTAProps {
  title: string;
  description: string;
  primaryButton: ButtonConfig;
  secondaryButton?: ButtonConfig;
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * BlogCTA Component
 * 
 * Call-to-action section with gradient background, title, description, and action buttons.
 * Supports primary and optional secondary button.
 * Fully responsive with theme support.
 * 
 * @example
 * ```tsx
 * <BlogCTA
 *   title="Ready to 10x Your Rendering Speed?"
 *   description="Join 500+ studios using TEELI's Cloud GPU for instant, scalable rendering"
 *   primaryButton={{ text: 'Start Free Trial', href: '/signup' }}
 *   secondaryButton={{ text: 'Book Demo', href: '/contact' }}
 *   theme={theme}
 * />
 * ```
 */
export default function BlogCTA({ 
  title, 
  description, 
  primaryButton, 
  secondaryButton,
  theme = 'dark',
  className = ''
}: BlogCTAProps) {
  const themeConfig = getThemeConfig(theme);

  return (
    <div className={`${BLOG_SPACING.section} ${className}`}>
      <div 
        className={`relative ${BLOG_RADIUS.large} p-8 sm:p-10 md:p-12 lg:p-16 text-center overflow-hidden backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-cyan-950/50 via-purple-950/50 to-black/70 border border-cyan-500/30'
            : 'bg-gradient-to-br from-cyan-50 via-purple-50 to-white border border-cyan-500/30 shadow-2xl'
        }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <h2 
            className={`font-heading ${BLOG_TYPOGRAPHY.h2} font-bold mb-4 sm:mb-6 ${themeConfig.text.heading}`}
          >
            {title}
          </h2>
          
          {/* Description */}
          <p 
            className={`${BLOG_TYPOGRAPHY.body} mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto ${themeConfig.text.secondary}`}
          >
            {description}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button */}
            <Link 
              href={primaryButton.href}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:shadow-cyan-500/50"
            >
              <span>{primaryButton.text}</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            {/* Secondary Button (Optional) */}
            {secondaryButton && (
              <Link 
                href={secondaryButton.href}
                className={`group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  theme === 'dark'
                    ? 'border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400'
                    : 'border-2 border-cyan-600/50 text-cyan-600 hover:bg-cyan-600/10 hover:border-cyan-500'
                }`}
              >
                <span>{secondaryButton.text}</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            )}
          </div>
        </div>
        
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>
      </div>
    </div>
  );
}
