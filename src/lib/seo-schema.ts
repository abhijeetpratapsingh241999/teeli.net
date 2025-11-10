import { BlogPost, FAQItem } from './blog';
import { extractVideosFromContent, VideoInfo } from './extract-video';

// Extract keywords from content headings
export function extractKeywords(content: string): string[] {
  const keywords: string[] = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const trimmed = line.trim();
    // Extract from H2 and H3 headings
    if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      const heading = trimmed.replace(/^#{2,3}\s+/, '').replace(/[^\w\s]/g, '');
      const words = heading.split(/\s+/).filter(w => w.length > 3);
      keywords.push(...words);
    }
  });
  
  // Return unique keywords, limit to 10
  return [...new Set(keywords)].slice(0, 10);
}

// Count words in content
export function countWords(content: string): number {
  return content.split(/\s+/).filter(word => word.length > 0).length;
}

// Detect if table describes a process/workflow
export function isProcessTable(tableContent: string): boolean {
  const processKeywords = ['step', 'process', 'workflow', 'phase', 'stage', 'procedure'];
  const lowerContent = tableContent.toLowerCase();
  return processKeywords.some(keyword => lowerContent.includes(keyword));
}

// Extract table data from markdown content
interface TableData {
  headers: string[];
  rows: string[][];
  isProcess: boolean;
}

export function extractTables(content: string): TableData[] {
  const tables: TableData[] = [];
  const lines = content.split('\n');
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Detect table header (| Header1 | Header2 |)
    if (line.startsWith('|') && line.endsWith('|')) {
      const headers = line
        .split('|')
        .slice(1, -1)
        .map(h => h.trim())
        .filter(h => h.length > 0);
      
      i++;
      
      // Skip separator line (|---|---|)
      if (i < lines.length && lines[i].includes('---')) {
        i++;
      }
      
      // Extract rows
      const rows: string[][] = [];
      while (i < lines.length) {
        const rowLine = lines[i].trim();
        if (!rowLine.startsWith('|')) break;
        
        const cells = rowLine
          .split('|')
          .slice(1, -1)
          .map(c => c.trim())
          .filter(c => c.length > 0);
        
        if (cells.length > 0) {
          rows.push(cells);
        }
        i++;
      }
      
      if (headers.length > 0 && rows.length > 0) {
        const tableContent = headers.join(' ') + ' ' + rows.flat().join(' ');
        tables.push({
          headers,
          rows,
          isProcess: isProcessTable(tableContent)
        });
      }
    } else {
      i++;
    }
  }
  
  return tables;
}

// Generate Article schema
export function generateArticleSchema(post: BlogPost, canonicalUrl: string) {
  const keywords = extractKeywords(post.content || '');
  const wordCount = countWords(post.content || '');
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image ? `https://teeli.net${post.image}` : undefined,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole || "Technical Writer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TEELI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://teeli.net/logos/teeli-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "url": canonicalUrl,
    "articleSection": post.category,
    "keywords": keywords.join(', '),
    "wordCount": wordCount,
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };
}

// Generate FAQPage schema
export function generateFAQSchema(faqItems: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

// Generate HowTo schema for process tables
export function generateHowToSchema(table: TableData, postTitle: string) {
  const steps = table.rows.map((row, index) => {
    const stepName = row[0] || `Step ${index + 1}`;
    const stepDescription = row.slice(1).join(' ') || stepName;
    
    return {
      "@type": "HowToStep",
      "position": index + 1,
      "name": stepName,
      "text": stepDescription,
      "url": `#step-${index + 1}`
    };
  });
  
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": postTitle,
    "step": steps,
    "totalTime": "PT30M", // Default 30 minutes
    "supply": [],
    "tool": []
  };
}

// Generate Dataset schema for data tables
export function generateDatasetSchema(table: TableData, postTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${postTitle} - Data Table`,
    "description": `Tabular data from ${postTitle}`,
    "variableMeasured": table.headers.map(header => ({
      "@type": "PropertyValue",
      "name": header
    })),
    "distribution": {
      "@type": "DataDownload",
      "encodingFormat": "text/html"
    }
  };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://teeli.net"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://teeli.net/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://teeli.net/blog/${post.slug}`
      }
    ]
  };
}

// Generate VideoObject schema for hero videos
export function generateVideoObjectSchema(post: BlogPost, canonicalUrl: string) {
  if (!post.videoMetadata) return null;
  
  const video = post.videoMetadata;
  const videoUrl = video.url.startsWith('http') 
    ? video.url 
    : `https://teeli.net${video.url}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title || post.title,
    "description": video.description || post.excerpt,
    "thumbnailUrl": video.thumbnailUrl 
      ? (video.thumbnailUrl.startsWith('http') 
          ? video.thumbnailUrl 
          : `https://teeli.net${video.thumbnailUrl}`)
      : post.image 
        ? `https://teeli.net${post.image}` 
        : undefined,
    "uploadDate": video.uploadDate || post.date,
    "duration": video.duration || "PT7S", // Default 7 seconds
    "contentUrl": videoUrl,
    "embedUrl": videoUrl,
    "publisher": {
      "@type": "Organization",
      "name": "TEELI.NET",
      "logo": {
        "@type": "ImageObject",
        "url": "https://teeli.net/logos/teeli-logo.png"
      }
    },
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };
}

// Generate VideoObject schema for content videos (auto-detected)
export function generateContentVideoSchemas(post: BlogPost, canonicalUrl: string): SchemaObject[] {
  if (!post.content) return [];
  
  const videos = extractVideosFromContent(post.content);
  
  if (videos.length === 0) return [];
  
  const schemas: SchemaObject[] = [];
  
  videos.forEach((video: VideoInfo) => {
    const videoUrl = video.url.startsWith('http') 
      ? video.url 
      : `https://teeli.net${video.url}`;
    
    const embedUrl = video.embedUrl.startsWith('http')
      ? video.embedUrl
      : `https://teeli.net${video.embedUrl}`;
    
    // Extract first 160 chars from content for description
    const contentText = post.content!.replace(/#+ /g, '').replace(/[*_`]/g, '');
    const first160Chars = contentText.substring(0, 160).trim() + '...';
    
    schemas.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": post.title,
      "description": post.metaDescription || first160Chars,
      "thumbnailUrl": video.thumbnailUrl 
        ? (video.thumbnailUrl.startsWith('http') 
            ? video.thumbnailUrl 
            : `https://teeli.net${video.thumbnailUrl}`)
        : "https://teeli.net/blog/video-thumbnail-default.webp",
      "uploadDate": post.date,
      "duration": video.duration || "PT3M",
      "contentUrl": videoUrl,
      "embedUrl": embedUrl,
      "publisher": {
        "@type": "Organization",
        "name": "TEELI.NET",
        "logo": {
          "@type": "ImageObject",
          "url": "https://teeli.net/logos/teeli-logo.png"
        }
      },
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    });
  });
  
  return schemas;
}

// Schema type for JSON-LD
type SchemaObject = Record<string, unknown>;

// Generate all schemas for a blog post
export function generateAllSchemas(post: BlogPost) {
  const canonicalUrl = `https://teeli.net/blog/${post.slug}`;
  const schemas: SchemaObject[] = [];
  
  // 1. Article schema (always)
  schemas.push(generateArticleSchema(post, canonicalUrl));
  
  // 2. Breadcrumb schema (always)
  schemas.push(generateBreadcrumbSchema(post));
  
  // 3. VideoObject schema (if hero video exists)
  if (post.heroVideo && post.videoMetadata) {
    const videoSchema = generateVideoObjectSchema(post, canonicalUrl);
    if (videoSchema) {
      schemas.push(videoSchema);
    }
  }
  
  // 4. Content video schemas (auto-detected from markdown)
  if (post.content) {
    const contentVideoSchemas = generateContentVideoSchemas(post, canonicalUrl);
    schemas.push(...contentVideoSchemas);
  }
  
  // 5. FAQ schema (if FAQ exists)
  if (post.faq && post.faq.length > 0) {
    schemas.push(generateFAQSchema(post.faq));
  }
  
  // 6. Table schemas (HowTo or Dataset)
  if (post.content) {
    const tables = extractTables(post.content);
    tables.forEach(table => {
      if (table.isProcess) {
        schemas.push(generateHowToSchema(table, post.title));
      } else {
        schemas.push(generateDatasetSchema(table, post.title));
      }
    });
  }
  
  return schemas;
}
