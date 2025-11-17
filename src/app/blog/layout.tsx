import { BlogThemeProvider } from '@/components/BlogThemeProvider';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogFooter from '@/components/blog/BlogFooter';
import BlogLayoutClient from './BlogLayoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "TEELI.NET Blog - 3D Rendering, AI & Architecture Insights",
    template: "%s | TEELI.NET Blog"
  },
  description: "Expert insights on 3D rendering, AI, cloud computing, and architectural visualization. Learn from industry professionals.",
  keywords: ["3D rendering", "AI", "architecture", "visualization", "cloud computing", "machine learning"],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://teeli.net/blog',
    siteName: 'TEELI.NET Blog',
    title: 'TEELI.NET Blog - 3D Rendering & AI Insights',
    description: 'Expert insights on 3D rendering, AI, and architectural visualization',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEELI.NET Blog',
    description: 'Expert insights on 3D rendering, AI, and architectural visualization',
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BlogThemeProvider>
      <BlogHeader />
      <main className="blog-layout-main">
        {children}
      </main>
      <BlogLayoutClient />
    </BlogThemeProvider>
  );
}
