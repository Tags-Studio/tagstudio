"use client"

import { useRef, useEffect, useCallback, useState } from "react"

export default function HeroVideoScrub({ src, className }: { src: string, className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const raf = useRef(0)
  const prevTime = useRef(-1)

  const tick = useCallback(() => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const v = videoRef.current
      if (!v || !v.duration) return

      // Map scroll from 0 to slightly before the hero leaves the screen
      const p = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.85)))
      
      const targetTime = p * v.duration

      // Only seek if there's a meaningful change to avoid micro-stuttering
      if (Math.abs(targetTime - prevTime.current) > 0.05) {
        v.currentTime = targetTime
        prevTime.current = targetTime
      }
    })
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (v && v.dataset.src) {
      v.src = v.dataset.src
      v.load()
    }

    window.addEventListener("scroll", tick, { passive: true })
    tick()
    return () => {
      window.removeEventListener("scroll", tick)
      cancelAnimationFrame(raf.current)
    }
  }, [tick])

  return (
    <video
      ref={videoRef}
      data-src={src}
      className={className}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={tick}
    />
  )
}
