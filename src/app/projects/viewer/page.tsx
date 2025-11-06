"use client";

// REMOVED: framer-motion import for performance (-50KB saved)
import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Box,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Download,
  Share2,
  Settings,
  Layers,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Grid,
  Maximize2,
  Minimize2,
  RefreshCw,
  Camera,
  Monitor,
  Tablet,
  Smartphone,
  Play,
  Pause,
  Volume2,
  Info,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function InteractiveViewerPage() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'shaded'>('solid');
  const [lighting, setLighting] = useState<'studio' | 'outdoor' | 'night' | 'custom'>('studio');
  const [showStats, setShowStats] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const models = [
    {
      id: 0,
      name: "Modern Villa",
      category: "Architecture",
      triangles: "125K",
      materials: 8,
      textures: 12,
      preview: "villa"
    },
    {
      id: 1,
      name: "Sports Car",
      category: "Automotive",
      triangles: "250K",
      materials: 15,
      textures: 20,
      preview: "car"
    },
    {
      id: 2,
      name: "Product Design",
      category: "Product",
      triangles: "45K",
      materials: 6,
      textures: 8,
      preview: "product"
    },
    {
      id: 3,
      name: "Interior Scene",
      category: "Interior",
      triangles: "180K",
      materials: 12,
      textures: 16,
      preview: "interior"
    },
    {
      id: 4,
      name: "Character Model",
      category: "Character",
      triangles: "95K",
      materials: 10,
      textures: 14,
      preview: "character"
    }
  ];

  const lightingPresets = [
    { id: 'studio', label: 'Studio', icon: Monitor },
    { id: 'outdoor', label: 'Outdoor', icon: Sun },
    { id: 'night', label: 'Night', icon: Moon },
    { id: 'custom', label: 'Custom', icon: Settings }
  ];

  const viewModes = [
    { id: 'solid', label: 'Solid', icon: Box },
    { id: 'wireframe', label: 'Wireframe', icon: Grid },
    { id: 'shaded', label: 'Shaded', icon: Layers }
  ];

  useEffect(() => {
    if (isRotating) {
      const interval = setInterval(() => {
        setRotation(prev => ({ ...prev, y: prev.y + 1 }));
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isRotating]);

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.max(50, Math.min(200, prev + delta)));
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0, z: 0 });
    setZoom(100);
    setIsRotating(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Minimal Tech Header */}
      <section className="relative pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-8">
          <div
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              <Box className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Interactive 3D Viewer</span>
            </div>
          </div>

          <h1}
            className="text-center font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Interactive
            </span>
            <span className="block text-white mt-2">3D Viewer</span>
          </h1>
        </div>
      </section>

      {/* Main Viewer Interface - Split Layout */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Model Library */}
            <div
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-cyan-700/30 bg-gradient-to-br from-slate-900/60 to-black/60 backdrop-blur-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl font-bold text-white">Model Library</h3>
                  <span className="text-cyan-400 text-sm">{models.length} models</span>
                </div>
                <div className="space-y-3">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.id);
                        resetView();
                      }}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        selectedModel === model.id
                          ? 'border-cyan-500 bg-cyan-500/20'
                          : 'border-cyan-700/30 bg-slate-900/30 hover:border-cyan-600/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white mb-1">{model.name}</h4>
                          <p className="text-cyan-200/70 text-xs">{model.category}</p>
                        </div>
                        {selectedModel === model.id && (
                          <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-cyan-200/60">
                        <span>{model.triangles} tris</span>
                        <span>{model.materials} mats</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Viewer Area */}
            <div className="lg:col-span-6 relative">
              {/* Viewer Canvas */}
              <div
                ref={viewerRef}
                className="relative aspect-square rounded-2xl border-2 border-cyan-700/30 bg-gradient-to-br from-slate-900/80 via-blue-950/60 to-black/80 backdrop-blur-xl overflow-hidden"
              >
                {/* 3D Viewport Background */}
                <div className="absolute inset-0">
                  {/* Grid Pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                  />

                  {/* 3D Model Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="relative"
                    >
                      {/* 3D Cube Representation */}
                      <div className="relative w-64 h-64 perspective-1000">
                        <div
                          className="relative w-full h-full preserve-3d"deg) rotateX(${rotation.x}deg)`,
                            transformStyle: 'preserve-3d'
                          >
                          {/* Front */}
                          <div className="absolute w-64 h-64 bg-gradient-to-br from-cyan-500/40 to-blue-500/40 border-2 border-cyan-400/50"} />
                          {/* Back */}
                          <div className="absolute w-64 h-64 bg-gradient-to-br from-indigo-500/40 to-blue-500/40 border-2 border-indigo-400/50"} />
                          {/* Right */}
                          <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 border-2 border-blue-400/50"} />
                          {/* Left */}
                          <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/40 to-indigo-500/40 border-2 border-blue-400/50"} />
                          {/* Top */}
                          <div className="absolute w-64 h-64 bg-gradient-to-br from-cyan-500/40 to-indigo-500/40 border-2 border-cyan-400/50"} />
                          {/* Bottom */}
                          <div className="absolute w-64 h-64 bg-gradient-to-br from-indigo-500/40 to-cyan-500/40 border-2 border-indigo-400/50"} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Mode Indicator */}
                  {viewMode === 'wireframe' && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0"} />
                    </div>
                  )}
                </div>

                {/* Top Controls Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-700/30">
                    <Box className="w-4 h-4 text-cyan-400" />
                    <span className="text-white text-sm font-semibold">{models[selectedModel].name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="w-9 h-9 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-700/30 hover:bg-cyan-500/20 transition-all flex items-center justify-center"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Maximize2 className="w-4 h-4 text-cyan-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Bottom Stats */}
                {showStats && (
                  <div
                    className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-700/30"
                  >
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-cyan-200/70 text-xs mb-1">Triangles</div>
                        <div className="text-white font-semibold">{models[selectedModel].triangles}</div>
                      </div>
                      <div>
                        <div className="text-cyan-200/70 text-xs mb-1">Materials</div>
                        <div className="text-white font-semibold">{models[selectedModel].materials}</div>
                      </div>
                      <div>
                        <div className="text-cyan-200/70 text-xs mb-1">Textures</div>
                        <div className="text-white font-semibold">{models[selectedModel].textures}</div>
                      </div>
                      <div>
                        <div className="text-cyan-200/70 text-xs mb-1">FPS</div>
                        <div className="text-white font-semibold">60</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Center Controls */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => handleZoom(10)}
                    className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-700/30 hover:bg-cyan-500/20 transition-all flex items-center justify-center"
                  >
                    <ZoomIn className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => handleZoom(-10)}
                    className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-700/30 hover:bg-cyan-500/20 transition-all flex items-center justify-center"
                  >
                    <ZoomOut className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={resetView}
                    className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm border border-cyan-700/30 hover:bg-cyan-500/20 transition-all flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Controls */}
            <div
              className="lg:col-span-3 space-y-6"
            >
              {/* View Mode Controls */}
              <div className="rounded-2xl border border-cyan-700/30 bg-gradient-to-br from-slate-900/60 to-black/60 backdrop-blur-xl p-6">
                <h3 className="font-heading text-lg font-bold text-white mb-4">View Mode</h3>
                <div className="space-y-2">
                  {viewModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setViewMode(mode.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
                          viewMode === mode.id
                            ? 'border-cyan-500 bg-cyan-500/20'
                            : 'border-cyan-700/30 bg-slate-900/30 hover:border-cyan-600/50'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-white font-semibold">{mode.label}</span>
                        {viewMode === mode.id && (
                          <Check className="w-4 h-4 text-cyan-400 ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lighting Controls */}
              <div className="rounded-2xl border border-cyan-700/30 bg-gradient-to-br from-slate-900/60 to-black/60 backdrop-blur-xl p-6">
                <h3 className="font-heading text-lg font-bold text-white mb-4">Lighting</h3>
                <div className="grid grid-cols-2 gap-2">
                  {lightingPresets.map((preset) => {
                    const Icon = preset.icon;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => setLighting(preset.id as any)}
                        className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                          lighting === preset.id
                            ? 'border-cyan-500 bg-cyan-500/20'
                            : 'border-cyan-700/30 bg-slate-900/30 hover:border-cyan-600/50'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-white text-xs font-semibold">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interaction Controls */}
              <div className="rounded-2xl border border-cyan-700/30 bg-gradient-to-br from-slate-900/60 to-black/60 backdrop-blur-xl p-6">
                <h3 className="font-heading text-lg font-bold text-white mb-4">Interaction</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
                      isRotating
                        ? 'border-cyan-500 bg-cyan-500/20'
                        : 'border-cyan-700/30 bg-slate-900/30 hover:border-cyan-600/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RotateCw className={`w-5 h-5 text-cyan-400 ${isRotating ? 'animate-spin' : ''}`} />
                      <span className="text-white font-semibold">Auto Rotate</span>
                    </div>
                    {isRotating && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
                      showStats
                        ? 'border-cyan-500 bg-cyan-500/20'
                        : 'border-cyan-700/30 bg-slate-900/30 hover:border-cyan-600/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {showStats ? (
                        <Eye className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-cyan-400" />
                      )}
                      <span className="text-white font-semibold">Show Stats</span>
                    </div>
                    {showStats && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                </div>
              </div>

              {/* Export Options */}
              <div className="rounded-2xl border border-cyan-700/30 bg-gradient-to-br from-slate-900/60 to-black/60 backdrop-blur-xl p-6">
                <h3 className="font-heading text-lg font-bold text-white mb-4">Export</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-cyan-700/30 bg-slate-900/30 hover:border-cyan-600/50 transition-all">
                    <Download className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-semibold">Download Model</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-cyan-700/30 bg-slate-900/30 hover:border-cyan-600/50 transition-all">
                    <Camera className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-semibold">Capture Image</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-cyan-700/30 bg-slate-900/30 hover:border-cyan-600/50 transition-all">
                    <Share2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-white font-semibold">Share View</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-br from-slate-900/40 via-blue-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            <div
              className="relative z-10"
            >
              <Box className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Integrate Interactive Viewer
              </h2>
              <p className="text-xl text-cyan-200/80 mb-8 max-w-2xl mx-auto">
                Embed our interactive 3D viewer into your website or application. Experience your models in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Get Started
                    <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold text-lg hover:bg-cyan-500/20 transition-all flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    View Documentation
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
