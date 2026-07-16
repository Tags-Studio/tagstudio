"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import * as THREE from "three"

export default function PizzaBoxVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // ── Track if section is in viewport ──
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
          // Start loading video when section is near
          if (videoRef.current) {
            videoRef.current.src = videoRef.current.dataset.src!
            videoRef.current.load()
          }
        }
      },
      { rootMargin: "200px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isInView])

  // ── Scroll-driven video progress ──
  const handleScroll = useCallback(() => {
    const container = containerRef.current
    const video = videoRef.current
    const overlay = overlayRef.current
    if (!container || !video || !video.duration) return

    const rect = container.getBoundingClientRect()
    const vh = window.innerHeight

    // 0 when section enters bottom, 1 when section exits top
    const progress = THREE.MathUtils.clamp(
      (vh - rect.top) / (vh + rect.height),
      0,
      1
    )

    // Map progress to video time (double speed)
    const fastProgress = THREE.MathUtils.clamp(progress * 2, 0, 1)
    video.currentTime = fastProgress * video.duration

    // Overlay opacity: fully visible at start/end, transparent in middle
    const fadeIn = THREE.MathUtils.smoothstep(progress, 0, 0.15)
    const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, 0.85, 1)
    if (overlay) {
      overlay.style.opacity = String(Math.max(1 - fadeIn * fadeOut, 0))
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
      className="relative h-[120vh] w-full overflow-hidden bg-[#efeef0]"
    >
      {/* Video */}
      <video
        ref={videoRef}
        data-src="/videos/pizza-box.mp4"
        className="absolute left-1/2 top-1/2 h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        muted
        playsInline
        preload="none"
        onCanPlay={() => {
          setIsLoaded(true)
          handleScroll()
        }}
      />

      {/* Black overlay that fades with scroll */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#efeef0] transition-none"
        style={{ opacity: 1 }}
      />

      {/* Cinematic text overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#84920b]/50">
          Zaatar w Semsom
        </p>
      </div>

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#efeef0]">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-[#a8b51d] border-t-transparent" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#84920b]/50">
              Loading
            </p>
          </div>
        </div>
      )}

      {/* Top gradient fade */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-[#efeef0] to-transparent z-10" />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#efeef0] to-transparent z-10" />

      {/* Side vignette for cinematic feel */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(239,238,240,0.8) 100%)"
        }}
      />
    </div>
  )
}
