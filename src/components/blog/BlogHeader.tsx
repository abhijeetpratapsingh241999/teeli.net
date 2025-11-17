"use client";

import { useState, useEffect } from 'react';
import { Search, Menu, X, Home, BookOpen, ArrowLeft, Layers, ChevronDown, TrendingUp, Tag, FileText, Download, Wrench, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBlogTheme } from '@/components/BlogThemeProvider';

const blogNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "All Posts", href: "/blog", icon: BookOpen },
  { label: "Topics", href: "/blog/topics", icon: Layers, hasDropdown: true },
  { label: "Resources", href: "/blog/resources", icon: Wrench, hasDropdown: true },
  { label: "Popular", href: "/blog/popular", icon: TrendingUp },
  { label: "Tags", href: "/blog/tags", icon: Tag },
];

const topicCategories = [
  { 
    label: "3D Rendering", 
    href: "/blog/topics/3d-rendering", 
    count: 11, 
    gradient: "from-cyan-500 to-blue-600",
    description: "Photorealistic visualization, architectural rendering & 3D techniques",
    subcategories: ["Interior Rendering", "Software Tools", "Lighting Setup"]
  },
  { 
    label: "AI & ML", 
    href: "/blog/topics/ai-ml", 
    count: 1, 
    gradient: "from-purple-500 to-pink-600",
    description: "Neural networks, generative AI & intelligent automation",
    subcategories: ["Agentic AI", "Neural Rendering", "AI Tools"]
  },
  { 
    label: "Cloud & DevOps", 
    href: "/blog/topics/cloud-devops", 
    count: 1, 
    gradient: "from-blue-500 to-indigo-600",
    description: "Cloud rendering farms, distributed computing & infrastructure",
    subcategories: ["AWS Rendering", "GPU Cloud", "CI/CD"]
  },
  { 
    label: "Digital Twins", 
    href: "/blog/topics/digital-twins", 
    count: 1, 
    gradient: "from-emerald-500 to-teal-600",
    description: "Real-time simulation, IoT integration & virtual replicas",
    subcategories: ["BIM Integration", "IoT Sensors", "Simulation"]
  },
  { 
    label: "Metaverse", 
    href: "/blog/topics/metaverse", 
    count: 1, 
    gradient: "from-orange-500 to-red-600",
    description: "Virtual worlds, 3D web experiences & immersive tech",
    subcategories: ["VR/AR", "Web3", "Virtual Spaces"]
  },
  { 
    label: "Quantum", 
    href: "/blog/topics/quantum", 
    count: 1, 
    gradient: "from-violet-500 to-purple-600",
    description: "Quantum algorithms, simulation & next-gen computing",
    subcategories: ["Algorithms", "Optimization", "Physics"]
  },
  { 
    label: "Sustainability", 
    href: "/blog/topics/sustainability", 
    count: 1, 
    gradient: "from-green-500 to-emerald-600",
    description: "Green computing, energy-efficient workflows & carbon-neutral tech",
    subcategories: ["Green Tech", "Carbon Tracking", "Energy Efficiency"]
  },
  { 
    label: "Blockchain", 
    href: "/blog/topics/blockchain", 
    count: 1, 
    gradient: "from-yellow-500 to-orange-600",
    description: "Decentralized systems, smart contracts & distributed ledgers",
    subcategories: ["Smart Contracts", "DLT", "Web3"]
  },
];

const resourceCategories = [
  {
    label: "Guides & Tutorials",
    href: "/blog/resources/guides",
    icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-600",
    description: "Step-by-step tutorials and comprehensive learning guides",
    items: ["3D Rendering Guide", "AI Integration", "Cloud Setup", "Best Practices"]
  },
  {
    label: "Tools & Software",
    href: "/blog/resources/tools",
    icon: Wrench,
    gradient: "from-purple-500 to-pink-600",
    description: "Recommended software, plugins, and productivity tools",
    items: ["Rendering Software", "AI Tools", "Asset Libraries", "Plugins"]
  },
  {
    label: "Downloads",
    href: "/blog/resources/downloads",
    icon: Download,
    gradient: "from-green-500 to-emerald-600",
    description: "Free templates, presets, and project files",
    items: ["Scene Templates", "Material Presets", "HDRIs", "Cheat Sheets"]
  },
  {
    label: "Documentation",
    href: "/blog/resources/docs",
    icon: FileText,
    gradient: "from-orange-500 to-red-600",
    description: "Technical documentation and API references",
    items: ["API Docs", "Code Examples", "Architecture", "Glossary"]
  },
];

// Topics Dropdown Component
function TopicsDropdown({ isActive, theme }: { isActive: boolean; theme: 'dark' | 'light' }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/blog/topics"
        className={`
          group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
          transition-all duration-300 overflow-hidden
          ${isActive 
            ? theme === 'dark'
              ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
              : 'text-gray-900 drop-shadow-[0_0_6px_rgba(0,0,0,0.1)]'
            : theme === 'dark'
              ? 'text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
              : 'text-gray-600 hover:text-gray-900 hover:drop-shadow-[0_0_6px_rgba(0,0,0,0.1)]'
          }
        `}
      >
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className={`absolute inset-0 rounded-xl border shadow-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-cyan-400/30 shadow-cyan-500/20'
                : 'bg-gradient-to-r from-cyan-100 to-purple-100 border-cyan-400/50 shadow-purple-500/20'
            }`}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20'
            : 'bg-gradient-to-r from-cyan-50 to-purple-50'
        }`} />
        <Layers className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Topics</span>
        <ChevronDown className={`w-3 h-3 relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      {/* Mega Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-6 left-1/2 -translate-x-1/2 w-[1100px] max-w-[95vw] rounded-xl border overflow-hidden z-50 ${
              theme === 'dark'
                ? 'bg-black border-white/10 shadow-xl'
                : 'bg-white border-gray-200 shadow-xl'
            }`}
          >
            {/* Header */}
            <div className={`px-5 pt-5 pb-3 border-b ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
              <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Explore Topics</h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>8 technical pillars covering cutting-edge technology</p>
            </div>

            {/* Grid Content - 4 columns, no scroll */}
            <div className="p-4 grid grid-cols-4 gap-3">
              {topicCategories.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className={`group relative overflow-hidden p-3 rounded-lg border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-white/5 bg-black/30 hover:bg-black/50 hover:border-white/10'
                      : 'border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${topic.gradient} flex-shrink-0 mt-0.5`} />
                        <h4 className={`font-bold text-sm transition-all duration-300 leading-tight ${
                          theme === 'dark'
                            ? 'text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-300 group-hover:to-purple-400'
                            : 'text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-600 group-hover:to-purple-600'
                        }`}>
                          {topic.label}
                        </h4>
                      </div>
                      <span className={`text-xs transition-colors flex-shrink-0 ml-1 ${
                        theme === 'dark'
                          ? 'text-white/40 group-hover:text-white/60'
                          : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                        {topic.count}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`text-xs mb-3 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {topic.description}
                    </p>

                    {/* Subcategories */}
                    <div className="flex flex-wrap gap-1.5">
                      {topic.subcategories.slice(0, 2).map((sub) => (
                        <span
                          key={sub}
                          className={`px-2 py-1 rounded-md border text-xs transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-white/5 border-white/10 text-white/60 group-hover:bg-white/10 group-hover:text-white/80'
                              : 'bg-gray-100 border-gray-200 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-900'
                          }`}
                        >
                          {sub}
                        </span>
                      ))}
                      {topic.subcategories.length > 2 && (
                        <span className={`px-2 py-1 text-xs ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                          +{topic.subcategories.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className={`px-4 py-3 border-t ${theme === 'dark' ? 'border-white/5 bg-black/30' : 'border-gray-100 bg-gray-50/50'}`}>
              <Link
                href="/blog/topics"
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50'
                    : 'bg-gradient-to-r from-cyan-100 to-purple-100 border-cyan-400/30 text-cyan-700 hover:from-cyan-200 hover:to-purple-200 hover:border-cyan-500/50'
                }`}
              >
                <Layers className="w-4 h-4" />
                View All Topics →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Resources Dropdown Component  
function ResourcesDropdown({ isActive, theme }: { isActive: boolean; theme: 'dark' | 'light' }) {
  const [isOpen, setIsOpen] = useState(false);  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/blog/resources"
        className={`
          group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
          transition-all duration-300 overflow-hidden
          ${isActive 
            ? theme === 'dark'
              ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
              : 'text-gray-900 drop-shadow-[0_0_6px_rgba(0,0,0,0.1)]'
            : theme === 'dark'
              ? 'text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
              : 'text-gray-600 hover:text-gray-900 hover:drop-shadow-[0_0_6px_rgba(0,0,0,0.1)]'
          }
        `}
      >
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className={`absolute inset-0 rounded-xl border shadow-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-cyan-400/30 shadow-cyan-500/20'
                : 'bg-gradient-to-r from-cyan-100 to-purple-100 border-cyan-400/50 shadow-purple-500/20'
            }`}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20'
            : 'bg-gradient-to-r from-cyan-50 to-purple-50'
        }`} />
        <BookOpen className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Resources</span>
        <ChevronDown className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full mt-6 left-1/2 -translate-x-1/2"
          >
            <div className={`px-5 pt-5 pb-3 rounded-xl border shadow-xl w-[1000px] max-w-[95vw] ${
              theme === 'dark'
                ? 'bg-black border-white/10'
                : 'bg-white border-gray-200'
            }`}>
              <div className={`mb-3 border-b pb-3 ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Learning Resources</h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Guides, tools, and materials to accelerate your journey</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {resourceCategories.map((resource) => {
                  const IconComponent = resource.icon;
                  return (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className={`group relative overflow-hidden p-3 rounded-lg border transition-all duration-300 ${
                        theme === 'dark'
                          ? 'border-white/5 bg-black/30 hover:bg-black/50 hover:border-white/10'
                          : 'border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${resource.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${resource.gradient} bg-opacity-20`}>
                              <IconComponent className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
                            </div>
                            <h4 className={`font-bold text-sm transition-all duration-300 ${
                              theme === 'dark'
                                ? 'text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-300 group-hover:to-purple-400'
                                : 'text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-600 group-hover:to-purple-600'
                            }`}>
                              {resource.label}
                            </h4>
                          </div>
                        </div>

                        <p className={`text-xs mb-3 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {resource.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {resource.items.slice(0, 3).map((item) => (
                            <span
                              key={item}
                              className={`px-2 py-1 rounded-md border text-xs transition-all duration-300 ${
                                theme === 'dark'
                                  ? 'bg-white/5 border-white/10 text-white/60 group-hover:bg-white/10 group-hover:text-white/80'
                                  : 'bg-gray-100 border-gray-200 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-900'
                              }`}
                            >
                              {item}
                            </span>
                          ))}
                          {resource.items.length > 3 && (
                            <span className={`px-2 py-1 text-xs ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                              +{resource.items.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className={`px-4 py-3 border-t ${theme === 'dark' ? 'border-white/5 bg-black/30' : 'border-gray-100 bg-gray-50/50'}`}>
                <Link
                  href="/blog/resources"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium group ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50'
                      : 'bg-gradient-to-r from-cyan-100 to-purple-100 border-cyan-400/30 text-cyan-700 hover:from-cyan-200 hover:to-purple-200 hover:border-cyan-500/50'
                  }`}
                >
                  <span>View All Resources</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BlogHeader() {
  const pathname = usePathname();
  const { theme } = useBlogTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Force dark theme on specific pages
  const forceDarkPages = ['/blog/about', '/blog/authors', '/blog/newsletter'];
  const effectiveTheme = forceDarkPages.includes(pathname) ? 'dark' : theme;

  // Check if current page is an individual blog post
  const isBlogPost = pathname?.startsWith('/blog/') && pathname !== '/blog' && !pathname?.includes('/topics') && !pathname?.includes('/popular') && !pathname?.includes('/tags') && !pathname?.includes('/resources') && !pathname?.includes('/newsletter') && !pathname?.includes('/about') && !pathname?.includes('/authors');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      // Only hide/show header on blog post pages
      if (isBlogPost) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past 100px
          setVisible(false);
        } else {
          // Scrolling up
          setVisible(true);
        }
        setLastScrollY(currentScrollY);
      } else {
        // Always show header on non-blog-post pages
        setVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isBlogPost]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav 
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-500 backdrop-blur-md border shadow-lg ${
          effectiveTheme === 'dark'
            ? `bg-black/70 border-white/15 shadow-purple-500/10 ${scrolled ? 'backdrop-blur-xl bg-black/80 border-white/20 shadow-2xl shadow-cyan-500/20' : ''}`
            : `bg-white/80 border-gray-200 shadow-gray-200/20 ${scrolled ? 'backdrop-blur-xl bg-white/90 border-gray-300 shadow-2xl shadow-purple-500/10' : ''}`
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          {/* Logo with Glow Effect */}
          <Link 
            href="/" 
            className="group flex items-center gap-2 relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowLeft className={`w-5 h-5 relative z-10 transition-colors ${
                effectiveTheme === 'dark'
                  ? 'text-cyan-300 group-hover:text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                  : 'text-cyan-600 group-hover:text-cyan-700 drop-shadow-[0_0_6px_rgba(8,145,178,0.6)]'
              }`} />
            </div>
            <span className={`font-heading text-lg font-bold transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-400 group-hover:bg-clip-text ${
              effectiveTheme === 'dark'
                ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                : 'text-gray-900 drop-shadow-[0_0_6px_rgba(0,0,0,0.1)]'
            }`}>
              TEELI Blog
            </span>
          </Link>

          {/* Desktop Navigation - Minimal Pills */}
          <div className="hidden md:flex items-center gap-2">
            {blogNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              
              // Topics or Resources dropdown
              if (item.hasDropdown) {
                if (item.label === "Topics") {
                  return (
                    <TopicsDropdown 
                      key={item.label} 
                      isActive={pathname?.startsWith('/blog/topics')} 
                      theme={effectiveTheme}
                    />
                  );
                }
                if (item.label === "Resources") {
                  return (
                    <ResourcesDropdown 
                      key={item.label} 
                      isActive={pathname?.startsWith('/blog/resources')} 
                      theme={effectiveTheme}
                    />
                  );
                }
              }
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-300 overflow-hidden
                    ${isActive 
                      ? effectiveTheme === 'dark'
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                        : 'text-gray-900 drop-shadow-[0_0_6px_rgba(0,0,0,0.1)]'
                      : effectiveTheme === 'dark'
                        ? 'text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                        : 'text-gray-600 hover:text-gray-900 hover:drop-shadow-[0_0_6px_rgba(0,0,0,0.1)]'
                    }
                  `}
                >
                  {/* Active Background Gradient */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute inset-0 rounded-xl border shadow-lg ${
                        effectiveTheme === 'dark'
                          ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-cyan-400/30 shadow-cyan-500/20'
                          : 'bg-gradient-to-r from-cyan-100 to-purple-100 border-cyan-400/50 shadow-purple-500/20'
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Hover Glow */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    effectiveTheme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20'
                      : 'bg-gradient-to-r from-cyan-50 to-purple-50'
                  }`} />
                  
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions - Search & Menu */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className={`relative p-2.5 rounded-xl border transition-all duration-300 group ${
                effectiveTheme === 'dark'
                  ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20'
                  : 'bg-gray-100 border-gray-300 hover:bg-gray-200 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20'
              }`}
              aria-label="Search blog"
            >
              <Search className={`w-5 h-5 transition-all ${
                effectiveTheme === 'dark'
                  ? 'text-white/80 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]'
                  : 'text-gray-600 group-hover:text-cyan-600 group-hover:drop-shadow-[0_0_6px_rgba(8,145,178,0.8)]'
              }`} />
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm ${
                effectiveTheme === 'dark'
                  ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30'
                  : 'bg-gradient-to-r from-cyan-200/50 to-purple-200/50'
              }`} />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className={`md:hidden relative p-2.5 rounded-xl border transition-all duration-300 ${
                effectiveTheme === 'dark'
                  ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20'
                  : 'bg-gray-900/10 border-gray-900/20 hover:bg-gray-900/15 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className={`w-5 h-5 ${effectiveTheme === 'dark' ? 'text-white/90' : 'text-gray-900'}`} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className={`w-5 h-5 ${effectiveTheme === 'dark' ? 'text-white/90' : 'text-gray-900'}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slide Down */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 max-w-6xl mx-auto shadow-2xl shadow-purple-500/20">
              <nav className="flex flex-col gap-2">
                {blogNavItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                  
                  // Skip Topics in mobile menu (will add expandable later)
                  if (item.hasDropdown) {
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`
                            group relative flex items-center gap-3 p-3 rounded-xl
                            transition-all duration-300 overflow-hidden
                            ${isActive 
                              ? 'text-white bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/30 shadow-lg shadow-cyan-500/20' 
                              : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                            }
                          `}
                        >
                          <Icon className="w-5 h-5 relative z-10" />
                          <span className="font-medium relative z-10">{item.label}</span>
                          <span className="text-xs text-white/40 relative z-10 ml-auto">View All</span>
                          
                          {!isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  }
                  
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`
                          group relative flex items-center gap-3 p-3 rounded-xl
                          transition-all duration-300 overflow-hidden
                          ${isActive 
                            ? 'text-white bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/30 shadow-lg shadow-cyan-500/20' 
                            : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5 relative z-10" />
                        <span className="font-medium relative z-10">{item.label}</span>
                        
                        {/* Hover Gradient */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal - Full Screen Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            
            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed top-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-50"
            >
              <div className="bg-black/95 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/30">
                <div className="flex items-center gap-4 mb-4">
                  <Search className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, authors..."
                    className="flex-1 bg-transparent text-white text-lg placeholder-white/50 outline-none"
                    autoFocus
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/80 hover:text-white" />
                  </motion.button>
                </div>
                
                {/* Quick Links */}
                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs text-white/50 mb-3 font-medium">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {["3D Rendering", "AI", "Architecture", "Visualization"].map((tag) => (
                      <button
                        key={tag}
                        className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white/70 hover:text-white hover:bg-white/15 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
