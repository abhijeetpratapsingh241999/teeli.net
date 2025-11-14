import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance-optimized config */
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true, // Enable strict mode for better error detection
  
  // Image optimization for performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    disableStaticImages: false,
    minimumCacheTTL: 31536000, // 1 year for aggressive caching
    remotePatterns: [],
    domains: [],
  },
  
  // Performance: Optimize package imports and code splitting
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion',
      'react',
      'react-dom',
      '@vercel/analytics'
    ],
    optimizeCss: true, // Optimize CSS during production build
    webpackBuildWorker: true, // Enable parallel webpack builds
    // PERFORMANCE BOOST: Aggressive chunking for better caching
    cssChunking: 'loose',
  },
  
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Turbopack configuration (Next.js 16 default)
  turbopack: {
    resolveAlias: {
      // Optimize Three.js imports for Turbopack
      'three': 'three/build/three.module.js',
    },
  },
  
  basePath: '',
  assetPrefix: '',
  
  // Rewrite rules to fix /blog/ prefix issue for static assets
  async rewrites() {
    return [
      {
        source: '/blog/illustrations/:path*',
        destination: '/illustrations/:path*',
      },
      {
        source: '/blog/blog-images/:path*',
        destination: '/blog-images/:path*',
      },
    ];
  },
};

export default nextConfig;
