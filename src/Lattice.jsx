import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ---- Lattice geometry: nodes arranged in a loose 3D grid with jitter, ----
// ---- edges connecting nearby nodes so it reads as a mesh network. -------

function buildLattice(count = 46, radius = 5.6) {
  const nodes = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const jitter = 0.34
    nodes.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius + (Math.random() - 0.5) * jitter,
        y * radius * 0.72 + (Math.random() - 0.5) * jitter,
        Math.sin(theta) * r * radius + (Math.random() - 0.5) * jitter
      )
    )
  }
  const edges = []
  const maxDist = radius * 0.62
  for (let i = 0; i < nodes.length; i++) {
    const dists = []
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      dists.push([j, nodes[i].distanceTo(nodes[j])])
    }
    dists.sort((a, b) => a[1] - b[1])
    let linked = 0
    for (const [j, d] of dists) {
      if (linked >= 3) break
      if (d > maxDist) continue
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!edges.find((e) => e.key === key)) {
        edges.push({ key, a: i, b: j, len: d })
      }
      linked++
    }
  }
  return { nodes, edges }
}

function Nodes({ nodes }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const phases = useMemo(() => nodes.map(() => Math.random() * Math.PI * 2), [nodes])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    nodes.forEach((pos, i) => {
      const pulse = 0.65 + Math.sin(t * 1.1 + phases[i]) * 0.35
      dummy.position.copy(pos)
      const s = 0.052 * pulse
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, nodes.length]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial color="#8ff2e3" />
    </instancedMesh>
  )
}

function EdgeLines({ nodes, edges }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6)
    edges.forEach((e, i) => {
      const a = nodes[e.a]
      const b = nodes[e.b]
      positions[i * 6] = a.x
      positions[i * 6 + 1] = a.y
      positions[i * 6 + 2] = a.z
      positions[i * 6 + 3] = b.x
      positions[i * 6 + 4] = b.y
      positions[i * 6 + 5] = b.z
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [nodes, edges])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#3a4550" transparent opacity={0.45} />
    </lineSegments>
  )
}

// Traveling light pulses along random edges — literal packets on the wire.
function Pulses({ nodes, edges, count = 9 }) {
  const groupRef = useRef()
  const runners = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const edge = edges[Math.floor(Math.random() * edges.length)]
        return {
          edge,
          t: Math.random(),
          speed: 0.18 + Math.random() * 0.22,
        }
      }),
    [edges, count]
  )
  const refs = useRef([])

  useFrame((_, delta) => {
    runners.forEach((r, i) => {
      r.t += delta * r.speed
      if (r.t >= 1) {
        r.t = 0
        r.edge = edges[Math.floor(Math.random() * edges.length)]
      }
      const a = nodes[r.edge.a]
      const b = nodes[r.edge.b]
      const mesh = refs.current[i]
      if (mesh) {
        mesh.position.lerpVectors(a, b, r.t)
        const flicker = 0.7 + Math.sin(r.t * Math.PI) * 0.6
        mesh.scale.setScalar(0.075 * flicker)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {runners.map((_, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#5eead4" />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  const { nodes, edges } = useMemo(() => buildLattice(), [])
  const groupRef = useRef()
  const { viewport } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    target.current.x += (pointer.x * 0.35 - target.current.x) * 0.02
    target.current.y += (pointer.y * 0.22 - target.current.y) * 0.02
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.045 + target.current.x
      groupRef.current.rotation.x = target.current.y * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      <EdgeLines nodes={nodes} edges={edges} />
      <Nodes nodes={nodes} />
      <Pulses nodes={nodes} edges={edges} />
    </group>
  )
}

export default function Lattice({ className }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 11.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
