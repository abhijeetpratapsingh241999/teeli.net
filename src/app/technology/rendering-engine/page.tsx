"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Cpu,
  Zap,
  Gauge,
  Layers,
  Eye,
  Sparkles,
  Box,
  Globe,
  ArrowRight,
  CheckCircle2,
  Code,
  Target,
  TrendingUp,
  Monitor,
  HardDrive,
  Activity,
  Cpu as Processor,
  MemoryStick,
  Network,
  Rocket,
  Lock,
  Timer
} from 'lucide-react';
import Link from 'next/link';

export default function RenderingEnginePage() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const renderingFeatures = [
    {
      id: 0,
      title: "Ray Tracing",
      description: "Real-time ray tracing with hardware acceleration",
      icon: Eye,
      specs: "RTX 4090+ Support",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 1,
      title: "Path Tracing",
      description: "Unbiased path tracing for photorealistic rendering",
      icon: Sparkles,
      specs: "4096 Samples/Pixel",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 2,
      title: "Global Illumination",
      description: "Advanced GI algorithms with real-time updates",
      icon: Globe,
      specs: "VXGI / LPV",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 3,
      title: "GPU Acceleration",
      description: "Multi-GPU rendering with CUDA/OpenCL",
      icon: Zap,
      specs: "16x GPUs",
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 4,
      title: "Denoising",
      description: "AI-powered denoising for faster iterations",
      icon: Layers,
      specs: "OptiX / OIDN",
      color: "from-violet-500 to-fuchsia-600"
    },
    {
      id: 5,
      title: "Volumetric Rendering",
      description: "Real-time volumetric fog and clouds",
      icon: Box,
      specs: "64-bit Precision",
      color: "from-sky-500 to-cyan-600"
    }
  ];

  const performanceMetrics = [
    {
      title: "Render Speed",
      value: "120x",
      description: "Faster than CPU rendering",
      icon: Rocket,
      trend: "up"
    },
    {
      title: "Memory Efficiency",
      value: "85%",
      description: "Reduced memory usage",
      icon: MemoryStick,
      trend: "up"
    },
    {
      title: "Ray Performance",
      value: "8.9B",
      description: "Rays per second",
      icon: Activity,
      trend: "up"
    },
    {
      title: "Latency",
      value: "2.3ms",
      description: "Frame render time",
      icon: Timer,
      trend: "down"
    }
  ];

  const technicalSpecs = [
    {
      category: "Rendering API",
      items: ["Vulkan", "DirectX 12", "OpenGL 4.6", "Metal"]
    },
    {
      category: "Shading Models",
      items: ["PBR", "Physically Based", "Subsurface Scattering", "Anisotropic"]
    },
    {
      category: "Lighting",
      items: ["HDR", "IBL", "Area Lights", "IES Profiles"]
    },
    {
      category: "Post-Processing",
      items: ["Tone Mapping", "Bloom", "SSAO", "Motion Blur"]
    }
  ];

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Hexagonal Grid with Ray Visualization */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        {/* Animated Background - Hexagonal Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0"></div>
        </div>

        {/* Animated Ray Lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const length = 800;
            return (
              <div
                key={i}
                style={{ transform: `rotate(${angle}rad)` 
                  height: `${length}px`,
                  left: '50%',
                  top: '50%'
              />
            );
          })}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header Badge */}
          <div
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Advanced Rendering Engine</span>
            </div>
          </div>

          {/* Main Title */}
          <h1
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-center leading-tight"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Next-Gen
            </span>
            <span className="block text-white mt-2">Rendering Engine</span>
          </h1>

          <p
            className="text-xl md:text-2xl text-blue-200/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
          >
            Cutting-edge ray tracing, path tracing, and GPU acceleration for photorealistic rendering at unprecedented speeds.
          </p>

          {/* Hexagonal Feature Grid */}
          <div
            className="relative w-full max-w-5xl mx-auto mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {renderingFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const isSelected = selectedFeature === feature.id;

                return (
                  <div
                    key={feature.id}
                    onClick={() => setSelectedFeature(feature.id)}
                    className="cursor-pointer group relative"
                  >
                    {/* Hexagon Container */}
                    <div className="relative w-full aspect-square">
                      {/* Hexagon Shape */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.color} ${
                          isSelected ? 'opacity-100 scale-110' : 'opacity-60'
                        } transition-all duration-300`
                      />
                      <div
                        className={`absolute inset-[2px] bg-black ${
                          isSelected ? 'border-2 border-blue-400' : 'border border-blue-500/30'
                        } transition-all duration-300`
                      />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                        <Icon className={`w-8 h-8 md:w-10 md:h-10 mb-3 ${
                          isSelected ? 'text-blue-400' : 'text-blue-300/70'
                        } transition-colors`} />
                        <h3 className={`text-sm md:text-base font-bold text-center mb-2 ${
                          isSelected ? 'text-white' : 'text-blue-200/80'
                        } transition-colors`}>
                          {feature.title}
                        </h3>
                        {isSelected && (
                          <div
                            className="text-xs text-blue-300 text-center"
                          >
                            {feature.specs}
                          </div>
                        )}
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <div
                          className="absolute -inset-1 border-2 border-blue-400 rounded-full opacity-50"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Feature Details */}
          <div
            key={selectedFeature}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-950/60 to-black/60 backdrop-blur-xl p-8 text-center">
              <p className="text-lg text-blue-200/80 leading-relaxed">
                {renderingFeatures[selectedFeature]?.description}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                Explore Engine
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-xl border-2 border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold text-lg hover:bg-blue-500/20 transition-all flex items-center gap-2">
                <Code className="w-5 h-5" />
                View API Docs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Performance Metrics - Technical Dashboard */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-indigo-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Performance Benchmarks
            </h2>
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
              Industry-leading rendering performance and efficiency metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border-2 border-blue-700/30 bg-gradient-to-br from-indigo-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-blue-500/50 transition-all group overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-3xl font-bold text-blue-400">{metric.value}</h3>
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-green-400 rotate-180" />
                      )}
                    </div>
                    <h4 className="font-heading text-lg font-bold text-white mb-2">{metric.title}</h4>
                    <p className="text-sm text-blue-200/70 leading-relaxed">{metric.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Specifications - Grid Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Technical Specifications
            </h2>
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
              Comprehensive rendering capabilities and supported technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSpecs.map((spec, index) => (
              <div
                key={index}
                className="relative rounded-2xl border-2 border-blue-700/30 bg-gradient-to-br from-indigo-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-blue-500/50 transition-all"
              >
                <h3 className="font-heading text-xl font-bold text-white mb-4">{spec.category}</h3>
                <div className="space-y-2">
                  {spec.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-blue-200/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rendering Pipeline - Flow Diagram */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-indigo-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Rendering Pipeline
            </h2>
            <p className="text-lg text-blue-200/80 max-w-3xl mx-auto">
              Advanced multi-stage rendering architecture
            </p>
          </div>

          {/* Pipeline Flow */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hidden md:block transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { title: "Geometry", icon: Box, color: "from-blue-500 to-cyan-600" },
                { title: "Lighting", icon: Sparkles, color: "from-cyan-500 to-blue-600" },
                { title: "Ray Tracing", icon: Eye, color: "from-purple-500 to-pink-600" },
                { title: "Post-Process", icon: Layers, color: "from-pink-500 to-purple-600" },
                { title: "Output", icon: Monitor, color: "from-indigo-500 to-blue-600" }
              ].map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={index}
                    className="relative"
                  >
                    {/* Connection Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-black"></div>
                    </div>

                    {/* Stage Card */}
                    <div className="relative rounded-2xl border-2 border-blue-700/30 bg-gradient-to-br from-indigo-950/60 to-black/60 backdrop-blur-xl p-6 text-center">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center mb-4 mx-auto`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">{stage.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-indigo-950/40 via-blue-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            {/* Background Pattern - Technical Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0"></div>
            </div>

            <div
              className="relative z-10"
            >
              <Cpu className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Build?
              </h2>
              <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
                Integrate our advanced rendering engine into your workflow. Get started with our API or request a demo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold text-lg hover:bg-blue-500/20 transition-all flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    API Documentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
