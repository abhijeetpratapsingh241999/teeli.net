'use client';

import React, { useState } from 'react';
import { getThemeConfig, BLOG_SPACING, BLOG_RADIUS } from '@/lib/blog/theme-config';

interface BlogCodeBlockProps {
  code: string;
  language?: string;
  theme?: 'light' | 'dark';
  showLineNumbers?: boolean;
  fileName?: string;
  className?: string;
}

/**
 * BlogCodeBlock Component
 * 
 * Syntax-highlighted code block component with copy functionality.
 * Supports multiple programming languages and themes.
 * 
 * @example
 * ```tsx
 * <BlogCodeBlock 
 *   code={`const hello = "world";`}
 *   language="typescript"
 *   fileName="example.ts"
 *   showLineNumbers={true}
 *   theme={theme}
 * />
 * ```
 */
export default function BlogCodeBlock({ 
  code, 
  language = 'text',
  theme = 'dark',
  showLineNumbers = false,
  fileName,
  className = ''
}: BlogCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const themeConfig = getThemeConfig(theme);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Get language badge color
  const getLanguageColor = () => {
    const colors: Record<string, string> = {
      javascript: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      typescript: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      python: 'bg-green-500/20 text-green-400 border-green-500/30',
      jsx: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      tsx: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      html: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      css: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      json: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      bash: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      shell: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    };
    return colors[language.toLowerCase()] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const lines = code.split('\n');

  return (
    <div className={`${BLOG_SPACING.largeSection} ${className}`}>
      <div 
        className={`relative ${BLOG_RADIUS.medium} overflow-hidden backdrop-blur-md border-2 ${
          theme === 'dark'
            ? 'bg-black/40 border-gray-700/50'
            : 'bg-gray-50 border-gray-300/50 shadow-lg'
        }`}
      >
        {/* Header */}
        <div 
          className={`flex items-center justify-between px-4 py-3 border-b ${
            theme === 'dark'
              ? 'bg-gray-900/50 border-gray-700/50'
              : 'bg-gray-100 border-gray-300/50'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Language Badge */}
            <span 
              className={`px-2 py-1 text-xs font-mono font-semibold rounded border ${getLanguageColor()}`}
            >
              {language.toUpperCase()}
            </span>
            
            {/* File Name (optional) */}
            {fileName && (
              <span className={`text-sm font-mono ${themeConfig.text.secondary}`}>
                {fileName}
              </span>
            )}
          </div>
          
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded transition-all ${
              copied
                ? theme === 'dark'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-green-100 text-green-600 border border-green-300'
                : theme === 'dark'
                ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
        
        {/* Code Content */}
        <div className="overflow-x-auto">
          <pre 
            className={`p-4 text-sm sm:text-base font-mono leading-relaxed ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            {showLineNumbers ? (
              <table className="w-full border-collapse">
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={index}>
                      <td 
                        className={`pr-4 text-right select-none ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}
                        style={{ minWidth: '2.5rem' }}
                      >
                        {index + 1}
                      </td>
                      <td className="pl-4">
                        <code>{line || '\n'}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <code>{code}</code>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
