"use client";
import { ReactNode, memo } from "react";
import { useBlogTheme } from "@/components/BlogThemeProvider";
import clsx from "clsx";

type Level = "h2" | "h3";

interface HeadingProps {
  id?: string;
  level: Level;
  children: ReactNode;
  className?: string;
}

function HeadingBase({ id, level, children, className }: HeadingProps) {
  const { theme } = useBlogTheme();

  const base = "font-heading scroll-mt-24 text-center md:text-left";
  const h2 = clsx(
    "font-semibold mt-[32px] sm:mt-[40px] mb-4 sm:mb-5",
    "text-[30px] sm:text-[34px] md:text-[38px]",
    theme === "dark" ? "text-white" : "text-blue-900" // white in dark mode, dark blue in light
  );
  const h3 = clsx(
    "font-semibold mt-[28px] mb-3 sm:mb-4",
    "text-[24px] sm:text-[27px] md:text-[30px]",
    theme === "dark" ? "text-white" : "text-blue-800" // white in dark mode, blue in light
  );

  const finalClassName = clsx(base, level === "h2" ? h2 : h3, className);

  if (level === "h2") {
    return <h2 id={id} className={finalClassName}>{children}</h2>;
  }
  
  return (
    <h3 id={id} className={finalClassName}>
      <span className="inline-flex items-center gap-2">
        <svg 
          className={clsx(
            "w-4 h-4 shrink-0",
            theme === "dark" ? "text-white" : "text-blue-800"
          )} 
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
