"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "الاستكشاف (Discovery)",
    description: "نجلس معك لنفهم طبيعة نشاطك التجاري، نحلل منافسيك، ونحدد جمهورك المستهدف لنضع أساساً متيناً للهوية.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    title: "الاستراتيجية (Strategy)",
    description: "نقوم ببناء لوحة الألوان المناسبة لسيكولوجية عملائك، وتحديد الخطوط والتوجه البصري العام للعلامة التجارية.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    number: "03",
    title: "التصميم الإبداعي (Design)",
    description: "نبدأ بالتنفيذ الفني وتطوير المقترحات الإبداعية المتكاملة للشعار والمطبوعات ومراجعتها وتعديلها معك حتى الرضا التام.",
    color: "from-pink-500 to-rose-500",
  },
  {
    number: "04",
    title: "التسليم والتطبيق (Delivery)",
    description: "نسلمك كافة الملفات المصدرية المفتوحة والجاهزة للطباعة والاستخدام الرقمي بجودة Vector فائقة وصيغ متعددة.",
    color: "from-emerald-500 to-teal-500",
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
}

export default function Process() {
  return (
    <section className="py-20 bg-secondary/10 relative overflow-hidden">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ⚙️ كيف نعمل في تاج ستوديو؟
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            آلية عمل واضحة تضمن تميز علامتك
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ندير كل مشروع بأسلوب علمي ومنهجي يضمن انتقال أفكارك إلى واقع بصري ملموس يحقق أهدافك البيعية والتسويقية.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-8 bg-background rounded-3xl border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 group hover-lift overflow-hidden flex flex-col justify-between"
            >
              {/* Top gradient highlight hover bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${step.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right`} />

              <div>
                {/* Step number with gradient background */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-extrabold text-xl shadow-lg mb-6`}>
                  {step.number}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Decorative background index numbers */}
              <div className="absolute -bottom-8 -left-8 text-8xl font-black text-foreground/[0.03] select-none pointer-events-none group-hover:text-primary/[0.05] transition-colors duration-300">
                {step.number}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
