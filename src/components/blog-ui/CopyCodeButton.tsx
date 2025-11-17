"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useBlogTheme } from '@/components/BlogThemeProvider';

interface CopyCodeButtonProps {
  code: string;
}

/**
 * CopyCodeButton Component
 * 
 * Displays a copy button for code blocks.
 * Shows checkmark feedback when copied.
 */
export default function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const { theme } = useBlogTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        absolute top-2 right-2 p-2 rounded-md
        transition-all duration-200
        ${theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }
        ${copied ? 'scale-95' : 'hover:scale-105'}
      `}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}
