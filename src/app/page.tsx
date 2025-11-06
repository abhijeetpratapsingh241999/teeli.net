"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import Header from '@/components/Header';
import AnimatedHeroText from '@/components/AnimatedHeroText';
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import Link from 'next/link';
import { OrganizationSchema } from '@/components/schema/generateOrganizationSchema';

// ULTRA LAZY: Load Scene only after 3 seconds on mobile, 1 second on desktop  
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />
});

// Don't use framer-motion at all - too heavy
// const motion = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion })), {
//   ssr: false,
// });

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Much faster fade - complete in just 300px scroll
      const progress = Math.min(scrollTop / 300, 1); // 0 to 1 in 300px
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* SEO: Organization Schema */}
      <OrganizationSchema 
        name="TEELI.NET"
        url="https://teeli.net"
        logo="https://teeli.net/logos/teeli-logo.png"
        description="AI-Powered Cloud Rendering & 3D Visualization Platform"
        sameAs={[
          'https://www.linkedin.com/company/teeli',
          'https://twitter.com/teeli',
        ]}
        contactPoint={{
          email: 'contact@teeli.net',
          contactType: 'customer service',
        }}
      />
      
      <main className="relative flex h-screen w-full flex-col items-center justify-center bg-black">
        <Header />
        <div className="absolute top-0 left-0 h-full w-full">
          <Scene scrollProgress={scrollProgress} />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          {/* UI Elements will go here */}
          <motion.div
            style={{ 
              transform: `translateZ(${scrollProgress * 10}px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <h2 className="text-lg text-zinc-400 md:text-xl">Welcome to</h2>
            <h1 className="font-heading bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-8xl">
              TEELI.NET
          </h1>
          </motion.div>
          <AnimatedHeroText />
          <button className="pointer-events-auto mt-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 font-semibold text-white transition-transform hover:scale-105">
            Get Started
          </button>
          </div>
      </main>
      
      {/* Vision Section - Container #2 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
        {/* Parallax Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-12 md:py-16 text-center">
          {/* Headline */}
          <h2 className="font-heading bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Redefining 3D Rendering with<br />AI + Quantum Intelligence
          </h2>
          
          {/* Subtext */}
          <p className="mt-6 max-w-3xl text-lg text-zinc-300 sm:text-xl md:text-2xl">
            From a single image to a live digital twin in minutes — powered by neural rendering and multi-cloud GPU fabric.
          </p>
          
          {/* Key Points Grid */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* AI-Generated 3D Models */}
            <div className="group relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/40 to-purple-950/20 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <div className="mb-4 text-5xl">🧠</div>
              <h3 className="font-heading text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                AI-Generated 3D Models
              </h3>
              <p className="mt-3 text-zinc-400">
                Transform images into high-fidelity 3D assets instantly using advanced neural networks.
              </p>
            </div>
            
            {/* Real-time Cloud Rendering */}
            <div className="group relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/40 to-purple-950/20 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <div className="mb-4 text-5xl">☁️</div>
              <h3 className="font-heading text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Real-time Cloud Rendering
              </h3>
              <p className="mt-3 text-zinc-400">
                Distributed GPU infrastructure across AWS, GCP, and CoreWeave for seamless performance.
              </p>
            </div>
            
            {/* Sustainable GPU Economy */}
            <div className="group relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/40 to-purple-950/20 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <div className="mb-4 text-5xl">🌿</div>
              <h3 className="font-heading text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Sustainable GPU Economy
              </h3>
              <p className="mt-3 text-zinc-400">
                Real-time carbon footprint tracking and optimized resource allocation for eco-friendly rendering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How TEELI Works - Container #3 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-black to-purple-950/30 overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-12 md:py-16">
          {/* Section Title */}
          <h2 className="font-heading bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl mb-12 md:mb-16">
            How TEELI Works
          </h2>

          {/* Horizontal Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center justify-center gap-6 md:gap-8 w-full max-w-6xl">
            {/* Step 1: Upload Photo or CAD */}
            <div className="group relative flex flex-col items-center text-center p-5 md:p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/40 to-purple-950/20 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] w-full">
              <div className="mb-4 text-6xl group-hover:scale-110 transition-transform">📤</div>
              <div className="text-cyan-400 text-sm font-semibold mb-2">STEP 1</div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">Upload Photo or CAD</h3>
              <p className="text-zinc-400 text-sm">
                Import your images or 3D files. Multiple formats supported.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:block text-cyan-400 text-4xl animate-pulse">→</div>

            {/* Step 2: AI Neural Engine */}
            <div className="group relative flex flex-col items-center text-center p-5 md:p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/40 to-purple-950/20 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] w-full">
              <div className="mb-4 text-6xl group-hover:scale-110 transition-transform">🧠</div>
              <div className="text-cyan-400 text-sm font-semibold mb-2">STEP 2</div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">AI Neural Engine</h3>
              <p className="text-zinc-400 text-sm">
                3D model reconstruction using advanced neural networks.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:block text-cyan-400 text-4xl animate-pulse">→</div>

            {/* Step 3: Quantum Optimizer */}
            <div className="group relative flex flex-col items-center text-center p-5 md:p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/40 to-purple-950/20 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] w-full">
              <div className="mb-4 text-6xl group-hover:scale-110 transition-transform">⚡</div>
              <div className="text-cyan-400 text-sm font-semibold mb-2">STEP 3</div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">Quantum Optimizer</h3>
              <p className="text-zinc-400 text-sm">
                Material & lighting precision optimization for photorealistic results.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:block text-cyan-400 text-4xl animate-pulse">→</div>

            {/* Step 4: Multi-Cloud GPU Render */}
            <div className="group relative flex flex-col items-center text-center p-5 md:p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/40 to-purple-950/20 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] w-full">
              <div className="mb-4 text-6xl group-hover:scale-110 transition-transform">☁️</div>
              <div className="text-cyan-400 text-sm font-semibold mb-2">STEP 4</div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">Multi-Cloud GPU Render</h3>
              <p className="text-zinc-400 text-sm">
                Distributed rendering across AWS, GCP & CoreWeave for instant output.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:block text-cyan-400 text-4xl animate-pulse">→</div>

            {/* Step 5: Export + Collaborate */}
            <div className="group relative flex flex-col items-center text-center p-5 md:p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/40 to-purple-950/20 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] w-full">
              <div className="mb-4 text-6xl group-hover:scale-110 transition-transform">🎯</div>
              <div className="text-cyan-400 text-sm font-semibold mb-2">STEP 5</div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">Export & Track</h3>
              <p className="text-zinc-400 text-sm">
                Export, collaborate, and track your carbon score in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technologies - Container #4 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-purple-950/30 via-black to-black overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
          {/* Section Title */}
          <h2 className="font-heading bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent mb-12 md:mb-16 leading-tight">
            Core Technologies
          </h2>

          {/* Technologies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl">
            {/* AI Neural Renderer */}
            <div className="group relative rounded-2xl md:rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-purple-500/70 hover:shadow-[0_0_40px_rgba(147,51,234,0.3)] md:hover:scale-105">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="text-4xl md:text-5xl">🤖</div>
                <div>
                  <div className="text-purple-400 text-xs font-semibold mb-1">TECHNOLOGY STACK</div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white">AI Neural Renderer</h3>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Diffusion + GAN based 3D reconstruction for photorealistic model generation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-xs text-purple-300">Diffusion Models</span>
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-xs text-purple-300">GAN Networks</span>
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-xs text-purple-300">3D Reconstruction</span>
              </div>
            </div>

            {/* Quantum Inspired Optimizer */}
            <div className="group relative rounded-2xl md:rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/40 to-black/60 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-cyan-500/70 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] md:hover:scale-105">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="text-4xl md:text-5xl">⚡</div>
                <div>
                  <div className="text-cyan-400 text-xs font-semibold mb-1">OPTIMIZATION ENGINE</div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white">Quantum Optimizer</h3>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                AI physics-based simulation for energy efficiency and resource allocation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-xs text-cyan-300">Quantum Algorithms</span>
                <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-xs text-cyan-300">Energy Optimization</span>
                <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-xs text-cyan-300">Physics AI</span>
              </div>
            </div>

            {/* RenderMind AI Engine */}
            <div className="group relative rounded-2xl md:rounded-3xl border-2 border-pink-500/30 bg-gradient-to-br from-black/60 via-pink-950/40 to-black/60 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-pink-500/70 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] md:hover:scale-105">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="text-4xl md:text-5xl">🧠</div>
                <div>
                  <div className="text-pink-400 text-xs font-semibold mb-1">ADAPTIVE LEARNING</div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white">RenderMind AI</h3>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Adaptive learning engine that evolves with scene types and user patterns.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-900/30 border border-pink-500/30 rounded-full text-xs text-pink-300">ML Algorithms</span>
                <span className="px-3 py-1 bg-pink-900/30 border border-pink-500/30 rounded-full text-xs text-pink-300">Pattern Learning</span>
                <span className="px-3 py-1 bg-pink-900/30 border border-pink-500/30 rounded-full text-xs text-pink-300">Auto-Optimization</span>
              </div>
            </div>

            {/* GreenChain Ledger */}
            <div className="group relative rounded-2xl md:rounded-3xl border-2 border-green-500/30 bg-gradient-to-br from-black/60 via-green-950/40 to-black/60 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-green-500/70 hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] md:hover:scale-105">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="text-4xl md:text-5xl">🌿</div>
                <div>
                  <div className="text-green-400 text-xs font-semibold mb-1">SUSTAINABILITY TRACKING</div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white">GreenChain Ledger</h3>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Carbon tracking via blockchain for transparent environmental accountability.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-xs text-green-300">Blockchain</span>
                <span className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-xs text-green-300">Carbon Credits</span>
                <span className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-xs text-green-300">Real-time Metrics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries & Use Cases - Container #5 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-cyan-950/20 to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
          {/* Section Title */}
          <h2 className="font-heading bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent mb-12 md:mb-20 leading-tight">
            Industries & Use Cases
          </h2>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl">
            {/* Architecture Studios */}
            <div className="group relative rounded-2xl md:rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/40 to-black/60 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-cyan-500/70 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] md:hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">🏗️</div>
                <div>
                  <div className="text-cyan-400 text-xs font-semibold mb-1">INDUSTRY</div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white">Architecture Studios</h3>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4 relative z-10">
                Photoreal renders in minutes. Bring your blueprints to life with instant visualization.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-xs text-cyan-300">3D Visualization</span>
                <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-xs text-cyan-300">Client Presentations</span>
              </div>
            </div>

            {/* Real-Estate Developers */}
            <div className="group relative rounded-2xl md:rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-black/60 via-blue-950/40 to-black/60 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-blue-500/70 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] md:hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">🏢</div>
                <div>
                  <div className="text-blue-400 text-xs font-semibold mb-1">INDUSTRY</div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white">Real-Estate Developers</h3>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4 relative z-10">
                Show the future before it&apos;s built. Sell pre-construction with immersive previews.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-xs text-blue-300">Property Tours</span>
                <span className="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-xs text-blue-300">Marketing</span>
              </div>
            </div>

            {/* Interior Designers */}
            <div className="group relative rounded-2xl md:rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-purple-500/70 hover:shadow-[0_0_40px_rgba(147,51,234,0.3)] md:hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">🎨</div>
                <div>
                  <div className="text-purple-400 text-xs font-semibold mb-1">INDUSTRY</div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white">Interior Designers</h3>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4 relative z-10">
                Design iteration in real time. Test colors, materials, and layouts instantly.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-xs text-purple-300">Material Swaps</span>
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-xs text-purple-300">Quick Revisions</span>
              </div>
            </div>

            {/* Metaverse Builders */}
            <div className="group relative rounded-2xl md:rounded-3xl border-2 border-pink-500/30 bg-gradient-to-br from-black/60 via-pink-950/40 to-black/60 p-6 md:p-8 backdrop-blur-sm transition-all hover:border-pink-500/70 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] md:hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all"></div>
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">🌐</div>
                <div>
                  <div className="text-pink-400 text-xs font-semibold mb-1">INDUSTRY</div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white">Metaverse Builders</h3>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4 relative z-10">
                From concept to VR in seconds. Build immersive virtual worlds at scale.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="px-3 py-1 bg-pink-900/30 border border-pink-500/30 rounded-full text-xs text-pink-300">VR Worlds</span>
                <span className="px-3 py-1 bg-pink-900/30 border border-pink-500/30 rounded-full text-xs text-pink-300">Web3 Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo / Try It Now - Container #6 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
          {/* Section Title */}
          <h2 className="font-heading bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent mb-8 md:mb-12 leading-tight text-center">
            Try It Now
          </h2>
          
          <p className="text-zinc-400 text-center text-lg md:text-xl mb-12 max-w-2xl">
            Experience the future of 3D rendering. Drop an image and watch it transform in real-time.
          </p>

          {/* Demo Card */}
          <div className="relative w-full max-w-4xl">
            <div className="group relative rounded-3xl border-2 border-cyan-500/20 bg-gradient-to-br from-black/80 via-purple-950/40 to-black/80 backdrop-blur-xl p-8 md:p-12 transition-all hover:border-cyan-500/50 hover:shadow-[0_0_60px_rgba(0,255,255,0.2)]">
              {/* Glow Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
              
              {/* Upload Area */}
              <div className="relative border-2 border-dashed border-cyan-500/30 rounded-2xl p-12 md:p-16 text-center bg-black/30 hover:border-cyan-500/50 hover:bg-black/40 transition-all cursor-pointer group/upload">
                <div className="mb-6">
                  <div className="text-6xl md:text-7xl mb-4 group-hover/upload:scale-110 transition-transform inline-block">📤</div>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                  Drop an image to get instant 3D preview
                </h3>
                <p className="text-zinc-400 text-sm md:text-base mb-6">
                  Supported formats: JPG, PNG, GIF, or CAD files
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold text-white hover:from-cyan-500 hover:to-purple-600 transition-all hover:scale-105 shadow-lg shadow-cyan-500/20">
                    Choose File
                  </button>
                  <button className="px-8 py-4 rounded-full border-2 border-cyan-500/50 bg-transparent font-semibold text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all">
                    Use Sample
                  </button>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 text-center">
                <button className="px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 shadow-xl shadow-purple-500/30 animate-pulse hover:animate-none">
                  🚀 Launch TEELI Playground
                </button>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="px-4 py-2 bg-cyan-900/20 border border-cyan-500/30 rounded-full text-xs md:text-sm text-cyan-300 backdrop-blur-sm">⚡ Instant Processing</span>
              <span className="px-4 py-2 bg-purple-900/20 border border-purple-500/30 rounded-full text-xs md:text-sm text-purple-300 backdrop-blur-sm">🎨 AI-Powered</span>
              <span className="px-4 py-2 bg-pink-900/20 border border-pink-500/30 rounded-full text-xs md:text-sm text-pink-300 backdrop-blur-sm">☁️ Cloud Rendered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Ecosystem / Partners - Container #7 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-black to-purple-950/20 overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
          {/* Section Title */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-heading bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent mb-4 leading-tight">
              Platform Ecosystem
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
              Powered by industry leaders to scale your creativity
            </p>
          </div>

          {/* Partners Grid */}
          <div className="w-full max-w-6xl">
            {/* Logos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 items-center mb-12 md:mb-16">
              {/* AWS */}
              <div className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 to-zinc-950/60 backdrop-blur-sm hover:border-orange-500/50 transition-all hover:shadow-[0_0_30px_rgba(255,140,0,0.2)]">
                <div className="mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/logos/aws.svg" alt="AWS" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,140,0,0.5)]" />
                </div>
                <div className="text-white font-bold text-xl md:text-2xl drop-shadow-[0_0_8px_rgba(255,140,0,0.4)]">AWS</div>
                <div className="text-orange-500 text-xs mt-1">Amazon</div>
              </div>

              {/* NVIDIA */}
              <div className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 to-zinc-950/60 backdrop-blur-sm hover:border-green-500/50 transition-all hover:shadow-[0_0_30px_rgba(76,175,80,0.2)]">
                <div className="mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/logos/nvidia.svg" alt="NVIDIA" className="w-full h-full" />
                </div>
                <div className="text-white font-bold text-xl md:text-2xl">NVIDIA</div>
                <div className="text-green-500 text-xs mt-1">GPUs</div>
              </div>

              {/* CoreWeave */}
              <div className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 to-zinc-950/60 backdrop-blur-sm hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_rgba(156,39,176,0.2)]">
                <div className="mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/logos/coreweave.svg" alt="CoreWeave" className="w-full h-full drop-shadow-[0_0_10px_rgba(156,39,176,0.5)]" />
                </div>
                <div className="text-white font-bold text-xl md:text-2xl">CoreWeave</div>
                <div className="text-purple-500 text-xs mt-1">Infrastructure</div>
              </div>

              {/* GCP */}
              <div className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 to-zinc-950/60 backdrop-blur-sm hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(66,133,244,0.2)]">
                <div className="mb-4 w-28 h-28 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/logos/gcp.svg" alt="GCP" className="w-full h-full" />
                </div>
                <div className="text-white font-bold text-xl md:text-2xl">GCP</div>
                <div className="text-blue-500 text-xs mt-1">Google Cloud</div>
              </div>

              {/* Azure */}
              <div className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 to-zinc-950/60 backdrop-blur-sm hover:border-blue-400/50 transition-all hover:shadow-[0_0_30px_rgba(0,120,212,0.2)]">
                <div className="mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/logos/azure.svg" alt="Azure" className="w-full h-full" />
                </div>
                <div className="text-white font-bold text-xl md:text-2xl">Azure</div>
                <div className="text-blue-400 text-xs mt-1">Microsoft</div>
              </div>

              {/* Omniverse */}
              <div className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 to-zinc-950/60 backdrop-blur-sm hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                <div className="mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="/logos/omniverse.svg" alt="Omniverse" className="w-full h-full" />
                </div>
                <div className="text-white font-bold text-xl md:text-2xl">Omniverse</div>
                <div className="text-cyan-500 text-xs mt-1">Collaboration</div>
              </div>
            </div>

            {/* Circuit Lines Background */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
                <path 
                  d="M200,300 L350,200 L500,250 L650,300 L800,250 L950,200 L1100,300" 
                  stroke="rgba(0,255,255,0.5)" 
                  strokeWidth="2" 
                  fill="none"
                  className="animate-pulse"
                  strokeDasharray="10,5"
                />
                <circle cx="200" cy="300" r="8" fill="rgba(0,255,255,0.6)" className="animate-ping" />
                <circle cx="350" cy="200" r="8" fill="rgba(255,140,0,0.6)" className="animate-ping" style={{animationDelay: '0.2s'}} />
                <circle cx="500" cy="250" r="8" fill="rgba(76,175,80,0.6)" className="animate-ping" style={{animationDelay: '0.4s'}} />
                <circle cx="650" cy="300" r="8" fill="rgba(156,39,176,0.6)" className="animate-ping" style={{animationDelay: '0.6s'}} />
                <circle cx="800" cy="250" r="8" fill="rgba(66,133,244,0.6)" className="animate-ping" style={{animationDelay: '0.8s'}} />
                <circle cx="950" cy="200" r="8" fill="rgba(0,120,212,0.6)" className="animate-ping" style={{animationDelay: '1s'}} />
                <circle cx="1100" cy="300" r="8" fill="rgba(0,255,255,0.6)" className="animate-ping" style={{animationDelay: '1.2s'}} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TEELI - Container #8 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-cyan-950/10 to-black overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
          {/* Section Title */}
          <h2 className="font-heading bg-gradient-to-r from-cyan-300 via-green-300 to-blue-300 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent mb-12 md:mb-16 leading-tight text-center">
            Why Choose TEELI
          </h2>

          {/* Value Proposition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
            {/* 10× Speed */}
            <div className="group relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/40 to-black/60 p-8 md:p-10 backdrop-blur-xl transition-all hover:border-cyan-500/70 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] md:hover:scale-105 overflow-hidden">
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 text-6xl md:text-7xl group-hover:scale-110 transition-transform">⚡</div>
                <div className="text-cyan-400 text-sm font-semibold mb-3">PERFORMANCE</div>
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  10× Speed
                </h3>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  Through AI-powered render pipelines that intelligently optimize workflows and eliminate bottlenecks.
                </p>
              </div>
            </div>

            {/* 70% Cost Cut */}
            <div className="group relative rounded-3xl border-2 border-green-500/30 bg-gradient-to-br from-black/60 via-green-950/40 to-black/60 p-8 md:p-10 backdrop-blur-xl transition-all hover:border-green-500/70 hover:shadow-[0_0_50px_rgba(34,197,94,0.4)] md:hover:scale-105 overflow-hidden">
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 text-6xl md:text-7xl group-hover:scale-110 transition-transform">💰</div>
                <div className="text-green-400 text-sm font-semibold mb-3">ECONOMY</div>
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  70% Cost Cut
                </h3>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  With intelligent cloud optimization that allocates resources efficiently and eliminates waste.
                </p>
              </div>
            </div>

            {/* 100% Green Credits */}
            <div className="group relative rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-black/60 via-emerald-950/40 to-black/60 p-8 md:p-10 backdrop-blur-xl transition-all hover:border-emerald-500/70 hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] md:hover:scale-105 overflow-hidden">
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 text-6xl md:text-7xl group-hover:scale-110 transition-transform">🌿</div>
                <div className="text-emerald-400 text-sm font-semibold mb-3">SUSTAINABILITY</div>
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  100% Green Credits
                </h3>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  For every render, powered by renewable energy sources and carbon-neutral infrastructure.
                </p>
              </div>
            </div>
          </div>
    </div>
      </section>

      {/* Tech Insights / Blog Preview - Container #10 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-black to-purple-950/10 overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
          {/* Section Title */}
          <h2 className="font-heading bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent mb-12 md:mb-16 leading-tight text-center">
            Tech Insights
          </h2>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mb-8">
            {/* Post 1 */}
            <div className="group relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/40 to-black/60 p-6 md:p-8 backdrop-blur-xl transition-all hover:border-cyan-500/70 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] md:hover:scale-105 overflow-hidden">
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
              
              <div className="relative z-10">
                <div className="text-cyan-400 text-xs font-semibold mb-3">TECH TRENDS</div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  AI Rendering Trends
                </h3>
                <p className="text-zinc-400 text-sm md:text-base mb-6 leading-relaxed">
                  Explore the latest breakthroughs in neural rendering and how AI is transforming the 3D visualization landscape.
                </p>
                <div className="flex items-center text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-colors">
                  Read more <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>

            {/* Post 2 */}
            <div className="group relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60 p-6 md:p-8 backdrop-blur-xl transition-all hover:border-purple-500/70 hover:shadow-[0_0_50px_rgba(147,51,234,0.4)] md:hover:scale-105 overflow-hidden">
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
              
              <div className="relative z-10">
                <div className="text-purple-400 text-xs font-semibold mb-3">FUTURE TECH</div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  Quantum Design 2028
                </h3>
                <p className="text-zinc-400 text-sm md:text-base mb-6 leading-relaxed">
                  Discover how quantum-inspired algorithms are revolutionizing computational design and optimization workflows.
                </p>
                <div className="flex items-center text-purple-400 text-sm font-semibold group-hover:text-purple-300 transition-colors">
                  Read more <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>

            {/* Post 3 */}
            <div className="group relative rounded-3xl border-2 border-green-500/30 bg-gradient-to-br from-black/60 via-green-950/40 to-black/60 p-6 md:p-8 backdrop-blur-xl transition-all hover:border-green-500/70 hover:shadow-[0_0_50px_rgba(34,197,94,0.4)] md:hover:scale-105 overflow-hidden">
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
              
              <div className="relative z-10">
                <div className="text-green-400 text-xs font-semibold mb-3">SUSTAINABILITY</div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                  Sustainable GPU Farms
                </h3>
                <p className="text-zinc-400 text-sm md:text-base mb-6 leading-relaxed">
                  Learn how renewable energy and carbon-neutral infrastructure are reshaping cloud rendering infrastructure.
                </p>
                <div className="flex items-center text-green-400 text-sm font-semibold group-hover:text-green-300 transition-colors">
                  Read more <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-4 px-8 py-4 rounded-full border-2 border-purple-500/50 bg-transparent font-semibold text-purple-300 hover:bg-purple-500/10 hover:border-purple-500 transition-all shadow-lg shadow-purple-500/20">
            Read More Insights
          </button>
        </div>
      </section>

      {/* Testimonials / Success Stories - Container #11 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-cyan-950/10 to-black overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
          {/* Section Title */}
          <h2 className="font-heading bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent mb-12 md:mb-16 leading-tight text-center">
            Success Stories
          </h2>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mb-12">
            {/* Testimonial 1 */}
            <div className="group relative rounded-3xl border-2 border-yellow-500/30 bg-gradient-to-br from-black/60 via-yellow-950/40 to-black/60 p-6 md:p-8 backdrop-blur-xl transition-all hover:border-yellow-500/70 hover:shadow-[0_0_50px_rgba(234,179,8,0.4)] md:hover:scale-105 overflow-hidden">
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">👨‍💼</div>
                  <div>
                    <div className="font-heading font-bold text-white text-base">Alex Chen</div>
                    <div className="text-yellow-400 text-xs">Senior Architect, SkyBuild Studio</div>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic mb-4">
                  &ldquo;TEELI transformed our workflow. What used to take days now takes minutes. Our clients are amazed by the photorealistic renders.&rdquo;
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group relative rounded-3xl border-2 border-orange-500/30 bg-gradient-to-br from-black/60 via-orange-950/40 to-black/60 p-6 md:p-8 backdrop-blur-xl transition-all hover:border-orange-500/70 hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] md:hover:scale-105 overflow-hidden">
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">👩‍💻</div>
                  <div>
                    <div className="font-heading font-bold text-white text-base">Sarah Johnson</div>
                    <div className="text-orange-400 text-xs">Lead Developer, MetroTech Ventures</div>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic mb-4">
                  &ldquo;The cost savings are incredible. We&apos;ve cut our rendering budget by 70% while delivering better results than ever before.&rdquo;
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group relative rounded-3xl border-2 border-pink-500/30 bg-gradient-to-br from-black/60 via-pink-950/40 to-black/60 p-6 md:p-8 backdrop-blur-xl transition-all hover:border-pink-500/70 hover:shadow-[0_0_50px_rgba(236,72,153,0.4)] md:hover:scale-105 overflow-hidden">
              {/* Glass Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🧑‍🎨</div>
                  <div>
                    <div className="font-heading font-bold text-white text-base">Marcus Rivera</div>
                    <div className="text-pink-400 text-xs">Creative Director, GreenSpace VR</div>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic mb-4">
                  &ldquo;Sustainability matters to us. TEELI&apos;s carbon-neutral rendering aligns perfectly with our values. Win-win!&rdquo;
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Client Logos */}
          <div className="w-full max-w-6xl">
            <div className="text-center text-zinc-400 text-sm mb-6">Trusted by industry leaders</div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="text-3xl md:text-4xl hover:opacity-100 transition-opacity">🏗️</div>
              <div className="text-3xl md:text-4xl hover:opacity-100 transition-opacity">🏢</div>
              <div className="text-3xl md:text-4xl hover:opacity-100 transition-opacity">🎨</div>
              <div className="text-3xl md:text-4xl hover:opacity-100 transition-opacity">🌐</div>
              <div className="text-3xl md:text-4xl hover:opacity-100 transition-opacity">🏛️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Future / CTA Block - Container #12 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20">
          {/* Main CTA Text */}
          <h2 className="font-heading bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent mb-8 md:mb-12 leading-tight text-center">
            Bring your ideas to life<br />Render the future with TEELI 2.0
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-16">
            <button className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 font-bold text-lg md:text-xl text-white hover:from-cyan-500 hover:to-purple-600 transition-all hover:scale-105 shadow-xl shadow-cyan-500/30">
              Start Free
            </button>
            <button className="px-10 py-5 rounded-full border-2 border-purple-500/50 bg-transparent font-bold text-lg md:text-xl text-purple-300 hover:bg-purple-500/10 hover:border-purple-500 transition-all hover:scale-105">
              Request Enterprise Demo
            </button>
          </div>

          {/* Dynamic 3D GPU Chip Background */}
          <div className="relative w-full max-w-4xl h-64 md:h-96">
            {/* This will be the rotating 3D GPU chip */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 md:w-64 h-48 md:h-64">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-lg border-2 border-purple-500/30 animate-spin-slow" style={{animationDuration: '20s'}}></div>
                
                {/* Inner chip structure */}
                <div className="absolute inset-2 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-lg backdrop-blur-sm border border-purple-500/20">
                  {/* Circuit lines pattern */}
                  <svg className="w-full h-full opacity-40" viewBox="0 0 200 200">
                    <path d="M20,100 L60,100" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
                    <path d="M140,100 L180,100" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
                    <path d="M100,20 L100,60" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
                    <path d="M100,140 L100,180" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
                    {/* Diagonal lines */}
                    <path d="M40,40 L160,160" stroke="currentColor" strokeWidth="1.5" className="text-pink-400" opacity="0.5" />
                    <path d="M160,40 L40,160" stroke="currentColor" strokeWidth="1.5" className="text-pink-400" opacity="0.5" />
                    {/* Corner nodes */}
                    <circle cx="60" cy="60" r="4" fill="currentColor" className="text-cyan-400 animate-pulse" />
                    <circle cx="140" cy="60" r="4" fill="currentColor" className="text-purple-400 animate-pulse" style={{animationDelay: '0.5s'}} />
                    <circle cx="60" cy="140" r="4" fill="currentColor" className="text-pink-400 animate-pulse" style={{animationDelay: '1s'}} />
                    <circle cx="140" cy="140" r="4" fill="currentColor" className="text-cyan-400 animate-pulse" style={{animationDelay: '1.5s'}} />
                  </svg>
                  
                  {/* Center core */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center border-2 border-white/20">
                    <div className="text-white font-bold text-xs md:text-sm">TEELI</div>
                  </div>
                </div>

                {/* Floating particles */}
                {[
                  { left: '10%', top: '20%', delay: '0s', duration: '2.5s' },
                  { left: '80%', top: '15%', delay: '0.8s', duration: '3s' },
                  { left: '15%', top: '75%', delay: '1.2s', duration: '2.8s' },
                  { left: '85%', top: '80%', delay: '0.4s', duration: '3.2s' },
                  { left: '50%', top: '10%', delay: '1.6s', duration: '2.6s' },
                  { left: '20%', top: '50%', delay: '0.6s', duration: '2.9s' },
                  { left: '75%', top: '45%', delay: '1.4s', duration: '3.1s' },
                  { left: '55%', top: '85%', delay: '1s', duration: '2.7s' }
                ].map((particle, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                    style={{
                      left: particle.left,
                      top: particle.top,
                      animationDelay: particle.delay,
                      animationDuration: particle.duration
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full bg-black border-t border-white/10 overflow-hidden">
        {/* Fine Line Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Footer Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="font-heading text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                TEELI.NET
              </div>
              <p className="text-zinc-400 text-sm text-center md:text-left">
                Redefining 3D rendering with AI + Quantum Intelligence
              </p>
            </div>

            {/* Links Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-white font-semibold mb-4 text-center md:text-left">Quick Links</div>
              <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">
                <Link href="/company/about" className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm">About</Link>
                <Link href="/docs" className="text-zinc-400 hover:text-purple-400 transition-colors text-sm">Tech Docs</Link>
                <Link href="/privacy" className="text-zinc-400 hover:text-pink-400 transition-colors text-sm">Privacy</Link>
                <Link href="/contact" className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm">Contact</Link>
              </div>
            </div>

            {/* Social Icons Section */}
            <div className="flex flex-col items-center md:items-end">
              <div className="text-white font-semibold mb-4">Follow Us</div>
              <div className="flex gap-4">
                <a 
                  href="https://twitter.com/teeli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow TEELI on Twitter"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group"
                >
                  <Twitter className="w-5 h-5 text-zinc-300 group-hover:text-cyan-400 transition-colors" aria-hidden="true" />
                </a>
                <a 
                  href="https://linkedin.com/company/teeli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Connect with TEELI on LinkedIn"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:border-blue-500 hover:bg-blue-500/10 transition-all group"
                >
                  <Linkedin className="w-5 h-5 text-zinc-300 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                </a>
                <a 
                  href="https://instagram.com/teeli.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow TEELI on Instagram"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:border-pink-500 hover:bg-pink-500/10 transition-all group"
                >
                  <Instagram className="w-5 h-5 text-zinc-300 group-hover:text-pink-400 transition-colors" aria-hidden="true" />
                </a>
                <a 
                  href="https://github.com/teeli-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="View TEELI on GitHub"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:border-purple-500 hover:bg-purple-500/10 transition-all group"
                >
                  <Github className="w-5 h-5 text-zinc-300 group-hover:text-purple-400 transition-colors" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <div className="text-zinc-500 text-xs">
                © 2024 TEELI.NET. All rights reserved.
              </div>
              <div className="flex gap-6 text-xs text-zinc-500">
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="hover:text-cyan-400 transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
