"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Calculator, 
  ChevronLeft, 
  Check, 
  Send, 
  HelpCircle, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target
} from "lucide-react"

// Cost Per Click constants
const CPC_PRESETS: Record<string, { meta: number, tiktok: number, google: number, symbol: string, label: string }> = {
  SAR: { meta: 1.2, tiktok: 0.9, google: 2.2, symbol: "ر.س", label: "ريال سعودي / شهرياً" },
  EGP: { meta: 3.5, tiktok: 2.5, google: 6.0, symbol: "ج.م", label: "جنيه مصري / شهرياً" }
}

// Sector split ratios
const SECTOR_SPLITS: Record<string, { meta: number, tiktok: number, google: number }> = {
  general: { meta: 0.45, tiktok: 0.30, google: 0.25 },
  medical: { meta: 0.55, tiktok: 0.15, google: 0.30 },
  education: { meta: 0.40, tiktok: 0.35, google: 0.25 }
}

export default function AdsBudgetCalculator() {
  const [sales, setSales] = useState<number>(100)
  const [price, setPrice] = useState<number>(150)
  const [currency, setCurrency] = useState<"SAR" | "EGP">("SAR")
  const [cvr, setCvr] = useState<number>(2.0)
  const [sector, setSector] = useState<"general" | "medical" | "education">("general")

  // Calculated values
  const [results, setResults] = useState({
    totalBudget: 0,
    budgetMeta: 0,
    budgetTiktok: 0,
    budgetGoogle: 0,
    clicksNeeded: 0,
    cpa: 0,
    revenue: 0
  })

  useEffect(() => {
    const cpc = CPC_PRESETS[currency]
    const split = SECTOR_SPLITS[sector]
    const cvrFrac = cvr / 100

    const clicksNeeded = cvrFrac > 0 ? sales / cvrFrac : 0

    const clicksMeta = clicksNeeded * split.meta
    const clicksTiktok = clicksNeeded * split.tiktok
    const clicksGoogle = clicksNeeded * split.google

    const budgetMeta = clicksMeta * cpc.meta
    const budgetTiktok = clicksTiktok * cpc.tiktok
    const budgetGoogle = clicksGoogle * cpc.google
    const totalBudget = budgetMeta + budgetTiktok + budgetGoogle

    const cpa = sales > 0 ? totalBudget / sales : 0
    const revenue = sales * price

    setResults({
      totalBudget,
      budgetMeta,
      budgetTiktok,
      budgetGoogle,
      clicksNeeded,
      cpa,
      revenue
    })
  }, [sales, price, currency, cvr, sector])

  const fmt = (n: number) => {
    return Math.round(n).toLocaleString("en-US")
  }

  // Calculate SVG arc parameters
  const getArcPath = (startFrac: number, endFrac: number) => {
    const r = 50
    const circ = 2 * Math.PI * r
    const len = (endFrac - startFrac) * circ
    const strokeDasharray = `${len} ${circ - len}`
    const strokeDashoffset = -(startFrac * circ)
    return { strokeDasharray, strokeDashoffset }
  }

  const cpc = CPC_PRESETS[currency]
  const split = SECTOR_SPLITS[sector]

  // Gauge arcs calculation
  const arcMeta = getArcPath(0, split.meta)
  const arcTiktok = getArcPath(split.meta, split.meta + split.tiktok)
  const arcGoogle = getArcPath(split.meta + split.tiktok, 1)

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/95 to-background/90 text-foreground">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto mb-6">
        <a 
          href="/tools" 
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent text-sm font-semibold transition-colors"
        >
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span>العودة لصفحة الأدوات</span>
        </a>
      </div>

      {/* Hero Header */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/95 via-slate-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-primary/20">
          {/* Subtle light effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-bold border border-white/15">
              🛠️ أدوات تاج ستوديو
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              حاسبة ميزانية الإعلانات
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              حدد مبيعاتك المستهدفة وسعر منتجك، وستخبرك الأداة بالميزانية التقريبية التي تحتاجها للإعلان على فيسبوك وتيك توك وجوجل، مع توزيع مقترح لكل منصة.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls */}
        <div className="md:col-span-7 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Target Sales Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-sm font-bold text-foreground">عدد المبيعات أو الحجوزات المستهدفة شهرياً</label>
              <span className="font-mono font-bold text-lg text-primary">{sales}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="2000" 
              step="10" 
              value={sales} 
              onChange={(e) => setSales(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
            />
            <span className="block text-xs text-muted-foreground">كم عملية بيع أو حجز طبي تريد تحقيقها كل شهر؟</span>
          </div>

          {/* Product Price Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground">سعر المنتج أو الخدمة</label>
            <div className="relative">
              <input 
                type="number" 
                value={price} 
                min="1"
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-2xl border border-border/80 bg-background text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-base"
              />
              <span className="absolute left-4 top-3.5 font-bold text-xs text-muted-foreground">{cpc.symbol}</span>
            </div>
            <span className="block text-xs text-muted-foreground">متوسط قيمة العملية أو الخدمة للوحدة الواحدة.</span>
          </div>

          {/* Currency Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground">العملة المفضلة</label>
            <div className="flex gap-2 p-1 bg-muted/40 border border-border/50 rounded-2xl">
              <button
                onClick={() => setCurrency("SAR")}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  currency === "SAR" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ﷼ ريال سعودي
              </button>
              <button
                onClick={() => setCurrency("EGP")}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  currency === "EGP" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ج.م جنيه مصري
              </button>
            </div>
          </div>

          {/* Expected CVR Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-sm font-bold text-foreground">معدل التحويل المتوقع (من نقرة إلى عملية بيع)</label>
              <span className="font-mono font-bold text-lg text-primary">{cvr.toFixed(1)}%</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="8" 
              step="0.1" 
              value={cvr} 
              onChange={(e) => setCvr(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
            />
            <span className="block text-xs text-muted-foreground">
              إذا لم تكن متأكداً، اترك القيمة الافتراضية 2.0% وهي متوسط واقعي لمعظم الأنشطة.
            </span>
          </div>

          {/* Industry/Sector Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground">القطاع</label>
            <div className="flex gap-2 p-1 bg-muted/40 border border-border/50 rounded-2xl flex-wrap sm:flex-nowrap">
              <button
                onClick={() => setSector("general")}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                  sector === "general" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                عام
              </button>
              <button
                onClick={() => setSector("medical")}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                  sector === "medical" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                عيادات طبية
              </button>
              <button
                onClick={() => setSector("education")}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                  sector === "education" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                مراكز تدريب وتعليم
              </button>
            </div>
            <span className="block text-xs text-muted-foreground">
              يضبط توزيع الميزانية بين المنصات حسب سلوك جمهور القطاع.
            </span>
          </div>

        </div>

        {/* Right Column: Calculations & Results */}
        <div className="md:col-span-5 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/5 space-y-6 md:sticky md:top-24">
          
          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 font-semibold block">الميزانية الإعلانية الشهرية التقريبية</span>
            <h2 className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              {fmt(results.totalBudget)} <span className="text-lg font-bold text-white">{cpc.symbol}</span>
            </h2>
            <span className="text-xs text-zinc-500 block">{cpc.label}</span>
          </div>

          <div className="border-t border-white/10 my-4"></div>

          {/* SVG Gauge Graphic */}
          <div className="flex items-center gap-6">
            <svg width="100" height="100" viewBox="0 0 120 120" className="flex-shrink-0">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="14"/>
              
              {/* Meta Arc (Blue) */}
              <circle 
                cx="60" cy="60" r="50" fill="none" 
                stroke="#1877F2" stroke-width="14" stroke-linecap="round" 
                transform="rotate(-90 60 60)"
                strokeDasharray={arcMeta.strokeDasharray}
                strokeDashoffset={arcMeta.strokeDashoffset}
              />
              
              {/* Tiktok Arc (Gold) */}
              <circle 
                cx="60" cy="60" r="50" fill="none" 
                stroke="#E4C158" stroke-width="14" stroke-linecap="round" 
                transform="rotate(-90 60 60)"
                strokeDasharray={arcTiktok.strokeDasharray}
                strokeDashoffset={arcTiktok.strokeDashoffset}
              />
              
              {/* Google Arc (Red/SkyBlue) */}
              <circle 
                cx="60" cy="60" r="50" fill="none" 
                stroke="#FF4B4B" stroke-width="14" stroke-linecap="round" 
                transform="rotate(-90 60 60)"
                strokeDasharray={arcGoogle.strokeDasharray}
                strokeDashoffset={arcGoogle.strokeDashoffset}
              />
            </svg>
            
            {/* Legend breakdown */}
            <div className="flex-1 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2] inline-block"></span>
                  <span>فيسبوك وإنستغرام</span>
                </span>
                <span className="font-mono font-bold text-white">{fmt(results.budgetMeta)} {cpc.symbol}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E4C158] inline-block"></span>
                  <span>تيك توك</span>
                </span>
                <span className="font-mono font-bold text-white">{fmt(results.budgetTiktok)} {cpc.symbol}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4B4B] inline-block"></span>
                  <span>جوجل</span>
                </span>
                <span className="font-mono font-bold text-white">{fmt(results.budgetGoogle)} {cpc.symbol}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 my-4"></div>

          {/* Other stats */}
          <div className="space-y-3 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>عدد النقرات المطلوبة تقريباً:</span>
              <span className="font-mono font-bold text-white">{fmt(results.clicksNeeded)} نقرة</span>
            </div>
            <div className="flex justify-between">
              <span>تكلفة اكتساب العميل الواحد (CPA):</span>
              <span className="font-mono font-bold text-white">{fmt(results.cpa)} {cpc.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span>الإيراد المتوقع من هذه الميزانية:</span>
              <span className="font-mono font-bold text-white">{fmt(results.revenue)} {cpc.symbol}</span>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl p-5 space-y-4">
            <p className="text-xs text-zinc-200 leading-relaxed">
              هل تريد تحقيق أقصى استفادة من هذه الميزانية؟ دعنا نصمم لك إعلانات وفيديو موشن جرافيك يضمن لك أعلى معدل تحويل.
            </p>
            <a 
              href="https://www.wearetagstudio.com/#contact-form"
              className="inline-flex justify-center items-center w-full py-3 rounded-xl bg-amber-400 hover:bg-white text-slate-950 font-bold text-xs transition-colors"
            >
              احجز استشارة مجانية ←
            </a>
          </div>

        </div>

      </div>

      {/* How it works grid */}
      <div className="max-w-5xl mx-auto mt-16 space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <span>كيف تحسب الأداة الميزانية؟</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <span className="font-mono font-extrabold text-amber-500 text-xs">01</span>
            <h3 className="font-bold text-foreground">نحدد عدد النقرات المطلوبة</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              نقسم عدد المبيعات المستهدفة على معدل التحويل، لنعرف كم نقرة إعلانية تحتاجها فعلياً للوصول لهذا الرقم.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <span className="font-mono font-extrabold text-amber-500 text-xs">02</span>
            <h3 className="font-bold text-foreground">نطبق متوسط تكلفة النقرة</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              نستخدم متوسطات تكلفة النقرة الفعلية لكل منصة في السوق السعودي والمصري لحساب الميزانية اللازمة.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <span className="font-mono font-extrabold text-amber-500 text-xs">03</span>
            <h3 className="font-bold text-foreground">نوزّع الميزانية على المنصات</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              نقترح توزيعاً مبنياً على سلوك جمهور قطاعك بين فيسبوك وإنستغرام وتيك توك وجوجل.
            </p>
          </div>
        </div>
      </div>

      {/* Footer warning */}
      <footer className="max-w-5xl mx-auto mt-12 text-center text-[10px] text-muted-foreground">
        الأرقام في هذه الأداة تقديرية للاسترشاد الأولي، وتختلف النتائج الفعلية حسب جودة الإعلان والاستهداف. تاج ستوديو © 2026
      </footer>

    </div>
  )
}
