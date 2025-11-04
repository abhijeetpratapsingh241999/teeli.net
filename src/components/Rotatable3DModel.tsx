"use client";

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Rotatable3DModelProps {
  className?: string;
}

export default function Rotatable3DModel({ className = "" }: Rotatable3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -15, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      setRotation(prev => ({
        y: prev.y + deltaX * 0.5,
        x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5))
      }));

      setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, lastMousePos]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !containerRef.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - lastMousePos.x;
      const deltaY = e.touches[0].clientY - lastMousePos.y;

      setRotation(prev => ({
        y: prev.y + deltaX * 0.5,
        x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5))
      }));

      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, lastMousePos]);

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 0.5
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full perspective-1000 ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
    >
      <div
        className="relative w-full h-full preserve-3d flex items-center justify-center"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        {/* 3D House Model */}
        <div className="relative flex items-center justify-center" style={{ width: 'clamp(150px, 80%, 200px)', height: 'clamp(150px, 80%, 200px)' }}>
          {/* Front Face */}
          <div
            className="absolute bg-gradient-to-br from-pink-500/50 to-purple-500/50 border-2 border-pink-400/60"
            style={{
              width: '140px',
              height: '120px',
              transform: 'translateZ(70px)',
              boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.15), 0 0 20px rgba(255, 0, 150, 0.2)'
            }}
          >
            <div className="absolute inset-2 border border-pink-300/40 rounded"></div>
            {/* Window */}
            <div className="absolute top-5 left-5 w-10 h-10 bg-cyan-400/40 border-2 border-cyan-300/60 rounded shadow-lg"></div>
            <div className="absolute top-5 right-5 w-10 h-10 bg-cyan-400/40 border-2 border-cyan-300/60 rounded shadow-lg"></div>
            {/* Door */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-14 bg-purple-600/50 border-2 border-purple-400/60 rounded-t shadow-lg"></div>
          </div>

          {/* Back Face */}
          <div
            className="absolute bg-gradient-to-br from-purple-500/50 to-pink-500/50 border-2 border-purple-400/60"
            style={{
              width: '140px',
              height: '120px',
              transform: 'translateZ(-70px) rotateY(180deg)',
              boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.15)'
            }}
          ></div>

          {/* Right Face */}
          <div
            className="absolute bg-gradient-to-br from-pink-600/40 to-purple-600/40 border-2 border-pink-500/50"
            style={{
              width: '140px',
              height: '120px',
              transform: 'rotateY(90deg) translateZ(70px)',
              boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.1)'
            }}
          ></div>

          {/* Left Face */}
          <div
            className="absolute bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-2 border-purple-500/50"
            style={{
              width: '140px',
              height: '120px',
              transform: 'rotateY(-90deg) translateZ(70px)',
              boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.1)'
            }}
          ></div>

          {/* Top Face (Roof) */}
          <div
            className="absolute bg-gradient-to-br from-cyan-500/50 to-pink-500/50 border-2 border-cyan-400/60"
            style={{
              width: '140px',
              height: '140px',
              transform: 'rotateX(90deg) translateZ(70px)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
            }}
          ></div>

          {/* Bottom Face */}
          <div
            className="absolute bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 border-2 border-zinc-600/60"
            style={{
              width: '140px',
              height: '140px',
              transform: 'rotateX(-90deg) translateZ(60px)'
            }}
          ></div>
        </div>
      </div>

      {/* Instructions */}
      {!isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-pink-300/70 pointer-events-none"
        >
          Drag to rotate
        </motion.div>
      )}
    </div>
  );
}
