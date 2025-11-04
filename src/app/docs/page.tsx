"use client";

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Book, Code, Layers, Database, Cloud, Shield, Zap, Settings } from 'lucide-react';
import Link from 'next/link';

export default function TechDocsPage() {
  const docSections = [
    {
      icon: Code,
      title: 'Getting Started',
      description: 'Quick setup guide for API integration and authentication',
      href: '/docs/getting-started',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Layers,
      title: 'API Reference',
      description: 'Complete REST API documentation with endpoints and examples',
      href: '/docs/api-reference',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Database,
      title: 'Data Models',
      description: 'Object schemas, data types, and database structures',
      href: '/docs/data-models',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Cloud,
      title: 'Cloud Rendering',
      description: 'GPU infrastructure, deployment, and optimization guides',
      href: '/docs/cloud-rendering',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'AI & ML Features',
      description: 'Neural rendering, image-to-3D conversion, and AI pipelines',
      href: '/docs/ai-features',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      icon: Shield,
      title: 'Security & Auth',
      description: 'Authentication flows, API keys, and security best practices',
      href: '/docs/security',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Settings,
      title: 'Configuration',
      description: 'Environment setup, custom configurations, and preferences',
      href: '/docs/configuration',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Book,
      title: 'Tutorials',
      description: 'Step-by-step guides and practical implementation examples',
      href: '/docs/tutorials',
      color: 'from-teal-500 to-cyan-600'
    },
  ];

  const quickLinks = [
    { label: 'SDK Installation', href: '/docs/sdk-install' },
    { label: 'Quick Start Guide', href: '/docs/quickstart' },
    { label: 'Error Handling', href: '/docs/errors' },
    { label: 'Rate Limits', href: '/docs/rate-limits' },
    { label: 'Webhooks', href: '/docs/webhooks' },
    { label: 'Migration Guide', href: '/docs/migration' },
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-4 py-24 pt-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mb-6">
              <Book className="w-10 h-10 text-cyan-400" />
            </div>
            <h1 className="font-heading bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent mb-6">
              Technical Documentation
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
              Everything you need to integrate, build, and scale with TEELI.NET's AI rendering platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="relative w-full bg-black py-12 px-4 border-y border-white/10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-4 py-2 rounded-lg border border-cyan-500/30 bg-black/50 text-zinc-300 hover:text-white hover:border-cyan-500 hover:bg-cyan-500/10 transition-all text-sm"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="relative w-full bg-gradient-to-b from-black via-purple-950/20 to-black py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Documentation
            </h2>
            <p className="text-xl text-zinc-400">
              Find guides, references, and examples for every feature
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {docSections.map((section, index) => (
              <motion.a
                key={index}
                href={section.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-2xl border-2 border-cyan-500/20 bg-gradient-to-br from-black/60 via-cyan-950/20 to-black/60 backdrop-blur-xl p-6 md:p-8 hover:border-cyan-500/40 transition-all"
                style={{ boxShadow: '0 10px 30px rgba(0, 255, 255, 0.05)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all rounded-2xl"></div>
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${section.color} mb-4`}>
                    <section.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="mt-4 flex items-center text-cyan-400 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-semibold">Read More</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative w-full bg-black py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/80 via-purple-950/30 to-black/80 backdrop-blur-xl p-12"
            style={{ boxShadow: '0 20px 60px rgba(0, 255, 255, 0.1)' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"></div>
            <div className="relative text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Need Help?
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                Join our developer community or reach out for support
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
                >
                  Contact Support
                </Link>
                <a
                  href="https://github.com/teeli" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl border-2 border-cyan-500/50 bg-black/50 text-white font-semibold hover:border-cyan-500 transition-all"
                >
                  GitHub Community
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

