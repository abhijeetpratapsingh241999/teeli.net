"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBlogTheme } from '@/components/BlogThemeProvider';
import { generatePageNumbers } from '@/lib/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

/**
 * Pagination Component
 * 
 * Displays page navigation with ellipsis for long lists.
 * Supports keyboard navigation and accessibility.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 7
}: PaginationProps) {
  const { theme } = useBlogTheme();

  if (totalPages <= 1) return null;

  const pages = generatePageNumbers(currentPage, totalPages, maxVisible);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, page: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (typeof page === 'number') {
        onPageChange(page);
      }
    }
  };

  return (
    <nav 
      className="flex items-center justify-center gap-2"
      role="navigation"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-1 px-3 py-2 rounded-lg font-medium
          transition-all duration-200
          ${currentPage === 1
            ? theme === 'dark'
              ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : theme === 'dark'
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }
        `}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`px-3 py-2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              onKeyDown={(e) => handleKeyDown(e, page)}
              className={`
                px-4 py-2 rounded-lg font-medium min-w-[44px]
                transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }
              `}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          flex items-center gap-1 px-3 py-2 rounded-lg font-medium
          transition-all duration-200
          ${currentPage === totalPages
            ? theme === 'dark'
              ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : theme === 'dark'
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }
        `}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
