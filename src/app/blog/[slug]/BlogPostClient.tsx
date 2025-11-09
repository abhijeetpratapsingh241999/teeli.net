"use client";

import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { BlogPost } from '@/lib/blog';
import IntroBox from '@/components/blog-ui/IntroBox';
import Callout from '@/components/blog-ui/Callout';
import SmartTable from '@/components/blog-ui/SmartTable';
import TOC from '@/components/blog-ui/TOC';
import ReadingProgressBar from '@/components/blog-ui/ReadingProgressBar';
import FAQAccordion from '@/components/blog-ui/FAQAccordion';
import CTASection from '@/components/blog-ui/CTASection';
import ContinueReadingCards from '@/components/blog-ui/ContinueReadingCards';
import { generateAllSchemas } from '@/lib/seo-schema';
import Heading from '@/components/blog-ui/Heading';
import IconListItem from '@/components/blog-ui/IconListItem';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

type SchemaObject = Record<string, unknown>;

function BlogPostContent({ post, relatedPosts }: BlogPostClientProps) {
  const { theme } = useBlogTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [schemas, setSchemas] = useState<SchemaObject[]>([]);

  // Generate structured data schemas on client-side only
  useEffect(() => {
    const generatedSchemas = generateAllSchemas(post);
    setSchemas(generatedSchemas);
  }, [post]);

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
    let currentHeadingLevel: 'h2' | 'h3' | null = null;

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
          <h1 key={key++} className={`font-heading text-[36px] sm:text-[42px] md:text-[48px] font-bold tracking-tight mb-5 sm:mb-7 mt-8 sm:mt-12 text-center md:text-left ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {renderInlineMarkdown(trimmedLine.slice(2))}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        if (isFirstH2) {
          elements.push(
            <div key={`toc-${key++}`}>
              <TOC contentRef={contentRef} />
            </div>
          );
          isFirstH2 = false;
        }
        currentHeadingLevel = 'h2';
        const headingText = trimmedLine.slice(3);
        const headingId = headingText
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        elements.push(
          <Heading key={key++} id={headingId} level="h2">
            {renderInlineMarkdown(headingText)}
          </Heading>
        );
      } else if (trimmedLine.startsWith('### ')) {
        currentHeadingLevel = 'h3';
        const headingText = trimmedLine.slice(4);
        const headingId = headingText
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        elements.push(
          <Heading key={key++} id={headingId} level="h3">
            {renderInlineMarkdown(headingText)}
          </Heading>
        );
      } else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
        // H2 ke neeche red icon (large), H3 ke neeche blue icon (default)
        const iconColor = currentHeadingLevel === 'h2' ? 'red' : 'blue';
        const iconSize = currentHeadingLevel === 'h2' ? 'large' : 'default';
        elements.push(
          <IconListItem key={key++} color={iconColor} size={iconSize}>
            {renderInlineMarkdown(trimmedLine.slice(2))}
          </IconListItem>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        const match = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
        if (match) {
          // H2 ke neeche red numbered icon (large), H3 ke neeche blue numbered icon (default)
          const iconColor = currentHeadingLevel === 'h2' ? 'red' : 'blue';
          const iconSize = currentHeadingLevel === 'h2' ? 'large' : 'default';
          const numberValue = parseInt(match[1], 10);
          elements.push(
            <IconListItem key={key++} color={iconColor} size={iconSize} numbered={true} number={numberValue}>
              {renderInlineMarkdown(match[2])}
            </IconListItem>
          );
        }
      } else if (trimmedLine.match(/^\[\d+\]/)) {
        elements.push(
          <p key={key++} className={`mb-6 leading-relaxed text-[17px] md:text-[19px] ${
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
          <p key={key++} className={`mb-6 leading-relaxed text-[17px] md:text-[19px] ${
            theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
          }`}>
            <a href={trimmedLine.match(/\(([^)]+)\)/)?.[1]} target="_blank" rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 underline break-all">
              {trimmedLine}
            </a>
          </p>
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
            <p key={key++} className={`mb-6 leading-relaxed text-[17px] md:text-[19px] ${
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
        <div 
          className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
            isScrolled ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <Header />
        </div>
        
        {/* Back to Blog Button */}
        <div className="fixed bottom-4 sm:bottom-8 left-2 sm:left-4 md:left-8 z-40">
          <Link href="/blog">
            <button
              className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to Blog</span>
              <span className="sm:hidden">Back</span>
            </button>
          </Link>
        </div>

        {/* Theme Toggle Button */}
        <div className="fixed bottom-4 sm:bottom-8 right-2 sm:right-4 md:right-8 z-40">
          <BlogThemeToggle />
        </div>

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

          {/* Featured Image or Video */}
          {post.heroVideo ? (
            <div className="mb-8 sm:mb-12 overflow-hidden rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl">
              <video 
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src={post.heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : post.image ? (
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
          ) : null}

          {/* Table of Contents - Now rendered inside content before first H2 */}

          <div ref={contentRef} className="max-w-none">
            {renderContent(post.content!)}
          </div>

          {post.faq && post.faq.length > 0 && (
            <FAQAccordion faq={post.faq} />
          )}

          {/* CTA Section */}
          <CTASection />

          {/* Continue Reading Section */}
          <ContinueReadingCards posts={relatedPosts} />
        </article>

        {/* Structured Data Schemas - Injected on client-side only */}
        {schemas.map((schema, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
