import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string[];
  author?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}

export const defaultMeta = {
  title: 'TEELI.NET - AI-Powered Cloud Rendering & 3D Visualization Platform',
  description: 'Transform your architectural designs with TEELI\'s AI-powered cloud rendering. Instant 3D visualization, sustainable GPU infrastructure, and blazing-fast rendering for AEC professionals.',
  image: 'https://teeli.net/logos/teeli-og.png',
  url: 'https://teeli.net',
  keywords: [
    'AI rendering',
    'cloud rendering',
    '3D visualization',
    'architectural rendering',
    'GPU cloud',
    'image to 3D',
    'digital twins',
    'sustainable rendering',
    'AEC industry',
    'BIM visualization',
  ],
  author: 'TEELI Team',
};

/**
 * Generate comprehensive SEO metadata for Next.js pages
 * Includes OpenGraph, Twitter Cards, and canonical URLs
 */
export function generateMeta(config: Partial<SEOConfig>): Metadata {
  const {
    title = defaultMeta.title,
    description = defaultMeta.description,
    image = defaultMeta.image,
    url = defaultMeta.url,
    keywords = defaultMeta.keywords,
    author = defaultMeta.author,
    type = 'website',
    publishedTime,
    modifiedTime,
    section,
  } = config;

  const fullTitle = title.includes('TEELI') ? title : `${title} | TEELI.NET`;
  const canonicalUrl = url || defaultMeta.url;

  return {
    title: fullTitle,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    authors: author ? [{ name: author }] : [{ name: defaultMeta.author }],
    creator: defaultMeta.author,
    publisher: 'TEELI.NET',
    
    // OpenGraph
    openGraph: {
      type: type,
      locale: 'en_US',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: 'TEELI.NET',
      images: [
        {
          url: image || defaultMeta.image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime,
        section,
        authors: [author || defaultMeta.author],
      }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@teeli_net',
      site: '@teeli_net',
      images: [image || defaultMeta.image],
    },

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  };
}

/**
 * Generate blog-specific metadata with article schema
 */
export function generateBlogMeta(config: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  author?: string;
  publishedTime: string;
  modifiedTime?: string;
  category?: string;
  tags?: string[];
}): Metadata {
  return generateMeta({
    title: config.title,
    description: config.description,
    image: config.image,
    url: `https://teeli.net/blog/${config.slug}`,
    author: config.author,
    type: 'article',
    publishedTime: config.publishedTime,
    modifiedTime: config.modifiedTime || config.publishedTime,
    section: config.category,
    keywords: config.tags || [],
  });
}
