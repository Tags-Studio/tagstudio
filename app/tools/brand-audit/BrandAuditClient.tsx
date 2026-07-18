"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
  {
    id: 1,
    text: "هل هويتك البصرية (الشعار، الألوان) تم تصميمها بناءً على دراسة لجمهورك المستهدف أم بناءً على ذوقك الشخصي؟",
    options: [
      { text: "بناءً على دراسة للسوق", score: 20 },
      { text: "ذوقي الشخصي ومصمم حر", score: 5 },
      { text: "لا أمتلك هوية بصرية حتى الآن", score: 0 },
    ]
  },
  {
    id: 2,
    text: "هل تمتلك (Brand Guidelines) لضمان استخدام الألوان والخطوط بشكل موحد في جميع المطبوعات؟",
    options: [
      { text: "نعم، أمتلك دليلاً شاملاً", score: 20 },
      { text: "لا، نعتمد على ملف الشعار فقط", score: 5 },
    ]
  },
  {
    id: 3,
    text: "عندما يرى عملاؤك تصميماتك على السوشيال ميديا، هل يتعرفون عليها فوراً دون رؤية الشعار؟",
    options: [
      { text: "نعم، الأسلوب البصري واضح جداً", score: 20 },
      { text: "أحياناً، لكن ليس دائماً", score: 10 },
      { text: "لا، تصاميمنا متغيرة وغير متناسقة", score: 0 },
    ]
  },
  {
    id: 4,
    text: "كيف يبدو مظهر مطبوعاتك أو تغليف منتجاتك مقارنة بأقوى 3 منافسين لك؟",
    options: [
      { text: "أفضل وأكثر احترافية منهم", score: 20 },
      { text: "مشابه لهم تماماً", score: 10 },
      { text: "أضعف منهم وبحاجة لتحديث", score: 0 },
    ]
  },
  {
    id: 5,
    text: "هل تشعر أن تصميم هويتك الحالي يسمح لك برفع أسعار خدماتك بكل ثقة؟",
    options: [
      { text: "نعم بكل تأكيد", score: 20 },
      { text: "ربما، ولكن يحتاج تعديلات", score: 10 },
      { text: "لا، المظهر الحالي لا يدعم الأسعار المرتفعة", score: 0 },
    ]
  }
]

export default function BrandAuditClient() {
  const [currentStep, setCurrentStep] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const handleAnswer = (score: number) => {
    setTotalScore((prev) => prev + score)
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  const getResult = () => {
    if (totalScore >= 80) return { title: "هوية قوية!", desc: "أنت على الطريق الصحيح. هويتك البصرية جاهزة لتدعم نمو مبيعاتك.", color: "text-emerald-500" }
    if (totalScore >= 50) return { title: "تحتاج تحديث (Rebranding)", desc: "علامتك التجارية جيدة، ولكنها تفقد بعض العملاء بسبب عدم الاتساق. تحديث بسيط (Rebranding) سيصنع الفارق.", color: "text-amber-500" }
    return { title: "هوية ضعيفة (خطر على المبيعات)", desc: "مظهرك الحالي يعطي انطباعاً غير احترافي ويؤثر سلباً على قرارات العملاء. أنت بحاجة ماسة لهوية بصرية جديدة.", color: "text-red-500" }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-10 shadow-xl border border-zinc-200 dark:border-zinc-800">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <span className="text-sm font-bold text-zinc-400">
                سؤال {currentStep + 1} من {questions.length}
              </span>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-2 leading-relaxed">
                {questions[currentStep].text}
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full text-right p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 hover:bg-zinc-50 dark:hover:border-white dark:hover:bg-zinc-800 transition-all font-semibold text-lg text-zinc-700 dark:text-zinc-300"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">نتيجة التقييم:</h2>
            <h3 className={\`text-4xl font-black \${getResult().color} mb-6\`}>
              {getResult().title}
            </h3>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              {getResult().desc}
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl mb-8 border border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-800 dark:text-zinc-200 font-semibold">
                هل تريد مناقشة هذا التقرير وكيفية معالجة الفجوات البصرية في مشروعك؟
              </p>
            </div>
            <a
              href={\`https://wa.me/201009215131?text=\${encodeURIComponent(
                \`مرحباً تاج ستوديو، لقد قمت بعمل تقييم الهوية البصرية وحصلت على (\${getResult().title}). أود مناقشة كيفية تحسين هويتي.\`
              )}\`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
            >
              ناقش النتيجة معنا عبر واتساب
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
