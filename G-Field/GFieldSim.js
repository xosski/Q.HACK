// G-Field Visual Simulation Model
// Description: A conceptual React component visualizing how a G-field might behave
// as mass enters a black hole and stretches into waveform.

import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';

function GFieldWaves({ count = 100 }) {
    const particles = Array.from({ length: count }, (_, i) => i);

    return particles.map(i => {
        const scale = Math.random() * 0.5 + 0.3;
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        return (
            <mesh key={i} position={[x, y, z]}>
                <sphereGeometry args={[scale, 16, 16]} />
                <meshStandardMaterial color={`hsl(${i * 10}, 100%, 60%)`} emissive="white" emissiveIntensity={0.4} />
            </mesh>
        );
    });
}

function BlackHoleCenter() {
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial color="black" emissive="purple" emissiveIntensity={1.5} />
        </mesh>
    );
}

export default function GFieldVisual() {
    return (
        <div className="w-full h-screen bg-black">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <BlackHoleCenter />
                <GFieldWaves count={300} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
                <OrbitControls enableZoom={true} />
            </Canvas>
        </div>
    );
}

