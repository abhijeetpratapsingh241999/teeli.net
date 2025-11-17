/**
 * Client-side blog search functionality
 * Searches through blog posts by title, description, tags, and content
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  topic?: string;
  content?: string;
  sections?: any[];
}

export interface SearchResult extends BlogPost {
  score: number;
  matchedFields: string[];
}

/**
 * Search blog posts with scoring algorithm
 */
export function searchBlogPosts(
  posts: BlogPost[],
  query: string
): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  const results: SearchResult[] = [];

  for (const post of posts) {
    let score = 0;
    const matchedFields: string[] = [];

    // Search in title (highest weight)
    const titleLower = post.title.toLowerCase();
    searchTerms.forEach(term => {
      if (titleLower.includes(term)) {
        score += 10;
        if (!matchedFields.includes('title')) matchedFields.push('title');
      }
    });

    // Exact match in title gets bonus
    if (titleLower.includes(query.toLowerCase())) {
      score += 20;
    }

    // Search in description
    const descLower = post.description.toLowerCase();
    searchTerms.forEach(term => {
      if (descLower.includes(term)) {
        score += 5;
        if (!matchedFields.includes('description')) matchedFields.push('description');
      }
    });

    // Search in tags
    post.tags.forEach(tag => {
      const tagLower = tag.toLowerCase();
      searchTerms.forEach(term => {
        if (tagLower.includes(term)) {
          score += 7;
          if (!matchedFields.includes('tags')) matchedFields.push('tags');
        }
      });
    });

    // Search in topic
    if (post.topic) {
      const topicLower = post.topic.toLowerCase();
      searchTerms.forEach(term => {
        if (topicLower.includes(term)) {
          score += 3;
          if (!matchedFields.includes('topic')) matchedFields.push('topic');
        }
      });
    }

    // Search in sections content
    if (post.sections) {
      let contentMatches = 0;
      post.sections.forEach(section => {
        if (section.title) {
          const sectionTitleLower = section.title.toLowerCase();
          searchTerms.forEach(term => {
            if (sectionTitleLower.includes(term)) {
              contentMatches++;
            }
          });
        }
        if (section.content) {
          const contentLower = section.content.toLowerCase();
          searchTerms.forEach(term => {
            if (contentLower.includes(term)) {
              contentMatches++;
            }
          });
        }
      });
      if (contentMatches > 0) {
        score += Math.min(contentMatches, 10); // Cap at 10 points
        if (!matchedFields.includes('content')) matchedFields.push('content');
      }
    }

    // Only include posts with matches
    if (score > 0) {
      results.push({
        ...post,
        score,
        matchedFields
      });
    }
  }

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Filter posts by tag
 */
export function filterByTag(posts: BlogPost[], tag: string): BlogPost[] {
  const tagLower = tag.toLowerCase();
  return posts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tagLower)
  );
}

/**
 * Filter posts by topic
 */
export function filterByTopic(posts: BlogPost[], topic: string): BlogPost[] {
  const topicLower = topic.toLowerCase();
  return posts.filter(post =>
    post.topic?.toLowerCase() === topicLower
  );
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(posts: BlogPost[]): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all unique topics from posts
 */
export function getAllTopics(posts: BlogPost[]): { topic: string; count: number }[] {
  const topicMap = new Map<string, number>();
  
  posts.forEach(post => {
    if (post.topic) {
      const count = topicMap.get(post.topic) || 0;
      topicMap.set(post.topic, count + 1);
    }
  });

  return Array.from(topicMap.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count);
}
