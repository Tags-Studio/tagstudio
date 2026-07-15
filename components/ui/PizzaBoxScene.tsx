"use client"

import { useRef, useMemo, useEffect, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

/* ─── DIMENSIONS ─── */
const BW = 3.2, BD = 3.2, WALL = 0.22, BASE = 0.07, LID = 0.05

/* ─── PROCEDURAL PIZZA TEXTURE ─── */
function makePizzaTex(): THREE.CanvasTexture {
  const S = 1024, c = document.createElement("canvas")
  c.width = c.height = S
  const x = c.getContext("2d")!, m = S / 2

  // dough
  const dg = x.createRadialGradient(m, m, 0, m, m, S / 2)
  dg.addColorStop(0, "#e8c874"); dg.addColorStop(0.7, "#d4a54a")
  dg.addColorStop(0.88, "#c4923a"); dg.addColorStop(1, "#a07830")
  x.fillStyle = dg; x.fillRect(0, 0, S, S)

  // crust bumps
  for (let i = 0; i < 100; i++) {
    const a = (i / 100) * Math.PI * 2, r = S / 2 - 25 + (Math.random() - 0.5) * 35
    x.fillStyle = `rgba(${175 + ~~(Math.random() * 45)},${135 + ~~(Math.random() * 45)},${55 + ~~(Math.random() * 35)},0.4)`
    x.beginPath(); x.arc(m + Math.cos(a) * r, m + Math.sin(a) * r, 8 + Math.random() * 14, 0, Math.PI * 2); x.fill()
  }

  // sauce
  const sg = x.createRadialGradient(m, m, 0, m, m, S * 0.37)
  sg.addColorStop(0, "#d44a28"); sg.addColorStop(0.9, "#b83520")
  x.fillStyle = sg; x.beginPath(); x.arc(m, m, S * 0.37, 0, Math.PI * 2); x.fill()

  // cheese melt
  for (let i = 0; i < 200; i++) {
    const a = Math.random() * Math.PI * 2, r = Math.random() * S * 0.34
    const px = m + Math.cos(a) * r, py = m + Math.sin(a) * r
    x.fillStyle = `rgba(${235 + ~~(Math.random() * 20)},${200 + ~~(Math.random() * 40)},${80 + ~~(Math.random() * 60)},${0.15 + Math.random() * 0.25})`
    x.beginPath(); x.arc(px, py, 4 + Math.random() * 16, 0, Math.PI * 2); x.fill()
  }

  // pepperoni
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.3, r = S * 0.13 + Math.random() * S * 0.12
    const px = m + Math.cos(a) * r, py = m + Math.sin(a) * r, sz = 30 + Math.random() * 25
    x.fillStyle = "#8b2020"; x.beginPath(); x.arc(px, py, sz, 0, Math.PI * 2); x.fill()
    x.fillStyle = "#a03030"; x.beginPath(); x.arc(px, py, sz * 0.82, 0, Math.PI * 2); x.fill()
    x.fillStyle = "rgba(200,80,40,0.3)"; x.beginPath(); x.arc(px - 3, py - 3, sz * 0.4, 0, Math.PI * 2); x.fill()
  }

  // basil leaves
  for (let i = 0; i < 4; i++) {
    const a = Math.random() * Math.PI * 2, r = S * 0.08 + Math.random() * S * 0.1
    const px = m + Math.cos(a) * r, py = m + Math.sin(a) * r
    x.save(); x.translate(px, py); x.rotate(Math.random() * Math.PI * 2)
    x.fillStyle = "#3a7a2a"
    x.beginPath(); x.ellipse(0, 0, 18, 8, 0, 0, Math.PI * 2); x.fill()
    x.strokeStyle = "#2a5a1a"; x.lineWidth = 1
    x.beginPath(); x.moveTo(-14, 0); x.lineTo(14, 0); x.stroke()
    x.restore()
  }

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/* ─── PROCEDURAL BOX TEXTURE ─── */
function makeBoxTex(): THREE.CanvasTexture {
  const S = 512, c = document.createElement("canvas")
  c.width = c.height = S
  const x = c.getContext("2d")!

  x.fillStyle = "#c8a86e"; x.fillRect(0, 0, S, S)

  // fiber lines
  x.globalAlpha = 0.06; x.strokeStyle = "#8a6a3a"
  for (let i = 0; i < S; i += 3) {
    x.beginPath(); x.moveTo(0, i + (Math.random() - 0.5) * 1.5)
    x.lineTo(S, i + (Math.random() - 0.5) * 1.5); x.stroke()
  }
  x.globalAlpha = 1

  // subtle stains
  for (let i = 0; i < 8; i++) {
    x.fillStyle = `rgba(180,140,80,${0.03 + Math.random() * 0.04})`
    x.beginPath(); x.arc(Math.random() * S, Math.random() * S, 30 + Math.random() * 60, 0, Math.PI * 2); x.fill()
  }

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/* ─── PIZZA DISC ─── */
function Pizza() {
  const tex = useMemo(() => makePizzaTex(), [])
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.04 })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, BASE + 0.04, 0]}>
      <circleGeometry args={[1.35, 64]} />
      <meshStandardMaterial map={tex} roughness={0.75} metalness={0} />
    </mesh>
  )
}

/* ─── BOX BOTTOM ─── */
function BoxBottom() {
  const tex = useMemo(() => makeBoxTex(), [])
  const wallGeo = useMemo(() => new THREE.BoxGeometry(BW, WALL, BD), [])
  const baseGeo = useMemo(() => new THREE.BoxGeometry(BW, BASE, BD), [])

  return (
    <group position={[0, -WALL / 2, 0]}>
      {/* walls */}
      <mesh geometry={wallGeo} material={new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 })} />
      {/* inner walls white coating */}
      <mesh scale={[0.96, 0.96, 0.96]}>
        <boxGeometry args={[BW, WALL, BD]} />
        <meshStandardMaterial color="#f5f0e5" roughness={0.95} side={THREE.BackSide} />
      </mesh>
      {/* base */}
      <mesh position={[0, -WALL / 2 - BASE / 2, 0]} geometry={baseGeo} material={new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 })} />
    </group>
  )
}

/* ─── BOX LID (hinges on -Z edge) ─── */
function BoxLid({ openRef }: { openRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null!)
  const tex = useMemo(() => makeBoxTex(), [])
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }), [tex])
  const innerMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f5f0e5", roughness: 0.95, side: THREE.BackSide as THREE.Side }), [])

  useFrame(() => {
    if (!group.current) return
    const t = THREE.MathUtils.clamp(openRef.current, 0, 1)
    const angle = -t * Math.PI * 0.7
    group.current.rotation.x = angle
    group.current.position.y = Math.sin(Math.abs(angle)) * BW * 0.35
    group.current.position.z = -Math.cos(angle) * BW * 0.35 + BW * 0.35
  })

  return (
    <group ref={group}>
      <mesh position={[0, LID / 2, 0]}>
        <boxGeometry args={[BW, LID, BD]} />
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh position={[0, LID / 2, 0]} scale={[0.97, 0.97, 0.97]}>
        <boxGeometry args={[BW, LID, BD]} />
        <primitive object={innerMat} attach="material" />
      </mesh>
    </group>
  )
}

/* ─── STEAM PARTICLES ─── */
function Steam({ openRef }: { openRef: React.MutableRefObject<number> }) {
  const count = 60
  const ref = useRef<THREE.Points>(null!)
  const baseY = useRef<Float32Array>(new Float32Array(count))
  const speed = useRef<Float32Array>(new Float32Array(count))
  const drift = useRef<Float32Array>(new Float32Array(count))
  const phase = useRef<Float32Array>(new Float32Array(count))

  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      baseY.current[i] = 0.15 + Math.random() * 0.3
      speed.current[i] = 0.3 + Math.random() * 0.5
      drift.current[i] = (Math.random() - 0.5) * 0.4
      phase.current[i] = Math.random() * Math.PI * 2
      const a = Math.random() * Math.PI * 2, r = Math.random() * 0.8
      pos[i * 3] = Math.cos(a) * r
      pos[i * 3 + 1] = baseY.current[i]
      pos[i * 3 + 2] = Math.sin(a) * r
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    return g
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const pos = geo.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    const open = THREE.MathUtils.clamp(openRef.current, 0, 1)
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const sp = speed.current[i]
      const dr = drift.current[i]
      const ph = phase.current[i]
      const life = ((t * sp + ph) % 2.5) / 2.5 // 0→1 lifecycle

      arr[i * 3] = Math.sin(t * 0.5 + ph) * dr * (1 + life * 2)
      arr[i * 3 + 1] = baseY.current[i] + life * 2.5 * open
      arr[i * 3 + 2] = Math.cos(t * 0.3 + ph) * dr * (1 + life * 1.5)
    }
    pos.needsUpdate = true

    const mat = ref.current.material as THREE.PointsMaterial
    mat.opacity = open * 0.35
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#ffffff"
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── WARM GLOW WHEN OPEN ─── */
function WarmGlow({ openRef }: { openRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.PointLight>(null!)

  useFrame(() => {
    if (!ref.current) return
    const o = THREE.MathUtils.clamp(openRef.current, 0, 1)
    ref.current.intensity = o * 3
  })

  return <pointLight ref={ref} position={[0, 1.5, 0]} color="#ffaa44" distance={6} decay={2} />
}

/* ─── CAMERA CONTROLLER ─── */
function CameraRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const startPos = new THREE.Vector3(0, 6, 6)
  const endPos = new THREE.Vector3(0, 2.8, 3.2)
  const startLook = new THREE.Vector3(0, 0, 0)
  const endLook = new THREE.Vector3(0, 0.3, 0)

  useFrame(() => {
    const t = THREE.MathUtils.clamp(progressRef.current, 0, 1)
    const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic

    camera.position.lerpVectors(startPos, endPos, eased)
    const look = new THREE.Vector3().lerpVectors(startLook, endLook, eased)
    camera.lookAt(look)
  })

  return null
}

/* ─── MAIN SCENE ─── */
function Scene({
  progressRef,
  openRef,
}: {
  progressRef: React.MutableRefObject<number>
  openRef: React.MutableRefObject<number>
}) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 8, 4]} intensity={0.8} color="#fff5e0" castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.2} color="#aaccff" />

      <CameraRig progressRef={progressRef} />
      <BoxBottom />
      <BoxLid openRef={openRef} />
      <Pizza />
      <Steam openRef={openRef} />
      <WarmGlow openRef={openRef} />
    </>
  )
}

/* ─── EXPORTED CANVAS ─── */
export default function PizzaBoxScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const openRef = useRef(0)

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const vh = window.innerHeight

    // progress: 0 when box enters from bottom, 1 when center of box reaches center of viewport
    const raw = (vh - rect.top) / (vh + rect.height)
    progressRef.current = THREE.MathUtils.clamp(raw, 0, 1)

    // lid opens when progress > 0.3, fully open at 0.7
    const lidRaw = (progressRef.current - 0.3) / 0.4
    openRef.current = THREE.MathUtils.clamp(lidRaw, 0, 1)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div ref={containerRef} className="h-[90vh] w-full">
      <Canvas
        camera={{ position: [0, 6, 6], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Scene progressRef={progressRef} openRef={openRef} />
      </Canvas>
    </div>
  )
}
