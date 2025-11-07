import React from 'react';
import { getThemeConfig, BLOG_SPACING, BLOG_RADIUS } from '@/lib/blog/theme-config';

interface BlogTableProps {
  headers: string[];
  rows: string[][];
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * BlogTable Component
 * 
 * Reusable table component for blog posts with consistent styling and theme support.
 * Handles responsive design, hover effects, and glass morphism styling.
 * 
 * @example
 * ```tsx
 * <BlogTable 
 *   headers={['Feature', 'Benefit', 'Cost']}
 *   rows={[
 *     ['Cloud GPU', '10x faster', '$100/mo'],
 *     ['Local GPU', 'Standard', '$5000 upfront']
 *   ]}
 *   theme={theme}
 * />
 * ```
 */
export default function BlogTable({ 
  headers, 
  rows, 
  theme = 'dark',
  className = ''
}: BlogTableProps) {
  const themeConfig = getThemeConfig(theme);

  if (!headers || headers.length === 0 || !rows || rows.length === 0) {
    return null;
  }

  return (
    <div className={`${BLOG_SPACING.largeSection} ${className}`}>
      <div 
        className={`${BLOG_RADIUS.medium} overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${themeConfig.table.card}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className={themeConfig.table.header}>
                {headers.map((header, idx) => (
                  <th 
                    key={idx} 
                    className={`p-5 sm:p-6 text-left font-semibold text-sm sm:text-base lg:text-lg border-b-2 ${themeConfig.table.headerText}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className={themeConfig.table.body}>
              {rows.map((row, rowIdx) => {
                const isLastRow = rowIdx === rows.length - 1;
                const rowBorderClass = !isLastRow ? themeConfig.table.rowBorder : '';
                
                return (
                  <tr 
                    key={rowIdx} 
                    className={`${themeConfig.table.row} ${themeConfig.table.rowHover} ${rowBorderClass}`}
                  >
                    {row.map((cell, cellIdx) => (
                      <td 
                        key={cellIdx} 
                        className={`p-5 sm:p-6 text-sm sm:text-base font-medium ${themeConfig.table.cellText}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
