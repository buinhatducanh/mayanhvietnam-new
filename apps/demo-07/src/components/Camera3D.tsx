'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Keyframe {
  progress: number;
  rotY: number;
  rotX: number;
  posX: number;
  posY: number;
  posZ: number;
  camZ: number;
  camY: number;
}

const keyframes: Keyframe[] = [
  { progress: 0.0, rotY: 0, rotX: 0, posX: 0, posY: 0.1, posZ: 0, camZ: 1.15, camY: 0.1 },
  { progress: 0.2, rotY: 0, rotX: 0, posX: 0, posY: 0, posZ: 0, camZ: 5.0, camY: 0 },
  { progress: 0.4, rotY: 1.2, rotX: 0.1, posX: -1.8, posY: 0, posZ: 0, camZ: 5.0, camY: 0 },
  { progress: 0.6, rotY: 2.0, rotX: 0.1, posX: 1.8, posY: 0, posZ: 0, camZ: 5.0, camY: 0 },
  { progress: 0.8, rotY: Math.PI, rotX: 0.0, posX: 0, posY: 0, posZ: 0, camZ: 5.0, camY: 0 },
  { progress: 1.0, rotY: Math.PI, rotX: 0.0, posX: 0, posY: 0, posZ: 6.5, camZ: 5.0, camY: 0 }
];

export default function Camera3D({ scrollProgress }: { scrollProgress: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // === Scene Setup ===
    const scene = new THREE.Scene();
    scene.background = null; // transparent

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // === Lighting ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f1fb, 0.4);
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x0074d9, 0.3);
    rimLight.position.set(0, -3, -5);
    scene.add(rimLight);

    const group = new THREE.Group();
    scene.add(group);

    // === 3D Screen Image (simulating the LCD display) ===
    const textureLoader = new THREE.TextureLoader();
    // Use a high-quality 4k landscape/studio image
    const screenTexture = textureLoader.load('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070');
    const screenGeo = new THREE.PlaneGeometry(1.6, 1.0);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture, side: THREE.DoubleSide });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    
    // Position it slightly on the back of the camera model (Z > 0 because model faces Z < 0)
    // We will align this based on standard camera geometry
    screenMesh.position.set(0, 0.1, 0.72);
    // Rotate to face backwards
    screenMesh.rotation.y = Math.PI;
    group.add(screenMesh);

    // === Load 3D Model ===
    const loader = new GLTFLoader();
    loader.load(
      '/models/mirrorless camera 3d model.glb',
      (gltf) => {
        const model = gltf.scene;

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.sub(center);

        // Scale it so it fits nicely
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.5 / maxDim;
        model.scale.set(scale, scale, scale);

        // Adjust materials and shadows
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            if (child.material) {
              child.material.needsUpdate = true;
            }
          }
        });

        // Add model behind screen mesh
        group.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading the 3D model:', error);
      }
    );

    // === Initial transform ===
    group.rotation.y = 0;
    group.rotation.x = 0;

    // === Render loop ===
    let animId: number;
    let time = 0;

    // Active state values for smoothing
    let currentRotY = 0;
    let currentRotX = 0;
    let currentPosX = 0;
    let currentPosY = 0.1;
    let currentPosZ = 0;
    let currentCamZ = 1.15;
    let currentCamY = 0.1;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.005;

      const p = Math.max(0, Math.min(1, scrollProgressRef.current));

      // Keyframe interpolation
      let i = 0;
      for (; i < keyframes.length - 1; i++) {
        if (p >= keyframes[i].progress && p <= keyframes[i + 1].progress) {
          break;
        }
      }
      // Safety clamp to prevent out of bounds when p is at boundaries
      if (i >= keyframes.length - 1) {
        i = keyframes.length - 2;
      }
      const k1 = keyframes[i];
      const k2 = keyframes[i + 1];
      const factor = (p - k1.progress) / (k2.progress - k1.progress);

      const targetRotY = THREE.MathUtils.lerp(k1.rotY, k2.rotY, factor);
      const targetRotX = THREE.MathUtils.lerp(k1.rotX, k2.rotX, factor);
      const targetPosX = THREE.MathUtils.lerp(k1.posX, k2.posX, factor);
      const targetPosY = THREE.MathUtils.lerp(k1.posY, k2.posY, factor);
      const targetPosZ = THREE.MathUtils.lerp(k1.posZ, k2.posZ, factor);
      const targetCamZ = THREE.MathUtils.lerp(k1.camZ, k2.camZ, factor);
      const targetCamY = THREE.MathUtils.lerp(k1.camY, k2.camY, factor);

      // Smooth lerp
      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentPosX += (targetPosX - currentPosX) * 0.08;
      currentPosY += (targetPosY - currentPosY) * 0.08;
      currentPosZ += (targetPosZ - currentPosZ) * 0.08;
      currentCamZ += (targetCamZ - currentCamZ) * 0.08;
      currentCamY += (targetCamY - currentCamY) * 0.08;

      // Apply transforms
      group.rotation.y = currentRotY;
      group.rotation.x = currentRotX;
      group.position.set(currentPosX, currentPosY, currentPosZ);
      camera.position.set(0, currentCamY, currentCamZ);

      // Subtle idle animation (only active when not in transitions/zoomed in)
      if (p > 0.15 && p < 0.85) {
        group.position.y += Math.sin(time * 0.8) * 0.04;
      }

      renderer.render(scene, camera);
    };
    animate();

    // === Resize ===
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', cursor: 'grab' }}
      aria-label="Mô hình 3D máy ảnh kỹ thuật số"
    />
  );
}

