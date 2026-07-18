"use client"

import { motion } from "framer-motion"

export default function WearYourStory() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">تاج ستوديو — نظام بصري احترافي</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            هويتك البصرية هي أول انطباع بيكسبه عميلك المحتمل. لو الشكل مش واضح أو مش موحّد، بتخسر ثقة قبل ما حتى تبدأ المحادثة. إحنا في تاج ستوديو بنبني لك نظام بصري كامل ومتناسق يخليك تظهر باحترافية في كل نقطة تواصل مع عملائك — من الشعار للمطبوعات للسوشيال ميديا.
          </p>
          {/* تم حذف زر "استكشف المجموعة" بالكامل */}
        </motion.div>
      </div>
    </section>
  )
}
