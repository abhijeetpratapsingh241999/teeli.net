import fs from 'fs';
import path from 'path';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface VideoMetadata {
  url: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: string; // ISO 8601 duration format (e.g., "PT7S" for 7 seconds)
  uploadDate?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  keywordCategory?: string; // Keyword-based folder for images (e.g., "3d-render")
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
  image?: string; // Hero image for full blog post (1200×900, 4:3 ratio for cluster blogs)
  imageAlt?: string; // SEO alt text for hero image (Google Image Search, accessibility)
  thumbnail?: string; // Social share image (1200×630, 1.91:1 ratio for OpenGraph/Twitter)
  thumbnailAlt?: string; // SEO alt text for social thumbnail (Facebook, LinkedIn, Twitter)
  heroVideo?: string;
  videoMetadata?: VideoMetadata;
  content?: string;
  faq?: FAQItem[];
}

// Recursive function to read all JSON files from nested folders
function readBlogPostsRecursive(dir: string): BlogPost[] {
  const posts: BlogPost[] = [];
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        // Recursively read subdirectories (topic folders)
        const subPosts = readBlogPostsRecursive(fullPath);
        posts.push(...subPosts);
      } else if (item.isFile() && item.name.endsWith('.json') && !item.name.includes('template')) {
        try {
          let fileContent = fs.readFileSync(fullPath, 'utf-8');
          // Remove BOM if present
          if (fileContent.length > 0 && fileContent.charCodeAt(0) === 0xFEFF) {
            fileContent = fileContent.slice(1);
          }
          fileContent = fileContent.trim();
          const post = JSON.parse(fileContent);
          // Remove content for listing pages
          const { content, ...metadata } = post;
          posts.push(metadata);
        } catch (error) {
          console.error(`Error parsing blog file ${item.name}:`, error);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return posts;
}

// Get all blog posts metadata (without full content for listing)
export function getAllBlogPosts(): BlogPost[] {
  try {
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    
    if (!fs.existsSync(blogDir)) {
      return [];
    }

    const posts = readBlogPostsRecursive(blogDir);
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Extract FAQ from markdown content and return both FAQ items and cleaned content
function extractFAQFromContent(content: string): { faqItems: FAQItem[], cleanedContent: string } {
  const faqItems: FAQItem[] = [];
  
  // Look for FAQ section in content
  const faqMatch = content.match(/##\s*FAQ[^#]*/i);
  if (!faqMatch) return { faqItems, cleanedContent: content };
  
  const faqSection = faqMatch[0];
  
  // Match Q&A patterns like "**Q1: question?**" followed by answer
  const qaPattern = /\*\*Q\d+:\s*([^*]+)\*\*\s*\n\n([^\n]+(?:\n(?!\*\*Q\d+:)[^\n]+)*)/g;
  let match;
  
  while ((match = qaPattern.exec(faqSection)) !== null) {
    faqItems.push({
      question: match[1].trim(),
      answer: match[2].trim()
    });
  }
  
  // Remove FAQ section from content
  const cleanedContent = content.replace(/##\s*FAQ[^#]*$/i, '').trim();
  
  return { faqItems, cleanedContent };
}

// Recursive function to find blog post by slug in nested folders
function findBlogPostBySlug(dir: string, slug: string): string | null {
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        // Recursively search in subdirectories
        const found = findBlogPostBySlug(fullPath, slug);
        if (found) return found;
      } else if (item.isFile() && item.name === `${slug}.json`) {
        return fullPath;
      }
    }
  } catch (error) {
    console.error(`Error searching directory ${dir}:`, error);
  }
  
  return null;
}

// Get a single blog post by slug (with full content)
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    const filePath = findBlogPostBySlug(blogDir, slug);
    
    if (!filePath || !fs.existsSync(filePath)) {
      return null;
    }

    let fileContent = fs.readFileSync(filePath, 'utf-8');
    // Remove BOM if present (check if file has content first)
    if (fileContent.length > 0 && fileContent.charCodeAt(0) === 0xFEFF) {
      fileContent = fileContent.slice(1);
    }
    // Trim whitespace that might cause issues
    fileContent = fileContent.trim();
    const post = JSON.parse(fileContent);
    
    // Extract FAQ from content if not already provided and remove FAQ section from content
    if (!post.faq && post.content) {
      const { faqItems, cleanedContent } = extractFAQFromContent(post.content);
      post.faq = faqItems;
      post.content = cleanedContent;
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
