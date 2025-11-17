"use client";

import { useEffect, useState } from 'react';
import { Eye, Clock } from 'lucide-react';
import { useBlogTheme } from '@/components/BlogThemeProvider';
import { incrementViewCount } from '@/lib/viewCounter';
import { calculateReadingTime } from '@/lib/readingTime';

interface PostMetaStatsProps {
  slug: string;
  content?: string;
  showViews?: boolean;
  showReadTime?: boolean;
}

/**
 * PostMetaStats Component
 * 
 * Displays view count and reading time for blog posts.
 * Automatically increments view count on mount.
 */
export default function PostMetaStats({
  slug,
  content,
  showViews = true,
  showReadTime = true
}: PostMetaStatsProps) {
  const { theme } = useBlogTheme();
  const [views, setViews] = useState(0);
  const [readTime, setReadTime] = useState<string>('');

  useEffect(() => {
    // Increment and get view count
    if (showViews) {
      const newViews = incrementViewCount(slug);
      // Use setTimeout to avoid synchronous setState warning
      setTimeout(() => setViews(newViews), 0);
    }

    // Calculate reading time
    if (showReadTime && content) {
      const rt = calculateReadingTime(content);
      setTimeout(() => setReadTime(rt.text), 0);
    }
  }, [slug, content, showViews, showReadTime]);

  const formatViews = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return count.toString();
  };

  if (!showViews && !showReadTime) return null;

  return (
    <div className="flex items-center gap-4 text-sm">
      {showViews && (
        <div className={`flex items-center gap-1.5 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <Eye className="w-4 h-4" />
          <span>{formatViews(views)} views</span>
        </div>
      )}
      
      {showReadTime && readTime && (
        <>
          {showViews && (
            <span className={theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}>•</span>
          )}
          <div className={`flex items-center gap-1.5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </>
      )}
    </div>
  );
}
