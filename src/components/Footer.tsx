"use client";

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import { useContext } from 'react';
import { BlogThemeContext } from './BlogThemeProvider';

export default function Footer() {
  // Get theme from context if available, otherwise default to 'dark'
  const context = useContext(BlogThemeContext);
  const theme = context?.theme || 'dark';

  return (
    <footer className={`relative w-full border-t overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-200'
    }`}>
      {/* Fine Line Grid Background */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-10' : 'opacity-5'}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: theme === 'dark'
            ? 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-heading text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              TEELI.NET
            </div>
            <p className={`text-sm text-center md:text-left ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              Redefining 3D rendering with AI + Quantum Intelligence
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className={`font-semibold mb-4 text-center md:text-left ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Quick Links</div>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">
              <Link href="/company/about" className={`transition-colors text-sm ${
                theme === 'dark' ? 'text-zinc-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
              }`}>About</Link>
              <Link href="/blog/about" className={`transition-colors text-sm ${
                theme === 'dark' ? 'text-zinc-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
              }`}>Blog About</Link>
              <Link href="/blog/authors" className={`transition-colors text-sm ${
                theme === 'dark' ? 'text-zinc-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-600'
              }`}>Authors</Link>
              <Link href="/blog/newsletter" className={`transition-colors text-sm ${
                theme === 'dark' ? 'text-zinc-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
              }`}>Newsletter</Link>
              <Link href="/privacy" className={`transition-colors text-sm ${
                theme === 'dark' ? 'text-zinc-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
              }`}>Privacy</Link>
              <Link href="/contact" className={`transition-colors text-sm ${
                theme === 'dark' ? 'text-zinc-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-600'
              }`}>Contact</Link>
            </div>
          </div>

          {/* Social Icons Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Follow Us</div>
            <div className="flex gap-4">
              <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group ${
                theme === 'dark'
                  ? 'border border-white/20 bg-white/5 hover:border-cyan-500 hover:bg-cyan-500/10'
                  : 'border border-gray-300 bg-white shadow-sm hover:border-cyan-500 hover:bg-cyan-50'
              }`}>
                <Twitter className={`w-5 h-5 transition-colors ${
                  theme === 'dark' ? 'text-zinc-300 group-hover:text-cyan-400' : 'text-gray-600 group-hover:text-cyan-600'
                }`} />
              </a>
              <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group ${
                theme === 'dark'
                  ? 'border border-white/20 bg-white/5 hover:border-blue-500 hover:bg-blue-500/10'
                  : 'border border-gray-300 bg-white shadow-sm hover:border-blue-500 hover:bg-blue-50'
              }`}>
                <Linkedin className={`w-5 h-5 transition-colors ${
                  theme === 'dark' ? 'text-zinc-300 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'
                }`} />
              </a>
              <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group ${
                theme === 'dark'
                  ? 'border border-white/20 bg-white/5 hover:border-pink-500 hover:bg-pink-500/10'
                  : 'border border-gray-300 bg-white shadow-sm hover:border-pink-500 hover:bg-pink-50'
              }`}>
                <Instagram className={`w-5 h-5 transition-colors ${
                  theme === 'dark' ? 'text-zinc-300 group-hover:text-pink-400' : 'text-gray-600 group-hover:text-pink-600'
                }`} />
              </a>
              <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all group ${
                theme === 'dark'
                  ? 'border border-white/20 bg-white/5 hover:border-purple-500 hover:bg-purple-500/10'
                  : 'border border-gray-300 bg-white shadow-sm hover:border-purple-500 hover:bg-purple-50'
              }`}>
                <Github className={`w-5 h-5 transition-colors ${
                  theme === 'dark' ? 'text-zinc-300 group-hover:text-purple-400' : 'text-gray-600 group-hover:text-purple-600'
                }`} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-8 ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
              © 2026 TEELI.NET. All rights reserved.
            </div>
            <div className={`flex gap-6 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
              <Link href="/terms" className={`transition-colors ${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-cyan-600'}`}>Terms of Service</Link>
              <Link href="/cookies" className={`transition-colors ${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-cyan-600'}`}>Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
