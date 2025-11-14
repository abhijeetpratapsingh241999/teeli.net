import type { Metadata } from "next";

/**
 * BLOG-SPECIFIC LAYOUT
 * ===================
 * Isolated from global layout for maximum performance optimization.
 * 
 * Performance Features:
 * - System fonts only (no Google Fonts HTTP requests)
 * - Inline critical CSS (instant first paint)
 * - Optimized for 90+ PageSpeed score
 * - Reusable for all blog posts automatically
 * 
 * SEO Features:
 * - Clean metadata structure
 * - Fast loading for better ranking
 * - Mobile-optimized (Core Web Vitals)
 * 
 * Architecture:
 * - This layout wraps ALL /blog/* routes automatically
 * - New blog posts inherit these optimizations
 * - No changes needed for future blogs
 * - Completely isolated from homepage/solutions/contact pages
 * 
 * Why Isolated?
 * - Blog: SEO priority, needs 90+ performance for Google ranking
 * - Homepage: Brand priority, needs beautiful fonts/animations
 * - Zero conflict between the two approaches
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
  return (
    <>
      {/* Blog-specific head optimizations */}
      <head>
        {/* CRITICAL CSS - Blog-specific inline styles for instant render */}
        <style dangerouslySetInnerHTML={{__html: `
          /* Blog Performance Critical CSS */
          *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor}
          html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif}
          body{margin:0;background-color:#000;color:#fff;font-feature-settings:"kern";text-rendering:optimizeLegibility}
          img,svg,video{max-width:100%;height:auto;display:block}
          
          /* Blog-specific optimizations */
          article{max-width:100%;overflow-wrap:break-word}
          p{margin:1em 0}
          a{color:inherit;text-decoration:underline}
        `}} />
      </head>

      {/* Blog content wrapper with system font override */}
      <div 
        className="blog-layout-wrapper"
        style={{
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        }}
      >
        {children}
      </div>
    </>
  );
}
