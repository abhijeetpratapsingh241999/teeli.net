'use client';

import { useBlogTheme } from '@/components/BlogThemeProvider';

interface SmartTableProps {
  rows: string[];
}

export default function SmartTable({ rows }: SmartTableProps) {
  const { theme } = useBlogTheme();

  if (rows.length < 2) return null;

  const parseRow = (row: string) => {
    return row
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0);
  };

  const headerRow = parseRow(rows[0]);
  const dataRows = rows.slice(2).map(parseRow); // Skip separator row

  return (
    <div className="my-6 sm:my-8 overflow-x-auto">
      <table className={`w-full border-collapse rounded-lg overflow-hidden ${
        theme === 'dark' 
          ? 'border-2 border-cyan-500/30' 
          : 'border-2 border-cyan-200'
      }`}>
        <thead className={
          theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-950 to-purple-950'
            : 'bg-gradient-to-r from-cyan-50 to-purple-50'
        }>
          <tr>
            {headerRow.map((header, index) => (
              <th
                key={index}
                className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm md:text-base font-semibold ${
                  theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t ${
                theme === 'dark'
                  ? 'border-cyan-500/20 hover:bg-cyan-950/30'
                  : 'border-cyan-100 hover:bg-cyan-50/50'
              } transition-colors`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base ${
                    theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
