'use client';

import { TrendingUp, Eye, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function PopularPage() {
  const { theme } = useBlogTheme();
  
  // This would come from your analytics/database in production
  const popularPosts = [
    {
      title: "3D Rendering House: Complete Guide",
      slug: "3d-rendering-house-complete-guide",
      views: "12.5K",
      readTime: "8 min read",
      category: "3D Rendering",
      gradient: "from-cyan-500 to-blue-600",
      excerpt: "Master architectural visualization with photorealistic exterior and interior renders",
      image: "/blog/3d-rendering-house-hero.avif",
      trending: 1
    },
    {
      title: "Agentic AI Architecture: Use Cases & Risks 2025",
      slug: "agentic-ai-architecture-use-cases-risks-2025",
      views: "10.2K",
      readTime: "10 min read",
      category: "AI & ML",
      gradient: "from-purple-500 to-pink-600",
      excerpt: "Understanding autonomous AI agents and their implementation patterns",
      image: "/blog/agentic-ai-architecture-workflow-hero.avif",
      trending: 2
    },
    {
      title: "3D Product Rendering: Process, Tools & Visualization",
      slug: "3d-product-rendering-process-tools-visualization",
      views: "8.9K",
      readTime: "12 min read",
      category: "3D Rendering",
      gradient: "from-cyan-500 to-blue-600",
      excerpt: "Complete workflow for creating stunning product visualizations",
      image: "/blog/3d-product-rendering-hero.avif",
      trending: 3
    },
    {
      title: "Interior Rendering: Complete Guide",
      slug: "interior-rendering-complete-guide",
      views: "7.8K",
      readTime: "9 min read",
      category: "3D Rendering",
      gradient: "from-cyan-500 to-blue-600",
      excerpt: "Professional techniques for photorealistic interior visualization",
      image: "/blog/interior-rendering-hero.avif",
      trending: 4
    },
    {
      title: "3D Building Designer: Skills, Tools, Workflow & Career Growth 2025",
      slug: "3d-building-designer-skills-tools-workflow-career-growth-2025",
      views: "6.5K",
      readTime: "11 min read",
      category: "3D Rendering",
      gradient: "from-cyan-500 to-blue-600",
      excerpt: "Essential skills and career paths for architectural visualization professionals",
      image: "/blog/3d-building-designer-pipeline-hero.avif",
      trending: 5
    },
    {
      title: "Realistic Rooms: Techniques, Lighting & Composition",
      slug: "realistic-rooms-techniques-lighting-composition-photoreal-renders-2025",
      views: "5.9K",
      readTime: "10 min read",
      category: "3D Rendering",
      gradient: "from-cyan-500 to-blue-600",
      excerpt: "Advanced techniques for creating photorealistic interior spaces",
      image: "/blog/realistic-rooms-hero.avif",
      trending: 6
    }
  ];

  const timeframes = ["This Week", "This Month", "All Time"];

  return (
    <div className={`min-h-screen pt-32 pb-20 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-black'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 mb-6`}>
            <TrendingUp className={`w-4 h-4 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`} />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Trending Now</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-300 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Most Popular Posts
            </span>
          </h1>

          <p className={`text-xl max-w-3xl leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Discover the most-read articles by our community. Updated daily based on views, shares, and engagement.
          </p>
        </div>

        {/* Timeframe Tabs */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          {timeframes.map((timeframe, index) => (
            <button
              key={timeframe}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                index === 0
                  ? 'bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-400/50 shadow-lg shadow-orange-500/20 ' + (theme === 'dark' ? 'text-white' : 'text-gray-900')
                  : theme === 'dark'
                    ? 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:border-orange-400/30 hover:text-white'
                    : 'bg-gray-200/50 border border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-orange-400/30 hover:text-gray-900'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>

        {/* Popular Posts List */}
        <div className="space-y-6">
          {popularPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className={`relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-400/30'
                  : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-orange-400/30 shadow-sm'
              }`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative z-10 flex gap-6">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${post.gradient} flex items-center justify-center font-bold text-2xl text-white shadow-lg`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="hidden md:block flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden bg-white/10">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={128}
                      height={96}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h2 className={`text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-300 group-hover:to-red-400 group-hover:bg-clip-text transition-all duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {post.title}
                      </h2>
                      <ArrowUpRight className={`w-5 h-5 group-hover:text-orange-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ${
                        theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                      }`} />
                    </div>

                    <p className={`mb-4 line-clamp-2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {post.excerpt}
                    </p>

                    <div className={`flex items-center gap-4 text-sm ${
                      theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                    }`}>
                      <span className={`px-3 py-1 rounded-lg bg-gradient-to-r ${post.gradient} bg-opacity-20 text-white font-medium`}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className={`px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 font-medium hover:from-orange-500/30 hover:to-red-500/30 hover:border-orange-400/50 transition-all duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}
