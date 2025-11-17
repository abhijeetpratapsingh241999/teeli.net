/**
 * Calculate reading time for blog content
 * Average reading speed: 200-250 words per minute
 */

export interface ReadingTimeResult {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export function calculateReadingTime(content: string, wordsPerMinute: number = 225): ReadingTimeResult {
  // Remove HTML tags and extra whitespace
  const plainText = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();

  // Count words
  const words = plainText.split(' ').filter(word => word.length > 0).length;

  // Calculate reading time in minutes
  const minutes = Math.ceil(words / wordsPerMinute);

  // Calculate time in milliseconds
  const time = Math.ceil((words / wordsPerMinute) * 60 * 1000);

  return {
    text: `${minutes} min read`,
    minutes,
    time,
    words
  };
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '< 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}
