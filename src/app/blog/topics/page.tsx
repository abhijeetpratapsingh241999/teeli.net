"use client";

import Link from 'next/link';
import { Box, Brain, Cloud, Atom, Building2, Leaf, Globe, Lock } from 'lucide-react';
import { useBlogTheme } from '@/components/BlogThemeProvider';

const topics = [
  {
    slug: "3d-rendering",
    title: "3D Rendering & Visualization",
    description: "Photorealistic renders, architectural visualization, product rendering, and advanced 3D techniques.",
    icon: Box,
    count: 11,
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-500/10 to-blue-600/10",
  },
  {
    slug: "ai-ml",
    title: "AI & Machine Learning",
    description: "Agentic AI, generative design, neural networks, and AI-powered creative workflows.",
    icon: Brain,
    count: 1,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 to-pink-600/10",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Cloud rendering farms, distributed computing, CI/CD pipelines, and infrastructure automation.",
    icon: Cloud,
    count: 1,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-500/10 to-indigo-600/10",
  },
  {
    slug: "digital-twins",
    title: "Digital Twins",
    description: "Real-time simulation, IoT integration, BIM workflows, and virtual replicas of physical assets.",
    icon: Building2,
    count: 1,
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/10 to-teal-600/10",
  },
  {
    slug: "metaverse",
    title: "Metaverse & Web3",
    description: "Virtual worlds, 3D web experiences, NFT visualization, and immersive technologies.",
    icon: Globe,
    count: 1,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-500/10 to-red-600/10",
  },
  {
    slug: "quantum",
    title: "Quantum Computing",
    description: "Quantum algorithms, simulation techniques, and the future of computational rendering.",
    icon: Atom,
    count: 1,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-600/10",
  },
  {
    slug: "sustainability",
    title: "Sustainability Tech",
    description: "Green computing, energy-efficient rendering, sustainable architecture, and carbon-neutral workflows.",
    icon: Leaf,
    count: 1,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 to-emerald-600/10",
  },
  {
    slug: "blockchain",
    title: "Blockchain & Smart Contracts",
    description: "Decentralized storage, smart contract visualization, and crypto infrastructure.",
    icon: Lock,
    count: 1,
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-500/10 to-orange-600/10",
  },
];

export default function TopicsPage() {
  const { theme } = useBlogTheme();
  
  return (
    <div className={`min-h-screen pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 transition-colors ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-black via-gray-900 to-black'
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h1 className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight`}>
            Explore Topics
          </h1>
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4 leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Dive deep into 8 technical pillars covering the cutting edge of technology, design, and innovation.
          </p>
        </div>

        {/* Topics Grid - Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.slug}
                href={`/blog/topics/${topic.slug}`}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border p-4 sm:p-5 md:p-6 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-2xl ${
                  theme === 'dark'
                    ? 'border-white/10 bg-black/40 backdrop-blur-sm hover:border-white/20 hover:bg-black/60 hover:shadow-purple-500/20'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-purple-500/10'
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with Gradient - Responsive Size */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${topic.gradient} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  {/* Title - Responsive Typography */}
                  <h2 className={`font-heading text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 leading-tight ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {topic.title}
                  </h2>

                  {/* Description - Responsive Text */}
                  <p className={`text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {topic.description}
                  </p>

                  {/* Post Count Badge - Responsive */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r ${topic.gradient} text-white`}>
                      {topic.count} {topic.count === 1 ? 'Post' : 'Posts'}
                    </span>
                    <span className={`text-xs transition-colors ${
                      theme === 'dark' ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
                    }`}>
                      View All →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
