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

  // Use metaTitle and metaDescription if provided, otherwise fallback to title and excerpt
  const metaTitle = post.metaTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt || (post.content ? post.content.substring(0, 160) + '...' : 'Read the full article on TEELI.NET Blog');
  
  return {
    title: `${metaTitle} | TEELI.NET Blog`,
    description: metaDescription,
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
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [`https://teeli.net${post.image}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: post.image ? [`https://teeli.net${post.image}`] : [],
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

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
