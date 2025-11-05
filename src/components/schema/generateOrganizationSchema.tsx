/**
 * Generate Organization Schema (JSON-LD) for company information
 * Helps Google understand your business better
 */
export interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[]; // Social media profiles
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
}

export function generateOrganizationSchema(props: OrganizationSchemaProps): object {
  const {
    name,
    url,
    logo,
    description,
    sameAs = [],
    contactPoint,
  } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name,
    url: url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description: description,
    sameAs: sameAs,
    contactPoint: contactPoint ? {
      '@type': 'ContactPoint',
      telephone: contactPoint.telephone,
      contactType: contactPoint.contactType || 'customer service',
      email: contactPoint.email,
    } : undefined,
  };
}

/**
 * Component wrapper for Organization Schema
 */
export function OrganizationSchema(props: OrganizationSchemaProps) {
  const schema = generateOrganizationSchema(props);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
