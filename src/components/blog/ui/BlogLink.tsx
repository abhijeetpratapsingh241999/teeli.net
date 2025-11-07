import React, { ReactNode } from 'react';
import Link from 'next/link';
import { getThemeConfig } from '@/lib/blog/theme-config';

interface BlogLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'inline' | 'cta' | 'reference';
  theme?: 'light' | 'dark';
  external?: boolean;
  className?: string;
}

/**
 * BlogLink Component
 * 
 * Unified link component with consistent styling and theme support.
 * Supports multiple variants: inline (text links), CTA (call-to-action buttons), reference (citations).
 * 
 * @example
 * ```tsx
 * // Inline text link
 * <BlogLink href="/solutions/cloud-gpu" variant="inline">
 *   Learn more about Cloud GPU
 * </BlogLink>
 * 
 * // CTA button link
 * <BlogLink href="/signup" variant="cta">
 *   Start Free Trial
 * </BlogLink>
 * 
 * // External reference link
 * <BlogLink href="https://example.com" variant="reference" external>
 *   [1] External Source
 * </BlogLink>
 * ```
 */
export default function BlogLink({ 
  href, 
  children, 
  variant = 'inline',
  theme = 'dark',
  external = false,
  className = ''
}: BlogLinkProps) {
  const themeConfig = getThemeConfig(theme);
  
  // Auto-detect external links if not explicitly set
  const isExternal = external || href.startsWith('http://') || href.startsWith('https://');
  
  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'cta':
        return `inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 shadow-lg hover:shadow-cyan-500/50' 
            : 'bg-gradient-to-r from-cyan-600 to-purple-700 text-white hover:from-cyan-500 hover:to-purple-600 shadow-lg hover:shadow-cyan-600/50'
        }`;
      
      case 'reference':
        return `text-cyan-400 hover:text-cyan-300 underline break-all text-sm sm:text-base transition-colors duration-200`;
      
      case 'inline':
      default:
        return `text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 hover:decoration-cyan-300 underline-offset-4 transition-all duration-200 font-medium`;
    }
  };

  const linkStyles = `${getVariantStyles()} ${className}`;
  
  // External link props
  const externalProps = isExternal ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  // If external link, use <a> tag
  if (isExternal) {
    return (
      <a 
        href={href} 
        className={linkStyles}
        {...externalProps}
      >
        {children}
        {variant !== 'cta' && isExternal && (
          <svg 
            className="inline-block w-3 h-3 sm:w-4 sm:h-4 ml-1 opacity-70" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    );
  }

  // Internal link, use Next.js Link
  return (
    <Link href={href} className={linkStyles}>
      {children}
    </Link>
  );
}
