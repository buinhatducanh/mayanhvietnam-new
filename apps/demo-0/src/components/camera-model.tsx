'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);

type CameraModelProps = {
  progress: MotionValue<number>;
  bodyColor: string;
};

export function CameraModel({ progress, bodyColor }: CameraModelProps) {
  const group = useRef<THREE.Group>(null);
  const bodyMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const targetColor = useMemo(() => new THREE.Color(bodyColor), [bodyColor]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    const p = progress.get();
    const t = state.clock.elapsedTime;

    const idle = 1 - smooth(range(p, 0.04, 0.24));
    const move = smooth(range(p, 0.05, 0.3));
    const spin = smooth(range(p, 0.3, 0.52)) * Math.PI * 2;
    const zoomBump = Math.sin(Math.PI * range(p, 0.5, 0.6));
    const fade = 1 - smooth(range(p, 0.62, 0.78));

    const isDesktop = state.size.width >= 768;
    const heroX = isDesktop ? Math.min(state.viewport.width * 0.2, 2.4) : 0;
    g.position.x = THREE.MathUtils.lerp(heroX, 0, move);
    const heroY = isDesktop ? -0.1 : 1.15;
    g.position.y = Math.sin(t * 1.1) * 0.07 * idle + THREE.MathUtils.lerp(heroY, 0.05, move);

    g.rotation.y = Math.sin(t * 0.45) * 0.55 * idle + spin;
    g.rotation.x = Math.sin(t * 0.6) * 0.05 * idle;

    const scale =
      THREE.MathUtils.lerp(isDesktop ? 0.68 : 0.5, isDesktop ? 1.05 : 0.72, move) *
      (1 + zoomBump * 0.28) *
      THREE.MathUtils.lerp(0.55, 1, fade);
    g.scale.setScalar(scale);
    g.visible = fade > 0.01;

    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.color.lerp(targetColor, 0.08);
    }

    g.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mat = obj.material as THREE.Material;
        if ('opacity' in mat) {
          (mat as THREE.MeshStandardMaterial).opacity = fade;
        }
      }
    });
  });

  return (
    <group ref={group} position={[2.35, -0.1, 0]}>
      {/* ============ BODY ============ */}
      <RoundedBox args={[2.35, 1.45, 0.85]} radius={0.09} smoothness={4}>
        <meshStandardMaterial
          ref={bodyMaterialRef}
          color={bodyColor}
          roughness={0.55}
          metalness={0.35}
          transparent
        />
      </RoundedBox>

      {/* Grip */}
      <RoundedBox args={[0.52, 1.38, 0.98]} radius={0.12} smoothness={4} position={[-1.02, -0.02, 0.04]}>
        <meshStandardMaterial color="#141414" roughness={0.85} metalness={0.15} transparent />
      </RoundedBox>

      {/* Top plate */}
      <RoundedBox args={[2.3, 0.16, 0.78]} radius={0.05} smoothness={4} position={[0, 0.78, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} transparent />
      </RoundedBox>

      {/* Viewfinder hump */}
      <RoundedBox args={[0.72, 0.32, 0.55]} radius={0.07} smoothness={4} position={[0.05, 0.92, -0.05]}>
        <meshStandardMaterial color="#181818" roughness={0.6} metalness={0.4} transparent />
      </RoundedBox>

      {/* Rear screen */}
      <RoundedBox args={[1.5, 1.0, 0.05]} radius={0.03} smoothness={3} position={[0.15, -0.05, -0.44]}>
        <meshStandardMaterial color="#060a10" roughness={0.15} metalness={0.7} transparent />
      </RoundedBox>

      {/* ============ LENS ============ */}
      {/* Lens mount */}
      <mesh position={[0, 0, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.64, 0.64, 0.12, 48]} />
        <meshStandardMaterial color="#b8b8b8" roughness={0.25} metalness={0.9} transparent />
      </mesh>

      {/* Lens barrel */}
      <mesh position={[0, 0, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.58, 0.9, 48]} />
        <meshStandardMaterial color="#101010" roughness={0.5} metalness={0.5} transparent />
      </mesh>

      {/* Focus ring */}
      <mesh position={[0, 0, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.585, 0.585, 0.16, 48]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.9} metalness={0.3} transparent />
      </mesh>

      {/* Zoom ring */}
      <mesh position={[0, 0, 1.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.59, 0.59, 0.22, 48]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.9} metalness={0.3} transparent />
      </mesh>

      {/* Red accent ring */}
      <mesh position={[0, 0, 1.32]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.565, 0.018, 16, 64]} />
        <meshStandardMaterial color="#c0392b" roughness={0.35} metalness={0.6} transparent />
      </mesh>

      {/* Front glass */}
      <mesh position={[0, 0, 1.41]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.06, 48]} />
        <meshPhysicalMaterial
          color="#0a1a2f"
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
          transparent
        />
      </mesh>

      {/* Inner glass */}
      <mesh position={[0, 0, 1.445]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.03, 48]} />
        <meshPhysicalMaterial
          color="#122b4d"
          roughness={0.02}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={3}
          transparent
        />
      </mesh>

      {/* ============ TOP CONTROLS ============ */}
      {/* Shutter button */}
      <mesh position={[-0.88, 0.92, 0.18]}>
        <cylinderGeometry args={[0.1, 0.1, 0.09, 32]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.15} metalness={0.95} transparent />
      </mesh>
      <mesh position={[-0.88, 0.97, 0.18]}>
        <cylinderGeometry args={[0.055, 0.055, 0.05, 32]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.1} metalness={0.95} transparent />
      </mesh>

      {/* Mode dial */}
      <mesh position={[0.78, 0.92, -0.08]}>
        <cylinderGeometry args={[0.24, 0.24, 0.14, 32]} />
        <meshStandardMaterial color="#161616" roughness={0.8} metalness={0.4} transparent />
      </mesh>
      <mesh position={[0.78, 1.0, -0.08]}>
        <torusGeometry args={[0.2, 0.02, 12, 48]} />
        <meshStandardMaterial color="#c8c8c8" roughness={0.2} metalness={0.9} transparent />
      </mesh>

      {/* Flash unit */}
      <RoundedBox args={[0.48, 0.12, 0.4]} radius={0.03} smoothness={3} position={[0.42, 0.9, 0.14]}>
        <meshStandardMaterial color="#c4c4c4" roughness={0.25} metalness={0.9} transparent />
      </RoundedBox>

      {/* Hot shoe */}
      <RoundedBox args={[0.3, 0.06, 0.32]} radius={0.02} smoothness={3} position={[0.05, 1.11, -0.05]}>
        <meshStandardMaterial color="#9a9a9a" roughness={0.3} metalness={0.9} transparent />
      </RoundedBox>
    </group>
  );
}
