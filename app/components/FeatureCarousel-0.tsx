"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import Image from "next/image"
import Link from "next/link" // استيراد Link

const features = [
  {
    title: "الهوية البصرية",
    description: "تصميم هوية بصرية متكاملة تعكس شخصية علامتك التجارية وتميزها عن المنافسين.",
    icon: "/images/identity.avif",
    isImage: true,
    categorySlug: "الهوية البصرية", // إضافة slug للفئة
  },
  {
    title: "تصميمات السوشيال ميديا", // تم التعديل ليتطابق مع PortfolioGrid
    description: "تصاميم جذابة ومبتكرة لمنصات التواصل الاجتماعي تزيد من تفاعل جمهورك.",
    icon: "/images/social-media.avif",
    isImage: true,
    categorySlug: "تصميمات السوشيال ميديا", // إضافة slug للفئة
  },
  {
    title: "تصاميم المطبوعات",
    description: "تصميم مطبوعات عالية الجودة من بروشورات وكتالوجات وبطاقات أعمال احترافية.",
    icon: "/images/prints.avif",
    isImage: true,
    categorySlug: "تصاميم المطبوعات", // إضافة slug للفئة
  },
  {
    title: "فيديو موشن جرافيك", // تم التعديل ليتطابق مع PortfolioGrid
    description: "رسوم متحركة وفيديوهات تفاعلية تجذب الانتباه وتوصل رسالتك بطريقة مميزة.",
    icon: "/images/motion.avif",
    isImage: true,
    categorySlug: "فيديو موشن جرافيك", // إضافة slug للفئة
  },
]

export default function FeatureCarousel() {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const controls = useAnimation()

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  const handleDragEnd = () => {
    const currentX = x.get()
    if (currentX < 0) {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } })
    } else if (currentX > width) {
      controls.start({ x: width, transition: { type: "spring", stiffness: 300, damping: 30 } })
    }
  }

  return (
    <div className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">خدماتنا</h2>
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
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] h-[400px] p-8 m-4 bg-background rounded-3xl shadow-lg flex flex-col justify-between hover-lift transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary/10"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 flex items-center justify-center h-24">
                    <Image
                      src={feature.icon || "/placeholder.svg"}
                      alt={feature.title}
                      width={320}
                      height={320}
                      className="object-contain w-40 h-40"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
                <div className="mt-4 text-center">
                  {/* تعديل الرابط للتمرير إلى قسم الأعمال وتصفية الفئة */}
                  <Link
                    href={`/?category=${encodeURIComponent(feature.categorySlug)}#portfolio-grid`}
                    scroll={true}
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
