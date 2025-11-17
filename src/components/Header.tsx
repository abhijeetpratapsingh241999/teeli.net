"use client";

import { useState, useEffect } from 'react';
import { User, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hasDropdown = (item: string) => {
    return Object.keys(dropdownItems).includes(item);
  };

  const returnUrl = encodeURIComponent(pathname || '/');

  return (
    <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className={`relative flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl py-3 px-6' 
            : 'bg-black/60 backdrop-blur-md border border-white/5 py-4 px-6'
        }`}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="text-2xl font-black bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                TEELI
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => hasDropdown(item) && setOpenDropdown(item)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {hasDropdown(item) ? (
                  <div>
                    <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      pathname === getNavLink(item)
                        ? 'text-white bg-white/10'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}>
                      {item}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === item ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === item && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 min-w-[220px] rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl p-1.5 shadow-xl"
                        >
                          {dropdownItems[item]?.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="flex items-center justify-between px-3 py-2.5 text-sm text-zinc-400 rounded-lg hover:text-white hover:bg-white/10 transition-all group"
                            >
                              <span>{subItem.label}</span>
                              <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={getNavLink(item)}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      pathname === getNavLink(item)
                        ? 'text-white bg-white/10'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/get-started"
              className="hidden md:block px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Get Started
            </Link>
            
            <Link
              href={`/login?returnUrl=${returnUrl}`}
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
            >
              <User className="h-4 w-4" />
            </Link>
            
            <button
              onClick={toggleMenu}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed top-0 right-0 w-80 h-screen bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xl font-black bg-gradient-to-br from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    TEELI
                  </div>
                  <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="space-y-1 mb-8">
                  {navItems.map((item) => (
                    <div key={item}>
                      {hasDropdown(item) ? (
                        <div>
                          <button
                            onClick={() => setOpenDropdown(openDropdown === item ? null : item)}
                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          >
                            {item}
                            <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {openDropdown === item && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 py-2 space-y-1">
                                  {dropdownItems[item]?.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={toggleMenu}
                                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                    >
                                      <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
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
                          className="block px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                          {item}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <Link
                    href={`/login?returnUrl=${returnUrl}`}
                    onClick={toggleMenu}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-zinc-400 border border-white/10 rounded-lg hover:text-white hover:bg-white/5 transition-all"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Link>
                  
                  <Link
                    href="/get-started"
                    onClick={toggleMenu}
                    className="block w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-center"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
