/**
 * Video Extraction Utilities
 * Detects and extracts video information from blog post content
 */

export interface VideoInfo {
  type: 'hosted' | 'youtube' | 'vimeo';
  url: string;
  embedUrl: string;
  thumbnailUrl?: string;
  duration?: string; // ISO 8601 format (e.g., "PT3M")
}

/**
 * Extract YouTube video ID from URL
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

/**
 * Extract Vimeo video ID from URL
 */
function extractVimeoId(url: string): string | null {
  const pattern = /vimeo\.com\/(\d+)/;
  const match = url.match(pattern);
  return match ? match[1] : null;
}

/**
 * Parse duration from video tag attributes
 */
function parseDuration(durationStr: string): string {
  // If already in ISO 8601 format, return as is
  if (durationStr.startsWith('PT')) return durationStr;
  
  // Try to parse seconds
  const seconds = parseInt(durationStr, 10);
  if (isNaN(seconds)) return 'PT3M'; // Default fallback
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  let result = 'PT';
  if (hours > 0) result += `${hours}H`;
  if (minutes > 0) result += `${minutes}M`;
  if (secs > 0) result += `${secs}S`;
  
  return result || 'PT3M';
}

/**
 * Extract all videos from markdown content
 */
export function extractVideosFromContent(content: string): VideoInfo[] {
  const videos: VideoInfo[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Pattern 1: <video> tag with src
    const videoTagMatch = trimmedLine.match(/<video[^>]*src=["']([^"']+)["'][^>]*>/);
    if (videoTagMatch) {
      const src = videoTagMatch[0];
      const urlMatch = src.match(/src=["']([^"']+)["']/);
      const posterMatch = src.match(/poster=["']([^"']+)["']/);
      const durationMatch = src.match(/data-duration=["']([^"']+)["']/);
      
      if (urlMatch) {
        videos.push({
          type: 'hosted',
          url: urlMatch[1],
          embedUrl: urlMatch[1],
          thumbnailUrl: posterMatch ? posterMatch[1] : undefined,
          duration: durationMatch ? parseDuration(durationMatch[1]) : 'PT3M',
        });
      }
      continue;
    }
    
    // Pattern 2: Markdown image syntax with video extension
    const markdownVideoMatch = trimmedLine.match(/!\[([^\]]*)\]\(([^)]+\.(mp4|webm|mov|avi))\)/i);
    if (markdownVideoMatch) {
      videos.push({
        type: 'hosted',
        url: markdownVideoMatch[2],
        embedUrl: markdownVideoMatch[2],
        duration: 'PT3M',
      });
      continue;
    }
    
    // Pattern 3: YouTube URLs
    const youtubeMatch = trimmedLine.match(/(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+))/);
    if (youtubeMatch) {
      const videoId = extractYouTubeId(youtubeMatch[1]);
      if (videoId) {
        videos.push({
          type: 'youtube',
          url: youtubeMatch[1],
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          duration: 'PT3M',
        });
      }
      continue;
    }
    
    // Pattern 4: Vimeo URLs
    const vimeoMatch = trimmedLine.match(/(https?:\/\/(?:www\.)?vimeo\.com\/(\d+))/);
    if (vimeoMatch) {
      const videoId = extractVimeoId(vimeoMatch[1]);
      if (videoId) {
        videos.push({
          type: 'vimeo',
          url: vimeoMatch[1],
          embedUrl: `https://player.vimeo.com/video/${videoId}`,
          duration: 'PT3M',
        });
      }
      continue;
    }
  }
  
  return videos;
}

/**
 * Check if content has any video
 */
export function hasVideo(content: string): boolean {
  return extractVideosFromContent(content).length > 0;
}

/**
 * Get primary video (first one found)
 */
export function getPrimaryVideo(content: string): VideoInfo | null {
  const videos = extractVideosFromContent(content);
  return videos.length > 0 ? videos[0] : null;
}
