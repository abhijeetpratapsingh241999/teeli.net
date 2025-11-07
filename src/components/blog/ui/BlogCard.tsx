import React, { ReactNode } from 'react';
import { getThemeConfig, BLOG_SPACING, BLOG_RADIUS } from '@/lib/blog/theme-config';

interface BlogCardProps {
  children: ReactNode;
  variant?: 'default' | 'feature' | 'highlight' | 'info' | 'warning' | 'success';
  theme?: 'light' | 'dark';
  className?: string;
  title?: string;
  icon?: ReactNode;
}

/**
 * BlogCard Component
 * 
 * Reusable card component for various content layouts.
 * Supports multiple variants with different styling and use cases.
 * 
 * @example
 * ```tsx
 * // Default card
 * <BlogCard theme={theme}>
 *   <p>Card content here</p>
 * </BlogCard>
 * 
 * // Feature card with icon
 * <BlogCard variant="feature" title="Key Feature" icon={<IconComponent />}>
 *   <p>Feature description</p>
 * </BlogCard>
 * 
 * // Info/Warning cards
 * <BlogCard variant="info" title="Important Note">
 *   <p>Information content</p>
 * </BlogCard>
 * ```
 */
export default function BlogCard({ 
  children, 
  variant = 'default',
  theme = 'dark',
  className = '',
  title,
  icon
}: BlogCardProps) {
  const themeConfig = getThemeConfig(theme);

  // Get variant-specific styles
  const getVariantStyles = () => {
    const baseStyles = `relative ${BLOG_RADIUS.medium} p-6 sm:p-8 backdrop-blur-md border-2 transition-all duration-300`;
    
    switch (variant) {
      case 'feature':
        return `${baseStyles} ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border-cyan-500/30 hover:border-cyan-400/50'
            : 'bg-gradient-to-br from-cyan-50 to-purple-50 border-cyan-500/40 hover:border-cyan-600/60 shadow-lg'
        } hover:shadow-2xl hover:scale-[1.02]`;
      
      case 'highlight':
        return `${baseStyles} ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-cyan-500/40'
            : 'bg-gradient-to-r from-cyan-100 to-purple-100 border-cyan-500/50 shadow-md'
        }`;
      
      case 'info':
        return `${baseStyles} ${
          theme === 'dark'
            ? 'bg-blue-950/30 border-blue-500/40'
            : 'bg-blue-50 border-blue-500/50 shadow-md'
        }`;
      
      case 'warning':
        return `${baseStyles} ${
          theme === 'dark'
            ? 'bg-yellow-950/30 border-yellow-500/40'
            : 'bg-yellow-50 border-yellow-500/50 shadow-md'
        }`;
      
      case 'success':
        return `${baseStyles} ${
          theme === 'dark'
            ? 'bg-green-950/30 border-green-500/40'
            : 'bg-green-50 border-green-500/50 shadow-md'
        }`;
      
      case 'default':
      default:
        return `${baseStyles} ${themeConfig.table.card} ${themeConfig.border.secondary}`;
    }
  };

  // Get icon color based on variant
  const getIconColor = () => {
    switch (variant) {
      case 'feature':
        return 'text-cyan-400';
      case 'highlight':
        return 'text-purple-400';
      case 'info':
        return 'text-blue-400';
      case 'warning':
        return 'text-yellow-400';
      case 'success':
        return 'text-green-400';
      default:
        return themeConfig.text.accent;
    }
  };

  return (
    <div className={`${getVariantStyles()} ${BLOG_SPACING.section} ${className}`}>
      {/* Top gradient line for feature/highlight variants */}
      {(variant === 'feature' || variant === 'highlight') && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      )}
      
      {/* Card Header (optional) */}
      {(title || icon) && (
        <div className="flex items-start gap-3 mb-4">
          {icon && (
            <div className={`flex-shrink-0 ${getIconColor()}`}>
              {icon}
            </div>
          )}
          {title && (
            <h3 className={`text-lg sm:text-xl font-bold ${themeConfig.text.heading}`}>
              {title}
            </h3>
          )}
        </div>
      )}
      
      {/* Card Content */}
      <div className={themeConfig.text.primary}>
        {children}
      </div>
      
      {/* Bottom gradient line for feature variant */}
      {variant === 'feature' && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
      )}
    </div>
  );
}
