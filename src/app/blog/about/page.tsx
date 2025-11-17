import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Target, Users, Sparkles, TrendingUp, Mail, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/blog/Breadcrumb';

export const metadata: Metadata = {
  title: "About - TEELI.NET Blog",
  description: "Learn about TEELI.NET Blog - your source for 3D rendering, AI, architecture, and cutting-edge technology insights.",
  openGraph: {
    title: "About - TEELI.NET Blog",
    description: "Your source for 3D rendering, AI, and technology insights",
  }
};

const stats = [
  { label: "Articles Published", value: "148+", icon: BookOpen },
  { label: "Topics Covered", value: "8", icon: Target },
  { label: "Expert Authors", value: "12+", icon: Users },
  { label: "Monthly Readers", value: "50K+", icon: TrendingUp },
];

const topics = [
  "3D Rendering & Visualization",
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Digital Twins",
  "Metaverse & Web3",
  "Quantum Computing",
  "Sustainability Tech",
  "Blockchain",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-12">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'About', current: true }
            ]}
          />
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-semibold">About TEELI.NET Blog</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Exploring the Future of Technology
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We deliver expert insights on 3D rendering, AI, architecture, and emerging technologies 
            that shape tomorrow's digital landscape.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-cyan-400/30 hover:bg-black/60 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="font-heading text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <h2 className="font-heading text-4xl font-bold text-white mb-6">Our Mission</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              TEELI.NET Blog is dedicated to demystifying complex technologies and making cutting-edge 
              knowledge accessible to professionals, enthusiasts, and learners worldwide.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              We bridge the gap between theoretical concepts and practical applications, providing 
              actionable insights that help our readers stay ahead in their fields.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              From photorealistic 3D rendering techniques to the latest AI breakthroughs, from sustainable 
              tech practices to quantum computing fundamentals—we cover it all with depth and clarity.
            </p>
          </div>
        </div>

        {/* Topics Covered */}
        <div className="mb-20">
          <h2 className="font-heading text-4xl font-bold text-white mb-6">What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic, index) => (
              <div
                key={topic}
                className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-cyan-400/30 hover:bg-black/60 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                  {index + 1}
                </div>
                <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="font-heading text-4xl font-bold text-white mb-6">Our Team</h2>
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Our content is created by a diverse team of industry professionals, researchers, and 
              technical experts who bring real-world experience and deep knowledge to every article.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-sm font-semibold">
                3D Artists
              </span>
              <span className="px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-400/30 text-purple-300 text-sm font-semibold">
                AI Engineers
              </span>
              <span className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/30 text-blue-300 text-sm font-semibold">
                Cloud Architects
              </span>
              <span className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm font-semibold">
                Architects
              </span>
              <span className="px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-400/30 text-orange-300 text-sm font-semibold">
                Tech Writers
              </span>
              <span className="px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-400/30 text-violet-300 text-sm font-semibold">
                Researchers
              </span>
            </div>
            <Link
              href="/blog/authors"
              className="inline-flex items-center gap-2 mt-6 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group"
            >
              Meet Our Contributors
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm p-12">
          <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest articles, tutorials, and insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl bg-black/60 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-cyan-400/50 transition-colors"
            />
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/10">
          <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
            All Articles
          </Link>
          <Link href="/blog/topics" className="text-gray-400 hover:text-white transition-colors">
            Topics
          </Link>
          <Link href="/blog/authors" className="text-gray-400 hover:text-white transition-colors">
            Authors
          </Link>
          <Link href="/blog/archive" className="text-gray-400 hover:text-white transition-colors">
            Archive
          </Link>
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            Main Site
          </Link>
        </div>
      </div>
    </div>
  );
}
