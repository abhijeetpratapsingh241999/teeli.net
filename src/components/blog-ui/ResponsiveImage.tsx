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
  const [hasError, setHasError] = useState(false);
  const [imgError, setImgError] = useState(false);
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
    // If hero image fails, show placeholder
    if (hasError) {
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-2 border-gray-700/30 rounded-xl sm:rounded-2xl ${className}`} style={{ minHeight: '400px' }}>
          <div className="text-center p-8">
            <svg className="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-base text-gray-400 font-semibold">{alt || 'Hero image'}</p>
            <p className="text-sm text-gray-600 mt-2">Image coming soon</p>
          </div>
        </div>
      );
    }
    
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
            // Silent error - show placeholder instead
            if (process.env.NODE_ENV === 'development') {
              console.log(`[ResponsiveImage] Hero not found (showing placeholder) - ${src.split('/').pop()}`);
            }
            setHasError(true);
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
    // If SVG fails to load, show placeholder instead of error
    if (hasError) {
      return (
        <div className={`relative overflow-hidden flex items-center justify-center bg-gray-900/30 border-2 border-dashed border-gray-700/50 rounded-xl sm:rounded-2xl ${className}`} style={{ minHeight: '300px' }}>
          <div className="text-center p-6">
            <svg className="w-16 h-16 mx-auto mb-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500 font-medium">{alt || 'Diagram placeholder'}</p>
            <p className="text-xs text-gray-600 mt-1">Image coming soon</p>
          </div>
        </div>
      );
    }
    
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
            // Silent error handling - just show placeholder
            if (process.env.NODE_ENV === 'development') {
              console.log(`[ResponsiveImage] SVG not found (showing placeholder) - ${src.split('/').pop()}`);
            }
            setHasError(true);
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
  if (imgError) {
    return (
      <div className={`relative overflow-hidden flex items-center justify-center bg-gray-900/30 border-2 border-dashed border-gray-700/50 rounded-xl sm:rounded-2xl ${className}`} style={{ minHeight: '300px' }}>
        <div className="text-center p-6">
          <svg className="w-16 h-16 mx-auto mb-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-500 font-medium">{alt || 'Image placeholder'}</p>
          <p className="text-xs text-gray-600 mt-1">Image coming soon</p>
        </div>
      </div>
    );
  }
  
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
        onError={() => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`[ResponsiveImage] Image not found (showing placeholder) - ${src.split('/').pop()}`);
          }
          setImgError(true);
          setIsLoading(false);
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
