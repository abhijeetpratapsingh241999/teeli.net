'use client';

import { Wrench, BookOpen, Download, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function ResourcesPage() {
  const { theme } = useBlogTheme();
  
  const resources = [
    {
      title: "Guides & Tutorials",
      icon: BookOpen,
      gradient: "from-blue-500 to-cyan-600",
      description: "Comprehensive step-by-step tutorials and learning paths",
      items: [
        { name: "Complete 3D Rendering Guide", type: "Tutorial", href: "/blog/resources/guides/3d-rendering" },
        { name: "AI Integration Handbook", type: "Guide", href: "/blog/resources/guides/ai-integration" },
        { name: "Cloud Setup Walkthrough", type: "Tutorial", href: "/blog/resources/guides/cloud-setup" },
        { name: "Lighting Masterclass", type: "Course", href: "/blog/resources/guides/lighting" },
        { name: "Material Creation Workshop", type: "Workshop", href: "/blog/resources/guides/materials" }
      ]
    },
    {
      title: "Tools & Software",
      icon: Wrench,
      gradient: "from-purple-500 to-pink-600",
      description: "Curated list of recommended tools, plugins, and software",
      items: [
        { name: "Best Rendering Engines 2025", type: "Comparison", href: "/blog/resources/tools/rendering-engines" },
        { name: "AI-Powered Tools Directory", type: "Directory", href: "/blog/resources/tools/ai-tools" },
        { name: "Free Asset Libraries", type: "List", href: "/blog/resources/tools/asset-libraries" },
        { name: "Essential Blender Plugins", type: "Curated", href: "/blog/resources/tools/blender-plugins" },
        { name: "Cloud Rendering Farms", type: "Comparison", href: "/blog/resources/tools/render-farms" }
      ]
    },
    {
      title: "Downloads",
      icon: Download,
      gradient: "from-green-500 to-emerald-600",
      description: "Free templates, presets, HDRIs, and project files",
      items: [
        { name: "Material Presets Library", type: "Download", size: "245 MB", href: "/blog/resources/downloads/materials" },
        { name: "HDRI Collection (100+ Files)", type: "Download", size: "1.2 GB", href: "/blog/resources/downloads/hdri" },
        { name: "Scene Templates", type: "Download", size: "180 MB", href: "/blog/resources/downloads/scenes" },
        { name: "Lighting Setup Presets", type: "Download", size: "45 MB", href: "/blog/resources/downloads/lighting" },
        { name: "Render Settings Cheat Sheets", type: "PDF", size: "12 MB", href: "/blog/resources/downloads/cheatsheets" }
      ]
    },
    {
      title: "Documentation",
      icon: FileText,
      gradient: "from-orange-500 to-red-600",
      description: "Technical documentation, API references, and glossaries",
      items: [
        { name: "API Documentation", type: "Docs", href: "/blog/resources/docs/api" },
        { name: "Code Examples Repository", type: "GitHub", href: "/blog/resources/docs/examples" },
        { name: "Architecture Diagrams", type: "Visual", href: "/blog/resources/docs/architecture" },
        { name: "Technical Glossary", type: "Reference", href: "/blog/resources/docs/glossary" },
        { name: "Best Practices Guide", type: "Guide", href: "/blog/resources/docs/best-practices" }
      ]
    }
  ];

  return (
    <div className={`min-h-screen pt-32 pb-20 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-black'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 mb-6">
            <Wrench className={`w-4 h-4 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Free Resources</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Learning Resources
            </span>
          </h1>

          <p className={`text-xl max-w-3xl leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Free guides, tools, templates, and documentation to accelerate your learning journey in 3D rendering, AI, and cloud technologies.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="space-y-12">
          {resources.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.title} className="group">
                {/* Category Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`p-3 rounded-xl ${
                      theme === 'dark' 
                        ? `bg-gradient-to-r ${category.gradient} bg-opacity-20` 
                        : `bg-gradient-to-r ${category.gradient} bg-opacity-10 border-2`
                    }`}>
                      <Icon className={`w-6 h-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`} />
                    </div>
                    <div>
                      <h2 className={`text-3xl font-bold mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{category.title}</h2>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{category.description}</p>
                    </div>
                  </div>
                  <div className={`h-px bg-gradient-to-r ${
                    theme === 'dark' ? 'from-white/20' : 'from-gray-300'
                  } to-transparent`} />
                </div>

                {/* Resource Items */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group/item relative overflow-hidden p-6 rounded-xl border transition-all duration-300 ${
                        theme === 'dark'
                          ? 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-400/30'
                          : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-purple-400/30 shadow-sm'
                      }`}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover/item:opacity-10 transition-opacity duration-500`} />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className={`font-bold group-hover/item:text-transparent group-hover/item:bg-gradient-to-r group-hover/item:from-purple-300 group-hover/item:to-pink-400 group-hover/item:bg-clip-text transition-all duration-300 flex-1 pr-2 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.name}
                          </h3>
                          <ArrowRight className={`w-5 h-5 group-hover/item:text-purple-300 group-hover/item:translate-x-1 transition-all duration-300 flex-shrink-0 ${
                            theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                          }`} />
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <span className={`px-3 py-1 rounded-lg font-medium ${
                            theme === 'dark' 
                              ? `bg-gradient-to-r ${category.gradient} bg-opacity-20 text-white/80` 
                              : 'bg-white border border-gray-300 text-gray-700'
                          }`}>
                            {item.type}
                          </span>
                          {'size' in item && (
                            <span className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>{item.size}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View All Link */}
                <div className="mt-6">
                  <Link
                    href={`/blog/resources/${category.title.toLowerCase().split(' ')[0]}`}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${category.gradient} bg-opacity-20 border hover:bg-opacity-30 hover:border-purple-400/40 font-medium transition-all duration-300 group/link ${
                      theme === 'dark'
                        ? 'border-white/20 text-white'
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    <span>View All {category.title}</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 text-center">
          <h3 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Need Something Specific?</h3>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Can&apos;t find what you&apos;re looking for? Let us know what resources would help you most.</p>
          <Link
            href="/blog/newsletter"
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 font-medium hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50 transition-all duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span>Subscribe to Updates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
