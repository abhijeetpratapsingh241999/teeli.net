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
    <div className={`overflow-x-auto my-8 rounded-xl sm:rounded-2xl transition-all ${
      theme === "dark"
        ? "bg-gray-900/60 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
        : "bg-white border border-gray-300 shadow-lg shadow-blue-500/10"
    }`}>
      <table className="w-full border-collapse text-base md:text-[18px]">
        <thead className={`${
          theme === "dark" 
            ? "bg-cyan-500/10 border-b-2 border-cyan-500/30" 
            : "bg-blue-50 border-b-2 border-gray-300"
        }`}>
          <tr>
            {headerRow.map((header, index) => (
              <th
                key={index}
                className={`px-4 sm:px-5 md:px-6 py-3 sm:py-4 text-left font-semibold ${
                  theme === 'dark' ? 'text-cyan-300' : 'text-blue-900'
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
              className={rowIndex % 2 === 0 
                ? "bg-transparent" 
                : theme === "dark" ? "bg-cyan-500/5" : "bg-gray-50"
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 sm:px-5 md:px-6 py-3 sm:py-4 ${
                    theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
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
