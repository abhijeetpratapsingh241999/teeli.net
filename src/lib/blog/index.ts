/**
 * Blog Utilities - Central Export
 * Re-exports all blog-related utilities, types, and configurations
 */

// Data fetching functions
export {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getAllCategories,
  type BlogPost,
} from './blog';

// Theme configuration
export {
  getThemeConfig,
  themeClass,
  BLOG_THEME_CONFIG,
  BLOG_SPACING,
  BLOG_TYPOGRAPHY,
  BLOG_TRANSITIONS,
  BLOG_RADIUS,
  BLOG_Z_INDEX,
  type BlogTheme,
  type ThemeConfig,
} from './theme-config';
