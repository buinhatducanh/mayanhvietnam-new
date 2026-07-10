'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

type CameraModelProps = {
  bodyColor: string
  lensSpec: string
  screenSpec: string
  showHotspots?: boolean
}

function Hotspot({
  position,
  label,
  info,
}: {
  position: [number, number, number]
  label: string
  info: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Html position={position} center distanceFactor={6} zIndexRange={[10, 0]}>
      <div className="relative flex flex-col items-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={label}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background/80 backdrop-blur transition-transform hover:scale-110"
        >
          <span className="block h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
        </button>
        {open && (
          <div className="absolute top-10 z-10 w-56 rounded-lg border border-border bg-popover/95 p-3 text-popover-foreground shadow-xl backdrop-blur">
            <p className="mb-1 text-xs font-semibold text-primary">{label}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{info}</p>
          </div>
        )}
      </div>
    </Html>
  )
}

export function CameraModel({ bodyColor, lensSpec, screenSpec, showHotspots = true }: CameraModelProps) {
  const { scene } = useGLTF('/canon-eos-r50.glb')
  
  // Cache materials that have color property to avoid recursive traverse in useFrame
  const { clone, materials } = useMemo(() => {
    const cloned = scene.clone()
    const colorMaterials: THREE.MeshStandardMaterial[] = []
    
    cloned.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true
        node.receiveShadow = true
        
        if (node.material) {
          const mat = node.material.clone() as THREE.MeshStandardMaterial
          node.material = mat
          if ('color' in mat) {
            colorMaterials.push(mat)
          }
        }
      }
    })
    return { clone: cloned, materials: colorMaterials }
  }, [scene])

  const targetColor = useRef(new THREE.Color(bodyColor))
  targetColor.current.set(bodyColor)

  useFrame((_, delta) => {
    const t = Math.min(delta * 6, 1)
    // High-performance flat array loop instead of recursive traversal
    for (let i = 0; i < materials.length; i++) {
      const mat = materials[i]
      const diff = Math.abs(mat.color.r - targetColor.current.r) +
                   Math.abs(mat.color.g - targetColor.current.g) +
                   Math.abs(mat.color.b - targetColor.current.b)
      if (diff > 0.001) {
        mat.color.lerp(targetColor.current, t)
      }
    }
  })

  return (
    <group>
      {/* Center the 3D model and scale it to fit the original bounding box */}
      <Center>
        <primitive object={clone} scale={4.5} rotation={[0, Math.PI, 0]} />
      </Center>

      {/* ===== Hotspots (aligned to the centered model) ===== */}
      {showHotspots && (
        <>
          <Hotspot position={[0, 0, 1.4]} label="Ống kính & Cảm biến" info={lensSpec} />
          <Hotspot position={[0, 0, -1.2]} label="Màn hình LCD xoay lật" info={screenSpec} />
        </>
      )}
    </group>
  )
}

useGLTF.preload('/canon-eos-r50.glb')

