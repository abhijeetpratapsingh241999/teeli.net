'use client';

import { useMemo, useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings using useMemo to avoid effect dependency issues
  const toc = useMemo(() => {
    const headings: TOCItem[] = [];
    const lines = content.split('\n');
    
    lines.forEach((line) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('## ')) {
        const text = trimmed.slice(3).replace(/\*\*/g, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        headings.push({ id, text, level: 2 });
      } else if (trimmed.startsWith('### ')) {
        const text = trimmed.slice(4).replace(/\*\*/g, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        headings.push({ id, text, level: 3 });
      }
    });
    
    return headings;
  }, [content]);

  useEffect(() => {
    // Track active heading on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    const headingElements = document.querySelectorAll('h2, h3');
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className={`glass-card p-6 sticky top-24 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-white">Table of Contents</h3>
      </div>
      
      <nav className="space-y-2 max-h-[60vh] overflow-y-auto scrollbar-hide">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`
              block w-full text-left text-sm transition-all duration-200
              ${item.level === 3 ? 'pl-4' : 'pl-0'}
              ${
                activeId === item.id
                  ? 'text-cyan-400 font-semibold'
                  : 'text-zinc-400 hover:text-cyan-300'
              }
            `}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
