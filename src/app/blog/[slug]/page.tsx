import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts, getRelatedBlogPosts } from '@/lib/blog';
import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const description = post.excerpt || post.metaDescription || (post.content ? post.content.substring(0, 160) + '...' : 'Read the full article on TEELI.NET Blog');
  
  // Use thumbnail for OG/Twitter (optimized for social media 1200x630)
  // Falls back to main image if thumbnail not available
  const socialImage = post.thumbnail || post.image;
  const socialImageUrl = socialImage ? `https://teeli.net${socialImage}` : 'https://teeli.net/logos/teeli-og-default.png';
  
  // Use thumbnailAlt or imageAlt for social image alt text (SEO critical)
  const socialImageAlt = post.thumbnailAlt || post.imageAlt || `${post.title} - TEELI.NET Blog`;
  
  // Format publish date to ISO 8601 (required for Google)
  const publishDate = new Date(post.date).toISOString();
  
  // Extract first H2 heading as additional keyword context
  const firstHeading = post.content?.match(/## (.*)/)?.[1] || '';
  
  // Generate comprehensive keywords from category, title, and content
  const categoryKeywords = post.category.toLowerCase().split(' ');
  const titleKeywords = post.title.toLowerCase().split(' ').filter(w => w.length > 3);
  const contentKeywords = firstHeading.toLowerCase().split(' ').filter(w => w.length > 3);
  
  const keywords = [
    // Core platform keywords
    'TEELI',
    'AI rendering',
    '3D visualization',
    'cloud rendering',
    'architectural visualization',
    'image to 3D',
    'digital twins',
    'AEC industry',
    // Category-specific
    ...categoryKeywords,
    // Title-derived
    ...titleKeywords.slice(0, 3),
    // Content-derived
    ...contentKeywords.slice(0, 2),
    // Post-specific
    post.keywordCategory || '3d-render',
    '2025'
  ];
  
  // Remove duplicates and filter empty strings
  const uniqueKeywords = [...new Set(keywords)].filter(k => k && k.length > 2).slice(0, 15);
  
  return {
    // Primary SEO tags
    title: post.metaTitle || `${post.title} | TEELI.NET Blog`,
    description,
    keywords: uniqueKeywords.join(', '),
    
    // Author metadata
    authors: [{ name: post.author, url: 'https://teeli.net/company/about' }],
    creator: post.author,
    publisher: 'TEELI.NET',
    
    // Robots directives (SEO critical)
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // OpenGraph (Facebook, LinkedIn, WhatsApp, Telegram)
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `https://teeli.net/blog/${slug}`,
      title: post.metaTitle || post.title,
      description,
      siteName: 'TEELI.NET',
      publishedTime: publishDate,
      modifiedTime: publishDate, // Can be updated with lastModified field later
      authors: [post.author],
      section: post.category,
      tags: uniqueKeywords,
      
      // Image metadata (critical for social sharing)
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
          type: 'image/webp',
        },
      ],
    },
    
    // Twitter Card (optimized for X/Twitter)
    twitter: {
      card: 'summary_large_image',
      site: '@teeli_net', // Add your Twitter handle
      creator: '@teeli_net',
      title: post.metaTitle || post.title,
      description,
      images: {
        url: socialImageUrl,
        alt: socialImageAlt,
      },
    },
    
    // Canonical URL (prevent duplicate content)
    alternates: {
      canonical: `https://teeli.net/blog/${slug}`,
      languages: {
        'en-US': `https://teeli.net/blog/${slug}`,
      },
    },
    
    // Additional metadata
    category: post.category,
    
    // Verification and additional tags
    other: {
      'article:published_time': publishDate,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': uniqueKeywords.join(', '),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.content) {
    notFound();
  }

  // Get related blog posts
  const relatedPosts = getRelatedBlogPosts(slug, 3);

  return (
    <>
      {/* 
        PERFORMANCE FIX #1: Optimized Hero Image Preload
        - Responsive srcset for all viewport sizes (mobile to 4K)
        - Quality 50 for AVIF format (optimal compression)
        - fetchpriority="high" for LCP optimization
        - Future-proof: Works for all blogs automatically
      */}
      {post.image && (
        <>
          {/* Primary preload with comprehensive responsive srcset */}
          <link
            rel="preload"
            as="image"
            href={post.image}
            // @ts-ignore - Next.js supports these attributes
            imagesrcset={`${post.image}?w=640&q=50 640w, ${post.image}?w=828&q=50 828w, ${post.image}?w=1080&q=50 1080w, ${post.image}?w=1200&q=50 1200w, ${post.image}?w=1920&q=50 1920w`}
            imagesizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, (max-width: 1280px) 1200px, 1200px"
            // @ts-ignore
            fetchpriority="high"
          />
          {/* AVIF format hint for modern browsers (30% smaller than WebP) */}
          <link
            rel="preload"
            as="image"
            type="image/avif"
            href={post.image}
            // @ts-ignore
            fetchpriority="high"
          />
        </>
      )}
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
