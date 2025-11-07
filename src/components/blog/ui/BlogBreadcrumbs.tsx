import React from 'react';
import Link from 'next/link';
import { getThemeConfig, BLOG_TYPOGRAPHY } from '@/lib/blog/theme-config';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BlogBreadcrumbsProps {
  items: BreadcrumbItem[];
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * BlogBreadcrumbs Component
 * 
 * Visual breadcrumb navigation with links.
 * Shows page hierarchy and allows quick navigation to parent pages.
 * 
 * @example
 * ```tsx
 * <BlogBreadcrumbs 
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Blog', href: '/blog' },
 *     { label: 'AI Rendering', href: '/blog?category=AI' },
 *     { label: 'Current Post', href: '/blog/current-post' }
 *   ]}
 *   theme={theme}
 * />
 * ```
 */
export default function BlogBreadcrumbs({ 
  items, 
  theme = 'dark',
  className = ''
}: BlogBreadcrumbsProps) {
  const themeConfig = getThemeConfig(theme);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${BLOG_TYPOGRAPHY.caption} mb-6 sm:mb-8 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {/* Breadcrumb Link */}
              {!isLast ? (
                <Link 
                  href={item.href}
                  className={`transition-colors duration-200 hover:underline ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-cyan-400'
                      : 'text-gray-600 hover:text-cyan-600'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className={`font-semibold ${themeConfig.text.heading}`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
              
              {/* Separator */}
              {!isLast && (
                <svg 
                  className={`w-4 h-4 ${themeConfig.text.muted}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
