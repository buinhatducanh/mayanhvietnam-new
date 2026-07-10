'use client';

import { useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { CameraModel } from './camera-model';

type CameraCanvasProps = {
  progress: MotionValue<number>;
  bodyColor: string;
};

export default function CameraCanvas({ progress, bodyColor }: CameraCanvasProps) {
  const [canvasKey, setCanvasKey] = useState(0);

  const handleCreated = useCallback((state: { gl: { domElement: HTMLCanvasElement } }) => {
    const el = state.gl.domElement;
    el.addEventListener(
      'webglcontextlost',
      (e) => {
        e.preventDefault();
        console.log('[v0] WebGL context lost — remounting canvas');
        setTimeout(() => setCanvasKey((k) => k + 1), 300);
      },
      { once: true },
    );
  }, []);

  return (
    <Canvas
      key={canvasKey}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.35, 6.2], fov: 42 }}
      dpr={1}
      onCreated={handleCreated}
      className="pointer-events-none"
      aria-hidden
    >
      <ambientLight intensity={0.45} />
      <spotLight
        position={[4, 6, 6]}
        angle={0.4}
        penumbra={0.9}
        intensity={90}
        color="#fff3e0"
      />
      <spotLight
        position={[-5, 3, 3]}
        angle={0.5}
        penumbra={1}
        intensity={40}
        color="#9db8e8"
      />
      <pointLight position={[0, -3, 2]} intensity={5} color="#ffb37a" />
      <directionalLight position={[0, 2, 5]} intensity={0.6} color="#ffffff" />
      <CameraModel progress={progress} bodyColor={bodyColor} />
    </Canvas>
  );
}
