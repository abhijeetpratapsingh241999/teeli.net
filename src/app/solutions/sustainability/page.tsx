"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Leaf,
  Recycle,
  Zap,
  TrendingDown,
  Globe,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Wind,
  Droplets,
  Sun,
  TreePine,
  Activity,
  Target,
  Gauge,
  Sparkles,
  Earth,
  Factory,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

export default function SustainabilityPage() {
  const [selectedMetric, setSelectedMetric] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pipelineSteps = [
    {
      id: 0,
      title: "Energy Assessment",
      description: "Analyze current energy consumption and carbon footprint",
      icon: Gauge,
      color: "from-emerald-500 to-green-600",
      metric: "Track Baseline"
    },
    {
      id: 1,
      title: "Green Infrastructure",
      description: "Migrate to renewable energy-powered GPU farms",
      icon: Wind,
      color: "from-teal-500 to-cyan-600",
      metric: "100% Renewable"
    },
    {
      id: 2,
      title: "Optimization Engine",
      description: "AI-driven resource allocation and efficiency tuning",
      icon: Zap,
      color: "from-lime-500 to-emerald-600",
      metric: "40% Reduction"
    },
    {
      id: 3,
      title: "Carbon Offset",
      description: "Automatic carbon credit allocation and tracking",
      icon: TreePine,
      color: "from-green-600 to-teal-600",
      metric: "Net Zero"
    },
    {
      id: 4,
      title: "Sustainability Report",
      description: "Real-time dashboard and compliance documentation",
      icon: BarChart3,
      color: "from-emerald-600 to-green-700",
      metric: "Full Transparency"
    }
  ];

  const sustainabilityMetrics = [
    {
      title: "Carbon Footprint",
      value: "-65%",
      description: "Reduction in CO₂ emissions",
      icon: Factory,
      trend: "down",
      color: "from-red-500 to-orange-600"
    },
    {
      title: "Energy Efficiency",
      value: "+85%",
      description: "Improvement in power usage",
      icon: Lightbulb,
      trend: "up",
      color: "from-yellow-500 to-amber-600"
    },
    {
      title: "Renewable Energy",
      value: "100%",
      description: "Green energy adoption",
      icon: Sun,
      trend: "up",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Water Conservation",
      value: "-70%",
      description: "Reduction in cooling water usage",
      icon: Droplets,
      trend: "down",
      color: "from-blue-500 to-cyan-600"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-emerald-950 via-green-950 to-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Circular Pipeline Visualization */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        {/* Animated Background - Organic Flow Patterns */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl"
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/30 to-lime-500/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header Badge */}
          <div
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Sustainable Rendering Pipeline</span>
            </div>
          </div>

          {/* Main Title */}
          <h1
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-center leading-tight"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
              Carbon-Neutral
            </span>
            <span className="block text-white mt-2">Rendering Pipeline</span>
          </h1>

          <p
            className="text-xl md:text-2xl text-emerald-200/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
          >
            Transform your rendering workflow into an eco-friendly, carbon-negative operation with AI-optimized energy management and renewable infrastructure.
          </p>

          {/* Circular Pipeline Visualization */}
          <div
            className="relative w-full max-w-4xl mx-auto aspect-square mb-12"
          >
            {/* Outer Ring - Pipeline Flow */}
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 8px)"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 50}%`}
                  strokeDashoffset="0"
                  className="animate-spin-slow"
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Pipeline Steps in Circle */}
            <div className="absolute inset-0">
              {pipelineSteps.map((step, index) => {
                const angle = (index * 360) / pipelineSteps.length - 90; // Start from top
                const radius = 42; // Percentage from center
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                const Icon = step.icon;
                const isSelected = selectedMetric === step.id;

                return (
                  <div
                    key={step.id}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    
                    onClick={() => setSelectedMetric(step.id)}
                    className="cursor-pointer group"
                  >
                    <div
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${step.color} border-4 ${
                        isSelected ? 'border-white shadow-[0_0_30px_rgba(16,185,129,0.8)]' : 'border-emerald-900/50'
                      } flex items-center justify-center transition-all duration-300`}
                    >
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      {isSelected && (
                        <div
                          className="absolute -inset-2 rounded-full border-2 border-emerald-400"
                        />
                      )}
                    </div>
                    {/* Step Label */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-32 md:w-40">
                      <p className={`text-xs md:text-sm font-bold text-center ${isSelected ? 'text-emerald-400' : 'text-emerald-300/70'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center - Main Metric Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-emerald-900/80 to-green-950/80 backdrop-blur-xl border-4 border-emerald-500/30 flex flex-col items-center justify-center p-8"
              >
                <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-2">
                  {pipelineSteps[selectedMetric]?.metric || "65%"}
                </div>
                <div className="text-xs md:text-sm text-emerald-300/80 text-center font-semibold uppercase tracking-wider">
                  {pipelineSteps[selectedMetric]?.title || "Carbon Reduction"}
                </div>
                <Leaf className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 mt-4" />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                Start Green Pipeline
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-lg hover:bg-emerald-500/20 transition-all flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                View Metrics
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainability Metrics Grid - Unique Card Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-emerald-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Real-Time Impact Metrics
            </h2>
            <p className="text-lg text-emerald-200/80 max-w-3xl mx-auto">
              Track your sustainability improvements with live, transparent data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border-2 border-emerald-700/30 bg-gradient-to-br from-emerald-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-emerald-500/50 transition-all group overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-3xl font-bold text-emerald-400">{metric.value}</h3>
                      {metric.trend === "down" ? (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-emerald-400 rotate-180" />
                      )}
                    </div>
                    <h4 className="font-heading text-lg font-bold text-white mb-2">{metric.title}</h4>
                    <p className="text-sm text-emerald-200/70 leading-relaxed">{metric.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pipeline Process - Vertical Flow with Connection Lines */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Pipeline Architecture
            </h2>
            <p className="text-lg text-emerald-200/80 max-w-3xl mx-auto">
              Step-by-step transformation to a sustainable rendering ecosystem
            </p>
          </div>

          <div className="relative">
            {/* Vertical Connection Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600 via-teal-600 to-green-600 transform md:-translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600 via-teal-600 to-green-600 block md:hidden"></div>

            {/* Pipeline Steps */}
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={`relative flex items-center gap-6 md:gap-12 mb-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Connection Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-black transform md:-translate-x-1/2 z-10"></div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 flex-1 ${
                    isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}>
                    <div
                      className="relative rounded-2xl border-2 border-emerald-700/30 bg-gradient-to-br from-emerald-950/60 to-black/60 backdrop-blur-xl p-6 md:p-8"
                    >
                      <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-br ${step.color} mb-4`}>
                        <Icon className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-sm">Step {index + 1}</span>
                      </div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-emerald-200/80 leading-relaxed mb-4">{step.description}</p>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-semibold">{step.metric}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Grid - Organic Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-emerald-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Environmental Benefits
            </h2>
            <p className="text-lg text-emerald-200/80 max-w-3xl mx-auto">
              Comprehensive sustainability advantages for your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Carbon Neutral Operations",
                description: "Achieve net-zero carbon emissions through renewable energy and offset programs",
                icon: Globe,
                color: "from-emerald-500 to-teal-600"
              },
              {
                title: "Cost Reduction",
                description: "Lower operational costs through energy-efficient infrastructure",
                icon: TrendingDown,
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Compliance Ready",
                description: "Meet global environmental regulations and ESG standards",
                icon: CheckCircle2,
                color: "from-teal-500 to-cyan-600"
              },
              {
                title: "Real-Time Monitoring",
                description: "Track sustainability metrics with live dashboards and alerts",
                icon: Activity,
                color: "from-lime-500 to-green-600"
              },
              {
                title: "Renewable Integration",
                description: "Seamlessly integrate solar, wind, and hydro power sources",
                icon: Sun,
                color: "from-yellow-500 to-amber-600"
              },
              {
                title: "Supply Chain Impact",
                description: "Extend sustainability practices across your entire workflow",
                icon: Recycle,
                color: "from-emerald-600 to-green-700"
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border-2 border-emerald-700/30 bg-gradient-to-br from-emerald-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-emerald-500/50 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-sm text-emerald-200/70 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Earth Theme */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-green-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            {/* Background Pattern - Leaf/Organic */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0"></div>
            </div>

            <div
              className="relative z-10"
            >
              <Earth className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Go Green?
              </h2>
              <p className="text-xl text-emerald-200/80 mb-8 max-w-2xl mx-auto">
                Join leading studios and agencies in building a sustainable future for rendering. Start your carbon-neutral pipeline today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Start Sustainability Journey
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-lg hover:bg-emerald-500/20 transition-all flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Request Audit
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
