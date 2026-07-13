"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const features = [
  {
    title: "الهوية البصرية",
    description:
      "تصميم هوية بصرية متكاملة تعكس شخصية علامتك التجارية وتميزها عن المنافسين.",
    icon: "/images/identity.avif",
    href: "/services/visual-identity",
  },
  {
    title: "تصميمات السوشيال ميديا",
    description:
      "تصميمات جذابة ومنظمة لمنصات التواصل تحافظ على هوية العلامة ووضوح رسالتها.",
    icon: "/images/social-media.avif",
    href: "/services/social-media-design",
  },
  {
    title: "تصاميم المطبوعات",
    description:
      "تصميم بروشورات وكتالوجات وبروفايلات ومواد مطبوعة جاهزة للتنفيذ باحترافية.",
    icon: "/images/prints.avif",
    href: "/services/print-design",
  },
  {
    title: "فيديو موشن جرافيك",
    description:
      "فيديوهات تعريفية وإعلانية تشرح فكرتك بأسلوب بصري واضح ومتوافق مع علامتك.",
    icon: "/images/motion.avif",
    href: "/services/motion-graphics",
  },
]

export default function FeatureCarousel() {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const controls = useAnimation()

  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        setWidth(
          Math.max(
            carousel.current.scrollWidth - carousel.current.offsetWidth,
            0
          )
        )
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)

    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const handleDragEnd = () => {
    const currentX = x.get()

    if (currentX < 0) {
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      })
    } else if (currentX > width) {
      controls.start({
        x: width,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      })
    }
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-gradient-to-b from-background to-secondary/20 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-semibold text-primary">حلول بصرية متكاملة</p>
          <h2
            id="services-heading"
            className="mt-2 text-3xl font-bold text-foreground"
          >
            خدماتنا
          </h2>
        </div>

        <motion.div ref={carousel} className="cursor-grab overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ right: width, left: 0 }}
            whileTap={{ cursor: "grabbing" }}
            animate={controls}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="flex"
          >
            {features.map((feature) => (
              <motion.article
                key={feature.href}
                className="m-4 flex h-[420px] min-w-[300px] flex-col justify-between rounded-3xl border-2 border-transparent bg-background p-8 shadow-lg transition-all duration-300 ease-in-out hover:border-primary/10"
              >
                <div className="text-center">
                  <div className="mb-4 flex h-24 items-center justify-center">
                    <Image
                      src={feature.icon}
                      alt=""
                      width={320}
                      height={320}
                      sizes="160px"
                      className="h-40 w-40 object-contain"
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href={feature.href}
                    className="inline-flex items-center font-semibold text-primary hover:underline"
                    aria-label={`اعرف المزيد عن ${feature.title}`}
                  >
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    اعرف المزيد
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
