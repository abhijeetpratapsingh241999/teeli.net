"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Layers, 
  Palette,
  Building2,
  Film,
  Gamepad2,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Code,
  TrendingUp,
  Eye,
  Target,
  Rocket,
  Network,
  Infinity
} from 'lucide-react';
import Link from 'next/link';

export default function AIRenderingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Side Split Design */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <span className="text-purple-400 font-semibold uppercase tracking-wider text-sm">AI-Powered Rendering</span>
              </div>
              
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Neural Rendering
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                  Reimagined
                </span>
              </h1>
              
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Harness the power of artificial intelligence to generate photorealistic renders in seconds, not hours. 
                Our neural rendering engines understand light, materials, and composition like never before.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Experience AI Rendering
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Side - Visual Stats Grid */}
            <div
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: "100x", label: "Faster", icon: Zap, color: "from-purple-500 to-purple-700" },
                { value: "99.8%", label: "Accuracy", icon: Target, color: "from-pink-500 to-pink-700" },
                { value: "24/7", label: "Learning", icon: Brain, color: "from-purple-500 to-pink-500" },
                { value: "∞", label: "Iterations", icon: Infinity, color: "from-pink-500 to-purple-700" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-6 bg-gradient-to-br ${stat.color} border border-white/10`}
                >
                  <stat.icon className="w-8 h-8 mb-3 text-white" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is AI Rendering - Timeline Style */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-6xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              How AI Transforms Rendering
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Traditional rendering relies on computational physics. AI rendering learns from millions of real-world scenes.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block"></div>

            {[
              {
                title: "Traditional Rendering",
                description: "Calculate every light ray, reflection, and material interaction. Hours of computation for a single frame.",
                time: "8-24 hours",
                color: "border-red-500/30 bg-red-950/20"
              },
              {
                title: "AI Rendering",
                description: "Neural networks predict light behavior, material properties, and scene composition. Generate photorealistic results instantly.",
                time: "30-120 seconds",
                color: "border-purple-500/30 bg-purple-950/20"
              },
              {
                title: "Hybrid Approach",
                description: "Combine AI predictions with traditional ray tracing for ultimate quality and speed.",
                time: "2-5 minutes",
                color: "border-pink-500/30 bg-pink-950/20"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="relative mb-12 md:pl-20"
              >
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-black flex items-center justify-center hidden md:flex">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className={`rounded-2xl border-2 ${item.color} p-6 backdrop-blur-xl`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
                    <span className="text-sm text-purple-400 font-semibold">{item.time}</span>
                  </div>
                  <p className="text-zinc-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neural Network Features - Network Style */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Neural Network Capabilities
            </h2>
            <p className="text-lg text-zinc-400">
              Powered by advanced deep learning architectures
            </p>
          </div>

          {/* Network Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Scene Understanding",
                description: "AI analyzes your scene geometry, lighting setup, and materials to predict optimal rendering parameters.",
                connections: ["Light Prediction", "Material Analysis", "Geometry Recognition"]
              },
              {
                icon: Sparkles,
                title: "Light Estimation",
                description: "Neural networks learn from millions of real-world lighting scenarios to predict accurate light behavior.",
                connections: ["Global Illumination", "Shadow Calculation", "Reflection Mapping"]
              },
              {
                icon: Layers,
                title: "Material Intelligence",
                description: "AI understands material properties and how they interact with light across different environments.",
                connections: ["PBR Materials", "Texture Synthesis", "Surface Response"]
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60 backdrop-blur-xl p-8 hover:border-pink-500/50 transition-all group"
              >
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-purple-400" />
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-white mb-4 mt-4">{feature.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{feature.description}</p>
                
                <div className="space-y-2">
                  {feature.connections.map((conn, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-zinc-400">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>{conn}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Applications - Card Stack Style */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-pink-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Industry Applications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Building2,
                title: "Architecture & Real Estate",
                description: "Generate photorealistic architectural visualizations for client presentations and marketing materials.",
                examples: [
                  { label: "Exterior renders", href: "/contact?service=exterior-renders" },
                  { label: "Interior design", href: "/contact?service=interior-design" },
                  { label: "Virtual tours", href: "/contact?service=virtual-tours" },
                  { label: "Marketing materials", href: "/contact?service=marketing-materials" }
                ],
                gradient: "from-blue-500/20 to-cyan-500/20",
                borderColor: "border-blue-500/30"
              },
              {
                icon: Film,
                title: "Entertainment & Media",
                description: "Create stunning visual effects and pre-visualizations for film, TV, and digital content.",
                examples: [
                  { label: "VFX pre-vis", href: "/contact?service=vfx-previs" },
                  { label: "Concept art", href: "/contact?service=concept-art" },
                  { label: "Storyboarding", href: "/contact?service=storyboarding" },
                  { label: "Post-production", href: "/contact?service=post-production" }
                ],
                gradient: "from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/30"
              },
              {
                icon: Gamepad2,
                title: "Game Development",
                description: "Accelerate asset creation and environment design with AI-powered rendering workflows.",
                examples: [
                  { label: "Environment design", href: "/contact?service=env-design" },
                  { label: "Character concepts", href: "/contact?service=character-concepts" },
                  { label: "Prop creation", href: "/contact?service=prop-creation" },
                  { label: "Lightmap previews", href: "/contact?service=lightmap-previews" }
                ],
                gradient: "from-red-500/20 to-orange-500/20",
                borderColor: "border-red-500/30"
              },
              {
                icon: ShoppingBag,
                title: "E-commerce & Product",
                description: "Generate high-quality product renders for online catalogs and marketing campaigns.",
                examples: [
                  { label: "Product visualization", href: "/contact?service=product-viz" },
                  { label: "Catalog images", href: "/contact?service=catalog-images" },
                  { label: "Lifestyle shots", href: "/contact?service=lifestyle-shots" },
                  { label: "Packaging design", href: "/contact?service=packaging-design" }
                ],
                gradient: "from-green-500/20 to-emerald-500/20",
                borderColor: "border-green-500/30"
              }
            ].map((useCase, index) => (
              <div
                key={index}
                className={`relative rounded-3xl border-2 ${useCase.borderColor} bg-gradient-to-br ${useCase.gradient} backdrop-blur-xl p-8 hover:scale-[1.02] transition-transform duration-300`}
              >
                <useCase.icon className="w-12 h-12 text-white mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, idx) => (
                    <Link key={idx} href={example.href}>
                      <span
                        className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-zinc-300 border border-white/20 hover:bg-white/20 hover:border-purple-400/50 hover:text-purple-300 transition-all cursor-pointer"
                      >
                        {example.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Process Flow */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              AI Rendering Process
            </h2>
          </div>

          {/* Horizontal Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                step: "01", 
                title: "Input Scene", 
                description: "Upload your 3D scene or provide design specifications.",
                icon: Network
              },
              { 
                step: "02", 
                title: "AI Analysis", 
                description: "Neural networks analyze geometry, lighting, and materials.",
                icon: Brain
              },
              { 
                step: "03", 
                title: "Predict Rendering", 
                description: "AI predicts optimal rendering parameters and light behavior.",
                icon: Zap
              },
              { 
                step: "04", 
                title: "Generate Output", 
                description: "Receive photorealistic renders in seconds.",
                icon: Sparkles
              }
            ].map((item, index) => (
              <div
                key={index}
                className="relative"
              >
                <div className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-black/60 via-purple-950/40 to-black/60 backdrop-blur-xl p-6 text-center h-full">
                  <div className="text-5xl font-bold text-purple-500/20 mb-4">{item.step}</div>
                  <item.icon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="w-6 h-6 text-purple-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack - Minimal Cards */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Advanced Technology Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              { name: "Neural Networks", icon: Brain },
              { name: "Deep Learning", icon: Network },
              { name: "Ray Tracing", icon: Eye },
              { name: "Path Tracing", icon: Sparkles },
              { name: "PBR Materials", icon: Layers }
            ].map((tech, index) => (
              <div
                key={index}
                className="rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-xl p-6 text-center hover:border-pink-500/50 transition-all group"
              >
                <tech.icon className="w-10 h-10 text-purple-400 mx-auto mb-3 group-hover:text-pink-400 transition-colors" />
                <h3 className="text-sm font-semibold text-white">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Unique Split Design */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Experience
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  AI-Powered Rendering?
                </span>
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Transform your workflow with neural rendering technology. Faster, smarter, more accurate.
              </p>
              <div className="space-y-4">
                {[
                  "100x faster than traditional rendering",
                  "Photorealistic quality guaranteed",
                  "Cost-effective per render",
                  "Scalable to any project size"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <span className="text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-pink-950/40 to-purple-950/40 backdrop-blur-xl p-10 text-center"
            >
              <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="font-heading text-3xl font-bold mb-4 text-white">
                Start Your AI Rendering Journey
              </h3>
              <p className="text-zinc-300 mb-8">
                Get started with our AI rendering platform today.
              </p>
              <Link href="/contact">
                <button
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
