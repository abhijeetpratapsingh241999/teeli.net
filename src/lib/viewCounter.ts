/**
 * View counter using localStorage
 * Tracks page views per blog post
 */

const VIEW_STORAGE_KEY = 'blog_post_views';
const VIEW_HISTORY_KEY = 'blog_view_history';

export interface ViewData {
  [slug: string]: number;
}

export interface ViewHistory {
  [slug: string]: number; // timestamp of last view
}

export function getViewCount(slug: string): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const views = localStorage.getItem(VIEW_STORAGE_KEY);
    if (!views) return 0;
    
    const viewData: ViewData = JSON.parse(views);
    return viewData[slug] || 0;
  } catch (error) {
    console.error('Error reading view count:', error);
    return 0;
  }
}

export function incrementViewCount(slug: string): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    // Check if user already viewed this post in last 24 hours
    const history = localStorage.getItem(VIEW_HISTORY_KEY);
    const viewHistory: ViewHistory = history ? JSON.parse(history) : {};
    
    const now = Date.now();
    const lastView = viewHistory[slug] || 0;
    const hoursSinceLastView = (now - lastView) / (1000 * 60 * 60);
    
    // Only count if more than 1 hour has passed
    if (hoursSinceLastView < 1) {
      return getViewCount(slug);
    }
    
    // Get current views
    const views = localStorage.getItem(VIEW_STORAGE_KEY);
    const viewData: ViewData = views ? JSON.parse(views) : {};
    
    // Increment view count
    viewData[slug] = (viewData[slug] || 0) + 1;
    
    // Update view history
    viewHistory[slug] = now;
    
    // Save to localStorage
    localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(viewData));
    localStorage.setItem(VIEW_HISTORY_KEY, JSON.stringify(viewHistory));
    
    return viewData[slug];
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return 0;
  }
}

export function getAllViews(): ViewData {
  if (typeof window === 'undefined') return {};
  
  try {
    const views = localStorage.getItem(VIEW_STORAGE_KEY);
    return views ? JSON.parse(views) : {};
  } catch (error) {
    console.error('Error reading all views:', error);
    return {};
  }
}

export function getTotalViews(): number {
  const allViews = getAllViews();
  return Object.values(allViews).reduce((sum, count) => sum + count, 0);
}

export function getMostViewedPosts(limit: number = 10): Array<{ slug: string; views: number }> {
  const allViews = getAllViews();
  
  return Object.entries(allViews)
    .map(([slug, views]) => ({ slug, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}
