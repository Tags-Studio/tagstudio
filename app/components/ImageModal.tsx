"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Plus, Minus, Send } from "lucide-react"

interface CaseStudyData {
  client: string
  problem: string
  solution: string
  results: string
}

interface ImageModalProps {
  imageUrl: string | null
  title: string
  isOpen: boolean
  onClose: () => void
  category?: string
  description?: string
  caseStudy?: CaseStudyData | null
}

export default function ImageModal({
  imageUrl,
  title,
  isOpen,
  onClose,
  category,
  description,
  caseStudy,
}: ImageModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    setZoomLevel(1)
  }, [isOpen, imageUrl])

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 1))
  }

  if (!isOpen || !imageUrl) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative bg-background rounded-3xl shadow-2xl max-w-6xl w-full ${
              caseStudy ? "min-h-[500px]" : "h-3/4"
            } flex flex-col md:flex-row overflow-hidden border border-border/60`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-foreground/80 hover:text-foreground z-20 p-2 rounded-full bg-background/80 backdrop-blur border border-border/40 hover:scale-110 transition-transform"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Section */}
            <div className={`relative flex-grow flex flex-col bg-secondary/5 ${caseStudy ? "w-full md:w-1/2 min-h-[300px] md:min-h-0" : "w-full h-full"}`}>
              <div className="flex-grow relative overflow-hidden h-[300px] md:h-full">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={title}
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-100 ease-out p-4"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
                />
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-full bg-background/80 text-foreground border border-border/40 hover:bg-background disabled:opacity-50"
                  disabled={zoomLevel <= 1}
                  aria-label="تصغير"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-full bg-background/80 text-foreground border border-border/40 hover:bg-background disabled:opacity-50"
                  disabled={zoomLevel >= 3}
                  aria-label="تكبير"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Case Study Details Section */}
            {caseStudy ? (
              <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-r border-border/40 max-h-[85vh] overflow-y-auto">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
                    {category || "دراسة حالة هوية بصرية"}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-4">
                    {title}
                  </h3>

                  {description && (
                    <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
                      {description}
                    </p>
                  )}

                  <hr className="border-border/40 my-6" />

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">
                        👤 العميل:
                      </h4>
                      <p className="text-foreground text-base sm:text-lg font-semibold">
                        {caseStudy.client}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-1">
                        ⚠️ المشكلة والتحدي:
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {caseStudy.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-1">
                        💡 الحل والتنفيذ:
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {caseStudy.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-cyan-500 uppercase tracking-wider mb-1">
                        📊 النتائج والمخرجات:
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {caseStudy.results}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border/40">
                  <a
                    href="https://wa.me/201009215131"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                  >
                    <Send className="w-5 h-5" />
                    استشرنا في تصميم هوية مشابهة لمشروعك
                  </a>
                </div>
              </div>
            ) : (
              /* Non Case Study project footer/title block */
              <div className="p-6 bg-secondary/5 border-t border-border/40 flex justify-between items-center rounded-b-3xl">
                <div>
                  <span className="text-xs font-semibold text-primary block mb-1">
                    {category || "تصميم إبداعي"}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{title}</h3>
                  {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                </div>
                <div className="pr-4">
                  <a
                    href="https://wa.me/201009215131"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 text-sm font-bold rounded-xl transition-all"
                  >
                    استفسر الآن
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
