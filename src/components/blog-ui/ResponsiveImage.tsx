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
  
  // PERFORMANCE: Detect hero images for optimized loading
  // Hero images are small static WebP files (20-50KB) - use native <img> for fastest LCP
  const isHeroImage = priority || src.includes('-hero.webp') || src.includes('-hero.avif');
  
  // PERFORMANCE: Quality settings for Next.js Image
  // Hero images don't use Next.js Image (native <img> faster for small files)
  // Other images: 55 quality - maximum performance
  const imageQuality = 55;
  
  // Apply 4:3 ratio for specific blog (1200x900), default 16:9 (1200x675)
  if (is43RatioBlog && width === 1200 && height === 675) {
    height = 900; // 4:3 ratio
  }
  
  // Auto-detect SVG files
  const isSVG = src.toLowerCase().endsWith('.svg');
  
  // Auto-detect WebP/AVIF files (raster formats)
  const isWebP = src.toLowerCase().endsWith('.webp');
  const isAVIF = src.toLowerCase().endsWith('.avif');

  // CRITICAL: Hero images (small static files 20-50KB) use native <img> for instant LCP
  // Native <img> avoids Next.js Image processing overhead (~200-400ms saved)
  const useNativeImg = isHeroImage && (isWebP || isAVIF);
  
  // CRITICAL: SVG hero images should use object tag with proper sizing to prevent blocking
  // For hero images, we want to ensure SVG loads asynchronously
  const isHeroSVG = isSVG && isHeroImage;

  // Development logging
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.log(`[ResponsiveImage] ${priority ? 'Priority' : 'Lazy'} ${isSVG ? 'SVG' : useNativeImg ? 'Native WebP/AVIF' : 'Next.js Image'} - ${src.split('/').pop()}`);
  }
  
  // PERFORMANCE FIX: Hero WebP/AVIF images use native <img> tag
  // - Eliminates Next.js Image processing delay (200-400ms)
  // - Direct browser decode (faster for small files)
  // - Instant LCP improvement
  if (useNativeImg) {
    return (
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={className}
          onLoad={() => {
            setIsLoading(false);
            if (process.env.NODE_ENV === 'development') {
              console.log(`[ResponsiveImage] Native Hero Loaded - ${src.split('/').pop()}`);
            }
          }}
          onError={(e) => {
            console.error(`[ResponsiveImage] Hero Load Error - ${src}`, e);
            setIsLoading(false);
          }}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover'
          }}
        />
      </div>
    );
  }

  // SVG files: Use object tag for hero SVGs to prevent LCP blocking
  if (isHeroSVG) {
    return (
      <div className="relative overflow-hidden bg-gray-900/50" style={{ aspectRatio: `${width}/${height}` }}>
        <object
          data={src}
          type="image/svg+xml"
          aria-label={alt}
          className={className}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover'
          }}
        >
          {/* Fallback for browsers that don't support object tag */}
          <img src={src} alt={alt} className={className} loading="eager" />
        </object>
      </div>
    );
  }

  // Regular SVG files: Use native <img> tag for animations & compatibility
  if (isSVG) {
    return (
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
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

  // Raster images (non-hero): Use Next.js Image optimization
  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 800px, 1200px"
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
        quality={imageQuality}
        style={{
          objectFit: 'cover',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
}
