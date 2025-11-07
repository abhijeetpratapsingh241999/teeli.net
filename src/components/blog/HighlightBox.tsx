'use client';

// import { motion } from 'framer-motion'; // REMOVED for performance
import { ReactNode } from 'react';

interface HighlightBoxProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
  variant?: 'default' | 'gradient' | 'neon';
  icon?: ReactNode;
}

export default function HighlightBox({ 
  children, 
  theme = 'dark',
  variant = 'gradient',
  icon 
}: HighlightBoxProps) {
  
  const variants = {
    default: {
      light: 'bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-lg',
      dark: 'bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl shadow-cyan-500/10'
    },
    gradient: {
      light: 'bg-gradient-to-br from-white/90 to-cyan-50/80 backdrop-blur-xl border-cyan-200/50 shadow-xl shadow-cyan-500/20',
      dark: 'bg-gradient-to-br from-white/10 to-cyan-500/5 backdrop-blur-xl border-cyan-500/20 shadow-2xl shadow-cyan-500/20'
    },
    neon: {
      light: 'bg-white/85 backdrop-blur-xl border-2 border-cyan-400/50 shadow-xl shadow-cyan-500/30',
      dark: 'bg-slate-900/40 backdrop-blur-xl border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/30'
    }
  };

  const textColors = {
    light: 'text-gray-800',
    dark: 'text-gray-100'
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl sm:rounded-3xl
        ${variants[variant][theme]}
        border-2 p-6 sm:p-8 md:p-10
        my-6 sm:my-8 md:my-10
        transition-all duration-500 hover:scale-[1.01]
        group
      `}
    >
      {/* Animated gradient overlay */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent
      `} />
      
      {/* Glowing corner accents */}
      <div className={`
        absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32
        bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-full
        opacity-50 group-hover:opacity-80 transition-opacity duration-500
        ${theme === 'dark' ? 'blur-2xl' : 'blur-xl'}
      `} />
      
      <div className={`
        absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32
        bg-gradient-to-tl from-purple-500/20 to-transparent rounded-tl-full
        opacity-50 group-hover:opacity-80 transition-opacity duration-500
        ${theme === 'dark' ? 'blur-2xl' : 'blur-xl'}
      `} />

      {/* Content container */}
      <div className="relative z-10 flex items-start gap-4 sm:gap-6">
        {/* Icon (optional) */}
        {icon && (
          <div className={`
            flex-shrink-0 p-3 sm:p-4 rounded-xl sm:rounded-2xl
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30' 
              : 'bg-gradient-to-br from-cyan-100 to-purple-100 border border-cyan-300/50'
            }
            shadow-lg
            transition-transform duration-300 group-hover:scale-110
          `}>
            {icon}
          </div>
        )}

        {/* Text content */}
        <div className={`
          flex-1 ${textColors[theme]}
          prose prose-lg sm:prose-xl max-w-none
          leading-relaxed
        `}>
          {children}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-1
        bg-gradient-to-r from-transparent via-cyan-500 to-transparent
        opacity-40 group-hover:opacity-70 transition-opacity duration-500
      `} />
    </div>
  );
}
