"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Lazy-load the heavy Three.js scene — only downloaded when the user visits this page
const ZaatarScene = dynamic(() => import("./ZaatarScene"), {
  ssr: false,
  loading: () => null,
})

export default function ZaatarScene3D() {
  return (
    <Suspense fallback={null}>
      <ZaatarScene />
    </Suspense>
  )
}
