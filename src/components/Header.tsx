"use client";

import { useState } from 'react';
import { Search, User, Menu, X, ChevronDown } from 'lucide-react';
// REMOVED: framer-motion import for performance (-50KB saved)
import Link from 'next/link';
import AnimatedGlobe from './AnimatedGlobe';

const navItems = ["Home", "Solutions", "Technology", "Projects", "Insights", "Company"];

const getNavLink = (item: string) => {
  switch(item) {
    case "Home": return "/";
    case "Solutions": return "/solutions";
    case "Technology": return "/technology";
    case "Projects": return "/projects";
    case "Insights": return "/blog";
    case "Company": return "/company";
    default: return "#";
  }
};

// Dropdown menu items for each section
const dropdownItems: Record<string, { label: string; href: string; icon?: string }[]> = {
  "Solutions": [
    { label: "AI Rendering", href: "/solutions/ai-rendering" },
    { label: "Image → 3D Conversion", href: "/solutions/image-to-3d" },
    { label: "Cloud GPU Rendering", href: "/solutions/cloud-gpu" },
    { label: "Virtual Production", href: "/solutions/virtual-production" },
    { label: "Sustainability Pipeline", href: "/solutions/sustainability" }
  ],
  "Technology": [
    { label: "Rendering Engine", href: "/technology/rendering-engine" },
    { label: "AI & ML Stack", href: "/technology/ai-ml" },
    { label: "Multi-Cloud Infrastructure", href: "/technology/multi-cloud" },
    { label: "Research & Innovation", href: "/technology/research" }
  ],
  "Projects": [
    { label: "Case Studies", href: "/projects/case-studies" },
    { label: "Showreel / Gallery", href: "/projects/showreel" },
    { label: "Interactive Viewer", href: "/projects/viewer" }
  ],
  "Insights": [
    { label: "Blog", href: "/blog" },
    { label: "Industry Reports", href: "/insights/reports" },
    { label: "Press & News", href: "/insights/press" }
  ],
  "Company": [
    { label: "About Us", href: "/company/about" },
    { label: "Team / Culture", href: "/company/team" },
    { label: "Careers", href: "/company/careers" }
  ]
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hasDropdown = (item: string) => {
    return Object.keys(dropdownItems).includes(item);
  };

  return (
    <header className="fixed top-0 left-0 z-30 w-full px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-black/70 backdrop-blur-md border border-white/10 p-2 px-4 sm:px-5 md:px-6 shadow-lg shadow-black/20">
        {/* Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <AnimatedGlobe />
          <span className="font-heading text-base sm:text-lg font-bold text-white">TEELI.NET</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <li 
                key={item}
                className="relative"
                onMouseEnter={() => hasDropdown(item) && setOpenDropdown(item)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {hasDropdown(item) ? (
                  <div className="relative">
                    <Link href={getNavLink(item)} className="flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-sm text-zinc-200 transition-colors hover:text-white rounded-lg hover:bg-white/10">
                      {item}
                      <ChevronDown className={`h-3 w-3 xl:h-3.5 xl:w-3.5 transition-transform duration-300 ${openDropdown === item ? 'rotate-180' : ''}`} />
                    </Link>
                    
                    {/* Dropdown Menu */}
                    
                      {openDropdown === item && (
                        <div
                          className="absolute top-full left-0 mt-2 min-w-[200px] xl:min-w-[220px] rounded-2xl border border-cyan-500/30 bg-black/95 backdrop-blur-xl p-2 shadow-2xl"
                        >
                          {dropdownItems[item]?.map((subItem, index) => (
                            <div
                              key={subItem.href}
                            >
                              <Link
                                href={subItem.href}
                                className="block px-4 py-3 text-sm text-zinc-300 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:text-white transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    {/* Glowing icon */}
                                    <div className="relative">
                                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity shadow-lg group-hover:shadow-cyan-500/50 group-hover:animate-pulse"></div>
                                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-50 blur-sm group-hover:animate-pulse"></div>
                                    </div>
                                    <span className="group-hover:translate-x-1 transition-transform">{subItem.label}</span>
                                  </div>
                                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    
                  </div>
                ) : (
                  <Link href={getNavLink(item)} className="block px-2.5 xl:px-3 py-2 text-xs xl:text-sm text-zinc-200 transition-colors hover:text-white rounded-lg hover:bg-white/10">
                    {item}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Icon Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="hidden lg:flex rounded-full border border-white/20 p-1.5 xl:p-2 text-zinc-200 transition-colors hover:border-cyan-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle search"
          >
            <Search className="h-4 w-4" />
          </button>
          
          {/* Profile/Login Icon */}
          <Link 
            href="/login"
            className="hidden lg:flex rounded-full border border-white/20 p-1.5 xl:p-2 text-zinc-200 transition-colors hover:border-cyan-400 hover:text-white hover:bg-white/5"
            title="Sign In"
          >
            <User className="h-4 w-4" />
          </Link>
          
          {/* Mobile Menu Icon */}
          <button
            onClick={toggleMenu}
            className="lg:hidden rounded-full border border-white/20 p-1.5 sm:p-2 text-zinc-200 transition-colors hover:border-cyan-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Search Popup Modal */}
      
        {showSearch && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            onClick={() => setShowSearch(false)}
          >
            <div
              className="absolute top-20 sm:top-24 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl border border-cyan-500/30 bg-black/95 backdrop-blur-xl p-4 sm:p-6 shadow-2xl"
              >
                {/* Close button */}
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full border border-white/20 p-1.5 sm:p-2 text-zinc-300 transition-colors hover:border-cyan-400 hover:text-white"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles, topics, or keywords..."
                    autoFocus
                    className="w-full font-sans rounded-xl border border-white/20 bg-white/5 py-3 sm:py-4 pl-10 sm:pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
                  />
                  <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-cyan-400" />
                </div>
                
                {/* Search suggestions or recent searches */}
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-400">
                  <p>Popular searches: AI Rendering, Cloud GPU, Sustainability</p>
                </div>
              </div>
            </div>
          </div>
        )}
      

      {/* Mobile Menu - Slide down from top */}
      
        {isMenuOpen && (
          <div
            className="lg:hidden fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-xl border-b border-cyan-400/30 overflow-y-auto"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 pt-16 sm:pt-20">
              {/* Close button */}
              <div className="flex justify-end mb-4 sm:mb-6">
                <button
                  onClick={toggleMenu}
                  className="rounded-full border border-white/20 p-2 text-zinc-300 transition-colors hover:border-cyan-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav>
                <ul className="flex flex-col gap-1 sm:gap-2">
                  {navItems.map((item, index) => (
                    <li key={item}>
                      <div>
                        {hasDropdown(item) ? (
                          <div>
                            <button
                              onClick={() => setOpenDropdown(openDropdown === item ? null : item)}
                              className="w-full flex items-center justify-between text-base sm:text-lg text-zinc-300 transition-colors hover:text-cyan-400 py-2.5 sm:py-3 border-b border-white/10 hover:border-cyan-400/50"
                            >
                              <span>{item}</span>
                              <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${openDropdown === item ? 'rotate-180' : ''}`} />
                            </button>
                            
                              {openDropdown === item && (
                                <div
                                  className="overflow-hidden"
                                >
                                  <div className="pl-3 sm:pl-4 pt-2 pb-2 space-y-1.5 sm:space-y-2">
                                    {dropdownItems[item]?.map((subItem) => (
                                      <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        onClick={toggleMenu}
                                        className="block text-sm sm:text-base text-zinc-400 transition-colors hover:text-cyan-400 py-1.5 sm:py-2"
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            
                          </div>
                        ) : (
                          <Link
                            href={getNavLink(item)}
                            onClick={toggleMenu}
                            className="block text-base sm:text-lg text-zinc-300 transition-colors hover:text-cyan-400 py-2.5 sm:py-3 border-b border-white/10 hover:border-cyan-400/50"
                          >
                            {item}
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Search */}
              <div className="mt-4 sm:mt-6 relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full font-sans rounded-full border border-white/20 bg-black/50 py-2 sm:py-2.5 pl-3 sm:pl-4 pr-9 sm:pr-10 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                />
                <Search className="absolute right-2.5 sm:right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              </div>

              {/* User button */}
              <div className="mt-3 sm:mt-4 space-y-2">
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="block w-full rounded-full border border-white/20 bg-black/50 p-2.5 sm:p-3 text-sm sm:text-base text-zinc-300 transition-colors hover:border-cyan-400 hover:text-white text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={toggleMenu}
                  className="block w-full rounded-full border border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-2.5 sm:p-3 text-sm sm:text-base text-white transition-colors hover:from-cyan-500/30 hover:to-purple-500/30 text-center font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      
    </header>
  );
}
