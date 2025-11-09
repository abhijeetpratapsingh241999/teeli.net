"use client";
import { ReactNode, memo } from "react";
import { useBlogTheme } from "@/components/BlogThemeProvider";
import { getHeadingClasses, blogTypography } from "@/styles/blog-typography";
import clsx from "clsx";

type Level = "h2" | "h3";

interface HeadingProps {
  id?: string;
  level: Level;
  children: ReactNode;
  className?: string;
}

/**
 * Heading Component
 * 
 * Renders H2 or H3 with consistent styling from centralized typography.
 * - H2: Darker blue (light mode) / Cyan (dark mode)
 * - H3: Lighter blue (light mode) / Softer cyan (dark mode) with arrow icon
 */
function HeadingBase({ id, level, children, className }: HeadingProps) {
  const { theme } = useBlogTheme();

  // Get classes from centralized typography
  const headingClasses = getHeadingClasses(level, theme);
  const finalClassName = clsx(headingClasses, className);

  if (level === "h2") {
    return <h2 id={id} className={finalClassName}>{children}</h2>;
  }
  
  // H3 includes an arrow icon
  const arrowColor = theme === "dark" 
    ? blogTypography.headings.h3.colors.dark 
    : blogTypography.headings.h3.colors.light;
  
  return (
    <h3 id={id} className={finalClassName}>
      <span className="inline-flex items-center gap-2">
        <svg 
          className={clsx("w-4 h-4 shrink-0", arrowColor)} 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
        {children}
      </span>
    </h3>
  );
}

export default memo(HeadingBase);
