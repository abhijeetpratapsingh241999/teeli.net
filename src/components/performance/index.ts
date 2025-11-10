/**
 * Performance Optimization Components
 * 
 * Mobile-first performance utilities for blog posts
 * Reduces FCP, LCP, TTI, and TBT on mobile devices
 */

export { default as LazyHydrate } from './LazyHydrate';
export { default as MobileOnlyDefer } from './MobileOnlyDefer';
export { useReducedMotion, useIsMobile } from './useReducedMotion';
