/**
 * Lazy Loading Utilities for Performance Optimization
 * Implements Intersection Observer for images and components
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Hook for lazy loading images with Intersection Observer
 * @param options Intersection Observer options
 * @returns { ref, isVisible } - Ref to attach to element and visibility state
 */
export function useLazyLoad(options?: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
}

/**
 * Hook for lazy loading with delay
 * Useful for staggered component loading
 */
export function useLazyLoadWithDelay(delay: number = 100) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const { ref, isVisible } = useLazyLoad();

  useEffect(() => {
    if (isVisible && !shouldLoad) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, shouldLoad, delay]);

  return { ref, shouldLoad };
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }

  document.head.appendChild(link);
}

/**
 * Prefetch next page for faster navigation
 */
export function prefetchPage(href: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Detect if user is on slow connection
 */
export function isSlowConnection(): boolean {
  if (typeof window === 'undefined') return false;
  
  const connection = (navigator as any).connection;
  if (!connection) return false;

  return (
    connection.saveData ||
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g'
  );
}

/**
 * Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
