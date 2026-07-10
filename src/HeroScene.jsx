import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const NODE_COUNT = 42

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function Network() {
  const group = useRef(null)
  const core = useRef(null)
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const { nodePositions, connectionPositions } = useMemo(() => {
    const nodes = []

    for (let index = 0; index < NODE_COUNT; index += 1) {
      const radius = 1.9 + seededRandom(index + 1) * 1.65
      const theta = seededRandom(index + 10) * Math.PI * 2
      const phi = Math.acos(2 * seededRandom(index + 30) - 1)

      nodes.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi) * 0.78,
          radius * Math.sin(phi) * Math.sin(theta),
        ),
      )
    }

    const nodeBuffer = new Float32Array(nodes.length * 3)
    nodes.forEach((node, index) => node.toArray(nodeBuffer, index * 3))

    const connections = []
    for (let first = 0; first < nodes.length; first += 1) {
      for (let second = first + 1; second < nodes.length; second += 1) {
        const distance = nodes[first].distanceTo(nodes[second])
        if (distance < 1.7 && connections.length < 320) {
          connections.push(...nodes[first].toArray(), ...nodes[second].toArray())
        }
      }
    }

    return {
      nodePositions: nodeBuffer,
      connectionPositions: new Float32Array(connections),
    }
  }, [])

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || !core.current) return

    const targetX = reducedMotion ? 0.08 : pointer.y * 0.16
    const targetY = reducedMotion ? -0.15 : pointer.x * 0.28

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.035)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.035)

    if (!reducedMotion) {
      group.current.rotation.y += delta * 0.08
      core.current.rotation.x = clock.elapsedTime * 0.14
      core.current.rotation.y = clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={group} rotation={[0.08, -0.15, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connectionPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#22d58f" transparent opacity={0.19} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#d7fff0"
          size={0.065}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshStandardMaterial
            color="#22d58f"
            emissive="#0b5f42"
            emissiveIntensity={1.2}
            metalness={0.28}
            roughness={0.28}
            wireframe
          />
        </mesh>
        <mesh scale={0.73}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#0f2119"
            emissive="#22d58f"
            emissiveIntensity={0.3}
            metalness={0.15}
            roughness={0.5}
          />
        </mesh>
      </group>

      <mesh rotation={[Math.PI / 2.45, 0.2, 0]}>
        <torusGeometry args={[1.62, 0.012, 8, 180]} />
        <meshBasicMaterial color="#22d58f" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[0.5, Math.PI / 2.2, -0.35]}>
        <torusGeometry args={[2.32, 0.008, 8, 200]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 47 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 4, 5]} color="#d9fff0" intensity={18} distance={14} />
      <pointLight position={[-4, -2, 2]} color="#22d58f" intensity={14} distance={12} />
      <Network />
    </Canvas>
  )
}
