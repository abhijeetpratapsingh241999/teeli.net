/**
 * Sitemap generation utilities
 * Generates XML sitemap for blog posts and pages
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate XML sitemap from URLs
 */
export function generateSitemap(urls: SitemapUrl[]): string {
  const urlEntries = urls.map(url => {
    return `
  <url>
    <loc>${escapeXml(url.loc)}</loc>${
      url.lastmod ? `
    <lastmod>${url.lastmod}</lastmod>` : ''
    }${
      url.changefreq ? `
    <changefreq>${url.changefreq}</changefreq>` : ''
    }${
      url.priority !== undefined ? `
    <priority>${url.priority.toFixed(1)}</priority>` : ''
    }
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
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
 * Format date for sitemap (W3C datetime format)
 */
export function formatSitemapDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

/**
 * Generate sitemap for blog posts
 */
export function generateBlogSitemap(
  posts: Array<{
    slug: string;
    lastModified?: string;
    date?: string;
  }>,
  baseUrl: string
): string {
  const urls: SitemapUrl[] = posts.map(post => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: formatSitemapDate(post.lastModified || post.date || new Date()),
    changefreq: 'weekly',
    priority: 0.8
  }));

  // Add blog index page
  urls.unshift({
    loc: `${baseUrl}/blog`,
    changefreq: 'daily',
    priority: 1.0
  });

  // Add blog category pages
  urls.push(
    {
      loc: `${baseUrl}/blog/popular`,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/blog/topics`,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/blog/tags`,
      changefreq: 'weekly',
      priority: 0.7
    }
  );

  return generateSitemap(urls);
}
