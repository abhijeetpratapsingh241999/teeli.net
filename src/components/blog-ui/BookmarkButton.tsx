"use client";

import { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { useBlogTheme } from '@/components/BlogThemeProvider';
import { isBookmarked, toggleBookmark } from '@/lib/bookmarkSystem';

interface BookmarkButtonProps {
  slug: string;
  title: string;
}

/**
 * BookmarkButton Component
 * 
 * Allows users to save/bookmark blog posts for later reading.
 * Uses localStorage for client-side bookmark tracking.
 */
export default function BookmarkButton({ slug, title }: BookmarkButtonProps) {
  const { theme } = useBlogTheme();
  const [bookmarked, setBookmarked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check bookmark status on mount
  useEffect(() => {
    setBookmarked(isBookmarked(slug));
  }, [slug]);

  const handleToggle = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newState = toggleBookmark(slug, title);
    setBookmarked(newState);

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isAnimating}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-md
        transition-all duration-200
        ${bookmarked 
          ? theme === 'dark'
            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
            : 'bg-blue-50 text-blue-600 border border-blue-200'
          : theme === 'dark'
          ? 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:text-blue-400 hover:border-blue-500/30'
          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:text-blue-600 hover:border-blue-200'
        }
      `}
      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this post'}
      title={bookmarked ? 'Remove from bookmarks' : 'Save for later'}
    >
      <Bookmark 
        className={`w-4 h-4 transition-all duration-200 ${
          bookmarked ? 'fill-current' : ''
        } ${isAnimating ? 'scale-125' : ''}`}
      />
      <span className="text-sm font-medium">
        {bookmarked ? 'Saved' : 'Save'}
      </span>
    </button>
  );
}
