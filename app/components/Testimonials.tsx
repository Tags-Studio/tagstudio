"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    quote: "تطوير الهوية البصرية لجمعية التنمية الزراعية بالأحساء كان نقلة نوعية. صمم تاج ستوديو نمطاً يعكس التراث والتربة بأسلوب مؤسسي راقٍ حاز إعجاب الجميع.",
    author: "أ. حسن الشخص",
    position: "جمعية التنمية الزراعية بالأحساء - السعودية",
    image:
      "https://api.dicebear.com/8.x/initials/svg?seed=Hassan&backgroundColor=10b981,047857,065f46&backgroundType=gradientLinear",
    rating: 5,
  },
  {
    quote: "صمموا لنا هوية بصرية ممتعة ومليئة بالطاقة لمطعم برجر راجي. التغليف والعلب والأكواب كانت مميزة جداً وجذبت الزبائن من النظرة الأولى.",
    author: "أ. يوسف العلي",
    position: "مطعم برجر راجي - الرياض",
    image:
      "https://api.dicebear.com/8.x/initials/svg?seed=Youssef&backgroundColor=f97316,ea580c,c2410c&backgroundType=gradientLinear",
    rating: 5,
  },
  {
    quote: "نقلوا الروح الريفية الأصيلة لزعتر وسمسم بشكل بصري رائع. قائمة الطعام والعلب والتغليف الصديق للبيئة صُنعوا بعناية تامة وبألوان طبيعية ممتازة.",
    author: "أ. عبدالله ناصر",
    position: "مطعم زعتر وسمسم - مصر والسعودية",
    image:
      "https://api.dicebear.com/8.x/initials/svg?seed=Abdullah&backgroundColor=84cc16,65a30d,4d7c0f&backgroundType=gradientLinear",
    rating: 5,
  },
  {
    quote: "قدروا يبتكرون لنا هوية بحرية مميزة في Dive Hood، وشغلهم دائمًا متجدد ويُحدث فرقًا بصريًا رائعاً في جميع مطبوعاتنا ومعداتنا.",
    author: "أ. إبراهيم جمعة",
    position: "Dive Hood",
    image:
      "https://api.dicebear.com/8.x/initials/svg?seed=Ibrahim&backgroundColor=a855f7,f43f5e,fbbf24&backgroundType=gradientLinear",
    rating: 5,
  },
  {
    quote: "فريق مبدع في تصاميم السوشيال ميديا للمراكز الطبية. إدارة ممتازة لحساباتنا والالتزام بالضوابط الطبية مع إخراج فني يبعث الثقة في قلوب المرضى.",
    author: "د. مريم القحطاني",
    position: "المدير التنفيذي - المركز الطبي التخصصي",
    image:
      "https://api.dicebear.com/8.x/initials/svg?seed=Mariam&backgroundColor=0284c7,0369a1,075985&backgroundType=gradientLinear",
    rating: 5,
  },
  {
    quote: "تصاميم السوشيال ميديا كانت واضحة وتُخاطب طلابنا بلغتهم. يعرف الفريق ما يحتاجه قطاع التعليم والمدارس من هيبة ورزانة تليق بأولياء الأمور.",
    author: "أ. جوانه الشخص",
    position: "إدارة الاتصال - English Zone",
    image:
      "https://api.dicebear.com/8.x/initials/svg?seed=Joana&backgroundColor=a855f7,f43f5e,fbbf24&backgroundType=gradientLinear",
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1) // الافتراضي للهاتف
  const [direction, setDirection] = useState(0) // 0: لا يوجد اتجاه، 1: التالي، -1: السابق

  useEffect(() => {
    const updateItemsPerPage = () => {
      // عرض 3 عناصر على الشاشات الكبيرة (lg) وما فوق، وعنصر واحد على الشاشات الأصغر
      setItemsPerPage(window.innerWidth >= 1024 ? 3 : 1)
    }
    updateItemsPerPage() // تعيين القيمة الأولية
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  // حساب إجمالي عدد الصفحات بناءً على عدد العناصر لكل صفحة
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // متغيرات حركة Framer Motion
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000, // يدخل من اليمين إذا كان الاتجاه للأمام، ومن اليسار إذا كان للخلف
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000, // يخرج إلى اليمين إذا كان الاتجاه للخلف، وإلى اليسار إذا كان للأمام
      opacity: 0,
    }),
  }

  // حساب فهرس البداية والنهاية للشهادات المرئية حاليًا
  const startIndex = currentIndex * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, testimonials.length)
  const visibleTestimonials = testimonials.slice(startIndex, endIndex)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ماذا يقول عملاؤنا
        </motion.h2>
        <p className="text-lg text-gray-300 mb-16 text-center max-w-2xl mx-auto">
          نحن نفخر بالعمل الذي نقدمه والعلاقات التي نبنيها مع عملائنا. إليك بعض ما يقولونه عنا:
        </p>

        <div className="relative flex items-center justify-center">
          {/* زر السابق (يظهر على اليمين في RTL) */}
          <button
            onClick={handlePrev}
            className="absolute right-0 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden md:block"
            aria-label="الشهادة السابقة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="overflow-hidden w-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex} // يتغير المفتاح عند تغيير currentIndex لتشغيل الحركة
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                // تحديد تخطيط الشبكة بناءً على عدد العناصر لكل صفحة
                className={`grid gap-8 ${itemsPerPage === 3 ? "lg:grid-cols-3" : "grid-cols-1"}`}
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.author + index} // مفتاح فريد لكل شهادة في العرض الحالي
                    className="bg-gray-800 p-8 rounded-lg flex flex-col items-center text-center min-h-[300px] justify-center"
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 text-lg mb-6">"{testimonial.quote}"</p>
                    <div className="flex flex-col items-center mt-auto">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={60}
                        height={60}
                        className="rounded-full mb-3"
                      />
                      <div>
                        <p className="font-bold text-white text-lg">{testimonial.author}</p>
                        <p className="text-gray-400 text-base">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* زر التالي (يظهر على اليسار في RTL) */}
          <button
            onClick={handleNext}
            className="absolute left-0 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden md:block"
            aria-label="الشهادة التالية"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* المؤشرات الدائرية (تظهر دائمًا) */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-primary" : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`الانتقال إلى الشهادة ${index * itemsPerPage + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
