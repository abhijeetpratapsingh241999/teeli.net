import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts, getRelatedBlogPosts } from '@/lib/blog';
import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import Script from 'next/script';

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

  const description = post.excerpt || (post.content ? post.content.substring(0, 160) + '...' : 'Read the full article on TEELI.NET Blog');
  
  // Use thumbnail for OG/Twitter (optimized for social media)
  // Falls back to main image if thumbnail not available
  const ogImage = post.thumbnail || post.image;
  
  return {
    title: `${post.title} | TEELI.NET Blog`,
    description,
    keywords: [
      'AI rendering',
      '3D visualization',
      'cloud rendering',
      'architectural visualization',
      'image to 3D',
      'digital twins',
      'AEC industry',
      'TEELI',
      post.category.toLowerCase(),
    ].join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: ogImage ? [`https://teeli.net${ogImage}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: ogImage ? [`https://teeli.net${ogImage}`] : [],
    },
    alternates: {
      canonical: `https://teeli.net/blog/${slug}`,
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
      {/* Performance: Preload hero image for instant LCP */}
      {post.image && (
        <link
          rel="preload"
          as="image"
          href={post.image}
          fetchPriority="high"
          // @ts-ignore - imageSrcSet is valid but not in types
          imageSrcSet={`${post.image}?w=640 640w, ${post.image}?w=1080 1080w, ${post.image}?w=1200 1200w`}
          imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 750px"
        />
      )}
      
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
