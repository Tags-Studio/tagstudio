"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Calculator, 
  Paintbrush, 
  ChevronLeft, 
  ArrowRight,
  Sparkles,
  Settings,
  ShieldCheck,
  Contrast,
  Heart,
  Smartphone,
  Layers
} from "lucide-react"

export default function ToolsIndex() {
  const tools = [
    {
      title: "حاسبة ميزانية الإعلانات",
      desc: "احسب ميزانية إعلاناتك على فيسبوك وتيك توك وجوجل بدقة بناءً على مبيعاتك المستهدفة ومتوسط سعر خدمتك أو منتجك.",
      icon: Calculator,
      href: "/tools/ads-budget-calculator",
      badge: "مجاني وتفاعلي",
      color: "from-blue-500/20 to-indigo-500/20 text-primary border-primary/20",
      cta: "احسب ميزانيتك الآن"
    },
    {
      title: "مُولّد ألوان الهوية البصرية",
      desc: "ولد لوحة ألوان هويتك البصرية وخطوطها المتوافقة تلقائياً حسب مجال عملك وقاعدة (60-30-10) وعاينها حياً على كروت عمل ومواقع وبوستات.",
      icon: Paintbrush,
      href: "/tools/palette-generator",
      badge: "مستشار الألوان الذكي",
      color: "from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/20",
      cta: "ابدأ بتوليد لوحتك"
    },
    {
      title: "أداة اختبار تناسق ألوان الهوية",
      desc: "افحص نسبة تباين ألوان هويتك البصرية الحالية وتأكد من سهولة قراءتها ومطابقتها لمعايير الويب العالمية WCAG للتباين الرقمي.",
      icon: Contrast,
      href: "/tools/color-contrast-checker",
      badge: "فاحص تباين الألوان",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-500 border-emerald-500/20",
      cta: "افحص تباين ألوانك"
    },
    {
      title: "حاسبة العائد لإعلانات العيادات",
      desc: "احسب عدد المرضى المتوقعين، تكلفة اكتساب المريض وصافي الأرباح المتوقعة لعيادتك بناءً على ميزانيتك الإعلانية وتخصصك الطبي.",
      icon: Heart,
      href: "/tools/medical-roi-calculator",
      badge: "خاص بالقطاع الطبي",
      color: "from-rose-500/20 to-pink-500/20 text-rose-500 border-rose-500/20",
      cta: "احسب العائد لعيادتك"
    },
    {
      title: "معاين المقاسات والمناطق الآمنة",
      desc: "ارفع تصميمك وجرّبه داخل قوالب إنستغرام وتيك توك وسناب شات الحقيقية لتتأكد من عدم حجب النصوص أو الشعار بواجهة المنصة.",
      icon: Smartphone,
      href: "/tools/safe-area-previewer",
      badge: "معاين السوشيال ميديا",
      color: "from-purple-500/20 to-fuchsia-500/20 text-purple-500 border-purple-500/20",
      cta: "عاين مقاسات تصميمك"
    },
    {
      title: "تقسيم الصور لشبكة إنستغرام",
      desc: "اقسم صورتك العريضة والبانورامية إلى أجزاء متساوية تتراصف بدقة في شبكة حسابك، ونزلها مجمعة داخل ملف مضغوط ZIP بنقرة واحدة.",
      icon: Layers,
      href: "/tools/instagram-grid-splitter",
      badge: "مقسم صور الشبكة",
      color: "from-cyan-500/20 to-teal-500/20 text-cyan-500 border-cyan-500/20",
      cta: "اقسم صورتك الآن"
    }
  ]

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/95 to-background/90 text-foreground">
      
      {/* Header section */}
      <div className="max-w-5xl mx-auto text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2"
        >
          <Settings className="h-4 w-4" />
          <span>أدوات تاج ستوديو الرقمية</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black tracking-tight"
        >
          مجموعة الأدوات التسويقية والتصميمية
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          أدوات وتطبيقات تفاعلية مجانية تم تطويرها بواسطة فريق تاج ستوديو الإبداعي لمساعدتك على اتخاذ القرارات الصحيحة بشأن تصميم هويتك وإدارة ميزانيتك الإعلانية.
        </motion.p>
      </div>

      {/* Grid listing the tools */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => {
          const Icon = tool.icon
          return (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-card border border-border/60 hover:border-primary/40 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Header card info */}
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-2xl border bg-gradient-to-br ${tool.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted border border-border/60 text-muted-foreground">
                    {tool.badge}
                  </span>
                </div>

                <div className="space-y-2 text-right">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 mt-6">
                <Link
                  href={tool.href}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-muted/60 hover:bg-primary hover:text-white font-bold text-xs transition-all duration-300"
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="h-4 w-4 rotate-180 group-hover:translate-x-[-4px] transition-transform" />
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Trust banner */}
      <div className="max-w-5xl mx-auto mt-16 p-6 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="font-bold text-sm">بياناتك دائماً آمنة ومحمية</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            جميع العمليات الحسابية والخيارات التي تجريها على هذه الأدوات تتم محلياً على متصفحك بشكل آمن 100% ولا نشاركها أو نحتفظ بها على أي خوادم خارجية.
          </p>
        </div>
      </div>

    </div>
  )
}
