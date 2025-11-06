"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Cloud,
  Network,
  Server,
  Zap,
  Shield,
  Database,
  ArrowRight,
  CheckCircle2,
  Layers,
  Activity,
  Globe,
  Lock,
  Rocket,
  Code,
  GitBranch,
  Container,
  Box,
  Cpu,
  TrendingUp,
  BarChart3,
  FileCode,
  Target
} from 'lucide-react';
import Link from 'next/link';

export default function MultiCloudPage() {
  const [selectedCloud, setSelectedCloud] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const cloudProviders = [
    {
      id: 0,
      name: "AWS",
      description: "Amazon Web Services integration and services",
      icon: Cloud,
      services: ["EC2", "S3", "Lambda", "EKS"],
      color: "from-orange-500 to-amber-600",
      position: "left"
    },
    {
      id: 1,
      name: "Azure",
      description: "Microsoft Azure cloud infrastructure",
      icon: Cloud,
      services: ["AKS", "Blob Storage", "Functions", "Container Instances"],
      color: "from-blue-500 to-cyan-600",
      position: "top"
    },
    {
      id: 2,
      name: "GCP",
      description: "Google Cloud Platform services",
      icon: Cloud,
      services: ["GKE", "Cloud Storage", "Cloud Run", "BigQuery"],
      color: "from-teal-500 to-cyan-600",
      position: "right"
    },
    {
      id: 3,
      name: "Hybrid",
      description: "Hybrid cloud and multi-cloud orchestration",
      icon: Network,
      services: ["Kubernetes", "Terraform", "Ansible", "CloudFormation"],
      color: "from-cyan-500 to-teal-600",
      position: "center"
    }
  ];

  const capabilities = [
    {
      title: "Cloud Regions",
      value: "50+",
      description: "Global cloud infrastructure",
      icon: Globe,
      trend: "up"
    },
    {
      title: "Uptime SLA",
      value: "99.99%",
      description: "High availability guarantee",
      icon: Shield,
      trend: "up"
    },
    {
      title: "Auto Scaling",
      value: "Instant",
      description: "Dynamic resource allocation",
      icon: Zap,
      trend: "up"
    },
    {
      title: "Cost Optimization",
      value: "40%",
      description: "Reduced infrastructure costs",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  const technologies = [
    {
      category: "Container Orchestration",
      items: ["Kubernetes", "Docker Swarm", "Nomad", "Mesos"]
    },
    {
      category: "Infrastructure as Code",
      items: ["Terraform", "Ansible", "CloudFormation", "Pulumi"]
    },
    {
      category: "Serverless",
      items: ["Lambda", "Cloud Functions", "Azure Functions", "Knative"]
    },
    {
      category: "Service Mesh",
      items: ["Istio", "Linkerd", "Consul Connect", "AWS App Mesh"]
    }
  ];

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-teal-950 via-cyan-950 to-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Multi-Cloud Network Visualization */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        {/* Animated Cloud Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              style={{ left: `${Math.random() * 100}%` }}
              
            />
          ))}
        </div>

        {/* Interconnecting Lines Between Clouds */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {/* Central hub connections */}
          <line
            x1="50%"
            y1="40%"
            x2="30%"
            y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="50%"
            y1="40%"
            x2="70%"
            y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="50%"
            y1="40%"
            x2="50%"
            y2="60%"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header Badge */}
          <div
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              <Network className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Multi-Cloud Infrastructure</span>
            </div>
          </div>

          {/* Main Title */}
          <h1}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-center leading-tight"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400">
              Unified
            </span>
            <span className="block text-white mt-2">Multi-Cloud Platform</span>
          </h1>

          <p}
            className="text-xl md:text-2xl text-cyan-200/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
          >
            Seamlessly orchestrate workloads across AWS, Azure, GCP, and hybrid environments with unified management and automation.
          </p>

          {/* Cloud Network Visualization */}
          <div
            className="relative w-full max-w-5xl mx-auto mb-12"
          >
            <div className="relative h-96 md:h-[500px]">
              {/* Central Hub - Hybrid Cloud */}
              <div
                onClick={() => setSelectedCloud(3)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              >
                <div}
                  className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${cloudProviders[3].color} ${
                    selectedCloud === 3 ? 'ring-4 ring-cyan-400 ring-offset-4 ring-offset-black' : ''
                  } flex items-center justify-center transition-all duration-300 shadow-2xl`}
                >
                  <Network className="w-16 h-16 md:w-20 md:h-20 text-white" />
                  
                  {/* Pulse Effect */}
                  {selectedCloud === 3 && (
                    <div
                      className="absolute inset-0 rounded-full bg-cyan-400"
                    />
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-32">
                  <p className={`text-sm md:text-base font-bold text-center ${
                    selectedCloud === 3 ? 'text-cyan-400' : 'text-cyan-300/70'
                  } transition-colors`}>
                    Hybrid Cloud
                  </p>
                </div>
              </div>

              {/* AWS Cloud */}
              <div
                onClick={() => setSelectedCloud(0)}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10"
              >
                <div}
                  className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${cloudProviders[0].color} ${
                    selectedCloud === 0 ? 'ring-4 ring-orange-400 ring-offset-4 ring-offset-black' : ''
                  } flex items-center justify-center transition-all duration-300 shadow-xl`}
                >
                  <Cloud className="w-14 h-14 md:w-18 md:h-18 text-white" />
                  {selectedCloud === 0 && (
                    <div
                      className="absolute inset-0 rounded-full bg-orange-400"
                    />
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-24">
                  <p className={`text-xs md:text-sm font-bold text-center ${
                    selectedCloud === 0 ? 'text-orange-400' : 'text-orange-300/70'
                  } transition-colors`}>
                    AWS
                  </p>
                </div>
              </div>

              {/* Azure Cloud */}
              <div
                onClick={() => setSelectedCloud(1)}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
              >
                <div}
                  className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${cloudProviders[1].color} ${
                    selectedCloud === 1 ? 'ring-4 ring-blue-400 ring-offset-4 ring-offset-black' : ''
                  } flex items-center justify-center transition-all duration-300 shadow-xl`}
                >
                  <Cloud className="w-14 h-14 md:w-18 md:h-18 text-white" />
                  {selectedCloud === 1 && (
                    <div
                      className="absolute inset-0 rounded-full bg-blue-400"
                    />
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-24">
                  <p className={`text-xs md:text-sm font-bold text-center ${
                    selectedCloud === 1 ? 'text-blue-400' : 'text-blue-300/70'
                  } transition-colors`}>
                    Azure
                  </p>
                </div>
              </div>

              {/* GCP Cloud */}
              <div
                onClick={() => setSelectedCloud(2)}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10"
              >
                <div}
                  className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${cloudProviders[2].color} ${
                    selectedCloud === 2 ? 'ring-4 ring-teal-400 ring-offset-4 ring-offset-black' : ''
                  } flex items-center justify-center transition-all duration-300 shadow-xl`}
                >
                  <Cloud className="w-14 h-14 md:w-18 md:h-18 text-white" />
                  {selectedCloud === 2 && (
                    <div
                      className="absolute inset-0 rounded-full bg-teal-400"
                    />
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-24">
                  <p className={`text-xs md:text-sm font-bold text-center ${
                    selectedCloud === 2 ? 'text-teal-400' : 'text-teal-300/70'
                  } transition-colors`}>
                    GCP
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Cloud Details */}
          <div
            key={selectedCloud}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-teal-950/60 to-black/60 backdrop-blur-xl p-8">
              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                {cloudProviders[selectedCloud]?.name}
              </h3>
              <p className="text-lg text-cyan-200/80 mb-6 leading-relaxed">
                {cloudProviders[selectedCloud]?.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {cloudProviders[selectedCloud]?.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                Explore Platform
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-xl border-2 border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold text-lg hover:bg-cyan-500/20 transition-all flex items-center gap-2">
                <FileCode className="w-5 h-5" />
                View Docs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities - Grid Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-teal-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Platform Capabilities
            </h2>
            <p className="text-lg text-cyan-200/80 max-w-3xl mx-auto">
              Enterprise-grade multi-cloud infrastructure performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border-2 border-cyan-700/30 bg-gradient-to-br from-teal-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-cyan-500/50 transition-all group overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">{capability.value}</div>
                    <h4 className="font-heading text-lg font-bold text-white mb-2">{capability.title}</h4>
                    <p className="text-sm text-cyan-200/70 leading-relaxed">{capability.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack - Grid Layout */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Technology Stack
            </h2>
            <p className="text-lg text-cyan-200/80 max-w-3xl mx-auto">
              Comprehensive multi-cloud tools and technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="relative rounded-2xl border-2 border-cyan-700/30 bg-gradient-to-br from-teal-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <h3 className="font-heading text-xl font-bold text-white mb-4">{tech.category}</h3>
                <div className="space-y-2">
                  {tech.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-sm text-cyan-200/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Cloud Architecture - Flow Diagram */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-teal-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Multi-Cloud Architecture
            </h2>
            <p className="text-lg text-cyan-200/80 max-w-3xl mx-auto">
              Unified management and orchestration across cloud providers
            </p>
          </div>

          {/* Architecture Flow */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-600 via-teal-500 to-blue-600 hidden md:block transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { title: "Provision", icon: Rocket, color: "from-cyan-500 to-teal-600" },
                { title: "Orchestrate", icon: Network, color: "from-teal-500 to-cyan-600" },
                { title: "Monitor", icon: Activity, color: "from-blue-500 to-cyan-600" },
                { title: "Secure", icon: Shield, color: "from-cyan-600 to-teal-600" },
                { title: "Scale", icon: TrendingUp, color: "from-teal-600 to-cyan-600" }
              ].map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={index}
                    className="relative"
                  >
                    {/* Connection Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                      <div className="w-4 h-4 rounded-full bg-cyan-500 border-4 border-black"></div>
                    </div>

                    {/* Stage Card */}
                    <div className="relative rounded-2xl border-2 border-cyan-700/30 bg-gradient-to-br from-teal-950/60 to-black/60 backdrop-blur-xl p-6 text-center">
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
          <div className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-teal-950/40 via-cyan-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            {/* Background Pattern - Cloud Network */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0"></div>
            </div>

            <div
              className="relative z-10"
            >
              <Cloud className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Go Multi-Cloud?
              </h2>
              <p className="text-xl text-cyan-200/80 mb-8 max-w-2xl mx-auto">
                Unify your cloud infrastructure across AWS, Azure, GCP, and hybrid environments. Get started today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold text-lg hover:bg-cyan-500/20 transition-all flex items-center gap-2">
                    <FileCode className="w-5 h-5" />
                    Documentation
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
