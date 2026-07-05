"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ChevronLeft, 
  Check, 
  X,
  Palette, 
  Info,
  RefreshCw,
  Copy,
  Eye,
  SlidersHorizontal,
  Contrast
} from "lucide-react"

export default function ColorContrastChecker() {
  const [bgColor, setBgColor] = useState<string>("#0A4A3E")
  const [fgColor, setFgColor] = useState<string>("#E4C158")
  const [bgInput, setBgInput] = useState<string>("#0A4A3E")
  const [fgInput, setFgInput] = useState<string>("#E4C158")
  const [copied, setCopied] = useState<string | null>(null)

  // Validate HEX color
  const isValidHex = (v: string) => {
    return /^#([0-9A-Fa-f]{6})$/.test(v)
  }

  // Handle manual HEX input changes
  const handleHexChange = (type: "bg" | "fg", value: string) => {
    let cleanVal = value.trim()
    if (cleanVal && cleanVal[0] !== "#") {
      cleanVal = "#" + cleanVal
    }
    
    if (type === "bg") {
      setBgInput(cleanVal)
      if (isValidHex(cleanVal)) {
        setBgColor(cleanVal)
      }
    } else {
      setFgInput(cleanVal)
      if (isValidHex(cleanVal)) {
        setFgColor(cleanVal)
      }
    }
  }

  // Handle color picker input changes
  const handlePickerChange = (type: "bg" | "fg", value: string) => {
    const upperVal = value.toUpperCase()
    if (type === "bg") {
      setBgColor(upperVal)
      setBgInput(upperVal)
    } else {
      setFgColor(upperVal)
      setFgInput(upperVal)
    }
  }

  // Swap colors
  const swapColors = () => {
    const tempBg = bgColor
    const tempFg = fgColor
    setBgColor(tempFg)
    setBgInput(tempFg)
    setFgColor(tempBg)
    setFgInput(tempBg)
  }

  // Copy code to clipboard
  const copyColor = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  // Relative Luminance calculations
  const hexToRgb = (hex: string) => {
    const h = hex.replace("#", "")
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16)
    }
  }

  const relLuminance = ({ r, g, b }: { r: number, g: number, b: number }) => {
    const chan = [r, g, b].map(v => {
      const c = v / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2]
  }

  const getContrastRatio = (hex1: string, hex2: string) => {
    try {
      const L1 = relLuminance(hexToRgb(hex1))
      const L2 = relLuminance(hexToRgb(hex2))
      const lighter = Math.max(L1, L2)
      const darker = Math.min(L1, L2)
      return (lighter + 0.05) / (darker + 0.05)
    } catch (e) {
      return 1.0
    }
  }

  const ratio = getContrastRatio(bgColor, fgColor)
  const ratioRounded = Math.round(ratio * 100) / 100

  // WCAG compliance checks
  const passAA = ratio >= 4.5
  const passAALarge = ratio >= 3.0
  const passAAA = ratio >= 7.0
  const passAAALarge = ratio >= 4.5

  // Verdict text and styles mapping
  let verdictStyle = "linear-gradient(135deg,#ef4444,#b91c1c)"
  let verdictTitle = "تناسق ضعيف"
  let verdictDesc = "هذان اللونان يُتعبان القارئ، ويُنصح بشدة بمراجعتهما قبل استخدامهما في هويتك البصرية."

  if (ratio >= 7.0) {
    verdictStyle = "linear-gradient(135deg,#10b981,#047857)"
    verdictTitle = "تناسق ممتاز"
    verdictDesc = "هذان اللونان مريحان جداً للعين ومطابقان لأعلى معايير القراءة العالمية (AAA)."
  } else if (ratio >= 4.5) {
    verdictStyle = "linear-gradient(135deg,#3b82f6,#1d4ed8)"
    verdictTitle = "تناسق جيد"
    verdictDesc = "يصلحان للنصوص العادية والفقرات بثقة، ومناسبان لمعظم استخدامات الهوية (AA)."
  } else if (ratio >= 3.0) {
    verdictStyle = "linear-gradient(135deg,#eab308,#a16207)"
    verdictTitle = "تناسق متوسط"
    verdictDesc = "مناسبان للعناوين الكبيرة أو العناصر الزخرفية والرموز، وليس للفقرات أو النصوص الصغيرة."
  }

  // Preset pairings
  const presets = [
    { bg: "#0B1F1A", fg: "#F6F3EC", label: "كحلي داكن / كريمي" },
    { bg: "#F6F3EC", fg: "#C9A227", label: "كريمي / ذهبي" },
    { bg: "#FFFFFF", fg: "#8B8478", label: "أبيض / رمادي هادئ" },
    { bg: "#0F7A66", fg: "#1FAE8E", label: "أخضرين متقاربين" }
  ]

  const applyPreset = (bg: string, fg: string) => {
    setBgColor(bg)
    setBgInput(bg)
    setFgColor(fg)
    setFgInput(fg)
  }

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
          
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-bold border border-white/15">
              🛠️ أدوات تاج ستوديو
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              أداة اختبار تباين وتناسق ألوان الهوية
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              أدخل لونين من ألوان هويتك البصرية، وستخبرك الأداة إذا كانا متناسقين ومريحين للعين، ومطابقين لمعايير القراءة العالمية WCAG للتباين الرقمي.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Color Controls */}
        <div className="md:col-span-5 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Background Color Picker */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-foreground">لون الخلفية</label>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/40 focus-within:ring-2 focus-within:ring-primary/25 focus-within:border-primary transition-all">
              <div className="relative h-11 w-11 rounded-xl overflow-hidden shadow-inner border border-black/10 flex-shrink-0">
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => handlePickerChange("bg", e.target.value)}
                  className="absolute inset-0 cursor-pointer scale-150"
                />
              </div>
              <input 
                type="text" 
                value={bgInput} 
                maxLength={7}
                onChange={(e) => handleHexChange("bg", e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-mono text-base font-bold text-foreground uppercase tracking-wider text-left direction-ltr"
              />
              <button 
                onClick={() => copyColor(bgColor, "bg")}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="نسخ كود اللون"
              >
                {copied === "bg" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Swap Colors Button */}
          <div className="flex justify-center -my-3 relative z-10">
            <button
              onClick={swapColors}
              className="h-10 w-10 rounded-full bg-background border border-border hover:bg-primary hover:text-white shadow-md flex items-center justify-center transition-all duration-300 transform hover:rotate-180"
              title="تبديل لون الخلفية ولون النص"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Text/Element Color Picker */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-foreground">لون النص أو العناصر</label>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/40 focus-within:ring-2 focus-within:ring-primary/25 focus-within:border-primary transition-all">
              <div className="relative h-11 w-11 rounded-xl overflow-hidden shadow-inner border border-black/10 flex-shrink-0">
                <input 
                  type="color" 
                  value={fgColor} 
                  onChange={(e) => handlePickerChange("fg", e.target.value)}
                  className="absolute inset-0 cursor-pointer scale-150"
                />
              </div>
              <input 
                type="text" 
                value={fgInput} 
                maxLength={7}
                onChange={(e) => handleHexChange("fg", e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-mono text-base font-bold text-foreground uppercase tracking-wider text-left direction-ltr"
              />
              <button 
                onClick={() => copyColor(fgColor, "fg")}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="نسخ كود اللون"
              >
                {copied === "fg" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Preset Pairings Chips */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-muted-foreground">جرّب ألواناً شائعة في الهويات:</label>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset.bg, preset.fg)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-muted/20 hover:bg-accent text-xs font-semibold transition-all"
                >
                  <span className="w-4 h-4 rounded-full border border-black/5 flex-shrink-0" style={{ backgroundColor: preset.fg }}></span>
                  <span className="w-4 h-4 rounded-full border border-black/5 -mr-4 flex-shrink-0" style={{ backgroundColor: preset.bg }}></span>
                  <span className="mr-2 text-foreground">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Previews & Analysis */}
        <div className="md:col-span-7 bg-card border border-border/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between">
          
          {/* Live Visual Preview Band */}
          <div 
            className="p-8 sm:p-12 text-center transition-all duration-300" 
            style={{ backgroundColor: bgColor }}
          >
            <h3 
              className="text-2xl sm:text-3xl font-black mb-2" 
              style={{ color: fgColor }}
            >
              هكذا يبدو عنوان بهذين اللونين
            </h3>
            <p 
              className="text-sm max-w-md mx-auto leading-relaxed" 
              style={{ color: fgColor, opacity: 0.9 }}
            >
              وهذا نص فرعي لتتأكد من وضوح القراءة وجودتها في الحجم الصغير والتفاصيل الدقيقة أيضاً.
            </p>
          </div>

          {/* Contrast Value & Verdict */}
          <div className="p-6 sm:p-8 flex items-center gap-6 border-b border-border/50">
            <div 
              className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-white flex-shrink-0 shadow-lg"
              style={{ background: verdictStyle }}
            >
              <span className="font-mono text-2xl font-black leading-none">{ratioRounded.toFixed(1)}</span>
              <span className="text-[10px] mt-1 opacity-80">التباين</span>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">{verdictTitle}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{verdictDesc}</p>
            </div>
          </div>

          {/* WCAG Compliance Checks Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-muted/10">
            
            {/* AA Regular Text */}
            <div className={`p-4 rounded-2xl border text-center space-y-2 ${passAA ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
              <span className="block text-[10px] text-muted-foreground font-semibold">AA — نص عادي</span>
              <div className="flex items-center justify-center gap-1">
                {passAA ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-rose-500" />}
                <span className={`text-xs font-bold ${passAA ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {passAA ? '✓ ناجح' : '✕ غير كافٍ'}
                </span>
              </div>
            </div>

            {/* AA Large Text */}
            <div className={`p-4 rounded-2xl border text-center space-y-2 ${passAALarge ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
              <span className="block text-[10px] text-muted-foreground font-semibold">AA — نص كبير</span>
              <div className="flex items-center justify-center gap-1">
                {passAALarge ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-rose-500" />}
                <span className={`text-xs font-bold ${passAALarge ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {passAALarge ? '✓ ناجح' : '✕ غير كافٍ'}
                </span>
              </div>
            </div>

            {/* AAA Regular Text */}
            <div className={`p-4 rounded-2xl border text-center space-y-2 ${passAAA ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
              <span className="block text-[10px] text-muted-foreground font-semibold">AAA — نص عادي</span>
              <div className="flex items-center justify-center gap-1">
                {passAAA ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-rose-500" />}
                <span className={`text-xs font-bold ${passAAA ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {passAAA ? '✓ ناجح' : '✕ غير كافٍ'}
                </span>
              </div>
            </div>

            {/* AAA Large Text */}
            <div className={`p-4 rounded-2xl border text-center space-y-2 ${passAAALarge ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
              <span className="block text-[10px] text-muted-foreground font-semibold">AAA — نص كبير</span>
              <div className="flex items-center justify-center gap-1">
                {passAAALarge ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-rose-500" />}
                <span className={`text-xs font-bold ${passAAALarge ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {passAAALarge ? '✓ ناجح' : '✕ غير كافٍ'}
                </span>
              </div>
            </div>

          </div>

          {/* CTA Link Box */}
          <div className="p-6 bg-muted/20 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm text-center sm:text-right">
              إذا كانت ألوان براندك غير متناسقة أو لا تطابق معايير القراءة، فقد تفقد ثقة عملائك. تواصل مع مصممينا لتطوير وتناسق هويتك بالكامل.
            </p>
            <a 
              href="https://www.wearetagstudio.com/#contact-form"
              className="px-5 py-3 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
            >
              تواصل مع خبير التصميم ←
            </a>
          </div>

        </div>

      </div>

      {/* Guide details grid */}
      <div className="max-w-5xl mx-auto mt-16 space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <span>لماذا تهم نسبة تباين الألوان؟</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">01</div>
            <h3 className="font-bold text-foreground">وضوح القراءة</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              تباين ضعيف بين الخلفية والنص يُتعب عين العميل ويقلل وقت بقائه على موقعك وتصاميم السوشيال ميديا الخاصة بك.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs">02</div>
            <h3 className="font-bold text-foreground">الموثوقية والمهنية</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              العلامات التجارية والهويات البصرية التي تحترم معايير القراءة تُنظر إليها دائماً كعلامات أكثر جودة وموثوقية لدى العملاء.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xs">03</div>
            <h3 className="font-bold text-foreground">سهولة الوصول</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              معايير WCAG تضمن أن تصميمك مقروء لأصحاب ضعف البصر وعمى الألوان أيضاً، وهو مطلب أساسي في كثير من المناقصات الحكومية والشركات.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold text-xs">04</div>
            <h3 className="font-bold text-foreground">الاتساق عبر الشاشات</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              اختيار ألوان ذات تباين قوي يضمن ظهور تصاميمك بشكل رائع على جميع الشاشات باختلاف جودتها وإضاءتها، وكذلك في المطبوعات واللوحات الخارجية.
            </p>
          </div>
        </div>
      </div>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-[10px] text-muted-foreground">
        هذه الأداة تعتمد على معادلة التباين النسبي الرسمية لمعايير WCAG 2.1 العالمية. تاج ستوديو © 2026
      </footer>

    </div>
  )
}
