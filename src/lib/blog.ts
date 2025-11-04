import fs from 'fs';
import path from 'path';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  authorRole?: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
  image?: string;
  content?: string;
}

// Get all blog posts metadata (without full content for listing)
export function getAllBlogPosts(): BlogPost[] {
  try {
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    
    if (!fs.existsSync(blogDir)) {
      return [];
    }

    const files = fs.readdirSync(blogDir);
    const posts: BlogPost[] = [];

    files.forEach((file) => {
      if (file.endsWith('.json') && !file.includes('template')) {
        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const post = JSON.parse(fileContent);
        // Remove content for listing pages
        const { content, ...metadata } = post;
        posts.push(metadata);
      }
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Get a single blog post by slug (with full content)
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

// Get blog posts by category
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

// Get featured blog posts
export function getFeaturedBlogPosts(): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.featured);
}

// Get all unique categories
export function getAllCategories(): string[] {
  const allPosts = getAllBlogPosts();
  const categories = new Set(allPosts.map(post => post.category));
  return Array.from(categories).sort();
}

// Get related blog posts (by category)
export function getRelatedBlogPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) {
    return allPosts.slice(0, limit);
  }

  // Get posts from same category, excluding current post
  const relatedPosts = allPosts.filter(
    post => post.category === currentPost.category && post.slug !== currentSlug
  );
  
  // If not enough related posts, fill with latest posts
  if (relatedPosts.length < limit) {
    const remaining = limit - relatedPosts.length;
    const latestPosts = allPosts
      .filter(post => post.slug !== currentSlug && !relatedPosts.includes(post))
      .slice(0, remaining);
    return [...relatedPosts, ...latestPosts].slice(0, limit);
  }
  
  return relatedPosts.slice(0, limit);
}

// Get latest blog posts
export function getLatestBlogPosts(limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.slice(0, limit);
}

