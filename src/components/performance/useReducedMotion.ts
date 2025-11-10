"use client";

import { useEffect, useState } from 'react';

/**
 * useReducedMotion - Detects mobile viewport and reduced motion preference
 * 
 * Returns true if:
 * - User has reduced motion preference enabled, OR
 * - Viewport is mobile (<768px) for performance
 * 
 * Use to disable heavy animations on mobile:
 * ```tsx
 * const shouldReduceMotion = useReducedMotion();
 * 
 * <motion.div
 *   animate={shouldReduceMotion ? {} : { scale: 1.2 }}
 * />
 * ```
 */
export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Reduce motion if preference set OR mobile viewport
    const checkMotion = () => {
      setShouldReduce(mediaQuery.matches || window.innerWidth < 768);
    };

    checkMotion();
    
    // Listen for changes
    mediaQuery.addEventListener('change', checkMotion);
    window.addEventListener('resize', checkMotion);

    return () => {
      mediaQuery.removeEventListener('change', checkMotion);
      window.removeEventListener('resize', checkMotion);
    };
  }, []);

  return shouldReduce;
}

/**
 * useIsMobile - Simple mobile viewport detection
 * 
 * Returns true if viewport < 768px
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}
