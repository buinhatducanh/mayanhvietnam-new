'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import type { MotionValue } from 'framer-motion'
import { CameraModel } from '@/components/camera-model'

/**
 * Scroll choreography (p = 0..1 across the whole experience):
 *  Phase A (0.00-0.22): model floats inside the hero banner, offset right, small scale
 *  Phase B (0.22-0.50): model travels to center, grows, does a full 360° turn (specs appear)
 *  Phase C (0.50-0.72): model swings so the lens points left — "taking the shot" (flash fires ~0.66)
 *  Phase D (0.72-1.00): model drifts off right & shrinks while the 4K photo takes over
 */

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}

function ScrollRig({
  progress,
  bodyColor,
}: {
  progress: MotionValue<number>
  bodyColor: string
}) {
  const group = useRef<THREE.Group>(null)
  const time = useRef(0)
  const { size, viewport } = useThree()

  const isDesktop = size.width >= 768
  const initX = isDesktop ? Math.min(viewport.width * 0.22, 2.3) : 0
  const initY = isDesktop ? 0.15 : -1.05
  const initScale = isDesktop ? 0.72 : Math.min(viewport.width * 0.15, 0.6) * 0.72

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    time.current += delta
    const p = progress.get()

    const isDesktopCurrent = state.size.width >= 768

    // --- Phase interpolation weights ---
    const toCenter = smoothstep(0.22, 0.44, p) // A -> B travel
    const rotateToBack = smoothstep(0.22, 0.44, p) // rotate from 0.35 to Math.PI (specs view)
    const rotateToFront = smoothstep(0.44, 0.52, p) // rotate from Math.PI to 2*Math.PI (lens view)
    const zoom = smoothstep(0.52, 0.60, p) // zoom in to lens
    const fade = smoothstep(0.60, 0.63, p) // fade out/shrink as photo takes over

    // Responsive X Position
    const heroX = isDesktopCurrent ? Math.min(state.viewport.width * 0.22, 2.3) : 0
    const x = heroX * (1 - toCenter)

    // Responsive Y Position
    const heroY = isDesktopCurrent ? 0.15 : -1.05
    const centerY = isDesktopCurrent ? 0 : 0
    const y = heroY * (1 - toCenter) + centerY * toCenter + Math.sin(time.current * 1.2) * 0.05 * (1 - rotateToFront)
    const z = 0

    // Responsive Scale (scale down on mobile/tablet to prevent layout overflow)
    const baseScale = isDesktopCurrent ? 1.0 : Math.min(state.viewport.width * 0.15, 0.6)
    
    // Scale goes from hero scale -> specs scale -> giant zoom scale -> shrink to 0
    const scaleSpecs = baseScale * 0.72 * (1 - toCenter) + baseScale * 1.05 * toCenter
    const scaleZoom = scaleSpecs * (1 - zoom) + baseScale * 4.8 * zoom
    const s = scaleZoom * (1 - fade)

    // Rotation:
    // Y Rotation spins from 0.35 (angled front) -> Math.PI / 2 (straight back for specs) -> 1.5 * Math.PI (straight front for zoom)
    const idleSway = Math.sin(time.current * 0.6) * 0.12 * (1 - rotateToBack)
    const rotY = (0.35 + idleSway) * (1 - rotateToBack) + (Math.PI / 2) * rotateToBack * (1 - rotateToFront) + (1.5 * Math.PI) * rotateToFront
    
    // Smooth out X and Z rotation as we rotate to back/front
    const rotX = Math.sin(time.current * 0.8) * 0.03 * (1 - rotateToBack)
    const rotZ = 0

    // Apply coordinates directly to prevent scroll-lag timing issues
    g.position.x = x
    g.position.y = y
    g.position.z = z
    g.rotation.x = rotX
    g.rotation.y = rotY
    g.rotation.z = rotZ
    g.scale.setScalar(s)
  })

  return (
    <group ref={group} position={[initX, initY, 0]} scale={initScale} rotation={[0, 0.35, 0]}>
      <CameraModel bodyColor={bodyColor} lensSpec="" screenSpec="" showHotspots={false} />
    </group>
  )
}

export function ScrollScene({
  progress,
  bodyColor,
}: {
  progress: MotionValue<number>
  bodyColor: string
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: 'none' }}
      aria-hidden
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} />
      <directionalLight position={[-5, 3, -4]} intensity={0.55} color="#ffd9a0" />
      <spotLight position={[0, 7, 2]} intensity={0.7} angle={0.5} penumbra={1} />
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <ScrollRig progress={progress} bodyColor={bodyColor} />
      </Suspense>

      <ContactShadows position={[0, -1.7, 0]} opacity={0.4} scale={12} blur={2.6} far={3.2} resolution={512} />
    </Canvas>
  )
}
