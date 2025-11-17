import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';
import { generateBlogRSS } from '@/lib/rss';

export async function GET() {
  try {
    const posts = getAllBlogPosts();
    
    // Convert posts to RSS format
    const rssPosts = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.metaDescription || post.excerpt,
      date: post.date,
      tags: post.category ? [post.category] : []
    }));

    const rss = generateBlogRSS(rssPosts, {
      baseUrl: 'https://teeli.net',
      title: 'Teeli Blog - 3D Rendering, AI & Cloud Technology',
      description: 'Latest insights on 3D rendering, AI integration, cloud GPU, and architectural visualization.',
      author: 'team@teeli.net (Teeli Team)'
    });

    return new NextResponse(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
