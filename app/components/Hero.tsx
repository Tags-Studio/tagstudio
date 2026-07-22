"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const trustPoints = [
  {
    title: "خبرة في بناء الهويات",
    detail: "منذ 2012",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l2.2 4.45 4.91.72-3.56 3.46.84 4.89L12 14.2l-4.39 2.32.84-4.89-3.56-3.46 4.91-.72L12 3z"
        />
      </svg>
    ),
  },
  {
    title: "تنفيذ للمشروعات",
    detail: "في السعودية ومصر",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
        />
        <circle cx="12" cy="10" r="2.25" />
      </svg>
    ),
  },
  {
    title: "ملفات منظمة وجاهزة",
    detail: "للطباعة والتطبيق",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 19c4.5-1 8.5-5 9.5-9.5L18 7l-1-4-4 1-2.5 2.5C6 7.5 2 11.5 1 16l5 3z"
        />
        <path strokeLinecap="round" d="M7.5 16.5l-2 2M14 6l4 4" />
      </svg>
    ),
  },
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-background">
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        aria-hidden="true"
      >
        <div className="absolute left-[-8rem] top-[-7rem] h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-10rem] top-[10rem] h-[26rem] w-[26rem] rounded-full bg-blue-500/5 blur-3xl" />
      </div>



      <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
        <div
          className="relative order-2 mx-auto w-full max-w-[590px] lg:order-2 lg:justify-self-end"
        >
          <motion.div
            className="relative aspect-square"
            initial={{ opacity: 0, x: -28, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileInView={{
              y: [0, -12, 0],
              rotateX: [0, 8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              perspective: "1200px",
              filter: "drop-shadow(0 32px 96px rgba(15,23,42,0.25)) drop-shadow(0 16px 48px rgba(15,23,42,0.15))",
            }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero%20%281%29-vxdjBwoZLOZsobDpLRP7NFtu6Jccc8.avif"
              alt="تصميم ثلاثي الأبعاد يرمز إلى خدمات الهوية البصرية في تاج ستوديو"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 48vw"
              className="object-contain p-3 sm:p-6"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-5 right-4 rounded-2xl border border-border/80 bg-background/95 px-5 py-4 shadow-xl backdrop-blur-md sm:right-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <p className="text-sm font-bold text-foreground">
              من الفكرة إلى هوية قابلة للتطبيق
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              استراتيجية، تصميم، وتسليم منظم
            </p>
          </motion.div>
        </div>

        <div className="order-1 max-w-2xl text-right lg:order-1 lg:justify-self-start">
          <motion.p
            className="mb-6 text-sm font-bold tracking-wide text-primary sm:text-base"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            تاج ستوديو — هوية وتصميم للشركات
          </motion.p>

          <motion.h1
            className="text-4xl font-black leading-relaxed sm:leading-normal tracking-tight text-foreground sm:text-5xl lg:text-[4rem]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.05 }}
          >
            <span className="block">نصمم هويات بصرية</span>
            <span className="block mt-2 sm:mt-4">تجعل مشروعك</span>
            <span className="block text-gradient mt-2 sm:mt-4">أوضح وأكثر ثقة</span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.14 }}
          >
            من الشعار إلى دليل الهوية والمطبوعات والمحتوى البصري، نبني
            للشركات في السعودية ومصر حضورًا متناسقًا وواضحًا وقابلًا للنمو.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-start gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.22 }}
          >
            <Link
              href="/#contact-form"
              className="apple-button min-w-[170px] px-8 py-3 text-center"
            >
              اطلب عرض سعر
            </Link>

            <Link
              href="/work"
              className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full border border-border bg-background px-8 py-3 font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              شاهد أعمالنا
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 5l-7 7 7 7"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.ul
            className="mt-11 grid gap-5 border-t border-border/70 pt-7 sm:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.32 }}
          >
            {trustPoints.map((point) => (
              <li key={point.title} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-primary">
                  {point.icon}
                </span>
                <span>
                  <span className="block text-sm font-bold leading-6 text-foreground">
                    {point.title}
                  </span>
                  <span className="block text-xs leading-5 text-muted-foreground">
                    {point.detail}
                  </span>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
