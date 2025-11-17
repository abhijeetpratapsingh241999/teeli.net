"use client";

import { useState } from 'react';

const technologies = [
  { name: "AWS", logo: "☁️" },
  { name: "Google Cloud", logo: "🌐" },
  { name: "NVIDIA", logo: "🎮" },
  { name: "Blender", logo: "🎨" },
  { name: "Unreal Engine", logo: "🎯" },
  { name: "TensorFlow", logo: "🧠" },
  { name: "PyTorch", logo: "🔥" },
  { name: "Kubernetes", logo: "⚙️" },
  { name: "Docker", logo: "🐋" },
  { name: "CoreWeave", logo: "⚡" },
];

export default function TechStackSlider() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative overflow-hidden py-12">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Container */}
      <div
        className="flex gap-12 animate-scroll"
        style={{
          animationPlayState: isHovered ? 'paused' : 'running'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* First set of logos */}
        {technologies.map((tech, index) => (
          <div
            key={`first-${index}`}
            className="flex flex-col items-center justify-center min-w-[120px] group cursor-pointer"
          >
            <div className="text-5xl mb-3 transition-transform group-hover:scale-110">
              {tech.logo}
            </div>
            <span className="text-sm text-zinc-400 group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {technologies.map((tech, index) => (
          <div
            key={`second-${index}`}
            className="flex flex-col items-center justify-center min-w-[120px] group cursor-pointer"
          >
            <div className="text-5xl mb-3 transition-transform group-hover:scale-110">
              {tech.logo}
            </div>
            <span className="text-sm text-zinc-400 group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-120px * ${technologies.length} - 3rem * ${technologies.length}));
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
