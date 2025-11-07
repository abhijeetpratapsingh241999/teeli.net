"use client";

import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogMeta from '@/components/blog/BlogMeta';
import RelatedPosts from '@/components/blog/RelatedPosts';
import TableOfContents from '@/components/ui/TableOfContents';
import Accordion from '@/components/ui/Accordion';
import { FAQSchema } from '@/components/schema/generateFAQSchema';
import { ArticleSchema } from '@/components/schema/generateArticleSchema';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog/blog';
import * as FAQ from '@/data/faq';

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

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: ReactNode[] = [];
    let key = 0;
    let isFirstH1 = true;
    let inTable = false;
    let tableRows: string[] = [];
    let inScript = false;
    let scriptContent: string[] = [];

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

      // Handle markdown images using Next/Image
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
            <div key={key++} className="my-6 sm:my-8 relative h-auto">
              <Image 
                src={`/blog/${src}`}
                alt={alt || 'Blog image'}
                width={1200}
                height={675}
                className="w-full h-auto rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
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
        // End of table, render it
        if (tableRows.length > 0) {
          const tableHeaders = tableRows[0].split('|').map(h => h.trim()).filter(h => h);
          const dataRows = tableRows.slice(2);
          
          elements.push(
            <div key={key++} className="my-6 sm:my-8 overflow-x-auto">
              <div className="glass-card overflow-hidden">
                <table className={`w-full border-collapse text-sm sm:text-base ${
                  theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
                }`}>
                  <thead>
                    <tr className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b-2 border-cyan-500/50">
                      {tableHeaders.map((header, idx) => (
                        <th key={idx} className="p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-cyan-300">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, rowIdx) => {
                      const cells = row.split('|').map(c => c.trim()).filter(c => c);
                      return (
                        <tr key={rowIdx} className="transition-colors hover:bg-cyan-900/20 border-b border-white/10">
                          {cells.map((cell, cellIdx) => (
                            <td key={cellIdx} className="p-4 sm:p-5 text-zinc-300">
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
          const heading = renderInlineMarkdown(trimmedLine.slice(2));
          const headingId = trimmedLine.slice(2).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          elements.push(
            <h1 key={key++} id={headingId} className="prose-custom font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6 mt-8">
              {heading}
            </h1>
          );
        }
      } else if (trimmedLine.startsWith('## ')) {
        const heading = renderInlineMarkdown(trimmedLine.slice(3));
        const headingId = trimmedLine.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        elements.push(
          <h2 key={key++} id={headingId} className="prose-custom text-3xl sm:text-4xl font-bold mb-4 mt-12 text-cyan-300">
            {heading}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        const heading = renderInlineMarkdown(trimmedLine.slice(4));
        const headingId = trimmedLine.slice(4).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        elements.push(
          <h3 key={key++} id={headingId} className="prose-custom text-2xl sm:text-3xl font-bold mb-3 mt-8 text-purple-300">
            {heading}
          </h3>
        );
      } else if (trimmedLine.startsWith('## FAQ')) {
        // Skip FAQ section header - will be rendered by Accordion component
        return;
      } else if (trimmedLine.match(/^\*\*[^*]+\?\*\*$/) || trimmedLine.startsWith('---')) {
        // Skip FAQ questions and separators - handled by component
        return;
      } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        elements.push(
          <li key={key++} className="prose-custom ml-4 sm:ml-6 mb-2 list-disc">
            {renderInlineMarkdown(trimmedLine.slice(2))}
          </li>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        const match = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
        if (match) {
          elements.push(
            <li key={key++} className="prose-custom ml-4 sm:ml-6 mb-2 list-decimal">
              {renderInlineMarkdown(match[2])}
            </li>
          );
        }
      } else {
        elements.push(
          <p key={key++} className="prose-custom text-base sm:text-lg leading-relaxed mb-6 text-zinc-200">
            {renderInlineMarkdown(trimmedLine)}
          </p>
        );
      }
    };

    const renderInlineMarkdown = (text: string) => {
      const parts: ReactNode[] = [];
      let key = 0;
      const boldRegex = /\*\*([^*]+)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(<strong key={key++} className="font-bold text-white">{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }

      return parts.length > 0 ? parts : text;
    };

    for (let i = 0; i < lines.length; i++) {
      processLine(lines[i]);
    }

    // Handle any remaining table
    if (inTable && tableRows.length > 0) {
      const tableHeaders = tableRows[0].split('|').map(h => h.trim()).filter(h => h);
      const dataRows = tableRows.slice(2);
      
      elements.push(
        <div key={key++} className="my-6 sm:my-8 overflow-x-auto">
          <div className="glass-card overflow-hidden">
            <table className="w-full border-collapse text-sm sm:text-base text-zinc-200">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b-2 border-cyan-500/50">
                  {tableHeaders.map((header, idx) => (
                    <th key={idx} className="p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-cyan-300">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rowIdx) => {
                  const cells = row.split('|').map(c => c.trim()).filter(c => c);
                  return (
                    <tr key={rowIdx} className="transition-colors hover:bg-cyan-900/20 border-b border-white/10">
                      {cells.map((cell, cellIdx) => (
                        <td key={cellIdx} className="p-4 sm:p-5 text-zinc-300">
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

  return (
    <>
      {/* JSON-LD Schemas for SEO */}
      <ArticleSchema
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        url={`https://teeli.net/blog/${post.slug}`}
        image={post.image ? `https://teeli.net${post.image}` : undefined}
        author={post.author}
        publishedTime={post.date}
        category={post.category}
      />
      
      {faqItems.length > 0 && <FAQSchema faqs={faqItems} />}

      {/* Header */}
      <Header />

      {/* Blog Theme Toggle */}
      <div className={`fixed ${isScrolled ? 'top-4' : 'top-24'} right-4 z-40 transition-all duration-300`}>
        <BlogThemeToggle />
      </div>

      {/* Main Content */}
      <main className={`min-h-screen pt-32 pb-16 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Column */}
            <article className="lg:col-span-8">
              {/* Blog Header */}
              <div className="mb-8">
                {/* Category Badge */}
                {post.category && (
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-medium glass-card text-cyan-300 border border-cyan-500/30 mb-4">
                    {post.category}
                  </span>
                )}

                {/* Title */}
                <h1 className={`font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
                  theme === 'dark' 
                    ? 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500' 
                    : 'text-gray-900'
                }`}>
                  {post.title}
                </h1>

                {/* Meta Information */}
                <BlogMeta
                  date={post.date}
                  readTime={post.readTime}
                  author={post.author}
                  authorRole={post.authorRole}
                  className="mb-6"
                />

                {/* Excerpt */}
                {post.excerpt && (
                  <p className={`text-lg sm:text-xl leading-relaxed ${
                    theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="mb-8 sm:mb-12 overflow-hidden max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px] rounded-xl sm:rounded-2xl">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    width={1200}
                    height={675}
                    priority
                    className="w-full h-full object-cover border-2 border-cyan-500/30 shadow-2xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              )}

              {/* Blog Content with Prose Styling */}
              <div className="prose-custom">
                {renderContent(post.content!)}
              </div>

              {/* FAQ Section */}
              {faqItems.length > 0 && (
                <div className="my-12">
                  <Accordion 
                    items={faqItems} 
                    title="Frequently Asked Questions"
                  />
                </div>
              )}

              {/* CTA Section */}
              <div className={`mt-12 md:mt-16 pt-10 md:pt-12 border-t ${
                theme === 'dark' ? 'border-white/20' : 'border-gray-300'
              }`}>
                <div className="text-center glass-card p-8 md:p-12">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
                    Ready to Transform Your Workflow?
                  </h2>
                  <p className="text-base sm:text-lg mb-6 text-zinc-300">
                    Discover how TEELI can accelerate your projects
                  </p>
                  <Link href="/">
                    <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 font-bold text-white hover:from-cyan-700 hover:to-purple-700 transition-all shadow-lg shadow-cyan-500/30">
                      Explore TEELI →
                    </button>
                  </Link>
                </div>
              </div>

              {/* Related Articles */}
              <RelatedPosts posts={relatedPosts} />
            </article>

            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-32">
                <TableOfContents content={post.content || ''} />
              </div>
            </aside>
          </div>
        </div>
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
