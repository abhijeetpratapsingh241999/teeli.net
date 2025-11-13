"use client";

import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

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
 * ResponsiveImage - Mobile-optimized image wrapper with SVG support
 * 
 * Features:
 * - Auto-detects SVG files and renders with native <img> tag
 * - SVG: Direct render, preserves animations, no security blocks
 * - Raster images (PNG/WebP/JPG): Next.js Image optimization
 * - Responsive sizes: 100vw mobile, 700px desktop
 * - Lazy loading by default (priority override for hero)
 * - No layout shift (dimensions preserved)
 * - Blog-specific aspect ratios (4:3 for rendering-drawing blog)
 * 
 * Fully reusable & automatic - works for all blogs!
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
  const pathname = usePathname();
  
  // Check if current blog needs 4:3 ratio
  const is43RatioBlog = pathname?.includes('rendering-drawing-definition-purpose-workflow-architectural-visualisation-2025');
  
  // PERFORMANCE: Priority loading for Room 3D Model hero image only
  const isRoomModelHero = pathname?.includes('room-3d-model-step-by-step-workflow-formats-tools-2025') && 
                          src.includes('room-3d-model-hero.svg');
  const optimizedPriority = isRoomModelHero ? true : priority;
  
  // Apply 4:3 ratio for specific blog (1200x900), default 16:9 (1200x675)
  if (is43RatioBlog && width === 1200 && height === 675) {
    height = 900; // 4:3 ratio
  }
  
  // Auto-detect SVG files
  const isSVG = src.toLowerCase().endsWith('.svg');

  // Development logging
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.log(`[ResponsiveImage] ${optimizedPriority ? 'Priority' : 'Lazy'} ${isSVG ? 'SVG' : 'Image'} - ${src.split('/').pop()}`);
  }

  // SVG files: Use native <img> tag for animations & compatibility
  if (isSVG) {
    return (
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={optimizedPriority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={optimizedPriority ? "high" : "auto"}
          className={className}
          onLoad={() => {
            setIsLoading(false);
            if (process.env.NODE_ENV === 'development') {
              console.log(`[ResponsiveImage] SVG Loaded - ${src.split('/').pop()}`);
            }
          }}
          onError={(e) => {
            console.error(`[ResponsiveImage] SVG Load Error - ${src}`, e);
            setIsLoading(false);
          }}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>
    );
  }

  // Raster images: Use Next.js Image optimization
  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 700px, 800px"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => {
          setIsLoading(false);
          if (process.env.NODE_ENV === 'development') {
            console.log(`[ResponsiveImage] Loaded - ${src.split('/').pop()}`);
          }
        }}
        quality={75}
        style={{
          objectFit: 'cover',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
}
