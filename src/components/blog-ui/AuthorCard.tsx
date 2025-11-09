'use client';

import { useBlogTheme } from '@/components/BlogThemeProvider';

interface AuthorCardProps {
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
}

export default function AuthorCard({ author, authorRole, date, readTime }: AuthorCardProps) {
  const { theme } = useBlogTheme();

  const initials = author.split(' ').map(n => n[0]).join('');

  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap text-xs sm:text-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
          {initials}
        </div>
        <div>
          <div className={`text-xs sm:text-sm font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {author}
          </div>
          {authorRole && (
            <div className={`text-xs ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              {authorRole}
            </div>
          )}
        </div>
      </div>
      <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}>•</span>
      <div className={`text-xs sm:text-sm ${
        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
      }`}>
        {date}
      </div>
      <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}>•</span>
      <div className={`text-xs sm:text-sm ${
        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
      }`}>
        {readTime}
      </div>
    </div>
  );
}
