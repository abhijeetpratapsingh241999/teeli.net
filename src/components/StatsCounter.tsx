"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface StatsCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (end - startValue) * easeOutQuart;
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {/* Stat 1: Renders Completed */}
      <div className="text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          <AnimatedCounter end={50} suffix="K+" />
        </div>
        <p className="text-zinc-400 text-sm md:text-base">
          Renders Completed
        </p>
      </div>

      {/* Stat 2: Active Users */}
      <div className="text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
          <AnimatedCounter end={500} suffix="+" />
        </div>
        <p className="text-zinc-400 text-sm md:text-base">
          Active Users
        </p>
      </div>

      {/* Stat 3: Success Rate */}
      <div className="text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
          <AnimatedCounter end={99.9} decimals={1} suffix="%" />
        </div>
        <p className="text-zinc-400 text-sm md:text-base">
          Success Rate
        </p>
      </div>

      {/* Stat 4: Processing Speed */}
      <div className="text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
          <AnimatedCounter end={10} suffix="x" />
        </div>
        <p className="text-zinc-400 text-sm md:text-base">
          Faster Processing
        </p>
      </div>
    </div>
  );
}
