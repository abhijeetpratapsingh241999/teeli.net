"use client";

import { ReactNode, useEffect, useState, useRef } from 'react';

type LazyHydrateMode = 'onVisible' | 'onIdle' | 'afterDelay';

interface LazyHydrateProps {
  children: ReactNode;
  mode?: LazyHydrateMode;
  delay?: number;
  rootMargin?: string;
}

/**
 * LazyHydrate - Defers component hydration for mobile performance
 * 
 * Strategies:
 * - onVisible: Hydrate when entering viewport (IntersectionObserver)
 * - onIdle: Hydrate when browser idle (requestIdleCallback)
 * - afterDelay: Hydrate after specified ms
 * 
 * Reduces initial JavaScript parse/compile time
 * Improves FCP, LCP, and TTI on mobile
 * 
 * OPTIMIZED: Increased rootMargin to 300px for earlier hydration
 * OPTIMIZED: Reduced idle timeout to 800ms for faster interactivity
 */
export default function LazyHydrate({
  children,
  mode = 'onVisible',
  delay = 100,
  rootMargin = '300px' // OPTIMIZED: Was 200px, now 300px for earlier visibility detection
}: LazyHydrateProps) {
  const [shouldHydrate, setShouldHydrate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'onVisible') {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldHydrate(true);
            observer.disconnect();
          }
        },
        { rootMargin, threshold: 0.01 }
      );

      observer.observe(ref.current);
      return () => observer.disconnect();
    } 
    
    if (mode === 'onIdle') {
      if ('requestIdleCallback' in window) {
        const id = requestIdleCallback(
          () => setShouldHydrate(true),
          { timeout: 800 } // OPTIMIZED: Reduced from 1000ms to 800ms for faster hydration
        );
        return () => cancelIdleCallback(id);
      } else {
        const timeout = setTimeout(() => setShouldHydrate(true), 800);
        return () => clearTimeout(timeout);
      }
    } 
    
    if (mode === 'afterDelay') {
      const timeout = setTimeout(() => setShouldHydrate(true), delay);
      return () => clearTimeout(timeout);
    }
  }, [mode, delay, rootMargin]);

  if (mode === 'onVisible') {
    return (
      <div ref={ref} style={{ minHeight: shouldHydrate ? 'auto' : '50px' }}>
        {shouldHydrate ? children : null}
      </div>
    );
  }

  return <>{shouldHydrate ? children : null}</>;
}
