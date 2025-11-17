'use client';

import { Wrench, Star, Zap, Award, ArrowRight, ExternalLink, Download, Heart, TrendingUp, Code } from 'lucide-react';
import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function ToolsPage() {
  const { theme } = useBlogTheme();
  
  const toolCategories = [
    {
      title: "3D Rendering Engines",
      gradient: "from-blue-500 to-cyan-600",
      icon: Zap,
      description: "Industry-leading rendering engines for photorealistic visualization",
      tools: [
        {
          name: "V-Ray",
          type: "Commercial",
          rating: 4.8,
          price: "$80/month",
          description: "Industry standard for architectural visualization with advanced lighting",
          features: ["GPU Rendering", "Adaptive Lights", "Denoiser", "IPR"],
          platforms: ["3ds Max", "Maya", "SketchUp", "Rhino"],
          popular: true
        },
        {
          name: "Corona Renderer",
          type: "Commercial",
          rating: 4.7,
          price: "$30/month",
          description: "Artist-friendly renderer with interactive rendering and denoising",
          features: ["Interactive Rendering", "Light Mix", "UHD Cache", "LightSelect"],
          platforms: ["3ds Max", "Cinema 4D"],
          popular: true
        },
        {
          name: "Cycles (Blender)",
          type: "Free/Open Source",
          rating: 4.6,
          price: "Free",
          description: "Powerful open-source path tracer with GPU acceleration",
          features: ["GPU+CPU", "OSL Shaders", "Denoising", "Volumes"],
          platforms: ["Blender"],
          popular: true
        },
        {
          name: "Octane Render",
          type: "Commercial",
          rating: 4.7,
          price: "$20/month",
          description: "First GPU-based, unbiased renderer with real-time preview",
          features: ["GPU Only", "Real-time", "AI Denoiser", "ACES"],
          platforms: ["Cinema 4D", "3ds Max", "Maya", "Houdini"],
          popular: false
        },
        {
          name: "Arnold",
          type: "Commercial",
          rating: 4.6,
          price: "$45/month",
          description: "Production-proven renderer used in major VFX studios",
          features: ["CPU Rendering", "Volumes", "Subsurface", "AOVs"],
          platforms: ["Maya", "3ds Max", "Houdini", "Cinema 4D"],
          popular: false
        },
        {
          name: "Redshift",
          type: "Commercial",
          rating: 4.7,
          price: "$50/month",
          description: "Biased GPU renderer optimized for speed and flexibility",
          features: ["GPU Only", "Proxy System", "AOVs", "Volume Rendering"],
          platforms: ["Cinema 4D", "Maya", "3ds Max", "Houdini"],
          popular: false
        }
      ]
    },
    {
      title: "AI-Powered Tools",
      gradient: "from-purple-500 to-pink-600",
      icon: Zap,
      description: "Cutting-edge AI tools for rendering, upscaling, and generation",
      tools: [
        {
          name: "Topaz Gigapixel AI",
          type: "Commercial",
          rating: 4.8,
          price: "$99 (one-time)",
          description: "AI-powered image upscaling up to 600% with exceptional quality",
          features: ["6x Upscale", "Face Recovery", "Batch Process", "Denoise"],
          platforms: ["Windows", "macOS"],
          popular: true
        },
        {
          name: "NVIDIA AI Denoiser",
          type: "Free",
          rating: 4.7,
          price: "Free",
          description: "Real-time AI denoising for interactive and final renders",
          features: ["Real-time", "OptiX Based", "Multiple Passes", "Low Overhead"],
          platforms: ["Multiple DCCs"],
          popular: true
        },
        {
          name: "Stable Diffusion",
          type: "Free/Open Source",
          rating: 4.6,
          price: "Free",
          description: "Text-to-image AI for concept art and texture generation",
          features: ["Text-to-Image", "Img2Img", "Inpainting", "ControlNet"],
          platforms: ["Web", "Desktop"],
          popular: true
        },
        {
          name: "Runway ML",
          type: "Commercial",
          rating: 4.5,
          price: "$12/month",
          description: "AI-powered video and image editing suite",
          features: ["Video Gen", "Remove BG", "Frame Interpolation", "Upscaling"],
          platforms: ["Web"],
          popular: false
        }
      ]
    },
    {
      title: "Asset Libraries",
      gradient: "from-green-500 to-emerald-600",
      icon: Download,
      description: "High-quality 3D models, textures, and HDRIs",
      tools: [
        {
          name: "Poly Haven",
          type: "Free",
          rating: 4.9,
          price: "Free (CC0)",
          description: "100% free, public domain 3D assets including HDRIs and textures",
          features: ["HDRIs", "Textures", "Models", "CC0 License"],
          platforms: ["All DCCs"],
          popular: true
        },
        {
          name: "Quixel Megascans",
          type: "Free for UE",
          rating: 4.8,
          price: "Free (UE) / $19/month",
          description: "Photoscanned 3D assets, surfaces, and vegetation",
          features: ["Photoscanned", "8K Textures", "LODs", "Vegetation"],
          platforms: ["Unreal Engine", "All DCCs"],
          popular: true
        },
        {
          name: "Poliigon",
          type: "Commercial",
          rating: 4.7,
          price: "$18/month",
          description: "Premium PBR textures, models, and HDRIs",
          features: ["PBR Textures", "3D Models", "HDRIs", "Brushes"],
          platforms: ["All DCCs"],
          popular: true
        },
        {
          name: "TextureMaven",
          type: "Free",
          rating: 4.6,
          price: "Free",
          description: "Free high-resolution seamless PBR textures",
          features: ["Seamless", "PBR", "High-res", "Free Download"],
          platforms: ["All DCCs"],
          popular: false
        }
      ]
    },
    {
      title: "Plugins & Extensions",
      gradient: "from-orange-500 to-red-600",
      icon: Code,
      description: "Essential plugins to supercharge your workflow",
      tools: [
        {
          name: "HardOps/Boxcutter",
          type: "Commercial",
          rating: 4.9,
          price: "$40 (one-time)",
          description: "Hard surface modeling toolkit for Blender",
          features: ["Boolean Ops", "Modeling Tools", "Smart Apply", "Workflow"],
          platforms: ["Blender"],
          popular: true
        },
        {
          name: "Scatter",
          type: "Commercial",
          rating: 4.8,
          price: "$45 (one-time)",
          description: "Advanced scattering and particle systems for Blender",
          features: ["Biome Scatter", "Instancing", "Procedural", "Performance"],
          platforms: ["Blender"],
          popular: true
        },
        {
          name: "RizomUV",
          type: "Commercial",
          rating: 4.7,
          price: "$59/year",
          description: "Fast and powerful UV unwrapping and packing",
          features: ["Auto Unwrap", "Optimal Packing", "Multi-tile", "Bridge"],
          platforms: ["Standalone", "Plugins"],
          popular: false
        },
        {
          name: "Substance 3D Painter",
          type: "Commercial",
          rating: 4.8,
          price: "$20/month",
          description: "Industry standard for 3D texturing and material authoring",
          features: ["Smart Materials", "Mask Generator", "Baking", "Export"],
          platforms: ["Windows", "macOS"],
          popular: true
        }
      ]
    },
    {
      title: "Cloud Rendering Farms",
      gradient: "from-violet-500 to-purple-600",
      icon: TrendingUp,
      description: "Distributed rendering for faster turnaround times",
      tools: [
        {
          name: "Chaos Cloud",
          type: "Pay-per-use",
          rating: 4.7,
          price: "$0.04/GHz hour",
          description: "Cloud rendering from the makers of V-Ray",
          features: ["V-Ray Support", "Auto-sync", "Priority Queue", "Scalable"],
          platforms: ["3ds Max", "Maya", "SketchUp"],
          popular: true
        },
        {
          name: "RebusFarm",
          type: "Pay-per-use",
          rating: 4.6,
          price: "$0.015/GHz hour",
          description: "Multi-software render farm with competitive pricing",
          features: ["Multi-software", "24/7 Support", "Cost Calculator", "Credits"],
          platforms: ["All Major DCCs"],
          popular: true
        },
        {
          name: "Sheepit Render Farm",
          type: "Free (Community)",
          rating: 4.5,
          price: "Free (Share GPU)",
          description: "Free community-driven Blender render farm",
          features: ["Free", "Cycles", "Eevee", "Community"],
          platforms: ["Blender"],
          popular: false
        }
      ]
    }
  ];

  const comparisonHighlights = [
    { label: "Tools Listed", value: "150+", icon: Wrench },
    { label: "User Reviews", value: "10K+", icon: Star },
    { label: "Average Rating", value: "4.7", icon: Award },
    { label: "Updated", value: "Weekly", icon: TrendingUp }
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

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 mb-6">
            <Wrench className={`w-4 h-4 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Tools & Software</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Professional Tools Directory
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-3xl leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Curated collection of the best rendering engines, AI tools, plugins, and cloud services. From free open-source to professional commercial solutions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {comparisonHighlights.map((stat) => {
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
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
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

        {/* Tool Categories */}
        <div className="space-y-16">
          {toolCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.title}>
                {/* Category Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`p-3 rounded-xl ${
                      theme === 'dark' 
                        ? `bg-gradient-to-r ${category.gradient} bg-opacity-20` 
                        : `bg-gradient-to-r ${category.gradient} bg-opacity-10 border-2`
                    }`}>
                      <Icon className={`w-6 h-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`} />
                    </div>
                    <div>
                      <h2 className={`text-3xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{category.title}</h2>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Tools Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className={`group relative overflow-hidden p-6 rounded-xl border transition-all duration-300 ${
                        tool.popular ? 'ring-2 ring-purple-400/30' : ''
                      } ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/30'
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-purple-400/30 shadow-sm'
                      }`}
                    >
                      {/* Popular Badge */}
                      {tool.popular && (
                        <div className="absolute top-4 right-4">
                          <div className={`px-3 py-1 rounded-full flex items-center gap-1 ${
                            theme === 'dark'
                              ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30'
                              : 'bg-gradient-to-r from-yellow-400 to-orange-500 border border-yellow-500'
                          }`}>
                            <Star className={`w-3 h-3 ${
                              theme === 'dark' ? 'text-yellow-300 fill-yellow-300' : 'text-white fill-white'
                            }`} />
                            <span className={`text-xs font-medium ${
                              theme === 'dark' ? 'text-yellow-200' : 'text-white'
                            }`}>Popular</span>
                          </div>
                        </div>
                      )}

                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className={`text-xl font-bold ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{tool.name}</h3>
                          </div>
                          
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              theme === 'dark' 
                                ? `bg-gradient-to-r ${category.gradient} bg-opacity-20 text-white/90` 
                                : 'bg-white border border-gray-300 text-gray-800'
                            }`}>
                              {tool.type}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className={`text-sm font-medium ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>{tool.rating}</span>
                            </div>
                          </div>

                          <div className={`text-2xl font-bold mb-3 ${
                            theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                          }`}>
                            {tool.price}
                          </div>
                        </div>

                        <p className={`text-sm mb-4 leading-relaxed ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {tool.description}
                        </p>

                        {/* Features */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {tool.features.map((feature) => (
                              <span
                                key={feature}
                                className={`px-2 py-1 rounded text-xs border ${
                                  theme === 'dark'
                                    ? 'bg-white/5 border-white/10 text-gray-300'
                                    : 'bg-gray-50 border-gray-200 text-gray-700'
                                }`}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Platforms */}
                        <div className={`text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {tool.platforms.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`mt-16 p-8 rounded-2xl border text-center ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-400/20'
            : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
        }`}>
          <Wrench className={`w-12 h-12 mx-auto mb-4 ${
            theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
          }`} />
          <h3 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Missing Your Favorite Tool?
          </h3>
          <p className={`mb-6 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            We&apos;re constantly updating our tools directory. Suggest tools you&apos;d like to see featured.
          </p>
          <Link
            href="/blog/newsletter"
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 font-medium hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
