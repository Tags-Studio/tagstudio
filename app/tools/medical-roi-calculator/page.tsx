"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ChevronLeft, 
  Check, 
  Plus,
  Send,
  Heart,
  TrendingUp,
  DollarSign,
  Activity,
  Users,
  Target,
  Briefcase
} from "lucide-react"

// Types definitions
interface CPCConstants {
  avg: number
  symbol: string
  label: string
}

const CPC_PRESETS: Record<string, CPCConstants> = {
  SAR: { avg: 2.4, symbol: "ر.س", label: "ريال سعودي" },
  EGP: { avg: 7.0, symbol: "ج.م", label: "جنيه مصري" }
}

const SPECIALTY_CVR: Record<string, number> = {
  general: 0.025, // 2.5%
  dental: 0.02,   // 2.0%
  derma: 0.015,   // 1.5%
  physio: 0.03    // 3.0%
}

export default function MedicalROICalculator() {
  const [budget, setBudget] = useState<number>(8000)
  const [price, setPrice] = useState<number>(250)
  const [target, setTarget] = useState<number>(40)
  const [currency, setCurrency] = useState<"SAR" | "EGP">("SAR")
  const [specialty, setSpecialty] = useState<"general" | "dental" | "derma" | "physio">("general")
  const [scenario, setScenario] = useState<"current" | "target">("current")

  // Calculations states
  const [calcResults, setCalcResults] = useState({
    clicks: 0,
    cpa: 0,
    patients: 0,
    profit: 0,
    isProfit: true,
    budgetUsed: 0,
    revenue: 0,
    requiredBudget: 0,
    feasibilityType: "ok" as "ok" | "warn",
    feasibilityText: ""
  })

  useEffect(() => {
    const cpc = CPC_PRESETS[currency]
    const cvr = SPECIALTY_CVR[specialty]

    // scenario: current budget -> achievable patients
    const clicksFromBudget = budget / cpc.avg
    const patientsFromBudget = clicksFromBudget * cvr
    const cpaCurrent = patientsFromBudget > 0 ? budget / patientsFromBudget : 0
    const revenueCurrent = patientsFromBudget * price
    const profitCurrent = revenueCurrent - budget

    // scenario: target patients -> required budget
    const clicksForTarget = target / cvr
    const requiredBudget = clicksForTarget * cpc.avg
    const cpaTarget = target > 0 ? requiredBudget / target : 0
    const revenueTarget = target * price
    const profitTarget = revenueTarget - requiredBudget

    if (scenario === "current") {
      const isProfit = profitCurrent >= 0
      const isFeasible = patientsFromBudget >= target
      setCalcResults({
        clicks: clicksFromBudget,
        cpa: cpaCurrent,
        patients: patientsFromBudget,
        profit: Math.abs(profitCurrent),
        isProfit,
        budgetUsed: budget,
        revenue: revenueCurrent,
        requiredBudget,
        feasibilityType: isFeasible ? "ok" : "warn",
        feasibilityText: isFeasible 
          ? "ميزانيتك الحالية تكفي لتحقيق هدفك من الحالات الجديدة أو تتجاوزه." 
          : `ميزانيتك الحالية أقل من اللازم لتحقيق هدفك الكامل — بفارق ${Math.round(target - patientsFromBudget)} حالة تقريباً.`
      })
    } else {
      const isProfit = profitTarget >= 0
      const isFeasible = requiredBudget <= budget
      setCalcResults({
        clicks: clicksForTarget,
        cpa: cpaTarget,
        patients: target,
        profit: Math.abs(profitTarget),
        isProfit,
        budgetUsed: requiredBudget,
        revenue: revenueTarget,
        requiredBudget,
        feasibilityType: isFeasible ? "ok" : "warn",
        feasibilityText: isFeasible
          ? "ميزانيتك الحالية أعلى من أو تساوي المطلوب لتحقيق هذا الهدف بالكامل."
          : `تحتاج لزيادة ميزانيتك بمقدار ${Math.round(requiredBudget - budget).toLocaleString("en-US")} ${cpc.symbol} تقريباً لتحقيق هذا الهدف.`
      })
    }

  }, [budget, price, target, currency, specialty, scenario])

  const fmt = (n: number) => {
    return Math.round(n).toLocaleString("en-US")
  }

  const cpc = CPC_PRESETS[currency]

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
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <svg className="absolute left-6 bottom-6 opacity-10 pointer-events-none text-amber-400" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 21s-7-4.35-9.5-8.5C.7 9 2 5 6 5c2 0 3.2 1.2 4 2.4C10.8 6.2 12 5 14 5c4 0 5.3 4 3.5 7.5C15 16.65 12 21 12 21z"/>
            <path d="M4 12h3l1.5-3 2 5 1.5-3H15" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-bold border border-white/15">
              🩺 أدوات تاج ستوديو — خاص بالقطاع الطبي
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              حاسبة العائد الاستثماري لإعلانات العيادات
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              أدخل ميزانيتك الإعلانية الشهرية، متوسط سعر الكشف، وعدد الحالات الجديدة التي تطمح لجذبها — وستحسب لك الأداة عدد النقرات المطلوبة، وتكلفة المريض الواحد، وصافي الأرباح المتوقعة.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form inputs */}
        <div className="md:col-span-7 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Monthly Budget Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-sm font-bold text-foreground">الميزانية الإعلانية الشهرية المتوقعة</label>
              <span className="font-mono font-bold text-lg text-primary">{fmt(budget)} {cpc.symbol}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="500" 
              value={budget} 
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
            />
            <span className="block text-xs text-muted-foreground">
              المبلغ الذي تخطط لصرفه شهرياً على منصات التواصل وجوجل.
            </span>
          </div>

          {/* Average consultation price input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground">متوسط سعر الكشف أو الخدمة الطبية</label>
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
            <span className="block text-xs text-muted-foreground">
              متوسط القيمة التي يدفعها المريض للكشف أو العملية للوحدة الواحدة.
            </span>
          </div>

          {/* Target Patients Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-sm font-bold text-foreground">عدد الحالات الجديدة المستهدفة شهرياً</label>
              <span className="font-mono font-bold text-lg text-primary">{target} مريض</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="500" 
              step="5" 
              value={target} 
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
            />
            <span className="block text-xs text-muted-foreground">
              كم مريضاً جديداً تطمح لجذبه عبر الحملة الإعلانية كل شهر؟
            </span>
          </div>

          {/* Currency Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground">العملة</label>
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

          {/* Medical Specialty selection */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground">التخصص الطبي</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted/40 border border-border/50 rounded-2xl">
              <button
                onClick={() => setSpecialty("general")}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  specialty === "general" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                عام
              </button>
              <button
                onClick={() => setSpecialty("dental")}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  specialty === "dental" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                أسنان
              </button>
              <button
                onClick={() => setSpecialty("derma")}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  specialty === "derma" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                جلدية وتجميل
              </button>
              <button
                onClick={() => setSpecialty("physio")}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  specialty === "physio" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                علاج طبيعي
              </button>
            </div>
            <span className="block text-xs text-muted-foreground">
              يضبط معدل التحويل المتوقع من نقرة إلى حجز فعلي حسب طبيعة كل تخصص.
            </span>
          </div>

        </div>

        {/* Right Column: Scenario Calculations & Results */}
        <div className="md:col-span-5 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/5 space-y-6 md:sticky md:top-24">
          
          {/* Scenario Tabs switcher */}
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl">
            <button
              onClick={() => setScenario("current")}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                scenario === "current" ? "bg-primary text-white shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              حسب ميزانيتك الحالية
            </button>
            
            <button
              onClick={() => setScenario("target")}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                scenario === "target" ? "bg-primary text-white shadow-sm" : "text-zinc-400 hover:text-white"
              }`}
            >
              لتحقيق هدفك بالكامل
            </button>
          </div>

          {/* Feasibility Banner */}
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex gap-2 items-start ${
            calcResults.feasibilityType === "ok" 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}>
            <span className="font-bold text-sm leading-none flex-shrink-0">
              {calcResults.feasibilityType === "ok" ? "✓" : "!"}
            </span>
            <p className="margin-0">{calcResults.feasibilityText}</p>
          </div>

          {/* KPI grid breakdown */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Clicks */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="block text-[10px] text-zinc-400">عدد النقرات المطلوبة</span>
              <span className="block font-mono font-bold text-lg text-white">{fmt(calcResults.clicks)}</span>
            </div>

            {/* CPA */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1 border-amber-500/30">
              <span className="block text-[10px] text-zinc-400">تكلفة المريض الواحد (CPA)</span>
              <span className="block font-mono font-bold text-lg text-amber-400">{fmt(calcResults.cpa)} {cpc.symbol}</span>
            </div>

            {/* Expected patients */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="block text-[10px] text-zinc-400">عدد المرضى المتوقع</span>
              <span className="block font-mono font-bold text-lg text-white">{fmt(calcResults.patients)} مريض</span>
            </div>

            {/* Profit / Loss */}
            <div className={`border rounded-2xl p-4 space-y-1 ${
              calcResults.isProfit ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'
            }`}>
              <span className="block text-[10px] text-zinc-400">صافي الربح المتوقع</span>
              <span className={`block font-mono font-bold text-lg ${
                calcResults.isProfit ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {calcResults.isProfit ? "" : "-"}{fmt(calcResults.profit)} {cpc.symbol}
              </span>
            </div>

          </div>

          <div className="border-t border-white/10 my-4"></div>

          {/* Breakdown List */}
          <div className="space-y-3 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>إجمالي الميزانية المستخدمة في السيناريو:</span>
              <span className="font-mono font-bold text-white">{fmt(calcResults.budgetUsed)} {cpc.symbol}</span>
            </div>
            
            <div className="flex justify-between">
              <span>إجمالي الإيراد المتوقع:</span>
              <span className="font-mono font-bold text-white">{fmt(calcResults.revenue)} {cpc.symbol}</span>
            </div>

            {scenario === "target" && (
              <div className="flex justify-between pt-2 border-t border-white/5 text-amber-400">
                <span>الميزانية اللازمة لتحقيق الهدف كاملاً:</span>
                <span className="font-mono font-bold">{fmt(calcResults.requiredBudget)} {cpc.symbol}</span>
              </div>
            )}
          </div>

          {/* Lead Capture CTA */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl p-5 space-y-4">
            <p className="text-xs text-zinc-200 leading-relaxed">
              الحملات الطبية تتطلب استراتيجية خاصة للالتزام بضوابط وزارة الصحة وبناء الثقة. تواصل مع مستشاري تاج ستوديو لإدارة حملاتك الطبية وزيادة حجوزاتك.
            </p>
            <a 
              href="https://www.wearetagstudio.com/#contact-form"
              className="inline-flex justify-center items-center w-full py-3 rounded-xl bg-amber-400 hover:bg-white text-slate-950 font-bold text-xs transition-colors"
            >
              تواصل مع مستشاري تاج ستوديو ←
            </a>
          </div>

        </div>

      </div>

      {/* How it calculates details */}
      <div className="max-w-5xl mx-auto mt-16 space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span>كيف تحسب الأداة النتائج؟</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <span className="font-mono font-extrabold text-amber-500 text-xs">01</span>
            <h3 className="font-bold text-foreground">معدل تحويل مبني على التخصص</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              كل تخصص طبي له سلوك جمهور مختلف، فنستخدم معدل تحويل تقديري مختلف للأسنان والتجميل والعلاج الطبيعي والطب العام.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <span className="font-mono font-extrabold text-amber-500 text-xs">02</span>
            <h3 className="font-bold text-foreground">متوسط تكلفة النقرة الطبية</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              نطبق متوسطات تكلفة نقرة أعلى قليلاً من القطاعات العامة، لأن المنافسة على كلمات القطاع الطبي أعلى عادة في محركات البحث.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <span className="font-mono font-extrabold text-amber-500 text-xs">03</span>
            <h3 className="font-bold text-foreground">مقارنة سيناريوهين للتخطيط</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              نعرض لك ما تحققه ميزانيتك الحالية فعلياً من مرضى وأرباح، والميزانية اللازمة لتحقيق هدفك الكامل للتخطيط بمرونة.
            </p>
          </div>
        </div>
      </div>

      {/* Medical warning disclaimer */}
      <footer className="max-w-5xl mx-auto mt-12 text-center text-[10px] text-muted-foreground leading-relaxed">
        الأرقام في هذه الأداة تقديرية للاسترشاد الأولي، ولا تُغني عن استشارة متخصصة تراعي ضوابط الإعلان الطبي لوزارة الصحة في المملكة العربية السعودية وجمهورية مصر العربية. تاج ستوديو © 2026
      </footer>

    </div>
  )
}
