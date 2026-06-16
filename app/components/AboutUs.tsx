"use client"

import { motion } from "framer-motion"
import Image from "next/image" // استيراد مكون Image

export default function AboutUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          من نحن
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-3xl font-bold mb-4 text-white">في تاج ستوديو، نعيش التصميم بكل تفاصيله.</h3>
            <p className="text-gray-300 mb-6">
              منذ عام 2013، ونحن نضع بصمتنا في عالم الإبداع، بتعاون مستمر مع شركات ومؤسسات في المملكة العربية السعودية،
              وشراكاتنا في ازدياد يوم بعد يوم — لأن ثقة عملائنا هي رأس مالنا الحقيقي.
            </p>

            <h4 className="text-2xl font-semibold mb-4 text-white">خبرتنا المتنوعة تشمل:</h4>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 pr-4">
              <li>تصميم الهويات البصرية والشعارات</li>
              <li>تصاميم السوشيال ميديا</li>
              <li>تصميم الباكجينج والمطبوعات</li>
              <li>إعداد بورتفوليو الشركات والعلامات التجارية</li>
            </ul>

            <p className="text-gray-300 mb-6">
              نحن فريق متعدد المواهب في مجالات التصميم الإبداعي بكل أنواعه، نخدمك بجودة، التزام، ونظرة فنية تواكب السوق
              وتخاطب جمهورك.
            </p>

            <p className="text-gray-300 mb-6">نعمل من جمهورية مصر العربية، لكن تأثير شغلنا يتعدى الحدود.</p>

            <p className="text-gray-300">
              في تاج ستوديو، نؤمن إن التصميم ما هو بس شكل جميل… هو أداة حقيقية للتأثير والتواصل.
            </p>
          </motion.div>
          <motion.div
            className="relative h-96"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform rotate-3"></div>
            <div className="absolute inset-0 bg-gray-800 rounded-lg transform -rotate-3 flex items-center justify-center overflow-hidden">
              {/* استبدال النص بالصورة */}
              <Image
                src="/images/about-us-placeholder.avif"
                alt="صورة توضيحية لتاج ستوديو"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
