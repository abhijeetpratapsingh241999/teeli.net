'use client';

import { Download, FileArchive, Image, FileText, Palette, ArrowRight, Check, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function DownloadsPage() {
  const { theme } = useBlogTheme();
  
  const downloadCategories = [
    {
      title: "Material Presets Library",
      icon: Palette,
      gradient: "from-blue-500 to-cyan-600",
      description: "Production-ready PBR materials for V-Ray, Corona, Cycles, and Arnold",
      downloads: [
        {
          name: "Architectural Materials Pack",
          size: "245 MB",
          files: 150,
          formats: ["V-Ray", "Corona", "Cycles"],
          description: "Concrete, brick, wood, tile, and stone materials",
          downloads: 12500,
          rating: 4.8,
          popular: true,
          includes: ["PBR Textures", "4K/8K Maps", "Displacement", "Setup Files"]
        },
        {
          name: "Interior Design Materials",
          size: "180 MB",
          files: 120,
          formats: ["V-Ray", "Corona", "Arnold"],
          description: "Fabrics, leather, wood finishes, metals",
          downloads: 9800,
          rating: 4.7,
          popular: true,
          includes: ["Fabric Library", "Wood Finishes", "Metal Presets", "Glass Types"]
        },
        {
          name: "Landscape Materials",
          size: "320 MB",
          files: 200,
          formats: ["Cycles", "V-Ray"],
          description: "Terrain, grass, water, vegetation materials",
          downloads: 7600,
          rating: 4.6,
          popular: false,
          includes: ["Terrain Types", "Water Shaders", "Vegetation", "Ground Textures"]
        }
      ]
    },
    {
      title: "HDRI Collection",
      icon: Image,
      gradient: "from-purple-500 to-pink-600",
      description: "High-resolution HDR environment maps for realistic lighting",
      downloads: [
        {
          name: "Studio HDRI Pack (100 Files)",
          size: "1.2 GB",
          files: 100,
          formats: ["16K EXR", "8K HDR"],
          description: "Professional studio lighting setups",
          downloads: 15200,
          rating: 4.9,
          popular: true,
          includes: ["Softbox Setups", "Ring Lights", "3-Point Lighting", "Backdrops"]
        },
        {
          name: "Outdoor HDRIs (50 Files)",
          size: "850 MB",
          files: 50,
          formats: ["12K EXR", "8K HDR"],
          description: "Natural lighting environments",
          downloads: 11400,
          rating: 4.8,
          popular: true,
          includes: ["Sky Domes", "Sunsets", "Cloudy Days", "Clear Skies"]
        },
        {
          name: "Urban Environments",
          size: "640 MB",
          files: 40,
          formats: ["8K EXR", "4K HDR"],
          description: "City streets, buildings, urban scenes",
          downloads: 6900,
          rating: 4.7,
          popular: false,
          includes: ["Street Scenes", "Interiors", "Night Lights", "Reflections"]
        }
      ]
    },
    {
      title: "Scene Templates",
      icon: FileArchive,
      gradient: "from-green-500 to-emerald-600",
      description: "Ready-to-render scene files for multiple 3D applications",
      downloads: [
        {
          name: "Architectural Visualization Templates",
          size: "420 MB",
          files: 25,
          formats: ["Blender", "3ds Max", "SketchUp"],
          description: "Complete scene setups with lighting and cameras",
          downloads: 8700,
          rating: 4.8,
          popular: true,
          includes: ["Day/Night Scenes", "Camera Angles", "Lighting Presets", "Materials"]
        },
        {
          name: "Product Rendering Templates",
          size: "280 MB",
          files: 30,
          formats: ["Blender", "Cinema 4D"],
          description: "Studio setups for product visualization",
          downloads: 7200,
          rating: 4.7,
          popular: true,
          includes: ["Studio Setups", "Turntables", "Backgrounds", "Lights"]
        },
        {
          name: "Interior Design Templates",
          size: "560 MB",
          files: 20,
          formats: ["3ds Max", "Blender"],
          description: "Furnished interior scenes ready to customize",
          downloads: 5400,
          rating: 4.6,
          popular: false,
          includes: ["Living Rooms", "Kitchens", "Bedrooms", "Bathrooms"]
        }
      ]
    },
    {
      title: "Lighting Presets",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-600",
      description: "Professional lighting setups for various rendering scenarios",
      downloads: [
        {
          name: "V-Ray Light Setups",
          size: "45 MB",
          files: 60,
          formats: ["V-Ray 6+"],
          description: "Studio, exterior, and interior lighting presets",
          downloads: 10200,
          rating: 4.9,
          popular: true,
          includes: ["Studio Lights", "Exterior Lighting", "Interior Moods", "Adaptive Lights"]
        },
        {
          name: "Corona Lighting Library",
          size: "38 MB",
          files: 50,
          formats: ["Corona 10+"],
          description: "LightMix-ready lighting configurations",
          downloads: 8900,
          rating: 4.8,
          popular: true,
          includes: ["LightMix Setups", "Day/Night", "Seasons", "Color Temps"]
        },
        {
          name: "Cycles Light Nodes",
          size: "22 MB",
          files: 40,
          formats: ["Blender 4.0+"],
          description: "Node-based lighting setups for Cycles",
          downloads: 6300,
          rating: 4.7,
          popular: false,
          includes: ["Area Lights", "Volume Lighting", "Neon Effects", "Atmospheric"]
        }
      ]
    },
    {
      title: "Cheat Sheets & Documentation",
      icon: FileText,
      gradient: "from-pink-500 to-rose-600",
      description: "Quick reference guides and workflow documentation",
      downloads: [
        {
          name: "Rendering Settings Cheat Sheet",
          size: "12 MB",
          files: 1,
          formats: ["PDF"],
          description: "Optimal render settings for all major engines",
          downloads: 18500,
          rating: 4.9,
          popular: true,
          includes: ["V-Ray Settings", "Corona Settings", "Cycles Settings", "Arnold Settings"]
        },
        {
          name: "Keyboard Shortcuts Master List",
          size: "8 MB",
          files: 5,
          formats: ["PDF"],
          description: "Complete shortcuts for Blender, 3ds Max, Maya, C4D",
          downloads: 14200,
          rating: 4.8,
          popular: true,
          includes: ["Blender", "3ds Max", "Maya", "Cinema 4D", "SketchUp"]
        },
        {
          name: "Material PBR Values Reference",
          size: "15 MB",
          files: 1,
          formats: ["PDF"],
          description: "Accurate PBR values for real-world materials",
          downloads: 11800,
          rating: 4.9,
          popular: true,
          includes: ["Metal Values", "Roughness Guide", "IOR Chart", "Color Values"]
        },
        {
          name: "Camera Settings for Archviz",
          size: "6 MB",
          files: 1,
          formats: ["PDF"],
          description: "Professional camera settings and composition",
          downloads: 9400,
          rating: 4.7,
          popular: false,
          includes: ["Focal Lengths", "DOF Settings", "Composition Rules", "Angles"]
        }
      ]
    }
  ];

  const stats = [
    { label: "Total Downloads", value: "250K+", icon: Download },
    { label: "File Collections", value: "50+", icon: FileArchive },
    { label: "Average Rating", value: "4.8", icon: Star },
    { label: "Updated", value: "Monthly", icon: TrendingUp }
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
              theme === 'dark' ? 'text-green-300 hover:text-green-200' : 'text-green-600 hover:text-green-700'
            }`}
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Resources</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 mb-6">
            <Download className={`w-4 h-4 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Free Downloads</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Free Templates & Assets
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-3xl leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Production-ready materials, HDRIs, scene templates, and lighting presets. All free to download and use in your projects.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => {
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
                  theme === 'dark' ? 'text-green-300' : 'text-green-600'
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

        {/* Download Categories */}
        <div className="space-y-16">
          {downloadCategories.map((category) => {
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

                {/* Downloads Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.downloads.map((item) => (
                    <div
                      key={item.name}
                      className={`group relative overflow-hidden p-6 rounded-xl border transition-all duration-300 ${
                        item.popular ? 'ring-2 ring-green-400/30' : ''
                      } ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-green-400/30'
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-green-400/30 shadow-sm'
                      }`}
                    >
                      {/* Popular Badge */}
                      {item.popular && (
                        <div className="absolute top-4 right-4">
                          <div className={`px-3 py-1 rounded-full flex items-center gap-1 ${
                            theme === 'dark'
                              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30'
                              : 'bg-gradient-to-r from-green-500 to-emerald-600 border border-green-600'
                          }`}>
                            <Star className={`w-3 h-3 ${
                              theme === 'dark' ? 'text-green-300 fill-green-300' : 'text-white fill-white'
                            }`} />
                            <span className={`text-xs font-medium ${
                              theme === 'dark' ? 'text-green-200' : 'text-white'
                            }`}>Popular</span>
                          </div>
                        </div>
                      )}

                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className={`text-xl font-bold mb-3 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{item.name}</h3>

                        <p className={`text-sm mb-4 leading-relaxed ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {item.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-4 text-sm">
                          <div className={`flex items-center gap-1 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <FileArchive className="w-4 h-4" />
                            <span>{item.size}</span>
                          </div>
                          <div className={`flex items-center gap-1 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <Download className="w-4 h-4" />
                            <span>{item.downloads.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className={`font-medium ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>{item.rating}</span>
                          </div>
                        </div>

                        {/* Formats */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.formats.map((format) => (
                            <span
                              key={format}
                              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                theme === 'dark' 
                                  ? `bg-gradient-to-r ${category.gradient} bg-opacity-20 text-white/90` 
                                  : 'bg-white border border-gray-300 text-gray-800'
                              }`}
                            >
                              {format}
                            </span>
                          ))}
                        </div>

                        {/* Includes */}
                        <div className="mb-4">
                          <div className={`text-xs font-semibold mb-2 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>Includes:</div>
                          <div className="space-y-1">
                            {item.includes.map((inc) => (
                              <div key={inc} className="flex items-center gap-2 text-xs">
                                <Check className={`w-3 h-3 flex-shrink-0 ${
                                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                }`} />
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{inc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Download Button */}
                        <button
                          className={`w-full py-3 rounded-xl bg-gradient-to-r ${category.gradient} text-white font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer`}
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Free</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* License Info */}
        <div className={`mt-16 p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-blue-500/5 border-blue-400/20'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className={`text-lg font-bold mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>License Information</h3>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            All resources are free to download and use in personal and commercial projects. Attribution is appreciated but not required. Please do not redistribute or resell these assets.
          </p>
        </div>

        {/* CTA */}
        <div className={`mt-8 p-8 rounded-2xl border text-center ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/20'
            : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
        }`}>
          <Download className={`w-12 h-12 mx-auto mb-4 ${
            theme === 'dark' ? 'text-green-300' : 'text-green-600'
          }`} />
          <h3 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            New Resources Every Month
          </h3>
          <p className={`mb-6 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Subscribe to get notified when we add new materials, HDRIs, templates, and presets.
          </p>
          <Link
            href="/blog/newsletter"
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 font-medium hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50 transition-all duration-300 cursor-pointer ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span>Get Updates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
