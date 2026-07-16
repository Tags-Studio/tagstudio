"use client"

import { useRef, useEffect, useCallback, useState } from "react"

export default function HeroVideoScrub({ src, className }: { src: string, className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const raf = useRef(0)
  const prevTime = useRef(-1)
  const [loaded, setLoaded] = useState(false)

  const tick = useCallback(() => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const v = videoRef.current
      if (!v || !v.duration) return

      // Map scroll from 0 to slightly before the hero leaves the screen
      // innerHeight * 0.8 ensures the video finishes playing just as it scrolls out of view
      const p = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.8)))
      
      const targetTime = p * v.duration

      // Only seek if there's a meaningful change to avoid micro-stuttering
      if (Math.abs(targetTime - prevTime.current) > 0.05) {
        v.currentTime = targetTime
        prevTime.current = targetTime
      }
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    window.addEventListener("scroll", tick, { passive: true })
    tick()
    return () => {
      window.removeEventListener("scroll", tick)
      cancelAnimationFrame(raf.current)
    }
  }, [loaded, tick])

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={() => {
        setLoaded(true)
        // give it a tiny delay to ensure first frame is drawn
        setTimeout(tick, 50)
      }}
    />
  )
}
