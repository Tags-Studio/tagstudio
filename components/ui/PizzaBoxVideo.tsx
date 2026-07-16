"use client"

import { useRef, useEffect, useState, useCallback } from "react"

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

const smoothstep = (v: number, min: number, max: number) => {
  const t = clamp((v - min) / (max - min), 0, 1)
  return t * t * (3 - 2 * t)
}

export default function PizzaBoxVideo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  const [ready, setReady] = useState(false)
  const [near, setNear] = useState(false)
  const [ratio, setRatio] = useState(9 / 16)
  const [dur, setDur] = useState(5)

  /* ── Detect when section is close to viewport ── */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true)
      },
      { rootMargin: "600px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* ── Attach video src only when near ── */
  useEffect(() => {
    if (!near || !videoRef.current) return
    const v = videoRef.current
    if (v.dataset.src) {
      v.src = v.dataset.src
      v.load()
    }
  }, [near])

  /* ── Get video dimensions & duration ── */
  const onMeta = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    setDur(v.duration || 5)
    setRatio((v.videoWidth || 9) / (v.videoHeight || 16))
    setReady(true)
  }, [])

  /* ── Scroll → video time (with rAF for smoothness) ── */
  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const sec = sectionRef.current
      const vid = videoRef.current
      const ovl = overlayRef.current
      if (!sec || !vid || !vid.duration) return

      const r = sec.getBoundingClientRect()
      const p = clamp(
        (innerHeight - r.top) / (innerHeight + r.height),
        0,
        1
      )

      vid.currentTime = p * vid.duration

      if (ovl) {
        const fi = smoothstep(p, 0, 0.12)
        const fo = 1 - smoothstep(p, 0.88, 1)
        ovl.style.opacity = String(1 - fi * fo)
      }
    })
  }, [])

  useEffect(() => {
    if (!ready) return
    addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [ready, onScroll])

  /* ── Dynamic height: ~150vh per 10s of video, min 100vh ── */
  const heightVh = Math.max(dur * 15, 100)

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: `${heightVh}vh` }}
    >
      {/* ── Video container: sized to video aspect ratio ── */}
      <div className="absolute inset-0 flex items-center justify-center px-4 py-[4vh]">
        <video
          ref={videoRef}
          data-src="/videos/pizza-box.mp4"
          onLoadedMetadata={onMeta}
          className="h-full max-h-[92vh] w-full object-contain rounded-sm"
          style={{ aspectRatio: `${ratio}` }}
          muted
          playsInline
          preload="none"
        />
      </div>

      {/* ── Black overlay (fades with scroll) ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
      />

      {/* ── Loading spinner ── */}
      {!ready && near && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-[#a8b51d] border-t-transparent" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/20">
              Loading
            </p>
          </div>
        </div>
      )}

      {/* ── Subtle vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  )
}
