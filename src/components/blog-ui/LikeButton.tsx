"use client";

import { useState, useEffect } from 'react';
import { useBlogTheme } from '@/components/BlogThemeProvider';
import { getLikeCount, isPostLiked, toggleLike as toggleLikeStorage } from '@/lib/likeSystem';

interface LikeButtonProps {
  slug: string;
}

/**
 * LikeButton Component
 * 
 * Displays a heart icon that users can click to like/unlike a blog post.
 * Uses localStorage for client-side like tracking.
 * Shows formatted like count (e.g., 1.2k, 10k).
 */
export default function LikeButton({ slug }: LikeButtonProps) {
  const { theme } = useBlogTheme();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial like data on mount
  useEffect(() => {
    const loadLikeData = () => {
      try {
        const currentLiked = isPostLiked(slug);
        const currentCount = getLikeCount(slug);
        setLiked(currentLiked);
        setCount(currentCount);
      } catch (err) {
        console.error('Failed to load like data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLikeData();
  }, [slug]);

  // Handle like toggle
  const handleLike = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    try {
      const result = toggleLikeStorage(slug);
      setLiked(result.liked);
      setCount(result.count);
    } catch (err) {
      console.error('Failed to toggle like:', err);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const formatLikeCount = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 opacity-50">
        <div className={`w-6 h-6 rounded-full animate-pulse ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
        }`}></div>
        <span className={`text-sm ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>...</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleLike}
      disabled={isAnimating}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-md
        transition-all duration-200
        ${liked 
          ? theme === 'dark'
            ? 'bg-red-500/10 text-red-400 border border-red-500/30'
            : 'bg-red-50 text-red-600 border border-red-200'
          : theme === 'dark'
          ? 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:text-red-400 hover:border-red-500/30'
          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:text-red-600 hover:border-red-200'
        }
      `}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
      title={liked ? 'Unlike' : 'Like'}
    >
      <div className="flex items-center gap-2">
        {/* Heart Icon - Simple and minimal */}
        <svg
          className={`w-4 h-4 transition-all duration-200 ${
            liked
              ? 'fill-current'
              : 'fill-none stroke-current'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>

        {/* Like Count - Clean and readable */}
        <span className="text-sm font-medium">
          {formatLikeCount(count)}
        </span>
      </div>
    </button>
  );
}
