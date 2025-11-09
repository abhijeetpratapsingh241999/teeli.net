"use client";

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics-ga4';

/**
 * Analytics Tracker Component (Internal)
 * 
 * Uses useSearchParams which requires Suspense boundary.
 */
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track on client-side
    if (typeof window === 'undefined') return;

    // Build full URL with search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    const fullUrl = window.location.origin + url;

    // Track page view
    trackPageView(fullUrl);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Page view:', fullUrl);
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Analytics Provider Component
 * 
 * Automatically tracks page views on route changes in Next.js App Router.
 * Should be placed inside layout.tsx to track all navigation.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}
