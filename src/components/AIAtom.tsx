"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Torus, Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

type AIAtomProps = Omit<React.ComponentProps<"group">, "ref">;

export default function AIAtom({ position = [0, 0, 0], ...rest }: AIAtomProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseY = useRef(Array.isArray(position) ? (position[1] || 0) : 0);

  useEffect(() => {
    baseY.current = Array.isArray(position) ? (position[1] || 0) : 0;
  }, [position]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y += 0.002;
    groupRef.current.position.y = baseY.current + Math.sin(t * 0.8) * 0.2;
  });

  return (
    <group ref={groupRef} position={position as [number, number, number]} {...rest}>
      <Text
        fontSize={1.2}
        color="#E6D4FF"
        anchorX="center"
        anchorY="middle"
      >
        AI
      </Text>

      <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#4285F4" emissive="#4285F4" emissiveIntensity={0.6} />
      </Torus>
      <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.6} />
      </Torus>
      <Torus args={[2, 0.1, 16, 100]} rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
        <meshStandardMaterial color="#8A2BE2" emissive="#8A2BE2" emissiveIntensity={0.6} />
      </Torus>

      <Sphere position={[2, 0, 0]} args={[0.2]}>
        <meshStandardMaterial color="#4285F4" emissive="#4285F4" emissiveIntensity={1} />
      </Sphere>
      <Sphere position={[-1, 1.732, 0]} args={[0.2]}>
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={1} />
      </Sphere>
      <Sphere position={[-1, -1.732, 0]} args={[0.2]}>
        <meshStandardMaterial color="#8A2BE2" emissive="#8A2BE2" emissiveIntensity={1} />
      </Sphere>
    </group>
  );
}
