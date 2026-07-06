"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, 
  Upload, 
  Smartphone, 
  Grid, 
  Eye, 
  EyeOff, 
  ZoomIn, 
  Info,
  Instagram,
  Sparkles,
  MessageSquare,
  Bookmark,
  Share2,
  Trash2,
  Heart
} from "lucide-react"


// Platform specifications
interface PlatformSpec {
  name: string
  w: number
  h: number
  radius: string
  maxH: number
  bands: { pos: "top" | "bottom" | "right"; pct: number }[]
  icons: "story" | "tiktok" | "snap" | false
  label: string
  dotColor: string
}

const PLATFORMS: Record<string, PlatformSpec> = {
  ig_post: { 
    name: "منشور إنستغرام", 
    w: 1080, 
    h: 1350, 
    radius: "18px", 
    maxH: 460, 
    bands: [], 
    icons: false, 
    label: "1080×1350 (4:5)",
    dotColor: "#E1306C" 
  },
  ig_story: { 
    name: "ستوري / ريلز إنستغرام", 
    w: 1080, 
    h: 1920, 
    radius: "28px", 
    maxH: 520, 
    bands: [
      { pos: "top", pct: 13 }, 
      { pos: "bottom", pct: 20 }
    ], 
    icons: "story", 
    label: "1080×1920 (9:16)",
    dotColor: "#833AB4" 
  },
  tiktok: { 
    name: "تيك توك", 
    w: 1080, 
    h: 1920, 
    radius: "28px", 
    maxH: 520, 
    bands: [
      { pos: "top", pct: 7 }, 
      { pos: "bottom", pct: 32 }, 
      { pos: "right", pct: 16 }
    ], 
    icons: "tiktok", 
    label: "1080×1920 (9:16)",
    dotColor: "#25F4EE" 
  },
  snap: { 
    name: "سناب شات", 
    w: 1080, 
    h: 1920, 
    radius: "28px", 
    maxH: 520, 
    bands: [
      { pos: "top", pct: 10 }, 
      { pos: "bottom", pct: 18 }
    ], 
    icons: "snap", 
    label: "1080×1920 (9:16)",
    dotColor: "#FFFC00" 
  }
}

export default function SafeAreaPreviewer() {
  const [currentPlatform, setCurrentPlatform] = useState<string>("ig_post")
  const [showGuides, setShowGuides] = useState<boolean>(true)
  const [zoom, setZoom] = useState<number>(100)
  const [imgDataUrl, setImgDataUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const spec = PLATFORMS[currentPlatform]
  const ratio = spec.w / spec.h

  // Responsive frame dimensions calculations
  let frameH = spec.maxH
  let frameW = frameH * ratio
  const maxW = 320
  if (frameW > maxW) {
    frameW = maxW
    frameH = frameW / ratio
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => {
      setImgDataUrl(reader.result as string)
      setFileName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const onDragLeave = () => {
    setIsDragOver(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImgDataUrl(null)
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Get Safe Area bounding box percentages
  const getSafeBoxStyles = () => {
    const topBand = spec.bands.find(b => b.pos === "top")?.pct || 0
    const bottomBand = spec.bands.find(b => b.pos === "bottom")?.pct || 0
    const rightBand = spec.bands.find(b => b.pos === "right")?.pct || 0
    
    return {
      top: `${topBand}%`,
      bottom: `${bottomBand}%`,
      left: "4%",
      right: `${rightBand + 4}%`
    }
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
              📐 أدوات تاج ستوديو
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              معاين المقاسات والمناطق الآمنة
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              ارفع تصميمك وجرّبه داخل قوالب إنستغرام وتيك توك وسناب شات الحقيقية، لتتأكد أن النصوص والشعار لن يُقصّا خلف أيقونات المنصة أو حواف الشاشات.
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls */}
        <div className="md:col-span-5 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* File Upload Box */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-foreground">ارفع تصميمك لمعاينته</label>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] ${
                isDragOver 
                  ? "border-primary bg-primary/5" 
                  : "border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/50"
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              {imgDataUrl ? (
                <div className="space-y-3 w-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold text-primary truncate px-4">{fileName}</p>
                  <button 
                    onClick={removeImage}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>حذف الصورة</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    اضغط هنا لاختيار صورة، أو اسحبها وأفلتها هنا
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Platform Template selection */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-foreground">اختر المنصة والقالب</label>
            <div className="flex flex-col gap-2">
              {Object.entries(PLATFORMS).map(([key, value]) => {
                const isSelected = currentPlatform === key
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentPlatform(key)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-right transition-all duration-300 hover:bg-accent/40 ${
                      isSelected 
                        ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary/45 shadow-sm" 
                        : "border-border/60 bg-transparent text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: value.dotColor }}></span>
                      <span className="font-bold text-foreground text-xs">{value.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground font-semibold">{value.label.split(" ")[1] || value.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Zoom Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <ZoomIn className="h-3.5 w-3.5 text-primary" />
                <span>تقريب وتقليص الصورة</span>
              </label>
              <span className="font-mono font-bold text-xs text-primary">{zoom}%</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="200" 
              value={zoom} 
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Toggle Guides */}
          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Grid className="h-4 w-4 text-primary" />
              <span>إظهار المنطقة الآمنة</span>
            </span>
            <button
              onClick={() => setShowGuides(!showGuides)}
              className={`p-2 rounded-xl transition-all ${
                showGuides ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}
              title={showGuides ? "إخفاء الخطوط الإرشادية" : "إظهار الخطوط الإرشادية"}
            >
              {showGuides ? <Eye className="h-4.5 w-4.5" /> : <EyeOff className="h-4.5 w-4.5" />}
            </button>
          </div>

        </div>

        {/* Right Column: Previews Device Frame */}
        <div className="md:col-span-7 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center gap-6">
          
          {/* Device Frame Stage */}
          <div className="w-full bg-slate-950 rounded-2xl p-6 flex justify-center items-center min-h-[440px] border border-white/5 relative overflow-hidden">
            <div 
              className="device-frame transition-all duration-300 relative"
              style={{
                width: `${frameW}px`,
                height: `${frameH}px`,
                borderRadius: spec.radius,
                borderWidth: "5px"
              }}
            >
              {/* Background Image Layer */}
              {imgDataUrl ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-150"
                  style={{ 
                    backgroundImage: `url(${imgDataUrl})`,
                    backgroundSize: `${zoom}%`
                  }}
                ></div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 text-xs gap-2 p-6 text-center">
                  <Smartphone className="h-10 w-10 text-zinc-700" />
                  <span>ارفع صورة تصميمك لمعاينته داخل الهاتف</span>
                </div>
              )}

              {/* Safe Area guides Overlay */}
              {showGuides && (
                <div className="absolute inset-0 pointer-events-none z-20">
                  {spec.bands.map((band, idx) => {
                    const style: React.CSSProperties = {
                      position: "absolute",
                      left: 0,
                      right: 0,
                      background: "repeating-linear-gradient(-45deg, rgba(239, 68, 68, 0.35), rgba(239, 68, 68, 0.35) 6px, rgba(239, 68, 68, 0.15) 6px, rgba(239, 68, 68, 0.15) 12px)",
                      borderTop: "1px dashed rgba(255, 255, 255, 0.4)",
                      borderBottom: "1px dashed rgba(255, 255, 255, 0.4)"
                    }

                    if (band.pos === "top" || band.pos === "bottom") {
                      style.height = `${band.pct}%`
                      style[band.pos] = 0
                    } else if (band.pos === "right") {
                      style.width = `${band.pct}%`
                      style.right = 0
                      style.top = 0
                      style.bottom = 0
                      style.borderRight = "1px dashed rgba(255, 255, 255, 0.4)"
                      style.borderTop = "none"
                      style.borderBottom = "none"
                    }

                    return <div key={idx} style={style}></div>
                  })}

                  {/* Golden Safe Area Dashed Outline */}
                  <div 
                    className="absolute border border-dashed border-amber-400/80 rounded-md z-30 pointer-events-none"
                    style={getSafeBoxStyles()}
                  ></div>
                </div>
              )}

              {/* Social Media Overlays / Mock UI Icons */}
              {showGuides && spec.icons && (
                <div className="absolute inset-0 pointer-events-none z-30 opacity-90 text-white">
                  {/* Top Bar username */}
                  <div className="absolute top-4 right-4 left-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md"></div>
                    <div className="h-2 w-16 rounded-full bg-white/40"></div>
                  </div>

                  {/* Right Actions column for TikTok */}
                  {spec.icons === "tiktok" && (
                    <div className="absolute bottom-20 left-3 flex flex-col gap-4 items-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                        <Heart className="h-4 w-4 text-white" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                        <Bookmark className="h-4 w-4 text-white" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                        <Share2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Caption Bars */}
                  <div className="absolute bottom-6 right-4 left-16 space-y-1.5">
                    <div className="h-2.5 w-3/4 rounded-full bg-white/30"></div>
                    <div className="h-2.5 w-1/2 rounded-full bg-white/20"></div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Info Details */}
          <div className="text-center space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">
              مقاس التصميم المعياري: <span className="font-mono text-primary font-bold">{spec.label.split(" ")[0]}</span> بكسل
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground max-w-sm mx-auto">
              <span className="w-3.5 h-3.5 rounded-sm bg-gradient-to-r from-rose-500/50 to-rose-500/20 border border-dashed border-rose-500/60 flex-shrink-0"></span>
              <span>المناطق المظللة بالأحمر قد تُحجب أو تُقص — تجنب وضع نصوص أو شعارات فيها.</span>
            </div>
          </div>

          {/* CTA Box */}
          <div className="w-full bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-5 space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              هذه الأداة توضح الفارق بين عمل هاوٍ وتصميم احترافي يراعي تفاصيل عرض المنصات بدقة. دع فريق تاج ستوديو يتولى إدارة وتصميم حساباتك التسويقية بأعلى درجات الاتساق والجاذبية.
            </p>
            <a 
              href="https://www.wearetagstudio.com/#contact-form"
              className="inline-flex justify-center items-center w-full py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md transition-colors"
            >
              تواصل مع فريق تاج ستوديو ←
            </a>
          </div>

        </div>

      </div>

      {/* Why it matters details */}
      <div className="max-w-5xl mx-auto mt-16 space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <span>لماذا يجب مراعاة المناطق الآمنة بالتصميم؟</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <span className="font-mono font-extrabold text-amber-500 text-xs">01</span>
            <h3 className="font-bold text-foreground">أزرار وواجهات المنصات</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              تضع المنصات (إنستغرام، تيك توك، سناب) زر الإعجاب، التعليق، كود الصوت، واسم الحساب فوق الصورة الإعلانية مباشرة، مما يجعل أي نصوص توضع خلفها غير مقروءة.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <span className="font-mono font-extrabold text-amber-500 text-xs">02</span>
            <h3 className="font-bold text-foreground">حواف القص بالشاشات</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              تختلف شاشات الهواتف في نسب العرض (Aspect Ratio). تفعيل المنطقة الآمنة يضمن ظهور شعارك والمعلومات الأساسية كاملة دون أي اقتطاع على شاشات الهواتف الطويلة أو العريضة.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <span className="font-mono font-extrabold text-amber-500 text-xs">03</span>
            <h3 className="font-bold text-foreground">هيبة وهوية علامتك</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              ظهور بوست يحتوي على نصوص مقتطعة أو شعارات مخفية يعطي انطباعاً سلبياً وغير مهني عن مشروعك، التنسيق الاحترافي يترجم فوراً زيادة الثقة والمبيعات.
            </p>
          </div>
        </div>
      </div>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-[10px] text-muted-foreground leading-relaxed">
        مقاسات المناطق الآمنة تقريبية ومبنية على تحديثات واجهات المنصات لعام 2026، وقد تختلف بفروق بسيطة حسب إصدار تطبيق المستخدم وحجم شاشته. تاج ستوديو © 2026
      </footer>

    </div>
  )
}
