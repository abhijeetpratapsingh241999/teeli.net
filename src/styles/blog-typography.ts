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
      // Section headings - Blue for light mode, White for dark mode
      sizes: 'text-[28px] sm:text-[32px] md:text-[36px]',
      weight: 'font-bold',
      spacing: 'mb-4 sm:mb-5 mt-[32px] sm:mt-[40px]',
      alignment: 'text-center md:text-left',
      scroll: 'scroll-mt-24',
      colors: {
        light: 'text-blue-700',    // Blue for light mode
        dark: 'text-white',        // White for dark mode
      },
    },
    h3: {
      // Subsection headings - Blue for light mode, White for dark mode
      sizes: 'text-[22px] sm:text-[25px] md:text-[28px]',
      weight: 'font-semibold',
      spacing: 'mb-3 sm:mb-4 mt-[28px]',
      scroll: 'scroll-mt-24',
      colors: {
        light: 'text-blue-600',    // Blue for light mode
        dark: 'text-white',        // White for dark mode
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
      sizes: 'text-[17px] md:text-[19px]',
      spacing: 'mb-2.5 leading-relaxed',
      marker: {
        light: 'marker:text-neutral-700',
        dark: 'marker:text-neutral-300',
      },
      colors: {
        light: 'text-neutral-800',
        dark: 'text-neutral-200',
      },
      // Icon styles for H2 and H3 list items
      icons: {
        h2: {
          color: 'text-red-500',
          size: 'w-6 h-6',
        },
        h3: {
          color: 'text-blue-500',
          size: 'w-5 h-5',
        },
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

  // Spacing Tokens - Consistent vertical rhythm
  spacing: {
    // Section spacing
    section: {
      small: 'my-6 sm:my-8',      // For images, videos, callouts
      medium: 'my-8 sm:my-12',    // For major sections
      large: 'my-12 sm:my-16',    // For article boundaries
    },
    // Content container
    container: {
      padding: 'px-4 sm:px-6 lg:px-8',
      maxWidth: 'max-w-3xl',      // Optimal reading width (700-750px)
    },
  },

  // Line Heights - Optimal readability
  lineHeights: {
    tight: 'leading-tight',       // 1.25 - for headings
    normal: 'leading-normal',     // 1.5 - for body text
    relaxed: 'leading-relaxed',   // 1.625 - for long-form content
    loose: 'leading-loose',       // 2 - for emphasis
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
