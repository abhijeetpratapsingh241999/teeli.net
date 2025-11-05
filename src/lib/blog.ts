import fs from 'fs';
import path from 'path';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
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
        try {
          const filePath = path.join(blogDir, file);
          let fileContent = fs.readFileSync(filePath, 'utf-8');
          
          // Remove BOM if present (check if file has content first)
          if (fileContent.length > 0 && fileContent.charCodeAt(0) === 0xFEFF) {
            fileContent = fileContent.slice(1);
          }
          
          // Trim whitespace that might cause issues
          fileContent = fileContent.trim();
          
          // Check if file is empty after trimming
          if (!fileContent) {
            console.warn(`Warning: Blog file ${file} is empty, skipping...`);
            return;
          }
          
          // Try to parse JSON
          const post = JSON.parse(fileContent);
          
          // Validate that post has required fields
          if (!post.slug || !post.title) {
            console.warn(`Warning: Blog file ${file} is missing required fields (slug or title), skipping...`);
            return;
          }
          
          // Remove content for listing pages
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { content, ...metadata } = post;
          posts.push(metadata);
        } catch (error) {
          console.error(`Error parsing blog file ${file}:`, error);
          // Skip this file and continue with others
        }
      }
    });

    // Sort by date (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Debug logging
    console.log('📊 Total blogs loaded:', sortedPosts.length);
    sortedPosts.slice(0, 3).forEach((post, i) => {
      console.log(`${i + 1}. ${post.title.substring(0, 50)}... - ${post.date} - Featured: ${post.featured}`);
    });
    
    return sortedPosts;
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

    let fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Remove BOM if present (check if file has content first)
    if (fileContent.length > 0 && fileContent.charCodeAt(0) === 0xFEFF) {
      fileContent = fileContent.slice(1);
    }
    
    // Trim whitespace that might cause issues
    fileContent = fileContent.trim();
    
    // Check if file is empty after trimming
    if (!fileContent) {
      console.error(`Error: Blog file ${slug}.json is empty`);
      return null;
    }
    
    const post = JSON.parse(fileContent);
    
    // Validate required fields
    if (!post.slug || !post.title) {
      console.error(`Error: Blog file ${slug}.json is missing required fields`);
      return null;
    }
    
    return post;
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
