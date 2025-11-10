"use client";

import { ReactNode, useEffect, useState } from 'react';
import LazyHydrate from './LazyHydrate';

interface MobileOnlyDeferProps {
  children: ReactNode;
  mode?: 'onVisible' | 'onIdle' | 'afterDelay';
  delay?: number;
}

/**
 * MobileOnlyDefer - Lazy hydration only on mobile viewports
 * 
 * Desktop: Renders immediately (no defer)
 * Mobile (<768px): Uses LazyHydrate with specified mode
 * 
 * Reduces mobile-specific performance bottlenecks
 * without affecting desktop experience
 * 
 * Usage:
 * <MobileOnlyDefer mode="onVisible">
 *   <HeavyComponent />
 * </MobileOnlyDefer>
 */
export default function MobileOnlyDefer({
  children,
  mode = 'onVisible',
  delay = 100
}: MobileOnlyDeferProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // SSR fallback - render nothing until client hydration
  if (isMobile === null) {
    return null;
  }

  // Desktop: render immediately
  if (!isMobile) {
    return <>{children}</>;
  }

  // Mobile: use LazyHydrate
  return (
    <LazyHydrate mode={mode} delay={delay}>
      {children}
    </LazyHydrate>
  );
}
