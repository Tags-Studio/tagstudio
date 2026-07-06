"use client"

import { motion } from "framer-motion"

interface PartnerItem {
  name: string
  subtitle: string
  logoSvg: React.ReactNode
  colorClass: string
}

export default function Partners() {
  const partners: PartnerItem[] = [
    {
      name: "الفجر الطبية",
      subtitle: "Al-Fajr Medical",
      logoSvg: (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      ),
      colorClass: "text-red-500 dark:text-red-400 group-hover:text-red-500"
    },
    {
      name: "الواحة العقارية",
      subtitle: "Al-Waha Real Estate",
      logoSvg: (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      colorClass: "text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-500"
    },
    {
      name: "النور التعليمية",
      subtitle: "Al-Nour Education",
      logoSvg: (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      ),
      colorClass: "text-blue-500 dark:text-blue-400 group-hover:text-blue-500"
    },
    {
      name: "مطاعم زعتر",
      subtitle: "Zaatar Restaurants",
      logoSvg: (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10V4a2 2 0 0 0-2-2Z" />
          <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          <path d="m16 8-4.5 4.5" />
        </svg>
      ),
      colorClass: "text-amber-500 dark:text-amber-400 group-hover:text-amber-500"
    },
    {
      name: "فوكو التقنية",
      subtitle: "Voko Tech Solutions",
      logoSvg: (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <line x1="12" y1="22" x2="12" y2="12" />
        </svg>
      ),
      colorClass: "text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-500"
    },
    {
      name: "المساء للإعلام",
      subtitle: "Al-Masaa Media",
      logoSvg: (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          <polygon points="10 9 15 12 10 15 10 9" />
        </svg>
      ),
      colorClass: "text-purple-500 dark:text-purple-400 group-hover:text-purple-500"
    },
    {
      name: "راجي الاستثمارية",
      subtitle: "Ragy Investment",
      logoSvg: (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 3 4 8 5-5 5 15H2L8 3Z" />
        </svg>
      ),
      colorClass: "text-cyan-500 dark:text-cyan-400 group-hover:text-cyan-500"
    },
    {
      name: "الجمعية الزراعية",
      subtitle: "Agricultural Dev",
      logoSvg: (
        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
          <path d="M12 6c-3.313 0-6 2.687-6 6a6 6 0 0 0 6 6Z" />
          <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
      ),
      colorClass: "text-teal-500 dark:text-teal-400 group-hover:text-teal-500"
    }
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-card/45 backdrop-blur-sm border border-border/60 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 select-none cursor-pointer"
            >
              {/* Logo SVG wrapper (grayscale to normal color on hover) */}
              <div className={`filter grayscale opacity-50 group-hover:filter-none group-hover:opacity-100 transition-all duration-300 mb-3 ${partner.colorClass}`}>
                {partner.logoSvg}
              </div>
              
              {/* Text labels */}
              <span className="font-bold text-sm text-foreground transition-colors group-hover:text-primary">
                {partner.name}
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold mt-1">
                {partner.subtitle}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
