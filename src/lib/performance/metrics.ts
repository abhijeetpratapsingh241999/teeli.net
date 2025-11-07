/**
 * Performance Monitoring Utilities
 * Track Core Web Vitals and custom metrics
 */

// Type definitions for browser APIs
interface WindowWithGtag extends Window {
  gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
  };
}

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: string;
}) {
  if (typeof window === 'undefined') return;

  // Send to Google Analytics
  const windowWithGtag = window as WindowWithGtag;
  if (windowWithGtag.gtag) {
    windowWithGtag.gtag('event', metric.name, {
      event_category: metric.label === 'web-vital' ? 'Web Vitals' : 'Custom Metrics',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vital]', metric.name, Math.round(metric.value), 'ms');
  }
}

/**
 * Measure page load performance
 */
export function measurePageLoad() {
  if (typeof window === 'undefined') return null;

  const perfData = window.performance?.timing;
  if (!perfData) return null;

  return {
    // Time to First Byte
    ttfb: perfData.responseStart - perfData.requestStart,
    
    // DOM Content Loaded
    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
    
    // Page Load Complete
    loadComplete: perfData.loadEventEnd - perfData.navigationStart,
    
    // DOM Processing
    domProcessing: perfData.domComplete - perfData.domLoading,
  };
}

/**
 * Get network information
 */
export function getNetworkInfo() {
  if (typeof window === 'undefined') return null;

  const connection = (navigator as NavigatorWithConnection).connection;
  if (!connection) return null;

  return {
    effectiveType: connection.effectiveType, // '4g', '3g', '2g', 'slow-2g'
    downlink: connection.downlink, // Mbps
    rtt: connection.rtt, // Round trip time in ms
    saveData: connection.saveData, // Data saver mode
  };
}

/**
 * Calculate Largest Contentful Paint (LCP)
 */
export function observeLCP(callback: (value: number) => void) {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
      renderTime?: number;
      loadTime?: number;
    };
    callback(lastEntry.renderTime || lastEntry.loadTime || 0);
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

/**
 * Calculate First Input Delay (FID)
 */
export function observeFID(callback: (value: number) => void) {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: PerformanceEntry & { processingStart?: number }) => {
      callback((entry.processingStart || 0) - entry.startTime);
    });
  });

  observer.observe({ entryTypes: ['first-input'] });
}

/**
 * Calculate Cumulative Layout Shift (CLS)
 */
export function observeCLS(callback: (value: number) => void) {
  if (typeof window === 'undefined') return;

  let clsValue = 0;
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value || 0;
        callback(clsValue);
      }
    });
  });

  observer.observe({ entryTypes: ['layout-shift'] });
}

/**
 * Get memory usage (Chrome only)
 */
export function getMemoryUsage() {
  if (typeof window === 'undefined') return null;

  const memory = (performance as PerformanceWithMemory).memory;
  if (!memory) return null;

  return {
    usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
    totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
    jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
  };
}

/**
 * Monitor long tasks (tasks > 50ms)
 */
export function observeLongTasks(callback: (duration: number) => void) {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 50) {
        callback(entry.duration);
        
        if (process.env.NODE_ENV === 'development') {
          console.warn('[Long Task]', entry.duration.toFixed(2), 'ms');
        }
      }
    });
  });

  observer.observe({ entryTypes: ['longtask'] });
}

/**
 * Get resource timing data
 */
export function getResourceTiming() {
  if (typeof window === 'undefined') return [];

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  return resources.map(resource => ({
    name: resource.name,
    duration: Math.round(resource.duration),
    size: resource.transferSize || 0,
    type: resource.initiatorType,
  }));
}

/**
 * Calculate Time to Interactive (TTI)
 */
export function calculateTTI(): Promise<number> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(0);
      return;
    }

    if (document.readyState === 'complete') {
      resolve(performance.now());
    } else {
      window.addEventListener('load', () => {
        resolve(performance.now());
      });
    }
  });
}

/**
 * Performance budget checker
 */
export function checkPerformanceBudget(budgets: {
  lcp?: number; // ms
  fid?: number; // ms
  cls?: number; // score
  ttfb?: number; // ms
}) {
  const warnings: string[] = [];

  // Check LCP (should be < 2500ms)
  if (budgets.lcp && budgets.lcp > 2500) {
    warnings.push(`LCP too high: ${budgets.lcp}ms (target: < 2500ms)`);
  }

  // Check FID (should be < 100ms)
  if (budgets.fid && budgets.fid > 100) {
    warnings.push(`FID too high: ${budgets.fid}ms (target: < 100ms)`);
  }

  // Check CLS (should be < 0.1)
  if (budgets.cls && budgets.cls > 0.1) {
    warnings.push(`CLS too high: ${budgets.cls} (target: < 0.1)`);
  }

  // Check TTFB (should be < 600ms)
  if (budgets.ttfb && budgets.ttfb > 600) {
    warnings.push(`TTFB too high: ${budgets.ttfb}ms (target: < 600ms)`);
  }

  return {
    passed: warnings.length === 0,
    warnings,
  };
}
