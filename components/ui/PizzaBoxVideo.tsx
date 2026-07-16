"use client"

import { useRef, useEffect, useState, useCallback } from "react"

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
const smoothstep = (v: number, min: number, max: number) => {
  const t = clamp((v - min) / (max - min), 0, 1)
  return t * t * (3 - 2 * t)
}

export default function PizzaBoxVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // ── Start loading when section is near ──
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
          if (videoRef.current && videoRef.current.dataset.src) {
            videoRef.current.src = videoRef.current.dataset.src
            videoRef.current.load()
          }
        }
      },
      { rootMargin: "300px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isInView])

  // ── Scroll → video time ──
  const handleScroll = useCallback(() => {
    const container = containerRef.current
    const video = videoRef.current
    const overlay = overlayRef.current
    if (!container || !video || !video.duration) return

    const rect = container.getBoundingClientRect()
    const vh = window.innerHeight

    // 0 = section enters from bottom, 1 = section exits from top
    const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1)

    video.currentTime = progress * video.duration

    // Overlay: black at start/end, transparent in middle
    const fadeIn = smoothstep(progress, 0, 0.12)
    const fadeOut = 1 - smoothstep(progress, 0.88, 1)
    if (overlay) {
      overlay.style.opacity = String(1 - fadeIn * fadeOut)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLoaded, handleScroll])

  return (
    <div
      ref={containerRef}
      className="relative h-[120vh] w-full overflow-hidden bg-black"
    >
      {/* ── Video: object-contain shows FULL frame ── */}
      <video
        ref={videoRef}
        data-src="/videos/pizza-box.mp4"
        className="absolute inset-0 h-full w-full object-contain"
        muted
        playsInline
        preload="none"
        onCanPlay={() => {
          setIsLoaded(true)
          handleScroll()
        }}
      />

      {/* ── Black overlay fades with scroll ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
        style={{ opacity: 1 }}
      />

      {/* ── Loading ── */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-[#a8b51d] border-t-transparent" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/20">
              Loading
            </p>
          </div>
        </div>
      )}

      {/* ── Cinematic vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  )
}
