"use client";
import { ReactNode, memo } from "react";
import { useBlogTheme } from "@/components/BlogThemeProvider";
import clsx from "clsx";

type IconColor = "red" | "yellow" | "blue" | "green";

const colorMap: Record<IconColor, string> = {
  red: "text-red-500",
  yellow: "text-yellow-500",
  blue: "text-blue-500",
  green: "text-green-500",
};

interface IconListItemProps {
  children: ReactNode;
  color?: IconColor;   // default rotates automatically
  className?: string;
  index?: number;      // for auto-rotation by position
}

function pickByIndex(i?: number): IconColor {
  if (typeof i !== "number") return "blue";
  const arr: IconColor[] = ["blue", "green", "yellow", "red"];
  return arr[i % arr.length];
}

function IconListItem({ children, color, className, index }: IconListItemProps) {
  const { theme } = useBlogTheme();
  const final = color ?? pickByIndex(index);

  return (
    <li
      className={clsx(
        "flex items-start gap-2 mb-[10px]",
        theme === "dark" ? "text-neutral-200" : "text-neutral-800",
        className
      )}
    >
      <svg
        aria-hidden="true"
        className={clsx("w-5 h-5 mt-1 shrink-0", colorMap[final])}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2l4-4" />
      </svg>
      <span className="text-[17px] md:text-[19px] leading-relaxed">{children}</span>
    </li>
  );
}

export default memo(IconListItem);
