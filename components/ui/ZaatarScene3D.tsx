"use client"

import dynamic from "next/dynamic"
import { useEffect, useState, Suspense } from "react"

// Lazy-load the heavy Three.js scene — only downloaded when the user visits this page
const ZaatarScene = dynamic(() => import("./ZaatarScene"), {
  ssr: false,
})

export default function ZaatarScene3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Suspense fallback={null}>
      <ZaatarScene />
    </Suspense>
  )
}
