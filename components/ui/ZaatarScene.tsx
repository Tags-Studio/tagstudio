"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere, Stars } from "@react-three/drei"
import * as THREE from "three"

// ── Floating Sesame Seeds ──────────────────────────────────────────
function SesameSeed({
  position,
  speed,
  scale,
}: {
  position: [number, number, number]
  speed: number
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const initialY = position[1]

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    meshRef.current.position.y = initialY + Math.sin(t) * 0.3
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.z += 0.003
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {/* Ellipsoid shape (sesame seed) */}
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#d39b51"
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  )
}

// ── Central Glowing Orb ───────────────────────────────────────────
function GlowOrb() {
  const orbRef = useRef<THREE.Mesh>(null!)
  const { viewport, mouse } = useThree()

  useFrame((state) => {
    // Slow auto-rotation
    orbRef.current.rotation.y += 0.003
    orbRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1

    // Subtle parallax with mouse
    orbRef.current.position.x = THREE.MathUtils.lerp(
      orbRef.current.position.x,
      (mouse.x * viewport.width) / 10,
      0.05
    )
    orbRef.current.position.y = THREE.MathUtils.lerp(
      orbRef.current.position.y,
      (mouse.y * viewport.height) / 10,
      0.05
    )
  })

  return (
    <Sphere ref={orbRef} args={[1.4, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#a8b51d"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.4}
        opacity={0.85}
        transparent
      />
    </Sphere>
  )
}

// ── Particle Ring ──────────────────────────────────────────────────
function ParticleRing() {
  const pointsRef = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const count = 120
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2.5 + Math.random() * 0.8
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return positions
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a8b51d"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  )
}

// ── Seeds Cluster ─────────────────────────────────────────────────
function SeedsCluster() {
  const seeds = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2 - 1,
        ] as [number, number, number],
        speed: 0.3 + Math.random() * 0.5,
        scale: 0.06 + Math.random() * 0.08,
      })),
    []
  )

  return (
    <>
      {seeds.map((seed, i) => (
        <SesameSeed key={i} {...seed} />
      ))}
    </>
  )
}

// ── Main Scene ─────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 3, 3]} intensity={0.8} color="#d39b51" />
      <pointLight position={[3, -3, -3]} intensity={0.5} color="#a8b51d" />

      <GlowOrb />
      <ParticleRing />
      <SeedsCluster />
      <Stars
        radius={15}
        depth={5}
        count={300}
        factor={0.5}
        saturation={0}
        fade
        speed={0.3}
      />
    </>
  )
}

// ── Exported Canvas Wrapper ─────────────────────────────────────────
export default function ZaatarScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  )
}
