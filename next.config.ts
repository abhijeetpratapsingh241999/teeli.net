import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance-optimized config */
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true, // Enable strict mode for better error detection
  
  // Image optimization for performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true, // Optimize CSS during production build
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
