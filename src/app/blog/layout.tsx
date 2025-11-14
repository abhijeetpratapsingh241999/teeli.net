import type { Metadata } from "next";

/**
 * BLOG-SPECIFIC LAYOUT
 * ===================
 * Isolated from global layout for maximum performance optimization.
 * 
 * Performance Features:
 * - System fonts only (no Google Fonts HTTP requests)
 * - Optimized for 90+ PageSpeed score
 * - Reusable for all blog posts automatically
 * 
 * Architecture:
 * - This layout wraps ALL /blog/* routes automatically
 * - New blog posts inherit these optimizations
 * - Completely isolated from homepage/solutions/contact pages
 */

export const metadata: Metadata = {
  // This will be overridden by individual blog posts
  title: "Blog - TEELI.NET",
  description: "Expert insights on 3D rendering, AI, and visualization technology.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
