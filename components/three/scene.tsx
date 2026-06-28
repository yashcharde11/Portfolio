"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-store";

/** A drifting starfield that spans the whole page behind the content. */
function Starfield({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread points through a wide, deep volume.
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    // Parallax the field downward as the user scrolls the page.
    ref.current.position.y = scrollState.progress * 6;
    // Subtle drift toward the pointer for depth.
    ref.current.rotation.x = state.pointer.y * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#a78bfa"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** The cinematic centerpiece: a slowly morphing, neon-lit orb. */
function Orb() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group.current) {
      // Ease the orb toward the pointer for an interactive, alive feel.
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        state.pointer.x * 0.6,
        0.04
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -state.pointer.y * 0.4,
        0.04
      );
    }
    if (mesh.current) {
      // Drift up and shrink slightly as the page scrolls away from the hero.
      mesh.current.position.y = scrollState.progress * 3.2;
      const s = 1 - scrollState.progress * 0.25;
      mesh.current.scale.setScalar(Math.max(0.6, s));
    }
  });

  return (
    <group ref={group} position={[1.7, 0.2, 0]}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.5, 12]} />
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#4c1d95"
            emissiveIntensity={0.5}
            roughness={0.18}
            metalness={0.65}
            distort={0.42}
            speed={1.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Full-page fixed WebGL backdrop. Pointer-events are disabled so it never
 * intercepts clicks; it lives behind all DOM content.
 */
export default function Scene() {
  return (
    <Canvas
      className="!pointer-events-none"
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      {/* bold rim lighting in the brand violet→cyan range */}
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 6]} intensity={120} color="#8b5cf6" />
      <pointLight position={[-6, -2, 2]} intensity={90} color="#22d3ee" />
      <pointLight position={[0, 5, -4]} intensity={70} color="#ec4899" />

      <Starfield />
      <Orb />
    </Canvas>
  );
}
