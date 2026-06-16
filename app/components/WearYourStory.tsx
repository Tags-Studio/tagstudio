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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">حياكم الله</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            في تاج استوديو، نؤمن بأن التصميم أكثر من ألوان وخطوط. هو تجربة، وهوية، وانطباع أول لا يُنسى.
          </p>
          {/* تم حذف زر "استكشف المجموعة" بالكامل */}
        </motion.div>
      </div>
    </section>
  )
}
