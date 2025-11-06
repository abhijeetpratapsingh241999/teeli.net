"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Cloud, 
  Server, 
  Zap, 
  DollarSign, 
  Gauge,
  Globe,
  Building2,
  Film,
  Gamepad2,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Network,
  Clock,
  Rocket,
  Shield,
  Infinity,
  Activity,
  Database,
  BarChart3,
  TrendingUp,
  Layers
} from 'lucide-react';
import Link from 'next/link';

export default function CloudGPURenderingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Dashboard Style */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Cloud className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Enterprise Cloud Infrastructure</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Cloud GPU
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400">
                Rendering Infrastructure
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto mb-12 leading-relaxed">
              Unlimited GPU power at your fingertips. Scale from 1 to 1000+ GPUs instantly. 
              Pay only for what you render—zero infrastructure overhead.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <button
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Rendering
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Infrastructure Dashboard */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {[
              { 
                label: "Active GPUs", 
                value: "1,247", 
                icon: Server, 
                trend: "+12%",
                color: "from-cyan-500 to-cyan-700" 
              },
              { 
                label: "Renders Today", 
                value: "8,934", 
                icon: BarChart3, 
                trend: "+23%",
                color: "from-blue-500 to-blue-700" 
              },
              { 
                label: "Avg. Render Time", 
                value: "4.2m", 
                icon: Clock, 
                trend: "-15%",
                color: "from-green-500 to-green-700" 
              },
              { 
                label: "Uptime", 
                value: "99.97%", 
                icon: Shield, 
                trend: "99.9%+",
                color: "from-purple-500 to-purple-700" 
              }
            ].map((stat, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br ${stat.color} p-6 backdrop-blur-xl`}
              >
                <stat.icon className="w-6 h-6 text-white/80 mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/70 mb-1">{stat.label}</div>
                <div className="text-xs text-white/60">{stat.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Overview - Network Diagram Style */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Global Infrastructure Network
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Distributed GPU clusters across multiple regions for maximum performance and reliability
            </p>
          </div>

          {/* Infrastructure Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Data Centers",
                count: "12",
                description: "Strategic locations worldwide for low latency rendering",
                icon: Globe,
                color: "border-cyan-500/30 bg-cyan-950/20"
              },
              {
                title: "GPU Nodes",
                count: "500+",
                description: "High-performance GPU servers ready for instant scaling",
                icon: Server,
                color: "border-blue-500/30 bg-blue-950/20"
              },
              {
                title: "Regions",
                count: "8",
                description: "Multi-region deployment for global coverage",
                icon: Database,
                color: "border-green-500/30 bg-green-950/20"
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-3xl border-2 ${item.color} p-8 backdrop-blur-xl text-center`}
              >
                <item.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <div className="text-5xl font-bold text-white mb-2">{item.count}</div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Resource Cards */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Enterprise Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Server,
                title: "Distributed GPU Clusters",
                description: "Scale from single GPU instances to massive distributed clusters for parallel rendering.",
                specs: ["NVIDIA A100/H100", "RTX 4090/6000", "Multi-node architecture"]
              },
              {
                icon: Zap,
                title: "High Performance",
                description: "Latest GPU technology optimized for ray tracing, path tracing, and real-time rendering.",
                specs: ["99% GPU utilization", "Low latency", "Fast queue times"]
              },
              {
                icon: DollarSign,
                title: "Pay-Per-Use",
                description: "Only pay for rendering time you use. No upfront costs or infrastructure management.",
                specs: ["Per-minute billing", "No commitments", "Cost transparency"]
              },
              {
                icon: Infinity,
                title: "Unlimited Scalability",
                description: "Scale rendering capacity instantly. Handle single frames or massive batch jobs.",
                specs: ["1 to 1000+ GPUs", "Auto-scaling", "Load balancing"]
              },
              {
                icon: Globe,
                title: "Global Infrastructure",
                description: "Multi-region data centers ensure low latency worldwide for faster uploads/downloads.",
                specs: ["8 regions", "CDN integration", "Edge rendering"]
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption, secure file transfers, and isolated environments for your projects.",
                specs: ["End-to-end encryption", "Isolated environments", "Compliance ready"]
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/60 via-cyan-950/20 to-black/60 backdrop-blur-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="font-heading text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Industry Cards */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-cyan-950/10 to-black">
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
                icon: Film,
                title: "Film & Animation Production",
                description: "Handle massive VFX renders and animation sequences without investing in render farms.",
                examples: [
                  { label: "VFX rendering", href: "/contact?service=vfx-rendering" },
                  { label: "Animation sequences", href: "/contact?service=animation-sequences" },
                  { label: "Feature film projects", href: "/contact?service=feature-film" },
                  { label: "Batch processing", href: "/contact?service=batch-processing" }
                ],
                gradient: "from-blue-500/20 to-cyan-500/20",
                borderColor: "border-blue-500/30"
              },
              {
                icon: Building2,
                title: "Architecture & Visualization",
                description: "Render high-resolution visualizations and animations for client presentations.",
                examples: [
                  { label: "Architectural renders", href: "/contact?service=architectural-renders" },
                  { label: "Animation sequences", href: "/contact?service=arch-animations" },
                  { label: "VR/AR experiences", href: "/contact?service=vr-ar-cloud" },
                  { label: "Marketing materials", href: "/contact?service=marketing-cloud" }
                ],
                gradient: "from-cyan-500/20 to-green-500/20",
                borderColor: "border-cyan-500/30"
              },
              {
                icon: Gamepad2,
                title: "Game Development",
                description: "Accelerate asset baking, lightmap generation, and pre-rendered cutscenes.",
                examples: [
                  { label: "Lightmap baking", href: "/contact?service=lightmap-baking" },
                  { label: "Texture baking", href: "/contact?service=texture-baking" },
                  { label: "Cutscene rendering", href: "/contact?service=cutscene-rendering" },
                  { label: "Asset processing", href: "/contact?service=asset-processing-cloud" }
                ],
                gradient: "from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/30"
              },
              {
                icon: Activity,
                title: "Scientific Visualization",
                description: "Render complex scientific data and simulations requiring massive resources.",
                examples: [
                  { label: "Data visualization", href: "/contact?service=data-viz" },
                  { label: "Simulation rendering", href: "/contact?service=simulation-rendering" },
                  { label: "Medical imaging", href: "/contact?service=medical-imaging" },
                  { label: "Research projects", href: "/contact?service=research-rendering" }
                ],
                gradient: "from-green-500/20 to-emerald-500/20",
                borderColor: "border-green-500/30"
              }
            ].map((useCase, index) => (
              <div
                key={index}
                className={`rounded-3xl border-2 ${useCase.borderColor} bg-gradient-to-br ${useCase.gradient} backdrop-blur-xl p-8 hover:scale-[1.02] transition-transform duration-300`}
              >
                <useCase.icon className="w-12 h-12 text-white mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, idx) => (
                    <Link key={idx} href={example.href}>
                      <span
                        className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-zinc-300 border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-pointer"
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

      {/* Workflow - Process Steps */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Rendering Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                step: "01", 
                title: "Upload Scene", 
                description: "Upload 3D scene files to secure cloud storage",
                icon: Cloud
              },
              { 
                step: "02", 
                title: "Configure", 
                description: "Set parameters and choose GPU configuration",
                icon: Gauge
              },
              { 
                step: "03", 
                title: "Distributed Render", 
                description: "Work distributed across GPU clusters automatically",
                icon: Network
              },
              { 
                step: "04", 
                title: "Download", 
                description: "Receive rendered outputs automatically",
                icon: Rocket
              }
            ].map((item, index) => (
              <div
                key={index}
                className="relative"
              >
                <div className="rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-black/60 via-cyan-950/40 to-black/60 backdrop-blur-xl p-6 text-center h-full">
                  <div className="text-4xl font-bold text-cyan-500/20 mb-3">{item.step}</div>
                  <item.icon className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="w-5 h-5 text-cyan-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack - Minimal List */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Infrastructure Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "NVIDIA A100/H100 GPUs", description: "World's most powerful data center GPUs" },
              { name: "Distributed Rendering", description: "Parallel processing across multiple GPUs" },
              { name: "Kubernetes Orchestration", description: "Automatic scaling and resource management" },
              { name: "Multi-Cloud Architecture", description: "AWS, Azure, and GCP integration" },
              { name: "GPU Virtualization", description: "Efficient resource allocation and isolation" },
              { name: "High-Speed Network", description: "Low-latency inter-node communication" }
            ].map((tech, index) => (
              <div
                key={index}
                className="rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-xl p-6"
              >
                <Cpu className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="font-heading text-lg font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-zinc-400">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Benefits Side */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Why Choose Cloud GPU?
              </h2>
              <div className="space-y-4">
                {[
                  "Eliminate upfront hardware investments",
                  "Scale from 1 to 1000+ GPUs instantly",
                  "Access latest GPU technology always",
                  "99.9% uptime SLA guarantee",
                  "Automatic resource allocation",
                  "Integration with major 3D software"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                    <span className="text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-blue-950/40 to-cyan-950/40 backdrop-blur-xl p-10 text-center"
            >
              <Cloud className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h3 className="font-heading text-3xl font-bold mb-4 text-white">
                Ready to Scale Your Rendering?
              </h3>
              <p className="text-zinc-300 mb-8">
                Start rendering with unlimited GPU power in the cloud.
              </p>
              <Link href="/contact">
                <button
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Start Rendering Now
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
