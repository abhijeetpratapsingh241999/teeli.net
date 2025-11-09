"use client";
import { ReactNode, memo } from "react";
import { useBlogTheme } from "@/components/BlogThemeProvider";
import { blogTypography } from "@/styles/blog-typography";
import clsx from "clsx";

interface IconListItemProps {
  children: ReactNode;
  className?: string;
  /** Icon color based on heading context: 'red' for H2, 'blue' for H3 */
  color?: "blue" | "red";
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
 */
function IconListItem({ 
  children, 
  className, 
  color = "blue", 
  size = "default", 
  numbered = false, 
  number 
}: IconListItemProps) {
  const { theme } = useBlogTheme();
  
  // Get icon configuration from typography
  const iconConfig = color === "red" 
    ? blogTypography.body.list.icons.h2 
    : blogTypography.body.list.icons.h3;
  
  const iconColor = iconConfig.color;
  const iconSize = size === "large" ? iconConfig.size : "w-5 h-5";
  
  // Get text color from typography
  const textColor = theme === "dark" 
    ? blogTypography.body.list.colors.dark 
    : blogTypography.body.list.colors.light;

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
            color === "red" ? "border-red-500" : "border-blue-500"
          )}
        >
          {number}
        </div>
      ) : (
        // Bullet list icon - checkmark in circle
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
      )}
      <span className={blogTypography.body.list.sizes}>
        {children}
      </span>
    </li>
  );
}

export default memo(IconListItem);
