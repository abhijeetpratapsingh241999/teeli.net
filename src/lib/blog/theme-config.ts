/**
 * Blog Theme Configuration
 * Centralized theme-aware CSS classes for consistent styling across all blog posts
 * 
 * Benefits:
 * - Single source of truth for theme styles
 * - Easy to update colors/styles globally
 * - Reduces code duplication (100+ theme checks removed)
 * - Type-safe with TypeScript
 */

export type BlogTheme = 'dark' | 'light';

export interface ThemeConfig {
  // Background colors
  bg: {
    main: string;
    card: string;
    cardHover: string;
    elevated: string;
  };
  
  // Text colors
  text: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
    heading: string;
    headingH2: string;
    headingH3: string;
  };
  
  // Border colors
  border: {
    primary: string;
    secondary: string;
    accent: string;
  };
  
  // Table styles
  table: {
    card: string;
    header: string;
    headerText: string;
    body: string;
    row: string;
    rowHover: string;
    rowBorder: string;
    cellText: string;
  };
  
  // Interactive elements
  interactive: {
    linkHover: string;
    buttonBg: string;
    buttonText: string;
  };
  
  // Special effects
  effects: {
    shadow: string;
    divider: string;
    gradient: string;
  };
}

/**
 * Complete theme configuration object
 */
export const BLOG_THEME_CONFIG: Record<BlogTheme, ThemeConfig> = {
  dark: {
    bg: {
      main: 'bg-black',
      card: 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-cyan-500/30 shadow-xl shadow-cyan-500/20',
      cardHover: 'hover:shadow-2xl hover:shadow-cyan-500/30',
      elevated: 'bg-gray-900/90 backdrop-blur-xl',
    },
    
    text: {
      primary: 'text-zinc-200',
      secondary: 'text-zinc-300',
      muted: 'text-zinc-500',
      accent: 'text-cyan-400',
      heading: 'text-white',
      headingH2: 'text-cyan-300',
      headingH3: 'text-purple-300',
    },
    
    border: {
      primary: 'border-cyan-500/30',
      secondary: 'border-white/10',
      accent: 'border-purple-500/30',
    },
    
    table: {
      card: 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-cyan-500/30 shadow-xl shadow-cyan-500/20',
      header: 'bg-gradient-to-r from-cyan-900/50 to-purple-900/50',
      headerText: 'text-cyan-300 border-cyan-500/50',
      body: 'bg-gray-900/30',
      row: 'transition-all duration-200',
      rowHover: 'hover:bg-cyan-900/20',
      rowBorder: 'border-b border-white/10',
      cellText: 'text-zinc-200',
    },
    
    interactive: {
      linkHover: 'hover:text-cyan-300',
      buttonBg: 'bg-gradient-to-r from-cyan-600 to-purple-600',
      buttonText: 'text-white',
    },
    
    effects: {
      shadow: 'shadow-lg shadow-cyan-500/30',
      divider: 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent',
      gradient: 'bg-gradient-to-r from-cyan-500 to-purple-600',
    },
  },
  
  light: {
    bg: {
      main: 'bg-white',
      card: 'bg-white border border-gray-200 shadow-lg',
      cardHover: 'hover:shadow-xl',
      elevated: 'bg-white backdrop-blur-xl',
    },
    
    text: {
      primary: 'text-gray-800',
      secondary: 'text-gray-700',
      muted: 'text-gray-400',
      accent: 'text-blue-600',
      heading: 'text-gray-900',
      headingH2: 'text-blue-900',
      headingH3: 'text-blue-800',
    },
    
    border: {
      primary: 'border-gray-200',
      secondary: 'border-gray-200/70',
      accent: 'border-blue-300',
    },
    
    table: {
      card: 'bg-white border border-gray-200 shadow-lg',
      header: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      headerText: 'text-blue-900 border-blue-400',
      body: 'bg-white',
      row: 'transition-all duration-200',
      rowHover: 'hover:bg-blue-50/60',
      rowBorder: 'border-b border-gray-200/70',
      cellText: 'text-gray-700',
    },
    
    interactive: {
      linkHover: 'hover:text-blue-700',
      buttonBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      buttonText: 'text-white',
    },
    
    effects: {
      shadow: 'shadow-lg shadow-gray-300',
      divider: 'bg-gradient-to-r from-transparent via-blue-500 to-transparent',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    },
  },
};

/**
 * Helper function to get theme configuration
 * @param theme - Current theme ('dark' or 'light')
 * @returns ThemeConfig object for the specified theme
 */
export function getThemeConfig(theme: BlogTheme): ThemeConfig {
  return BLOG_THEME_CONFIG[theme];
}

/**
 * Helper function to conditionally apply theme classes
 * Useful for one-off theme-specific styling
 */
export function themeClass(theme: BlogTheme, darkClass: string, lightClass: string): string {
  return theme === 'dark' ? darkClass : lightClass;
}

/**
 * Common responsive spacing utilities for blog posts
 * Industry-standard vertical rhythm for optimal readability
 * Based on Medium, Substack, and typographic best practices
 */
export const BLOG_SPACING = {
  // Vertical spacing (margin-bottom for stacking)
  section: 'mb-12 sm:mb-16 md:mb-20',           // Large sections (48-80px)
  subsection: 'mb-8 sm:mb-10 md:mb-12',         // Subsections (32-48px)
  paragraph: 'mb-5 sm:mb-6 md:mb-7',            // Paragraphs (20-28px)
  list: 'mb-4 sm:mb-5 md:mb-6',                 // List items (16-24px)
  
  // Heading spacing (margin-top + margin-bottom)
  h1: 'mt-0 mb-6 sm:mb-8 md:mb-10',             // H1: 0 top, 24-40px bottom
  h2: 'mt-10 sm:mt-12 md:mt-14 mb-4 sm:mb-5 md:mb-6',  // H2: 40-56px top, 16-24px bottom (reduced for better flow)
  h3: 'mt-6 sm:mt-7 md:mt-8 mb-3 sm:mb-4 md:mb-5',     // H3: 24-32px top, 12-20px bottom (reduced for continuity)
  h4: 'mt-5 sm:mt-6 md:mt-7 mb-3 sm:mb-3 md:mb-4',     // H4: 20-28px top, 12-16px bottom
  
  // Media spacing
  image: 'my-8 sm:my-10 md:my-12',              // Images: 32-48px vertical
  video: 'my-8 sm:my-10 md:my-12',              // Videos: 32-48px vertical
  table: 'my-8 sm:my-10 md:my-12',              // Tables: 32-48px vertical
  codeBlock: 'my-6 sm:my-7 md:my-8',            // Code: 24-32px vertical
  quote: 'my-6 sm:my-7 md:my-8',                // Quotes: 24-32px vertical
  
  // Horizontal spacing (for inline elements)
  inline: 'mx-1',                                // Inline elements: 4px
  inlineBlock: 'mx-2',                           // Inline blocks: 8px
  
  // Special cases
  firstElement: 'mt-0',                          // First element: no top margin
  lastElement: 'mb-0',                           // Last element: no bottom margin
};

/**
 * Typography scale for consistent font sizes
 * Based on 1.25 ratio (Major Third) - industry standard
 */
export const BLOG_TYPOGRAPHY = {
  // Headings with optimal line-height
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
  h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight',
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug',
  h4: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-snug',
  h5: 'text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-normal',
  h6: 'text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-normal',
  
  // Body text with optimal line-height for readability
  body: 'text-base sm:text-lg md:text-xl leading-relaxed',      // 1.65 line-height
  bodyLarge: 'text-lg sm:text-xl md:text-2xl leading-relaxed',
  bodySmall: 'text-sm sm:text-base md:text-lg leading-relaxed',
  
  // Special text styles
  lead: 'text-xl sm:text-2xl md:text-3xl leading-relaxed font-light',  // Intro paragraphs
  caption: 'text-xs sm:text-sm md:text-base leading-normal',            // Image captions
  quote: 'text-lg sm:text-xl md:text-2xl leading-relaxed font-light italic',
  
  // Code text
  code: 'text-sm sm:text-base md:text-lg font-mono leading-normal',
  codeInline: 'text-sm font-mono',
};

/**
 * Transition classes for smooth animations
 */
export const BLOG_TRANSITIONS = {
  default: 'transition-all duration-300',
  fast: 'transition-all duration-200',
  slow: 'transition-all duration-500',
  colors: 'transition-colors duration-300',
};

/**
 * Border radius utilities
 */
export const BLOG_RADIUS = {
  small: 'rounded-lg',
  medium: 'rounded-xl sm:rounded-2xl',
  large: 'rounded-2xl sm:rounded-3xl',
  full: 'rounded-full',
};

/**
 * Z-index layers for consistent stacking
 */
export const BLOG_Z_INDEX = {
  header: 'z-50',
  navigation: 'z-40',
  content: 'z-10',
  background: 'z-0',
};
