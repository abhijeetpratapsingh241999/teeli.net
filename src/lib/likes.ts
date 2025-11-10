/**
 * Like System Storage Logic
 * Handles both API-based (KV store) and localStorage fallback
 */

const STORAGE_PREFIX = 'blog:like:';
const COUNT_PREFIX = 'blog:like-count:';

/**
 * Check if user has liked a post (localStorage fallback)
 */
export function getLocalLikeStatus(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const key = `${STORAGE_PREFIX}${slug}`;
    return localStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
}

/**
 * Set local like status
 */
export function setLocalLikeStatus(slug: string, liked: boolean): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = `${STORAGE_PREFIX}${slug}`;
    if (liked) {
      localStorage.setItem(key, 'true');
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('Failed to save like status:', error);
  }
}

/**
 * Get local like count (fallback)
 */
export function getLocalLikeCount(slug: string): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const key = `${COUNT_PREFIX}${slug}`;
    const count = localStorage.getItem(key);
    return count ? parseInt(count, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Set local like count
 */
export function setLocalLikeCount(slug: string, count: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const key = `${COUNT_PREFIX}${slug}`;
    localStorage.setItem(key, count.toString());
  } catch (error) {
    console.error('Failed to save like count:', error);
  }
}

/**
 * Fetch like data from API
 */
export async function fetchLikeData(slug: string): Promise<{ count: number; liked: boolean }> {
  try {
    const response = await fetch(`/api/likes/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error) {
    // Fallback to localStorage
    console.log('API unavailable, using localStorage fallback');
    return {
      count: getLocalLikeCount(slug),
      liked: getLocalLikeStatus(slug),
    };
  }
}

/**
 * Toggle like via API
 */
export async function toggleLike(slug: string, currentLiked: boolean): Promise<{ count: number; liked: boolean }> {
  try {
    const response = await fetch(`/api/likes/${slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ liked: !currentLiked }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    // Sync with localStorage
    setLocalLikeStatus(slug, data.liked);
    setLocalLikeCount(slug, data.count);
    
    return data;
  } catch (error) {
    // Fallback to localStorage
    console.log('API unavailable, using localStorage fallback');
    const newLiked = !currentLiked;
    const currentCount = getLocalLikeCount(slug);
    const newCount = newLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
    
    setLocalLikeStatus(slug, newLiked);
    setLocalLikeCount(slug, newCount);
    
    return {
      count: newCount,
      liked: newLiked,
    };
  }
}

/**
 * Format like count (1.2k, 10k, etc.)
 */
export function formatLikeCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}
