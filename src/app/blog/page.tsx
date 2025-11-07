import { getAllBlogPosts, getAllCategories } from '@/lib/blog/blog';
import BlogClient from './BlogClient';

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const categories = ["All", ...getAllCategories()];

  return <BlogClient initialPosts={blogPosts} categories={categories} />;
}
