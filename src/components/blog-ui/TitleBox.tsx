"use client";

import { useBlogTheme } from '@/components/BlogThemeProvider';
import LikeButton from './LikeButton';
import SocialShare from './SocialShare';

interface TitleBoxProps {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
}

/**
 * TitleBox Component
 * 
 * Displays blog post title, metadata, like button, and social share buttons.
 * Reusable across all blog posts with consistent styling.
 */
export default function TitleBox({
  slug,
  category,
  title,
  excerpt,
  author,
  authorRole,
  date,
  readTime,
}: TitleBoxProps) {
  const { theme } = useBlogTheme();
  
  // Build canonical URL for sharing
  const canonicalUrl = `https://teeli.net/blog/${slug}`;

  return (
    <div className={`relative rounded-2xl sm:rounded-3xl border-2 p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-xl mb-8 sm:mb-12 overflow-hidden ${
      theme === 'dark'
        ? 'border-cyan-500/30 bg-linear-to-br from-black/60 via-cyan-950/40 to-black/60'
        : 'border-cyan-500/50 bg-white shadow-lg'
    }`}>
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      
      <div className="relative z-10">
        {/* Like Button - Mobile: Top Right, Desktop: Bottom Right */}
        <div className="absolute top-0 right-0 md:bottom-0 md:top-auto">
          <LikeButton slug={slug} />
        </div>
        
        {/* Category Badge */}
        <div className="inline-block mb-3 sm:mb-4">
          <span className={`px-3 py-1.5 text-xs font-semibold rounded-md border ${
            theme === 'dark'
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              : 'bg-cyan-50 text-cyan-600 border-cyan-200'
          }`}>
            {category}
          </span>
        </div>
        
        {/* Title */}
        <h1 className={`font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight pr-16 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h1>
        
        {/* Excerpt */}
        <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed ${
          theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
        }`}>
          {excerpt}
        </p>
        
        {/* Author + Metadata */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap text-xs sm:text-sm">
          {/* Author Avatar + Info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
              {author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className={`text-xs sm:text-sm font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{author}</div>
                
                {/* TEAM Badge */}
                <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded ${
                  theme === 'dark' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'bg-blue-50 text-blue-600 border border-blue-200'
                }`}>
                  TEAM
                </span>
                
                {/* Verified Icon */}
                <svg 
                  className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {authorRole && (
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>{authorRole}</div>
              )}
            </div>
          </div>
          
          <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}>•</span>
          
          {/* Date */}
          <div className={`text-xs sm:text-sm ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>{date}</div>
          
          <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}>•</span>
          
          {/* Read Time */}
          <div className={`text-xs sm:text-sm ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>{readTime}</div>
        </div>
        
        {/* Divider */}
        <div className={`my-4 sm:my-6 h-px ${
          theme === 'dark' ? 'bg-cyan-500/20' : 'bg-gray-200'
        }`} />
        
        {/* Social Share Buttons */}
        <div>
          <div className={`text-xs sm:text-sm font-semibold mb-3 ${
            theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
          }`}>
            Share this article:
          </div>
          <SocialShare
            url={canonicalUrl}
            title={title}
            description={excerpt}
          />
        </div>
      </div>
    </div>
  );
}
