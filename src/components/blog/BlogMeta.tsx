'use client';

import { Calendar, Clock, User } from 'lucide-react';

interface BlogMetaProps {
  date: string;
  readTime: string;
  author?: string;
  authorRole?: string;
  category?: string;
  className?: string;
}

export default function BlogMeta({
  date,
  readTime,
  author,
  authorRole,
  category,
  className = '',
}: BlogMetaProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm ${className}`}>
      {/* Date */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Calendar className="w-4 h-4" />
        <span>{date}</span>
      </div>

      {/* Read Time */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Clock className="w-4 h-4" />
        <span>{readTime}</span>
      </div>

      {/* Author - Only show if provided */}
      {author && (
        <div className="flex items-center gap-2 text-zinc-400">
          <User className="w-4 h-4" />
          <div className="flex flex-col">
            <span className="font-medium text-white">{author}</span>
            {authorRole && (
              <span className="text-xs text-zinc-500">{authorRole}</span>
            )}
          </div>
        </div>
      )}

      {/* Category Badge */}
      {category && (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30">
          {category}
        </span>
      )}
    </div>
  );
}
