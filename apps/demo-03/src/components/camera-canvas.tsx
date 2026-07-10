'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { Camera, Focus, MonitorSmartphone, ArrowUpFromLine, RotateCw } from 'lucide-react'
import { CameraModel } from './camera-model'

type AnglePreset = {
  id: string
  label: string
  icon: React.ReactNode
  position: [number, number, number]
}

const ANGLE_PRESETS: AnglePreset[] = [
  { id: 'front', label: 'Góc chính diện', icon: <Camera className="h-4 w-4" />, position: [0, 0, 5] },
  { id: 'lens', label: 'Cận cảnh Ống kính', icon: <Focus className="h-4 w-4" />, position: [0, 0, 2.5] },
  { id: 'back', label: 'Góc mặt sau', icon: <MonitorSmartphone className="h-4 w-4" />, position: [0, 0, -5] },
  { id: 'top', label: 'Góc từ trên xuống', icon: <ArrowUpFromLine className="h-4 w-4" />, position: [0, 5, 1] },
]

function CameraRig({
  target,
  onArrived,
}: {
  target: [number, number, number] | null
  onArrived: () => void
}) {
  const { camera } = useThree()
  const targetVec = useRef(new THREE.Vector3())

  useFrame(() => {
    if (!target) return
    targetVec.current.set(...target)
    camera.position.lerp(targetVec.current, 0.08)
    camera.lookAt(0, 0, 0)
    if (camera.position.distanceTo(targetVec.current) < 0.05) {
      camera.position.copy(targetVec.current)
      onArrived()
    }
  })

  return null
}

type CameraCanvasProps = {
  bodyColor: string
  lensSpec: string
  screenSpec: string
}

export function CameraCanvas({ bodyColor, lensSpec, screenSpec }: CameraCanvasProps) {
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | null>(null)
  const [activePreset, setActivePreset] = useState<string>('front')
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotateSpeed, setRotateSpeed] = useState(1.5)
  const controlsRef = useRef<OrbitControlsImpl>(null)

  const goToPreset = (preset: AnglePreset) => {
    setActivePreset(preset.id)
    setCameraTarget(preset.position)
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-border bg-card">
        <Canvas shadows camera={{ position: [0, 0.5, 5], fov: 45 }} dpr={[1, 2]}>
          <color attach="background" args={['#101013']} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 6, 4]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#ffd9a0" />
          <spotLight position={[0, 6, 0]} intensity={0.6} angle={0.5} penumbra={1} />
          <Environment preset="studio" />

          <Suspense fallback={null}>
            <CameraModel bodyColor={bodyColor} lensSpec={lensSpec} screenSpec={screenSpec} />
          </Suspense>

          <ContactShadows position={[0, -1.6, 0]} opacity={0.55} scale={10} blur={2.4} far={3} resolution={512} />

          <CameraRig target={cameraTarget} onArrived={() => setCameraTarget(null)} />

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.9}
            autoRotate={autoRotate && !cameraTarget}
            autoRotateSpeed={rotateSpeed}
          />
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          Kéo để xoay · Cuộn để phóng to
        </div>
      </div>

      {/* Angle presets */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ANGLE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => goToPreset(preset)}
            className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium transition-all ${
              activePreset === preset.id
                ? 'border-primary/60 bg-primary/10 text-primary glow-amber'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {preset.icon}
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Auto-rotate controls */}
      <div className="mt-3 flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3">
        <button
          type="button"
          onClick={() => setAutoRotate((v) => !v)}
          aria-pressed={autoRotate}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            autoRotate ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground'
          }`}
        >
          <RotateCw className={`h-3.5 w-3.5 ${autoRotate ? 'animate-spin [animation-duration:3s]' : ''}`} />
          Tự động xoay
        </button>
        <div className="flex flex-1 items-center gap-3">
          <span className="text-xs text-muted-foreground">Tốc độ</span>
          <input
            type="range"
            min={0.5}
            max={5}
            step={0.5}
            value={rotateSpeed}
            onChange={(e) => setRotateSpeed(Number(e.target.value))}
            disabled={!autoRotate}
            aria-label="Tốc độ tự động xoay"
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-secondary accent-[oklch(0.769_0.188_70.08)] disabled:opacity-40"
          />
        </div>
      </div>
    </div>
  )
}
