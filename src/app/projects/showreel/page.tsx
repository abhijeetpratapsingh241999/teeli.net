"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  X,
  Filter,
  Video,
  Film,
  Camera,
  Sparkles,
  Zap,
  Globe,
  Building2,
  Palette,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function ShowreelPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All", icon: Video },
    { id: "architectural", label: "Architecture", icon: Building2 },
    { id: "product", label: "Product", icon: Palette },
    { id: "cinematic", label: "Cinematic", icon: Film },
    { id: "animation", label: "Animation", icon: Sparkles },
    { id: "automotive", label: "Automotive", icon: Zap },
    { id: "interior", label: "Interior", icon: Globe }
  ];

  const videos = [
    {
      id: 0,
      title: "Luxury Architecture Showreel 2024",
      category: "architectural",
      duration: "3:24",
      thumbnail: "arch-1",
      description: "Stunning residential and commercial architecture visualization",
      views: "2.4M",
      year: 2024,
      featured: true
    },
    {
      id: 1,
      title: "Product Design Showcase",
      category: "product",
      duration: "2:15",
      thumbnail: "prod-1",
      description: "High-end product renders and animations",
      views: "1.8M",
      year: 2024,
      featured: false
    },
    {
      id: 2,
      title: "Cinematic Visual Effects",
      category: "cinematic",
      duration: "4:32",
      thumbnail: "cine-1",
      description: "Epic VFX sequences and motion graphics",
      views: "3.1M",
      year: 2024,
      featured: false
    },
    {
      id: 3,
      title: "Automotive Render Collection",
      category: "automotive",
      duration: "2:48",
      thumbnail: "auto-1",
      description: "Luxury vehicles and concept cars",
      views: "1.5M",
      year: 2024,
      featured: false
    },
    {
      id: 4,
      title: "Interior Design Journey",
      category: "interior",
      duration: "3:12",
      thumbnail: "int-1",
      description: "Beautiful interior spaces and lighting",
      views: "950K",
      year: 2023,
      featured: false
    },
    {
      id: 5,
      title: "Animation Studio Reel",
      category: "animation",
      duration: "5:18",
      thumbnail: "anim-1",
      description: "Character animations and storytelling",
      views: "2.7M",
      year: 2024,
      featured: false
    },
    {
      id: 6,
      title: "Architectural Flythrough",
      category: "architectural",
      duration: "4:05",
      thumbnail: "arch-2",
      description: "Aerial views and building tours",
      views: "1.2M",
      year: 2024,
      featured: false
    },
    {
      id: 7,
      title: "Product Launch Campaign",
      category: "product",
      duration: "1:52",
      thumbnail: "prod-2",
      description: "Commercial product presentations",
      views: "890K",
      year: 2024,
      featured: false
    },
    {
      id: 8,
      title: "Epic Cinematic Trailer",
      category: "cinematic",
      duration: "3:45",
      thumbnail: "cine-2",
      description: "Blockbuster-style visual effects",
      views: "4.2M",
      year: 2024,
      featured: false
    },
    {
      id: 9,
      title: "Luxury Vehicle Showcase",
      category: "automotive",
      duration: "2:30",
      thumbnail: "auto-2",
      description: "Premium automotive visualization",
      views: "1.1M",
      year: 2024,
      featured: false
    },
    {
      id: 10,
      title: "Modern Interior Spaces",
      category: "interior",
      duration: "2:58",
      thumbnail: "int-2",
      description: "Contemporary design and aesthetics",
      views: "720K",
      year: 2023,
      featured: false
    },
    {
      id: 11,
      title: "Animated Short Film",
      category: "animation",
      duration: "6:24",
      thumbnail: "anim-2",
      description: "Creative storytelling through animation",
      views: "3.5M",
      year: 2024,
      featured: false
    }
  ];

  const filteredVideos = selectedCategory === "all"
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  const featuredVideo = videos.find(v => v.featured) || videos[0];

  useEffect(() => {
    if (selectedVideo !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-950 via-rose-950 to-black text-white overflow-hidden">
      <Header />

      {/* Unique Hero - Featured Video Player */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-rose-900/20 to-orange-900/20"></div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)'
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm">
              <Film className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Showreel Gallery</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-4">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-rose-400 to-orange-400">
                Showreel
              </span>
              <span className="block text-white mt-2">& Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-200/80 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of stunning renders, animations, and cinematic visualizations
            </p>
          </motion.div>

          {/* Featured Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-6xl mx-auto mb-16 rounded-2xl overflow-hidden border-2 border-red-700/30 bg-gradient-to-br from-red-950/60 to-black/60 backdrop-blur-xl group"
          >
            {/* Video Container */}
            <div className="relative aspect-video bg-gradient-to-br from-red-900/40 via-rose-900/40 to-orange-900/40">
              {/* Placeholder Video Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Film className="w-32 h-32 text-red-400/30 mx-auto mb-4" />
                  <p className="text-red-200/50 text-lg font-semibold">Video Player</p>
                </div>
              </div>

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <div className="text-white text-sm font-semibold">{featuredVideo.duration}</div>
                    <button
                      onClick={() => setSelectedVideo(featuredVideo.id)}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                    >
                      <Maximize className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute top-0 left-0 right-0 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold mb-2 inline-block">
                      Featured
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                      {featuredVideo.title}
                    </h2>
                    <p className="text-red-200/80">{featuredVideo.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-bold text-lg">{featuredVideo.views}</div>
                    <div className="text-red-200/70 text-sm">views</div>
                  </div>
                </div>
              </div>

              {/* Play Button Center */}
              {!isPlaying && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setIsPlaying(true)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-red-500/90 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110 shadow-2xl shadow-red-500/50"
                >
                  <Play className="w-10 h-10 text-white ml-2" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-red-950/20 to-black border-y border-red-800/30 sticky top-20 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all ${
                    isActive
                      ? 'border-red-500 bg-red-500/20 text-red-400'
                      : 'border-red-700/30 bg-red-950/30 text-red-200/70 hover:border-red-600/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-semibold text-sm">{cat.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Video Collection
            </h2>
            <p className="text-lg text-red-200/80 max-w-3xl mx-auto">
              Browse our complete library of visualizations and animations
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.filter(v => !v.featured).map((video, index) => {
                const isHovered = hoveredVideo === video.id;
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onHoverStart={() => setHoveredVideo(video.id)}
                    onHoverEnd={() => setHoveredVideo(null)}
                    onClick={() => setSelectedVideo(video.id)}
                    className="relative rounded-xl border-2 border-red-700/30 bg-gradient-to-br from-red-950/60 to-black/60 backdrop-blur-xl overflow-hidden group cursor-pointer"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-red-900/40 via-rose-900/40 to-orange-900/40 overflow-hidden">
                      {/* Placeholder Thumbnail */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film className={`w-16 h-16 text-red-400/30 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: isHovered ? 1 : 0.8 }}
                          className="w-20 h-20 rounded-full bg-red-500/90 flex items-center justify-center shadow-2xl shadow-red-500/50"
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </motion.div>
                      </motion.div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 backdrop-blur-sm border border-red-700/30">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-red-400" />
                          <span className="text-white text-xs font-semibold">{video.duration}</span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 backdrop-blur-sm border border-red-700/30">
                        <span className="text-red-400 text-xs font-semibold uppercase">
                          {video.category}
                        </span>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <h3 className="font-heading text-lg font-bold text-white mb-1 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-red-200/70 mb-3 line-clamp-2">{video.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Video className="w-3 h-3 text-red-400" />
                          <span className="text-red-200/70">{video.views}</span>
                        </div>
                        <span className="text-red-200/70">{video.year}</span>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    {isHovered && (
                      <motion.div
                        layoutId="videoHoverGlow"
                        className="absolute inset-0 rounded-xl border-2 border-red-400/50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      </section>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Video Player */}
              <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-red-700/30 bg-gradient-to-br from-red-950/60 to-black/60">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/40 via-rose-900/40 to-orange-900/40">
                  <div className="text-center">
                    <Film className="w-32 h-32 text-red-400/30 mx-auto mb-4" />
                    <p className="text-red-200/50 text-lg font-semibold">
                      {videos.find(v => v.id === selectedVideo)?.title}
                    </p>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white ml-1" />
                        )}
                      </button>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <div className="text-white text-sm font-semibold">
                        {videos.find(v => v.id === selectedVideo)?.duration}
                      </div>
                      <button
                        onClick={() => setSelectedVideo(null)}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Center Play Button */}
                {!isPlaying && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setIsPlaying(true)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-red-500/90 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110 shadow-2xl shadow-red-500/50"
                  >
                    <Play className="w-10 h-10 text-white ml-2" />
                  </motion.button>
                )}
              </div>

              {/* Video Info */}
              <div className="mt-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  {videos.find(v => v.id === selectedVideo)?.title}
                </h3>
                <p className="text-red-200/80 mb-4">
                  {videos.find(v => v.id === selectedVideo)?.description}
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-red-200/70">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-400" />
                    <span>{videos.find(v => v.id === selectedVideo)?.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span>{videos.find(v => v.id === selectedVideo)?.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-red-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border-2 border-red-500/30 bg-gradient-to-br from-red-950/40 via-rose-950/40 to-black/40 backdrop-blur-xl p-12 md:p-16 text-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <Film className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Create Your Showreel?
              </h2>
              <p className="text-xl text-red-200/80 mb-8 max-w-2xl mx-auto">
                Transform your projects into stunning visual narratives with our cutting-edge rendering and animation services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-lg shadow-lg shadow-red-500/30 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-xl border-2 border-red-500/30 bg-red-500/10 text-red-400 font-bold text-lg hover:bg-red-500/20 transition-all flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    View More
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
