"use client";

/**
 * TeeliLogo - High-Performance SVG Logo
 * 
 * 🎯 PERFORMANCE:
 * - Static SVG (0 KB JavaScript)
 * - CSS-only hover animation
 * - No WebGL/Canvas overhead
 * - Hardware-accelerated transform
 * 
 * Design: 3D cube wireframe representing:
 * - 3D rendering technology
 * - Digital transformation
 * - Cloud infrastructure
 */

export default function TeeliLogo() {
  return (
    <div className="h-10 w-10 flex items-center justify-center group">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110"
      >
        {/* 3D Cube Wireframe */}
        <g stroke="#00ffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Back face */}
          <path d="M8 10 L16 6 L24 10 L16 14 Z" opacity="0.4" />
          
          {/* Front face */}
          <path d="M8 18 L16 14 L24 18 L16 22 Z" />
          
          {/* Vertical edges */}
          <line x1="8" y1="10" x2="8" y2="18" opacity="0.6" />
          <line x1="16" y1="6" x2="16" y2="14" />
          <line x1="24" y1="10" x2="24" y2="18" opacity="0.6" />
          
          {/* Bottom face */}
          <path d="M8 18 L16 22 L24 18 L16 26 Z" opacity="0.3" />
        </g>
        
        {/* Center glow dot */}
        <circle cx="16" cy="16" r="1.5" fill="#00ffff" className="animate-pulse" />
      </svg>
    </div>
  );
}

