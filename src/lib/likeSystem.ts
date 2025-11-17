/**
 * Like functionality using localStorage
 * Tracks likes per blog post
 */

const LIKE_STORAGE_KEY = 'blog_post_likes';
const USER_LIKES_KEY = 'user_liked_posts';

export interface LikeData {
  [slug: string]: number;
}

export interface UserLikes {
  [slug: string]: boolean;
}

export function getLikeCount(slug: string): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const likes = localStorage.getItem(LIKE_STORAGE_KEY);
    if (!likes) return 0;
    
    const likeData: LikeData = JSON.parse(likes);
    return likeData[slug] || 0;
  } catch (error) {
    console.error('Error reading like count:', error);
    return 0;
  }
}

export function isPostLiked(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const userLikes = localStorage.getItem(USER_LIKES_KEY);
    if (!userLikes) return false;
    
    const likes: UserLikes = JSON.parse(userLikes);
    return likes[slug] || false;
  } catch (error) {
    console.error('Error checking like status:', error);
    return false;
  }
}

export function toggleLike(slug: string): { liked: boolean; count: number } {
  if (typeof window === 'undefined') return { liked: false, count: 0 };
  
  try {
    // Get current likes
    const likes = localStorage.getItem(LIKE_STORAGE_KEY);
    const likeData: LikeData = likes ? JSON.parse(likes) : {};
    
    // Get user likes
    const userLikes = localStorage.getItem(USER_LIKES_KEY);
    const userLikeData: UserLikes = userLikes ? JSON.parse(userLikes) : {};
    
    // Toggle like
    const wasLiked = userLikeData[slug] || false;
    userLikeData[slug] = !wasLiked;
    
    // Update count
    if (wasLiked) {
      likeData[slug] = Math.max((likeData[slug] || 0) - 1, 0);
    } else {
      likeData[slug] = (likeData[slug] || 0) + 1;
    }
    
    // Save to localStorage
    localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(likeData));
    localStorage.setItem(USER_LIKES_KEY, JSON.stringify(userLikeData));
    
    return {
      liked: userLikeData[slug],
      count: likeData[slug]
    };
  } catch (error) {
    console.error('Error toggling like:', error);
    return { liked: false, count: 0 };
  }
}

export function getAllLikes(): LikeData {
  if (typeof window === 'undefined') return {};
  
  try {
    const likes = localStorage.getItem(LIKE_STORAGE_KEY);
    return likes ? JSON.parse(likes) : {};
  } catch (error) {
    console.error('Error reading all likes:', error);
    return {};
  }
}

export function getMostLikedPosts(limit: number = 10): Array<{ slug: string; likes: number }> {
  const allLikes = getAllLikes();
  
  return Object.entries(allLikes)
    .map(([slug, likes]) => ({ slug, likes }))
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);
}

export function getUserLikedPosts(): string[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const userLikes = localStorage.getItem(USER_LIKES_KEY);
    if (!userLikes) return [];
    
    const likes: UserLikes = JSON.parse(userLikes);
    return Object.entries(likes)
      .filter(([_, liked]) => liked)
      .map(([slug]) => slug);
  } catch (error) {
    console.error('Error reading user liked posts:', error);
    return [];
  }
}
