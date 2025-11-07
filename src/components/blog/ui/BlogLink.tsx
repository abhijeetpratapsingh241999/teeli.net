"use client";

import Link from "next/link";
import { BLOG_TYPOGRAPHY } from "@/lib/blog/theme-config";

interface BlogLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: string;
  theme?: "light" | "dark";
}

export default function BlogLink({ href, children, external = false, variant, theme }: BlogLinkProps) {
  const isExternal = external || href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${BLOG_TYPOGRAPHY.body} text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 hover:decoration-2 transition-all duration-200`}
      >
        {children}
        <span className="ml-1 text-xs">↗</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${BLOG_TYPOGRAPHY.body} text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 hover:decoration-2 transition-all duration-200`}
    >
      {children}
    </Link>
  );
}
