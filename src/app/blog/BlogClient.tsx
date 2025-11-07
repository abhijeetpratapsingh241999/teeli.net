"use client";

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import BlogThemeToggle from '@/components/BlogThemeToggle';
// import { motion } from 'framer-motion'; // REMOVED for performance
import { BlogPost } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowRight, TrendingUp, Eye } from 'lucide-react';

interface BlogClientProps {
  initialPosts: BlogPost[];
  categories: string[];
}

function BlogContent({ initialPosts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { theme } = useBlogTheme();
  
  const filteredPosts = selectedCategory === "All" 
    ? initialPosts 
    : initialPosts.filter(post => post.category === selectedCategory);

  // Get the FIRST featured post from the filtered/sorted list
  const featuredPost = filteredPosts.find(post => post.featured);

  // Get base URL - use memoized value to avoid hydration issues
  // Always use the same base URL on both server and client initially
  const baseUrl = useMemo(() => {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://teeli.net';
  }, []);

  // Generate enhanced structured data for SEO
  const generateStructuredData = useMemo(() => {
    return (post: BlogPost) => {
      const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/og-default.png`;
      
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": {
          "@type": "ImageObject",
          "url": imageUrl,
          "width": 1200,
          "height": 630
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@type": "Person",
          "name": post.author,
          ...(post.authorRole && { "jobTitle": post.authorRole })
        },
        "publisher": {
          "@type": "Organization",
          "name": "TEELI.NET",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
            "width": 512,
            "height": 512
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/blog/${post.slug}`
        },
        "articleSection": post.category,
        "inLanguage": "en-US",
        "keywords": post.category,
        "wordCount": post.content ? post.content.split(/\s+/).length : undefined
      };
    };
  }, [baseUrl]);

  // Generate BreadcrumbList structured data
  const breadcrumbStructuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      ...(selectedCategory !== "All" ? [{
        "@type": "ListItem",
        "position": 3,
        "name": selectedCategory,
        "item": `${baseUrl}/blog?category=${encodeURIComponent(selectedCategory)}`
      }] : [])
    ]
  }), [baseUrl, selectedCategory]);

  const blogCollectionStructuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "TEELI.NET Tech Insights",
    "description": "Latest trends in AI rendering, quantum computing, and sustainable technology",
    "url": `${baseUrl}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "TEELI.NET"
    }
  }), [baseUrl]);

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      {/* Blog Collection Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionStructuredData) }}
      />

      {/* Structured Data for Featured Post */}
      {featuredPost && selectedCategory === "All" && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData(featuredPost)) }}
        />
      )}

      <main className={`relative min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        <Header />
        
        {/* Theme Toggle Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <BlogThemeToggle />
        </div>
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link 
                    href="/" 
                    className={`hover:underline ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    aria-label="Navigate to home page"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>/</li>
                <li className={theme === 'dark' ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}>Blog</li>
              </ol>
            </nav>

            <div
              className="text-center mb-16"
            >
              <h1 className={`font-heading bg-clip-text text-5xl md:text-7xl font-bold text-transparent mb-6 leading-none pb-2 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300' 
                  : 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600'
              }`}>
                Tech Insights
              </h1>
              <p className={`text-lg md:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Stay ahead with the latest trends in AI rendering, quantum computing, and sustainable technology
              </p>
              
              {/* Stats Bar */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
                <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  <span>{initialPosts.length} Articles</span>
                </div>
                <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span>{categories.length - 1} Categories</span>
                </div>
              </div>
            </div>

                          {/* Premium Category Filter - Scrollable but No Scrollbar */}
              <div 
                id="category-filter"
                className="overflow-x-auto scrollbar-hide mb-12 pt-2 pb-2"
                style={{ scrollMarginTop: '8rem', scrollPaddingTop: '8rem' }}
              >
                <nav 
                  aria-label="Blog categories" 
                  className="flex gap-3 justify-start md:justify-center min-w-max px-4"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        // Ensure buttons remain visible after state change
                        requestAnimationFrame(() => {
                          const filterSection = document.getElementById('category-filter');
                          if (filterSection) {
                            const rect = filterSection.getBoundingClientRect();
                            // If section is partially hidden behind header, scroll it into view
                            if (rect.top < 130) {
                              filterSection.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start',
                                inline: 'nearest'
                              });
                            }
                          }
                        });
                      }}
                      aria-pressed={selectedCategory === category}
                      aria-label={`Filter blog posts by ${category} category`}
                      className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 relative shadow-sm hover:shadow-md ${
                        selectedCategory === category
                          ? theme === 'dark'
                            ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30 focus:ring-cyan-400"
                            : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 focus:ring-purple-400"
                          : theme === 'dark' 
                            ? "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-cyan-400/40 focus:ring-cyan-500/50"
                            : "border border-gray-200 bg-white text-gray-700 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-purple-50 focus:ring-cyan-500/50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </nav>
              </div>

            {/* Featured Post - Modern Compact Design */}
            {featuredPost && selectedCategory === "All" && (
              <Link 
                key={featuredPost.slug} 
                href={`/blog/${featuredPost.slug}`}
                className="block focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded-2xl overflow-hidden mb-8"
                aria-label={`Read featured article: ${featuredPost.title}`}
              >
                <article
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                  className={`relative rounded-2xl overflow-hidden backdrop-blur-xl group transition-all duration-300 hover:scale-[1.01] focus-within:ring-2 focus-within:ring-purple-400 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-purple-950/40 via-black/60 to-purple-950/40 border border-purple-500/20 hover:border-purple-400/40 hover:shadow-[0_20px_60px_rgba(147,51,234,0.25)]'
                      : 'bg-white border border-purple-100 shadow-lg hover:border-purple-300 hover:shadow-2xl'
                  }`}
                >
                  {/* Modern Split Layout: Image + Content Side by Side */}
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Featured Image - Compact */}
                    {featuredPost.image && (
                      <div className="relative w-full h-[300px] md:h-auto md:min-h-[400px] overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                        <Image
                          src={featuredPost.image}
                          alt={`${featuredPost.title} - Featured ${featuredPost.category} article cover image`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 z-0"
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                          itemProp="image"
                          quality={90}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        {/* Subtle Gradient Overlay - Reduced opacity */}
                        <div className={`absolute inset-0 bg-gradient-to-br z-[1] ${
                          theme === 'dark' 
                            ? 'from-purple-900/20 via-transparent to-black/30' 
                            : 'from-purple-500/10 via-transparent to-white/20'
                        }`} aria-hidden="true"></div>
                        
                        {/* Featured Badge - Modern Design */}
                        <div className="absolute top-4 left-4 z-10">
                          <span 
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg ${
                              theme === 'dark'
                                ? 'bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white border border-purple-300/30'
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-400/30'
                            }`}
                            aria-label="Featured article"
                          >
                            <span className="text-base">✨</span>
                            Featured
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Content Section - Compact and Modern */}
                    <div className="relative flex flex-col justify-between p-6 md:p-8 lg:p-10">
                      {/* Top Section */}
                      <div>
                        {/* Category Badge */}
                        <div className="mb-3">
                          <span 
                            itemProp="articleSection"
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              theme === 'dark'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                : 'bg-purple-50 text-purple-700 border border-purple-200'
                            }`}
                          >
                            {featuredPost.category}
                          </span>
                        </div>
                        
                        {/* Title - More Compact */}
                        <h2 
                          itemProp="headline"
                          className={`font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors ${
                            theme === 'dark' 
                              ? 'text-white' 
                              : 'text-gray-900'
                          }`}
                        >
                          {featuredPost.title}
                        </h2>
                        
                        {/* Excerpt - 2 Lines Only */}
                        <p 
                          itemProp="description"
                          className={`text-sm md:text-base mb-4 leading-relaxed line-clamp-2 ${
                            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                          }`}
                        >
                          {featuredPost.excerpt}
                        </p>
                      </div>
                      
                      {/* Bottom Section - Meta + CTA */}
                      <div>
                        {/* Meta Info - Compact Single Line */}
                        <div 
                          className={`flex flex-wrap items-center gap-3 mb-5 pb-4 border-b ${
                            theme === 'dark' ? 'border-purple-800/30' : 'border-purple-100'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <Calendar className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                            <time 
                              dateTime={featuredPost.date}
                              itemProp="datePublished"
                              className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
                            >
                              {featuredPost.date}
                            </time>
                          </div>
                          <span 
                            className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-purple-700' : 'bg-purple-300'}`}
                            aria-hidden="true"
                          ></span>
                          <div className="flex items-center gap-1.5">
                            <Clock className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                            {featuredPost.readTime && (
                              <span 
                                className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
                                itemProp="timeRequired"
                                content={`PT${featuredPost.readTime.replace(/\s*min.*/i, '')}M`}
                              >
                                {featuredPost.readTime}
                              </span>
                            )}
                          </div>
                          <span 
                            className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-purple-700' : 'bg-purple-300'}`}
                            aria-hidden="true"
                          ></span>
                          <div className="flex items-center gap-1.5">
                            <User className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                            <span 
                              itemProp="author"
                              itemScope
                              itemType="https://schema.org/Person"
                              className={`text-xs font-medium ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}
                            >
                              <span itemProp="name">{featuredPost.author}</span>
                            </span>
                          </div>
                        </div>
                        
                        {/* Modern CTA Button */}
                        <button 
                          className={`group/btn relative w-full px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            theme === 'dark'
                              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 focus:ring-purple-400 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500'
                              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-400 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500'
                          }`}
                          aria-label={`Read full article: ${featuredPost.title}`}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Read Full Article
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                          </span>
                          {/* Animated gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" aria-hidden="true"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Blog Grid */}
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12"
              role="list"
              aria-label={`${filteredPosts.filter(post => selectedCategory !== "All" || post.slug !== featuredPost?.slug).length} blog posts in ${selectedCategory} category`}
            >
              {filteredPosts.filter(post => selectedCategory !== "All" || post.slug !== featuredPost?.slug).map((post, index) => {
                const structuredData = generateStructuredData(post);
                const isAboveFold = index < 6;
                
                return (
                  <div key={post.slug} role="listitem">
                    {/* Structured Data for each post */}
                    <script
                      type="application/ld+json"
                      suppressHydrationWarning
                      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                    />
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="block h-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded-2xl sm:rounded-3xl"
                      aria-label={`Read article: ${post.title} in ${post.category} category`}
                    >
                      <article
                        itemScope
                        itemType="https://schema.org/BlogPosting"
                        className={`group relative rounded-2xl sm:rounded-3xl border overflow-hidden backdrop-blur-xl transition-all duration-300 md:hover:scale-[1.02] h-full flex flex-col focus-within:ring-2 focus-within:ring-cyan-400 ${
                          theme === 'dark'
                            ? 'border-cyan-500/20 bg-gradient-to-br from-black/80 via-cyan-950/30 to-black/80 hover:border-cyan-500/50 hover:shadow-[0_8px_30px_rgba(6,182,212,0.2)]'
                            : 'border-gray-200 bg-white shadow-md hover:border-cyan-300 hover:shadow-xl'
                        }`}
                      >
                        {/* Blog Image with better optimization */}
                        {post.image ? (
                          <div className="relative overflow-hidden bg-gradient-to-br from-cyan-900/20 to-purple-900/20 aspect-[4/3]">
                            <Image
                              src={post.image}
                              alt={`${post.title} - ${post.category} article cover image`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              loading={isAboveFold ? "eager" : "lazy"}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              itemProp="image"
                              quality={85}
                              placeholder="blur"
                              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            />
                            <div 
                              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              aria-hidden="true"
                            ></div>
                          </div>
                        ) : (
                          <div 
                            className="relative overflow-hidden bg-gradient-to-br from-cyan-900/20 to-purple-900/20 aspect-[4/3]"
                            aria-hidden="true"
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg 
                                className="w-16 h-16 text-cyan-500/30" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
                          {/* Category Badge */}
                          <div className="mb-2">
                            <span 
                              itemProp="articleSection"
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                theme === 'dark'
                                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                  : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                              }`}
                            >
                              {post.category}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 
                            itemProp="headline"
                            className={`font-heading text-xl sm:text-2xl md:text-2xl font-bold mb-2 leading-tight line-clamp-2 group-hover:text-cyan-400 transition-colors ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {post.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p 
                            itemProp="description"
                            className={`text-sm sm:text-base mb-3 leading-relaxed line-clamp-2 flex-grow ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                            }`}
                          >
                            {post.excerpt}
                          </p>
                          
                          {/* Meta Info with Icons */}
                          <footer 
                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t ${
                              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-wrap text-xs sm:text-sm">
                              <div className="flex items-center gap-1.5">
                                <Calendar className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`} aria-hidden="true" />
                                <time 
                                  dateTime={post.date}
                                  itemProp="datePublished"
                                  className={`font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
                                >
                                  {post.date}
                                </time>
                              </div>
                              {post.readTime && (
                                <>
                                  <span 
                                    className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-zinc-500' : 'bg-gray-400'}`}
                                    aria-hidden="true"
                                  ></span>
                                  <div className="flex items-center gap-1.5">
                                    <Clock className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`} aria-hidden="true" />
                                    <span 
                                      className={`font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
                                      itemProp="timeRequired"
                                      content={`PT${post.readTime.replace(/\s*min.*/i, '')}M`}
                                    >
                                      {post.readTime}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </footer>
                          
                          {/* Read More Link with better accessibility */}
                          <div 
                            className={`mt-3 flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all ${
                              theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                            }`}
                            aria-hidden="true"
                          >
                            <span>Read Article</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredPosts.filter(post => !post.featured || selectedCategory !== "All").length === 0 && (
              <div className="text-center py-16">
                <p className={`text-lg ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  No posts found in {selectedCategory} category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default function BlogClient(props: BlogClientProps) {
  return (
    <BlogThemeProvider>
      <BlogContent {...props} />
    </BlogThemeProvider>
  );
}

