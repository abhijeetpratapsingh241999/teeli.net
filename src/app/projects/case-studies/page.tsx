"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ArrowRight,
  Award,
  Star,
  ChevronDown,
  ChevronUp,
  Building2,
  Palette,
  Zap,
  Globe,
  Code,
  Camera,
  Filter,
  Users,
  Clock,
  Quote,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedCase, setExpandedCase] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState<{ [key: number]: number }>({});

  const categories = [
    { id: "all", label: "All Projects", icon: Filter },
    { id: "architecture", label: "Architecture", icon: Building2 },
    { id: "product", label: "Product Design", icon: Palette },
    { id: "automotive", label: "Automotive", icon: Zap },
    { id: "interior", label: "Interior Design", icon: Globe },
    { id: "gaming", label: "Gaming", icon: Code },
    { id: "film", label: "Film & VFX", icon: Camera }
  ];

  const caseStudies = [
    {
      id: 0,
      title: "Luxury Residential Complex",
      client: "Estate Developers Inc.",
      category: "architecture",
      location: "Dubai, UAE",
      duration: "6 months",
      budget: "$2.5M",
      teamSize: 12,
      image: "/renveela.webp",
      challenge: "Creating photorealistic renders of a 50-story luxury residential tower with complex lighting scenarios and material variations.",
      solution: "Leveraged AI-powered rendering pipeline with real-time material preview and cloud GPU acceleration for rapid iteration cycles.",
      results: {
        renderTime: "95% faster",
        clientSatisfaction: "4.9/5",
        iterations: "300+ variations",
        costSavings: "40% reduction"
      },
      testimonial: {
        quote: "The quality and speed of renders exceeded our expectations. It transformed how we present projects to clients.",
        author: "Sarah Chen",
        role: "Creative Director",
        company: "Estate Developers Inc.",
        rating: 5
      },
      metrics: [
        { label: "Render Time", before: "24 hours", after: "1.2 hours", improvement: "95%" },
        { label: "Iterations", before: "50", after: "300+", improvement: "500%" },
        { label: "Cost per Render", before: "$500", after: "$50", improvement: "90%" }
      ]
    },
    {
      id: 1,
      title: "Electric Vehicle Launch Campaign",
      client: "AutoTech Motors",
      category: "automotive",
      location: "Global",
      duration: "4 months",
      budget: "$1.8M",
      teamSize: 8,
      image: "/arcveela.webp",
      challenge: "Producing high-quality vehicle renders for global marketing campaign across multiple variants and lighting conditions.",
      solution: "Implemented real-time ray tracing with AI denoising and automated batch rendering for consistency across all assets.",
      results: {
        renderTime: "88% faster",
        clientSatisfaction: "5/5",
        iterations: "450+ variations",
        costSavings: "55% reduction"
      },
      testimonial: {
        quote: "The photorealism achieved in our vehicle renders was indistinguishable from photography. Outstanding work!",
        author: "Michael Rodriguez",
        role: "Marketing Director",
        company: "AutoTech Motors",
        rating: 5
      },
      metrics: [
        { label: "Assets Created", before: "20", after: "120+", improvement: "500%" },
        { label: "Render Time", before: "18 hours", after: "2.1 hours", improvement: "88%" },
        { label: "Campaign Launch", before: "8 weeks", after: "4 weeks", improvement: "50%" }
      ]
    },
    {
      id: 2,
      title: "Boutique Hotel Interior Visualization",
      client: "Hospitality Design Group",
      category: "interior",
      location: "Paris, France",
      duration: "3 months",
      budget: "$950K",
      teamSize: 6,
      image: "/viela.webp",
      challenge: "Visualizing intricate interior spaces with custom lighting, materials, and furniture for client presentation.",
      solution: "Used neural rendering techniques combined with traditional path tracing for optimal balance of speed and quality.",
      results: {
        renderTime: "92% faster",
        clientSatisfaction: "4.8/5",
        iterations: "180+ variations",
        costSavings: "48% reduction"
      },
      testimonial: {
        quote: "The attention to detail in materials and lighting made our clients feel like they were actually in the space.",
        author: "Isabella Laurent",
        role: "Senior Designer",
        company: "Hospitality Design Group",
        rating: 5
      },
      metrics: [
        { label: "Rooms Rendered", before: "5", after: "25+", improvement: "400%" },
        { label: "Render Time", before: "12 hours", after: "1 hour", improvement: "92%" },
        { label: "Client Approval", before: "3 rounds", after: "1 round", improvement: "67%" }
      ]
    }
  ];

  const filteredCases = selectedCategory === "all" 
    ? caseStudies 
    : caseStudies.filter(c => c.category === selectedCategory);

  const handleSliderMove = (caseId: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition({ ...sliderPosition, [caseId]: percentage });
  };

  const handleSliderTouch = (caseId: number, e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition({ ...sliderPosition, [caseId]: percentage });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-950 via-yellow-950 to-black text-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-yellow-900/10 to-emerald-900/20"></div>
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"}}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"}}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div}}}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Project Portfolio</span>
            </div>
          </div>

          <div}}}
            className="text-center mb-6"
          >
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-4">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400">
                Case
              </span>
              <span className="block text-white mt-2">Studies</span>
            </h1>
          </div>

          <p}}}
            className="text-xl md:text-2xl text-amber-200/80 mb-12 text-center max-w-3xl mx-auto leading-relaxed"
          >
            Real projects. Real results. Discover how we've transformed rendering workflows for industry leaders.
          </p>

          <div}}}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { label: "Projects", value: "150+", icon: Award },
              { label: "Clients", value: "80+", icon: Users },
              { label: "Avg. Time Saved", value: "88%", icon: Clock },
              { label: "Client Rating", value: "4.9/5", icon: Star }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}}}}
                  className="text-center p-6 rounded-2xl border border-amber-700/30 bg-gradient-to-br from-amber-950/60 to-black/60 backdrop-blur-xl"
                >
                  <Icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-amber-200/70">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-amber-950/20 to-black border-y border-amber-800/30 sticky top-20 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}}}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all ${
                    isActive
                      ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                      : 'border-amber-700/30 bg-amber-950/30 text-amber-200/70 hover:border-amber-600/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-semibold text-sm">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Grid - Continue in next part due to length */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div}}}}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              All Projects
            </h2>
          </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseStudy, index) => {
                const isExpanded = expandedCase === caseStudy.id;
                return (
                  <div
                    key={caseStudy.id}}}}}
                    className="relative rounded-2xl border-2 border-amber-700/30 bg-gradient-to-br from-amber-950/60 to-black/60 backdrop-blur-xl overflow-hidden group"
                  >
                    {/* Before/After Mini Slider */}
                    {caseStudy.image ? (
                      <div
                        className="relative w-full h-64 cursor-col-resize overflow-hidden"
                        onMouseMove={(e) => handleSliderMove(caseStudy.id, e)}
                        onMouseLeave={() => setSliderPosition({ ...sliderPosition, [caseStudy.id]: 50 })}
                        onTouchMove={(e) => handleSliderTouch(caseStudy.id, e)}
                        onTouchEnd={() => setSliderPosition({ ...sliderPosition, [caseStudy.id]: sliderPosition[caseStudy.id] || 50 })}
                      >
                        {/* Before Image - Blurred */}
                        <div className="absolute inset-0">
                          <Image
                            src={caseStudy.image}
                            alt={`${caseStudy.title} - Before`}
                            fill
                            className="object-cover blur-sm"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        {/* After Image - Full Quality */}
                        <div
                          className="absolute inset-0"% 0 0)`
                          }}
                        >
                          <Image
                            src={caseStudy.image}
                            alt={`${caseStudy.title} - After`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        {/* Slider Line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-lg z-10"%` }}
                        >
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-400 border-2 border-white shadow-lg flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        {/* Labels */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded bg-black/60 backdrop-blur-sm border border-amber-700/30">
                          <span className="text-amber-400 text-xs font-semibold">Before</span>
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded bg-black/60 backdrop-blur-sm border border-emerald-700/30">
                          <span className="text-emerald-400 text-xs font-semibold">After</span>
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded bg-black/60 backdrop-blur-sm border border-amber-700/30">
                          <span className="text-amber-400 text-xs font-semibold">Drag to Compare</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-64 bg-gradient-to-br from-amber-900/40 to-emerald-900/40 flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-amber-400/30" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                          {caseStudy.category}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(caseStudy.testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-white mb-2">{caseStudy.title}</h3>
                      <p className="text-amber-200/70 text-sm mb-4">{caseStudy.client}</p>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-amber-800/30">
                        <div>
                          <div className="text-xs text-amber-200/70 mb-1">Time Saved</div>
                          <div className="text-lg font-bold text-amber-400">{caseStudy.results.renderTime}</div>
                        </div>
                        <div>
                          <div className="text-xs text-amber-200/70 mb-1">Rating</div>
                          <div className="text-lg font-bold text-amber-400">{caseStudy.results.clientSatisfaction}</div>
                        </div>
                        <div>
                          <div className="text-xs text-amber-200/70 mb-1">Savings</div>
                          <div className="text-lg font-bold text-emerald-400">{caseStudy.results.costSavings}</div>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => setExpandedCase(isExpanded ? null : caseStudy.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-amber-700/30 bg-amber-950/30 text-amber-400 font-semibold hover:bg-amber-500/20 transition-all"
                      >
                        {isExpanded ? (
                          <>
                            <span>Show Less</span>
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>View Details</span>
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {/* Expanded Content */}
                      
                        {isExpanded && (
                          <div}}}}
                            className="overflow-hidden mt-4"
                          >
                            <div className="space-y-4 pt-4 border-t border-amber-800/30">
                              <div>
                                <h4 className="text-lg font-bold text-white mb-2">Challenge</h4>
                                <p className="text-sm text-amber-200/80 leading-relaxed">{caseStudy.challenge}</p>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-white mb-2">Solution</h4>
                                <p className="text-sm text-amber-200/80 leading-relaxed">{caseStudy.solution}</p>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-white mb-2">Results</h4>
                                <div className="space-y-2">
                                  {caseStudy.metrics.map((metric, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-amber-950/30 border border-amber-800/30">
                                      <div>
                                        <div className="text-xs text-amber-200/70">{metric.label}</div>
                                        <div className="text-sm font-semibold text-white">
                                          {metric.before} → {metric.after}
                                        </div>
                                      </div>
                                      <div className="text-lg font-bold text-emerald-400">{metric.improvement}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/30">
                                <Quote className="w-6 h-6 text-emerald-400 mb-2" />
                                <p className="text-sm text-emerald-200/90 italic mb-3">"{caseStudy.testimonial.quote}"</p>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-semibold text-white">{caseStudy.testimonial.author}</div>
                                    <div className="text-xs text-emerald-200/70">{caseStudy.testimonial.role}, {caseStudy.testimonial.company}</div>
                                  </div>
                                  <div className="flex gap-0.5">
                                    {[...Array(caseStudy.testimonial.rating)].map((_, i) => (
                                      <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      
                    </div>
                  </div>
                );
              })}
            </div>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-amber-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-yellow-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            <div}}}}
              className="relative z-10"
            >
              <Award className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-amber-200/80 mb-8 max-w-2xl mx-auto">
                Join industry leaders who have transformed their rendering workflows with our cutting-edge solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button}}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-lg shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold text-lg hover:bg-amber-500/20 transition-all flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
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
