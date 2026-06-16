"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Plus, Minus } from "lucide-react"

interface ImageModalProps {
  imageUrl: string | null
  title: string
  isOpen: boolean
  onClose: () => void
}

export default function ImageModal({ imageUrl, title, isOpen, onClose }: ImageModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    // Reset zoom when modal opens/closes or image changes
    setZoomLevel(1)
  }, [isOpen, imageUrl])

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3)) // Max zoom 3x
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 1)) // Min zoom 1x
  }

  if (!isOpen || !imageUrl) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close on overlay click
        >
          <motion.div
            className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full h-3/4 flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 p-2 rounded-full bg-white/80"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex-grow relative overflow-hidden rounded-t-lg">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                layout="fill"
                objectFit="contain" // Use contain to fit initially, then scale
                className="transition-transform duration-100 ease-out"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
              />
            </div>

            <div className="p-4 flex justify-between items-center bg-gray-100 rounded-b-lg">
              <h3 className="text-xl font-semibold text-foreground">{title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50"
                  disabled={zoomLevel <= 1}
                  aria-label="تصغير"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50"
                  disabled={zoomLevel >= 3}
                  aria-label="تكبير"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
