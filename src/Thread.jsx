import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ThreadScene({ seed = 0 }) {
  const points = useMemo(() => {
    const pts = []
    const n = 7
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      pts.push(
        new THREE.Vector3(
          Math.sin(t * 4 + seed) * 1.1,
          (t - 0.5) * 6,
          Math.cos(t * 3 + seed) * 1.1
        )
      )
    }
    return pts
  }, [seed])

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.008, 6, false), [curve])
  const pulseRef = useRef()

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.15 + seed) % 1
    if (pulseRef.current) {
      const p = curve.getPointAt(t)
      pulseRef.current.position.copy(p)
    }
  })

  return (
    <group rotation={[0, 0, 0.15]}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#2a3138" transparent opacity={0.55} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#5eead4" />
      </mesh>
    </group>
  )
}

export default function Thread({ seed = 0, className }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ThreadScene seed={seed} />
    </Canvas>
  )
}
