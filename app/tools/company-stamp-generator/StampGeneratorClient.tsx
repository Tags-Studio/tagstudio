"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

// Predefined official stamp colors
const COLOR_PRESETS = [
  { name: "أزرق رسمي (Royal Blue)", value: "#0b2545", color: "bg-[#0b2545]" },
  { name: "أحمر داكن (Crimson)", value: "#8b0000", color: "bg-[#8b0000]" },
  { name: "أخضر عيادات (Emerald)", value: "#0f5132", color: "bg-[#0f5132]" },
  { name: "بنفسجي ملكي (Purple)", value: "#4a0e4e", color: "bg-[#4a0e4e]" },
  { name: "أسود كربوني (Charcoal)", value: "#1e1e24", color: "bg-[#1e1e24]" },
]

// Icon presets for center
const ICON_PRESETS = [
  { id: "star", name: "نجمة ★", char: "★" },
  { id: "shield", name: "درع 🛡️", iconClass: "fas fa-shield-halved" },
  { id: "medical", name: "صليب طبي ✚", char: "✚" },
  { id: "handshake", name: "مصافحة 🤝", iconClass: "fas fa-handshake" },
  { id: "building", name: "مبنى 🏢", iconClass: "fas fa-building" },
  { id: "approved", name: "علامة صح ✓", char: "✓" },
  { id: "none", name: "بدون أيقونة", char: "" },
]

// Font presets
const FONTS = [
  { id: "cairo", name: "خط القاهرة (Cairo)", className: "font-cairo" },
  { id: "amiri", name: "الخط الأميري (Amiri)", className: "font-amiri" },
  { id: "outfit", name: "مودرن إنجليزي (Outfit)", className: "font-outfit" },
  { id: "inter", name: "سلك إنجليزي (Inter)", className: "font-inter" },
]

export default function StampGeneratorClient() {
  // --- State Configuration ---
  const [shape, setShape] = useState<"circle" | "rectangle">("circle")
  
  // Texts
  const [topText, setTopText] = useState("مجموعة تاج ستوديو الرقمية")
  const [bottomText, setBottomText] = useState("تصميم هوية بصرية وتطوير 2026")
  const [centerLine1, setCenterLine1] = useState("معتمد")
  const [centerLine2, setCenterLine2] = useState("APPROVED")
  
  // Rectangular texts (if rectangle selected)
  const [rectLine1, setRectLine1] = useState("تاج ستوديو للخدمات الطبية")
  const [rectLine2, setRectLine2] = useState("قسم إدارة الجودة والاعتماد")
  const [rectLine3, setRectLine3] = useState("تاريخ الاعتماد: 2026-07-31")

  // Side stars & icon
  const [hasSideStars, setHasSideStars] = useState(true)
  const [centerIcon, setCenterIcon] = useState("star")
  const [customCenterEmoji, setCustomCenterEmoji] = useState("")

  // Styles
  const [color, setColor] = useState("#0b2545")
  const [isCustomColor, setIsCustomColor] = useState(false)
  const [customColorVal, setCustomColorVal] = useState("#2563eb")
  const [fontFamily, setFontFamily] = useState("cairo")
  
  // Sizes & Borders
  const [borderThickness, setBorderThickness] = useState(4)
  const [innerRing, setInnerRing] = useState(true)
  const [innerRingThickness, setInnerRingThickness] = useState(1.5)
  const [borderStyle, setBorderStyle] = useState<"solid" | "dashed" | "double">("double")
  const [textRadius, setTextRadius] = useState(115)
  const [textLetterSpacing, setTextLetterSpacing] = useState(2) // custom spacing multiplier
  const [textSize, setTextSize] = useState(15)

  // Distress / Grunge Filter
  const [grungeLevel, setGrungeLevel] = useState(4) // 0 to 10
  
  // Preview Backing Mode
  const [backing, setBacking] = useState<"grid" | "light" | "dark">("light")
  const [activeTab, setActiveTab] = useState<"texts" | "shape" | "style" | "export">("texts")

  const svgRef = useRef<SVGSVGElement>(null)

  // Sync color selection
  const handleColorSelect = (val: string, isCustom = false) => {
    setColor(val)
    setIsCustomColor(isCustom)
  }

  // Generate dynamic filter attributes based on grungeLevel state
  const hasFilter = grungeLevel > 0
  const wobbleScale = grungeLevel * 0.7
  const grungeContrast = 12 + grungeLevel * 2.5
  const grungeOffset = grungeContrast / 2.1 - 0.2

  // Download SVG
  const handleDownloadSvg = () => {
    if (!svgRef.current) return
    const svgContent = new XMLSerializer().serializeToString(svgRef.current)
    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `tagstudio-stamp-${shape}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Download PNG (renders SVG onto canvas at high resolution)
  const handleDownloadPng = () => {
    if (!svgRef.current) return
    const svgElement = svgRef.current
    
    // Create image blob
    const svgString = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)
    
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      // Output PNG resolution is high-res 1200x1200px
      canvas.width = 1200
      canvas.height = 1200
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, 1200, 1200)
        ctx.drawImage(img, 0, 0, 1200, 1200)
        
        // Trigger download
        const pngUrl = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = pngUrl
        link.download = `tagstudio-stamp-${shape}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  // Copy SVG Code
  const handleCopySvgCode = () => {
    if (!svgRef.current) return
    const svgContent = new XMLSerializer().serializeToString(svgRef.current)
    navigator.clipboard.writeText(svgContent)
    alert("تم نسخ كود الختم SVG بنجاح!")
  }

  // Get SVG font class
  const getSelectedFontFamily = () => {
    const f = FONTS.find(font => font.id === fontFamily)
    return f ? f.className : "font-cairo"
  }

  // Format Letter Spacing for SVG
  const getLetterSpacingStyle = () => {
    return { letterSpacing: `${textLetterSpacing}px` }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
      
      {/* ─── LEFT: CONTROLS SIDEBAR ────────────────────────────────────────── */}
      <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden order-2 lg:order-1">
        
        {/* Tab switcher */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
          {[
            { id: "texts", name: "النصوص", icon: "fa-text-width" },
            { id: "shape", name: "الشكل والحدود", icon: "fa-circle-dot" },
            { id: "style", name: "الألوان والتأثير", icon: "fa-palette" },
            { id: "export", name: "تصدير وحفظ", icon: "fa-download" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3.5 px-2 text-xs md:text-sm font-bold flex flex-col md:flex-row items-center justify-center gap-1.5 transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900"
                  : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
              }`}
            >
              <i className={`fas ${tab.icon} text-sm`}></i>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 space-y-6">
          
          {/* TAB 1: TEXTS */}
          {activeTab === "texts" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl mb-4 border border-zinc-200/50 dark:border-zinc-800/50">
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">نوع الختم المعتمد</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShape("circle")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-black flex items-center justify-center gap-2 transition-all ${
                      shape === "circle"
                        ? "bg-zinc-900 text-white dark:bg-zinc-800"
                        : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <i className="far fa-circle text-xs"></i> دائري رسمي
                  </button>
                  <button
                    onClick={() => setShape("rectangle")}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-black flex items-center justify-center gap-2 transition-all ${
                      shape === "rectangle"
                        ? "bg-zinc-900 text-white dark:bg-zinc-800"
                        : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <i className="far fa-square text-xs"></i> مستطيل إداري
                  </button>
                </div>
              </div>

              {shape === "circle" ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">النص العلوي (اسم المنشأة)</label>
                    <input
                      type="text"
                      value={topText}
                      onChange={(e) => setTopText(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">النص السفلي (رقم السجل / الترخيص)</label>
                    <input
                      type="text"
                      value={bottomText}
                      onChange={(e) => setBottomText(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">النص الأوسط (1)</label>
                      <input
                        type="text"
                        value={centerLine1}
                        onChange={(e) => setCenterLine1(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">النص الأوسط (2)</label>
                      <input
                        type="text"
                        value={centerLine2}
                        onChange={(e) => setCenterLine2(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">أيقونة المركز</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="sidestars"
                          checked={hasSideStars}
                          onChange={(e) => setHasSideStars(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="sidestars" className="text-xs text-zinc-500 dark:text-zinc-400">النجمتان الجانبيتان</label>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {ICON_PRESETS.map((ic) => (
                        <button
                          key={ic.id}
                          onClick={() => setCenterIcon(ic.id)}
                          className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all ${
                            centerIcon === ic.id
                              ? "border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400"
                              : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                          }`}
                        >
                          {ic.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">السطر الأول</label>
                    <input
                      type="text"
                      value={rectLine1}
                      onChange={(e) => setRectLine1(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">السطر الثاني</label>
                    <input
                      type="text"
                      value={rectLine2}
                      onChange={(e) => setRectLine2(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">السطر الثالث</label>
                    <input
                      type="text"
                      value={rectLine3}
                      onChange={(e) => setRectLine3(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* TAB 2: SHAPE & BORDERS */}
          {activeTab === "shape" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">نمط الإطار الخارجي</label>
                <div className="flex gap-2">
                  {[
                    { id: "solid", name: "إطار مفرد", icon: "fa-minus" },
                    { id: "double", name: "إطار مزدوج", icon: "fa-bars" },
                    { id: "dashed", name: "إطار متقطع", icon: "fa-ellipsis" }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setBorderStyle(style.id as any)}
                      className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        borderStyle === style.id
                          ? "border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400"
                          : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <i className={`fas ${style.icon}`}></i>
                      <span>{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  <span>سمك الإطار الخارجي</span>
                  <span className="text-blue-600 dark:text-blue-400 font-black">{borderThickness}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={borderThickness}
                  onChange={(e) => setBorderThickness(parseFloat(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {shape === "circle" && (
                <>
                  <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
                    <div>
                      <span className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">الحلقة الداخلية المساعدة</span>
                      <span className="block text-xs text-zinc-400">إضافة خط دائري داخلي إضافي كديكور</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={innerRing}
                      onChange={(e) => setInnerRing(e.target.checked)}
                      className="w-10 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 checked:bg-blue-600 cursor-pointer appearance-none relative before:content-[''] before:absolute before:h-4 before:w-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-all checked:before:translate-x-5"
                    />
                  </div>

                  {innerRing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4"
                    >
                      <div>
                        <div className="flex justify-between text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                          <span>سمك الخط الداخلي</span>
                          <span className="text-blue-600 dark:text-blue-400 font-black">{innerRingThickness}px</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="4"
                          step="0.5"
                          value={innerRingThickness}
                          onChange={(e) => setInnerRingThickness(parseFloat(e.target.value))}
                          className="w-full accent-blue-600"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                          <span>قطر انحناء النصوص</span>
                          <span className="text-blue-600 dark:text-blue-400 font-black">{textRadius}px</span>
                        </div>
                        <input
                          type="range"
                          min="95"
                          max="135"
                          step="1"
                          value={textRadius}
                          onChange={(e) => setTextRadius(parseInt(e.target.value))}
                          className="w-full accent-blue-600"
                        />
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}

          {/* TAB 3: COLORS & DESIGN */}
          {activeTab === "style" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Color Presets */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2.5">لون حبر الختم</label>
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => handleColorSelect(preset.value)}
                      className={`h-9 w-full rounded-lg border-2 ${preset.color} ${
                        color === preset.value && !isCustomColor
                          ? "border-blue-500 scale-110 shadow-md"
                          : "border-transparent"
                      }`}
                      title={preset.name}
                    ></button>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="customcolor"
                      checked={isCustomColor}
                      onChange={(e) => handleColorSelect(customColorVal, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="customcolor" className="text-xs text-zinc-500 dark:text-zinc-400">تخصيص لون يدوي</label>
                  </div>
                  {isCustomColor && (
                    <input
                      type="color"
                      value={customColorVal}
                      onChange={(e) => {
                        setCustomColorVal(e.target.value)
                        setColor(e.target.value)
                      }}
                      className="h-8 w-14 rounded cursor-pointer border border-zinc-300 dark:border-zinc-700 bg-transparent p-0"
                    />
                  )}
                </div>
              </div>

              {/* Font Switcher */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">نوع الخط المستعمل</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm outline-none"
                >
                  {FONTS.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              {/* Letter Spacing & sizes (Circle only) */}
              {shape === "circle" && (
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-500 mb-1">
                      <span>حجم الخط</span>
                      <span>{textSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="11"
                      max="20"
                      step="0.5"
                      value={textSize}
                      onChange={(e) => setTextSize(parseFloat(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-zinc-500 mb-1">
                      <span>تباعد الأحرف</span>
                      <span>{textLetterSpacing}px</span>
                    </div>
                    <input
                      type="range"
                      min="-2"
                      max="10"
                      step="0.5"
                      value={textLetterSpacing}
                      onChange={(e) => setTextLetterSpacing(parseFloat(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* Grunge / Ink distress effect */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                <div className="flex justify-between text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  <span>محاكاة أثر الحبر (Grunge Effect)</span>
                  <span className="text-blue-600 dark:text-blue-400 font-black">مستوى {grungeLevel}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={grungeLevel}
                  onChange={(e) => setGrungeLevel(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <span className="block text-xs text-zinc-400 mt-1">يضيف خدوشاً وخشونة حقيقية على حواف الختم ليبدو كأنه طبع على ورق فعلي.</span>
              </div>
            </motion.div>
          )}

          {/* TAB 4: EXPORT & SAVE */}
          {activeTab === "export" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">تحميل الختم الرقمي بجودة كاملة</h3>
              
              <button
                onClick={handleDownloadPng}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                <i className="fas fa-file-image"></i> تحميل بخلفية شفافة PNG (1200px)
              </button>

              <button
                onClick={handleDownloadSvg}
                className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-black text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <i className="fas fa-file-code"></i> تحميل كملف متجهي SVG (Vector)
              </button>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                <button
                  onClick={handleCopySvgCode}
                  className="w-full py-2 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                >
                  <i className="far fa-copy"></i> نسخ كود الختم SVG للمصممين
                </button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 text-xs text-blue-700 dark:text-blue-400 mt-4 leading-relaxed">
                <i className="fas fa-info-circle ml-1"></i>
                صيغة <strong>SVG</strong> مثالية للمصممين لإعادة تعديل الختم على Illustrator أو Photoshop بدون فقدان جودة. صيغة <strong>PNG</strong> مثالية للاستخدام الفوري على الفواتير، التقارير والوثائق الرقمية.
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* ─── RIGHT: PREVIEW BOX ───────────────────────────────────────────── */}
      <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
        
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden p-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
            <div>
              <span className="text-sm font-bold text-zinc-900 dark:text-white block">لوحة معاينة الختم</span>
              <span className="text-xs text-zinc-400 block">شاهد التغييرات فوراً أثناء التصميم</span>
            </div>
            
            {/* Background Presets Toggle */}
            <div className="flex gap-1.5 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50">
              {[
                { id: "light", name: "ورق أبيض", icon: "fa-file-lines" },
                { id: "grid", name: "شفاف", icon: "fa-chess-board" },
                { id: "dark", name: "خلفية داكنة", icon: "fa-square-full text-[10px]" }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBacking(b.id as any)}
                  className={`py-1.5 px-3 rounded text-[10px] md:text-xs font-bold transition-all flex items-center gap-1 ${
                    backing === b.id
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <i className={`fas ${b.icon}`}></i>
                  <span>{b.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Inner canvas box */}
          <div
            className={`w-full max-w-[420px] aspect-square rounded-xl flex items-center justify-center shadow-inner relative transition-all border ${
              backing === "light"
                ? "bg-zinc-50 border-zinc-100"
                : backing === "dark"
                ? "bg-zinc-950 border-zinc-900"
                : "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            }`}
          >
            {/* RENDER THE DYNAMIC STAMP EMBEDDED IN SVG */}
            <svg
              ref={svgRef}
              id="stamp-svg"
              viewBox="0 0 400 400"
              width="100%"
              height="100%"
              className={`max-w-[360px] select-none ${getSelectedFontFamily()}`}
              style={{
                filter: hasFilter ? "url(#stamp-grunge-filter)" : "none",
                transform: "rotate(-4deg)", // standard stamp offset tilt
                transition: "transform 0.2s"
              }}
            >
              <defs>
                {/* 1. Real-time grunge distort filter */}
                <filter id="stamp-grunge-filter" x="-10%" y="-10%" width="120%" height="120%">
                  {/* Organic edge wobble */}
                  <feTurbulence 
                    type="fractalNoise" 
                    baseFrequency="0.035" 
                    numOctaves="4" 
                    result="noise" 
                  />
                  <feDisplacementMap 
                    in="SourceGraphic" 
                    in2="noise" 
                    scale={wobbleScale} 
                    xChannelSelector="R" 
                    yChannelSelector="G" 
                    result="displaced" 
                  />
                  
                  {/* Fractal specks/cuts (dust/scratches) */}
                  <feTurbulence 
                    type="fractalNoise" 
                    baseFrequency="0.14" 
                    numOctaves="3" 
                    result="grungeNoise" 
                  />
                  <feColorMatrix 
                    type="matrix" 
                    values={`
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 ${grungeContrast} -${grungeOffset}
                    `} 
                    result="grungeMask" 
                  />
                  
                  <feComposite 
                    operator="in" 
                    in="displaced" 
                    in2="grungeMask" 
                  />
                </filter>

                {/* Curved paths for circle text */}
                {/* Top path: clockwise left to right along top half */}
                <path
                  id="text-path-top"
                  d={`M ${200 - textRadius} 200 A ${textRadius} ${textRadius} 0 0 1 ${200 + textRadius} 200`}
                  fill="none"
                />
                {/* Bottom path: counter-clockwise left to right along bottom half */}
                <path
                  id="text-path-bottom"
                  d={`M ${200 - textRadius} 200 A ${textRadius} ${textRadius} 0 0 0 ${200 + textRadius} 200`}
                  fill="none"
                />
              </defs>

              {/* RENDER SHAPE 1: CIRCULAR STAMP */}
              {shape === "circle" && (
                <g id="circle-stamp-group">
                  {/* Outer circle borders based on selected style */}
                  {borderStyle === "solid" && (
                    <circle
                      cx="200"
                      cy="200"
                      r="175"
                      stroke={color}
                      strokeWidth={borderThickness}
                      fill="none"
                    />
                  )}
                  {borderStyle === "double" && (
                    <>
                      {/* Thicker outer ring */}
                      <circle
                        cx="200"
                        cy="200"
                        r="175"
                        stroke={color}
                        strokeWidth={borderThickness}
                        fill="none"
                      />
                      {/* Thinner inner ring */}
                      <circle
                        cx="200"
                        cy="200"
                        r="165"
                        stroke={color}
                        strokeWidth={1}
                        fill="none"
                      />
                    </>
                  )}
                  {borderStyle === "dashed" && (
                    <circle
                      cx="200"
                      cy="200"
                      r="175"
                      stroke={color}
                      strokeWidth={borderThickness}
                      strokeDasharray="12 7"
                      fill="none"
                    />
                  )}

                  {/* Ring inner helpers */}
                  {innerRing && (
                    <circle
                      cx="200"
                      cy="200"
                      r="95"
                      stroke={color}
                      strokeWidth={innerRingThickness}
                      fill="none"
                    />
                  )}

                  {/* Curved Top text */}
                  <text
                    fill={color}
                    fontSize={textSize}
                    fontWeight="bold"
                    style={getLetterSpacingStyle()}
                  >
                    <textPath href="#text-path-top" startOffset="50%" textAnchor="middle">
                      {topText}
                    </textPath>
                  </text>

                  {/* Curved Bottom text */}
                  <text
                    fill={color}
                    fontSize={textSize}
                    fontWeight="bold"
                    style={getLetterSpacingStyle()}
                  >
                    <textPath href="#text-path-bottom" startOffset="50%" textAnchor="middle">
                      {bottomText}
                    </textPath>
                  </text>

                  {/* Side Stars (separating top/bottom text) */}
                  {hasSideStars && (
                    <>
                      {/* Left star decoration */}
                      <text
                        x={200 - textRadius}
                        y="204"
                        fontSize={textSize * 1.1}
                        fill={color}
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        ★
                      </text>
                      {/* Right star decoration */}
                      <text
                        x={200 + textRadius}
                        y="204"
                        fontSize={textSize * 1.1}
                        fill={color}
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        ★
                      </text>
                    </>
                  )}

                  {/* Center elements */}
                  <g id="center-content">
                    {/* Render Selected Icon */}
                    {centerIcon === "star" && (
                      <text x="200" y="165" fontSize="24" fill={color} textAnchor="middle">★</text>
                    )}
                    {centerIcon === "shield" && (
                      <path
                        d="M200 135 c10 0 18 8 18 18 v10 c0 12 -8 20 -18 24 c-10 -4 -18 -12 -18 -24 v-10 c0 -10 8 -18 18 -18 z"
                        fill="none"
                        stroke={color}
                        strokeWidth="2.5"
                      />
                    )}
                    {centerIcon === "medical" && (
                      <text x="200" y="167" fontSize="24" fill={color} textAnchor="middle">✚</text>
                    )}
                    {centerIcon === "handshake" && (
                      <path
                        d="M185 155 Q190 148 200 155 T215 155 M180 160 Q190 153 200 160 T220 160"
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    )}
                    {centerIcon === "building" && (
                      <path
                        d="M188 168 v-25 h24 v25 M194 148 h4 M194 154 h4 M194 160 h4 M202 148 h4 M202 154 h4 M202 160 h4"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                      />
                    )}
                    {centerIcon === "approved" && (
                      <path
                        d="M190 154 l7 7 l13 -14"
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Middle Text Line 1 */}
                    <text
                      x="200"
                      y={centerIcon !== "none" ? "205" : "195"}
                      fontSize="20"
                      fontWeight="900"
                      fill={color}
                      textAnchor="middle"
                    >
                      {centerLine1}
                    </text>

                    {/* Middle Text Line 2 */}
                    <text
                      x="200"
                      y={centerIcon !== "none" ? "232" : "222"}
                      fontSize="11"
                      fontWeight="bold"
                      fill={color}
                      textAnchor="middle"
                      style={{ letterSpacing: "1px" }}
                    >
                      {centerLine2}
                    </text>
                  </g>
                </g>
              )}

              {/* RENDER SHAPE 2: RECTANGULAR STAMP */}
              {shape === "rectangle" && (
                <g id="rectangle-stamp-group">
                  {/* Outer border offset */}
                  {borderStyle === "solid" && (
                    <rect
                      x="25"
                      y="110"
                      width="350"
                      height="180"
                      rx="10"
                      ry="10"
                      stroke={color}
                      strokeWidth={borderThickness}
                      fill="none"
                    />
                  )}
                  {borderStyle === "double" && (
                    <>
                      {/* Outer rectangle */}
                      <rect
                        x="25"
                        y="110"
                        width="350"
                        height="180"
                        rx="10"
                        ry="10"
                        stroke={color}
                        strokeWidth={borderThickness}
                        fill="none"
                      />
                      {/* Inner rectangle */}
                      <rect
                        x="32"
                        y="117"
                        width="336"
                        height="166"
                        rx="7"
                        ry="7"
                        stroke={color}
                        strokeWidth={1}
                        fill="none"
                      />
                    </>
                  )}
                  {borderStyle === "dashed" && (
                    <rect
                      x="25"
                      y="110"
                      width="350"
                      height="180"
                      rx="10"
                      ry="10"
                      stroke={color}
                      strokeWidth={borderThickness}
                      strokeDasharray="14 8"
                      fill="none"
                    />
                  )}

                  {/* Horizontal Line Row 1 */}
                  <text
                    x="200"
                    y="160"
                    fontSize="17"
                    fontWeight="bold"
                    fill={color}
                    textAnchor="middle"
                  >
                    {rectLine1}
                  </text>

                  {/* Separator inside rectangle */}
                  <line
                    x1="45"
                    y1="180"
                    x2="355"
                    y2="180"
                    stroke={color}
                    strokeWidth="2.5"
                  />

                  {/* Horizontal Line Row 2 */}
                  <text
                    x="200"
                    y="218"
                    fontSize="22"
                    fontWeight="900"
                    fill={color}
                    textAnchor="middle"
                  >
                    {rectLine2}
                  </text>

                  {/* Horizontal Line Row 3 */}
                  <text
                    x="200"
                    y="258"
                    fontSize="13"
                    fontWeight="bold"
                    fill={color}
                    textAnchor="middle"
                  >
                    {rectLine3}
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Dynamic usage tips */}
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400 space-y-3 leading-relaxed">
          <h4 className="font-black text-zinc-900 dark:text-white flex items-center gap-1.5"><i className="fas fa-lightbulb text-yellow-500"></i> نصائح لتصميم ختم رسمي معتمد:</h4>
          <ul className="list-disc pr-5 space-y-2 text-xs">
            <li><strong>اللون الأزرق الملكي:</strong> هو اللون الافتراضي والأنسب للأوراق الرسمية والقرارات القانونية والإدارية.</li>
            <li><strong>اللون الأحمر:</strong> يُستخدم عادة للقرارات العاجلة، الرفض، الغرامات، أو الأوراق الحساسة (مثل "سري للغاية").</li>
            <li><strong>اللون الأخضر:</strong> ممتاز للمراكز الطبية والمؤسسات الصحية أو الصيدلانية لربطه بالطبيعة والشفاء.</li>
            <li><strong>حجم السجل التجاري:</strong> في السعودية ومصر، يفضل إدراج رقم السجل التجاري الموحد (CR) في الجزء السفلي من الختم الدائري لتعزيز قانونية وتوثيق الختم.</li>
          </ul>
        </div>

      </div>

    </div>
  )
}
