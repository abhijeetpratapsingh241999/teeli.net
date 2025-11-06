"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Rotatable3DModel from '@/components/Rotatable3DModel';
import { 
  Image as ImageIcon, 
  Box, 
  Camera, 
  Sparkles, 
  Zap, 
  Layers, 
  Palette,
  Globe,
  Building2,
  ShoppingBag,
  Gamepad2,
  Film,
  Code,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Brain,
  Upload,
  Download,
  Settings,
  Rocket,
  Wand2,
  ArrowLeftRight,
  Scan,
  Move3D,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function ImageTo3DPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Before/After Split */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div}}}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10">
                <span className="text-pink-400 font-semibold text-sm uppercase tracking-wider">2D to 3D Conversion</span>
              </div>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Transform Photos into
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                3D Models
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto mb-12 leading-relaxed">
              Convert any photograph into a fully textured, navigable 3D model in minutes. 
              No 3D scanning equipment required—just your photos and our AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <button}}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-pink-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Converting
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

                     {/* Before/After Visual */}
           <div className="relative">
             <div}}}
               className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
             >
               {/* Before - 2D Image */}
               <div className="relative rounded-3xl border-2 border-zinc-700 bg-gradient-to-br from-black/60 to-zinc-900/40 backdrop-blur-xl p-6 md:p-8 overflow-hidden">
                 <div className="flex items-center gap-2 mb-4">
                   <ImageIcon className="w-6 h-6 text-zinc-400" />
                   <span className="text-zinc-400 font-semibold">2D Input</span>
                 </div>
                 <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden border-2 border-zinc-700 relative">
                   {/* Sample 2D House Image */}
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 relative">
                       {/* House Illustration */}
                       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                         {/* House Base */}
                         <div className="w-32 h-24 bg-gradient-to-br from-purple-400/60 to-pink-400/60 rounded-lg border-2 border-purple-300/50 shadow-lg">
                           {/* Windows */}
                           <div className="absolute top-3 left-3 w-6 h-6 bg-cyan-300/40 rounded border border-cyan-200/50"></div>
                           <div className="absolute top-3 right-3 w-6 h-6 bg-cyan-300/40 rounded border border-cyan-200/50"></div>
                           {/* Door */}
                           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-purple-600/60 rounded-t border border-purple-400/50"></div>
                         </div>
                         {/* Roof */}
                         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gradient-to-br from-pink-400/60 to-purple-400/60"}></div>
                         {/* Ground */}
                         <div className="absolute top-full left-0 w-40 h-4 bg-gradient-to-r from-green-600/30 via-green-500/30 to-green-600/30 mt-2"></div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <p className="text-center text-zinc-400 mt-4 text-sm font-medium">Sample House Photo</p>
               </div>

               {/* Arrow */}
               <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                 <div}}
                   className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center border-4 border-black shadow-2xl"
                 >
                   <ArrowLeftRight className="w-8 h-8 text-white" />
                 </div>
               </div>

               {/* After - 3D Model */}
               <div className="relative rounded-3xl border-2 border-pink-500/30 bg-gradient-to-br from-black/60 via-pink-950/40 to-purple-950/40 backdrop-blur-xl p-6 md:p-8 overflow-hidden">
                 <div className="flex items-center gap-2 mb-4">
                   <Box className="w-6 h-6 text-pink-400" />
                   <span className="text-pink-400 font-semibold">3D Output</span>
                 </div>
                 <div className="aspect-square bg-gradient-to-br from-pink-950/20 via-purple-950/20 to-black/40 rounded-2xl overflow-hidden border-2 border-pink-500/30 relative">
                   {/* Interactive 3D Model */}
                   <Rotatable3DModel className="w-full h-full" />
                 </div>
                 <p className="text-center text-pink-400 mt-4 text-sm font-semibold">Fully Navigable 3D Model</p>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Transformation Pipeline - Vertical Flow */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-pink-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <div}}}}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              The Conversion Process
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              From a simple photo to a complete 3D model in three steps
            </p>
          </div>

          {/* Vertical Pipeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 hidden md:block"></div>

            {[
              {
                step: "01",
                title: "Upload Photos",
                description: "Upload one or multiple photos of your subject from different angles. Our AI works with as few as 2-3 images.",
                icon: Upload,
                color: "from-pink-500 to-pink-700"
              },
              {
                step: "02",
                title: "AI Analysis & Reconstruction",
                description: "Deep learning algorithms analyze depth, geometry, and textures to reconstruct the 3D structure from 2D images.",
                icon: Brain,
                color: "from-purple-500 to-purple-700"
              },
              {
                step: "03",
                title: "Download 3D Model",
                description: "Receive your fully textured 3D model in standard formats (OBJ, GLTF, PLY) ready for use in any 3D software.",
                icon: Download,
                color: "from-cyan-500 to-cyan-700"
              }
            ].map((item, index) => (
              <div
                key={index}}}}}
                className="relative mb-12 md:pl-32"
              >
                <div className={`absolute left-0 top-0 w-24 h-24 rounded-full bg-gradient-to-br ${item.color} border-4 border-black flex items-center justify-center hidden md:flex`}>
                  <item.icon className="w-12 h-12 text-white" />
                </div>
                <div className="rounded-2xl border-2 border-pink-500/30 bg-gradient-to-br from-black/60 via-pink-950/20 to-black/60 backdrop-blur-xl p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-bold text-pink-500/30">{item.step}</span>
                    <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features - Icon Grid with Descriptions */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div}}}}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Powerful Conversion Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Single Image Input",
                description: "Transform a single 2D photograph into a fully textured 3D model. No multi-view images required.",
                gradient: "from-pink-500/20 to-purple-500/20",
                borderColor: "border-pink-500/30"
              },
              {
                icon: Scan,
                title: "Automatic Depth Estimation",
                description: "AI automatically estimates depth and geometry from your photos without manual input.",
                gradient: "from-purple-500/20 to-cyan-500/20",
                borderColor: "border-purple-500/30"
              },
              {
                icon: Wand2,
                title: "Texture Extraction",
                description: "Automatically extract and optimize textures from images, preserving fine details.",
                gradient: "from-cyan-500/20 to-pink-500/20",
                borderColor: "border-cyan-500/30"
              },
              {
                icon: Box,
                title: "Multiple Formats",
                description: "Export to OBJ, GLTF, PLY, and more. Compatible with all major 3D software.",
                gradient: "from-pink-500/20 to-purple-500/20",
                borderColor: "border-pink-500/30"
              },
              {
                icon: Move3D,
                title: "Full 3D Navigation",
                description: "Generated models are fully navigable with accurate geometry and textures.",
                gradient: "from-purple-500/20 to-cyan-500/20",
                borderColor: "border-purple-500/30"
              },
              {
                icon: Zap,
                title: "Fast Processing",
                description: "Convert photos to 3D models in minutes, not hours or days.",
                gradient: "from-cyan-500/20 to-pink-500/20",
                borderColor: "border-cyan-500/30"
              }
            ].map((feature, index) => (
              <div
                key={index}}}}}
                className={`relative rounded-3xl border-2 ${feature.borderColor} bg-gradient-to-br ${feature.gradient} backdrop-blur-xl p-8 hover:scale-105 transition-transform duration-300`}
              >
                <feature.icon className="w-12 h-12 text-white mb-6" />
                <h3 className="font-heading text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-zinc-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Comparison Cards */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div}}}}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Industry Applications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Building2,
                title: "Architecture & Interior Design",
                description: "Convert architectural photos into 3D models for renovation planning and visualization.",
                examples: [
                  { label: "Room scans", href: "/contact?service=room-scans" },
                  { label: "Building facades", href: "/contact?service=building-facades" },
                  { label: "Furniture cataloging", href: "/contact?service=furniture-cataloging" },
                  { label: "Space planning", href: "/contact?service=space-planning" }
                ],
                gradient: "from-blue-500/20 to-cyan-500/20",
                borderColor: "border-blue-500/30"
              },
              {
                icon: ShoppingBag,
                title: "E-commerce & Retail",
                description: "Create 3D product models from product photos for interactive shopping experiences.",
                examples: [
                  { label: "Product models", href: "/contact?service=product-models" },
                  { label: "Virtual showrooms", href: "/contact?service=virtual-showrooms" },
                  { label: "AR previews", href: "/contact?service=ar-previews" },
                  { label: "Catalog creation", href: "/contact?service=catalog-creation" }
                ],
                gradient: "from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/30"
              },
              {
                icon: Gamepad2,
                title: "Gaming & VR",
                description: "Transform real-world objects into game assets and VR environment props.",
                examples: [
                  { label: "Asset creation", href: "/contact?service=asset-creation-3d" },
                  { label: "Environment props", href: "/contact?service=env-props" },
                  { label: "Character accessories", href: "/contact?service=character-accessories" },
                  { label: "World building", href: "/contact?service=world-building" }
                ],
                gradient: "from-pink-500/20 to-red-500/20",
                borderColor: "border-pink-500/30"
              },
              {
                icon: Film,
                title: "Film & VFX",
                description: "Convert reference photos into 3D models for visual effects and post-production.",
                examples: [
                  { label: "Prop modeling", href: "/contact?service=prop-modeling" },
                  { label: "Set reconstruction", href: "/contact?service=set-reconstruction" },
                  { label: "Reference models", href: "/contact?service=reference-models" },
                  { label: "Match moving", href: "/contact?service=match-moving" }
                ],
                gradient: "from-cyan-500/20 to-blue-500/20",
                borderColor: "border-cyan-500/30"
              }
            ].map((useCase, index) => (
              <div
                key={index}}}}}
                className={`relative rounded-3xl border-2 ${useCase.borderColor} bg-gradient-to-br ${useCase.gradient} backdrop-blur-xl p-8 hover:scale-[1.02] transition-transform duration-300`}
              >
                <useCase.icon className="w-12 h-12 text-white mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example, idx) => (
                    <Link key={idx} href={example.href}>
                      <span}
                        className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-zinc-300 border border-white/20 hover:bg-white/20 hover:border-pink-400/50 hover:text-pink-300 transition-all cursor-pointer"
                      >
                        {example.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology - Stacked Cards */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div}}}}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Advanced Technology
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Neural Radiance Fields", description: "Advanced NeRF technology for scene reconstruction", icon: Brain },
              { name: "Monocular Depth Estimation", description: "Single-image depth prediction using deep learning", icon: Eye },
              { name: "Structure from Motion", description: "Multi-view geometry reconstruction", icon: Settings },
              { name: "Texture Mapping", description: "Automatic texture extraction and optimization", icon: Palette },
              { name: "Mesh Generation", description: "High-quality 3D mesh creation", icon: Layers },
              { name: "Format Conversion", description: "Export to multiple 3D file formats", icon: Code }
            ].map((tech, index) => (
              <div
                key={index}}}}}
                className="rounded-2xl border border-pink-500/20 bg-black/40 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all"
              >
                <tech.icon className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="font-heading text-lg font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-zinc-400">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Side by Side */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-pink-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div}}}}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Transform
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                  Your Photos?
                </span>
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Convert any photo into a fully navigable 3D model. Start your transformation journey today.
              </p>
              <div className="space-y-4">
                {[
                  "Single or multiple photo support",
                  "Automatic texture extraction",
                  "Multiple export formats",
                  "High-quality mesh generation"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-pink-400 flex-shrink-0" />
                    <span className="text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div}}}}
              className="relative rounded-3xl border-2 border-pink-500/30 bg-gradient-to-br from-pink-950/40 via-purple-950/40 to-cyan-950/40 backdrop-blur-xl p-10 text-center"
            >
              <Box className="w-16 h-16 text-pink-400 mx-auto mb-6" />
              <h3 className="font-heading text-3xl font-bold mb-4 text-white">
                Start Converting Today
              </h3>
              <p className="text-zinc-300 mb-8">
                Upload your photos and get started with 3D conversion.
              </p>
              <Link href="/contact">
                <button}}
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-pink-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Convert Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
