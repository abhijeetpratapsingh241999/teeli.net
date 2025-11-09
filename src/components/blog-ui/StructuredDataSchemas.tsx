"use client";

import { useEffect } from 'react';
import { BlogPost } from '@/lib/blog';
import { generateAllSchemas } from '@/lib/seo-schema';

interface StructuredDataSchemasProps {
  post: BlogPost;
}

export default function StructuredDataSchemas({ post }: StructuredDataSchemasProps) {
  useEffect(() => {
    // Generate schemas and inject them into the document head
    const schemas = generateAllSchemas(post);
    const scriptElements: HTMLScriptElement[] = [];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      script.id = `schema-${index}-${post.slug}`;
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    // Cleanup: remove scripts when component unmounts
    return () => {
      scriptElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [post]);

  // This component renders nothing visible
  return null;
}
