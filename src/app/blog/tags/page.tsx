'use client';

import { Tag, Hash, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function TagsPage() {
  const { theme } = useBlogTheme();
  
  const tagCategories = [
    {
      name: "Technologies",
      tags: [
        { name: "Blender", count: 28, color: "from-orange-500 to-red-600" },
        { name: "3ds Max", count: 24, color: "from-blue-500 to-cyan-600" },
        { name: "Unreal Engine", count: 22, color: "from-gray-500 to-gray-700" },
        { name: "V-Ray", count: 20, color: "from-green-500 to-emerald-600" },
        { name: "TensorFlow", count: 18, color: "from-yellow-500 to-orange-600" },
        { name: "PyTorch", count: 16, color: "from-red-500 to-pink-600" },
        { name: "AWS", count: 15, color: "from-yellow-600 to-orange-700" },
        { name: "Docker", count: 14, color: "from-blue-600 to-indigo-700" },
        { name: "Kubernetes", count: 12, color: "from-purple-500 to-indigo-600" },
        { name: "Unity", count: 11, color: "from-gray-600 to-gray-800" }
      ]
    },
    {
      name: "Topics",
      tags: [
        { name: "Photorealism", count: 35, color: "from-cyan-500 to-blue-600" },
        { name: "Lighting", count: 32, color: "from-yellow-400 to-orange-500" },
        { name: "Materials", count: 28, color: "from-green-500 to-teal-600" },
        { name: "Neural Networks", count: 25, color: "from-purple-500 to-pink-600" },
        { name: "Optimization", count: 22, color: "from-blue-500 to-indigo-600" },
        { name: "Workflow", count: 20, color: "from-orange-500 to-red-600" },
        { name: "Architecture", count: 19, color: "from-cyan-600 to-blue-700" },
        { name: "Product Design", count: 16, color: "from-pink-500 to-rose-600" },
        { name: "Automation", count: 15, color: "from-violet-500 to-purple-600" },
        { name: "Real-time", count: 13, color: "from-emerald-500 to-green-600" }
      ]
    },
    {
      name: "Techniques",
      tags: [
        { name: "PBR", count: 26, color: "from-teal-500 to-cyan-600" },
        { name: "Ray Tracing", count: 24, color: "from-blue-400 to-indigo-500" },
        { name: "HDRI", count: 22, color: "from-yellow-500 to-orange-600" },
        { name: "Compositing", count: 18, color: "from-purple-400 to-pink-500" },
        { name: "Texture Mapping", count: 17, color: "from-green-500 to-emerald-600" },
        { name: "Post-processing", count: 15, color: "from-orange-500 to-red-600" },
        { name: "Modeling", count: 14, color: "from-gray-500 to-slate-600" },
        { name: "UV Unwrapping", count: 12, color: "from-cyan-400 to-blue-500" },
        { name: "Baking", count: 10, color: "from-amber-500 to-orange-600" },
        { name: "Simulation", count: 9, color: "from-indigo-500 to-purple-600" }
      ]
    },
    {
      name: "Industries",
      tags: [
        { name: "Architecture", count: 42, color: "from-blue-500 to-cyan-600" },
        { name: "Interior Design", count: 38, color: "from-purple-500 to-pink-600" },
        { name: "Product Visualization", count: 30, color: "from-orange-500 to-red-600" },
        { name: "Gaming", count: 28, color: "from-green-500 to-emerald-600" },
        { name: "VFX", count: 25, color: "from-yellow-500 to-orange-600" },
        { name: "Advertising", count: 20, color: "from-pink-500 to-rose-600" },
        { name: "E-commerce", count: 18, color: "from-cyan-500 to-blue-600" },
        { name: "Film", count: 16, color: "from-violet-500 to-purple-600" }
      ]
    }
  ];

  const popularTags = [
    "3D Rendering", "Photorealism", "Lighting", "AI", "Machine Learning",
    "Cloud Computing", "Real-time Rendering", "Materials", "Textures",
    "Architectural Visualization", "Product Design", "Blender", "Unreal Engine"
  ];

  return (
    <div className={`min-h-screen pt-32 pb-20 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-black'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-400/30 mb-6">
            <Tag className={`w-4 h-4 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Browse by Tags</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Explore Topics & Tags
            </span>
          </h1>

          <p className={`text-xl max-w-3xl leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Find articles by specific topics, technologies, and keywords. Filter content to match your interests.
          </p>
        </div>

        {/* Popular Tags Cloud */}
        <div className={`mb-16 p-8 rounded-2xl border ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10'
            : 'bg-gradient-to-br from-gray-100 to-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-2 mb-6">
            <Hash className="w-5 h-5 text-green-300" />
            <h2 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Popular Tags</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {popularTags.map((tag, index) => {
              const sizes = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'];
              const size = sizes[Math.min(Math.floor(index / 3), 4)];
              return (
                <Link
                  key={tag}
                  href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`${size} px-4 py-2 rounded-xl border hover:bg-gradient-to-r hover:from-green-500/20 hover:to-teal-500/20 hover:border-green-400/30 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white/80 hover:text-white'
                      : 'bg-gray-100 border-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  #{tag}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tag Categories */}
        <div className="space-y-12">
          {tagCategories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-5 h-5 text-teal-300" />
                <h2 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{category.name}</h2>
                <div className={`flex-1 h-px bg-gradient-to-r ${
                  theme === 'dark' ? 'from-white/20' : 'from-gray-300'
                } to-transparent`} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {category.tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/blog/tags/${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`group relative overflow-hidden p-4 rounded-xl border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-green-400/30'
                        : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-green-400/30 shadow-sm'
                    }`}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tag.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-bold text-sm group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-300 group-hover:to-teal-400 group-hover:bg-clip-text transition-all duration-300 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {tag.name}
                        </h3>
                        <ArrowRight className={`w-4 h-4 group-hover:text-green-300 group-hover:translate-x-1 transition-all duration-300 ${
                          theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs ${
                        theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                      }`}>
                        <Hash className="w-3 h-3" />
                        <span>{tag.count} articles</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Search Tags */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-400/20 text-center">
          <h3 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Can&apos;t find a specific tag?</h3>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Use the search feature to find articles by keywords or phrases</p>
          <button className={`px-8 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-400/30 font-medium hover:from-green-500/30 hover:to-teal-500/30 hover:border-green-400/50 transition-all duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Search Articles
          </button>
        </div>
      </div>
    </div>
  );
}
