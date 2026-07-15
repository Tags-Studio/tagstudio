"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const PizzaBoxScene = dynamic(() => import("./PizzaBoxScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#a8b51d] border-t-transparent" />
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[#84920b]">
          Loading 3D Experience...
        </p>
      </div>
    </div>
  ),
})

export default function PizzaBoxWrapper() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Don't render until user scrolls near the section
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setVisible(true)
        window.removeEventListener("scroll", onScroll)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[#b5bfa8]">
          Scroll to reveal
        </p>
      </div>
    )
  }

  return <PizzaBoxScene />
}
