"use client";

import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBlogTheme } from './BlogThemeProvider';

export default function BlogThemeToggle() {
  const { theme, toggleTheme } = useBlogTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full p-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-500/50 transition-all hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-lg"
        animate={{ x: theme === 'dark' ? 0 : 28 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? (
          <Moon className="w-3 h-3 text-cyan-900" />
        ) : (
          <Sun className="w-3 h-3 text-purple-900" />
        )}
      </motion.div>
    </motion.button>
  );
}

