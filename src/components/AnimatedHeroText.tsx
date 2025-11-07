"use client";

import { useState, useEffect } from "react";
// REMOVED: framer-motion import for performance (-50KB saved)
const features = [
  {
    icon: "⚙️",
    title: "RenderMind AI",
    description: "Predictive render optimization that learns your scenes.",
  },
  {
    icon: "☁️",
    title: "Cloud Fabric",
    description: "Distributed GPU infrastructure across AWS, GCP & CoreWeave.",
  },
  {
    icon: "🌿",
    title: "GreenChain",
    description: "Real-time carbon footprint tracking per render.",
  },
  {
    icon: "🧠",
    title: "NeuroSync UX",
    description: "Emotion-responsive design previews (for future module).",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};

export default function AnimatedHeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 4000); // Change feature every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-4 flex h-24 flex-col items-center justify-center text-center">
      
        <div
          key={index}
          className="flex flex-col items-center justify-center"
        >
          <div className="animate-pulse-slow mb-2 text-3xl">
            {features[index].icon}
          </div>
          <h3 className="font-heading bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
            {features[index].title}
          </h3>
          <p className="max-w-xs px-4 text-base text-zinc-400 md:max-w-lg md:px-0">
            {features[index].description}
          </p>
        </div>
      
    </div>
  );
}
