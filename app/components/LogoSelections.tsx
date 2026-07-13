"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LogoSelections() {
  const logos = [
    "bvkbvcllaq0joa4yqq21.avif",
    "byyq04x2vaedujyoy3xh.avif",
    "fganx6cgjhtrabu0xra9.avif",
    "hfxbwfzzzjyuml4vqjs3.avif",
    "kfgxf74ohbpnv6cey3og.avif",
    "nldht6g9nsjltufcd01m.avif",
    "qvr7j1tenquu6swqzdeq.avif",
    "wdvorof0aowg6x3bvtbj.avif",
    "xnrjf7apqajuxlfjlnqs.avif"
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/15">
            🎨 معرض أعمالنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground">
            مختارات من الهويات والشعارات
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            مجموعة من الشعارات والهويات التجارية والطبية الفريدة التي ابتكرناها لشركائنا لتجسد رؤيتهم وتصنع حضوراً بصرياً لا يُنسى في السوق.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-center items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.08, duration: 0.6 }}
              className="group flex items-center justify-center p-6 h-40 sm:h-52 md:h-60 rounded-3xl bg-card/40 backdrop-blur-sm border border-border/60 hover:border-primary/45 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 select-none cursor-pointer"
            >
              {/* Image container with scale-up on hover */}
              <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                <Image
                  src={`/images/logo-designs/${logo}`}
                  alt="تصميم شعار من تاج ستوديو"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
