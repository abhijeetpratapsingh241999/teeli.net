"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  FlaskConical,
  Microscope,
  Atom,
  Rocket,
  Lightbulb,
  Target,
  ArrowRight,
  CheckCircle2,
  Code,
  TrendingUp,
  Activity,
  Zap,
  Globe,
  Brain,
  Sparkles,
  FileCode,
  Award,
  BookOpen,
  Beaker,
  TestTube,
  Gauge,
  Network,
  Cpu,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function ResearchPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const researchAreas = [
    {
      id: 0,
      title: "Quantum Computing",
      description: "Quantum algorithms and hardware research",
      icon: Atom,
      progress: 85,
      papers: 24,
      color: "from-violet-500 to-purple-600"
    },
    {
      id: 1,
      title: "Neural Rendering",
      description: "AI-driven photorealistic rendering",
      icon: Eye,
      progress: 92,
      papers: 18,
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Edge AI",
      description: "Real-time AI at the edge",
      icon: Zap,
      progress: 78,
      papers: 31,
      color: "from-indigo-500 to-violet-600"
    },
    {
      id: 3,
      title: "Distributed Systems",
      description: "Scalable cloud architectures",
      icon: Network,
      progress: 88,
      papers: 27,
      color: "from-violet-600 to-purple-700"
    },
    {
      id: 4,
      title: "3D Reconstruction",
      description: "From 2D to 3D using AI",
      icon: Target,
      progress: 90,
      papers: 22,
      color: "from-purple-600 to-indigo-700"
    },
    {
      id: 5,
      title: "Real-time Ray Tracing",
      description: "Next-gen rendering techniques",
      icon: Sparkles,
      progress: 82,
      papers: 19,
      color: "from-indigo-600 to-violet-700"
    }
  ];

  const innovations = [
    {
      title: "Patents Filed",
      value: "47+",
      description: "Innovation milestones",
      icon: Award,
      trend: "up"
    },
    {
      title: "Research Papers",
      value: "156+",
      description: "Published research",
      icon: BookOpen,
      trend: "up"
    },
    {
      title: "Collaborations",
      value: "23",
      description: "Industry partnerships",
      icon: Globe,
      trend: "up"
    },
    {
      title: "Active Projects",
      value: "12",
      description: "Ongoing research",
      icon: FlaskConical,
      trend: "up"
    }
  ];

  const publications = [
    {
      category: "Computer Graphics",
      items: ["Neural Radiance Fields", "Gaussian Splatting", "Real-time GI", "Path Tracing Optimization"]
    },
    {
      category: "Machine Learning",
      items: ["Neural Rendering", "3D Generation", "Scene Understanding", "Object Reconstruction"]
    },
    {
      category: "Systems Research",
      items: ["Distributed Rendering", "GPU Acceleration", "Cloud Architecture", "Edge Computing"]
    },
    {
      category: "Quantum Computing",
      items: ["Quantum Algorithms", "Quantum ML", "Quantum Simulation", "Hardware Research"]
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-violet-950 via-purple-950 to-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Particle Experiment Visualization */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8"
        onMouseMove={(e) => {
          setMousePosition({ x: e.clientX, y: e.clientY });
        }}
      >
        {/* Animated Particle Field Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => {
            const delay = i * 0.1;
            const duration = 3 + Math.random() * 2;
            return (
              <div
                key={i}
                style={{ left: `${Math.random() * 100}%` 
              />
            );
          })}
        </div>

        {/* Interactive Cursor Follower - Research Beam */}
        <div
          className="absolute pointer-events-none z-0"
        >
          <div 
            className="absolute inset-0 rounded-full blur-3xl"
          />
        </div>

        {/* Molecular Structure Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {researchAreas.map((area, i) => {
            const angle = (i * 360) / researchAreas.length;
            const radius = 200;
            const cx = 50;
            const cy = 50;
            const x = cx + (radius / 100) * Math.cos((angle * Math.PI) / 180);
            const y = cy + (radius / 100) * Math.sin((angle * Math.PI) / 180);
            
            return (
              <line
                key={`line-${i}`}
                x1={`${cx}%`}
                y1={`${cy}%`}
                x2={`${x}%`}
                y2={`${y}%`}
                stroke="rgba(168, 85, 247, 0.3)"
                strokeWidth="1"
              />
            );
          })}
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header Badge */}
          <div
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <FlaskConical className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Research & Innovation Lab</span>
            </div>
          </div>

          {/* Main Title - Split Typography */}
          <div
            className="text-center mb-6"
          >
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
                Research
              </span>
              <span className="block text-white mt-2">& Innovation</span>
            </h1>
          </div>

          <p
            className="text-xl md:text-2xl text-purple-200/80 mb-16 text-center max-w-3xl mx-auto leading-relaxed"
          >
            Pioneering the future of rendering, AI, and quantum computing through cutting-edge research and innovation.
          </p>

          {/* Interactive Research Cards - Circular Layout */}
          <div className="relative w-full max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchAreas.map((area, index) => {
                const Icon = area.icon;
                const isHovered = hoveredCard === area.id;

                return (
                  <div
                    key={area.id}
                    onHoverStart={() => setHoveredCard(area.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative group cursor-pointer"
                  >
                    {/* Card */}
                    <div
                      className={`relative rounded-2xl border-2 ${
                        isHovered ? 'border-purple-500' : 'border-purple-700/30'
                      } bg-gradient-to-br from-purple-950/60 to-black/60 backdrop-blur-xl p-6 overflow-hidden transition-all duration-300`}
                    >
                      {/* Animated Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      />

                      {/* Progress Bar */}
                      <div className="relative w-full h-1 bg-purple-900/50 rounded-full mb-4 overflow-hidden">
                        <div}%` 
                          className={`h-full bg-gradient-to-r ${area.color}`}
                        />
                      </div>

                      {/* Icon */}
                      <div className="relative z-10 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-white mb-2">{area.title}</h3>
                        <p className="text-sm text-purple-200/70 leading-relaxed mb-4">{area.description}</p>
                      </div>

                      {/* Stats */}
                      <div className="relative z-10 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-300">{area.papers} Papers</span>
                        </div>
                        <div className="text-purple-400 font-bold">{area.progress}%</div>
                      </div>

                      {/* Hover Glow Effect */}
                      {isHovered && (
                        <div
                          layoutId="hoverGlow"
                          className="absolute inset-0 rounded-2xl border-2 border-purple-400/50"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                Explore Research
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-xl border-2 border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold text-lg hover:bg-purple-500/20 transition-all flex items-center gap-2">
                <FileCode className="w-5 h-5" />
                View Publications
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Metrics - Dashboard Style */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Innovation Metrics
            </h2>
            <p className="text-lg text-purple-200/80 max-w-3xl mx-auto">
              Quantifying our research impact and innovation output
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovations.map((innovation, index) => {
              const Icon = innovation.icon;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border-2 border-purple-700/30 bg-gradient-to-br from-violet-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all group overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-purple-400 mb-2">{innovation.value}</div>
                    <h4 className="font-heading text-lg font-bold text-white mb-2">{innovation.title}</h4>
                    <p className="text-sm text-purple-200/70 leading-relaxed">{innovation.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research Publications - Grid with Interactive Cards */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Research Publications
            </h2>
            <p className="text-lg text-purple-200/80 max-w-3xl mx-auto">
              Cutting-edge research across multiple domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="relative rounded-2xl border-2 border-purple-700/30 bg-gradient-to-br from-violet-950/60 to-black/60 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all group"
              >
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4">
                  <Microscope className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-heading text-xl font-bold text-white mb-4">{pub.category}</h3>
                <div className="space-y-3">
                  {pub.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      <span className="text-sm text-purple-200/80 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Pipeline - Unique Vertical Flow */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Innovation Pipeline
            </h2>
            <p className="text-lg text-purple-200/80 max-w-3xl mx-auto">
              From ideation to implementation - our research journey
            </p>
          </div>

          {/* Unique Vertical Timeline with Branches */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-violet-600 to-purple-600 transform -translate-x-1/2 hidden md:block"></div>

            {[
              { title: "Ideation", icon: Lightbulb, color: "from-purple-500 to-violet-600", side: "left" },
              { title: "Research", icon: FlaskConical, color: "from-violet-500 to-purple-600", side: "right" },
              { title: "Development", icon: Code, color: "from-indigo-500 to-violet-600", side: "left" },
              { title: "Validation", icon: TestTube, color: "from-purple-600 to-indigo-600", side: "right" },
              { title: "Publication", icon: BookOpen, color: "from-violet-600 to-purple-700", side: "left" }
            ].map((stage, index) => {
              const Icon = stage.icon;
              const isLeft = stage.side === "left";
              
              return (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 mb-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Connection Dot */}
                  <div className="absolute left-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-black transform -translate-x-1/2 z-10 hidden md:block"></div>

                  {/* Content Card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div
                      className="relative rounded-2xl border-2 border-purple-700/30 bg-gradient-to-br from-violet-950/60 to-black/60 backdrop-blur-xl p-6"
                    >
                      <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-br ${stage.color} mb-4 ${
                        isLeft ? 'md:float-right' : ''
                      }`}>
                        <Icon className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-sm">Phase {index + 1}</span>
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-white mb-2">{stage.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-violet-950/40 via-purple-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            {/* Animated Particle Background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  style={{ left: `${Math.random() * 100}%` 
                />
              ))}
            </div>

            <div
              className="relative z-10"
            >
              <FlaskConical className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Join the Research Revolution
              </h2>
              <p className="text-xl text-purple-200/80 mb-8 max-w-2xl mx-auto">
                Partner with us to push the boundaries of what's possible in rendering, AI, and quantum computing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Collaborate
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold text-lg hover:bg-purple-500/20 transition-all flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    View Papers
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
