"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  RefreshCw, 
  Copy, 
  Check, 
  Send, 
  Sparkles,
  ChevronLeft,
  Shuffle,
  Globe,
  CreditCard,
  Instagram,
  Type,
  Wand2,
  ArrowRight
} from "lucide-react"

interface ColorPalette {
  primary: string
  secondary: string
  accent: string
}

const PALETTE_PRESETS: Record<string, Record<string, ColorPalette>> = {
  medical: {
    official: { primary: "#1e3a8a", secondary: "#3b82f6", accent: "#10b981" },
    premium: { primary: "#0f172a", secondary: "#0284c7", accent: "#eab308" },
    friendly: { primary: "#0d9488", secondary: "#2dd4bf", accent: "#f43f5e" },
    innovative: { primary: "#312e81", secondary: "#6366f1", accent: "#ec4899" }
  },
  restaurant: {
    official: { primary: "#7f1d1d", secondary: "#d1d5db", accent: "#b45309" },
    premium: { primary: "#1c1917", secondary: "#78716c", accent: "#d97706" },
    friendly: { primary: "#b91c1c", secondary: "#ea580c", accent: "#eab308" },
    innovative: { primary: "#4c1d95", secondary: "#a78bfa", accent: "#f43f5e" }
  },
  startup: {
    official: { primary: "#1e293b", secondary: "#475569", accent: "#cbd5e1" },
    premium: { primary: "#111827", secondary: "#1f2937", accent: "#10b981" },
    friendly: { primary: "#0369a1", secondary: "#38bdf8", accent: "#f97316" },
    innovative: { primary: "#09090b", secondary: "#3f3f46", accent: "#3b82f6" }
  },
  corporate: {
    official: { primary: "#0f172a", secondary: "#334155", accent: "#0284c7" },
    premium: { primary: "#18181b", secondary: "#27272a", accent: "#eab308" },
    friendly: { primary: "#1e3a8a", secondary: "#60a5fa", accent: "#f43f5e" },
    innovative: { primary: "#020617", secondary: "#1e293b", accent: "#a855f7" }
  },
  agriculture: {
    official: { primary: "#14532d", secondary: "#475569", accent: "#b45309" },
    premium: { primary: "#064e3b", secondary: "#0f766e", accent: "#d97706" },
    friendly: { primary: "#15803d", secondary: "#854d0e", accent: "#eab308" },
    innovative: { primary: "#022c22", secondary: "#0d9488", accent: "#10b981" }
  }
}

const FONT_PRESETS: Record<string, { heading: string, body: string, desc: string }> = {
  medical: { heading: "Cairo", body: "Readex Pro", desc: "توليفة نظيفة ومريحة تعطي ثقة وأمان للمريض" },
  restaurant: { heading: "Tajawal", body: "IBM Plex Sans Arabic", desc: "توليفة ودودة ومشهية تعبر عن الحيوية والسرعة" },
  startup: { heading: "IBM Plex Sans Arabic", body: "Inter", desc: "خطوط تقنية واضحة ومستقبلية للمشاريع الرقمية" },
  corporate: { heading: "Cairo", body: "Tajawal", desc: "توليفة رسمية وقوية تعبر عن الهيبة والموثوقية" },
  agriculture: { heading: "Cairo", body: "Readex Pro", desc: "توليفة طبيعية انسيابية ممتازة للبيئة والنمو" }
}

const industries = [
  { label: "عيادات ومراكز طبية", emoji: "🩺", theme: "medical" },
  { label: "مطاعم وكافيهات", emoji: "🍔", theme: "restaurant" },
  { label: "شركات ناشئة وتقنية", emoji: "🚀", theme: "startup" },
  { label: "مؤسسات وشركات رسمية", emoji: "🏢", theme: "corporate" },
  { label: "قطاع زراعي وتنموي", emoji: "🌾", theme: "agriculture" },
]

const personalities = [
  { label: "فخمة وراقية", sublabel: "Premium", value: "premium" as const, emoji: "👑" },
  { label: "ودودة وقريبة", sublabel: "Friendly", value: "friendly" as const, emoji: "🤝" },
  { label: "رسمية وجادة", sublabel: "Official", value: "official" as const, emoji: "🏛️" },
  { label: "عصرية ومبتكرة", sublabel: "Innovative", value: "innovative" as const, emoji: "⚡" },
]

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function ColorSwatch({ color, label, pct, colorKey, copiedColor, onCopy, onChange }: {
  color: string, label: string, pct: string, colorKey: string,
  copiedColor: string | null, onCopy: (c: string, k: string) => void,
  onChange: (k: string, v: string) => void
}) {
  const rgb = hexToRgb(color)
  const isCopied = copiedColor === colorKey

  return (
    <motion.div
      layout
      className="relative group"
    >
      {/* Color block */}
      <div
        className="relative h-28 rounded-2xl overflow-hidden cursor-pointer shadow-lg mb-3"
        style={{ background: color }}
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

        {/* Percentage badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-md">
          <span className="text-white/90 text-xs font-bold tracking-widest">{pct}</span>
        </div>

        {/* Copy overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-[2px]">
          <button
            onClick={() => onCopy(color, colorKey)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 text-black text-xs font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            {isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
            {isCopied ? "تم النسخ!" : "نسخ الكود"}
          </button>
        </div>

        {/* Color picker input (invisible) */}
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(colorKey, e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          title="انقر لتغيير اللون"
        />
      </div>

      {/* Info row */}
      <div className="flex items-center justify-between px-1">
        <div>
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
          <p className="font-mono text-sm font-bold text-foreground tracking-wider mt-0.5">{color.toUpperCase()}</p>
        </div>
        <div className="text-right text-[10px] text-muted-foreground">
          <p>rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function PaletteGenerator() {
  const [industry, setIndustry] = useState("medical")
  const [personality, setPersonality] = useState<"premium" | "friendly" | "official" | "innovative">("premium")
  const [colors, setColors] = useState<ColorPalette>({ primary: "#0f172a", secondary: "#0284c7", accent: "#eab308" })
  const [activeTab, setActiveTab] = useState<"web" | "card" | "post">("web")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const p = PALETTE_PRESETS[industry]?.[personality]
    if (p) {
      setIsGenerating(true)
      setTimeout(() => {
        setColors(p)
        setIsGenerating(false)
      }, 150)
    }
  }, [industry, personality])

  const handleColorChange = (key: string, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }))
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(label)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const generateRandom = () => {
    const rand = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0").toUpperCase()
    setIsGenerating(true)
    setTimeout(() => {
      setColors({ primary: rand(), secondary: rand(), accent: rand() })
      setIsGenerating(false)
    }, 150)
  }

  const selectedFonts = FONT_PRESETS[industry] || FONT_PRESETS.medical

  const waText = encodeURIComponent(
    `مرحباً تاج ستوديو، قمت بتوليد لوحة ألوان لهويتي البصرية:\n` +
    `- القطاع: ${industries.find(i => i.theme === industry)?.label || industry}\n` +
    `- الشخصية: ${personalities.find(p => p.value === personality)?.label || personality}\n` +
    `- الأساسي (60%): ${colors.primary}\n` +
    `- الثانوي (30%): ${colors.secondary}\n` +
    `- التأكيدي (10%): ${colors.accent}\n` +
    `- الخطوط: ${selectedFonts.heading} | ${selectedFonts.body}\n\n` +
    `أريد استشارة مجانية وعرض سعر.`
  )
  const waUrl = `https://wa.me/201009215131?text=${waText}`

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground" style={{
      background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.08), transparent)"
    }}>

      {/* ── Top Nav Bar ── */}
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a
            href="/tools"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowRight className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>العودة للأدوات</span>
          </a>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
              <Wand2 className="h-3 w-3 text-white" />
            </div>
            <span>Palette Generator</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-5 pt-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>أداة مجانية — مُولّد لوحات الألوان</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            ألوان تتحدث{" "}
            <span className="bg-gradient-to-l from-primary to-blue-400 bg-clip-text text-transparent">
              بلغة جمهورك
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            اختر قطاعك وشخصية براندك — وسنولّد لك لوحة ألوان احترافية مبنية على علم سيكولوجية الألوان ومعايير التصميم العالمية.
          </p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── Left Panel: Controls ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >

            {/* Industry */}
            <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                <h2 className="text-sm font-bold text-foreground">قطاع أو مجال مشروعك</h2>
              </div>
              <div className="space-y-2">
                {industries.map((ind) => {
                  const active = industry === ind.theme
                  return (
                    <button
                      key={ind.theme}
                      onClick={() => setIndustry(ind.theme)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm font-semibold transition-all duration-200 text-right ${
                        active
                          ? "border-primary/60 bg-primary/8 text-foreground shadow-sm ring-1 ring-primary/20"
                          : "border-border/50 bg-transparent text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      <span className="text-lg shrink-0">{ind.emoji}</span>
                      <span className="flex-1">{ind.label}</span>
                      {active && (
                        <motion.div
                          layoutId="industry-check"
                          className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0"
                        >
                          <Check className="h-2.5 w-2.5 text-white" />
                        </motion.div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Personality */}
            <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                <h2 className="text-sm font-bold text-foreground">شخصية علامتك التجارية</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {personalities.map((pers) => {
                  const active = personality === pers.value
                  return (
                    <button
                      key={pers.value}
                      onClick={() => setPersonality(pers.value)}
                      className={`flex flex-col items-start gap-1 p-3.5 rounded-2xl border text-right transition-all duration-200 ${
                        active
                          ? "border-primary/60 bg-primary/8 ring-1 ring-primary/20"
                          : "border-border/50 bg-transparent hover:border-border hover:bg-muted/40"
                      }`}
                    >
                      <span className="text-xl">{pers.emoji}</span>
                      <span className={`text-xs font-bold leading-tight ${active ? "text-foreground" : "text-muted-foreground"}`}>{pers.label}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{pers.sublabel}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
            >
              <Send className="h-4 w-4" />
              <span>أرسل اللوحة عبر واتساب</span>
            </a>

          </motion.div>

          {/* ── Right Panel: Colors + Preview ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 space-y-6"
          >

            {/* Color Swatches */}
            <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                  <h2 className="text-sm font-bold text-foreground">لوحة الألوان الناتجة</h2>
                </div>
                <button
                  onClick={generateRandom}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  <span>عشوائي</span>
                </button>
              </div>

              {/* Big palette banner */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${colors.primary}-${colors.secondary}-${colors.accent}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="h-20 rounded-2xl overflow-hidden flex shadow-lg"
                >
                  <div className="flex-[6] relative" style={{ background: colors.primary }}>
                    <span className="absolute bottom-2 right-3 text-[10px] text-white/70 font-bold">60%</span>
                  </div>
                  <div className="flex-[3] relative" style={{ background: colors.secondary }}>
                    <span className="absolute bottom-2 right-3 text-[10px] text-white/70 font-bold">30%</span>
                  </div>
                  <div className="flex-[1] relative" style={{ background: colors.accent }}>
                    <span className="absolute bottom-2 right-1 text-[10px] text-white/70 font-bold rotate-90 origin-left" style={{writingMode:"vertical-rl"}}>10%</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Three swatches */}
              <div className="grid grid-cols-3 gap-3">
                <ColorSwatch
                  color={colors.primary} label="اللون الأساسي" pct="60%"
                  colorKey="primary" copiedColor={copiedColor}
                  onCopy={copyToClipboard} onChange={handleColorChange}
                />
                <ColorSwatch
                  color={colors.secondary} label="اللون الثانوي" pct="30%"
                  colorKey="secondary" copiedColor={copiedColor}
                  onCopy={copyToClipboard} onChange={handleColorChange}
                />
                <ColorSwatch
                  color={colors.accent} label="اللون التأكيدي" pct="10%"
                  colorKey="accent" copiedColor={copiedColor}
                  onCopy={copyToClipboard} onChange={handleColorChange}
                />
              </div>

              {/* Font recommendation strip */}
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-muted/40 border border-border/30">
                <div className="flex items-center gap-2 text-primary">
                  <Type className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold">الخطوط المقترحة</span>
                </div>
                <div className="text-right text-xs">
                  <span className="font-bold text-foreground">{selectedFonts.heading}</span>
                  <span className="text-muted-foreground mx-2">·</span>
                  <span className="text-muted-foreground">{selectedFonts.body}</span>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden">
              {/* Tab bar */}
              <div className="flex border-b border-border/40 bg-muted/20 px-4 pt-4 gap-1">
                {[
                  { id: "web" as const, label: "موقع إلكتروني", icon: Globe },
                  { id: "card" as const, label: "كارت عمل", icon: CreditCard },
                  { id: "post" as const, label: "بوست سوشيال", icon: Instagram },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-semibold border-b-2 transition-all duration-200 ${
                      activeTab === id
                        ? "border-primary text-primary bg-card"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Preview canvas */}
              <div className="p-6 sm:p-8 flex items-center justify-center min-h-[380px] relative overflow-hidden bg-muted/5">

                {/* macOS dots */}
                <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>

                <AnimatePresence mode="wait">

                  {/* ── Web Preview ── */}
                  {activeTab === "web" && (
                    <motion.div
                      key="web"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-black/5"
                      style={{ background: "#fff" }}
                    >
                      {/* Navbar */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100" style={{ background: colors.primary + "10" }}>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-md" style={{ background: colors.primary }} />
                          <span className="text-[11px] font-black" style={{ color: colors.primary }}>علامتي</span>
                        </div>
                        <div className="flex gap-3 text-[9px] font-semibold text-gray-400">
                          <span>الرئيسية</span><span>الخدمات</span><span>تواصل</span>
                        </div>
                      </div>
                      {/* Hero */}
                      <div className="px-6 py-8 text-center space-y-4">
                        <div className="inline-block px-3 py-1 rounded-full text-[9px] font-bold" style={{ background: colors.accent + "20", color: colors.accent }}>
                          خدمات احترافية ✦
                        </div>
                        <h3 className="text-xl font-black leading-tight" style={{ color: colors.primary, fontFamily: selectedFonts.heading }}>
                          نحن نصنع هوية تجارية تدوم
                        </h3>
                        <p className="text-[11px] text-gray-400 leading-relaxed" style={{ fontFamily: selectedFonts.body }}>
                          من الشعار إلى التصميم الشامل — كل شيء يعبر عن قيمة علامتك التجارية الحقيقية.
                        </p>
                        <div className="flex gap-2 justify-center pt-1">
                          <button className="px-4 py-2 rounded-xl text-white text-[10px] font-bold shadow-md" style={{ background: colors.accent }}>
                            احجز موعداً
                          </button>
                          <button className="px-4 py-2 rounded-xl text-[10px] font-bold border" style={{ color: colors.primary, borderColor: colors.secondary }}>
                            قراءة المزيد
                          </button>
                        </div>
                      </div>
                      {/* Stats bar */}
                      <div className="flex border-t border-gray-100 divide-x divide-gray-100 text-center">
                        {[["٢٠٠+", "عميل"], ["٩٨٪", "رضا"], ["٥ سنوات", "خبرة"]].map(([n, l]) => (
                          <div key={l} className="flex-1 py-3">
                            <p className="text-sm font-black" style={{ color: colors.primary }}>{n}</p>
                            <p className="text-[9px] text-gray-400">{l}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Business Card Preview ── */}
                  {activeTab === "card" && (
                    <motion.div
                      key="card"
                      initial={{ opacity: 0, rotateY: -10 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 10 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col sm:flex-row gap-4 items-center"
                      style={{ perspective: "800px" }}
                    >
                      {/* Front */}
                      <div
                        className="w-72 h-40 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-2xl"
                        style={{ background: colors.primary }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full opacity-20" style={{ background: colors.secondary }} />
                        <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl" style={{ background: colors.accent }} />
                        <div className="flex items-center gap-2 z-10">
                          <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full" style={{ background: colors.accent }} />
                          </div>
                          <span className="text-[11px] text-white font-black tracking-widest" style={{ fontFamily: selectedFonts.heading }}>
                            العلامة التجارية
                          </span>
                        </div>
                        <div className="z-10 space-y-1">
                          <p className="text-white/50 text-[9px]">المدير التنفيذي</p>
                          <h4 className="text-white text-base font-bold" style={{ fontFamily: selectedFonts.heading }}>أ. محمد زهران</h4>
                          <p className="text-white/70 text-[9px]" style={{ fontFamily: selectedFonts.body }}>تطوير الهوية البصرية والسوشيال ميديا</p>
                        </div>
                      </div>
                      {/* Back */}
                      <div
                        className="w-72 h-40 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl border border-border"
                        style={{ background: "#fff" }}
                      >
                        <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-10" style={{ background: colors.secondary }} />
                        <div className="space-y-2 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: colors.primary }}>
                              <div className="w-3.5 h-3.5 rounded-full" style={{ background: colors.accent }} />
                            </div>
                            <span className="text-sm font-black" style={{ color: colors.primary, fontFamily: selectedFonts.heading }}>علامتي</span>
                          </div>
                          <p className="text-[9px] text-gray-400">info@brand.com</p>
                          <p className="text-[9px] text-gray-400">www.brand.com</p>
                          <div className="mt-1 h-px w-12 mx-auto rounded" style={{ background: colors.accent }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Social Post Preview ── */}
                  {activeTab === "post" && (
                    <motion.div
                      key="post"
                      initial={{ opacity: 0, scale: 0.93 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.93 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-[300px] h-[300px] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-black/5"
                      style={{ background: "#fff" }}
                    >
                      {/* Top accent strip */}
                      <div className="h-1.5 w-full" style={{ background: `linear-gradient(to left, ${colors.primary}, ${colors.accent})` }} />

                      <div className="flex-1 p-5 flex flex-col justify-between">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: colors.primary }}>
                              <div className="w-3 h-3 rounded-full" style={{ background: colors.accent }} />
                            </div>
                            <span className="text-[11px] font-black" style={{ color: colors.primary, fontFamily: selectedFonts.heading }}>
                              حساب العيادة
                            </span>
                          </div>
                          <span className="text-[9px] text-gray-300 bg-gray-50 px-2 py-0.5 rounded-full">نصائح طبية</span>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <div className="w-8 h-1 rounded-full" style={{ background: colors.accent }} />
                          <h3 className="text-base font-black leading-snug" style={{ color: colors.primary, fontFamily: selectedFonts.heading }}>
                            كيف تحافظ على هدوء أعصابك أثناء العمل اليومي؟
                          </h3>
                          <p className="text-[10px] text-gray-400 leading-relaxed" style={{ fontFamily: selectedFonts.body }}>
                            سيكولوجية الألوان وتصميم بيئتك المحيطة تلعب دوراً مهماً في صحتك النفسية اليومية.
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                          <span className="text-[9px] text-gray-300">تاج ستوديو للتصميم</span>
                          <button
                            className="px-3 py-1.5 rounded-lg text-[9px] text-white font-bold"
                            style={{ background: colors.accent }}
                          >
                            اقرأ المزيد
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </div>

        {/* ── Tips Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border/50 bg-card/40 backdrop-blur-sm p-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">كيف تستخدم لوحة الألوان باحترافية؟</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "قاعدة 60-30-10",
                body: "60% للون الأساسي في الخلفيات والمساحات الكبرى • 30% للثانوي في العناوين والأيقونات • 10% للتأكيدي فقط في أزرار الاتصال لجذب الانتباه."
              },
              {
                title: "التباين والقراءة",
                body: "تأكد من وجود تباين كافٍ بين النص والخلفية وفق معايير WCAG. للعربية، اضبط تباعد الأسطر بين 1.6 و 1.8 لمنع تداخل الحروف."
              },
              {
                title: "قوالب Canva مخصصة",
                body: "بعد استلام هويتك البصرية من تاج ستوديو، نعد لك قوالب Canva جاهزة بألوانك وخطوطك الثابتة لإنتاج محتواك اليومي بسهولة."
              }
            ].map((tip, i) => (
              <div key={i} className="p-5 rounded-2xl bg-muted/30 border border-border/30 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary text-[10px] font-black">{i + 1}</div>
                  <h3 className="font-bold text-sm">{tip.title}</h3>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
