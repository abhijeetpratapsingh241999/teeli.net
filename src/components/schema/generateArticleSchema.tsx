/**
 * Generate Article Schema (JSON-LD) for blog posts
 * Improves SEO and enables rich snippets in search results
 */
export interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  category?: string;
  keywords?: string[];
}

export function generateArticleSchema(props: ArticleSchemaProps): object {
  const {
    title,
    description,
    url,
    image,
    author,
    publishedTime,
    modifiedTime,
    category,
    keywords = [],
  } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || 'https://teeli.net/logos/teeli-og.png',
    url: url,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TEELI.NET',
      logo: {
        '@type': 'ImageObject',
        url: 'https://teeli.net/logos/teeli-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: category,
    keywords: keywords.join(', '),
  };
}

/**
 * Component wrapper for Article Schema
 */
export function ArticleSchema(props: ArticleSchemaProps) {
  const schema = generateArticleSchema(props);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
