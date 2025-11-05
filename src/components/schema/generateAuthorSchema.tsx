/**
 * Author Schema Generator for Google E-E-A-T Signals
 * Establishes authorship credibility and expertise
 */

interface AuthorSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  url?: string;
  sameAs?: string[]; // Social media profiles
  worksFor?: {
    name: string;
    url: string;
  };
}

export function generateAuthorSchema(props: AuthorSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: props.name,
    jobTitle: props.jobTitle,
    description: props.description,
    image: props.image,
    url: props.url,
    sameAs: props.sameAs,
    worksFor: props.worksFor ? {
      '@type': 'Organization',
      name: props.worksFor.name,
      url: props.worksFor.url
    } : undefined
  };
}

// React Component Wrapper
export function AuthorSchema(props: AuthorSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateAuthorSchema(props))
      }}
    />
  );
}
