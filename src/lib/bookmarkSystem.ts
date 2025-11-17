/**
 * Bookmark system using localStorage
 * Allows users to save/bookmark blog posts
 */

const BOOKMARKS_KEY = 'blog_bookmarks';

export interface Bookmark {
  slug: string;
  title: string;
  timestamp: number;
}

export function getBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error reading bookmarks:', error);
    return [];
  }
}

export function isBookmarked(slug: string): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.some(bookmark => bookmark.slug === slug);
}

export function addBookmark(slug: string, title: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const bookmarks = getBookmarks();
    
    // Check if already bookmarked
    if (bookmarks.some(bookmark => bookmark.slug === slug)) {
      return false;
    }
    
    // Add new bookmark
    const newBookmark: Bookmark = {
      slug,
      title,
      timestamp: Date.now()
    };
    
    bookmarks.unshift(newBookmark); // Add to beginning
    
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return true;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return false;
  }
}

export function removeBookmark(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(bookmark => bookmark.slug !== slug);
    
    if (filtered.length === bookmarks.length) {
      return false; // Nothing was removed
    }
    
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
}

export function toggleBookmark(slug: string, title: string): boolean {
  if (isBookmarked(slug)) {
    removeBookmark(slug);
    return false;
  } else {
    addBookmark(slug, title);
    return true;
  }
}

export function getBookmarkCount(): number {
  return getBookmarks().length;
}

export function clearAllBookmarks(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.removeItem(BOOKMARKS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing bookmarks:', error);
    return false;
  }
}
