"use client";

import { ReactNode, useEffect, useState, useRef } from 'react';

type LazyHydrateMode = 'onVisible' | 'onIdle' | 'afterDelay';

interface LazyHydrateProps {
  children: ReactNode;
  mode?: LazyHydrateMode;
  delay?: number; // milliseconds (for afterDelay mode)
  rootMargin?: string; // for IntersectionObserver
}

/**
 * LazyHydrate - Reduce client hydration cost
 * 
 * Delays hydration of heavy components until needed:
 * - onVisible: Hydrate when component enters viewport
 * - onIdle: Hydrate when browser is idle
 * - afterDelay: Hydrate after specified milliseconds
 * 
 * Usage:
 * <LazyHydrate mode="onVisible">
 *   <HeavyComponent />
 * </LazyHydrate>
 */
export default function LazyHydrate({
  children,
  mode = 'onVisible',
  delay = 100,
  rootMargin = '50px'
}: LazyHydrateProps) {
  const [shouldHydrate, setShouldHydrate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'onVisible') {
      // Use IntersectionObserver for visibility-based hydration
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldHydrate(true);
            observer.disconnect();
          }
        },
        { rootMargin }
      );

      observer.observe(ref.current);

      return () => observer.disconnect();
    } else if (mode === 'onIdle') {
      // Hydrate when browser is idle
      if ('requestIdleCallback' in window) {
        const id = requestIdleCallback(() => setShouldHydrate(true), {
          timeout: 2000
        });
        return () => cancelIdleCallback(id);
      } else {
        // Fallback for browsers without requestIdleCallback
        const timeout = setTimeout(() => setShouldHydrate(true), 2000);
        return () => clearTimeout(timeout);
      }
    } else if (mode === 'afterDelay') {
      // Hydrate after specified delay
      const timeout = setTimeout(() => setShouldHydrate(true), delay);
      return () => clearTimeout(timeout);
    }
  }, [mode, delay, rootMargin]);

  if (mode === 'onVisible') {
    return (
      <div ref={ref}>
        {shouldHydrate ? children : <div style={{ minHeight: '100px' }} />}
      </div>
    );
  }

  return <>{shouldHydrate ? children : null}</>;
}
