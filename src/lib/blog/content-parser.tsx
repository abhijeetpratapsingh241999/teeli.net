import React, { ReactNode } from 'react';
import { BlogH1, BlogH2, BlogH3, BlogListItem } from '@/components/blog/BlogHeadings';
import { OptimizedBlogImage, OptimizedBlogVideo } from '@/components/blog/OptimizedMedia';
import HighlightBox from '@/components/blog/HighlightBox';
import BlogTable from '@/components/blog/ui/BlogTable';
import BlogLink from '@/components/blog/ui/BlogLink';
import BlogCodeBlock from '@/components/blog/ui/BlogCodeBlock';
import BlogQuote from '@/components/blog/ui/BlogQuote';
import { getThemeConfig, BLOG_SPACING, BLOG_TYPOGRAPHY } from '@/lib/blog/theme-config';

export interface ContentParserOptions {
  theme?: 'light' | 'dark';
  enableTables?: boolean;
  enableImages?: boolean;
  enableVideos?: boolean;
  enableHighlights?: boolean;
  enableLinks?: boolean;
  enableCodeBlocks?: boolean;
  enableBlockquotes?: boolean;
  priorityFirstImage?: boolean;
}

/**
 * ContentParser Utility
 * 
 * Parses markdown content and converts it to React components.
 * Handles headings, paragraphs, lists, tables, images, videos, and inline formatting.
 * 
 * @example
 * ```tsx
 * const elements = parseMarkdownContent(post.content, {
 *   theme: 'dark',
 *   enableTables: true,
 *   enableImages: true,
 *   enableHighlights: true
 * });
 * 
 * return <article>{elements}</article>;
 * ```
 */
export function parseMarkdownContent(
  content: string, 
  options: ContentParserOptions = {}
): ReactNode[] {
  const {
    theme = 'dark',
    enableTables = true,
    enableImages = true,
    enableVideos = true,
    enableHighlights = true,
    enableLinks = true,
    enableCodeBlocks = true,
    enableBlockquotes = true,
    priorityFirstImage = true
  } = options;

  const themeConfig = getThemeConfig(theme);
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  
  let key = 0;
  let inTable = false;
  let tableRows: string[] = [];
  let inScript = false;
  let scriptContent: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = '';
  let inBlockquote = false;
  let blockquoteContent: string[] = [];
  let foundH1 = false;
  let isFirstParagraphAfterH1 = false;
  let isFirstImage = true;

  const processLine = (line: string) => {
    const trimmedLine = line.trim();
    
    // Handle empty lines
    if (!trimmedLine) {
      if (!inTable && !inScript && !inCodeBlock && !inBlockquote) {
        elements.push(<br key={key++} />);
      }
      return;
    }

    // Handle code blocks (```)
    if (enableCodeBlocks) {
      if (trimmedLine.startsWith('```')) {
        if (!inCodeBlock) {
          // Start code block
          inCodeBlock = true;
          codeBlockLanguage = trimmedLine.slice(3).trim() || 'text';
          codeBlockContent = [];
        } else {
          // End code block
          elements.push(
            <BlogCodeBlock 
              key={key++}
              code={codeBlockContent.join('\n')}
              language={codeBlockLanguage}
              theme={theme}
              showLineNumbers={codeBlockContent.length > 10}
            />
          );
          inCodeBlock = false;
          codeBlockContent = [];
          codeBlockLanguage = '';
        }
        return;
      }
      
      if (inCodeBlock) {
        codeBlockContent.push(line); // Keep original line with indentation
        return;
      }
    }

    // Handle blockquotes (>)
    if (enableBlockquotes) {
      if (trimmedLine.startsWith('>')) {
        if (!inBlockquote) {
          inBlockquote = true;
          blockquoteContent = [];
        }
        // Remove '>' and trim
        blockquoteContent.push(trimmedLine.slice(1).trim());
        return;
      } else if (inBlockquote) {
        // End of blockquote
        const quoteText = blockquoteContent.join(' ');
        // Check for author attribution (-- Author or - Author)
        const authorMatch = quoteText.match(/^(.+?)(?:--|—)\s*(.+)$/);
        
        if (authorMatch) {
          elements.push(
            <BlogQuote key={key++} author={authorMatch[2].trim()} theme={theme}>
              {authorMatch[1].trim()}
            </BlogQuote>
          );
        } else {
          elements.push(
            <BlogQuote key={key++} theme={theme}>
              {quoteText}
            </BlogQuote>
          );
        }
        
        inBlockquote = false;
        blockquoteContent = [];
        // Don't return, process the current line
      }
    }

    // Handle script tags
    if (trimmedLine.startsWith('<script')) {
      inScript = true;
      scriptContent = [trimmedLine];
      return;
    }
    
    if (inScript) {
      scriptContent.push(trimmedLine);
      if (trimmedLine.includes('</script>')) {
        const fullScript = scriptContent.join('\n');
        elements.push(
          <div key={key++} dangerouslySetInnerHTML={{ __html: fullScript }} />
        );
        inScript = false;
        scriptContent = [];
      }
      return;
    }

    // Handle markdown images and videos
    if (enableImages || enableVideos) {
      const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
        
        if (isVideo && enableVideos) {
          elements.push(
            <OptimizedBlogVideo 
              key={key++}
              src={src}
              className={BLOG_SPACING.video}
            />
          );
        } else if (enableImages) {
          elements.push(
            <OptimizedBlogImage 
              key={key++}
              src={src}
              alt={alt}
              className={BLOG_SPACING.image}
              priority={priorityFirstImage && isFirstImage}
            />
          );
          isFirstImage = false;
        }
        return;
      }
    }

    // Handle tables
    if (enableTables) {
      if (trimmedLine.startsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        tableRows.push(trimmedLine);
        return;
      } else if (inTable) {
        // End of table, render it
        if (tableRows.length > 0) {
          const tableHeaders = tableRows[0].split('|').map(h => h.trim()).filter(h => h);
          const dataRows = tableRows.slice(2).map(row => 
            row.split('|').map(c => c.trim()).filter(c => c)
          );
          
          elements.push(
            <BlogTable 
              key={key++}
              headers={tableHeaders}
              rows={dataRows}
              theme={theme}
            />
          );
        }
        inTable = false;
        tableRows = [];
      }
    }

    // Handle headings
    if (trimmedLine.startsWith('# ')) {
      foundH1 = true;
      elements.push(
        <BlogH1 key={key++} theme={theme}>
          {renderInlineMarkdown(trimmedLine.slice(2))}
        </BlogH1>
      );
    } else if (trimmedLine.startsWith('## ')) {
      elements.push(
        <BlogH2 key={key++} theme={theme}>
          {renderInlineMarkdown(trimmedLine.slice(3))}
        </BlogH2>
      );
    } else if (trimmedLine.startsWith('### ')) {
      elements.push(
        <BlogH3 key={key++} theme={theme}>
          {renderInlineMarkdown(trimmedLine.slice(4))}
        </BlogH3>
      );
    } 
    // Handle bullet lists
    else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      elements.push(
        <BlogListItem key={key++} theme={theme} type="bullet">
          {renderInlineMarkdown(trimmedLine.slice(2))}
        </BlogListItem>
      );
    } 
    // Handle numbered lists
    else if (trimmedLine.match(/^\d+\./)) {
      const match = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
      if (match) {
        const number = match[1];
        const content = match[2];
        elements.push(
          <BlogListItem key={key++} theme={theme} type="number" number={number}>
            {renderInlineMarkdown(content)}
          </BlogListItem>
        );
      }
    } 
    // Handle reference links
    else if (enableLinks && (trimmedLine.match(/^\[\d+\]/) || (trimmedLine.startsWith('(') && trimmedLine.includes('utm_source')))) {
      const urlMatch = trimmedLine.match(/\(([^)]+)\)/);
      if (urlMatch) {
        elements.push(
          <p key={key++} className={`${BLOG_SPACING.paragraph} ${BLOG_TYPOGRAPHY.body}`}>
            <BlogLink href={urlMatch[1]} variant="reference" theme={theme} external>
              {trimmedLine}
            </BlogLink>
          </p>
        );
      }
    } 
    // Skip FAQ sections (handled by FAQAccordion component)
    else if (trimmedLine.startsWith('## FAQ') || trimmedLine.match(/^\*\*[^*]+\?\*\*$/) || trimmedLine.startsWith('---')) {
      return;
    } 
    // Handle paragraphs
    else {
      // Check if this is the first paragraph after H1 (lead paragraph)
      if (enableHighlights && foundH1 && !isFirstParagraphAfterH1 && trimmedLine.length > 0) {
        isFirstParagraphAfterH1 = true;
        elements.push(
          <HighlightBox key={key++} theme={theme} variant="gradient">
            <p className={`leading-relaxed ${BLOG_TYPOGRAPHY.body} ${themeConfig.text.primary}`}>
              {renderInlineMarkdown(trimmedLine)}
            </p>
          </HighlightBox>
        );
      } else {
        elements.push(
          <p key={key++} className={`${BLOG_SPACING.paragraph} leading-relaxed ${BLOG_TYPOGRAPHY.body} ${themeConfig.text.primary}`}>
            {renderInlineMarkdown(trimmedLine)}
          </p>
        );
      }
    }
  };

  // Process all lines
  for (let i = 0; i < lines.length; i++) {
    processLine(lines[i]);
  }

  // Handle any remaining code block
  if (enableCodeBlocks && inCodeBlock && codeBlockContent.length > 0) {
    elements.push(
      <BlogCodeBlock 
        key={key++}
        code={codeBlockContent.join('\n')}
        language={codeBlockLanguage}
        theme={theme}
        showLineNumbers={codeBlockContent.length > 10}
      />
    );
  }

  // Handle any remaining blockquote
  if (enableBlockquotes && inBlockquote && blockquoteContent.length > 0) {
    const quoteText = blockquoteContent.join(' ');
    const authorMatch = quoteText.match(/^(.+?)(?:--|—)\s*(.+)$/);
    
    if (authorMatch) {
      elements.push(
        <BlogQuote key={key++} author={authorMatch[2].trim()} theme={theme}>
          {authorMatch[1].trim()}
        </BlogQuote>
      );
    } else {
      elements.push(
        <BlogQuote key={key++} theme={theme}>
          {quoteText}
        </BlogQuote>
      );
    }
  }

  // Handle any remaining table
  if (enableTables && inTable && tableRows.length > 0) {
    const tableHeaders = tableRows[0].split('|').map(h => h.trim()).filter(h => h);
    const dataRows = tableRows.slice(2).map(row => 
      row.split('|').map(c => c.trim()).filter(c => c)
    );
    
    elements.push(
      <BlogTable 
        key={key++}
        headers={tableHeaders}
        rows={dataRows}
        theme={theme}
      />
    );
  }

  return elements;
}

/**
 * Renders inline markdown formatting (bold, italic, links, code)
 */
export function renderInlineMarkdown(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let key = 0;

  // Handle **bold** text
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before bold
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add bold text
    parts.push(
      <strong key={key++} className="font-bold">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

/**
 * Extract headers from markdown content for Table of Contents
 */
export function extractHeaders(content: string): { level: number; text: string; id: string }[] {
  const lines = content.split('\n');
  const headers: { level: number; text: string; id: string }[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Match H2 (##) and H3 (###)
    if (trimmedLine.startsWith('## ') && !trimmedLine.startsWith('### ')) {
      const text = trimmedLine.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headers.push({ level: 2, text, id });
    } else if (trimmedLine.startsWith('### ')) {
      const text = trimmedLine.slice(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headers.push({ level: 3, text, id });
    }
  }

  return headers;
}
