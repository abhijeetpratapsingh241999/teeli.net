"use client";

import { useBlogTheme } from '@/components/BlogThemeProvider';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const { theme } = useBlogTheme();

  return (
    <div className="mt-[60px]">
      <div className={`relative rounded-3xl overflow-hidden transition-all ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20 border-2 border-cyan-500/30'
          : 'bg-gradient-to-br from-cyan-50/80 via-purple-50/80 to-pink-50/80 border-2 border-cyan-300/50'
      }`}>
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className={`absolute inset-[-2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 ${
            theme === 'dark' ? 'opacity-20' : 'opacity-10'
          }`}></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-80"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-5 shadow-lg shadow-cyan-500/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          
          {/* Heading with gradient text */}
          <h3 className={`font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300' 
              : 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600'
          }`}>
            Ready to Transform Your Workflow?
          </h3>
          
          {/* Supporting text */}
          <p className={`text-base md:text-lg mb-7 max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
          }`}>
            Experience enterprise-grade AI rendering with quantum-optimized workflows and sustainable GPU infrastructure.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary Button */}
            <Link 
              href="/contact"
              className={`group relative w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-105'
                  : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-2xl shadow-cyan-400/40 hover:shadow-cyan-400/60 hover:scale-105'
              }`}
              aria-label="Get started with Teeli.net today"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            
            {/* Secondary Button */}
            <Link 
              href="/solutions/ai-rendering"
              className={`group w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 border-2 backdrop-blur-sm inline-flex items-center justify-center gap-2 ${
                theme === 'dark'
                  ? 'border-cyan-400/50 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105'
                  : 'border-cyan-500/50 text-cyan-700 hover:border-cyan-600 hover:bg-cyan-100/50 hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105'
              }`}
              aria-label="Explore AI rendering solutions"
            >
              <span className="flex items-center gap-2">
                Explore Solutions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
        
        {/* Mesh gradient overlay */}
        <div className={`absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay ${
          theme === 'dark' 
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]' 
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_50%)]'
        }`} aria-hidden="true"></div>
      </div>
    </div>
  );
}
