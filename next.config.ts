import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Aggressive Mobile Performance Optimizations */
  
  // Image optimization - EXTREME MOBILE FIRST + WebP FIX
  images: {
    formats: ['image/webp'], // Only WebP - AVIF too slow to encode
    deviceSizes: [640, 750, 828], // Mobile-first breakpoints
    imageSizes: [16, 32, 48, 64, 96], // Add more sizes for better optimization
    unoptimized: false, // MUST optimize all images
    minimumCacheTTL: 31536000, // Cache 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // FIX: Use remotePatterns instead of domains (Next.js 16 best practice)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.teeli.net',
        pathname: '/blog/**',
      },
      {
        protocol: 'https',
        hostname: 'teeli.net',
        pathname: '/blog/**',
      },
    ],
    // Note: quality moved to component level (Next.js 16 requirement)
  },
  
  // Enable maximum compression
  compress: true,
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
    optimizeCss: true,
    serverMinification: true,
  },
  
  // Headers for aggressive caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(jpg|jpeg|png|webp|avif|svg|gif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
