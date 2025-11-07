import React, { ReactNode } from 'react';
import { getThemeConfig, BLOG_SPACING, BLOG_RADIUS, BLOG_TYPOGRAPHY } from '@/lib/blog/theme-config';

interface BlogQuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
  theme?: 'light' | 'dark';
  variant?: 'default' | 'highlighted' | 'large';
  className?: string;
}

/**
 * BlogQuote Component
 * 
 * Styled blockquote component with optional author attribution.
 * Supports multiple variants for different emphasis levels.
 * 
 * @example
 * ```tsx
 * // Simple quote
 * <BlogQuote theme={theme}>
 *   This is a great quote that adds value.
 * </BlogQuote>
 * 
 * // Quote with author
 * <BlogQuote author="John Doe" source="CEO, Company Inc" theme={theme}>
 *   Success is not final, failure is not fatal.
 * </BlogQuote>
 * 
 * // Large highlighted quote
 * <BlogQuote variant="large" author="Albert Einstein" theme={theme}>
 *   Imagination is more important than knowledge.
 * </BlogQuote>
 * ```
 */
export default function BlogQuote({ 
  children, 
  author,
  source,
  theme = 'dark',
  variant = 'default',
  className = ''
}: BlogQuoteProps) {
  const themeConfig = getThemeConfig(theme);

  // Get variant-specific styles
  const getVariantStyles = () => {
    const baseStyles = `relative ${BLOG_RADIUS.medium} border-l-4 backdrop-blur-sm`;
    
    switch (variant) {
      case 'large':
        return `${baseStyles} p-8 sm:p-10 md:p-12 border-l-8 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border-cyan-500'
            : 'bg-gradient-to-r from-cyan-50 to-purple-50 border-cyan-600 shadow-lg'
        }`;
      
      case 'highlighted':
        return `${baseStyles} p-6 sm:p-8 border-l-6 ${
          theme === 'dark'
            ? 'bg-cyan-950/20 border-cyan-400'
            : 'bg-cyan-100 border-cyan-600 shadow-md'
        }`;
      
      case 'default':
      default:
        return `${baseStyles} p-5 sm:p-6 md:p-7 ${
          theme === 'dark'
            ? 'bg-gray-900/30 border-gray-600'
            : 'bg-gray-100 border-gray-500 shadow-sm'
        }`;
    }
  };

  // Get text size based on variant
  const getTextSize = () => {
    switch (variant) {
      case 'large':
        return 'text-xl sm:text-2xl md:text-3xl';
      case 'highlighted':
        return 'text-lg sm:text-xl';
      default:
        return BLOG_TYPOGRAPHY.body;
    }
  };

  return (
    <blockquote className={`${getVariantStyles()} ${BLOG_SPACING.quote} ${className}`}>
      {/* Quote Icon */}
      <div className={`absolute top-4 left-4 opacity-20 ${themeConfig.text.accent}`}>
        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      {/* Quote Content */}
      <div className={`relative z-10 ${variant === 'large' ? 'ml-8 sm:ml-12' : 'ml-6 sm:ml-8'}`}>
        <p 
          className={`${getTextSize()} leading-relaxed font-medium italic ${themeConfig.text.primary} mb-0`}
        >
          {children}
        </p>
        
        {/* Author Attribution */}
        {(author || source) && (
          <footer className="mt-4 sm:mt-6 pt-4 border-t border-current/10">
            <div className="flex items-center gap-3">
              {/* Author Avatar Placeholder */}
              {author && (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white'
                    : 'bg-gradient-to-br from-cyan-600 to-purple-700 text-white'
                } shadow-lg`}>
                  {author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
              
              <div>
                {author && (
                  <cite className={`not-italic font-bold ${BLOG_TYPOGRAPHY.bodySmall} ${themeConfig.text.heading} block`}>
                    — {author}
                  </cite>
                )}
                {source && (
                  <span className={`text-xs sm:text-sm ${themeConfig.text.secondary}`}>
                    {source}
                  </span>
                )}
              </div>
            </div>
          </footer>
        )}
      </div>
      
      {/* Bottom gradient line for large variant */}
      {variant === 'large' && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      )}
    </blockquote>
  );
}
