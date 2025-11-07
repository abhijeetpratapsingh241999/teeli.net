"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Film,
  Camera,
  Video,
  Monitor,
  Zap,
  Radio,
  Layers,
  Play,
  Pause,
  Settings,
  Eye,
  Lightbulb,
  Grid3x3,
  Move3D,
  Timer,
  CheckCircle2,
  ArrowRight,
  Radio as RadioIcon,
  Tv,
  Maximize2,
  Target,
  Clock,
  Activity,
  Sparkles,
  Palette
} from 'lucide-react';
import Link from 'next/link';

export default function VirtualProductionPage() {
  const [selectedStage, setSelectedStage] = useState(0);
  const { scrollYProgress } = useScroll();
  
  

  const productionStages = [
    {
      id: 0,
      title: "Pre-Visualization",
      description: "Plan and design virtual sets before production",
      icon: Eye,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 1,
      title: "LED Volume Setup",
      description: "Deploy curved LED walls with real-time rendering",
      icon: Monitor,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 2,
      title: "Camera Tracking",
      description: "Real-time camera position and lens tracking",
      icon: Camera,
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      title: "Live Compositing",
      description: "Real-time compositing with virtual backgrounds",
      icon: Layers,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 4,
      title: "Final Output",
      description: "Cinematic quality footage ready for post",
      icon: Film,
      color: "from-red-500 to-rose-600"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Split Screen Studio View */}
      <section className="relative min-h-screen md:h-screen flex flex-col md:flex-row items-center overflow-hidden pt-32 md:pt-32 lg:pt-40">
        {/* Left Side - Live Feed Simulation */}
        <div 
          className="w-full md:w-1/2 h-[50vh] md:h-full relative bg-gradient-to-br from-zinc-900 to-black border-b-2 md:border-b-0 md:border-r-2 border-amber-500/30">
          <div className="absolute inset-0 p-4 md:p-8">
            {/* Camera Viewport Frame */}
            <div className="relative h-full border-2 md:border-4 border-amber-400/50 rounded-lg overflow-hidden bg-black/80 backdrop-blur-sm">
              {/* Grid Overlay (like camera viewfinder) */}
              <div className="absolute inset-0 opacity-20"></div>
              
              {/* Virtual Set Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* LED Wall Background Simulation */}
                  <div className="w-64 h-40 md:w-96 md:h-64 bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-purple-900/40 rounded-lg border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                    {/* Virtual Environment Elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl"
                      ></div>
                      <div
                        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-xl"
                      ></div>
                    </div>
                  </div>
                  
                  {/* Camera Tracking Indicator */}
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-amber-500/20 border border-amber-400/50 rounded-full text-xs text-amber-300 flex items-center gap-2"
                  >
                    <Radio className="w-3 h-3" />
                    <span>Tracking: Active</span>
                  </div>
                </div>
              </div>

              {/* Camera Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs">
                <div className="space-y-1">
                  <div className="text-amber-400">FPS: 24</div>
                  <div className="text-amber-400">Resolution: 4K</div>
                </div>
                <div className="text-amber-400">REC <span className="w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse"></span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Control Panel */}
        <div 
          className="w-full md:w-1/2 h-auto md:h-full relative bg-gradient-to-br from-black to-zinc-950 flex flex-col justify-center px-6 md:px-12 py-12 md:py-0">
          <div
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-8">
              <Film className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Virtual Production Studio</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
              Real-Time
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                Virtual Sets
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 mb-8 leading-relaxed">
              Transform your production with LED volumes, real-time rendering, and camera tracking. 
              Create photorealistic virtual environments that respond to your camera in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Production
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="px-8 py-4 rounded-xl border-2 border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold text-lg hover:bg-amber-500/20 transition-all flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Production Timeline - Unique Horizontal Scrolling Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Production Pipeline
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              From concept to final cut - seamless virtual production workflow
            </p>
          </div>

          {/* Interactive Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hidden md:block transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {productionStages.map((stage, index) => {
                const Icon = stage.icon;
                const isSelected = selectedStage === stage.id;
                
                return (
                  <div
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className="relative cursor-pointer group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-r ${stage.color} border-4 border-black shadow-lg`}
                      ></div>
                    </div>

                    {/* Stage Card */}
                    <div
                      className={`relative rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 ${
                        isSelected
                          ? `border-amber-500/70 bg-gradient-to-br from-amber-950/40 to-orange-950/40 shadow-[0_0_40px_rgba(251,191,36,0.3)]`
                          : 'border-zinc-700 bg-gradient-to-br from-zinc-900/40 to-black/40 hover:border-amber-500/30'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center mb-6 mx-auto`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-white mb-3 text-center">{stage.title}</h3>
                      <p className="text-sm text-zinc-400 text-center leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack - Grid Layout with Real-Time Indicators */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Production Technology
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Industry-leading tools for professional virtual production
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "LED Volume Walls",
                description: "Curved LED displays up to 100ft wide with pixel-perfect rendering",
                icon: Monitor,
                stats: "4K-8K Resolution",
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Real-Time Engine",
                description: "Unreal Engine 5 / Unity integration with nanite and lumen",
                icon: Zap,
                stats: "< 16ms Latency",
                color: "from-blue-500 to-cyan-600"
              },
              {
                title: "Camera Tracking",
                description: "Optical and inertial tracking for real-time camera movement",
                icon: Target,
                stats: "Sub-millimeter Precision",
                color: "from-purple-500 to-pink-600"
              },
              {
                title: "Genlock & Timecode",
                description: "Frame-accurate synchronization across all devices",
                icon: Clock,
                stats: "Frame-Perfect Sync",
                color: "from-amber-500 to-orange-600"
              },
              {
                title: "Color Management",
                description: "HDR color workflows with ACES color science",
                icon: Palette,
                stats: "HDR10+ Support",
                color: "from-red-500 to-rose-600"
              },
              {
                title: "Live Compositing",
                description: "Real-time alpha channel and depth keying",
                icon: Layers,
                stats: "Real-Time Blend",
                color: "from-cyan-500 to-blue-600"
              }
            ].map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={index}
                  className="relative rounded-2xl border-2 border-zinc-700 bg-gradient-to-br from-zinc-900/60 to-black/60 backdrop-blur-xl p-6 hover:border-amber-500/50 transition-all group overflow-hidden"
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">{tech.title}</h3>
                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{tech.description}</p>
                    <div className="flex items-center gap-2 text-xs text-amber-400">
                      <Activity className="w-4 h-4" />
                      <span className="font-semibold">{tech.stats}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases - Film Studio Theme */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Production Applications
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Feature Films",
                description: "Replace green screen with dynamic LED backgrounds for natural lighting and reflections",
                features: ["In-camera VFX", "Natural reflections", "Real-time preview", "Reduced post-production"],
                gradient: "from-amber-500/20 to-orange-500/20",
                borderColor: "border-amber-500/30"
              },
              {
                title: "TV & Streaming",
                description: "Rapid set changes and location flexibility without physical builds",
                features: ["Quick turnaround", "Multiple locations", "Cost-effective", "Studio-based production"],
                gradient: "from-blue-500/20 to-cyan-500/20",
                borderColor: "border-blue-500/30"
              },
              {
                title: "Commercials",
                description: "Create stunning visual environments for product shots and brand storytelling",
                features: ["Flexible sets", "High production value", "Fast iteration", "Brand consistency"],
                gradient: "from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/30"
              },
              {
                title: "Live Events",
                description: "Virtual stages for concerts, presentations, and broadcast productions",
                features: ["Live switching", "Dynamic backgrounds", "Multi-camera support", "Broadcast integration"],
                gradient: "from-red-500/20 to-rose-500/20",
                borderColor: "border-red-500/30"
              }
            ].map((useCase, index) => (
              <div
                key={index}
                className={`relative rounded-3xl border-2 ${useCase.borderColor} bg-gradient-to-br ${useCase.gradient} backdrop-blur-xl p-8 hover:scale-[1.02] transition-transform duration-300`}
              >
                <Film className="w-12 h-12 text-white mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Studio Booking Theme */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-orange-950/40 to-red-950/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            {/* Studio Floor Pattern Background */}
            <div className="absolute inset-0 opacity-10"></div>
            
            <div
              className="relative z-10"
            >
              <Film className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Start Production?
              </h2>
              <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                Book a studio session or consultation to see how virtual production can transform your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Book Studio Session
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold text-lg hover:bg-amber-500/20 transition-all">
                    Request Quote
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
