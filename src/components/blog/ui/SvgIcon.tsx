import React from 'react';

interface SvgIconProps {
  type: 'home' | 'tools' | 'lightbulb' | 'chart' | 'palette' | 'bolt' | 'search' | 'check' | 'cross' | 'dollar' | 'camera' | 'clock' | 'award' | 'rocket' | 'settings' | 'layers' | 'cpu' | 'globe' | 'shield' | 'star';
  size?: number;
  className?: string;
  color?: string;
}

/**
 * SVG Icon Component
 * 
 * Why SVG Icons Are Best Practice:
 * 
 * 1. SEO Benefits:
 *    - Text-based, searchable & indexable by search engines
 *    - Accessible with proper aria-labels and titles
 *    - Semantic HTML improves page structure
 * 
 * 2. Performance:
 *    - 60-80% smaller than raster images
 *    - Zero HTTP requests (inline)
 *    - Crisp on all screen resolutions (Retina/4K)
 * 
 * 3. Customization:
 *    - CSS-controllable (color, size, animations)
 *    - Theme support (dark/light mode)
 *    - Interactive effects (hover, click)
 * 
 * 4. Modern Standards:
 *    - Responsive scaling without quality loss
 *    - ARIA attributes for accessibility
 *    - Animation-ready with CSS/JS
 * 
 * @example
 * <SvgIcon type="home" size={24} color="currentColor" />
 */
export default function SvgIcon({ type, size = 24, className = '', color = 'currentColor' }: SvgIconProps) {
  const icons: Record<string, React.ReactElement> = {
    home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Home icon">
        <title>Home</title>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9 22 9 12 15 12 15 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    tools: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Tools icon">
        <title>Tools</title>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    lightbulb: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Lightbulb icon">
        <title>Idea</title>
        <path d="M9 18h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 22h4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8a6 6 0 0 0-12 0c0 1.36.53 2.64 1.5 3.5.76.76 1.23 1.52 1.41 2.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    chart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Chart icon">
        <title>Statistics</title>
        <line x1="12" y1="20" x2="12" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="20" x2="18" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" y1="20" x2="6" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    
    palette: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Palette icon">
        <title>Design</title>
        <circle cx="13.5" cy="6.5" r=".5" fill={color}/>
        <circle cx="17.5" cy="10.5" r=".5" fill={color}/>
        <circle cx="8.5" cy="7.5" r=".5" fill={color}/>
        <circle cx="6.5" cy="12.5" r=".5" fill={color}/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    bolt: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Bolt icon">
        <title>Fast</title>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    search: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Search icon">
        <title>Search</title>
        <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Check icon">
        <title>Success</title>
        <polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    cross: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Cross icon">
        <title>Error</title>
        <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    dollar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Dollar icon">
        <title>Cost</title>
        <line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    camera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Camera icon">
        <title>Photography</title>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    clock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Clock icon">
        <title>Time</title>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="12 6 12 12 16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    award: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Award icon">
        <title>Award</title>
        <circle cx="12" cy="8" r="7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    rocket: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Rocket icon">
        <title>Launch</title>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Settings icon">
        <title>Settings</title>
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    layers: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Layers icon">
        <title>Layers</title>
        <polygon points="12 2 2 7 12 12 22 7 12 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="2 17 12 22 22 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="2 12 12 17 22 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    cpu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="CPU icon">
        <title>Processing</title>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="9" y="9" width="6" height="6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="9" y1="1" x2="9" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="15" y1="1" x2="15" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="9" y1="20" x2="9" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="15" y1="20" x2="15" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="20" y1="9" x2="23" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="20" y1="14" x2="23" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="1" y1="9" x2="4" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="1" y1="14" x2="4" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    globe: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Globe icon">
        <title>Global</title>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    shield: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Shield icon">
        <title>Protection</title>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Star icon">
        <title>Featured</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  };

  return icons[type] || null;
}
