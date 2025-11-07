"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import AIAtom from "./AIAtom";
import NeuralLines from "./NeuralLines";
import FuturisticHouse from "./FuturisticHouse";

// Star-like particles component
function Particles({ count = 5000, scrollProgress = 0 }: { count?: number, scrollProgress?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const baseX = useRef(0);
  
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      array[i] = (Math.random() - 0.5) * 25;
    }
    return array;
  }, [count]);
  
  useFrame((state, delta) => {
    if (ref.current) {
      // Normal rotation
      ref.current.rotation.y += delta * 0.05;
      // Move right based on scroll progress (offset from base)
      ref.current.position.x = baseX.current + scrollProgress * 5;
    }
  });
  
  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial transparent color="#87CEEB" size={0.015} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

function ResponsiveAtomWrapper({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const { viewport } = useThree();
  const isMobile = viewport.width / viewport.height < 1;
  const isTablet = viewport.width / viewport.height >= 1 && viewport.width / viewport.height < 1.5;
  const atomScale = isMobile ? 0.5 : isTablet ? 0.6 : 0.9;
  
  // Position based on view type
  let atomPosition: [number, number, number];
  let atomRotation: [number, number, number];
  if (isMobile) {
    atomPosition = [-1.5, -4, 0];  // Slightly up from bottom
    atomRotation = [0, 0, 0];
  } else if (isTablet) {
    atomPosition = [-5, -4, 0];  // Left side, bottom
    atomRotation = [0, 0, -0.1];
  } else {
    atomPosition = [-8, -2, 0];  // Desktop left
    atomRotation = [0, 0, -0.2];
  }

  // Move atom left on scroll
  const scrollOffsetX = -scrollProgress * 3;
  const finalPosition: [number, number, number] = [atomPosition[0] + scrollOffsetX, atomPosition[1], atomPosition[2]];

  return <AIAtom position={finalPosition} rotation={atomRotation} scale={atomScale} />;
}

function ResponsiveHouse({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const { viewport } = useThree();
  const isMobile = viewport.width / viewport.height < 1;
  
  // Base position and scale
  let basePosition, baseScale;
  if (isMobile) {
    basePosition = [1.8, 3.5, -7];
    baseScale = 0.45;
  } else {
    basePosition = [0, 1.5, -8];
    baseScale = 0.75;
  }
  
  // Move building backward and scale down on scroll (disappear into space effect)
  const scrollZ = basePosition[2] - scrollProgress * 25;  // Move extremely far away
  const scrollScale = baseScale * (1 - scrollProgress);  // Scale to zero
  
  const finalPosition = [basePosition[0], basePosition[1], scrollZ] as [number, number, number];
  
  return <FuturisticHouse position={finalPosition} scale={scrollScale} />;
}

export default function Scene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 7]} intensity={0.8} />
      
      <Suspense fallback={null}>
        <ResponsiveAtomWrapper scrollProgress={scrollProgress} />
        <ResponsiveHouse scrollProgress={scrollProgress} />
      </Suspense>
      
      <NeuralLines />
      <Particles scrollProgress={scrollProgress} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.025} height={400} intensity={1.5} />
      </EffectComposer>
    </Canvas>
  );
}
