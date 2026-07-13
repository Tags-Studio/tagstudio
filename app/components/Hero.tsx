"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const trustPoints = [
  "خبرة في بناء الهويات منذ 2012",
  "تنفيذ للمشروعات في السعودية ومصر",
  "ملفات منظمة وجاهزة للتطبيق",
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <motion.p className="mb-5 font-semibold text-primary" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            تاج ستوديو — هوية وتصميم للشركات
          </motion.p>
          <motion.h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            نصمم هويات بصرية تجعل مشروعك <span className="text-gradient">أوضح وأكثر ثقة</span>
          </motion.h1>
          <motion.p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            من الشعار إلى دليل الهوية والمطبوعات والمحتوى البصري، نساعد الشركات في السعودية ومصر على بناء حضور متناسق وقابل للنمو.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Link href="/#contact-form" className="apple-button px-7 py-3">اطلب عرض سعر</Link>
            <Link href="/work" className="rounded-full border border-border px-7 py-3 font-semibold text-foreground transition hover:border-primary hover:text-primary">شاهد أعمالنا</Link>
          </motion.div>
          <motion.ul className="mt-10 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}>
            {trustPoints.map((point) => <li key={point} className="flex items-start gap-2"><span className="mt-0.5 text-primary" aria-hidden="true">✓</span><span>{point}</span></li>)}
          </motion.ul>
        </div>
        <motion.div className="relative mx-auto w-full max-w-xl" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <Image src="/images/hero-concept.webp" alt="نماذج من أعمال تاج ستوديو في تصميم الهوية البصرية" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-5 right-5 rounded-2xl border border-border bg-background/95 px-5 py-4 shadow-lg backdrop-blur">
            <p className="text-sm font-semibold text-foreground">من الفكرة إلى هوية قابلة للتطبيق</p>
            <p className="mt-1 text-xs text-muted-foreground">استراتيجية، تصميم، وتسليم منظم</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
