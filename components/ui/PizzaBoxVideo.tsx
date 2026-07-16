"use client"

import { useRef, useEffect, useState, useCallback } from "react"

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

const ss = (v: number, a: number, b: number) => {
  const t = clamp((v - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

export default function PizzaBoxVideo() {
  const wrap = useRef<HTMLDivElement>(null)
  const vid = useRef<HTMLVideoElement>(null)
  const ovl = useRef<HTMLDivElement>(null)
  const raf = useRef(0)
  const prevTime = useRef(-1)

  const [ok, setOk] = useState(false)
  const [near, setNear] = useState(false)
  const [vW, setVW] = useState(0)
  const [vH, setVH] = useState(0)
  const [dur, setDur] = useState(5)

  /* ── Observe ── */
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setNear(true) },
      { rootMargin: "800px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* ── Load with AUTO preload ── */
  useEffect(() => {
    if (!near || !vid.current) return
    const v = vid.current
    if (v.dataset.src) {
      v.src = v.dataset.src
      v.preload = "auto"
      v.load()
    }
  }, [near])

  /* ── Metadata ── */
  const onMeta = useCallback(() => {
    const v = vid.current
    if (!v) return
    setVW(v.videoWidth)
    setVH(v.videoHeight)
    setDur(v.duration || 5)
    // Wait for enough buffer before marking ready
    const check = () => {
      if (v.readyState >= 3) {
        setOk(true)
      } else {
        requestAnimationFrame(check)
      }
    }
    check()
  }, [])

  /* ── Scroll → time ── */
  const tick = useCallback(() => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const w = wrap.current, v = vid.current, o = ovl.current
      if (!w || !v || !v.duration) return

      const r = w.getBoundingClientRect()
      const p = clamp(
        (innerHeight - r.top) / (innerHeight + r.height), 0, 1
      )

      // Only seek if difference is meaningful (reduces jank)
      const target = p * v.duration
      if (Math.abs(target - prevTime.current) > 0.05) {
        v.currentTime = target
        prevTime.current = target
      }

      if (o) {
        const fi = ss(p, 0, 0.1)
        const fo = 1 - ss(p, 0.9, 1)
        o.style.opacity = String(1 - fi * fo)
      }
    })
  }, [])

  useEffect(() => {
    if (!ok) return
    addEventListener("scroll", tick, { passive: true })
    tick()
    return () => {
      removeEventListener("scroll", tick)
      cancelAnimationFrame(raf.current)
    }
  }, [ok, tick])

  /* ── Smart container sizing ── */
  const getContainerStyle = (): React.CSSProperties => {
    if (!vW || !vH) return { width: "100%", height: "85vh" }

    const sW = innerWidth
    const sH = innerHeight
    const vAr = vW / vH
    const sAr = sW / sH

    if (vAr > sAr) {
      // Video wider than screen → fill width, limit height
      const h = (sW / vAr)
      return {
        width: "100%",
        height: `${Math.min(h, sH * 0.9)}px`,
        maxHeight: "90vh",
      }
    } else {
      // Video taller than screen → fill height, limit width
      const w = sH * 0.9 * vAr
      return {
        width: `${Math.min(w, sW * 0.95)}px`,
        height: "90vh",
        maxWidth: "95vw",
      }
    }
  }

  const sectionH = Math.max(dur * 10, 70)

  return (
    <div
      ref={wrap}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: `${sectionH}vh` }}
    >
      {/* Video container — sized to match video aspect ratio */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={getContainerStyle()}>
          <video
            ref={vid}
            data-src="/videos/pizza-box.mp4"
            onLoadedMetadata={onMeta}
            className="h-full w-full object-contain rounded-sm"
            muted
            playsInline
            preload="none"
          />
        </div>
      </div>

      {/* Overlay */}
      <div ref={ovl} className="absolute inset-0 bg-black" />

      {/* Loading */}
      {!ok && near && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-[#a8b51d] border-t-transparent" />
        </div>
      )}

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  )
}
