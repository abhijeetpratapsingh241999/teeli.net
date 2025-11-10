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
 */
export default function LazyHydrate({
  children,
  mode = 'onVisible',
  delay = 100,
  rootMargin = '100px'
}: LazyHydrateProps) {
  const [shouldHydrate, setShouldHydrate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'onVisible') {
      if (!ref.current) return;

      // Development-only logging
      if (process.env.NODE_ENV === 'development') {
        console.log('[LazyHydrate] Observing component for visibility-based hydration');
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (process.env.NODE_ENV === 'development') {
              console.log('[LazyHydrate] Component visible - hydrating now');
            }
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
      if (process.env.NODE_ENV === 'development') {
        console.log('[LazyHydrate] Scheduling idle hydration');
      }
      
      if ('requestIdleCallback' in window) {
        const id = requestIdleCallback(
          () => {
            if (process.env.NODE_ENV === 'development') {
              console.log('[LazyHydrate] Browser idle - hydrating now');
            }
            setShouldHydrate(true);
          },
          { timeout: 2000 }
        );
        return () => cancelIdleCallback(id);
      } else {
        const timeout = setTimeout(() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('[LazyHydrate] Fallback delay complete - hydrating now');
          }
          setShouldHydrate(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } 
    
    if (mode === 'afterDelay') {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[LazyHydrate] Scheduling delayed hydration (${delay}ms)`);
      }
      
      const timeout = setTimeout(() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[LazyHydrate] Delay complete - hydrating now');
        }
        setShouldHydrate(true);
      }, delay);
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
