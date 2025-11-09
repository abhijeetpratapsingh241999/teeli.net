/**
 * Centralized Blog Typography Configuration
 * All blog heading styles, colors, and fonts are defined here for reusability
 */

export const blogTypography = {
  // Font Family - Optimized for readability
  // Using system fonts for light, eye-catching, and fast loading
  fonts: {
    heading: 'font-sans',    // System fonts: clean, modern, highly readable
    body: 'font-sans',       // Consistent with headings, optimized for reading
  },

  // Heading Styles - Reusable across all blog posts
  headings: {
    h1: {
      // Main blog post title
      sizes: 'text-[32px] sm:text-[38px] md:text-[44px]',
      weight: 'font-bold',
      spacing: 'tracking-tight mb-4 sm:mb-6 mt-8 sm:mt-12',
      alignment: 'text-center md:text-left',
      colors: {
        light: 'text-gray-900',
        dark: 'text-white',
      },
    },
    h2: {
      // Section headings - Dark Blue
      sizes: 'text-[28px] sm:text-[32px] md:text-[36px]',
      weight: 'font-semibold',
      spacing: 'mb-3 sm:mb-4 mt-[32px] sm:mt-[40px]',
      alignment: 'text-center md:text-left',
      scroll: 'scroll-mt-24',
      colors: {
        light: 'text-blue-800',    // Dark blue for light mode
        dark: 'text-blue-400',      // Bright blue for dark mode
      },
    },
    h3: {
      // Subsection headings - Dark Blue (lighter than H2)
      sizes: 'text-[22px] sm:text-[25px] md:text-[28px]',
      weight: 'font-semibold',
      spacing: 'mb-2 sm:mb-3 mt-[28px]',
      scroll: 'scroll-mt-24',
      colors: {
        light: 'text-blue-700',    // Medium blue for light mode
        dark: 'text-blue-300',      // Light blue for dark mode
      },
    },
  },

  // Body Text Styles
  body: {
    paragraph: {
      sizes: 'text-base md:text-[18px]',
      spacing: 'mb-[24px] leading-relaxed',
      colors: {
        light: 'text-neutral-800',
        dark: 'text-neutral-200',
      },
    },
    list: {
      sizes: 'text-base md:text-[18px]',
      spacing: 'ml-5 mb-[10px] leading-relaxed',
      marker: {
        light: 'marker:text-neutral-700',
        dark: 'marker:text-neutral-300',
      },
      colors: {
        light: 'text-neutral-800',
        dark: 'text-neutral-200',
      },
    },
  },

  // Link Styles
  links: {
    colors: {
      light: 'text-blue-700 hover:text-blue-900',
      dark: 'text-blue-400 hover:text-blue-300',
    },
    decoration: 'underline decoration-blue-500/30 hover:decoration-blue-500',
  },

  // Code Blocks
  code: {
    inline: {
      colors: {
        light: 'bg-gray-100 text-gray-800',
        dark: 'bg-gray-800 text-gray-200',
      },
      padding: 'px-1.5 py-0.5 rounded',
      font: 'font-mono text-sm',
    },
  },
};

/**
 * Helper function to get heading class string
 * @param level - Heading level (h1, h2, h3)
 * @param theme - Current theme (light/dark)
 * @returns Complete className string
 */
export function getHeadingClasses(
  level: 'h1' | 'h2' | 'h3',
  theme: 'light' | 'dark'
): string {
  const heading = blogTypography.headings[level];
  const colorClass = theme === 'dark' ? heading.colors.dark : heading.colors.light;

  const baseClasses = [
    blogTypography.fonts.heading,
    heading.sizes,
    heading.weight,
    heading.spacing,
    colorClass,
  ];

  // Add optional classes
  if ('alignment' in heading && heading.alignment) baseClasses.push(heading.alignment);
  if ('scroll' in heading && heading.scroll) baseClasses.push(heading.scroll);

  return baseClasses.join(' ');
}

/**
 * Helper function to get body text class string
 * @param type - Text type (paragraph, list)
 * @param theme - Current theme (light/dark)
 * @returns Complete className string
 */
export function getBodyClasses(
  type: 'paragraph' | 'list',
  theme: 'light' | 'dark'
): string {
  const body = blogTypography.body[type];
  const colorClass = theme === 'dark' ? body.colors.dark : body.colors.light;
  const markerClass = type === 'list' && 'marker' in body
    ? (theme === 'dark' ? body.marker.dark : body.marker.light)
    : '';

  return [body.sizes, body.spacing, colorClass, markerClass]
    .filter(Boolean)
    .join(' ');
}

/**
 * Helper function to get link class string
 * @param theme - Current theme (light/dark)
 * @returns Complete className string
 */
export function getLinkClasses(theme: 'light' | 'dark'): string {
  const link = blogTypography.links;
  const colorClass = theme === 'dark' ? link.colors.dark : link.colors.light;

  return [colorClass, link.decoration].join(' ');
}
