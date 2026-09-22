"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Dices,
  Sliders,
  Eye,
  Smartphone,
  CreditCard,
  Monitor,
  Layers,
  Plus,
  Trash2,
  Share2,
  Code,
  Palette,
  Wand2,
  FileCode,
  ChevronDown,
  Info,
  Maximize2
} from "lucide-react"

// ─── TYPES & INTERFACES ───────────────────────────────────────────────────────

export type GradientType = "mesh" | "grainy" | "aurora" | "waves" | "linear" | "radial"

export interface ColorPoint {
  id: string
  x: number // 0 - 100 (%)
  y: number // 0 - 100 (%)
  color: string
  radius: number // percentage of canvas size
}

export interface PresetPalette {
  id: string
  name: string
  nameEn: string
  colors: string[]
  bg: string
}

export type AspectRatio = "1:1" | "16:9" | "9:16" | "3:1" | "4:3"
export type MockupMode = "none" | "phone" | "card" | "desktop"

// ─── CURATED LUXURY PALETTES ──────────────────────────────────────────────────

const PRESET_PALETTES: PresetPalette[] = [
  {
    id: "royal-emerald",
    name: "زمردي ملكي وذهب",
    nameEn: "Royal Emerald",
    colors: ["#006C35", "#0F4C2A", "#D4AF37", "#E6CA65", "#021A0E"],
    bg: "#021A0E"
  },
  {
    id: "saudi-sunset",
    name: "شفق البحر الأحمر",
    nameEn: "Red Sea Sunset",
    colors: ["#FF4E50", "#F9D423", "#E03B8B", "#6A0572", "#1A002C"],
    bg: "#1A002C"
  },
  {
    id: "midnight-cyber",
    name: "سديم نيون ليلي",
    nameEn: "Midnight Cyber",
    colors: ["#7928CA", "#FF0080", "#0070F3", "#00DFD8", "#08071A"],
    bg: "#08071A"
  },
  {
    id: "tokyo-pastel",
    name: "باستيل ياباني ناعم",
    nameEn: "Tokyo Pastel",
    colors: ["#FFAAA6", "#FF8B94", "#FFD3B6", "#A8E6CF", "#DCEDC1"],
    bg: "#FFF5F5"
  },
  {
    id: "studio-carbon",
    name: "فحم وأناقة استوديو",
    nameEn: "Studio Carbon",
    colors: ["#18181B", "#27272A", "#71717A", "#E4E4E7", "#09090B"],
    bg: "#09090B"
  },
  {
    id: "aurora-borealis",
    name: "أورورا الشفق القطبي",
    nameEn: "Northern Aurora",
    colors: ["#05D554", "#00B4D8", "#7209B7", "#3A0CA3", "#03071E"],
    bg: "#03071E"
  },
  {
    id: "desert-mirage",
    name: "سراب الدهناء الذهبي",
    nameEn: "Desert Mirage",
    colors: ["#C99700", "#E07A5F", "#81B29A", "#F2CC8F", "#3D405B"],
    bg: "#2B2D42"
  },
  {
    id: "deep-ocean",
    name: "أعماق المحيط الأطلسي",
    nameEn: "Deep Ocean",
    colors: ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#011627"],
    bg: "#011627"
  }
]

// Harmonious color generation helpers for Dice Shuffle
function generateHarmoniousPalette(): { colors: string[]; bg: string } {
  const baseHue = Math.floor(Math.random() * 360)
  const schemes = [
    // Analogous
    [baseHue, (baseHue + 30) % 360, (baseHue + 60) % 360, (baseHue + 90) % 360],
    // Complementary split
    [baseHue, (baseHue + 150) % 360, (baseHue + 180) % 360, (baseHue + 210) % 360],
    // Triadic
    [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360, (baseHue + 60) % 360],
    // Sunset-style
    [(baseHue) % 360, (baseHue + 40) % 360, (baseHue + 320) % 360, (baseHue + 280) % 360],
  ]
  const chosenHues = schemes[Math.floor(Math.random() * schemes.length)]
  
  const colors = chosenHues.map((h, i) => {
    const s = 70 + Math.floor(Math.random() * 25)
    const l = 45 + Math.floor(Math.random() * 25)
    return hslToHex(h, s, l)
  })

  // Dark or deep background hue
  const bg = hslToHex(baseHue, 40, 6)
  return { colors, bg }
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// ─── INITIAL STATE ────────────────────────────────────────────────────────────

const INITIAL_POINTS: ColorPoint[] = [
  { id: "p1", x: 25, y: 25, color: "#006C35", radius: 55 },
  { id: "p2", x: 75, y: 25, color: "#D4AF37", radius: 50 },
  { id: "p3", x: 30, y: 75, color: "#0F4C2A", radius: 50 },
  { id: "p4", x: 80, y: 80, color: "#E6CA65", radius: 55 },
  { id: "p5", x: 50, y: 50, color: "#021A0E", radius: 45 }
]

export default function GradientGeneratorClient() {
  // Mode & Palette
  const [gradientType, setGradientType] = useState<GradientType>("grainy")
  const [points, setPoints] = useState<ColorPoint[]>(INITIAL_POINTS)
  const [bgColor, setBgColor] = useState<string>("#021A0E")
  const [activePalette, setActivePalette] = useState<string>("royal-emerald")

  // Sliders
  const [grainAmount, setGrainAmount] = useState<number>(38) // 0 - 100
  const [grainSize, setGrainSize] = useState<number>(65) // 20 - 120 (frequency)
  const [blurSpread, setBlurSpread] = useState<number>(55) // 10 - 100
  const [angle, setAngle] = useState<number>(135) // 0 - 360
  const [speed, setSpeed] = useState<number>(1) // 0.2 - 3
  const [isAnimated, setIsAnimated] = useState<boolean>(true)

  // Layout & Preview
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9")
  const [mockupMode, setMockupMode] = useState<MockupMode>("none")
  const [activePointId, setActivePointId] = useState<string | null>(null)
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState<boolean>(false)

  // Dragging state
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const draggingIdRef = useRef<string | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const animTimeRef = useRef<number>(0)

  // ─── ANIMATION LOOP ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isAnimated) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      return
    }

    let lastTimestamp = performance.now()

    const loop = (timestamp: number) => {
      const delta = (timestamp - lastTimestamp) / 1000
      lastTimestamp = timestamp
      animTimeRef.current += delta * speed

      // If user is not currently dragging a point, smoothly float points
      if (!isDraggingRef.current) {
        setPoints((prev) =>
          prev.map((pt, idx) => {
            const seed = idx * 1.35
            const t = animTimeRef.current
            const offsetX = Math.sin(t * 0.8 + seed) * 0.12
            const offsetY = Math.cos(t * 0.7 + seed * 1.5) * 0.12
            // subtle bounded drift
            const newX = Math.max(5, Math.min(95, pt.x + offsetX))
            const newY = Math.max(5, Math.min(95, pt.y + offsetY))
            return { ...pt, x: newX, y: newY }
          })
        )
      }

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isAnimated, speed])

  // ─── POINTER / DRAG HANDLERS ────────────────────────────────────────────────

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.stopPropagation()
    isDraggingRef.current = true
    draggingIdRef.current = id
    setActivePointId(id)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !draggingIdRef.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))

    setPoints((prev) =>
      prev.map((pt) => (pt.id === draggingIdRef.current ? { ...pt, x, y } : pt))
    )
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false
    draggingIdRef.current = null
    try {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {}
  }

  // ─── PALETTE ACTIONS ────────────────────────────────────────────────────────

  const applyPalette = (palette: PresetPalette) => {
    setActivePalette(palette.id)
    setBgColor(palette.bg)
    const newPoints = points.map((pt, i) => ({
      ...pt,
      color: palette.colors[i % palette.colors.length]
    }))
    setPoints(newPoints)
  }

  const handleShuffle = () => {
    const { colors, bg } = generateHarmoniousPalette()
    setActivePalette("custom")
    setBgColor(bg)
    setPoints((prev) =>
      prev.map((pt, i) => ({
        ...pt,
        color: colors[i % colors.length],
        x: Math.floor(15 + Math.random() * 70),
        y: Math.floor(15 + Math.random() * 70),
        radius: Math.floor(40 + Math.random() * 25)
      }))
    )
    setAngle(Math.floor(Math.random() * 360))
  }

  const handleAddPoint = () => {
    if (points.length >= 8) return
    const randomColor = hslToHex(Math.floor(Math.random() * 360), 80, 55)
    const newPt: ColorPoint = {
      id: `p-${Date.now()}`,
      x: 50,
      y: 50,
      color: randomColor,
      radius: 50
    }
    setPoints([...points, newPt])
    setActivePointId(newPt.id)
  }

  const handleRemovePoint = (id: string) => {
    if (points.length <= 2) return
    setPoints(points.filter((p) => p.id !== id))
    if (activePointId === id) setActivePointId(null)
  }

  const handleUpdateColor = (id: string, color: string) => {
    setPoints((prev) => prev.map((p) => (p.id === id ? { ...p, color } : p)))
    setActivePalette("custom")
  }

  // ─── CSS CODE GENERATION ────────────────────────────────────────────────────

  const generatedCss = useMemo(() => {
    if (gradientType === "linear") {
      const stops = points.map((p, i) => `${p.color} ${Math.round((i / (points.length - 1)) * 100)}%`).join(", ")
      return `background: linear-gradient(${angle}deg, ${stops});`
    }
    if (gradientType === "radial") {
      const stops = points.map((p, i) => `${p.color} ${Math.round((i / (points.length - 1)) * 100)}%`).join(", ")
      return `background: radial-gradient(circle at 50% 50%, ${stops});`
    }
    // Mesh / Grainy / Aurora / Waves
    const radials = points
      .map(
        (p) =>
          `radial-gradient(circle at ${p.x.toFixed(1)}% ${p.y.toFixed(1)}%, ${p.color} 0%, transparent ${p.radius}%)`
      )
      .join(",\n  ")
    return `background-color: ${bgColor};\nbackground-image:\n  ${radials};`
  }, [gradientType, points, angle, bgColor])

  const tailwindSnippet = useMemo(() => {
    if (gradientType === "linear") {
      return `className="bg-gradient-to-tr from-[${points[0]?.color}] via-[${points[1]?.color || points[0]?.color}] to-[${points[points.length - 1]?.color}]"`
    }
    return `// أضف النمط المولد كـ style مخصص أو عبر Tailwind plugin:\nstyle={{ backgroundColor: "${bgColor}" }}`
  }, [gradientType, points, bgColor])

  // ─── SVG VECTOR EXPORT FOR FIGMA ────────────────────────────────────────────

  const generatedSvgString = useMemo(() => {
    const width = 1920
    const height = 1080
    const radials = points
      .map((p, i) => {
        const cx = (p.x / 100) * width
        const cy = (p.y / 100) * height
        const r = (p.radius / 100) * Math.max(width, height)
        return `
    <radialGradient id="mesh-grad-${i}" cx="${p.x}%" cy="${p.y}%" r="${p.radius}%">
      <stop offset="0%" stop-color="${p.color}" stop-opacity="1" />
      <stop offset="100%" stop-color="${p.color}" stop-opacity="0" />
    </radialGradient>
    <rect width="${width}" height="${height}" fill="url(#mesh-grad-${i})" />`
      })
      .join("")

    const grainFilter =
      grainAmount > 0
        ? `
    <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${(grainSize / 100).toFixed(2)}" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${(grainAmount / 100).toFixed(2)} 0" />
      <feBlend mode="overlay" in="SourceGraphic" />
    </filter>`
        : ""

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <filter id="blur-filter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${blurSpread * 1.5}" />
    </filter>${grainFilter}
  </defs>
  <rect width="${width}" height="${height}" fill="${bgColor}" />
  <g filter="url(#blur-filter)">${radials}
  </g>${grainAmount > 0 ? `\n  <rect width="${width}" height="${height}" filter="url(#grain-filter)" opacity="${(grainAmount / 100).toFixed(2)}" />` : ""}
</svg>`
  }, [points, bgColor, blurSpread, grainAmount, grainSize])

  // ─── COPY ACTIONS ───────────────────────────────────────────────────────────

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generatedCss)
    setCopiedType("css")
    setTimeout(() => setCopiedType(null), 2500)
  }

  const handleCopyFigmaSvg = () => {
    navigator.clipboard.writeText(generatedSvgString)
    setCopiedType("figma")
    setTimeout(() => setCopiedType(null), 2500)
  }

  // ─── PNG 4K EXPORT ENGINE ───────────────────────────────────────────────────

  const handleDownloadPng = useCallback(async () => {
    setIsExporting(true)
    try {
      let width = 3840
      let height = 2160
      if (aspectRatio === "1:1") {
        width = 3000
        height = 3000
      } else if (aspectRatio === "9:16") {
        width = 2160
        height = 3840
      } else if (aspectRatio === "4:3") {
        width = 3200
        height = 2400
      } else if (aspectRatio === "3:1") {
        width = 3600
        height = 1200
      }

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // 1. Draw base background
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)

      // 2. Draw gradients with blur
      const offscreen = document.createElement("canvas")
      offscreen.width = width
      offscreen.height = height
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        if (gradientType === "linear") {
          const rad = (angle * Math.PI) / 180
          const cx = width / 2
          const cy = height / 2
          const length = Math.sqrt(width * width + height * height) / 2
          const x0 = cx - Math.cos(rad) * length
          const y0 = cy - Math.sin(rad) * length
          const x1 = cx + Math.cos(rad) * length
          const y1 = cy + Math.sin(rad) * length

          const lingrad = offCtx.createLinearGradient(x0, y0, x1, y1)
          points.forEach((p, i) => {
            lingrad.addColorStop(i / (points.length - 1), p.color)
          })
          offCtx.fillStyle = lingrad
          offCtx.fillRect(0, 0, width, height)
        } else if (gradientType === "radial") {
          const maxR = Math.max(width, height) * 0.75
          const radgrad = offCtx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, maxR)
          points.forEach((p, i) => {
            radgrad.addColorStop(i / (points.length - 1), p.color)
          })
          offCtx.fillStyle = radgrad
          offCtx.fillRect(0, 0, width, height)
        } else {
          // Mesh / Grainy / Aurora / Waves
          points.forEach((p) => {
            const px = (p.x / 100) * width
            const py = (p.y / 100) * height
            const pr = (p.radius / 100) * Math.max(width, height)
            const radgrad = offCtx.createRadialGradient(px, py, 0, px, py, pr)
            radgrad.addColorStop(0, p.color)
            radgrad.addColorStop(1, "rgba(0,0,0,0)")

            offCtx.fillStyle = radgrad
            offCtx.fillRect(0, 0, width, height)
          })
        }

        // Apply blur to final canvas
        ctx.save()
        const blurPx = Math.round((blurSpread / 100) * (width * 0.08))
        ctx.filter = `blur(${blurPx}px)`
        ctx.drawImage(offscreen, 0, 0)
        ctx.restore()
      }

      // 3. Draw Film Grain Texture if enabled
      if (grainAmount > 0) {
        const noiseCanvas = document.createElement("canvas")
        const nw = 512
        const nh = 512
        noiseCanvas.width = nw
        noiseCanvas.height = nh
        const nCtx = noiseCanvas.getContext("2d")
        if (nCtx) {
          const imgData = nCtx.createImageData(nw, nh)
          const data = imgData.data
          const opacity = (grainAmount / 100) * 180
          for (let i = 0; i < data.length; i += 4) {
            const val = Math.floor(Math.random() * 255)
            data[i] = val
            data[i + 1] = val
            data[i + 2] = val
            data[i + 3] = opacity
          }
          nCtx.putImageData(imgData, 0, 0)

          // Tile the noise over the large canvas with overlay blend mode
          ctx.save()
          ctx.globalCompositeOperation = "overlay"
          const pat = ctx.createPattern(noiseCanvas, "repeat")
          if (pat) {
            ctx.fillStyle = pat
            ctx.fillRect(0, 0, width, height)
          }
          ctx.restore()
        }
      }

      // 4. Trigger Download
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `tagstudio-gradient-${gradientType}-4k.png`
        a.click()
        URL.revokeObjectURL(url)
        setCopiedType("png")
        setTimeout(() => setCopiedType(null), 2500)
        setIsExporting(false)
      }, "image/png")
    } catch (err) {
      console.error(err)
      setIsExporting(false)
    }
  }, [aspectRatio, bgColor, gradientType, angle, points, blurSpread, grainAmount])

  // Download SVG
  const handleDownloadSvg = () => {
    const blob = new Blob([generatedSvgString], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tagstudio-gradient-${gradientType}.svg`
    a.click()
    URL.revokeObjectURL(url)
    setCopiedType("svg")
    setTimeout(() => setCopiedType(null), 2500)
  }

  // ─── ASPECT RATIO CLASSES ───────────────────────────────────────────────────

  const aspectClass = useMemo(() => {
    switch (aspectRatio) {
      case "1:1":
        return "aspect-square max-w-lg"
      case "9:16":
        return "aspect-[9/16] max-w-xs"
      case "4:3":
        return "aspect-[4/3] max-w-xl"
      case "3:1":
        return "aspect-[3/1] max-w-2xl"
      case "16:9":
      default:
        return "aspect-video max-w-3xl"
    }
  }, [aspectRatio])

  // ─── RENDER ─────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-zinc-100">
      {/* Toast Notification */}
      {copiedType && (
        <div className="fixed top-6 right-6 z-50 bg-[#006C35] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="w-5 h-5 text-[#D4AF37]" />
          <div className="text-xs font-bold">
            {copiedType === "css" && "تم نسخ كود CSS بنجاح!"}
            {copiedType === "figma" && "تم نسخ SVG! الصقه في Figma مباشرة (Ctrl + V) 🎨"}
            {copiedType === "png" && "بدأ تحميل صورة PNG فائقة الدقة 4K! 🖼️"}
            {copiedType === "svg" && "تم تحميل ملف SVG بنجاح! ⚡"}
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-3.5 py-1.5 rounded-full text-xs font-black text-purple-300 mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          أداة استوديو متقدمة — مجانية 100% وبدون علامات مائية
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.6] mb-3 tracking-tight">
          مولّد التدرجات اللونية الفاخرة
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 mt-1">
            Mesh & Grainy Gradients Builder
          </span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
          اصنع تدرجات لونية سائلة وشبكية ومتحركة بملمس النويز السينمائي الفاخر (Film Grain).
          صدّر كود CSS خالص، أو انسخ فيكتور SVG حياً لبرنامج <strong>Figma</strong>، أو حمّل خلفيات بدقة <strong>4K فائقة</strong>.
        </p>
      </div>

      {/* Top Segmented Tabs: Gradient Types */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-2xl max-w-3xl mx-auto mb-8 flex items-center justify-between gap-1 overflow-x-auto shadow-xl scrollbar-none">
        {[
          { id: "grainy", label: "Grainy Retro", icon: "🎞️", desc: "نويز سينمائي محبب" },
          { id: "mesh", label: "Mesh Gradient", icon: "🌌", desc: "تدرج شبكي سائل" },
          { id: "aurora", label: "Aurora Glow", icon: "🌊", desc: "أشرطة الشفق القطبي" },
          { id: "waves", label: "Fluid Waves", icon: "〰️", desc: "أمواج انسيابية" },
          { id: "linear", label: "Linear", icon: "📐", desc: "خطي كلاسيكي" },
          { id: "radial", label: "Radial", icon: "🎯", desc: "دائري مشع" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setGradientType(tab.id as GradientType)}
            className={`flex-1 min-w-[105px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 ${
              gradientType === tab.id
                ? "bg-gradient-to-b from-purple-600 to-purple-800 text-white shadow-lg scale-[1.02]"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* MAIN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* LEFT / CENTER: Interactive Canvas Viewport (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Action Toolbar Above Canvas */}
          <div className="w-full flex items-center justify-between gap-2 mb-3 bg-zinc-900/80 border border-zinc-800/80 p-2.5 rounded-2xl text-xs">
            {/* Aspect Ratio Buttons */}
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 font-bold px-1 hidden sm:inline-block">المقاس:</span>
              {(["16:9", "1:1", "9:16", "3:1", "4:3"] as AspectRatio[]).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                    aspectRatio === ratio
                      ? "bg-purple-600 text-white shadow-xs"
                      : "bg-zinc-800/70 text-zinc-400 hover:text-white"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            {/* Animation Toggle & Shuffle */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsAnimated(!isAnimated)}
                className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all ${
                  isAnimated
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
                title={isAnimated ? "إيقاف الحركة" : "تشغيل الحركة"}
              >
                {isAnimated ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isAnimated ? "متحرك" : "ثابت"}</span>
              </button>

              <button
                type="button"
                onClick={handleShuffle}
                className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all hover:scale-105"
                title="توليد تدرج لوني عشوائي متناسق"
              >
                <Dices className="w-3.5 h-3.5 text-amber-400" />
                <span>شَفْل 🎲</span>
              </button>
            </div>
          </div>

          {/* CANVAS PREVIEW CONTAINER */}
          <div className="relative w-full flex items-center justify-center p-4 sm:p-8 bg-zinc-950/80 rounded-3xl border border-zinc-800/80 shadow-2xl overflow-hidden min-h-[380px]">
            {/* Subtle background grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#fff 1px, transparent 1px), radial-gradient(#fff 1px, #000 1px)",
                backgroundSize: "24px 24px"
              }}
            />

            {/* THE GRADIENT ARTBOARD */}
            <div
              ref={containerRef}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 select-none border border-white/10`}
              style={{ backgroundColor: bgColor }}
            >
              {/* Layer 1: Gradients Blended */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  filter: `blur(${blurSpread * 0.9}px)`,
                  transform: "scale(1.25)", // prevent border clipping with blur
                  transformOrigin: "center"
                }}
              >
                {gradientType === "linear" ? (
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(${angle}deg, ${points
                        .map((p, i) => `${p.color} ${Math.round((i / (points.length - 1)) * 100)}%`)
                        .join(", ")})`
                    }}
                  />
                ) : gradientType === "radial" ? (
                  <div
                    className="w-full h-full"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${points
                        .map((p, i) => `${p.color} ${Math.round((i / (points.length - 1)) * 100)}%`)
                        .join(", ")})`
                    }}
                  />
                ) : (
                  // Mesh / Grainy / Aurora / Waves
                  points.map((pt) => (
                    <div
                      key={pt.id}
                      className="absolute rounded-full pointer-events-none transition-transform duration-75"
                      style={{
                        left: `${pt.x}%`,
                        top: `${pt.y}%`,
                        width: `${pt.radius * 2}%`,
                        height: `${pt.radius * 2}%`,
                        transform: "translate(-50%, -50%)",
                        background: `radial-gradient(circle, ${pt.color} 0%, rgba(0,0,0,0) 70%)`
                      }}
                    />
                  ))
                )}
              </div>

              {/* Layer 2: Film Grain / Noise Overlay */}
              {grainAmount > 0 && (
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
                  style={{
                    opacity: grainAmount / 100,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${(
                      grainSize / 100
                    ).toFixed(2)}' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat"
                  }}
                />
              )}

              {/* Layer 3: Draggable Color Control Handles (Mesh & Grainy modes) */}
              {(gradientType === "mesh" || gradientType === "grainy") &&
                points.map((pt) => (
                  <div
                    key={pt.id}
                    onPointerDown={(e) => handlePointerDown(pt.id, e)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group p-1.5 touch-none"
                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-transform duration-150 ${
                        activePointId === pt.id ? "scale-125 ring-4 ring-purple-500/50" : "group-hover:scale-110"
                      }`}
                      style={{ backgroundColor: pt.color }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                    </div>
                  </div>
                ))}

              {/* Optional Mockup Overlays */}
              {mockupMode === "phone" && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-6 bg-black/15">
                  <div className="w-24 h-4 bg-black/40 backdrop-blur-md rounded-full mt-2" />
                  <div className="text-center text-white/90">
                    <span className="text-3xl font-light tracking-tight block">12:45</span>
                    <span className="text-xs opacity-75">الأحد، 22 سبتمبر</span>
                  </div>
                  <div className="w-28 h-1 bg-white/50 rounded-full mb-1" />
                </div>
              )}

              {mockupMode === "card" && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                  <div className="w-full max-w-sm p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-xs font-mono tracking-widest uppercase opacity-75">TAG STUDIO</span>
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-3 w-28 bg-white/40 rounded-full" />
                      <div className="h-2.5 w-40 bg-white/20 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* EXPORT ACTION TOOLBAR (BELOW CANVAS) */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
            <button
              type="button"
              onClick={handleCopyCss}
              className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-2 border border-zinc-700/70 transition-all shadow-xs"
            >
              <Code className="w-4 h-4 text-purple-400" />
              <span>نسخ CSS</span>
            </button>

            <button
              type="button"
              onClick={handleCopyFigmaSvg}
              className="bg-[#1e1e24] hover:bg-[#282830] text-purple-300 text-xs font-black py-3 px-3 rounded-xl flex items-center justify-center gap-2 border border-purple-500/30 transition-all shadow-xs hover:border-purple-400"
            >
              <FileCode className="w-4 h-4 text-pink-400" />
              <span>نسخ لـ Figma 🎨</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadSvg}
              className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-2 border border-zinc-700/70 transition-all shadow-xs"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>تحميل SVG</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-black py-3 px-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.02] disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-white" />
              <span>{isExporting ? "جاري التصدير..." : "تحميل PNG 4K 🖼️"}</span>
            </button>
          </div>
        </div>

        {/* RIGHT: Precision Controls & Palettes (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* CONTROLS CARD */}
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl p-5 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 font-black text-sm text-white">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>معايرة المؤثرات البصرية</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">Fine-tuning</span>
            </div>

            {/* Slider 1: Grain Intensity (Noise) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-300">كثافة النويز والجرين (Film Grain)</span>
                <span className="text-purple-400 font-mono">{grainAmount}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={grainAmount}
                onChange={(e) => setGrainAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>ناعم (0%)</span>
                <span>سينمائي متوسط</span>
                <span>ريترو عالي (100%)</span>
              </div>
            </div>

            {/* Slider 2: Blur Spread */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-300">نعومة البلور والانتشار (Blur Spread)</span>
                <span className="text-purple-400 font-mono">{blurSpread}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={blurSpread}
                onChange={(e) => setBlurSpread(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Slider 3: Animation Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-300">سرعة الحركة الانسيابية</span>
                <span className="text-purple-400 font-mono">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Slider 4: Angle (Only for linear) */}
            {gradientType === "linear" && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-zinc-300">زاوية التدرج الخطي</span>
                  <span className="text-purple-400 font-mono">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            )}

            {/* Mockup Preview Toggles */}
            <div className="pt-2 border-t border-zinc-800/80">
              <span className="block text-xs font-bold text-zinc-400 mb-2">معاينة داخل موك آب عملي:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "none", label: "بدون إطار", icon: Eye },
                  { id: "phone", label: "آيفون", icon: Smartphone },
                  { id: "card", label: "بطاقة زجاج", icon: CreditCard }
                ].map((m) => {
                  const Icon = m.icon
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMockupMode(m.id as MockupMode)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        mockupMode === m.id
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-zinc-800/70 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{m.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* PALETTES PRESETS CARD */}
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm text-white">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>لوحات ألوان فاخرة معدة مسبقاً</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">Curated Palettes</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {PRESET_PALETTES.map((palette) => (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => applyPalette(palette)}
                  className={`p-2.5 rounded-2xl border text-right transition-all flex flex-col gap-2 ${
                    activePalette === palette.id
                      ? "bg-zinc-800 border-purple-500 shadow-md ring-1 ring-purple-500/50"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850"
                  }`}
                >
                  {/* Swatches strip */}
                  <div className="flex h-3 rounded-lg overflow-hidden w-full">
                    {palette.colors.map((c, idx) => (
                      <div key={idx} className="flex-1 h-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white truncate">{palette.name}</span>
                    <span className="block text-[10px] text-zinc-500 font-mono truncate">{palette.nameEn}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* COLOR POINTS STOPS EDITOR */}
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm text-white">
                <Layers className="w-4 h-4 text-pink-400" />
                <span>نقاط التدرج المخصصة ({points.length})</span>
              </div>
              <button
                type="button"
                onClick={handleAddPoint}
                disabled={points.length >= 8}
                className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة لون</span>
              </button>
            </div>

            {/* List of points */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {points.map((pt, idx) => (
                <div
                  key={pt.id}
                  className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
                    activePointId === pt.id
                      ? "bg-zinc-800/90 border-purple-500/60"
                      : "bg-zinc-850/50 border-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Native color picker */}
                    <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-white/20 shadow-xs">
                      <input
                        type="color"
                        value={pt.color}
                        onChange={(e) => handleUpdateColor(pt.id, e.target.value)}
                        className="absolute -inset-2 w-12 h-12 cursor-pointer"
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-200 uppercase">{pt.color}</span>
                    <span className="text-[11px] text-zinc-500 font-mono">#{idx + 1}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Radius slider */}
                    <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">نصف القطر:</span>
                    <input
                      type="range"
                      min="20"
                      max="80"
                      value={pt.radius}
                      onChange={(e) => {
                        const rad = Number(e.target.value)
                        setPoints(points.map((p) => (p.id === pt.id ? { ...p, radius: rad } : p)))
                      }}
                      className="w-16 h-1 bg-zinc-800 rounded-lg accent-purple-400"
                    />
                    {points.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePoint(pt.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                        title="حذف النقطة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Background Color Picker */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <span className="text-xs font-bold text-zinc-400">لون الخلفية الأساسي (Base Canvas):</span>
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/20">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="absolute -inset-2 w-10 h-10 cursor-pointer"
                  />
                </div>
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CODE VIEW ACCORDION / TABS */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-xl mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-black text-base text-white">
            <Code className="w-5 h-5 text-purple-400" />
            <span>كود الويب الجاهز للاستخدام (CSS / SVG Markup)</span>
          </div>
          <button
            type="button"
            onClick={handleCopyCss}
            className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>نسخ الكود</span>
          </button>
        </div>

        <div className="bg-zinc-950 rounded-2xl p-4 font-mono text-xs text-purple-200 overflow-x-auto border border-zinc-800/80 leading-relaxed dir-ltr text-left">
          <pre>{generatedCss}</pre>
        </div>
      </div>

      {/* EDUCATIONAL & SEO GUIDE SECTION */}
      <div className="border-t border-zinc-800/80 pt-12 space-y-10">
        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3">
            دليل المصممين: أسرار استخدام تدرجات Mesh و Grainy في الهوية البصرية 2026
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            التدرجات اللونية الشبكية (Mesh Gradients) وتأثير الحبيبات السينمائية (Grainy Aesthetic) ليسا مجرد خلفيات عابرة؛
            بل هما لغة بصرية تمنح المنتجات الرقمية والشركات عمقاً ملموساً وفخامة استثنائية تميزها عن القوالب الباهتة المسطحة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-2xl">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-sm font-black text-white mb-2">تدرجات سائلة بلا تكتل</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              تحكم بنصف قطر كل نقطة ونعومة البلور لخلق توزيع لوني متوازن لا يجهد عين القارئ عند وضع نصوص بيضاء أو شعارات أمامه.
            </p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-2xl">
            <div className="text-2xl mb-2">🎞️</div>
            <h3 className="text-sm font-black text-white mb-2">ملمس النويز (Film Grain)</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              إضافة 25% إلى 40% من النويز يكسر تدرج الألوان المتكرر ويمنع عيوب الـ Color Banding في شاشات الموبايل الرخيصة، مانحاً إحساس الطباعة الفاخرة.
            </p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-2xl">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-sm font-black text-white mb-2">تكامل مباشر مع Figma</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              كود SVG المنسوخ مهيأ بالكامل ليتعرف عليه فيجما كطبقات وVector Fills قابلة للتعديل وتغيير الأحجام دون أي فقدان في الجودة.
            </p>
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-3 max-w-3xl">
          <h3 className="text-base font-black text-white mb-4">الأسئلة الشائعة حول مولد التدرجات</h3>
          {[
            {
              q: "كيف ألصق التدرج في برنامج فيجما (Figma) كطبقات قابلة للتعديل؟",
              a: "ببساطة اضغط على زر 'نسخ لـ Figma 🎨'، ثم افتح ملفك في فيجما واضغط Ctrl + V (أو Cmd + V على ماك). سيتم لصق التدرج فوراً كإطار SVG يحتوي على أشكال التدرج الشعاعية وفلتر البلور."
            },
            {
              q: "ما هي الدقة التي يتم تصدير صور PNG بها؟",
              a: "يتم تصدير الصور بدقة فائقة تصل إلى 4K UHD (3840 × 2160 بكسل بنسبة 16:9، أو 3000 × 3000 بكسل بنسبة 1:1)، مما يجعلها ممتازة كخلفيات شاشات، ومطبوعات، وبوسترات عملاقة دون أي بكسلة."
            },
            {
              q: "هل كود CSS المولد متوافق مع كافة المتصفحات وهواتف الموبايل؟",
              a: "نعم، الكود المولد يعتمد على معايير الـ W3C القياسية لخاصية radial-gradient مع لون أساسي بديل (Fallback background-color) لضمان ظهوره بسلاسة تامة على متصفحات Chrome و Safari و Firefox و Edge."
            },
            {
              q: "هل الأداة مجانية وتسمح بالاستخدام التجاري؟",
              a: "نعم 100%! الأداة مجانية بالكامل لجميع المصممين وأصحاب الأعمال، ولا نضع أي علامة مائية (Watermark) على الصور أو الملفات المصدرة، وتستطيع استخدام النتائج في مشاريعك التجارية بحرية."
            }
          ].map((faq, idx) => (
            <details
              key={idx}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 transition-colors group"
            >
              <summary className="font-black text-xs sm:text-sm text-zinc-200 cursor-pointer list-none flex items-center justify-between">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-purple-400 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-2.5">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
