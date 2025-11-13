import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85], // Add quality 85 to avoid warnings
    unoptimized: false,
    dangerouslyAllowSVG: true, // Enable SVG support
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Secure SVG rendering
    // Disable image optimization for SVG files (they stay as .svg, no .webp conversion)
    disableStaticImages: false,
    minimumCacheTTL: 60,
    // Allow images from public folder root paths
    remotePatterns: [],
    // Disable domain restriction for local public folder
    domains: [],
  },
  // Ensure public folder assets served from root
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
