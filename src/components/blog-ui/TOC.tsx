'use client';

import { useState, useEffect } from 'react';
import { useBlogTheme } from '@/components/BlogThemeProvider';

interface TOCItem {
  id: string;
  level: 2 | 3;
  text: string;
}

interface TOCProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export default function TOC({ contentRef }: TOCProps) {
  const { theme } = useBlogTheme();
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false); // Mobile/Tablet: closed by default

  useEffect(() => {
    const extractHeadings = () => {
      if (!contentRef.current) return;

      const headings = contentRef.current.querySelectorAll('h2, h3');
      const items: TOCItem[] = [];

      headings.forEach((heading) => {
        const level = heading.tagName === 'H2' ? 2 : 3;
        const text = heading.textContent || '';
        let id = heading.id;

        if (!id) {
          id = text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          heading.id = id;
        }

        items.push({ id, level, text });
      });

      setTocItems(items);
    };

    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, [contentRef]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = tocItems.length - 1; i >= 0; i--) {
        const element = document.getElementById(tocItems[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(tocItems[i].id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <>
      {/* Desktop: Inline accordion */}
      <div className="hidden lg:block mb-8 sm:mb-10">
        <div className={`rounded-xl sm:rounded-2xl border overflow-hidden transition-all shadow-sm ${
          theme === 'dark'
            ? 'bg-gray-900/60 border-cyan-500/30 shadow-cyan-500/10'
            : 'bg-gray-50 border-gray-300 shadow-gray-200/50'
        }`}>
          {/* Clear Header with Icon */}
          <div className={`px-6 py-4 ${
            theme === 'dark' ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50' : 'bg-gradient-to-r from-gray-100 to-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'
              }`}>
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className={`text-lg font-bold ${
                theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                Table of Contents
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 transition-all text-sm font-semibold ${
              theme === 'dark' 
                ? 'text-cyan-400 hover:bg-gray-800/50 hover:text-cyan-300' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-expanded={isOpen}
          >
            <span>{isOpen ? 'Hide Contents' : 'Show Contents'}</span>
            <svg
              className={`w-4 h-4 transition-all duration-300 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
            style={{ transitionProperty: 'max-height, opacity' }}
          >
            <nav className="px-5 py-4">
              <ul className="space-y-1">
                {tocItems.map((item) => (
                  <li
                    key={item.id}
                    className={item.level === 3 ? 'ml-6' : ''}
                  >
                    <button
                      onClick={() => handleClick(item.id)}
                      className={`text-left w-full text-sm transition-all duration-200 py-2.5 px-3 rounded-lg flex items-start gap-2 ${
                        activeId === item.id
                          ? theme === 'dark'
                            ? 'bg-cyan-900/40 text-cyan-300 font-semibold shadow-sm'
                            : 'bg-gray-200 text-gray-900 font-semibold shadow-sm'
                          : theme === 'dark'
                          ? 'text-zinc-200 hover:text-cyan-300 hover:bg-gray-800/50'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      } ${
                        item.level === 2
                          ? 'font-medium'
                          : 'font-normal text-xs opacity-90'
                      }`}
                    >
                      <span className={`mt-0.5 ${
                        activeId === item.id
                          ? theme === 'dark' ? 'text-cyan-400' : 'text-gray-900'
                          : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {item.level === 2 ? '•' : '◦'}
                      </span>
                      <span className="flex-1">{item.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Floating button + Right side drawer */}
      <div className="lg:hidden">
        {/* Floating Button - Rectangle with Icon */}
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed right-4 bottom-20 z-40 px-4 py-3 rounded-lg shadow-lg font-semibold text-sm transition-transform hover:scale-105 flex items-center gap-2 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white border-2 border-cyan-400/30'
              : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-2 border-white/50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Table of Contents
        </button>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Right Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-80 z-50 transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } ${
            theme === 'dark'
              ? 'bg-gray-900/60 border-l border-cyan-500/30'
              : 'bg-gray-50 border-l border-gray-300'
          }`}
        >
          {/* Drawer Header */}
          <div className={`flex items-center justify-between px-5 py-4 border-b ${
            theme === 'dark' ? 'border-cyan-500/30' : 'border-gray-300'
          }`}>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className={`text-base font-bold ${
                theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
              }`}>
                Table of Contents
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'text-zinc-200 hover:bg-gray-800/50'
                  : 'text-gray-800 hover:bg-gray-200'
              }`}
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Content */}
          <nav className="px-5 py-4 overflow-y-auto h-[calc(100%-64px)]">
            <ul className="space-y-2">
              {tocItems.map((item) => (
                <li
                  key={item.id}
                  className={item.level === 3 ? 'ml-6' : ''}
                >
                  <button
                    onClick={() => {
                      handleClick(item.id);
                      setIsOpen(false);
                    }}
                    className={`text-left w-full text-sm transition-all duration-200 py-2 px-3 rounded ${
                      activeId === item.id
                        ? theme === 'dark'
                          ? 'bg-cyan-900/40 text-cyan-300 font-semibold'
                          : 'bg-gray-200 text-gray-900 font-semibold'
                        : theme === 'dark'
                        ? 'text-zinc-200 hover:text-cyan-400 hover:bg-gray-800/50'
                        : 'text-gray-800 hover:text-gray-900 hover:bg-gray-100'
                    } ${
                      item.level === 2
                        ? 'font-medium'
                        : 'font-normal text-xs opacity-90'
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
