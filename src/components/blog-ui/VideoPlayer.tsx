"use client";

import { useRef, useEffect } from 'react';
import { useBlogTheme } from '@/components/BlogThemeProvider';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

/**
 * VideoPlayer Component
 * 
 * Reusable video player for blog posts with consistent styling.
 * Supports hosted videos (MP4, WebM) and responsive design.
 */
export default function VideoPlayer({ 
  src, 
  poster, 
  title,
  autoPlay = false,
  loop = false,
  muted = false
}: VideoPlayerProps) {
  const { theme } = useBlogTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.log('Video autoplay prevented:', error);
        }
      };
      playVideo();
    }
  }, [autoPlay]);

  // Detect if YouTube or Vimeo embed
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const isVimeo = src.includes('vimeo.com');
  const isEmbed = isYouTube || isVimeo;

  // Convert YouTube watch URL to embed URL
  let embedSrc = src;
  if (isYouTube) {
    const videoId = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if (videoId) {
      embedSrc = `https://www.youtube.com/embed/${videoId}`;
    }
  } else if (isVimeo) {
    const videoId = src.match(/vimeo\.com\/(\d+)/)?.[1];
    if (videoId) {
      embedSrc = `https://player.vimeo.com/video/${videoId}`;
    }
  }

  if (isEmbed) {
    // Render iframe for YouTube/Vimeo
    return (
      <div className={`my-6 sm:my-8 overflow-hidden rounded-xl sm:rounded-2xl border-2 shadow-2xl ${
        theme === 'dark' ? 'border-cyan-500/30' : 'border-cyan-500/30'
      }`}>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedSrc}
            title={title || 'Video player'}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Render native video player for hosted videos
  return (
    <div className={`my-6 sm:my-8 overflow-hidden rounded-xl sm:rounded-2xl border-2 shadow-2xl ${
      theme === 'dark' ? 'border-cyan-500/30 bg-black' : 'border-cyan-500/30'
    }`}>
      <video
        ref={videoRef}
        controls
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        preload="metadata"
        poster={poster}
        className="w-full h-auto"
        title={title}
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
