import React from 'react';
import { getThemeConfig, BLOG_TYPOGRAPHY } from '@/lib/blog/theme-config';
import type { BlogAuthor as BlogAuthorType } from '@/lib/blog/blog';

interface BlogAuthorProps {
  author: string | BlogAuthorType;
  authorRole?: string;
  date: string;
  readTime: string;
  theme?: 'light' | 'dark';
  showTeamBadge?: boolean;
  className?: string;
}

/**
 * BlogAuthor Component
 * 
 * Displays author information with avatar, name, role, date, and read time.
 * Automatically generates avatar initials from author name.
 * Shows team badge for TEELI authors.
 * 
 * @example
 * ```tsx
 * <BlogAuthor 
 *   author="John Doe"
 *   authorRole="Senior Developer"
 *   date="January 15, 2025"
 *   readTime="8 min read"
 *   theme={theme}
 *   showTeamBadge={true}
 * />
 * ```
 */
export default function BlogAuthor({ 
  author, 
  authorRole,
  date, 
  readTime, 
  theme = 'dark',
  showTeamBadge = true,
  className = ''
}: BlogAuthorProps) {
  const themeConfig = getThemeConfig(theme);
  
  // Extract author name and role from object or string
  const authorName = typeof author === 'string' ? author : author.name;
  const displayRole = typeof author === 'string' ? authorRole : author.role || authorRole;
  
  // Generate avatar initials from author name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(authorName);
  const isTeamMember = authorName.includes('TEELI');

  return (
    <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap ${BLOG_TYPOGRAPHY.caption} ${className}`}>
      {/* Author Avatar & Name */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <div className={`${BLOG_TYPOGRAPHY.caption} font-semibold ${themeConfig.text.heading}`}>
              {authorName}
            </div>
            {showTeamBadge && isTeamMember && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md">
                ✓ TEAM
              </span>
            )}
          </div>
          {displayRole && (
            <div className={`text-xs ${themeConfig.text.muted}`}>
              {displayRole}
            </div>
          )}
        </div>
      </div>
      
      {/* Separator */}
      <span className={themeConfig.text.muted}>•</span>
      
      {/* Date */}
      <div className={`flex items-center gap-1.5 ${BLOG_TYPOGRAPHY.caption} ${themeConfig.text.secondary}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{date}</span>
      </div>
      
      {/* Separator */}
      <span className={themeConfig.text.muted}>•</span>
      
      {/* Read Time */}
      <div className={`flex items-center gap-1.5 ${BLOG_TYPOGRAPHY.caption} ${themeConfig.text.secondary}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{readTime}</span>
      </div>
    </div>
  );
}
