"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Globe3D() {
  const globeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2; // Keep it horizontal
      ringRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <Sphere ref={globeRef} args={[1, 32, 32]}>
        <meshStandardMaterial wireframe color="cyan" />
      </Sphere>
      <Torus ref={ringRef} args={[1.4, 0.05, 16, 100]}>
        <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={2} />
      </Torus>
    </>
  );
}

export default function AnimatedGlobe() {
  return (
    <div className="h-10 w-10">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Globe3D />
      </Canvas>
    </div>
  );
}
