/**
 * Google Analytics 4 (GA4) Tracking Utilities
 * 
 * Provides type-safe functions for sending GA4 events.
 * Tree-shakeable and only runs on client-side.
 */

// Type definitions are in src/components/Analytics.tsx to avoid duplicate declarations

/**
 * Check if GA4 is initialized and available
 */
export const isGA4Available = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track a page view event
 * @param url - The full URL to track (window.location.href)
 */
export const trackPageView = (url: string): void => {
  if (!isGA4Available()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA4] Page view tracked:', url);
    }
    return;
  }

  try {
    window.gtag!('event', 'page_view', {
      page_location: url,
      page_title: document.title,
    });
  } catch (error) {
    console.error('[GA4] Error tracking page view:', error);
  }
};

/**
 * Track a custom event
 * @param eventName - The name of the event
 * @param eventParams - Optional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (!isGA4Available()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA4] Event tracked:', eventName, eventParams);
    }
    return;
  }

  try {
    window.gtag!('event', eventName, eventParams);
  } catch (error) {
    console.error('[GA4] Error tracking event:', error);
  }
};

/**
 * Track an outbound link click
 * @param url - The external URL clicked
 */
export const trackOutboundLink = (url: string): void => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: url,
    transport_type: 'beacon',
  });
};

/**
 * Track a file download
 * @param fileName - The name of the downloaded file
 */
export const trackFileDownload = (fileName: string): void => {
  trackEvent('file_download', {
    file_name: fileName,
  });
};
