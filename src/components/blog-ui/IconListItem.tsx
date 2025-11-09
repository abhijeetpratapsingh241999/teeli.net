"use client";
import { ReactNode, memo } from "react";
import { useBlogTheme } from "@/components/BlogThemeProvider";
import clsx from "clsx";

interface IconListItemProps {
  children: ReactNode;
  className?: string;
  color?: "blue" | "red";
  size?: "default" | "large";
  numbered?: boolean;
  number?: number;
}

function IconListItem({ children, className, color = "blue", size = "default", numbered = false, number }: IconListItemProps) {
  const { theme } = useBlogTheme();
  
  const iconColor = color === "red" ? "text-red-500" : "text-blue-500";
  const iconSize = size === "large" ? "w-6 h-6" : "w-5 h-5";

  return (
    <li
      className={clsx(
        "flex items-start gap-2 mb-2.5",
        theme === "dark" ? "text-neutral-200" : "text-neutral-800",
        className
      )}
    >
      {numbered && number !== undefined ? (
        <div className={`${iconSize} mt-1 shrink-0 ${iconColor} flex items-center justify-center font-bold rounded-full border-2 ${
          color === "red" ? "border-red-500" : "border-blue-500"
        }`}>
          {number}
        </div>
      ) : (
        <svg
          aria-hidden="true"
          className={`${iconSize} mt-1 shrink-0 ${iconColor}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2l4-4" />
        </svg>
      )}
      <span className="text-[17px] md:text-[19px] leading-relaxed">{children}</span>
    </li>
  );
}

export default memo(IconListItem);
