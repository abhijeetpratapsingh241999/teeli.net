"use client";

import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import BlogLayout from '@/components/blog/layout/BlogLayout';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog/blog';
import { getThemeConfig, BLOG_SPACING, BLOG_TYPOGRAPHY, BLOG_RADIUS } from '@/lib/blog/theme-config';
import { parseMarkdownContent } from '@/lib/blog/content-parser';
import FAQAccordion from '@/components/FAQAccordion';
import BlogAuthor from '@/components/blog/ui/BlogAuthor';
import BlogCTA from '@/components/blog/ui/BlogCTA';
import BlogLink from '@/components/blog/ui/BlogLink';
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

  // Parse markdown content using the reusable content parser
  const contentElements = parseMarkdownContent(post.content || '', {
    theme,
    enableTables: true,
    enableImages: true,
    enableVideos: true,
    enableHighlights: true,
    enableLinks: true,
    enableCodeBlocks: true,
    enableBlockquotes: true,
    priorityFirstImage: true
  });

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
            
            {/* Author Info using BlogAuthor component */}
            <BlogAuthor 
              author={post.author}
              authorRole={post.authorRole}
              date={post.date}
              readTime={post.readTime}
              theme={theme}
              showTeamBadge={true}
            />
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
          {contentElements}
        </div>

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <div className={BLOG_SPACING.section}>
            <FAQAccordion items={faqItems} theme={theme} />
          </div>
        )}

        {/* CTA Section using BlogCTA component */}
        <BlogCTA
          title="Ready to Transform Your Workflow?"
          description="Discover how TEELI's AI-powered cloud rendering can accelerate your projects by 10x"
          primaryButton={{ text: 'Start Free Trial', href: '/signup' }}
          secondaryButton={{ text: 'Explore Solutions', href: '/solutions/cloud-gpu' }}
          theme={theme}
        />
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
