"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';
import { searchBlogPosts, SearchResult } from '@/lib/blogSearch';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  topic?: string;
  sections?: any[];
}

interface BlogSearchProps {
  posts: BlogPost[];
  onClose?: () => void;
}

/**
 * BlogSearch Component
 * 
 * Full-featured search overlay for blog posts.
 * Searches through titles, descriptions, tags, topics, and content.
 */
export default function BlogSearch({ posts, onClose }: BlogSearchProps) {
  const { theme } = useBlogTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce search
    const timer = setTimeout(() => {
      const searchResults = searchBlogPosts(posts, query);
      setResults(searchResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, posts]);

  const highlightMatch = (text: string, query: string): React.ReactNode => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-current">{part}</mark>
        : part
    );
  };

  return (
    <div 
      className={`fixed inset-0 z-50 ${
        theme === 'dark' ? 'bg-black/80' : 'bg-gray-900/50'
      } backdrop-blur-sm`}
      onClick={onClose}
    >
      <div 
        className={`max-w-3xl mx-auto mt-20 px-4`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Box */}
        <div className={`${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        } border rounded-lg shadow-2xl overflow-hidden`}>
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-700/50">
            <Search className={`w-5 h-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blog posts..."
              className={`flex-1 bg-transparent outline-none text-lg ${
                theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className={`p-1 rounded hover:bg-gray-700/50 transition-colors`}
              >
                <X className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </button>
            )}
            <button
              onClick={onClose}
              className={`px-3 py-1 text-sm rounded ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              ESC
            </button>
          </div>

          {/* Results */}
          <div className={`max-h-[60vh] overflow-y-auto ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            {isSearching ? (
              <div className="p-8 text-center">
                <div className={`inline-block w-6 h-6 border-2 border-t-transparent ${
                  theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                } rounded-full animate-spin`}></div>
                <p className={`mt-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Searching...</p>
              </div>
            ) : query.trim().length === 0 ? (
              <div className="p-8 text-center">
                <Search className={`w-12 h-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`} />
                <p className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Start typing to search</p>
                <p className={`text-sm mt-2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>Search through titles, descriptions, tags, and content</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <p className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>No results found</p>
                <p className={`text-sm mt-2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>Try different keywords</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700/50">
                {results.map((result, index) => (
                  <Link
                    key={result.slug}
                    href={`/blog/${result.slug}`}
                    onClick={onClose}
                    className={`block p-4 ${
                      theme === 'dark'
                        ? 'hover:bg-gray-800/50'
                        : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={`font-medium mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {highlightMatch(result.title, query)}
                        </h3>
                        <p className={`text-sm line-clamp-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {highlightMatch(result.description, query)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {result.matchedFields.map((field) => (
                            <span
                              key={field}
                              className={`text-xs px-2 py-0.5 rounded ${
                                theme === 'dark'
                                  ? 'bg-blue-500/10 text-blue-400'
                                  : 'bg-blue-50 text-blue-600'
                              }`}
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-400'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        Score: {result.score}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Helper Text */}
        <div className={`text-center mt-4 text-sm ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <span>{results.length} {results.length === 1 ? 'result' : 'results'}</span>
          {results.length > 0 && <span> • Press ESC to close</span>}
        </div>
      </div>
    </div>
  );
}
