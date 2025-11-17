"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useBlogTheme } from '@/components/BlogThemeProvider';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

// Utility function to truncate text for display
function truncateText(text: string, maxLength: number = 30): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const { theme } = useBlogTheme();
  
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`mb-6 sm:mb-8 ${className}`}
    >
      <ol 
        className="flex items-center flex-wrap gap-2 text-sm"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 1;
          
          // Truncate long titles on mobile/tablet, but keep full text for SEO
          const displayLabel = isLast ? truncateText(item.label, 40) : item.label;
          
          return (
            <li 
              key={index}
              className="flex items-center gap-2"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              {/* Breadcrumb Link or Text */}
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 transition-colors hover:underline ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  itemProp="item"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5" />}
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <>
                  {/* Visible truncated text */}
                  <span 
                    className={`flex items-center gap-1.5 ${
                      isLast 
                        ? theme === 'dark' ? 'text-white font-semibold' : 'text-gray-900 font-semibold'
                        : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                    {...(isLast && { 'aria-current': 'page' })}
                    title={item.label} // Show full text on hover
                  >
                    {index === 0 && <Home className="w-3.5 h-3.5" />}
                    {/* Show truncated on mobile/tablet, full on desktop */}
                    <span className="block sm:hidden">{truncateText(item.label, 25)}</span>
                    <span className="hidden sm:block md:hidden">{truncateText(item.label, 35)}</span>
                    <span className="hidden md:block">{displayLabel}</span>
                  </span>
                  
                  {/* Hidden full text for SEO schema */}
                  <span itemProp="name" className="sr-only">{item.label}</span>
                </>
              )}
              
              {/* Hidden position for schema */}
              <meta itemProp="position" content={position.toString()} />
              
              {/* Separator */}
              {!isLast && (
                <ChevronRight 
                  className={`w-3.5 h-3.5 ${
                    theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
