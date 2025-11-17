'use client';

import { BookOpen, Clock, TrendingUp, Award, ArrowRight, CheckCircle, PlayCircle, FileText, Code } from 'lucide-react';
import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function GuidesPage() {
  const { theme } = useBlogTheme();
  
  const guides = [
    {
      title: "Complete 3D Rendering Guide",
      category: "Tutorial Series",
      level: "Beginner to Advanced",
      duration: "8 hours",
      modules: 12,
      gradient: "from-blue-500 to-cyan-600",
      description: "Master photorealistic rendering from scene setup to final output. Learn industry-standard workflows, lighting techniques, and material creation.",
      topics: ["Scene Setup", "Lighting Fundamentals", "Material Creation", "Camera Settings", "Render Optimization", "Post-Processing"],
      featured: true,
      href: "/blog/topics/3d-rendering"
    },
    {
      title: "AI Integration Handbook",
      category: "Comprehensive Guide",
      level: "Intermediate",
      duration: "6 hours",
      modules: 10,
      gradient: "from-purple-500 to-pink-600",
      description: "Integrate AI tools into your 3D workflow. From AI-powered denoising to neural rendering and automated asset generation.",
      topics: ["AI Denoising", "Neural Rendering", "Auto-Generation", "Style Transfer", "Upscaling", "Workflow Integration"],
      featured: true,
      href: "/blog/topics/ai-ml"
    },
    {
      title: "Cloud Rendering Setup Walkthrough",
      category: "Step-by-Step Tutorial",
      level: "Intermediate",
      duration: "4 hours",
      modules: 8,
      gradient: "from-green-500 to-emerald-600",
      description: "Set up cloud rendering infrastructure for distributed computing. AWS, Google Cloud, and Azure rendering farm configuration.",
      topics: ["Cloud Basics", "AWS Setup", "GPU Instances", "Cost Optimization", "Network Config", "Security"],
      featured: false,
      href: "/blog/topics/cloud-devops"
    },
    {
      title: "Lighting Masterclass",
      category: "Advanced Course",
      level: "Advanced",
      duration: "10 hours",
      modules: 15,
      gradient: "from-orange-500 to-red-600",
      description: "Professional lighting techniques for architectural visualization. Three-point lighting, HDRI lighting, and studio setups.",
      topics: ["Natural Light", "Studio Lighting", "HDRI Setup", "Light Mixing", "Color Theory", "Mood Creation"],
      featured: true,
      href: "/blog/topics/3d-rendering"
    },
    {
      title: "Material Creation Workshop",
      category: "Hands-on Workshop",
      level: "Intermediate",
      duration: "5 hours",
      modules: 9,
      gradient: "from-pink-500 to-rose-600",
      description: "Create physically accurate materials using PBR workflows. Metal, glass, wood, fabric, and custom shader development.",
      topics: ["PBR Basics", "Metal Materials", "Glass & Transparency", "Organic Materials", "Shader Nodes", "Texture Mapping"],
      featured: false,
      href: "/blog/topics/3d-rendering"
    },
    {
      title: "Digital Twin Implementation Guide",
      category: "Technical Guide",
      level: "Advanced",
      duration: "7 hours",
      modules: 11,
      gradient: "from-teal-500 to-cyan-600",
      description: "Build real-time digital twins with IoT integration. BIM data synchronization, sensor integration, and live updates.",
      topics: ["BIM Integration", "IoT Sensors", "Real-time Sync", "Data Visualization", "Simulation", "Monitoring"],
      featured: false,
      href: "/blog/topics/digital-twins"
    },
    {
      title: "Metaverse Development Basics",
      category: "Getting Started",
      level: "Beginner",
      duration: "6 hours",
      modules: 10,
      gradient: "from-violet-500 to-purple-600",
      description: "Create immersive virtual experiences for the metaverse. WebGL, Three.js, and interactive 3D web development.",
      topics: ["WebGL Basics", "Three.js Setup", "Interactive 3D", "Multiplayer", "VR Integration", "Optimization"],
      featured: false,
      href: "/blog/topics/metaverse"
    },
    {
      title: "Sustainable Rendering Practices",
      category: "Best Practices",
      level: "All Levels",
      duration: "3 hours",
      modules: 6,
      gradient: "from-green-500 to-lime-600",
      description: "Reduce carbon footprint of rendering workflows. Energy-efficient rendering, green cloud computing, and optimization strategies.",
      topics: ["Energy Efficiency", "Cloud Optimization", "Carbon Tracking", "Eco Rendering", "Best Practices", "Tools"],
      featured: false,
      href: "/blog/topics/sustainability"
    },
    {
      title: "Blockchain for Creatives",
      category: "Introduction",
      level: "Beginner",
      duration: "4 hours",
      modules: 7,
      gradient: "from-yellow-500 to-orange-600",
      description: "NFTs, digital rights, and blockchain technology for 3D artists. Smart contracts and decentralized asset management.",
      topics: ["NFT Basics", "Minting Guide", "Smart Contracts", "Digital Rights", "Marketplaces", "Wallets"],
      featured: false,
      href: "/blog/topics/blockchain"
    }
  ];

  const learningPaths = [
    {
      title: "3D Artist Career Path",
      steps: ["Beginner Fundamentals", "Intermediate Techniques", "Advanced Mastery", "Portfolio Building"],
      duration: "6-12 months",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Technical Artist Track",
      steps: ["Python Scripting", "Pipeline Development", "Shader Programming", "Tool Creation"],
      duration: "8-14 months",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Architectural Visualization",
      steps: ["CAD Integration", "Lighting Setup", "Post-Production", "Client Management"],
      duration: "4-8 months",
      gradient: "from-green-500 to-teal-600"
    }
  ];

  return (
    <div className={`min-h-screen pt-32 pb-20 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-black'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <Link 
            href="/blog/resources"
            className={`inline-flex items-center gap-2 mb-6 group cursor-pointer ${
              theme === 'dark' ? 'text-purple-300 hover:text-purple-200' : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Resources</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 mb-6">
            <BookOpen className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Learning Guides</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-300 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Comprehensive Guides & Tutorials
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-3xl leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Step-by-step learning paths from fundamentals to advanced techniques. Master 3D rendering, AI integration, and cutting-edge technologies with expert-led tutorials.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Total Guides", value: "50+", icon: BookOpen },
            { label: "Video Hours", value: "120+", icon: PlayCircle },
            { label: "Completion Rate", value: "94%", icon: TrendingUp },
            { label: "Certificates", value: "15", icon: Award }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`p-6 rounded-xl border text-center ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`} />
                <div className={`text-3xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{stat.value}</div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Featured Guides */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Featured Guides</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {guides.filter(g => g.featured).map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className={`group cursor-pointer relative overflow-hidden p-8 rounded-2xl border transition-all duration-500 hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:border-purple-400/40'
                    : 'bg-white border-gray-200 hover:border-purple-400/40 shadow-lg'
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${guide.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      theme === 'dark' 
                        ? `bg-gradient-to-r ${guide.gradient} bg-opacity-20 text-white/90` 
                        : 'bg-white border border-gray-300 text-gray-800'
                    }`}>
                      {guide.category}
                    </span>
                    <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${
                      theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                    }`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${guide.gradient} group-hover:bg-clip-text transition-all ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {guide.title}
                  </h3>

                  <p className={`mb-6 leading-relaxed ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {guide.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <div className={`flex items-center gap-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Award className="w-4 h-4" />
                      <span>{guide.level}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <Clock className="w-4 h-4" />
                      <span>{guide.duration}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FileText className="w-4 h-4" />
                      <span>{guide.modules} modules</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {guide.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className={`px-3 py-1 rounded-full text-xs border ${
                          theme === 'dark'
                            ? 'bg-white/5 border-white/10 text-gray-300'
                            : 'bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                    {guide.topics.length > 4 && (
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        +{guide.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Guides */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>All Guides</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className={`group cursor-pointer relative overflow-hidden p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:border-purple-400/30'
                    : 'bg-white border-gray-200 hover:border-purple-400/30 shadow-sm'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${guide.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium mb-3 ${
                    theme === 'dark' 
                      ? `bg-gradient-to-r ${guide.gradient} bg-opacity-20 text-white/90` 
                      : 'bg-white border border-gray-300 text-gray-800'
                  }`}>
                    {guide.category}
                  </span>

                  <h3 className={`text-lg font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {guide.title}
                  </h3>

                  <p className={`text-sm mb-4 line-clamp-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {guide.description}
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {guide.modules} modules • {guide.duration}
                    </span>
                    <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                      theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Structured Learning Paths</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <div
                key={path.title}
                className={`p-6 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <div className={`inline-block px-3 py-1 rounded-lg text-xs font-medium mb-4 ${
                  theme === 'dark' 
                    ? `bg-gradient-to-r ${path.gradient} bg-opacity-20 text-white/90` 
                    : 'bg-white border border-gray-300 text-gray-800'
                }`}>
                  {path.duration}
                </div>

                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {path.title}
                </h3>

                <div className="space-y-3">
                  {path.steps.map((step, idx) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-r ${path.gradient} ${
                        theme === 'dark' ? 'text-white' : 'text-white'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`p-8 rounded-2xl border text-center ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-400/20'
            : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
        }`}>
          <BookOpen className={`w-12 h-12 mx-auto mb-4 ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
          }`} />
          <h3 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            New Guides Added Weekly
          </h3>
          <p className={`mb-6 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Subscribe to get notified when we publish new tutorials and learning resources.
          </p>
          <Link
            href="/blog/newsletter"
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 font-medium hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span>Subscribe Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
