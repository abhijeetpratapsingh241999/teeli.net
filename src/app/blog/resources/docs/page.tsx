'use client';

import { FileText, Code, BookOpen, Layers, ArrowRight, ExternalLink, Terminal, Box, Zap } from 'lucide-react';
import Link from 'next/link';
import { useBlogTheme } from '@/components/BlogThemeProvider';

export default function DocsPage() {
  const { theme } = useBlogTheme();
  
  const docCategories = [
    {
      title: "API Documentation",
      icon: Code,
      gradient: "from-blue-500 to-cyan-600",
      description: "Complete API references for rendering engines and integrations",
      sections: [
        {
          name: "V-Ray Python API",
          type: "API Reference",
          description: "Automate V-Ray rendering workflows with Python scripting",
          topics: ["Scene Setup", "Material API", "Render Settings", "Batch Rendering"],
          href: "/blog/topics/3d-rendering"
        },
        {
          name: "Blender Python API (bpy)",
          type: "API Reference", 
          description: "Complete reference for Blender's Python scripting interface",
          topics: ["Object Manipulation", "Material Nodes", "Rendering", "Add-ons"],
          href: "/blog/topics/3d-rendering"
        },
        {
          name: "3ds Max MaxScript Reference",
          type: "Scripting Guide",
          description: "Automate tasks and build tools with MaxScript",
          topics: ["Scene Objects", "Modifiers", "Materials", "Rendering"],
          href: "/blog/topics/3d-rendering"
        },
        {
          name: "REST API Integration",
          type: "API Guide",
          description: "Integrate rendering services with REST APIs",
          topics: ["Authentication", "Job Submission", "Status Polling", "File Download"],
          href: "/blog/topics/cloud-devops"
        }
      ]
    },
    {
      title: "Code Examples Repository",
      icon: Terminal,
      gradient: "from-purple-500 to-pink-600",
      description: "Ready-to-use code snippets and complete project examples",
      sections: [
        {
          name: "Blender Automation Scripts",
          type: "Python Scripts",
          description: "Automate common Blender workflows with Python",
          topics: ["Batch Rendering", "Material Generator", "Scene Builder", "Export Tools"],
          href: "/blog/topics/3d-rendering"
        },
        {
          name: "AI Integration Examples",
          type: "Python/JavaScript",
          description: "Integrate AI models into your rendering pipeline",
          topics: ["Image Upscaling", "Denoising", "Style Transfer", "Auto-tagging"],
          href: "/blog/topics/ai-ml"
        },
        {
          name: "Cloud Rendering Scripts",
          type: "Bash/Python",
          description: "Deploy and manage cloud rendering infrastructure",
          topics: ["AWS Setup", "Docker Containers", "Auto-scaling", "Cost Monitoring"],
          href: "/blog/topics/cloud-devops"
        },
        {
          name: "Shader Node Examples",
          type: "Node Setups",
          description: "Complex procedural shaders and materials",
          topics: ["Procedural Wood", "Metal Scratches", "Glass Types", "Emission Effects"],
          href: "/blog/topics/3d-rendering"
        }
      ]
    },
    {
      title: "Architecture & Workflows",
      icon: Layers,
      gradient: "from-green-500 to-emerald-600",
      description: "System architecture diagrams and workflow documentation",
      sections: [
        {
          name: "Rendering Pipeline Architecture",
          type: "System Design",
          description: "Design scalable rendering pipelines for production",
          topics: ["Pipeline Stages", "Data Flow", "Asset Management", "Version Control"],
          href: "/blog/topics/cloud-devops"
        },
        {
          name: "Digital Twin Architecture",
          type: "Integration Guide",
          description: "Build real-time digital twin systems with IoT",
          topics: ["BIM Integration", "Sensor Data", "Real-time Sync", "Visualization"],
          href: "/blog/topics/digital-twins"
        },
        {
          name: "Metaverse Development Workflow",
          type: "Best Practices",
          description: "Create immersive 3D web experiences",
          topics: ["3D Web Stack", "Optimization", "Multiplayer", "Asset Pipeline"],
          href: "/blog/topics/metaverse"
        },
        {
          name: "Microservices for Rendering",
          type: "Architecture",
          description: "Distributed rendering with microservices",
          topics: ["Service Mesh", "Load Balancing", "Queue Management", "Monitoring"],
          href: "/blog/topics/cloud-devops"
        }
      ]
    },
    {
      title: "Technical Glossary",
      icon: BookOpen,
      gradient: "from-orange-500 to-red-600",
      description: "Comprehensive terminology and concept reference",
      sections: [
        {
          name: "3D Rendering Terms",
          type: "Glossary",
          description: "Essential rendering terminology explained",
          topics: ["Ray Tracing", "GI Methods", "Sampling", "Noise/Grain", "Caustics", "Bokeh"],
          href: "/blog/topics/3d-rendering"
        },
        {
          name: "AI & ML Terminology",
          type: "Glossary",
          description: "Machine learning concepts for 3D artists",
          topics: ["Neural Networks", "Training", "Inference", "Models", "Datasets", "Transfer Learning"],
          href: "/blog/topics/ai-ml"
        },
        {
          name: "Cloud Computing Terms",
          type: "Glossary",
          description: "Cloud infrastructure and DevOps concepts",
          topics: ["Containerization", "Orchestration", "Serverless", "Autoscaling", "Load Balancing"],
          href: "/blog/topics/cloud-devops"
        },
        {
          name: "PBR Material Properties",
          type: "Reference",
          description: "Physical material properties and values",
          topics: ["Base Color", "Metallic", "Roughness", "IOR", "Displacement", "Normal Maps"],
          href: "/blog/topics/3d-rendering"
        }
      ]
    },
    {
      title: "Best Practices & Guidelines",
      icon: Zap,
      gradient: "from-pink-500 to-rose-600",
      description: "Industry standards and optimization techniques",
      sections: [
        {
          name: "Rendering Optimization Guide",
          type: "Best Practices",
          description: "Speed up renders without sacrificing quality",
          topics: ["Denoising", "Light Caching", "Proxy Objects", "Instance Rendering", "LOD Systems"],
          href: "/blog/topics/3d-rendering"
        },
        {
          name: "Scene Organization Standards",
          type: "Guidelines",
          description: "Structure complex scenes for team collaboration",
          topics: ["Naming Conventions", "Layer Management", "Asset Linking", "Version Control"],
          href: "/blog/topics/3d-rendering"
        },
        {
          name: "Sustainable Rendering Practices",
          type: "Best Practices",
          description: "Reduce energy consumption and carbon footprint",
          topics: ["Energy Efficiency", "Cloud Optimization", "Hardware Selection", "Carbon Tracking"],
          href: "/blog/topics/sustainability"
        },
        {
          name: "Security Best Practices",
          type: "Security Guide",
          description: "Secure your rendering infrastructure and assets",
          topics: ["Access Control", "Data Encryption", "API Security", "Asset Protection"],
          href: "/blog/topics/cloud-devops"
        }
      ]
    }
  ];

  const quickLinks = [
    { 
      title: "Getting Started Guide", 
      description: "New to 3D rendering? Start here",
      icon: BookOpen,
      href: "/blog/topics/3d-rendering"
    },
    { 
      title: "API Quick Reference", 
      description: "Common API calls and examples",
      icon: Code,
      href: "/blog/topics/cloud-devops"
    },
    { 
      title: "Troubleshooting FAQ", 
      description: "Solutions to common problems",
      icon: Zap,
      href: "/blog/topics/3d-rendering"
    },
    { 
      title: "Video Tutorials", 
      description: "Step-by-step video guides",
      icon: Box,
      href: "/blog/resources/guides"
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
              theme === 'dark' ? 'text-orange-300 hover:text-orange-200' : 'text-orange-600 hover:text-orange-700'
            }`}
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Resources</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 mb-6">
            <FileText className={`w-4 h-4 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`} />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Technical Documentation</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-300 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Developer Documentation
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-3xl leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Comprehensive technical documentation, API references, code examples, and best practices for 3D rendering, AI integration, and cloud infrastructure.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`group p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:border-orange-400/30'
                    : 'bg-white border-gray-200 hover:border-orange-400/30 shadow-sm'
                }`}
              >
                <Icon className={`w-8 h-8 mb-3 ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
                }`} />
                <h3 className={`font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{link.title}</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{link.description}</p>
                <ArrowRight className={`w-4 h-4 mt-3 group-hover:translate-x-1 transition-transform ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
                }`} />
              </Link>
            );
          })}
        </div>

        {/* Documentation Categories */}
        <div className="space-y-16">
          {docCategories.map((category) => {
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

                {/* Documentation Sections */}
                <div className="grid md:grid-cols-2 gap-6">
                  {category.sections.map((section) => (
                    <Link
                      key={section.name}
                      href={section.href}
                      className={`group cursor-pointer relative overflow-hidden p-6 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/30'
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-purple-400/30 shadow-sm'
                      }`}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            theme === 'dark' 
                              ? `bg-gradient-to-r ${category.gradient} bg-opacity-20 text-white/90` 
                              : 'bg-white border border-gray-300 text-gray-800'
                          }`}>
                            {section.type}
                          </span>
                          <ExternalLink className={`w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${
                            theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                          }`} />
                        </div>

                        <h3 className={`text-xl font-bold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {section.name}
                        </h3>

                        <p className={`text-sm mb-4 leading-relaxed ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {section.description}
                        </p>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2">
                          {section.topics.map((topic) => (
                            <span
                              key={topic}
                              className={`px-2 py-1 rounded text-xs border ${
                                theme === 'dark'
                                  ? 'bg-white/5 border-white/10 text-gray-300'
                                  : 'bg-gray-50 border-gray-200 text-gray-700'
                              }`}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Search Documentation CTA */}
        <div className={`mt-16 p-8 rounded-2xl border ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/20'
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <Code className={`w-8 h-8 ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
            }`} />
            <h3 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Looking for Something Specific?
            </h3>
          </div>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Use our search to find API methods, code examples, or specific documentation topics.
          </p>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search documentation..."
              className={`flex-1 px-6 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
            <button
              className={`px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 font-medium hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Search
            </button>
          </div>
        </div>

        {/* Contribution CTA */}
        <div className={`mt-8 p-8 rounded-2xl border text-center ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/20'
            : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
        }`}>
          <FileText className={`w-12 h-12 mx-auto mb-4 ${
            theme === 'dark' ? 'text-orange-300' : 'text-orange-600'
          }`} />
          <h3 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Improve Our Documentation
          </h3>
          <p className={`mb-6 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Found an error or want to contribute? Help us improve the documentation for the community.
          </p>
          <Link
            href="/blog/newsletter"
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 font-medium hover:from-orange-500/30 hover:to-red-500/30 hover:border-orange-400/50 transition-all duration-300 cursor-pointer ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span>Contribute</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
