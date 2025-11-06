/**
 * Optimized Image Component for Blog Posts
 * Features: Lazy loading, blur placeholder, responsive sizes, WebP support
 */

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedBlogImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function OptimizedBlogImage({ 
  src, 
  alt, 
  className = "",
  priority = false 
}: OptimizedBlogImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Construct full image path
  const imagePath = src.startsWith('/') ? src : `/blog/${src}`;

  if (error) {
    return (
      <div 
        className={`relative w-full aspect-video bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-xl flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt || "Image unavailable"}
      >
        <div className="text-center p-6">
          <div className="text-4xl mb-2" aria-hidden="true">🖼️</div>
          <p className="text-zinc-400 text-sm">Image unavailable</p>
          <p className="text-zinc-600 text-xs mt-1">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <figure className={`relative w-full overflow-hidden ${className}`}>
      {/* Blur placeholder while loading */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-gray-800/40 animate-pulse rounded-xl" 
          aria-hidden="true"
        />
      )}
      
      <Image
        src={imagePath}
        alt={alt}
        width={1200}
        height={675}
        quality={45}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        decoding="async"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        className={`w-full h-auto rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 1000px"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
    </figure>
  );
}

/**
 * Optimized Video Component for Blog Posts
 */
interface OptimizedBlogVideoProps {
  src: string;
  className?: string;
}

export function OptimizedBlogVideo({ src, className = "" }: OptimizedBlogVideoProps) {
  const videoPath = src.startsWith('/') ? src : `/blog/${src}`;

  return (
    <div className={`relative w-full ${className}`}>
      <video 
        src={videoPath}
        controls
        preload="metadata"
        className="w-full rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl"
        onError={() => {
          console.error('Video failed to load:', videoPath);
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
