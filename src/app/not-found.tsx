"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate random positions once
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10
    }));
  }, []);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-linear-to-br from-black via-gray-900 to-black overflow-hidden flex items-center justify-center">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 
              className="text-[150px] sm:text-[200px] md:text-[280px] font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 leading-none tracking-tighter"
              style={{
                textShadow: '0 0 80px rgba(6, 182, 212, 0.5)',
                transform: `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              404
            </h1>
            
            {/* Glitch Effect Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-cyan-400/30 animate-glitch" />
              <div className="absolute top-2/4 left-0 right-0 h-0.5 bg-purple-400/30 animate-glitch" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-pink-400/30 animate-glitch" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Oops! Looks like you&apos;ve ventured into uncharted digital space. 
              The page you&apos;re looking for doesn&apos;t exist in our universe.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <button className="group relative px-8 py-4 bg-linear-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Home
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </Link>

            <Link href="/blog">
              <button className="group relative px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:text-white hover:shadow-2xl hover:shadow-cyan-500/30">
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Visit Blog
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </button>
            </Link>
          </div>

          {/* Fun Error Codes */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-cyan-400 font-mono text-sm mb-1">ERROR</div>
              <div className="text-white font-bold text-xl">404</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-purple-400 font-mono text-sm mb-1">STATUS</div>
              <div className="text-white font-bold text-xl">Lost</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-pink-400 font-mono text-sm mb-1">CODE</div>
              <div className="text-white font-bold text-xl">NF</div>
            </div>
          </div>

          {/* ASCII Art (Optional Fun Element) */}
          <div className="mt-12 text-cyan-400/30 font-mono text-xs sm:text-sm leading-tight hidden sm:block">
            <pre className="inline-block text-left">
{`    ___  ___  _  _   
   | | |/ _ \\| || |  
   | | | | | | || |_ 
   |_|_|_| |_|\\____|`}
            </pre>
          </div>
        </div>

        {/* Animated Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
              fill="rgba(6, 182, 212, 0.1)" 
              fillOpacity="1" 
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-wave"
            />
          </svg>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes glitch {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateX(-10px);
            opacity: 0.5;
          }
          50% {
            transform: translateX(10px);
            opacity: 0.2;
          }
          75% {
            transform: translateX(-5px);
            opacity: 0.4;
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-glitch {
          animation: glitch 2s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 10s linear infinite;
        }
      `}</style>
    </>
  );
}
