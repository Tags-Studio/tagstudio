"use client"

import { motion } from "framer-motion"
import Link from "next/link" // استيراد Link

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
          <motion.h1
            className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">تاج ستوديو</span>{" "}
            <span className="block text-xl sm:text-2xl font-semibold text-muted-foreground mt-3">نصنع هويات بصرية تترك أثرًا — من القاهرة إلى الرياض</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            نحن نصنع انطباعاً أولاً لا ينسى. وكالة تصميم جرافيك رائدة تقدم هويات بصرية متكاملة وشعارات مبتكرة تعكس رؤية 2030 وترتقي بأعمالك التجارية والطبية في السعودية والخليج.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* تعديل زر "استكشف أعمالنا" للمرور إلى قسم الأعمال */}
            <Link
              href="#portfolio-grid" // ID القسم المالي لمرور التمرير السلس
              className="apple-button"
              scroll={true} // تفعيل التمرير السلس
            >
              استكشف أعمالنا
            </Link>
          </motion.div>
          
          {/* شريط إحصائيات الثقة */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 border-t border-border/40 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">+10</p>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground mt-1">سنوات خبرة</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">+200</p>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground mt-1">عميل سعيد</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">الخليج ومصر</p>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground mt-1">حضور إقليمي</p>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mx-auto mt-16 lg:mt-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <img
              src="/images/hero-concept.webp"
              alt="مفهوم تصميم تاج ستوديو"
              width={600}
              height={600}
              className="w-[500px] rounded-2xl shadow-xl ring-1 ring-gray-900/10"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
