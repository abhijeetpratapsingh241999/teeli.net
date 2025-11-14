"use client";

/**
 * ============================================
 * BlogPostClient - Main Blog Post Component
 * ============================================
 * 
 * 📋 PURPOSE:
 * Renders individual blog posts with isolated CSS,
 * theme support, and dynamic component loading.
 * 
 * 🎯 CSS SEPARATION STRATEGY:
 * - Imports blog-specific.css for isolated blog styles
 * - Wraps content in .blog-post-container for CSS scoping
 * - Prevents blog styles from affecting website pages
 * - Uses BlogThemeProvider for dark/light theme support
 * 
 * ⚠️ CRITICAL - DO NOT REMOVE:
 * - CSS import: import '../blog-specific.css'
 * - Wrapper div: <div className="blog-post-container">
 * - BlogThemeProvider wrapper (theme context)
 * 
 * 🔧 MAINTENANCE:
 * - Adding components: Import and use inside BlogPostContent
 * - Modifying styles: Edit ../blog-specific.css
 * - Adding metadata: Edit ../page.tsx (server component)
 * 
 * 📦 DEPENDENCIES:
 * - blog-specific.css (5KB, scoped styles)
 * - BlogThemeProvider (theme context)
 * - Dynamic imports (performance optimization)
 * 
 * 🔗 RELATED FILES:
 * - src/app/blog/blog-specific.css (CSS styles)
 * - src/app/blog/[slug]/page.tsx (metadata)
 * - src/app/blog/README.md (architecture guide)
 * 
 * ============================================
 */

import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { BlogPost } from '@/lib/blog';
import IntroBox from '@/components/blog-ui/IntroBox';
import Callout from '@/components/blog-ui/Callout';
import { generateAllSchemas } from '@/lib/seo-schema';
import Heading from '@/components/blog-ui/Heading';
import IconListItem from '@/components/blog-ui/IconListItem';
import IconBullet from '@/components/blog-ui/IconBullet';
import TitleBox from '@/components/blog-ui/TitleBox';
import VideoPlayer from '@/components/blog-ui/VideoPlayer';
import ResponsiveImage from '@/components/blog-ui/ResponsiveImage';
import ResponsiveVideo from '@/components/blog-ui/ResponsiveVideo';
import MobileOnlyDefer from '@/components/performance/MobileOnlyDefer';
import IndustryUseCasesIllustration from '@/components/blog-ui/IndustryUseCasesIllustration';
import dynamic from 'next/dynamic';

// ⚠️ CRITICAL: Blog-specific CSS for isolated styles
// DO NOT REMOVE - Required for blog visual design
import '../blog-specific.css';

// OPTIMIZED: Minimal dynamic imports with no loading states (reduces TBT)
const Header = dynamic(() => import('@/components/Header'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });
const BlogThemeToggle = dynamic(() => import('@/components/BlogThemeToggle'), { ssr: false });
const ReadingProgressBar = dynamic(() => import('@/components/blog-ui/ReadingProgressBar'), { ssr: false });

// Below-fold components: Load client-side only
const CTASection = dynamic(() => import('@/components/blog-ui/CTASection'), { ssr: false });
const ContinueReadingCards = dynamic(() => import('@/components/blog-ui/ContinueReadingCards'), { ssr: false });
const TOC = dynamic(() => import('@/components/blog-ui/TOC'), { ssr: false });
const SmartTable = dynamic(() => import('@/components/blog-ui/SmartTable'), { ssr: false });
const FAQAccordion = dynamic(() => import('@/components/blog-ui/FAQAccordion'), { ssr: false });

/**
 * IconBullet Component Usage Examples:
 * 
 * Example 1 (manual use inside JSX):
 * <ul className="my-4 space-y-2">
 *   <IconBullet as="li">Use PBR materials accurately</IconBullet>
 *   <IconBullet as="li">Match real-world scale</IconBullet>
 *   <IconBullet as="li">Avoid over-sharpening textures</IconBullet>
 * </ul>
 * 
 * Example 2 (inside H3 "Common Mistakes and How to Avoid Them" section):
 * <h3>Common Mistakes and How to Avoid Them</h3>
 * <ul>
 *   <IconBullet as="li"><strong>Incorrect scale</strong> — Always set units to mm/cm.</IconBullet>
 *   <IconBullet as="li"><strong>Flat lighting</strong> — Use HDRI + rim light.</IconBullet>
 *   <IconBullet as="li"><strong>Over-saturation</strong> — Calibrate color profile.</IconBullet>
 * </ul>
 * 
 * Example 3 (best practices section):
 * <ul className="space-y-3">
 *   <IconBullet as="li">Organize assets into clearly named folders</IconBullet>
 *   <IconBullet as="li">Save incremental versions (scene_v01, scene_v02)</IconBullet>
 *   <IconBullet as="li">Document render settings in project notes</IconBullet>
 * </ul>
 * 
 * Note: To use IconBullet, import it via:
 * import { IconBullet } from '@/components/blog-ui';
 */

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
    // DISABLED: Auto-resolve image paths - now using /blog/ folder directly
    // const keywordCategory = post.keywordCategory || '3d-render';
    // const resolvedContent = resolveImagePaths(content, keywordCategory);
    
    // Use content directly without transformation
    const resolvedContent = content;
    
    const lines = resolvedContent.split('\n');
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
              <VideoPlayer 
                src={`/blog/${src}`}
                poster={post.image}
                title={alt || post.title}
              />
            </div>
          );
        } else if (src === '3d-rendering-use-cases-infographic.svg') {
          // Render custom SVG illustration component for industry use cases
          elements.push(
            <IndustryUseCasesIllustration key={key++} />
          );
        } else {
          elements.push(
            <div key={key++} className="my-6 sm:my-8">
              <ResponsiveImage 
                src={`/blog/${src}`}
                alt={alt}
              />
            </div>
          );
        }
        return;
      }

      // Handle YouTube/Vimeo/standalone video URLs
      if (trimmedLine.match(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)/)) {
        elements.push(
          <div key={key++} className="my-6 sm:my-8">
            <VideoPlayer 
              src={trimmedLine}
              title={post.title}
            />
          </div>
        );
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
            <MobileOnlyDefer key={key++} mode="onVisible">
              <SmartTable rows={tableRows} />
            </MobileOnlyDefer>
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
            <MobileOnlyDefer key={`toc-${key++}`} mode="onVisible">
              <TOC contentRef={contentRef} />
            </MobileOnlyDefer>
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
        const listContent = trimmedLine.slice(2);
        
        // Detect ANY bold text starting pattern: **Text**: or **Text** at the beginning
        const hasBoldStart = listContent.trim().startsWith('**');
        
        // Check if it's under H3 heading and has bold text at start
        const isH3BoldPoint = currentHeadingLevel === 'h3' && hasBoldStart;
        
        if (isH3BoldPoint) {
          // Green checkmark icon with IconBullet for all H3 bold points
          elements.push(
            <IconBullet key={key++} as="li">
              {renderInlineMarkdown(listContent)}
            </IconBullet>
          );
        } else {
          // H2 ke neeche red icon (large), H3 ke neeche blue icon (default)
          const iconColor = currentHeadingLevel === 'h2' ? 'red' : 'blue';
          const iconSize = currentHeadingLevel === 'h2' ? 'large' : 'default';
          elements.push(
            <IconListItem key={key++} color={iconColor} size={iconSize}>
              {renderInlineMarkdown(listContent)}
            </IconListItem>
          );
        }
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
      } else if (trimmedLine.startsWith('![')) {
        // Image markdown: ![alt](src)
        const imageMatch = trimmedLine.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (imageMatch) {
          const [, alt, src] = imageMatch;
          
          // Proper path resolution for blog images - DIRECT FILE ACCESS
          let imageSrc: string;
          if (src.startsWith('http://') || src.startsWith('https://')) {
            // External URL - use as is
            imageSrc = src;
          } else if (src.startsWith('/')) {
            // Already absolute path - use as is
            imageSrc = src;
          } else {
            // Relative path - resolve to /blog/ folder 
            imageSrc = `/blog/${src}`;
          }
          
          elements.push(
            <div key={key++} className="my-8 sm:my-10 flex justify-center">
              <div className="w-full max-w-4xl">
                {/* Use regular img tag for all blog content images */}
                <img
                  src={imageSrc}
                  alt={alt || 'Blog image'}
                  className="w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: '600px', objectFit: 'contain' }}
                  loading="lazy"
                />
                {alt && (
                  <p className={`text-center text-sm mt-3 italic ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {alt}
                  </p>
                )}
              </div>
            </div>
          );
        }
      } else {
        // Check if paragraph starts with bold text under H3 (any **Text**: pattern)
        const isBoldParagraph = trimmedLine.trim().startsWith('**') && currentHeadingLevel === 'h3';
        
        if (isBoldParagraph) {
          // Render as IconBullet with green checkmark for H3 bold paragraphs
          elements.push(
            <IconBullet key={key++}>
              {renderInlineMarkdown(trimmedLine)}
            </IconBullet>
          );
        } else if (isFirstParagraph) {
          // First general paragraph becomes IntroBox
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

    // Combined regex to handle both **bold** and [links](url)
    const combinedRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    let lastIndex = 0;
    let match;

    while ((match = combinedRegex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const matchedText = match[0];

      // Handle **bold** text
      if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
        const boldText = matchedText.slice(2, -2);
        parts.push(
          <strong key={key++} className="font-bold">
            {boldText}
          </strong>
        );
      }
      // Handle [link text](url)
      else if (matchedText.startsWith('[') && matchedText.includes('](')) {
        const linkMatch = matchedText.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const [, linkText, url] = linkMatch;
          parts.push(
            <Link 
              key={key++} 
              href={url}
              className={`font-semibold underline decoration-2 hover:decoration-4 transition-all duration-200 ${
                theme === 'dark' 
                  ? 'text-cyan-400 hover:text-cyan-300 decoration-cyan-500/50 hover:decoration-cyan-400' 
                  : 'text-blue-600 hover:text-blue-700 decoration-blue-400/50 hover:decoration-blue-500'
              }`}
            >
              {linkText}
            </Link>
          );
        }
      }

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
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  href="/" 
                  itemProp="item"
                  className={`transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-cyan-400' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  href="/blog" 
                  itemProp="item"
                  className={`transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:text-cyan-400' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span itemProp="name">Blog</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span 
                  itemProp="name"
                  className={`font-medium ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                >
                  {post.category}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* Title Box with Like Button */}
          <TitleBox
            slug={post.slug}
            category={post.category}
            title={post.title}
            excerpt={post.excerpt}
            author={post.author}
            authorRole={post.authorRole}
            date={post.date}
            readTime={post.readTime}
          />

          {/* Featured Image or Video */}
          {post.heroVideo ? (
            <div className="mb-8 sm:mb-12">
              <ResponsiveVideo
                videoSrc={post.heroVideo}
                posterSrc={post.videoMetadata?.thumbnailUrl || post.image || ''}
                alt={post.videoMetadata?.title || `${post.title} - Video Preview`}
                priority={false}
              />
            </div>
          ) : post.image ? (
            <div className="mb-8 sm:mb-12 overflow-hidden">
              <ResponsiveImage 
                src={post.image} 
                alt={post.title}
                priority
              />
            </div>
          ) : null}

          {/* Table of Contents - Now rendered inside content before first H2 */}

          <div ref={contentRef} className="max-w-none">
            {renderContent(post.content!)}
          </div>

          {post.faq && post.faq.length > 0 && (
            <MobileOnlyDefer mode="onVisible">
              <FAQAccordion faq={post.faq} />
            </MobileOnlyDefer>
          )}

          {/* CTA Section - Defer on mobile only */}
          <MobileOnlyDefer mode="onVisible">
            <CTASection />
          </MobileOnlyDefer>

          {/* Continue Reading Section - Defer on mobile only */}
          <MobileOnlyDefer mode="onVisible">
            <ContinueReadingCards posts={relatedPosts} />
          </MobileOnlyDefer>
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

/**
 * BlogPostClient - Main Export Component
 * 
 * @param {BlogPost} post - Blog post data from JSON file
 * @param {BlogPost[]} relatedPosts - Related blog posts for sidebar
 * 
 * 🎯 ARCHITECTURE:
 * - BlogThemeProvider: Provides theme context (dark/light mode)
 * - .blog-post-container: CSS scoping wrapper for isolated styles
 * - BlogPostContent: Main content rendering component (700+ lines)
 * 
 * ⚠️ CRITICAL WRAPPER - DO NOT REMOVE:
 * The <div className="blog-post-container"> wrapper is ESSENTIAL for:
 * 1. CSS isolation (blog styles don't affect website)
 * 2. Scoping all styles in blog-specific.css
 * 3. Preventing side effects on homepage/other pages
 * 
 * Removing this wrapper will break blog visual design!
 * 
 * 📦 WHAT'S PRESERVED:
 * - All 700+ lines of BlogPostContent rendering logic
 * - All dynamic imports (Header, Footer, TOC, etc.)
 * - All analytics (GA4, GTM, Vercel)
 * - All SEO schemas (Article, FAQ, HowTo, etc.)
 * - All theme functionality (dark/light toggle)
 * - All interactive features (like button, TOC, etc.)
 * 
 * 🔧 MAINTENANCE:
 * - To modify blog styles: Edit ../blog-specific.css
 * - To add components: Import and use in BlogPostContent
 * - To change wrapper: Update both here and blog-specific.css
 * 
 * @returns JSX.Element - Fully rendered blog post page
 */
export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  return (
    <BlogThemeProvider>
      {/* ⚠️ CRITICAL: CSS scoping wrapper - DO NOT REMOVE */}
      <div className="blog-post-container">
        <BlogPostContent post={post} relatedPosts={relatedPosts} />
      </div>
    </BlogThemeProvider>
  );
}
