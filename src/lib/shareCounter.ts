/**
 * Social share counter using localStorage
 * Tracks how many times each post has been shared on different platforms
 */

const SHARE_COUNTS_KEY = 'blog_share_counts';

export interface ShareCounts {
  twitter: number;
  linkedin: number;
  facebook: number;
  whatsapp: number;
  copy: number;
  total: number;
}

export interface ShareData {
  [slug: string]: ShareCounts;
}

function getShareData(): ShareData {
  if (typeof window === 'undefined') return {};
  
  try {
    const data = localStorage.getItem(SHARE_COUNTS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading share data:', error);
    return {};
  }
}

function saveShareData(data: ShareData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(SHARE_COUNTS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving share data:', error);
  }
}

/**
 * Get share counts for a specific post
 */
export function getShareCounts(slug: string): ShareCounts {
  const data = getShareData();
  return data[slug] || {
    twitter: 0,
    linkedin: 0,
    facebook: 0,
    whatsapp: 0,
    copy: 0,
    total: 0
  };
}

/**
 * Increment share count for a specific platform
 */
export function incrementShareCount(
  slug: string,
  platform: 'twitter' | 'linkedin' | 'facebook' | 'whatsapp' | 'copy'
): ShareCounts {
  const data = getShareData();
  
  if (!data[slug]) {
    data[slug] = {
      twitter: 0,
      linkedin: 0,
      facebook: 0,
      whatsapp: 0,
      copy: 0,
      total: 0
    };
  }
  
  data[slug][platform]++;
  data[slug].total++;
  
  saveShareData(data);
  return data[slug];
}

/**
 * Get total shares across all posts
 */
export function getTotalShares(): number {
  const data = getShareData();
  return Object.values(data).reduce((sum, counts) => sum + counts.total, 0);
}

/**
 * Get most shared posts
 */
export function getMostSharedPosts(limit: number = 10): Array<{ slug: string; shares: number }> {
  const data = getShareData();
  
  return Object.entries(data)
    .map(([slug, counts]) => ({ slug, shares: counts.total }))
    .sort((a, b) => b.shares - a.shares)
    .slice(0, limit);
}

/**
 * Get share counts for all posts
 */
export function getAllShareCounts(): ShareData {
  return getShareData();
}
