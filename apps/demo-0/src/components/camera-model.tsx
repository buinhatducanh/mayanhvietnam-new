'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);

type CameraModelProps = {
  progress: MotionValue<number>;
  bodyColor: string;
};

// Pre-load the GLB drone model to avoid load stutters
useGLTF.preload('/models/drone.glb');

export function CameraModel({ progress, bodyColor }: CameraModelProps) {
  const group = useRef<THREE.Group>(null);
  
  // Load the GLB file copied from D:\MAYANHVIETNAM\MODELS 3D\quadrotor drone 3d model.glb
  const { scene } = useGLTF('/models/drone.glb');

  // Clone the scene and automatically scale/center it inside a 2.5 unit box
  const clone = useMemo(() => {
    const c = scene.clone();

    // Reset rotation/scale of cloned instance
    c.position.set(0, 0, 0);
    c.rotation.set(0, -Math.PI / 2, 0); // Rotate model 90 degrees to face the camera/screen directly
    c.scale.set(1, 1, 1);

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(c);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Target size fits the demo UI perfectly
    const targetScale = 2.4 / maxDim;
    c.scale.setScalar(targetScale);

    // Center it relative to original coordinate system
    const center = new THREE.Vector3();
    box.getCenter(center);
    c.position.sub(center.multiplyScalar(targetScale));

    return c;
  }, [scene]);

  const targetColor = useMemo(() => new THREE.Color(bodyColor), [bodyColor]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    const p = progress.get();
    const t = state.clock.elapsedTime;

    // Apply scroll-driven interactive phases matching original scroll-experience.tsx
    const idle = 1 - smooth(range(p, 0.04, 0.24));
    const move = smooth(range(p, 0.05, 0.3));
    const spin = smooth(range(p, 0.3, 0.52)) * Math.PI * 2;
    const zoomBump = Math.sin(Math.PI * range(p, 0.5, 0.6));
    const fade = 1 - smooth(range(p, 0.62, 0.78));

    const isDesktop = state.size.width >= 768;
    const heroX = isDesktop ? Math.min(state.viewport.width * 0.2, 2.4) : 0;
    g.position.x = THREE.MathUtils.lerp(heroX, 0, move);
    
    // Elevate the drone model slightly higher and add a smooth vertical hover animation
    const hoverOffset = Math.sin(t * 1.5) * 0.12 * idle;
    const heroY = isDesktop ? 0.1 : 1.35;
    g.position.y = hoverOffset + THREE.MathUtils.lerp(heroY, 0.2, move);

    // Dynamic rotation: spin scroll triggers full rotation, idle adds light rocking
    g.rotation.y = Math.sin(t * 0.6) * 0.3 * idle + spin;
    g.rotation.x = Math.sin(t * 0.8) * 0.08 * idle;
    g.rotation.z = Math.sin(t * 0.5) * 0.05 * idle; // Rocking roll motion for realistic flight feel

    // Animate propellers/rotors if present in the GLB structure
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && 
         (child.name.toLowerCase().includes('propeller') || 
          child.name.toLowerCase().includes('rotor') || 
          child.name.toLowerCase().includes('blade') ||
          child.name.toLowerCase().includes('fan'))) {
        child.rotation.y += 0.4;
      }
    });

    const scale =
      THREE.MathUtils.lerp(isDesktop ? 0.75 : 0.55, isDesktop ? 1.15 : 0.8, move) *
      (1 + zoomBump * 0.25) *
      THREE.MathUtils.lerp(0.55, 1, fade);
    g.scale.setScalar(scale);
    g.visible = fade > 0.01;

    // Traverse and blend picked color into primary mesh materials dynamically
    clone.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mat = obj.material as THREE.MeshStandardMaterial;
        
        // Dynamically fade out objects based on phase
        if (mat && 'opacity' in mat) {
          mat.transparent = true;
          mat.opacity = fade;
        }

        // Apply selected picker color to matching colored parts
        const name = obj.name.toLowerCase();
        if (name.includes('body') || name.includes('paint') || name.includes('frame') || name.includes('canopy')) {
          if (mat && 'color' in mat) {
            mat.color.lerp(targetColor, 0.08);
          }
        }
      }
    });
  });

  return (
    <group ref={group} position={[2.35, 0.1, 0]}>
      <primitive object={clone} />
    </group>
  );
}
