"use client";

import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog';
import { motion, AnimatePresence } from 'framer-motion';
import FAQAccordion from '@/components/FAQAccordion';
import HighlightBox from '@/components/blog/HighlightBox';
import { BlogH1, BlogH2, BlogH3, BlogListItem } from '@/components/blog/BlogHeadings';
import { OptimizedBlogImage, OptimizedBlogVideo } from '@/components/blog/OptimizedMedia';
import * as FAQ from '@/data/faq';
import { ArticleSchema } from '@/components/schema/generateArticleSchema';
import { FAQSchema } from '@/components/schema/generateFAQSchema';
import { BreadcrumbSchema } from '@/components/schema/generateBreadcrumbSchema';
import dynamic from 'next/dynamic';

// Lazy load heavy components for better performance
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });
const RelatedPosts = dynamic(() => import('./RelatedPosts'), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-800/30 rounded-2xl h-64 my-8"></div>
  )
});

// FAQ Mapping: Blog slug to FAQ data
const FAQ_MAP: Record<string, FAQ.FAQItem[]> = {
  '3d-rendering-house-process-benefits-costs-future-trends-2025': FAQ.faq_house_rendering,
  'cloud-gpu-complete-guide-2025': FAQ.faq_cloud_gpu,
  'cloud-computing-complete-guide-2025': FAQ.faq_cloud_computing,
  '3d-visualisation-complete-guide-2025': FAQ.faq_3d_visualization,
  'ai-rendering-trends': FAQ.faq_ai_rendering,
  'image-to-3d-platforms-rise': FAQ.faq_image_to_3d,
  'ai-digital-twins-aec-transformation': FAQ.faq_digital_twins,
  'green-render-revolution-sustainable': FAQ.faq_sustainable_rendering,
  'generative-ai-architectural-design': FAQ.faq_generative_ai_architecture,
  'instant-3d-nerf-revolution': FAQ.faq_nerf_instant_3d,
  'quantum-design-2028': FAQ.faq_quantum_design,
};

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function BlogPostContent({ post, relatedPosts }: BlogPostClientProps) {
  const { theme } = useBlogTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Get FAQ items for this blog post
  const faqItems = FAQ_MAP[post.slug] || [];

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

  // Extract intro sections from content
  const extractIntroSections = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    
    // Extract H1 from content (first line with #)
    let h1Title = '';
    let contentStart = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('# ')) {
        h1Title = line.substring(2).trim();
        contentStart = i + 1;
        break;
      }
    }
    
    // Find first paragraph (intro sentence)
    let introSentence = '';
    let valueSummary = '';
    let supportingContext = '';
    const remainingContent: string[] = [];
    
    let paragraphCount = 0;
    
    for (let i = contentStart; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines and headings
      if (!line || line.startsWith('#') || line.startsWith('![') || line.startsWith('*') || line.startsWith('---')) {
        if (paragraphCount >= 3) {
          remainingContent.push(lines[i]);
        }
        continue;
      }
      
      if (paragraphCount === 0) {
        introSentence = line;
        paragraphCount++;
      } else if (paragraphCount === 1) {
        valueSummary = line;
        paragraphCount++;
      } else if (paragraphCount === 2) {
        supportingContext = line;
        paragraphCount++;
      } else {
        remainingContent.push(lines[i]);
      }
    }
    
    return {
      h1Title,
      introSentence,
      valueSummary,
      supportingContext,
      remainingContent: remainingContent.join('\n')
    };
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: ReactNode[] = [];
    let key = 0;
    let inTable = false;
    let tableRows: string[] = [];
    let inScript = false;
    let scriptContent: string[] = [];
    let foundH1 = false;
    let isFirstParagraphAfterH1 = false;
    let isFirstImage = true; // Track first image for priority loading

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
            <OptimizedBlogVideo 
              key={key++}
              src={src}
              className="my-6 sm:my-8"
            />
          );
        } else {
          elements.push(
            <OptimizedBlogImage 
              key={key++}
              src={src}
              alt={alt}
              className="my-6 sm:my-8"
              priority={isFirstImage} // First image gets priority
            />
          );
          isFirstImage = false; // Only first image gets priority
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
          const cardClasses = theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-cyan-500/30 shadow-xl shadow-cyan-500/20'
            : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl';
          const headerClasses = theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-900/50 to-purple-900/50'
            : 'bg-gradient-to-r from-blue-50 to-indigo-50';
          const headerTextClasses = theme === 'dark'
            ? 'text-cyan-300 border-cyan-500/50'
            : 'text-blue-900 border-blue-400';
          const bodyClasses = theme === 'dark' ? 'bg-gray-900/30' : 'bg-white';
          const hoverClasses = theme === 'dark' ? 'hover:bg-cyan-900/20' : 'hover:bg-blue-50/60';
          const borderClasses = theme === 'dark' ? 'border-b border-white/10' : 'border-b border-gray-200/70';
          const cellTextClasses = theme === 'dark' ? 'text-zinc-200' : 'text-gray-700';
          
          elements.push(
            <div key={key++} className="my-8 sm:my-10 md:my-12">
              <div className={`rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${cardClasses}`}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className={headerClasses}>
                        {tableHeaders.map((header, idx) => (
                          <th key={idx} className={`p-5 sm:p-6 text-left font-semibold text-sm sm:text-base lg:text-lg border-b-2 ${headerTextClasses}`}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={bodyClasses}>
                      {dataRows.map((row, rowIdx) => {
                        const cells = row.split('|').map(c => c.trim()).filter(c => c);
                        const isLastRow = rowIdx === dataRows.length - 1;
                        const rowBorderClass = !isLastRow ? borderClasses : '';
                        return (
                          <tr key={rowIdx} className={`transition-all duration-200 ${hoverClasses} ${rowBorderClass}`}>
                            {cells.map((cell, cellIdx) => (
                              <td key={cellIdx} className={`p-5 sm:p-6 text-sm sm:text-base font-medium ${cellTextClasses}`}>
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
            </div>
          );
        }
        inTable = false;
        tableRows = [];
      }

      if (trimmedLine.startsWith('# ')) {
        foundH1 = true;
        elements.push(
          <BlogH1 key={key++} theme={theme}>
            {renderInlineMarkdown(trimmedLine.slice(2))}
          </BlogH1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        elements.push(
          <BlogH2 key={key++} theme={theme}>
            {renderInlineMarkdown(trimmedLine.slice(3))}
          </BlogH2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        elements.push(
          <BlogH3 key={key++} theme={theme}>
            {renderInlineMarkdown(trimmedLine.slice(4))}
          </BlogH3>
        );
      } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        elements.push(
          <BlogListItem key={key++} theme={theme} type="bullet">
            {renderInlineMarkdown(trimmedLine.slice(2))}
          </BlogListItem>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        // Numbered list
        const match = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
        if (match) {
          const number = match[1];
          const content = match[2];
          elements.push(
            <BlogListItem key={key++} theme={theme} type="number" number={number}>
              {renderInlineMarkdown(content)}
            </BlogListItem>
          );
        }
      } else if (trimmedLine.match(/^\[\d+\]/)) {
        elements.push(
          <p key={key++} className={`mb-3 sm:mb-4 md:mb-5 leading-relaxed text-base sm:text-lg md:text-xl ${
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
          <p key={key++} className={`mb-3 sm:mb-4 md:mb-5 leading-relaxed text-base sm:text-lg md:text-xl ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
          }`}>
            <a href={trimmedLine.match(/\(([^)]+)\)/)?.[1]} target="_blank" rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 underline break-all">
              {trimmedLine}
            </a>
          </p>
        );
      } else if (trimmedLine.startsWith('## FAQ')) {
        // Skip FAQ section header - will be rendered by FAQAccordion component
        return;
      } else if (trimmedLine.match(/^\*\*[^*]+\?\*\*$/) || trimmedLine.startsWith('---')) {
        // Skip FAQ questions and separators - handled by component
        return;
      } else {
        // Check if this is the first paragraph after H1
        if (foundH1 && !isFirstParagraphAfterH1 && trimmedLine.length > 0) {
          isFirstParagraphAfterH1 = true;
          elements.push(
            <HighlightBox key={key++} theme={theme} variant="gradient">
              <p className={`leading-relaxed text-base sm:text-lg md:text-xl ${
                theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
              }`}>
                {renderInlineMarkdown(trimmedLine)}
              </p>
            </HighlightBox>
          );
        } else {
          elements.push(
            <p key={key++} className={`mb-3 sm:mb-4 md:mb-5 leading-relaxed text-base sm:text-lg md:text-xl ${
              theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
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

    // Handle any remaining table
    if (inTable && tableRows.length > 0) {
      const tableHeaders = tableRows[0].split('|').map(h => h.trim()).filter(h => h);
      const dataRows = tableRows.slice(2);
      const cardClasses = theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-cyan-500/30 shadow-xl shadow-cyan-500/20'
        : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl';
      const headerClasses = theme === 'dark'
        ? 'bg-gradient-to-r from-cyan-900/50 to-purple-900/50'
        : 'bg-gradient-to-r from-blue-50 to-indigo-50';
      const headerTextClasses = theme === 'dark'
        ? 'text-cyan-300 border-cyan-500/50'
        : 'text-blue-900 border-blue-400';
      const bodyClasses = theme === 'dark' ? 'bg-gray-900/30' : 'bg-white';
      const hoverClasses = theme === 'dark' ? 'hover:bg-cyan-900/20' : 'hover:bg-blue-50/60';
      const borderClasses = theme === 'dark' ? 'border-b border-white/10' : 'border-b border-gray-200/70';
      const cellTextClasses = theme === 'dark' ? 'text-zinc-200' : 'text-gray-700';
      
      elements.push(
        <div key={key++} className="my-8 sm:my-10 md:my-12">
          <div className={`rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${cardClasses}`}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={headerClasses}>
                    {tableHeaders.map((header, idx) => (
                      <th key={idx} className={`p-5 sm:p-6 text-left font-semibold text-sm sm:text-base lg:text-lg border-b-2 ${headerTextClasses}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={bodyClasses}>
                  {dataRows.map((row, rowIdx) => {
                    const cells = row.split('|').map(c => c.trim()).filter(c => c);
                    const isLastRow = rowIdx === dataRows.length - 1;
                    const rowBorderClass = !isLastRow ? borderClasses : '';
                    return (
                      <tr key={rowIdx} className={`transition-all duration-200 ${hoverClasses} ${rowBorderClass}`}>
                        {cells.map((cell, cellIdx) => (
                          <td key={cellIdx} className={`p-5 sm:p-6 text-sm sm:text-base font-semibold tracking-tight leading-snug ${cellTextClasses}`}>
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

        {/* SEO: Article Schema (JSON-LD) */}
        <ArticleSchema 
          title={post.title}
          description={post.excerpt || post.content?.substring(0, 160) || ''}
          url={`https://teeli.net/blog/${post.slug}`}
          image={post.image ? `https://teeli.net${post.image}` : undefined}
          author={post.author}
          publishedTime={post.date}
          category={post.category}
          keywords={[post.category, 'AI rendering', '3D visualization', 'TEELI']}
        />
        
        {/* SEO: FAQ Schema (JSON-LD) - Only if FAQs exist */}
        {faqItems.length > 0 && <FAQSchema faqs={faqItems} />}
        
        {/* SEO: Breadcrumb Schema (JSON-LD) */}
        <BreadcrumbSchema 
          items={[
            { name: 'Home', url: 'https://teeli.net' },
            { name: 'Blog', url: 'https://teeli.net/blog' },
            { name: post.title, url: `https://teeli.net/blog/${post.slug}` }
          ]}
        />

        <article className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 pt-32 pb-16 sm:pb-24 md:pb-32">
          {/* Premium Glass Card Header */}
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
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    {/* Premium TEELI Team Badge */}
                    <div className="flex items-center gap-1.5">
                      <div className={`text-xs sm:text-sm font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{post.author}</div>
                      {post.author.includes('TEELI') && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md">
                          ✓ TEAM
                        </span>
                      )}
                    </div>
                    {post.authorRole && (
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}>{post.authorRole}</div>
                    )}
                  </div>
                </div>
                <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}>•</span>
                {/* Date with Calendar Icon */}
                <div className={`flex items-center gap-1.5 text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{post.date}</span>
                </div>
                <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}>•</span>
                {/* Read Time with Clock Icon */}
                <div className={`flex items-center gap-1.5 text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8 sm:mb-12 overflow-hidden max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px]">
              {post.image.endsWith('.svg') ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    width={1200}
                    height={675}
                    priority
                    className="w-full h-full object-cover rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl"
                  />
                </div>
              ) : (
                <Image 
                  src={post.image} 
                  alt={post.title}
                  width={1200}
                  height={675}
                  quality={90}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl"
                />
              )}
            </div>
          )}

          {/* Blog Content */}
          <div className="max-w-none">
            {renderContent(post.content!)}
          </div>

          {/* FAQ Section */}
          {faqItems.length > 0 && (
            <div className="my-8 sm:my-12">
              <FAQAccordion items={faqItems} theme={theme} />
            </div>
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
