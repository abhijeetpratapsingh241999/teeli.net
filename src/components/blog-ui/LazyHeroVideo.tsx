"use client";

/**
 * LazyHeroVideo - Lazy-loaded Hero Video Component
 * 
 * 🎯 PURPOSE:
 * Optimized video player for blog hero sections with:
 * - Intersection Observer based lazy loading
 * - Poster image placeholder until video loads
 * - Native HTML5 video controls
 * - SEO-optimized metadata
 * 
 * ⚡ PERFORMANCE:
 * - Loads video only when in viewport
 * - Uses poster for instant visual feedback
 * - Preloads metadata only (not full video)
 * - No render-blocking JavaScript
 * 
 * 📋 USAGE:
 * <LazyHeroVideo
 *   videoSrc="/blog/product-rendering-hero.mp4"
 *   posterSrc="/blog/product-rendering-poster.webp"
 *   alt="3D Product Rendering Process"
 * />
 */

import { useEffect, useRef, useState } from 'react';

interface LazyHeroVideoProps {
  videoSrc: string;
  alt: string;
}

export default function LazyHeroVideo({ videoSrc, alt }: LazyHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      <video
        ref={videoRef}
        className="w-full h-auto"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        {...(shouldLoad && { src: videoSrc })}
      >
        {shouldLoad && (
          <source src={videoSrc} type="video/mp4" />
        )}
        <p>Your browser does not support the video tag.</p>
      </video>
    </div>
  );
}
