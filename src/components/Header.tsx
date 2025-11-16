"use client";

import { useState } from 'react';
import { User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TeeliLogo from './AnimatedGlobe';

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
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hasDropdown = (item: string) => {
    return Object.keys(dropdownItems).includes(item);
  };

  // Encode current path for returnUrl
  const returnUrl = encodeURIComponent(pathname || '/');

  return (
    <header className="fixed top-0 left-0 z-30 w-full p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-black/30 p-2 px-6 backdrop-blur-sm" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 255, 255, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.3)' }}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <TeeliLogo />
          <span className="font-heading text-lg font-bold text-white">TEELI.NET</span>
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
                    <Link href={getNavLink(item)} className="flex items-center gap-1 px-3 py-2 text-sm text-zinc-300 transition-colors hover:text-white rounded-lg hover:bg-white/5">
                      {item}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${openDropdown === item ? 'rotate-180' : ''}`} />
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {openDropdown === item && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-full left-0 mt-2 min-w-[220px] rounded-2xl border border-cyan-500/30 bg-black/95 backdrop-blur-xl p-2 shadow-2xl"
                          style={{ boxShadow: '0 20px 60px rgba(0, 255, 255, 0.1), inset 0 0 30px rgba(0, 255, 255, 0.05)' }}
                        >
                          {dropdownItems[item]?.map((subItem, index) => (
                            <motion.div
                              key={subItem.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
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
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={getNavLink(item)} className="block px-3 py-2 text-sm text-zinc-300 transition-colors hover:text-white rounded-lg hover:bg-white/5">
                    {item}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Profile/Login Icon */}
          <Link 
            href={`/login?returnUrl=${returnUrl}`}
            className="hidden lg:flex rounded-full border border-white/20 p-2 text-zinc-300 transition-colors hover:border-cyan-400 hover:text-white"
            title="Sign In"
          >
            <User className="h-4 w-4" />
          </Link>
          
          {/* Mobile Menu Icon */}
          <button
            onClick={toggleMenu}
            className="lg:hidden rounded-full border border-white/20 p-2 text-zinc-300 transition-colors hover:border-cyan-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide down from top */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-xl border-b border-cyan-400/30 overflow-y-auto"
            style={{ 
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(0, 255, 255, 0.1), inset 0 0 100px rgba(0, 255, 255, 0.05)',
              background: 'linear-gradient(to bottom, rgba(0, 20, 40, 0.9), rgba(0, 10, 20, 0.8)), url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          >
            <div className="mx-auto max-w-7xl px-6 py-12 pt-20">
              {/* Close button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={toggleMenu}
                  className="rounded-full border border-white/20 p-2 text-zinc-300 transition-colors hover:border-cyan-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav>
                <ul className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <li key={item}>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {hasDropdown(item) ? (
                          <div>
                            <button
                              onClick={() => setOpenDropdown(openDropdown === item ? null : item)}
                              className="w-full flex items-center justify-between text-lg text-zinc-300 transition-colors hover:text-cyan-400 py-3 border-b border-white/10 hover:border-cyan-400/50"
                            >
                              <span>{item}</span>
                              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openDropdown === item ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                              {openDropdown === item && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-4 pt-2 pb-2 space-y-2">
                                    {dropdownItems[item]?.map((subItem) => (
                                      <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        onClick={toggleMenu}
                                        className="block text-base text-zinc-400 transition-colors hover:text-cyan-400 py-2"
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={getNavLink(item)}
                            onClick={toggleMenu}
                            className="block text-lg text-zinc-300 transition-colors hover:text-cyan-400 py-3 border-b border-white/10 hover:border-cyan-400/50"
                          >
                            {item}
                          </Link>
                        )}
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* User button */}
              <div className="mt-4 space-y-2">
                <Link
                  href={`/login?returnUrl=${returnUrl}`}
                  onClick={toggleMenu}
                  className="block w-full rounded-full border border-white/20 bg-black/50 p-3 text-zinc-300 transition-colors hover:border-cyan-400 hover:text-white text-center"
                >
                  Sign In
                </Link>
                <Link
                  href={`/signup?returnUrl=${returnUrl}`}
                  onClick={toggleMenu}
                  className="block w-full rounded-full border border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-3 text-white transition-colors hover:from-cyan-500/30 hover:to-purple-500/30 text-center font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
