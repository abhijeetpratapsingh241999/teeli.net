/**
 * RSS feed generation utilities
 * Generates RSS 2.0 feed for blog posts
 */

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  author?: string;
  categories?: string[];
}

export interface RSSChannel {
  title: string;
  link: string;
  description: string;
  language?: string;
  lastBuildDate?: string;
  items: RSSItem[];
}

/**
 * Generate RSS 2.0 feed
 */
export function generateRSS(channel: RSSChannel): string {
  const items = channel.items.map(item => {
    const categories = item.categories 
      ? item.categories.map(cat => `
    <category>${escapeXml(cat)}</category>`).join('')
      : '';

    return `
  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${escapeXml(item.link)}</link>
    <description><![CDATA[${item.description}]]></description>
    <pubDate>${item.pubDate}</pubDate>
    <guid isPermaLink="true">${escapeXml(item.guid)}</guid>${
      item.author ? `
    <author>${escapeXml(item.author)}</author>` : ''
    }${categories}
  </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${escapeXml(channel.link)}</link>
    <description>${escapeXml(channel.description)}</description>${
      channel.language ? `
    <language>${channel.language}</language>` : ''
    }${
      channel.lastBuildDate ? `
    <lastBuildDate>${channel.lastBuildDate}</lastBuildDate>` : ''
    }
    <atom:link href="${escapeXml(channel.link)}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

/**
 * Escape special XML characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Format date for RSS (RFC 822 format)
 */
export function formatRSSDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toUTCString();
}

/**
 * Generate RSS feed for blog posts
 */
export function generateBlogRSS(
  posts: Array<{
    slug: string;
    title: string;
    description: string;
    date?: string;
    tags?: string[];
  }>,
  config: {
    baseUrl: string;
    title: string;
    description: string;
    author?: string;
  }
): string {
  const items: RSSItem[] = posts.map(post => ({
    title: post.title,
    link: `${config.baseUrl}/blog/${post.slug}`,
    description: post.description,
    pubDate: formatRSSDate(post.date || new Date()),
    guid: `${config.baseUrl}/blog/${post.slug}`,
    author: config.author,
    categories: post.tags
  }));

  return generateRSS({
    title: config.title,
    link: config.baseUrl,
    description: config.description,
    language: 'en-us',
    lastBuildDate: formatRSSDate(new Date()),
    items
  });
}
