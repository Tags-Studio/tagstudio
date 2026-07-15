"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
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
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed
    meshRef.current.position.y = initialY + Math.sin(t) * 0.3
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.z += 0.003
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#d39b51"
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  )
}

// ── Central Glowing Orb (replaces drei MeshDistortMaterial) ───────
function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const matRef = useRef<THREE.MeshStandardMaterial>(null!)
  const { viewport, pointer } = useThree()

  // Inject vertex distortion into the standard material shader
  useEffect(() => {
    if (!matRef.current) return
    matRef.current.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 }
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        /* glsl */ `
        #include <begin_vertex>
        float noise = sin(position.x * 3.0 + uTime) * cos(position.y * 3.0 + uTime * 0.7) * sin(position.z * 3.0 + uTime * 1.3);
        transformed += normal * noise * 0.3;
        `
      )
      // Store shader ref so we can update uTime each frame
      matRef.current!.userData.shader = shader
    }
    // Force material recompilation
    matRef.current.needsUpdate = true
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    // Update distortion time
    const shader = matRef.current?.userData?.shader
    if (shader) {
      shader.uniforms.uTime.value = state.clock.elapsedTime * 1.5
    }

    // Slow auto-rotation
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1

    // Subtle parallax with pointer
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      (pointer.x * viewport.width) / 10,
      0.05
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      (pointer.y * viewport.height) / 10,
      0.05
    )
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.4, 64, 64]} />
      <meshStandardMaterial
        ref={matRef}
        color="#a8b51d"
        roughness={0.1}
        metalness={0.4}
        opacity={0.85}
        transparent
      />
    </mesh>
  )
}

// ── Particle Ring ──────────────────────────────────────────────────
function ParticleRing() {
  const pointsRef = useRef<THREE.Points>(null!)

  const geometry = useMemo(() => {
    const count = 120
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2.5 + Math.random() * 0.8
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    return geo
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
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

// ── Stars Field (replaces drei Stars) ──────────────────────────────
function StarsField() {
  const geometry = useMemo(() => {
    const count = 300
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 12 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    return geo
  }, [])

  const pointsRef = useRef<THREE.Points>(null!)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  )
}

// ── Seeds Cluster ─────────────────────────────────────────────────
function SeedsCluster() {
  const seeds = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
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
      <StarsField />
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
