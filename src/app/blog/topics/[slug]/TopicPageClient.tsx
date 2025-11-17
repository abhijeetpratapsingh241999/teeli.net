'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Tag, TrendingUp, Sparkles, Box, Brain, Cloud, Atom, Building2, Leaf, Globe, Lock } from 'lucide-react';
import { useBlogTheme } from '@/components/BlogThemeProvider';
import Breadcrumb from '@/components/blog/Breadcrumb';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  category?: string;
  tags?: string[];
  heroImage?: string;
}

interface TopicPageClientProps {
  posts: BlogPost[];
  config: {
    title: string;
    description: string;
    gradient: string;
    iconName: string;
  };
}

// Icon mapping
const iconMap: Record<string, any> = {
  '3d-rendering': Box,
  'ai-ml': Brain,
  'cloud-devops': Cloud,
  'quantum': Atom,
  'digital-twins': Building2,
  'sustainability': Leaf,
  'metaverse': Globe,
  'blockchain': Lock,
};

export default function TopicPageClient({ posts, config }: TopicPageClientProps) {
  const { theme } = useBlogTheme();
  const Icon = iconMap[config.iconName] || Box;

  return (
    <div className={`min-h-screen pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark'
        ? 'bg-gray-950'
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Topics', href: '/blog/topics' },
            { label: config.title, current: true }
          ]}
        />
        
        {/* Modern Header - Responsive */}
        <div className="mb-8 sm:mb-12 md:mb-16 relative">
          {/* Subtle Background Gradient - Hidden on mobile for performance */}
          <div className={`hidden md:block absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'
          }`} />
          
          <div className="relative">
            {/* Icon + Title Section - Responsive Layout */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Icon - Responsive Size */}
              <div className={`relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${config.gradient} shadow-lg`}>
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={1.5} />
              </div>
              
              <div className="flex-1 w-full">
                {/* Title - Responsive Typography */}
                <h1 className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent leading-tight mb-3 sm:mb-4`}>
                  {config.title}
                </h1>
                
                {/* Description - Responsive Text */}
                <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed mb-4 sm:mb-6 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {config.description}
                </p>
                
                {/* Stats - Responsive Badge */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border border-gray-700' 
                      : 'bg-gray-100 border border-gray-200'
                  }`}>
                    <TrendingUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    <span className={`text-sm sm:text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid with Featured Card - Responsive */}
        {posts.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Featured Card - First Post - Responsive Layout */}
            {posts[0] && (
              <Link
                href={`/blog/${posts[0].slug}`}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:scale-[1.005] sm:hover:scale-[1.01] block ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 hover:border-gray-700 hover:shadow-xl hover:shadow-purple-900/20'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-400/20'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
                  {/* Featured Image - Responsive Height */}
                  {posts[0].heroImage && (
                    <div className="relative h-56 sm:h-64 md:h-full overflow-hidden">
                      <Image 
                        src={posts[0].heroImage} 
                        alt={posts[0].title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${
                        theme === 'dark' 
                          ? 'from-gray-900 via-gray-900/50 to-transparent' 
                          : 'from-white/80 via-white/20 to-transparent'
                      }`} />
                      
                      {/* Featured Badge - Responsive Size */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6">
                        <span className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${
                          theme === 'dark'
                            ? 'bg-purple-500 text-white'
                            : 'bg-purple-600 text-white'
                        }`}>
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                          Featured Article
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Content - Responsive Padding */}
                  <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                    {posts[0].category && (
                      <span className={`inline-block mb-3 sm:mb-4 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium w-fit ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {posts[0].category}
                      </span>
                    )}
                    
                    {/* Title - Responsive Typography */}
                    <h2 className={`font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {posts[0].title}
                    </h2>
                    
                    {/* Description - Responsive Text */}
                    <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {posts[0].description}
                    </p>
                    
                    {/* Meta Info - Responsive Layout */}
                    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm mb-4 sm:mb-6 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">
                          {new Date(posts[0].publishDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="sm:hidden">
                          {new Date(posts[0].publishDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {posts[0].readTime}
                      </span>
                    </div>
                    
                    {/* CTA - Responsive Size */}
                    <div className={`inline-flex items-center gap-2 text-sm sm:text-base font-semibold group-hover:gap-3 transition-all duration-300 ${
                      theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      Read Full Article
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Regular Posts Grid - Responsive Columns */}
            {posts.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {posts.slice(1).map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02] animate-fadeInUp ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-800 hover:border-gray-700 hover:shadow-xl hover:shadow-purple-900/20'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-400/20'
                    }`}
                    style={{ 
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Hero Image - Responsive Height */}
                    {post.heroImage && (
                      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                        <Image 
                          src={post.heroImage} 
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        
                        {/* Category Badge - Responsive Size */}
                        {post.category && (
                          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 md:top-4 md:right-4">
                            <span className={`px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium backdrop-blur-md ${
                              theme === 'dark'
                                ? 'bg-gray-900/80 text-gray-300 border border-gray-700'
                                : 'bg-white/90 text-gray-700 border border-gray-200'
                            }`}>
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Content - Responsive Padding */}
                    <div className="p-4 sm:p-5">
                      {/* Title - Responsive Typography */}
                      <h3 className={`font-heading text-base sm:text-lg font-bold mb-2 sm:mb-3 line-clamp-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {post.title}
                      </h3>
                      
                      {/* Description - Responsive Text */}
                      <p className={`text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {post.description}
                      </p>
                      
                      {/* Tags - Responsive Display */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          {post.tags.slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs ${
                                theme === 'dark'
                                  ? 'bg-gray-800 text-gray-400'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span className="truncate max-w-20 sm:max-w-none">{tag}</span>
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Meta Info - Responsive Layout */}
                      <div className={`flex items-center justify-between pt-3 sm:pt-4 border-t ${
                        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs">
                          <span className={`flex items-center gap-1 sm:gap-1.5 ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                          }`}>
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            {new Date(post.publishDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </span>
                          <span className={`flex items-center gap-1 sm:gap-1.5 ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                          }`}>
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                        
                        <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300 ${
                          theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className={`text-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 rounded-2xl sm:rounded-3xl border ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-6 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <p className={`text-lg sm:text-xl font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No articles yet
            </p>
            <p className={`text-xs sm:text-sm mb-6 sm:mb-8 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
              Check back soon for new content in this category
            </p>
            
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 bg-gradient-to-r ${config.gradient} text-white hover:shadow-xl hover:scale-105`}
            >
              Explore All Topics
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
