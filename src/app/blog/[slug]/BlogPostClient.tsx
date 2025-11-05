"use client";

import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog';
import RelatedPosts from './RelatedPosts';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function BlogPostContent({ post, relatedPosts }: BlogPostClientProps) {
  const { theme } = useBlogTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 200) {
        if (currentScrollY < lastScrollY) {
          setIsScrolled(false);
        } else {
          setIsScrolled(true);
        }
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: ReactNode[] = [];
    let key = 0;
    let isFirstH1 = true;
    let inTable = false;
    let tableRows: string[] = [];
    let inScript = false;
    let scriptContent: string[] = [];
    let inFAQSection = false;
    let faqItems: { question: string; answer: string }[] = [];
    let currentFaqQuestion = '';
    let currentFaqAnswer: string[] = [];

    const processLine = (line: string) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        if (!inTable && !inScript) {
          elements.push(<br key={key++} />);
        }
        return;
      }

      // Handle script tags
      if (trimmedLine.startsWith('<script')) {
        inScript = true;
        scriptContent = [trimmedLine];
        return;
      }
      
      if (inScript) {
        scriptContent.push(trimmedLine);
        if (trimmedLine.includes('</script>')) {
          const fullScript = scriptContent.join('\n');
          elements.push(
            <div key={key++} dangerouslySetInnerHTML={{ __html: fullScript }} />
          );
          inScript = false;
          scriptContent = [];
        }
        return;
      }

      // Handle markdown images: ![alt](image.webp) or ![alt](image.mp4)
      const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
        
        console.log('Image found:', { alt, src, isVideo }); // Debug log
        
        if (isVideo) {
          elements.push(
            <div key={key++} className="my-6 sm:my-8">
              <video 
                src={`/blog/${src}`}
                controls
                className="w-full rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          );
        } else {
          elements.push(
            <div key={key++} className="my-6 sm:my-8">
              <img 
                src={`/blog/${src}`}
                alt={alt}
                className="w-full h-auto rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl"
                loading="lazy"
                onError={(e) => {
                  console.error('Image failed to load:', `/blog/${src}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          );
        }
        return;
      }

      // Handle tables
      if (trimmedLine.startsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        tableRows.push(trimmedLine);
        return;
      } else if (inTable) {
        // End of table, render it
        if (tableRows.length > 0) {
          const tableHeaders = tableRows[0].split('|').map(h => h.trim()).filter(h => h);

          const dataRows = tableRows.slice(2);
          
          elements.push(
            <div key={key++} className="my-6 sm:my-8 overflow-x-auto">
              <div className={`rounded-lg border-2 overflow-hidden ${
                theme === 'dark' ? 'border-cyan-500/30 bg-gray-900/30' : 'border-cyan-200 bg-white'
              }`}>
                <table className={`w-full border-collapse text-sm sm:text-base ${
                  theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
                }`}>
                  <thead>
                    <tr className={`${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border-b-2 border-cyan-500/50' 
                        : 'bg-gradient-to-r from-cyan-50 to-purple-50 border-b-2 border-cyan-600'
                    }`}>
                      {tableHeaders.map((header, idx) => (
                        <th key={idx} className={`p-4 sm:p-5 text-left font-bold text-base sm:text-lg ${
                          theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'
                        }`}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, rowIdx) => {
                      const cells = row.split('|').map(c => c.trim()).filter(c => c);
                      return (
                        <tr key={rowIdx} className={`transition-colors hover:${
                          theme === 'dark' ? 'bg-cyan-900/20' : 'bg-cyan-50/50'
                        } ${
                          theme === 'dark' ? 'border-b border-white/10' : 'border-b border-gray-200'
                        }`}>
                          {cells.map((cell, cellIdx) => (
                            <td key={cellIdx} className={`p-4 sm:p-5 ${
                              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                            }`}>
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
          );
        }
        inTable = false;
        tableRows = [];
      }

      if (trimmedLine.startsWith('# ')) {
        if (isFirstH1) {
          isFirstH1 = false;
          return;
        }
        elements.push(
          <h1 key={key++} className={`font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 mt-8 sm:mt-12 text-center md:text-left ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {renderInlineMarkdown(trimmedLine.slice(2))}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className={`font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 mt-8 sm:mt-10 text-center md:text-left ${
            theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
          }`}>
            {renderInlineMarkdown(trimmedLine.slice(3))}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className={`font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 mt-6 sm:mt-8 ${
            theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
          }`}>
            {renderInlineMarkdown(trimmedLine.slice(4))}
          </h3>
        );
      } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        elements.push(
          <li key={key++} className={`ml-4 sm:ml-6 mb-2 list-disc text-sm sm:text-base md:text-lg ${
            theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
          }`}>
            {renderInlineMarkdown(trimmedLine.slice(2))}
          </li>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        // Numbered list
        const match = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
        if (match) {
          elements.push(
            <li key={key++} className={`ml-4 sm:ml-6 mb-2 list-decimal text-sm sm:text-base md:text-lg ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
            }`}>
              {renderInlineMarkdown(match[2])}
            </li>
          );
        }
      } else if (trimmedLine.match(/^\[\d+\]/)) {
        elements.push(
          <p key={key++} className={`mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base md:text-lg ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
          }`}>
            <a href={trimmedLine.match(/\(([^)]+)\)/)?.[1]} target="_blank" rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 underline break-all">
              {trimmedLine}
            </a>
          </p>
        );
      } else if (trimmedLine.startsWith('(') && trimmedLine.includes('utm_source')) {
        elements.push(
          <p key={key++} className={`mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base md:text-lg ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
          }`}>
            <a href={trimmedLine.match(/\(([^)]+)\)/)?.[1]} target="_blank" rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 underline break-all">
              {trimmedLine}
            </a>
          </p>
        );
      } else if (trimmedLine.startsWith('## FAQ')) {
        // FAQ Section Header - collect all FAQ items first
        inFAQSection = true;
        // Skip this line, continue processing
        return;
      } else if (inFAQSection && trimmedLine.match(/^\*\*[^*]+\?\*\*$/)) {
        // FAQ Question - save previous FAQ if exists
        if (currentFaqQuestion && currentFaqAnswer.length > 0) {
          faqItems.push({
            question: currentFaqQuestion,
            answer: currentFaqAnswer.join(' ')
          });
          currentFaqAnswer = [];
        }
        // Start new FAQ item
        currentFaqQuestion = trimmedLine.replace(/\*\*/g, '');
      } else if (inFAQSection && currentFaqQuestion && trimmedLine && !trimmedLine.startsWith('---') && !trimmedLine.startsWith('*Ready to transform')) {
        // FAQ Answer - collect answer lines
        currentFaqAnswer.push(trimmedLine);
      } else if (inFAQSection && (trimmedLine.startsWith('---') || trimmedLine.startsWith('*Ready to transform'))) {
        // End of FAQ section
        if (currentFaqQuestion && currentFaqAnswer.length > 0) {
          faqItems.push({
            question: currentFaqQuestion,
            answer: currentFaqAnswer.join(' ')
          });
        }
        
        // Render the complete FAQ section with accordion
        if (faqItems.length > 0) {
          elements.push(
            <div key={key++} className="my-8 sm:my-12">
              <h2 className={`font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6 ${
                theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
              }`}>
                FAQ (Frequently Asked Questions)
              </h2>
              <div className={`max-h-[600px] overflow-y-auto pr-2 space-y-4 rounded-lg border-2 p-4 sm:p-6 ${
                theme === 'dark' 
                  ? 'border-cyan-500/30 bg-gray-900/50 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-800' 
                  : 'border-cyan-200 bg-gray-50 scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-200'
              }`}>
                {faqItems.map((faq, index) => (
                  <div
                    key={`faq-${index}`}
                    className={`rounded-lg border overflow-hidden transition-all ${
                      theme === 'dark'
                        ? 'border-cyan-500/20 bg-gray-800/50'
                        : 'border-cyan-200 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className={`w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 transition-colors hover:${
                        theme === 'dark' ? 'bg-cyan-900/20' : 'bg-cyan-50'
                      }`}
                    >
                      <h4 className={`font-bold text-sm sm:text-base md:text-lg flex-1 ${
                        theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
                      }`}>
                        {faq.question}
                      </h4>
                      <svg
                        className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform ${
                          openFaqIndex === index ? 'rotate-180' : ''
                        } ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className={`p-4 sm:p-5 pt-0 text-sm sm:text-base leading-relaxed ${
                            theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                          }`}>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          );
          
          // Reset FAQ variables
          faqItems = [];
          currentFaqQuestion = '';
          currentFaqAnswer = [];
        }
        
        inFAQSection = false;
        
        // Process the current line if it's not just a separator
        if (!trimmedLine.startsWith('---')) {
          // Re-process this line normally
          processLine(trimmedLine);
        }
      } else if (trimmedLine.match(/^\*\*[^*]+\?\*\*$/) || (trimmedLine.startsWith('**') && trimmedLine.includes('?'))) {
        // FAQ Question outside FAQ section (legacy format) - skip for now
        return;
      } else {
        elements.push(
          <p key={key++} className={`mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base md:text-lg ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
          }`}>
            {renderInlineMarkdown(trimmedLine)}
          </p>
        );
      }
    };

    // Process all lines
    for (let i = 0; i < lines.length; i++) {
      processLine(lines[i]);
    }

    // Handle any remaining FAQ items at end of content
    if (inFAQSection && faqItems.length > 0) {
      // Add last FAQ if exists
      if (currentFaqQuestion && currentFaqAnswer.length > 0) {
        faqItems.push({
          question: currentFaqQuestion,
          answer: currentFaqAnswer.join(' ')
        });
      }
      
      // Render the complete FAQ section
      elements.push(
        <div key={key++} className="my-8 sm:my-12">
          <h2 className={`font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6 ${
            theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
          }`}>
            FAQ (Frequently Asked Questions)
          </h2>
          <div className={`max-h-[600px] overflow-y-auto pr-2 space-y-4 rounded-lg border-2 p-4 sm:p-6 ${
            theme === 'dark' 
              ? 'border-cyan-500/30 bg-gray-900/50 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-800' 
              : 'border-cyan-200 bg-gray-50 scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-200'
          }`}>
            {faqItems.map((faq, index) => (
              <div
                key={`faq-${index}`}
                className={`rounded-lg border overflow-hidden transition-all ${
                  theme === 'dark'
                    ? 'border-cyan-500/20 bg-gray-800/50'
                    : 'border-cyan-200 bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className={`w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 transition-colors hover:${
                    theme === 'dark' ? 'bg-cyan-900/20' : 'bg-cyan-50'
                  }`}
                >
                  <h4 className={`font-bold text-sm sm:text-base md:text-lg flex-1 ${
                    theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
                  }`}>
                    {faq.question}
                  </h4>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    } ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 sm:p-5 pt-0 text-sm sm:text-base leading-relaxed ${
                        theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle any remaining table
    if (inTable && tableRows.length > 0) {
      const tableHeaders = tableRows[0].split('|').map(h => h.trim()).filter(h => h);
      const dataRows = tableRows.slice(2);
      
      elements.push(
        <div key={key++} className="my-6 sm:my-8 overflow-x-auto">
          <div className={`rounded-lg border-2 overflow-hidden ${
            theme === 'dark' ? 'border-cyan-500/30 bg-gray-900/30' : 'border-cyan-200 bg-white'
          }`}>
            <table className={`w-full border-collapse text-sm sm:text-base ${
              theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
            }`}>
              <thead>
                <tr className={`${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border-b-2 border-cyan-500/50' 
                    : 'bg-gradient-to-r from-cyan-50 to-purple-50 border-b-2 border-cyan-600'
                }`}>
                  {tableHeaders.map((header, idx) => (
                    <th key={idx} className={`p-4 sm:p-5 text-left font-bold text-base sm:text-lg ${
                      theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'
                    }`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rowIdx) => {
                  const cells = row.split('|').map(c => c.trim()).filter(c => c);
                  return (
                    <tr key={rowIdx} className={`transition-colors hover:${
                      theme === 'dark' ? 'bg-cyan-900/20' : 'bg-cyan-50/50'
                    } ${
                      theme === 'dark' ? 'border-b border-white/10' : 'border-b border-gray-200'
                    }`}>
                      {cells.map((cell, cellIdx) => (
                        <td key={cellIdx} className={`p-4 sm:p-5 ${
                          theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                        }`}>
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
      );
    }

    return <>{elements}</>;
  };

  const renderInlineMarkdown = (text: string) => {
    const parts: ReactNode[] = [];

    let key = 0;

    // Handle **bold** text
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // Add bold text
      parts.push(
        <strong key={key++} className="font-bold">
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? <>{parts}</> : text;
  };

  return (
    <>
      <main className={`relative min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 right-0 z-50"
            >
              <Header />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Back to Blog Button */}
        <div className="fixed bottom-4 sm:bottom-8 left-2 sm:left-4 md:left-8 z-40">
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all flex items-center gap-1 sm:gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to Blog</span>
              <span className="sm:hidden">Back</span>
            </motion.button>
          </Link>
        </div>

        {/* Theme Toggle Button */}
        <div className="fixed bottom-4 sm:bottom-8 right-2 sm:right-4 md:right-8 z-40">
          <BlogThemeToggle />
        </div>

        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              description: post.excerpt,
              image: post.image ? `https://teeli.net${post.image}` : '',
              datePublished: post.date,
              author: {
                '@type': 'Person',
                name: post.author,
                jobTitle: post.authorRole,
              },
              publisher: {
                '@type': 'Organization',
                name: 'TEELI.NET',
              },
            }),
          }}
        />

        <article className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 pt-32 pb-16 sm:pb-24 md:pb-32">
          <div className={`relative rounded-2xl sm:rounded-3xl border-2 p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-xl mb-8 sm:mb-12 overflow-hidden ${
            theme === 'dark'
              ? 'border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/40 to-black/60'
              : 'border-cyan-500/50 bg-white shadow-lg'
          }`}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-cyan-400 text-xs font-semibold mb-3 sm:mb-4">{post.category}</div>
              <h1 className={`font-heading text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {post.title}
              </h1>
              <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed ${
                theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className={`text-xs sm:text-sm font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{post.author}</div>
                    {post.authorRole && (
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}>{post.authorRole}</div>
                    )}
                  </div>
                </div>
                <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}>•</span>
                <div className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>{post.date}</div>
                <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}>•</span>
                <div className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>{post.readTime}</div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8 sm:mb-12 overflow-hidden">
              <Image 
                src={post.image} 
                alt={post.title}
                width={1200}
                height={675}
                priority
                className="w-full h-auto rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl"
              />
            </div>
          )}

          <div className="max-w-none">
            {renderContent(post.content!)}
          </div>

          {/* CTA Section */}
          <div className={`mt-8 sm:mt-12 md:mt-16 pt-8 sm:pt-10 md:pt-12 border-t ${
            theme === 'dark' ? 'border-white/20' : 'border-gray-300'
          }`}>
            <div className="text-center">
              <h2 className={`font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Ready to Transform Your Workflow?
              </h2>
              <p className={`text-sm sm:text-base md:text-lg mb-6 sm:mb-8 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
              }`}>
                Discover how TEELI can accelerate your projects
              </p>
              <Link href="/">
                <button className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 font-bold text-white text-sm sm:text-base hover:from-cyan-700 hover:to-purple-700 transition-all shadow-lg shadow-cyan-500/30">
                  Explore TEELI →
                </button>
              </Link>
            </div>
          </div>

          {/* Related Articles Section */}
          <RelatedPosts posts={relatedPosts} />
        </article>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  return (
    <BlogThemeProvider>
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </BlogThemeProvider>
  );
}
