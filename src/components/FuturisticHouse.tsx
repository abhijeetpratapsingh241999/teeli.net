"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

type FuturisticHouseProps = Omit<React.ComponentProps<"group">, "ref">;

export default function FuturisticHouse({ ...rest }: FuturisticHouseProps) {
  const groupRef = useRef<THREE.Group>(null);

  const darkFrame = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0f2c52", metalness: 0.9, roughness: 0.2 }),
    []
  );

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.08,
        roughness: 0,
        metalness: 0,
        transmission: 0.95,
        thickness: 0.3,
        emissive: "#ffffff",
        emissiveIntensity: 0.4,
      }),
    []
  );

  const cyanGlow = useMemo(() => new THREE.MeshBasicMaterial({ color: "#3af0ff", toneMapped: false }), []);

  // Glass railing material
  const glassRailing = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#3a8fff",
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        metalness: 0.5,
        transmission: 0.8,
        thickness: 0.05,
        emissive: "#1a3a6a",
        emissiveIntensity: 0.3,
      }),
    []
  );

  // Interior materials
  const interiorWall = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a2a4a", emissive: "#2a3a6a", emissiveIntensity: 0.4 }),
    []
  );
  const floorMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0f1e35", roughness: 0.8 }),
    []
  );
  const sofaCushion = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a3560", emissive: "#3a65aa", emissiveIntensity: 0.6 }),
    []
  );
  const bottomFloorSofa = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#3a1a1a", emissive: "#ff2a2a", emissiveIntensity: 0.8 }),
    []
  );
  const sofaFrame = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0a1520", metalness: 0.7, roughness: 0.4 }),
    []
  );
  const bottomFloorGlass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#5a9fff",
        transparent: true,
        opacity: 0.15,
        roughness: 0,
        metalness: 0,
        transmission: 0.9,
        thickness: 0.3,
        emissive: "#2a4a8f",
        emissiveIntensity: 0.3,
      }),
    []
  );
  const tableTop = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0f2038", metalness: 0.8, roughness: 0.3 }),
    []
  );
  const lampGlow = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#5a9fff", emissive: "#7abfff", emissiveIntensity: 0.8 }),
    []
  );
  const plantColor = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a5a3a", emissive: "#2a7a5a", emissiveIntensity: 0.2 }),
    []
  );

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.1;
  });

  return (
    <group ref={groupRef} {...rest}>
      {/* Central dark core (main pillar) */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[2, 4, 2]} />
        <meshStandardMaterial color="#0d1f3c" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Floor levels - bottom to top */}
      {[
        { y: 0.3, w: 8, d: 7, glass: true, isBottom: true },
        { y: 2.3, w: 7, d: 6, glass: true, isBottom: false },
        { y: 4.3, w: 6, d: 5.5, glass: true, isBottom: false },
      ].map((level, i) => (
        <group key={i} position={[0, level.y, 0]}>
          {/* Main slab/platform */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[level.w, 0.3, level.d]} />
            <primitive attach="material" object={darkFrame} />
          </mesh>

          {/* Top glowing edge (thin rim) */}
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[level.w * 1.02, 0.04, level.d * 1.02]} />
            <primitive attach="material" object={cyanGlow} />
          </mesh>

          {/* Glass railing border around each platform */}
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[level.w * 0.99, 0.03, level.d * 0.99]} />
            <primitive attach="material" object={glassRailing} />
          </mesh>

          {/* Glass window panels - only for middle and top */}
          {level.glass && (
            <>
              {/* Interior floor */}
              <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[level.w - 1.4, 0.05, level.d - 1.2]} />
                <primitive attach="material" object={floorMaterial} />
              </mesh>

              {/* Interior wall backdrop */}
              <mesh position={[0, 1, -level.d / 2 + 0.8]}>
                <boxGeometry args={[level.w - 1.4, 1.5, 0.2]} />
                <primitive attach="material" object={interiorWall} />
              </mesh>

              {/* Interior wall sides */}
              <mesh position={[level.w / 2 - 0.8, 1, 0]}>
                <boxGeometry args={[0.2, 1.5, level.d - 1.2]} />
                <primitive attach="material" object={interiorWall} />
              </mesh>
              <mesh position={[-level.w / 2 + 0.8, 1, 0]}>
                <boxGeometry args={[0.2, 1.5, level.d - 1.2]} />
                <primitive attach="material" object={interiorWall} />
              </mesh>

              {/* Glass window panels - use light blue for bottom floor */}
              <mesh position={[0, 1.2, 0]} scale={[level.w - 1.2, 2, level.d - 1]}>
                <boxGeometry args={[1, 1, 1]} />
                <primitive attach="material" object={level.isBottom ? bottomFloorGlass : glassMaterial} />
              </mesh>

              {/* Sofa set in interior - positioned after glass to ensure visibility */}
              {!level.isBottom && (
                <group position={[0, 0.4, -level.d / 2 + 1.5]}>
                  {/* Sofa base/frame */}
                  <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2.5, 0.2, 1.2]} />
                    <primitive attach="material" object={sofaFrame} />
                  </mesh>
                  {/* Sofa back cushion */}
                  <mesh position={[0, 0.3, -0.5]}>
                    <boxGeometry args={[2.5, 0.6, 0.15]} />
                    <primitive attach="material" object={sofaCushion} />
                  </mesh>
                  {/* Left seat cushion */}
                  <mesh position={[-0.8, 0.3, 0.2]}>
                    <boxGeometry args={[0.8, 0.3, 0.8]} />
                    <primitive attach="material" object={sofaCushion} />
                  </mesh>
                  {/* Right seat cushion */}
                  <mesh position={[0.8, 0.3, 0.2]}>
                    <boxGeometry args={[0.8, 0.3, 0.8]} />
                    <primitive attach="material" object={sofaCushion} />
                  </mesh>
                </group>
              )}

              {/* Bottom floor room interior - sofa, table, lamp, plant */}
              {level.isBottom && (
                <group position={[0, 0.4, -level.d / 2 + 1.8]}>
                  {/* Main sofa set */}
                  <group position={[-1.5, 0, 0]}>
                    <mesh position={[0, 0, 0]}>
                      <boxGeometry args={[2, 0.2, 1]} />
                      <primitive attach="material" object={sofaFrame} />
                    </mesh>
                    <mesh position={[0, 0.35, -0.45]}>
                      <boxGeometry args={[2, 0.7, 0.15]} />
                      <primitive attach="material" object={bottomFloorSofa} />
                    </mesh>
                    <mesh position={[0, 0.25, 0.2]}>
                      <boxGeometry args={[1.8, 0.5, 0.7]} />
                      <primitive attach="material" object={bottomFloorSofa} />
                    </mesh>
                  </group>

                  {/* Coffee table in front of sofa */}
                  <group position={[-1.5, 0, 1.5]}>
                    <mesh position={[0, 0.3, 0]}>
                      <boxGeometry args={[0.8, 0.05, 0.8]} />
                      <primitive attach="material" object={tableTop} />
                    </mesh>
                    <mesh position={[-0.25, 0.15, -0.25]}>
                      <boxGeometry args={[0.08, 0.3, 0.08]} />
                      <primitive attach="material" object={tableTop} />
                    </mesh>
                    <mesh position={[0.25, 0.15, -0.25]}>
                      <boxGeometry args={[0.08, 0.3, 0.08]} />
                      <primitive attach="material" object={tableTop} />
                    </mesh>
                    <mesh position={[-0.25, 0.15, 0.25]}>
                      <boxGeometry args={[0.08, 0.3, 0.08]} />
                      <primitive attach="material" object={tableTop} />
                    </mesh>
                    <mesh position={[0.25, 0.15, 0.25]}>
                      <boxGeometry args={[0.08, 0.3, 0.08]} />
                      <primitive attach="material" object={tableTop} />
                    </mesh>
                  </group>

                  {/* Side table with lamp */}
                  <group position={[1, 0, 0]}>
                    {/* Table */}
                    <mesh position={[0, 0.5, 0]}>
                      <boxGeometry args={[1.2, 0.1, 0.8]} />
                      <primitive attach="material" object={tableTop} />
                    </mesh>
                    <mesh position={[-0.4, 0.25, -0.25]}>
                      <boxGeometry args={[0.1, 0.5, 0.1]} />
                      <primitive attach="material" object={tableTop} />
                    </mesh>
                    <mesh position={[0.4, 0.25, -0.25]}>
                      <boxGeometry args={[0.1, 0.5, 0.1]} />
                      <primitive attach="material" object={tableTop} />
                    </mesh>

                    {/* Lamp */}
                    <mesh position={[0, 1.2, 0]}>
                      <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                      <primitive attach="material" object={tableTop} />
                    </mesh>
                    <mesh position={[0, 1.6, 0]}>
                      <sphereGeometry args={[0.2, 16, 16]} />
                      <primitive attach="material" object={lampGlow} />
                    </mesh>
                  </group>

                  {/* TV on wall */}
                  <mesh position={[0, 1.4, -level.d / 2 + 1.5]}>
                    <boxGeometry args={[1.5, 0.9, 0.1]} />
                    <meshStandardMaterial color="#0a0a0a" emissive="#2a2a4a" emissiveIntensity={0.3} />
                  </mesh>

                  {/* Bookshelf */}
                  <group position={[level.w / 2 - 0.8, 0, 0]}>
                    <mesh position={[0, 0.8, 0]}>
                      <boxGeometry args={[0.15, 1.6, 0.8]} />
                      <meshStandardMaterial color="#1a2030" metalness={0.5} roughness={0.4} />
                    </mesh>
                    {/* Shelves */}
                    <mesh position={[0, 0.4, 0]}>
                      <boxGeometry args={[0.1, 0.02, 0.8]} />
                      <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.5} />
                    </mesh>
                    <mesh position={[0, 0.8, 0]}>
                      <boxGeometry args={[0.1, 0.02, 0.8]} />
                      <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.5} />
                    </mesh>
                    <mesh position={[0, 1.2, 0]}>
                      <boxGeometry args={[0.1, 0.02, 0.8]} />
                      <meshStandardMaterial color="#2a2a3a" metalness={0.3} roughness={0.5} />
                    </mesh>
                  </group>

                  {/* Plant in corner */}
                  <group position={[-level.w / 2 + 1, 0, level.d / 2 - 1.2]}>
                    <mesh position={[0, 0.2, 0]}>
                      <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
                      <meshStandardMaterial color="#3a2a1a" />
                    </mesh>
                    <mesh position={[0, 0.5, 0]}>
                      <sphereGeometry args={[0.25, 8, 8]} />
                      <primitive attach="material" object={plantColor} />
                    </mesh>
                  </group>
                </group>
              )}

              {/* Balcony rim */}
              <mesh position={[0, 2.3, 0]} scale={[level.w - 0.3, 0.25, level.d - 0.3]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#0a2540" metalness={0.8} roughness={0.25} />
              </mesh>

              {/* Balcony glow line */}
              <mesh position={[0, 2.45, 0]} scale={[level.w - 0.35, 0.03, level.d - 0.35]}>
                <boxGeometry args={[1, 1, 1]} />
                <primitive attach="material" object={cyanGlow} />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* Foundation/tapered base */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[3, 1.8, 3]} />
        <meshStandardMaterial color="#0a1525" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Base rim glow */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[3.2, 0.05, 3.2]} />
        <primitive attach="material" object={cyanGlow} />
      </mesh>
    </group>
  );
}
