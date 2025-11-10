"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  priority?: boolean;
  className?: string;
}

/**
 * ResponsiveImage - Optimized image wrapper for blog posts
 * 
 * Features:
 * - Next.js Image optimization
 * - Lazy loading by default
 * - Async decoding for non-blocking rendering
 * - Responsive sizes for optimal bandwidth
 * - Optional blur placeholder
 * - No layout shift (aspect ratio preserved)
 * 
 * Usage:
 * <ResponsiveImage src="/blog/image.jpg" alt="Description" />
 */
export default function ResponsiveImage({
  src,
  alt,
  width = 1200,
  height = 675,
  blurDataURL,
  priority = false,
  className = "w-full h-auto rounded-xl sm:rounded-2xl border-2 border-cyan-500/30 shadow-2xl"
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes="(max-width: 768px) 100vw, 700px"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        quality={85}
        style={{
          objectFit: 'cover',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
}
