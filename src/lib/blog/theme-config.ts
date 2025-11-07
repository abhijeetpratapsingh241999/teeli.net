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
 */
export const BLOG_SPACING = {
  section: 'mb-8 sm:mb-10 md:mb-12',
  paragraph: 'mb-3 sm:mb-4 md:mb-5',
  heading: 'mb-4 sm:mb-5 md:mb-6',
  media: 'my-6 sm:my-8',
  largeSection: 'my-8 sm:my-10 md:my-12',
};

/**
 * Typography scale for consistent font sizes
 */
export const BLOG_TYPOGRAPHY = {
  h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-6xl',
  h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  body: 'text-base sm:text-lg md:text-xl',
  small: 'text-sm sm:text-base',
  tiny: 'text-xs sm:text-sm',
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
