"use client";

import { Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';
import { calculateReadingTime } from '@/lib/readingTime';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date?: string;
  sections?: any[];
}

interface RecentPostsWidgetProps {
  posts: BlogPost[];
  limit?: number;
  showReadTime?: boolean;
}

/**
 * RecentPostsWidget Component
 * 
 * Displays a list of recent blog posts, typically used in sidebars.
 */
export default function RecentPostsWidget({
  posts,
  limit = 5,
  showReadTime = true
}: RecentPostsWidgetProps) {
  const { theme } = useBlogTheme();

  const recentPosts = posts.slice(0, limit);

  if (recentPosts.length === 0) return null;

  return (
    <div className={`rounded-xl p-6 ${
      theme === 'dark'
        ? 'bg-gray-800/50 border border-gray-700'
        : 'bg-white border border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className={`w-5 h-5 ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`} />
        <h3 className={`font-bold text-lg ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Recent Posts
        </h3>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {recentPosts.map((post, index) => {
          const readTime = showReadTime && post.sections
            ? calculateReadingTime(JSON.stringify(post.sections))
            : null;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`block group ${
                index < recentPosts.length - 1
                  ? theme === 'dark'
                    ? 'pb-4 border-b border-gray-700'
                    : 'pb-4 border-b border-gray-200'
                  : ''
              }`}
            >
              {/* Title */}
              <h4 className={`font-medium mb-1 line-clamp-2 ${
                theme === 'dark'
                  ? 'text-gray-200 group-hover:text-blue-400'
                  : 'text-gray-900 group-hover:text-blue-600'
              } transition-colors`}>
                {post.title}
              </h4>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs">
                {post.date && (
                  <span className={
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                )}
                {showReadTime && readTime && (
                  <>
                    <span className={
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    }>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className={`w-3 h-3 ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`} />
                      <span className={
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }>
                        {readTime.text}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All Link */}
      {posts.length > limit && (
        <Link
          href="/blog"
          className={`block mt-4 pt-4 text-sm font-medium text-center ${
            theme === 'dark'
              ? 'text-blue-400 hover:text-blue-300 border-t border-gray-700'
              : 'text-blue-600 hover:text-blue-700 border-t border-gray-200'
          } transition-colors`}
        >
          View all posts →
        </Link>
      )}
    </div>
  );
}
