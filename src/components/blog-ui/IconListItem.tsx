"use client";
import { ReactNode, memo } from "react";
import { useBlogTheme } from "@/components/BlogThemeProvider";
import { blogTypography } from "@/styles/blog-typography";
import clsx from "clsx";

interface IconListItemProps {
  children: ReactNode;
  className?: string;
  /** Icon color: 'red' for H2, 'blue' for H3, 'green' for tips/best practices */
  color?: "blue" | "red" | "green";
  /** Icon type: 'check' (default), 'star', 'arrow', 'dot' */
  icon?: "check" | "star" | "arrow" | "dot";
  /** Icon size: 'large' for H2 lists, 'default' for H3 lists */
  size?: "default" | "large";
  /** Whether this is a numbered list item */
  numbered?: boolean;
  /** The number to display (for ordered lists) */
  number?: number;
}

/**
 * IconListItem Component
 * 
 * Reusable list item with SVG bullet icon or numbered circle.
 * Automatically adapts to theme and heading context.
 * 
 * Usage:
 * - Under H2: red icon, large size (w-6 h-6)
 * - Under H3: blue icon, default size (w-5 h-5)
 * - Tips/Best Practices: green star icon
 */
function IconListItem({ 
  children, 
  className, 
  color = "blue",
  icon = "check",
  size = "default", 
  numbered = false, 
  number 
}: IconListItemProps) {
  const { theme } = useBlogTheme();
  
  // Get icon configuration from typography
  const iconConfig = color === "red" 
    ? blogTypography.body.list.icons.h2 
    : blogTypography.body.list.icons.h3;
  
  // Define color classes based on color prop
  const colorClasses = {
    red: iconConfig.color,
    blue: iconConfig.color,
    green: theme === 'dark' ? 'text-green-400' : 'text-green-600'
  };
  
  const iconColor = color === "green" ? colorClasses.green : iconConfig.color;
  const iconSize = size === "large" ? iconConfig.size : "w-5 h-5";
  
  // Get text color from typography
  const textColor = theme === "dark" 
    ? blogTypography.body.list.colors.dark 
    : blogTypography.body.list.colors.light;

  // Icon SVG components
  const renderIcon = () => {
    switch (icon) {
      case 'star':
        return (
          <svg
            aria-hidden="true"
            className={clsx(iconSize, "mt-1 shrink-0", iconColor)}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case 'arrow':
        return (
          <svg
            aria-hidden="true"
            className={clsx(iconSize, "mt-1 shrink-0", iconColor)}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        );
      case 'dot':
        return (
          <svg
            aria-hidden="true"
            className={clsx(iconSize, "mt-1 shrink-0", iconColor)}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="5"/>
          </svg>
        );
      case 'check':
      default:
        return (
          <svg
            aria-hidden="true"
            className={clsx(iconSize, "mt-1 shrink-0", iconColor)}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2l4-4" />
          </svg>
        );
    }
  };

  return (
    <li
      className={clsx(
        "flex items-start gap-2",
        blogTypography.body.list.spacing,
        textColor,
        className
      )}
    >
      {numbered && number !== undefined ? (
        // Numbered list icon - circular badge with number
        <div 
          className={clsx(
            iconSize,
            "mt-1 shrink-0 flex items-center justify-center font-bold rounded-full border-2",
            iconColor,
            color === "red" ? "border-red-500" : color === "green" ? "border-green-500" : "border-blue-500"
          )}
        >
          {number}
        </div>
      ) : (
        renderIcon()
      )}
      <span className={clsx(
        blogTypography.body.list.sizes,
        "font-semibold"
      )}>
        {children}
      </span>
    </li>
  );
}

export default memo(IconListItem);
