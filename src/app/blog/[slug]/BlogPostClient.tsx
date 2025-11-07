"use client";

import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import BlogLayout from '@/components/blog/layout/BlogLayout';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { BlogPost } from '@/lib/blog/blog';
import { getThemeConfig, BLOG_SPACING, BLOG_TYPOGRAPHY, BLOG_RADIUS } from '@/lib/blog/theme-config';
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
  const themeConfig = getThemeConfig(theme);
  
  // Get FAQ items for this blog post
  const faqItems = FAQ_MAP[post.slug] || [];

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
        
        // Debug log removed for production
        
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
          
          elements.push(
            <div key={key++} className={BLOG_SPACING.largeSection}>
              <div className={`${BLOG_RADIUS.medium} overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${themeConfig.table.card}`}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className={themeConfig.table.header}>
                        {tableHeaders.map((header, idx) => (
                          <th key={idx} className={`p-5 sm:p-6 text-left font-semibold text-sm sm:text-base lg:text-lg border-b-2 ${themeConfig.table.headerText}`}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={themeConfig.table.body}>
                      {dataRows.map((row, rowIdx) => {
                        const cells = row.split('|').map(c => c.trim()).filter(c => c);
                        const isLastRow = rowIdx === dataRows.length - 1;
                        const rowBorderClass = !isLastRow ? themeConfig.table.rowBorder : '';
                        return (
                          <tr key={rowIdx} className={`${themeConfig.table.row} ${themeConfig.table.rowHover} ${rowBorderClass}`}>
                            {cells.map((cell, cellIdx) => (
                              <td key={cellIdx} className={`p-5 sm:p-6 text-sm sm:text-base font-medium ${themeConfig.table.cellText}`}>
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
              <p className={`leading-relaxed ${BLOG_TYPOGRAPHY.body} ${themeConfig.text.primary}`}>
                {renderInlineMarkdown(trimmedLine)}
              </p>
            </HighlightBox>
          );
        } else {
          elements.push(
            <p key={key++} className={`${BLOG_SPACING.paragraph} leading-relaxed ${BLOG_TYPOGRAPHY.body} ${themeConfig.text.primary}`}>
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
      
      elements.push(
        <div key={key++} className={BLOG_SPACING.largeSection}>
          <div className={`${BLOG_RADIUS.medium} overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${themeConfig.table.card}`}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={themeConfig.table.header}>
                    {tableHeaders.map((header, idx) => (
                      <th key={idx} className={`p-5 sm:p-6 text-left font-semibold text-sm sm:text-base lg:text-lg border-b-2 ${themeConfig.table.headerText}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={themeConfig.table.body}>
                  {dataRows.map((row, rowIdx) => {
                    const cells = row.split('|').map(c => c.trim()).filter(c => c);
                    const isLastRow = rowIdx === dataRows.length - 1;
                    const rowBorderClass = !isLastRow ? themeConfig.table.rowBorder : '';
                    return (
                      <tr key={rowIdx} className={`${themeConfig.table.row} ${themeConfig.table.rowHover} ${rowBorderClass}`}>
                        {cells.map((cell, cellIdx) => (
                          <td key={cellIdx} className={`p-5 sm:p-6 text-sm sm:text-base font-semibold tracking-tight leading-snug ${themeConfig.table.cellText}`}>
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

      <BlogLayout theme={theme}>
        {/* Theme Toggle Button */}
        <div className="fixed bottom-4 sm:bottom-8 right-2 sm:right-4 md:right-8 z-40">
          <BlogThemeToggle />
        </div>

        {/* Premium Glass Card Header */}
        <div className={`relative ${BLOG_RADIUS.large} border-2 p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-xl ${BLOG_SPACING.section} overflow-hidden ${
          theme === 'dark'
            ? 'border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/40 to-black/60'
            : 'border-cyan-500/50 bg-white shadow-lg'
        }`}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            <div className={`${BLOG_TYPOGRAPHY.tiny} font-semibold ${BLOG_SPACING.paragraph} ${themeConfig.text.accent}`}>
              {post.category}
            </div>
            <h1 className={`font-heading ${BLOG_TYPOGRAPHY.h1} font-bold ${BLOG_SPACING.paragraph} leading-tight ${themeConfig.text.heading}`}>
              {post.title}
            </h1>
            <p className={`${BLOG_TYPOGRAPHY.small} md:text-lg ${BLOG_SPACING.heading} leading-relaxed ${themeConfig.text.secondary}`}>
              {post.excerpt}
            </p>
            <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap ${BLOG_TYPOGRAPHY.tiny}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className={`${BLOG_TYPOGRAPHY.tiny} font-semibold ${themeConfig.text.heading}`}>
                      {post.author}
                    </div>
                    {post.author.includes('TEELI') && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md">
                        ✓ TEAM
                      </span>
                    )}
                  </div>
                  {post.authorRole && (
                    <div className={`text-xs ${themeConfig.text.muted}`}>
                      {post.authorRole}
                    </div>
                  )}
                </div>
              </div>
              <span className={themeConfig.text.muted}>•</span>
              <div className={`flex items-center gap-1.5 ${BLOG_TYPOGRAPHY.tiny} ${themeConfig.text.secondary}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{post.date}</span>
              </div>
              <span className={themeConfig.text.muted}>•</span>
              <div className={`flex items-center gap-1.5 ${BLOG_TYPOGRAPHY.tiny} ${themeConfig.text.secondary}`}>
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
          <div className={`${BLOG_SPACING.section} overflow-hidden max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px]`}>
            {post.image.endsWith('.svg') ? (
              <div className="relative w-full h-full">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  width={1200}
                  height={675}
                  priority
                  fetchPriority="high"
                  className={`w-full h-full object-cover ${BLOG_RADIUS.medium} ${themeConfig.border.primary} border-2 shadow-2xl`}
                />
              </div>
            ) : (
              <Image 
                src={post.image} 
                alt={post.title}
                width={800}
                height={450}
                quality={30}
                priority
                loading="eager"
                sizes="(max-width: 640px) 75vw, (max-width: 1024px) 65vw, 850px"
                className={`w-full h-full object-cover ${BLOG_RADIUS.medium} ${themeConfig.border.primary} border-2 shadow-2xl`}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                fetchPriority="high"
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
          <div className={BLOG_SPACING.section}>
            <FAQAccordion items={faqItems} theme={theme} />
          </div>
        )}

        {/* CTA Section */}
        <div className={`mt-8 sm:mt-12 md:mt-16 pt-8 sm:pt-10 md:pt-12 border-t ${themeConfig.border.secondary}`}>
          <div className="text-center">
            <h2 className={`font-heading ${BLOG_TYPOGRAPHY.h2} font-bold ${BLOG_SPACING.heading} ${themeConfig.text.heading}`}>
              Ready to Transform Your Workflow?
            </h2>
            <p className={`${BLOG_TYPOGRAPHY.small} md:text-lg ${BLOG_SPACING.section} ${themeConfig.text.secondary}`}>
              Discover how TEELI can accelerate your projects
            </p>
            <Link href="/">
              <button className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 font-bold text-white text-sm sm:text-base hover:from-cyan-700 hover:to-purple-700 transition-all shadow-lg shadow-cyan-500/30">
                Explore TEELI →
              </button>
            </Link>
          </div>
        </div>
        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </BlogLayout>
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
