"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  Layers,
  Search,
  SlidersHorizontal,
  RefreshCw
} from "lucide-react"

interface ToolItem {
  title: string
  desc: string
  icon: any
  href: string
  badge: string
  color: string
  category: "design" | "marketing"
  cta: string
}

export default function ToolsIndex() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const tools: ToolItem[] = [
    {
      title: "حاسبة ميزانية الإعلانات",
      desc: "احسب ميزانية إعلاناتك على فيسبوك وتيك توك وجوجل بدقة بناءً على مبيعاتك المستهدفة ومتوسط سعر خدمتك أو منتجك.",
      icon: Calculator,
      href: "/tools/ads-budget-calculator",
      badge: "مجاني وتفاعلي",
      color: "from-blue-500/20 to-indigo-500/20 text-blue-500 border-blue-500/20 hover:shadow-blue-500/10",
      category: "marketing",
      cta: "احسب ميزانيتك الآن"
    },
    {
      title: "مُولّد ألوان الهوية البصرية",
      desc: "ولد لوحة ألوان هويتك البصرية وخطوطها المتوافقة تلقائياً حسب مجال عملك وقاعدة (60-30-10) وعاينها حياً على كروت عمل ومواقع وبوستات.",
      icon: Paintbrush,
      href: "/tools/palette-generator",
      badge: "مستشار الألوان الذكي",
      color: "from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/20 hover:shadow-amber-500/10",
      category: "design",
      cta: "ابدأ بتوليد لوحتك"
    },
    {
      title: "أداة اختبار تناسق ألوان الهوية",
      desc: "افحص نسبة تباين ألوان هويتك البصرية الحالية وتأكد من سهولة قراءتها ومطابقتها لمعايير الويب العالمية WCAG للتباين الرقمي.",
      icon: Contrast,
      href: "/tools/color-contrast-checker",
      badge: "فاحص تباين الألوان",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-500 border-emerald-500/20 hover:shadow-emerald-500/10",
      category: "design",
      cta: "افحص تباين ألوانك"
    },
    {
      title: "حاسبة العائد لإعلانات العيادات",
      desc: "احسب عدد المرضى المتوقعين، تكلفة اكتساب المريض وصافي الأرباح المتوقعة لعيادتك بناءً على ميزانيتك الإعلانية وتخصصك الطبي.",
      icon: Heart,
      href: "/tools/medical-roi-calculator",
      badge: "خاص بالقطاع الطبي",
      color: "from-rose-500/20 to-pink-500/20 text-rose-500 border-rose-500/20 hover:shadow-rose-500/10",
      category: "marketing",
      cta: "احسب العائد لعيادتك"
    },
    {
      title: "معاين المقاسات والمناطق الآمنة",
      desc: "ارفع تصميمك وجرّبه داخل قوالب إنستغرام وتيك توك وسناب شات الحقيقية لتتأكد من عدم حجب النصوص أو الشعار بواجهة المنصة.",
      icon: Smartphone,
      href: "/tools/safe-area-previewer",
      badge: "معاين السوشيال ميديا",
      color: "from-purple-500/20 to-fuchsia-500/20 text-purple-500 border-purple-500/20 hover:shadow-purple-500/10",
      category: "design",
      cta: "عاين مقاسات تصميمك"
    },
    {
      title: "تقسيم الصور لشبكة إنستغرام",
      desc: "اقسم صورتك العريضة والبانورامية إلى أجزاء متساوية تتراصف بدقة في شبكة حسابك، ونزلها مجمعة داخل ملف مضغوط ZIP بنقرة واحدة.",
      icon: Layers,
      href: "/tools/instagram-grid-splitter",
      badge: "مقسم صور الشبكة",
      color: "from-cyan-500/20 to-teal-500/20 text-cyan-500 border-cyan-500/20 hover:shadow-cyan-500/10",
      category: "design",
      cta: "اقسم صورتك الآن"
    }
  ]

  // Filter tools based on search term and active category tab
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", label: "كل الأدوات" },
    { id: "design", label: "التصميم والهوية" },
    { id: "marketing", label: "التسويق والإعلانات" }
  ]

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-foreground relative overflow-hidden">

      {/* Header section */}
      <div className="max-w-5xl mx-auto text-center mb-12 space-y-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2 border border-primary/15"
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
          أدوات تصميم وتسويق <span className="text-primary">تفاعلية مجانية</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          أدوات رقمية مجانية تم تطويرها بواسطة فريق تاج ستوديو الإبداعي لمساعدتك على اتخاذ القرارات الصحيحة بشأن تصميم هويتك وإدارة ميزانيتك الإعلانية.
        </motion.p>
      </div>

      {/* Controls Section: Search & Category Filter Tabs */}
      <div className="max-w-5xl mx-auto mb-12 space-y-6 relative z-10">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search Input Bar */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن أداة (مثال: ألوان، ميزانية، مقاسات...)"
              className="w-full pl-4 pr-12 py-3 rounded-2xl border border-border bg-card/65 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all text-sm font-semibold"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex gap-1.5 p-1 bg-muted/40 border border-border/60 rounded-2xl w-full sm:w-auto overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                  activeCategory === cat.id 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Grid listing the tools */}
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredTools.length === 0 ? (
            /* Empty Search Results state */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16 bg-card/45 backdrop-blur-md border border-border/60 rounded-3xl space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">لم نجد أي نتائج متطابقة</h3>
                <p className="text-xs text-muted-foreground">تأكد من كتابة الكلمات بشكل صحيح أو قم بإعادة ضبط البحث.</p>
              </div>
              <button
                onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-background hover:bg-accent text-xs font-bold transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>إعادة ضبط التصفية</span>
              </button>
            </motion.div>
          ) : (
            /* Tools Grid displaying cards */
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTools.map((tool) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.href}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-card/65 backdrop-blur-md border border-border/60 hover:border-primary/40 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Hover Top Glow Line */}
                    <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-primary to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="space-y-6">
                      {/* Header card info */}
                      <div className="flex items-center justify-between">
                        <div className={`p-3.5 rounded-2xl border bg-gradient-to-br transition-all duration-300 group-hover:scale-105 ${tool.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-muted border border-border/60 text-muted-foreground">
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
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-muted/60 hover:bg-primary hover:text-white font-bold text-xs transition-all duration-350"
                      >
                        <span>{tool.cta}</span>
                        <ArrowRight className="h-4 w-4 rotate-180 group-hover:translate-x-[-4px] transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust banner */}
      <div className="max-w-5xl mx-auto mt-16 p-6 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right relative z-10">
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
