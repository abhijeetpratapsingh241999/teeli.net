/**
 * Utility functions for keyword-based blog image management
 * 
 * ⚠️ IMPORTANT: BlogPostClient now uses /blog/ folder directly for content images
 * The resolveImagePaths() function is NO LONGER USED in BlogPostClient.tsx
 * 
 * NEW Image Structure (as of Nov 2025):
 * /public/blog/{filename}.webp - Content images and SVGs (simple filenames in markdown)
 * /public/blog-images/{keywordCategory}/thumbnails/{filename}.webp - Card thumbnails (4:3 ratio)
 * 
 * Legacy Structure (deprecated for content images):
 * /public/blog-images/{keywordCategory}/{type}/{filename}.webp
 * 
 * Example Usage in Blog JSON:
 * - Content images: ![Alt](image.webp) → Auto-resolves to /blog/image.webp
 * - Thumbnails: "thumbnail": "/blog-images/3d-render/thumbnails/card.webp"
 * - External: ![Alt](https://example.com/image.jpg) → Used as-is
 * 
 * Path Resolution (in BlogPostClient.tsx):
 * - Simple filename (image.webp) → /blog/image.webp ✅
 * - Absolute path (/custom/path.webp) → /custom/path.webp ✅
 * - External URL (https://...) → https://... ✅
 */

export type ImageType = 'hero' | 'workflow' | 'tools' | 'examples' | 'thumbnails';

/**
 * Get full path for blog image based on keyword category
 * @param category - Keyword category (e.g., "3d-render", "architectural-design")
 * @param type - Image type folder (hero, workflow, tools, examples, thumbnails)
 * @param filename - Image filename with extension
 * @returns Full path for Next.js Image component
 */
export function getBlogImagePath(
  category: string,
  type: ImageType,
  filename: string
): string {
  return `/blog-images/${category}/${type}/${filename}`;
}

/**
 * Get thumbnail path for blog card (4:3 ratio, 800×600px)
 * @param category - Keyword category
 * @param filename - Thumbnail filename (e.g., "3d-house-rendering-guide.webp")
 * @returns Full path for blog card thumbnail
 */
export function getThumbnailPath(
  category: string,
  filename: string
): string {
  return `/blog-images/${category}/thumbnails/${filename}`;
}

/**
 * Get illustration SVG path (reusable across blogs)
 * @param category - Keyword category
 * @param filename - SVG filename
 * @returns Full path for SVG illustration
 */
export function getIllustrationPath(
  category: string,
  filename: string
): string {
  return `/illustrations/${category}/${filename}`;
}

/**
 * Parse blog content and auto-resolve image paths based on keyword category
 * 
 * ⚠️ DEPRECATED: This function is NO LONGER USED in BlogPostClient.tsx
 * BlogPostClient now handles path resolution directly using /blog/ folder
 * 
 * This function is kept for backward compatibility and potential future use
 * 
 * Converts relative paths to absolute keyword-based paths
 * Example:
 * ![Alt](image.webp) → ![Alt](/blog-images/3d-render/workflow/image.webp)
 * 
 * @param content - Blog markdown content
 * @param category - Keyword category
 * @param defaultType - Default image type if not specified (default: 'workflow')
 * @returns Content with resolved image paths
 * @deprecated Use direct /blog/ folder paths in BlogPostClient instead
 */
export function resolveImagePaths(
  content: string,
  category: string = '3d-render',
  defaultType: ImageType = 'workflow'
): string {
  // Match markdown image syntax: ![alt](filename.webp) or ![alt](filename.svg)
  return content.replace(
    /!\[([^\]]*)\]\(([^/)]+\.(webp|svg|png|jpg|jpeg))\)/gi,
    (match, alt, filename, ext) => {
      // If it's an SVG illustration
      if (ext.toLowerCase() === 'svg') {
        const fullPath = getIllustrationPath(category, filename);
        return `![${alt}](${fullPath})`;
      }
      
      // For WebP/PNG/JPG images, use workflow folder by default
      const fullPath = getBlogImagePath(category, defaultType, filename);
      return `![${alt}](${fullPath})`;
    }
  );
}

/**
 * Get optimized image URL with query parameters for Next.js Image Optimization
 * @param path - Image path
 * @param width - Desired width
 * @param quality - Quality (1-100)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  path: string,
  width?: number,
  quality: number = 85
): string {
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  params.set('q', quality.toString());
  
  return `${path}?${params.toString()}`;
}
