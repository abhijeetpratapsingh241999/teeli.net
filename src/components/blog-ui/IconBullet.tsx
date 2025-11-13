"use client";

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { useBlogTheme } from '@/components/BlogThemeProvider';

interface IconBulletProps {
  as?: 'div' | 'li';
  children: ReactNode;
  className?: string;
}

/**
 * IconBullet - Reusable component for bold text points with green star icon
 * 
 * @example
 * <ul className="my-4 space-y-2">
 *   <IconBullet as="li">Use PBR materials accurately</IconBullet>
 *   <IconBullet as="li">Match real-world scale</IconBullet>
 * </ul>
 */
export default function IconBullet({
  as = 'div',
  children,
  className,
}: IconBulletProps) {
  const Component = as;
  const { theme } = useBlogTheme();

  // If component is 'div', add listitem role for accessibility
  const accessibilityProps = Component === 'div' 
    ? { role: 'listitem' as const } 
    : {};

  // Theme-aware text color
  const textColor = theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800';

  return (
    <Component
      className={clsx(
        'flex items-start gap-3 mb-3',
        className
      )}
      {...accessibilityProps}
    >
      {/* Green checkmark circle icon - larger size */}
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" fill="#22c55e" fillOpacity="0.15" />
          <path d="M9 12l2 2 4-4" stroke="#22c55e" strokeWidth="2.5" />
        </svg>
      </span>

      {/* Bold text content */}
      <span
        className={clsx(
          'font-semibold leading-relaxed text-[15px] md:text-[16px]',
          textColor
        )}
      >
        {children}
      </span>
    </Component>
  );
}
