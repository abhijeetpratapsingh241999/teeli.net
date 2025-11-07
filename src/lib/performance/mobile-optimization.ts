/**
 * Mobile Performance Optimizations
 * Device-specific optimizations for better mobile experience
 */

/**
 * Detect device type
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Detect if device has touch support
 */
export function hasTouchSupport(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

/**
 * Get device pixel ratio for image optimization
 */
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
}

/**
 * Get optimal image quality based on device
 */
export function getOptimalImageQuality(): number {
  if (typeof window === 'undefined') return 85;
  
  const isMobile = isMobileDevice();
  const connection = (navigator as any).connection;
  
  // Slow connection - lower quality
  if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
    return 60;
  }
  
  // Mobile on 3G - medium quality
  if (isMobile && connection?.effectiveType === '3g') {
    return 70;
  }
  
  // Mobile on 4G+ - good quality
  if (isMobile) {
    return 80;
  }
  
  // Desktop - high quality
  return 85;
}

/**
 * Get optimal image size multiplier based on viewport
 */
export function getImageSizeMultiplier(): number {
  if (typeof window === 'undefined') return 1;
  
  const width = window.innerWidth;
  const dpr = getDevicePixelRatio();
  
  // Mobile portrait
  if (width < 640) {
    return dpr > 2 ? 1.5 : 1;
  }
  
  // Tablet
  if (width < 1024) {
    return dpr > 2 ? 1.5 : 1.2;
  }
  
  // Desktop
  return dpr > 2 ? 2 : 1.5;
}

/**
 * Check if animations should be reduced on mobile
 */
export function shouldReduceAnimations(): boolean {
  if (typeof window === 'undefined') return false;
  
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = isMobileDevice();
  const connection = (navigator as any).connection;
  
  return (
    prefersReduced ||
    (isMobile && connection?.saveData) ||
    connection?.effectiveType === '2g' ||
    connection?.effectiveType === 'slow-2g'
  );
}

/**
 * Get battery status for performance adjustments
 */
export async function getBatteryStatus(): Promise<{
  charging: boolean;
  level: number;
  shouldReducePerformance: boolean;
} | null> {
  if (typeof window === 'undefined' || !(navigator as any).getBattery) {
    return null;
  }
  
  try {
    const battery = await (navigator as any).getBattery();
    
    return {
      charging: battery.charging,
      level: battery.level,
      shouldReducePerformance: !battery.charging && battery.level < 0.2, // Less than 20%
    };
  } catch {
    return null;
  }
}

/**
 * Optimize touch interactions for mobile
 */
export function optimizeTouchInteractions() {
  if (typeof document === 'undefined') return;
  
  // Add touch-action CSS for better scrolling
  document.body.style.touchAction = 'pan-y pinch-zoom';
  
  // Prevent double-tap zoom on buttons
  document.querySelectorAll('button, a').forEach((el) => {
    (el as HTMLElement).style.touchAction = 'manipulation';
  });
}

/**
 * Get viewport dimensions for responsive calculations
 */
export function getViewportDimensions() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  };
}

/**
 * Calculate if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const { width, height } = getViewportDimensions();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= height &&
    rect.right <= width
  );
}

/**
 * Debounce function for performance-intensive operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
