"use client";

import { Tag } from 'lucide-react';
import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';

interface TagCloudProps {
  tags: { tag: string; count: number }[];
  maxTags?: number;
  onTagClick?: (tag: string) => void;
}

/**
 * TagCloud Component
 * 
 * Displays popular tags with size based on frequency.
 */
export default function TagCloud({
  tags,
  maxTags = 20,
  onTagClick
}: TagCloudProps) {
  const { theme } = useBlogTheme();

  if (tags.length === 0) return null;

  // Get top tags
  const topTags = tags.slice(0, maxTags);

  // Calculate min and max counts for sizing
  const counts = topTags.map(t => t.count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  // Calculate font size based on count
  const getFontSize = (count: number): string => {
    if (maxCount === minCount) return 'text-sm';
    
    const ratio = (count - minCount) / (maxCount - minCount);
    
    if (ratio > 0.75) return 'text-lg font-semibold';
    if (ratio > 0.5) return 'text-base font-medium';
    if (ratio > 0.25) return 'text-sm font-medium';
    return 'text-xs';
  };

  // Get color based on count
  const getColor = (count: number): string => {
    if (maxCount === minCount) {
      return theme === 'dark'
        ? 'text-gray-400 hover:text-blue-400'
        : 'text-gray-600 hover:text-blue-600';
    }
    
    const ratio = (count - minCount) / (maxCount - minCount);
    
    if (theme === 'dark') {
      if (ratio > 0.75) return 'text-blue-400 hover:text-blue-300';
      if (ratio > 0.5) return 'text-cyan-400 hover:text-cyan-300';
      if (ratio > 0.25) return 'text-gray-300 hover:text-blue-400';
      return 'text-gray-400 hover:text-blue-400';
    } else {
      if (ratio > 0.75) return 'text-blue-600 hover:text-blue-700';
      if (ratio > 0.5) return 'text-cyan-600 hover:text-cyan-700';
      if (ratio > 0.25) return 'text-gray-700 hover:text-blue-600';
      return 'text-gray-600 hover:text-blue-600';
    }
  };

  return (
    <div className={`rounded-xl p-6 ${
      theme === 'dark'
        ? 'bg-gray-800/50 border border-gray-700'
        : 'bg-white border border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Tag className={`w-5 h-5 ${
          theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
        }`} />
        <h3 className={`font-bold text-lg ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Popular Tags
        </h3>
      </div>

      {/* Tag Cloud */}
      <div className="flex flex-wrap gap-3">
        {topTags.map(({ tag, count }) => {
          const fontSize = getFontSize(count);
          const color = getColor(count);

          if (onTagClick) {
            return (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className={`${fontSize} ${color} transition-colors cursor-pointer hover:underline`}
                aria-label={`Filter by ${tag} (${count} posts)`}
              >
                #{tag}
              </button>
            );
          }

          return (
            <Link
              key={tag}
              href={`/blog/tags?tag=${encodeURIComponent(tag)}`}
              className={`${fontSize} ${color} transition-colors hover:underline`}
              aria-label={`View ${count} posts tagged with ${tag}`}
            >
              #{tag}
            </Link>
          );
        })}
      </div>

      {/* Tag Count Info */}
      <div className={`mt-4 pt-4 text-xs text-center ${
        theme === 'dark'
          ? 'text-gray-500 border-t border-gray-700'
          : 'text-gray-500 border-t border-gray-200'
      }`}>
        Showing {topTags.length} of {tags.length} tags
      </div>
    </div>
  );
}
