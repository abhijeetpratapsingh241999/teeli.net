"use client";

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A single animated line
interface SparkleLineProps {
    start: THREE.Vector3;
    end: THREE.Vector3;
    color: string;
    speed: number;
}

function SparkleLine({ start, end, color, speed }: SparkleLineProps) {
    const ref = useRef<THREE.Mesh>(null);
    const vec = useMemo(() => new THREE.Vector3().subVectors(end, start), [start, end]);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            const progress = (t * speed) % 1;
            const currentPos = new THREE.Vector3().copy(start).add(vec.clone().multiplyScalar(progress));
            ref.current.position.copy(currentPos);
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
    );
}


// Component to create a network of lines
export default function NeuralLines({ count = 50 }) {
    const lines = useMemo(() => {
        const points = Array.from({ length: count }, () => 
            new THREE.Vector3(
                (Math.random() - 0.5) * 20, 
                (Math.random() - 0.5) * 20, 
                (Math.random() - 0.5) * 20
            )
        );

        const connections = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                if (Math.random() > 0.95) { // Randomly connect some points
                    connections.push({
                        start: points[i],
                        end: points[j],
                        color: Math.random() > 0.5 ? '#8A2BE2' : '#4285F4',
                        speed: Math.random() * 0.1 + 0.05,
                    });
                }
            }
        }
        return connections;
    }, [count]);

    return (
        <group>
            {lines.map((line, i) => (
                <SparkleLine key={i} {...line} />
            ))}
        </group>
    );
}

