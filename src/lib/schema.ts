/**
 * Schema.org structured data utilities
 * Generates JSON-LD for blog posts and pages
 */

export interface BlogPostingSchema {
  slug: string;
  title: string;
  description: string;
  publishedDate?: string;
  modifiedDate?: string;
  author?: {
    name: string;
    url?: string;
  };
  image?: string;
  tags?: string[];
}

/**
 * Generate BlogPosting schema for a blog post
 */
export function generateBlogPostingSchema(
  post: BlogPostingSchema,
  config: {
    baseUrl: string;
    siteName: string;
  }
): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${config.baseUrl}/blog/${post.slug}`,
    datePublished: post.publishedDate || new Date().toISOString(),
    dateModified: post.modifiedDate || post.publishedDate || new Date().toISOString(),
    author: post.author ? {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url
    } : {
      '@type': 'Organization',
      name: config.siteName
    },
    publisher: {
      '@type': 'Organization',
      name: config.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${config.baseUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${config.baseUrl}/blog/${post.slug}`
    }
  };

  // Add image if provided
  if (post.image) {
    schema.image = {
      '@type': 'ImageObject',
      url: post.image.startsWith('http') ? post.image : `${config.baseUrl}${post.image}`
    };
  }

  // Add keywords if tags provided
  if (post.tags && post.tags.length > 0) {
    schema.keywords = post.tags.join(', ');
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  baseUrl: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema(config: {
  baseUrl: string;
  siteName: string;
  searchUrl: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    url: config.baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${config.searchUrl}?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate Blog schema
 */
export function generateBlogSchema(config: {
  baseUrl: string;
  siteName: string;
  description: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${config.siteName} Blog`,
    description: config.description,
    url: `${config.baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: config.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${config.baseUrl}/logo.png`
      }
    }
  };
}

/**
 * Generate VideoObject schema for video content
 */
export interface VideoObjectSchema {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
  embedUrl?: string;
}

export function generateVideoObjectSchema(
  video: VideoObjectSchema,
  config: {
    baseUrl: string;
    siteName: string;
  }
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl.startsWith('http') ? video.thumbnailUrl : `${config.baseUrl}${video.thumbnailUrl}`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl || video.contentUrl,
    publisher: {
      '@type': 'Organization',
      name: config.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${config.baseUrl}/logo.png`
      }
    }
  };
}

/**
 * Generate FAQPage schema for FAQ sections
 */
export interface FAQSchema {
  question: string;
  answer: string;
}

export function generateFAQPageSchema(faqs: FAQSchema[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Convert schema to JSON-LD script tag
 */
export function schemaToJsonLd(schema: object): string {
  return JSON.stringify(schema, null, 2);
}
