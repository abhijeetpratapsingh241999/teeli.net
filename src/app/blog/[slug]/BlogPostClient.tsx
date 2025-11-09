"use client";

import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { BlogPost } from '@/lib/blog';
import ContinueReading from './RelatedPosts';
import { motion, AnimatePresence } from 'framer-motion';
import IntroBox from '@/components/blog-ui/IntroBox';
import Callout from '@/components/blog-ui/Callout';
import SmartTable from '@/components/blog-ui/SmartTable';
import TOC from '@/components/blog-ui/TOC';
import ReadingProgressBar from '@/components/blog-ui/ReadingProgressBar';
import FAQAccordion from '@/components/blog-ui/FAQAccordion';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function BlogPostContent({ post, relatedPosts }: BlogPostClientProps) {
  const { theme } = useBlogTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

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
    let isFirstParagraph = true;
    let isFirstH2 = true;
    let inTable = false;
    let tableRows: string[] = [];
    let inScript = false;
    let scriptContent: string[] = [];
    let inFAQContainer = false;
    let inCallout = false;
    let calloutContent: string[] = [];

    const processLine = (line: string) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        if (!inTable && !inScript && !inCallout) {
          elements.push(<br key={key++} />);
        }
        return;
      }

      // Handle callout blocks
      if (trimmedLine === ':::callout') {
        inCallout = true;
        calloutContent = [];
        return;
      }

      if (inCallout) {
        if (trimmedLine === ':::') {
          // End callout block
          elements.push(
            <Callout key={key++}>
              {calloutContent.join('\n')}
            </Callout>
          );
          inCallout = false;
          calloutContent = [];
        } else {
          calloutContent.push(trimmedLine);
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
              <Image 
                src={`/blog/${src}`}
                alt={alt}
                width={1200}
                height={675}
                className="w-full h-auto rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl"
                loading="lazy"
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
        // End of table, render it using SmartTable component
        if (tableRows.length > 0) {
          elements.push(
            <SmartTable key={key++} rows={tableRows} />
          );
        }
        inTable = false;
        tableRows = [];
      }

      if (trimmedLine.startsWith('# ')) {
        elements.push(
          <h1 key={key++} className={`font-heading text-[32px] sm:text-[38px] md:text-[44px] font-bold tracking-tight mb-4 sm:mb-6 mt-8 sm:mt-12 text-center md:text-left ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {renderInlineMarkdown(trimmedLine.slice(2))}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        // Insert TOC before first H2
        if (isFirstH2) {
          elements.push(
            <div key={`toc-${key++}`}>
              <TOC contentRef={contentRef} />
            </div>
          );
          isFirstH2 = false;
        }
        
        const headingText = trimmedLine.slice(3);
        const headingId = headingText.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        elements.push(
          <h2 
            key={key++} 
            id={headingId}
            className={`font-heading text-[26px] sm:text-[30px] md:text-[34px] font-semibold mb-3 sm:mb-4 mt-[32px] sm:mt-[40px] text-center md:text-left scroll-mt-24 ${
              theme === 'dark' ? 'text-cyan-500' : 'text-cyan-700'
            }`}
          >
            {renderInlineMarkdown(headingText)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        const headingText = trimmedLine.slice(4);
        const headingId = headingText.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        elements.push(
          <h3 
            key={key++} 
            id={headingId}
            className={`font-heading text-[20px] sm:text-[23px] md:text-[26px] font-semibold mb-2 sm:mb-3 mt-[28px] scroll-mt-24 ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}
          >
            {renderInlineMarkdown(headingText)}
          </h3>
        );
      } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        elements.push(
          <li key={key++} className={`ml-5 mb-[10px] list-disc text-base md:text-[18px] leading-relaxed marker:${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
          } ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>
            {renderInlineMarkdown(trimmedLine.slice(2))}
          </li>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        // Numbered list
        const match = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
        if (match) {
          elements.push(
            <li key={key++} className={`ml-5 mb-[10px] list-decimal text-base md:text-[18px] leading-relaxed marker:${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            } ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>
              {renderInlineMarkdown(match[2])}
            </li>
          );
        }
      } else if (trimmedLine.match(/^\[\d+\]/)) {
        elements.push(
          <p key={key++} className={`mb-[24px] leading-relaxed text-base md:text-[18px] ${
            theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
          }`}>
            <a href={trimmedLine.match(/\(([^)]+)\)/)?.[1]} target="_blank" rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 underline break-all">
              {trimmedLine}
            </a>
          </p>
        );
      } else if (trimmedLine.startsWith('(') && trimmedLine.includes('utm_source')) {
        elements.push(
          <p key={key++} className={`mb-[24px] leading-relaxed text-base md:text-[18px] ${
            theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
          }`}>
            <a href={trimmedLine.match(/\(([^)]+)\)/)?.[1]} target="_blank" rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 underline break-all">
              {trimmedLine}
            </a>
          </p>
        );
      } else if (trimmedLine.startsWith('## FAQ')) {
        // FAQ Section Header - Start scrollable container
        const faqContainerId = `faq-container-${key++}`;
        const faqHeaderKey = `faq-header-${key++}`;
        elements.push(
          <div key={faqHeaderKey} className="my-8 sm:my-12">
            <h2 className={`font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6 ${
              theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
            }`}>
              {trimmedLine.replace(/^##\s*/, '')}
            </h2>
            <div id={faqContainerId} className={`max-h-[500px] overflow-y-auto pr-4 space-y-6 rounded-lg border-2 p-6 ${
              theme === 'dark' 
                ? 'border-cyan-500/30 bg-gray-900/50 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-800' 
                : 'border-cyan-200 bg-gray-50 scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-200'
            }`}>
            </div>
          </div>
        );
        // Mark that we're in FAQ section
        inFAQContainer = true;
      } else if (trimmedLine.match(/^\*\*[^*]+\?\*\*$/) || (trimmedLine.startsWith('**') && trimmedLine.includes('?'))) {
        // FAQ Question - Bold text ending with ?
        const questionText = trimmedLine.replace(/\*\*/g, '');
        elements.push(
          <div key={key++} className={`mb-3 mt-6 first:mt-0 pb-3 border-b ${
            theme === 'dark' ? 'border-cyan-500/20' : 'border-cyan-200'
          }`}>
            <h4 className={`font-bold text-base sm:text-lg md:text-xl mb-2 ${
              theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
            }`}>
              {questionText}
            </h4>
          </div>
        );
      } else {
        // First general paragraph becomes IntroBox
        if (isFirstParagraph) {
          elements.push(
            <IntroBox key={key++}>
              {renderInlineMarkdown(trimmedLine)}
            </IntroBox>
          );
          isFirstParagraph = false;
        } else {
          elements.push(
            <p key={key++} className={`mb-[24px] leading-relaxed text-base md:text-[18px] ${
              theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
            }`}>
              {renderInlineMarkdown(trimmedLine)}
            </p>
          );
        }
      }
    };

    // Process all lines
    for (let i = 0; i < lines.length; i++) {
      processLine(lines[i]);
    }

    // Close FAQ scrollable container if still open
    if (inFAQContainer) {
      elements.push(
        <div key={`faq-container-end-${key++}`}></div>
      );
      inFAQContainer = false;
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
      <main className={`min-h-screen font-body transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <ReadingProgressBar />
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

        {/* Structured Data Schemas */}
        {typeof window !== 'undefined' && (
          <>
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
                  mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://teeli.net/blog/${post.slug}`
                  },
                  url: `https://teeli.net/blog/${post.slug}`,
                  author: {
                    '@type': 'Person',
                    name: post.author,
                    jobTitle: post.authorRole,
                  },
                  publisher: {
                    '@type': 'Organization',
                    name: 'TEELI.NET',
                    logo: {
                      '@type': 'ImageObject',
                      url: 'https://teeli.net/logos/teeli-logo.png'
                    }
                  },
                  articleSection: post.category,
                  keywords: post.content 
                    ? [...new Set(
                        post.content
                          .split('\n')
                          .filter(line => line.startsWith('##') || line.startsWith('###'))
                          .map(h => h.replace(/^#{2,3}\s*/, '').trim())
                          .filter(Boolean)
                      )].join(', ')
                    : '',
                  wordCount: post.content 
                    ? post.content.split(/\s+/).filter(word => word.length > 0).length 
                    : 0
                }),
              }}
            />

            {/* FAQPage Schema */}
            {post.faq && post.faq.length > 0 && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: post.faq.map(item => ({
                      '@type': 'Question',
                      name: item.question,
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer
                      }
                    }))
                  }),
                }}
              />
            )}

            {/* Table-based Schema (HowTo or Dataset) */}
            {post.content && (() => {
              const tableMatches = post.content.match(/\|[^\n]+\|/g);
              if (!tableMatches || tableMatches.length < 3) return null;

              // Extract table content
              const tableRows = tableMatches.slice(0, -1); // Remove separator row
              const headers = tableRows[0].split('|').map(h => h.trim()).filter(Boolean);
              const dataRows = tableRows.slice(2).map(row => 
                row.split('|').map(c => c.trim()).filter(Boolean)
              );

              // Check if table describes steps/process
              const tableText = tableRows.join(' ').toLowerCase();
              const isHowTo = /step|process|workflow|procedure|guide|tutorial/i.test(tableText);

              if (isHowTo && dataRows.length > 0) {
                // HowTo Schema
                return (
                  <script
                    key="howto-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'HowTo',
                        name: post.title,
                        description: post.excerpt,
                        step: dataRows.map((row, idx) => ({
                          '@type': 'HowToStep',
                          position: idx + 1,
                          name: row[0] || `Step ${idx + 1}`,
                          text: row.slice(1).join(' ')
                        }))
                      }),
                    }}
                  />
                );
              } else if (dataRows.length > 0) {
                // Dataset Schema
                return (
                  <script
                    key="dataset-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Dataset',
                        name: `${post.title} - Data Table`,
                        description: `Structured data from ${post.title}`,
                        creator: {
                          '@type': 'Organization',
                          name: 'TEELI.NET'
                        },
                        distribution: {
                          '@type': 'DataDownload',
                          encodingFormat: 'text/html',
                          contentUrl: `https://teeli.net/blog/${post.slug}`
                        },
                        variableMeasured: headers.map(header => ({
                          '@type': 'PropertyValue',
                          name: header
                        }))
                      }),
                    }}
                  />
                );
              }
              return null;
            })()}
          </>
        )}

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

          {/* Table of Contents - Now rendered inside content before first H2 */}

          <div ref={contentRef} className="max-w-none">
            {renderContent(post.content!)}
          </div>

          {post.faq && post.faq.length > 0 && (
            <FAQAccordion faq={post.faq} />
          )}

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

          {/* Continue Reading Section */}
          <ContinueReading posts={relatedPosts} />
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
