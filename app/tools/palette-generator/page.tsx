"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Paintbrush, 
  RefreshCw, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  Briefcase, 
  Heart, 
  Layers, 
  Palette, 
  FileText,
  CreditCard,
  Globe,
  Instagram,
  ChevronLeft
} from "lucide-react"

// Types definitions
interface IndustryPreset {
  name: string
  icon: any
  desc: string
  colorTheme: string
}

interface PersonalityPreset {
  name: string
  desc: string
  value: "premium" | "friendly" | "official" | "innovative"
}

interface ColorPalette {
  primary: string
  secondary: string
  accent: string
}

// Preset color palettes mapping
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

// Recommended Fonts Mapping
const FONT_PRESETS: Record<string, { heading: string, body: string, desc: string }> = {
  medical: { heading: "Cairo", body: "Readex Pro", desc: "توليفة نظيفة ومريحة تعطي ثقة وأمان للمريض" },
  restaurant: { heading: "Tajawal", body: "IBM Plex Sans Arabic", desc: "توليفة ودودة ومشهية تعبر عن الحيوية والسرعة" },
  startup: { heading: "IBM Plex Sans Arabic", body: "Inter", desc: "خطوط تقنية واضحة ومستقبلية للمشاريع الرقمية" },
  corporate: { heading: "Cairo", body: "Tajawal", desc: "توليفة رسمية وقوية تعبر عن الهيبة والموثوقية" },
  agriculture: { heading: "Cairo", body: "Readex Pro", desc: "توليفة طبيعية انسيابية ممتازة للبيئة والنمو" }
}

export default function PaletteGenerator() {
  const [industry, setIndustry] = useState<string>("medical")
  const [personality, setPersonality] = useState<"premium" | "friendly" | "official" | "innovative">("premium")
  const [colors, setColors] = useState<ColorPalette>({
    primary: "#1e3a8a",
    secondary: "#3b82f6",
    accent: "#10b981"
  })
  const [activeTab, setActiveTab] = useState<"card" | "web" | "post">("web")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  
  // Set initial colors on mount and whenever industry/personality changes
  useEffect(() => {
    const selectedPalette = PALETTE_PRESETS[industry]?.[personality]
    if (selectedPalette) {
      setColors(selectedPalette)
    }
  }, [industry, personality])

  const handleColorChange = (key: keyof ColorPalette, value: string) => {
    setColors(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(label)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const generateRandomPalette = () => {
    const hexChars = "0123456789ABCDEF"
    const randomHex = () => {
      let color = "#"
      for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)]
      }
      return color
    }
    setColors({
      primary: randomHex(),
      secondary: randomHex(),
      accent: randomHex()
    })
  }

  // Pre-configured options
  const industries: IndustryPreset[] = [
    { name: "🩺 عيادات ومراكز طبية", icon: Heart, desc: "أزرق ودرجات التهدئة والثقة", colorTheme: "medical" },
    { name: "🍔 مطاعم وكافيهات", icon: Sparkles, desc: "ألوان مشهية ودافئة", colorTheme: "restaurant" },
    { name: "🚀 شركات ناشئة وتقنية", icon: Layers, desc: "درجات عصرية ومستقبلية", colorTheme: "startup" },
    { name: "🏢 مؤسسات وشركات رسمية", icon: Briefcase, desc: "ألوان جادة وموثوقة", colorTheme: "corporate" },
    { name: "🌾 قطاع زراعي وتنموي", icon: Palette, desc: "درجات مستوحاة من الأرض والنماء", colorTheme: "agriculture" }
  ]

  const personalities: PersonalityPreset[] = [
    { name: "👑 فخمة وراقية (Premium)", desc: "تعبر عن الجودة والندرة والفخامة", value: "premium" },
    { name: "🤝 ودودة وقريبة (Friendly)", desc: "سهلة الوصول واقتصادية ومحبوبة", value: "friendly" },
    { name: "🏛️ رسمية وجادة (Official)", desc: "تنقل الموثوقية والمؤسسية الصارمة", value: "official" },
    { name: "⚡ عصرية ومبتكرة (Innovative)", desc: "ترمز للمستقبل والإبداع والتقنية", value: "innovative" }
  ]

  const selectedFonts = FONT_PRESETS[industry] || FONT_PRESETS.medical

  // Construct dynamic WhatsApp Link
  const waNumber = "201009215131"
  const waText = encodeURIComponent(
    `مرحباً تاج ستوديو، قمت بتوليد لوحة ألوان لهويتي البصرية عبر موقعكم:\n` +
    `- القطاع: ${industries.find(i => i.colorTheme === industry)?.name || industry}\n` +
    `- الشخصية: ${personalities.find(p => p.value === personality)?.name || personality}\n` +
    `- اللون الأساسي (60%): ${colors.primary}\n` +
    `- اللون الثانوي (30%): ${colors.secondary}\n` +
    `- اللون التأكيدي (10%): ${colors.accent}\n` +
    `- الخطوط المقترحة: العناوين (${selectedFonts.heading}) | الفقرات (${selectedFonts.body})\n\n` +
    `أرغب في الحصول على استشارة مجانية وعرض سعر لتصميم الهوية البصرية لمشروعي.`
  )
  const whatsappUrl = `https://wa.me/${waNumber}?text=${waText}`

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/95 to-background/90 text-foreground">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <a 
          href="/tools" 
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent text-sm font-semibold transition-colors"
        >
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span>العودة لصفحة الأدوات</span>
        </a>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
        >
          <Paintbrush className="h-4 w-4" />
          <span>أدوات مجانية تفاعلية لعملائنا</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
        >
          مُولّد ألوان وخطوط الهوية البصرية
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-justify">
            اختيار ألوان الهوية البصرية ليس مجرد مسألة ذوق شخصي، بل هو علم يعتمد على سيكولوجية الألوان (Color Psychology) ومدى تأثيرها على قرارات الشراء لدى جمهورك المستهدف في السعودية ومصر. لذلك، صممنا لك "مُولّد لوحات ألوان الهوية البصرية الذكي" ليكون مرجعك الأساسي قبل اعتماد ألوان علامتك التجارية.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-justify">
            اختر مجال عملك وشخصية براندك (سواء كانت رسمية، ودودة، فاخرة، أو مبتكرة)، ودع الأداة تولّد لك توليفة ألوان متناسقة احترافية. تعتمد الأداة على قاعدة التوزيع العالمية في التصميم (60% للون الأساسي، 30% للون الثانوي، و10% للون التأكيدي) لضمان توازن مريح للعين، بالإضافة لاقتراح أفضل الخطوط العربية (مثل كايرو وتجوال) التي تتوافق مع شخصية هذه الألوان. يمكنك معاينة هذه الألوان فوراً على نماذج واقعية ككروت العمل، بوستات السوشيال ميديا، وواجهات المواقع لتتخيل النتيجة النهائية بدقة.
          </p>
        </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-5 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-8">
          
          {/* Step 1: Industry */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border/50 pb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">1</span>
              <span>ما هو قطاع أو مجال مشروعك؟</span>
            </h3>
            
            <div className="grid grid-cols-1 gap-2">
              {industries.map((ind) => {
                const Icon = ind.icon
                const isSelected = industry === ind.colorTheme
                return (
                  <button
                    key={ind.colorTheme}
                    onClick={() => setIndustry(ind.colorTheme)}
                    className={`flex items-center gap-4 p-3 rounded-2xl border text-right transition-all duration-300 hover:bg-accent/40 ${
                      isSelected 
                        ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary/45 shadow-sm" 
                        : "border-border/60 bg-transparent text-muted-foreground"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-sm">{ind.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{ind.desc}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Brand Personality */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border/50 pb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">2</span>
              <span>ما هي شخصية أو طابع علامتك التجارية؟</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {personalities.map((pers) => {
                const isSelected = personality === pers.value
                return (
                  <button
                    key={pers.value}
                    onClick={() => setPersonality(pers.value)}
                    className={`p-3 rounded-2xl border text-right transition-all duration-300 hover:bg-accent/40 ${
                      isSelected 
                        ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary/45 shadow-sm" 
                        : "border-border/60 bg-transparent text-muted-foreground"
                    }`}
                  >
                    <div className="font-bold text-foreground text-sm">{pers.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed hidden sm:block">{pers.desc}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 3: Color Palette & Color Pickers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">3</span>
                <span>الألوان الناتجة (60-30-10)</span>
              </h3>
              <button
                onClick={generateRandomPalette}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-accent text-xs font-semibold text-foreground hover:bg-accent/80 transition-colors"
                title="توليد عشوائي"
              >
                <RefreshCw className="h-3 w-3" />
                <span>عشوائي</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* Primary Color Picker */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-inner border border-black/10">
                    <input 
                      type="color" 
                      value={colors.primary} 
                      onChange={(e) => handleColorChange("primary", e.target.value)}
                      className="absolute inset-0 cursor-pointer scale-150"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">اللون الأساسي (60%)</span>
                    <span className="font-bold text-sm select-all">{colors.primary.toUpperCase()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(colors.primary, "primary")}
                  className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copiedColor === "primary" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Secondary Color Picker */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-inner border border-black/10">
                    <input 
                      type="color" 
                      value={colors.secondary} 
                      onChange={(e) => handleColorChange("secondary", e.target.value)}
                      className="absolute inset-0 cursor-pointer scale-150"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">اللون الثانوي (30%)</span>
                    <span className="font-bold text-sm select-all">{colors.secondary.toUpperCase()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(colors.secondary, "secondary")}
                  className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copiedColor === "secondary" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Accent Color Picker */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-inner border border-black/10">
                    <input 
                      type="color" 
                      value={colors.accent} 
                      onChange={(e) => handleColorChange("accent", e.target.value)}
                      className="absolute inset-0 cursor-pointer scale-150"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">اللون التأكيدي (10%)</span>
                    <span className="font-bold text-sm select-all">{colors.accent.toUpperCase()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(colors.accent, "accent")}
                  className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copiedColor === "accent" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 4: Font Recommendation */}
          <div className="space-y-3 p-4 rounded-2xl bg-primary/5 border border-primary/20">
            <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>الخطوط المقترحة للهوية:</span>
            </h4>
            <div className="text-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-muted-foreground text-xs">العناوين الرئيسية:</span>
                <span className="font-bold text-foreground" style={{ fontFamily: selectedFonts.heading }}>{selectedFonts.heading}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground text-xs">الفقرات والنصوص:</span>
                <span className="font-semibold text-foreground" style={{ fontFamily: selectedFonts.body }}>{selectedFonts.body}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 border-t border-primary/10 pt-2 leading-relaxed">
                {selectedFonts.desc}
              </p>
            </div>
          </div>

          {/* Lead Capture CTA */}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="h-5 w-5" />
              <span>أرسل هذه اللوحة للتصميم عبر واتساب</span>
            </a>
            <span className="block text-center text-[10px] text-muted-foreground mt-2">
              سوف يفتح الرابط محادثة مباشرة مع مستشاري تاج ستوديو بالخيارات المحددة لتجهيز عرض سعر مجاني لمشروعك.
            </span>
          </div>

        </div>

        {/* Right Column: Live Mockups Preview */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tabs Selector */}
          <div className="flex p-1.5 rounded-2xl bg-card border border-border/60 shadow-md">
            <button
              onClick={() => setActiveTab("web")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === "web" 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>واجهة موقع إلكتروني</span>
            </button>
            
            <button
              onClick={() => setActiveTab("card")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === "card" 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span>كارت عمل (Business Card)</span>
            </button>

            <button
              onClick={() => setActiveTab("post")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === "post" 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Instagram className="h-4 w-4" />
              <span>بوست سوشيال ميديا</span>
            </button>
          </div>

          {/* Visual Previews Window */}
          <div className="bg-card border border-border/60 rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
            {/* Window bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-muted/20 border-b border-border/60">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-xs text-muted-foreground font-semibold">
                معاينة لوحة الهوية البصرية الحية
              </span>
              <div className="w-12"></div> {/* Spacer to center title */}
            </div>

            {/* Content Preview Rendering */}
            <div className="flex-1 p-6 sm:p-8 flex items-center justify-center bg-muted/10 relative overflow-hidden">
              
              {/* Tab 1: Web landing page preview */}
              {activeTab === "web" && (
                <motion.div
                  key="web"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 border border-border shadow-2xl overflow-hidden"
                >
                  {/* Miniature Browser Navbar */}
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between" style={{ backgroundColor: colors.primary + '10' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                      <span className="text-xs font-black" style={{ color: colors.primary }}>علامتي</span>
                    </div>
                    <div className="flex gap-3 text-[10px] font-semibold text-muted-foreground">
                      <span>الرئيسية</span>
                      <span>خدماتنا</span>
                      <span>تواصل معنا</span>
                    </div>
                  </div>

                  {/* Browser Hero Content */}
                  <div className="p-8 space-y-6 text-center">
                    <div className="space-y-3">
                      <h3 
                        className="text-2xl sm:text-3xl font-black leading-tight" 
                        style={{ color: colors.primary, fontFamily: selectedFonts.heading }}
                      >
                        نحن نصنع القيمة الحقيقية لمشروعك
                      </h3>
                      <p 
                        className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed"
                        style={{ fontFamily: selectedFonts.body }}
                      >
                        دليل متكامل لتطوير الأعمال بأعلى جودة وتصميم يهدف لزيادة ثقة عملائك وبناء حضور متناسق في السوق.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      {/* Secondary button */}
                      <button 
                        className="px-4 py-2 rounded-xl text-xs font-bold border transition-transform hover:scale-[1.02]"
                        style={{ 
                          color: colors.primary, 
                          borderColor: colors.secondary, 
                          fontFamily: selectedFonts.body 
                        }}
                      >
                        قراءة المزيد
                      </button>
                      
                      {/* Main action button (Accent Color) */}
                      <button 
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all hover:opacity-90 hover:scale-[1.02]"
                        style={{ 
                          backgroundColor: colors.accent, 
                          fontFamily: selectedFonts.body 
                        }}
                      >
                        احجز موعداً الآن
                      </button>
                    </div>

                    {/* Accent border highlight */}
                    <div className="pt-4 flex justify-center">
                      <div className="flex items-center gap-6 p-3 rounded-xl bg-muted/40 border-r-4" style={{ borderRightColor: colors.accent }}>
                        <div className="text-right">
                          <span className="block text-[10px] text-muted-foreground">عدد المستخدمين</span>
                          <span className="text-sm font-bold" style={{ color: colors.primary }}>+10,000 عميل</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Business Card Preview */}
              {activeTab === "card" && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col md:flex-row gap-6 justify-center items-center max-w-2xl"
                >
                  {/* Card Front */}
                  <div 
                    className="w-[320px] h-[190px] rounded-2xl p-6 relative shadow-2xl flex flex-col justify-between overflow-hidden border border-black/5"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    {/* Background abstract element (secondary color) */}
                    <div 
                      className="absolute -top-10 -left-10 w-24 h-24 rounded-full opacity-20 blur-xl"
                      style={{ backgroundColor: colors.secondary }}
                    ></div>
                    {/* Accent strip */}
                    <div 
                      className="absolute top-0 right-0 w-2 h-full"
                      style={{ backgroundColor: colors.accent }}
                    ></div>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                      </div>
                      <span className="text-xs font-bold tracking-wider" style={{ fontFamily: selectedFonts.heading }}>العلامة التجارية</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-white/60 block">المدير التنفيذي</span>
                      <h4 className="text-base font-bold" style={{ fontFamily: selectedFonts.heading }}>أ. محمد زهران</h4>
                      <p className="text-[10px] text-white/80 leading-relaxed" style={{ fontFamily: selectedFonts.body }}>
                        تطوير الهوية البصرية وإدارة السوشيال ميديا للمراكز الطبية والمطاعم
                      </p>
                    </div>
                  </div>

                  {/* Card Back */}
                  <div 
                    className="w-[320px] h-[190px] rounded-2xl relative shadow-2xl flex items-center justify-center overflow-hidden border border-black/5"
                    style={{ backgroundColor: '#ffffff', color: colors.primary }}
                  >
                    {/* Abstract circles */}
                    <div 
                      className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full opacity-10"
                      style={{ backgroundColor: colors.secondary }}
                    ></div>
                    
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                          <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                        </div>
                        <span className="text-sm font-black" style={{ color: colors.primary, fontFamily: selectedFonts.heading }}>علامتي</span>
                      </div>
                      
                      <div className="space-y-1 text-center">
                        <span className="text-[9px] text-muted-foreground block">البريد الإلكتروني: info@brand.com</span>
                        <span className="text-[9px] text-muted-foreground block">الموقع الإلكتروني: www.brand.com</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Social Media Post Preview */}
              {activeTab === "post" && (
                <motion.div
                  key="post"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-[320px] h-[320px] rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 border border-border overflow-hidden flex flex-col justify-between p-6 relative"
                >
                  {/* Decorative accent shape in top corner */}
                  <div 
                    className="absolute -top-16 -left-16 w-36 h-36 rounded-full opacity-10"
                    style={{ backgroundColor: colors.secondary }}
                  ></div>
                  
                  {/* Top Bar (Logo & Profile) */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                      </div>
                      <span className="text-[10px] font-bold" style={{ color: colors.primary, fontFamily: selectedFonts.heading }}>حساب العيادة</span>
                    </div>
                    <span className="text-[8px] text-muted-foreground" style={{ fontFamily: selectedFonts.body }}>نصائح طبية</span>
                  </div>

                  {/* Main Slogan Body */}
                  <div className="my-auto py-4 space-y-3 z-10">
                    <h3 
                      className="text-lg font-black leading-snug text-right"
                      style={{ color: colors.primary, fontFamily: selectedFonts.heading }}
                    >
                      كيف تحافظ على هدوء أعصابك أثناء العمل اليومي؟
                    </h3>
                    <p 
                      className="text-[10px] text-muted-foreground leading-relaxed text-right"
                      style={{ fontFamily: selectedFonts.body }}
                    >
                      سيكولوجية الألوان وتصميم بيئتك المحيطة تلعب دوراً مهماً في صحتك النفسية...
                    </p>
                  </div>

                  {/* Bottom Strip (CTA & Brand Info) */}
                  <div className="flex items-center justify-between border-t border-muted pt-4 z-10">
                    <span className="text-[8px] text-muted-foreground">تاج ستوديو للتصميم</span>
                    <button 
                      className="px-3 py-1.5 rounded-lg text-[9px] font-bold text-white transition-transform hover:scale-105"
                      style={{ 
                        backgroundColor: colors.accent, 
                        fontFamily: selectedFonts.body 
                      }}
                    >
                      اقرأ المزيد
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </div>

      </div>

      {/* Guide & Tips Section */}
      <div className="max-w-7xl mx-auto mt-16 bg-card border border-border/60 rounded-3xl p-8 space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
          <Palette className="h-5 w-5" />
          <span>كيف تستخدم لوحة الألوان الخاصة بك باحترافية؟</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2 p-4 rounded-2xl bg-muted/30 border border-border/30">
            <h4 className="font-bold text-foreground">قاعدة التوزيع 60-30-10:</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              استخدم **اللون الأساسي (60%)** في الخلفيات والمساحات الكبرى لتمنح العين راحة واسترخاء. بينما استخدم **اللون الثانوي (30%)** في العناوين والرموز والقرطاسية لتثبت شخصية البراند، وخصص **اللون التأكيدي (10%)** فقط لأزرار الاتصال (CTA) والمعلومات الحرجة لجذب الانتباه.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-muted/30 border border-border/30">
            <h4 className="font-bold text-foreground">الخط واللون وارتفاع الأسطر:</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              تأكد من وجود تباين (Contrast) كافٍ بين لون النص ولون الخلفية لضمان القراءة السهلة. بالنسبة للمحتوى العربي، اضبط تباعد الأسطر (line-height) بين **1.6 إلى 1.8** لتفادي تداخل الحروف العربية.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-muted/30 border border-border/30">
            <h4 className="font-bold text-foreground">تصميم قوالب Canva مخصصة:</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              بمجرد استلام هويتك البصرية من تاج ستوديو، نعد لك قوالب Canva جاهزة ومخصصة بألوانك وخطوطك الثابتة، لتتمكن من إنتاج محتواك اليومي بسهولة وسرعة مع الحفاظ التام على هوية البراند.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
