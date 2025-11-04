"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlogThemeProvider, useBlogTheme } from '@/components/BlogThemeProvider';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';
import Link from 'next/link';

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

  const featuredPost = initialPosts.find(post => post.featured);

  return (
    <>
      <main className={`relative min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        <Header />
        
        {/* Theme Toggle Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <BlogThemeToggle />
        </div>
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
            </motion.div>

            {/* Category Filter */}
            <div className="overflow-x-auto pb-4 mb-8 scrollbar-hide">
              <div className="flex gap-4 justify-start md:justify-center min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white"
                        : theme === 'dark' 
                          ? "border border-white/20 bg-white/5 text-zinc-300 hover:border-cyan-500/50"
                          : "border border-gray-300 bg-white text-gray-700 hover:border-cyan-500/50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Post */}
            {featuredPost && selectedCategory === "All" && (
              <Link key={featuredPost.slug} href={`/blog/${featuredPost.slug}`} className="block">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`relative rounded-2xl sm:rounded-3xl border overflow-hidden mb-12 backdrop-blur-xl group transition-all duration-300 hover:scale-[1.01] ${
                    theme === 'dark'
                      ? 'border-purple-500/30 bg-gradient-to-br from-black/80 via-purple-950/30 to-black/80 hover:border-purple-500/60 hover:shadow-[0_20px_60px_rgba(147,51,234,0.3)]'
                      : 'border-purple-200 bg-white shadow-xl hover:border-purple-400 hover:shadow-2xl'
                  }`}
                >
                  {/* Featured Image */}
                  {featuredPost.image && (
                    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                      <img 
                        src={featuredPost.image} 
                        alt={`${featuredPost.title} - Featured Article Image`}
                        className="w-full h-60 sm:h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="eager"
                        width={1200}
                        height={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>
                  )}
                  
                  <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
                    {/* Featured Badge */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                        theme === 'dark'
                          ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                          : 'bg-purple-100 text-purple-700 border border-purple-300'
                      }`}>
                        ⭐ Featured Article
                      </span>
                    </div>
                    
                    {/* Category */}
                    <div className="mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        theme === 'dark'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {featuredPost.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h1 className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight group-hover:text-purple-400 transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {featuredPost.title}
                    </h1>
                    
                    {/* Excerpt */}
                    <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      {featuredPost.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className={`flex flex-wrap items-center gap-4 mb-6 sm:mb-8 pb-6 border-b ${
                      theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <time dateTime={featuredPost.date} className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                        }`}>
                          {featuredPost.date}
                        </time>
                      </div>
                      <span className={`w-1 h-1 rounded-full ${
                        theme === 'dark' ? 'bg-zinc-500' : 'bg-gray-400'
                      }`}></span>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        {featuredPost.author}
                      </span>
                    </div>
                    
                    {/* CTA Button */}
                    <button className={`group/btn relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 overflow-hidden ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl'
                    }`}>
                      <span className="relative z-10 flex items-center gap-2">
                        Read Full Article
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </motion.article>
              </Link>
            )}

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.filter(post => !post.featured || selectedCategory !== "All").map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className={`group relative rounded-2xl sm:rounded-3xl border overflow-hidden backdrop-blur-xl transition-all duration-300 md:hover:scale-[1.02] h-full flex flex-col ${
                      theme === 'dark'
                        ? 'border-cyan-500/20 bg-gradient-to-br from-black/80 via-cyan-950/30 to-black/80 hover:border-cyan-500/50 hover:shadow-[0_8px_30px_rgba(6,182,212,0.2)]'
                        : 'border-gray-200 bg-white shadow-md hover:border-cyan-300 hover:shadow-xl'
                    }`}
                  >
                    {/* Blog Image */}
                    {post.image && (
                      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
                        <img 
                          src={post.image} 
                          alt={`${post.title} - Featured Image`}
                          className="w-full h-52 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          width={400}
                          height={240}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    
                    <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
                      {/* Category Badge */}
                      <div className="mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          theme === 'dark'
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                        }`}>
                          {post.category}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h2 className={`font-heading text-xl sm:text-2xl md:text-2xl font-bold mb-2 leading-tight line-clamp-2 group-hover:text-cyan-400 transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {post.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className={`text-sm sm:text-base mb-3 leading-relaxed line-clamp-3 flex-grow ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}>
                        {post.excerpt}
                      </p>
                      
                      {/* Meta Info */}
                      <div className={`flex items-center justify-between text-xs sm:text-sm pt-3 border-t ${
                        theme === 'dark' ? 'border-white/10 text-zinc-500' : 'border-gray-200 text-gray-500'
                      }`}>
                        <div className="flex items-center gap-3">
                          <time dateTime={post.date} className="font-medium">
                            {post.date}
                          </time>
                          <span className="w-1 h-1 rounded-full bg-current"></span>
                          <span className="font-medium">{post.readTime}</span>
                        </div>
                      </div>
                      
                      {/* Read More Link */}
                      <div className={`mt-4 flex items-center gap-2 text-sm font-semibold ${
                        theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                      }`}>
                        <span>Read Article</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
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

