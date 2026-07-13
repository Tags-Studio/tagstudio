"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Partners() {
  const logos = [
    "dsivzphr23yzzkb1kqmx.avif",
    "exph5vr5pih8wt4ko0or.avif",
    "f1zj7o7evngn3i9g3opr.avif",
    "fedcwjaleuvsyjxriwko.avif",
    "fzhdoeskre2o0bom6vo3.avif",
    "iqxfxrg8jlcqpge5y9qz.avif",
    "j1fotrcql7lxxetrema1.avif",
    "lxjigjlroqm0apk3rowz.avif",
    "mwyliqsys7cqlrspyh4n.avif",
    "noxi3ejq0c7reknkvgzr.avif",
    "ohhvjkszm3vjuyozb8hr.avif",
    "okrr59n80nkr7gdvvr3d.avif",
    "ornxkygan7pmc4cx9a1m.avif",
    "oz2ni9ohllrkugjqgqlo.avif",
    "rqbls448ahofkyfa1nvw.avif",
    "sabsx6vuird6jkyaheu9.avif",
    "sphpbt8rt4gxqp0h3isj.avif",
    "sxfoj5qrk32ctfmizqck.avif",
    "unabpez1xrpq5o0koicn.avif",
    "w9igsu7p5n2pomwykeh5.avif",
    "xrxqahnx2fjvcflhwknj.avif"
  ]

  return (
    <section className="py-20 bg-background/50 border-y border-border/40 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/15">
            🤝 شركاء النجاح
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            علامات تجارية نعتز بالعمل معها
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            من القاهرة إلى الرياض، نرافق الشركات الرائدة لتطوير وبناء هويات بصرية متميزة تصنع الفارق في السوق.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 justify-center items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.05, duration: 0.5 }}
              className="group flex items-center justify-center p-2.5 h-28 rounded-2xl bg-card/45 backdrop-blur-sm border border-border/60 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 select-none cursor-pointer"
            >
              {/* Logo container (grayscale to normal color on hover) */}
              <div className="relative w-full h-full filter grayscale opacity-50 group-hover:filter-none group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <Image
                  src={`/images/logos/${logo}`}
                  alt="شريك نجاح تاج ستوديو"
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
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
