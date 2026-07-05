"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Script from "next/script"
import { 
  ChevronLeft, 
  Upload, 
  Trash2, 
  Check, 
  Download, 
  Grid,
  Info,
  Layers,
  RefreshCw,
  Sparkles
} from "lucide-react"

interface TileInfo {
  dataUrl: string
  blob: Blob | null
  index: number
}

export default function InstagramGridSplitter() {
  const [pieces, setPieces] = useState<number>(3)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [tiles, setTiles] = useState<TileInfo[]>([])
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [isZipLoading, setIsZipLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // Re-process image when pieces count changes or a new image is loaded
  useEffect(() => {
    if (imgSrc) {
      const image = new Image()
      image.onload = () => {
        splitImage(image, pieces)
      };
      image.src = imgSrc
    }
  }, [pieces, imgSrc])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => {
      setImgSrc(reader.result as string)
      setFileName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const splitImage = (img: HTMLImageElement, numPieces: number) => {
    const w = img.naturalWidth
    const h = img.naturalHeight
    const tileW = Math.floor(w / numPieces)
    const newTiles: TileInfo[] = []

    for (let i = 0; i < numPieces; i++) {
      const canvas = document.createElement("canvas")
      canvas.width = tileW
      canvas.height = h
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, i * tileW, 0, tileW, h, 0, 0, tileW, h)
        const dataUrl = canvas.toDataURL("image/png")
        newTiles.push({
          dataUrl,
          blob: null, // will generate blob as needed or asynchronously
          index: i
        })
      }
    }

    setTiles(newTiles)

    // Generate blobs asynchronously
    newTiles.forEach((tile, index) => {
      const canvas = document.createElement("canvas")
      canvas.width = tileW
      canvas.height = h
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, index * tileW, 0, tileW, h, 0, 0, tileW, h)
        canvas.toBlob((blob) => {
          setTiles(prev => {
            const updated = [...prev]
            if (updated[index]) {
              updated[index] = { ...updated[index], blob }
            }
            return updated
          })
        }, "image/png")
      }
    })
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

  const downloadAllAsZip = async () => {
    const JSZip = (window as any).JSZip
    if (!JSZip) {
      alert("جاري تحميل مكتبة الضغط، يرجى الانتظار لحين اكتمال التحميل ثم المحاولة مرة أخرى.")
      return
    }

    setIsZipLoading(true)
    try {
      const zip = new JSZip()
      tiles.forEach((tile, i) => {
        if (tile.blob) {
          zip.file(`tag-studio-part-${i + 1}.png`, tile.blob)
        }
      })

      const content = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(content)
      const a = document.createElement("a")
      a.href = url
      a.download = "tag-studio-instagram-grid.zip"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error("Error generating ZIP file:", e)
      alert("حدث خطأ أثناء محاولة إنشاء الملف المضغوط.")
    } finally {
      setIsZipLoading(false)
    }
  }

  const resetAll = () => {
    setImgSrc(null)
    setFileName(null)
    setTiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/95 to-background/90 text-foreground">
      {/* Dynamic script loading for JSZip */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js" 
        strategy="lazyOnload" 
      />

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
              🧩 أدوات تاج ستوديو
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              أداة تقسيم الصور لإنستغرام
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              ارفع صورة عريضة واحدة، واختر عدد الأجزاء، فتقسمها الأداة إلى منشورات منفصلة تتراصف جنباً إلى جنب على شبكة حسابك بشكل متكامل واحترافي.
            </p>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Configuration */}
        <div className="md:col-span-5 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* File Upload Box */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-foreground">ارفع صورتك العريضة</label>
            
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
              
              {imgSrc ? (
                <div className="space-y-3 w-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold text-primary truncate px-4">{fileName}</p>
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

          {/* Slices Counter selection */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-foreground">عدد الأجزاء (المنشورات)</label>
            <div className="flex gap-2 p-1 bg-muted/40 border border-border/50 rounded-2xl">
              {[2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setPieces(num)}
                  className={`flex-1 py-2.5 rounded-xl font-mono font-bold text-sm transition-all ${
                    pieces === num ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Resolution Guide box */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/25 flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-muted-foreground">
              لأفضل جودة، استخدم صورة بعرض لا يقل عن <span className="font-bold text-foreground font-mono">1080</span> بكسل لكل جزء — يعني صورة بعرض <span className="font-bold text-primary font-mono">{fmt(pieces * 1080)}</span> بكسل للتقسيم إلى {pieces} أجزاء.
            </div>
          </div>

        </div>

        {/* Right Column: Previews and Download list */}
        <div className="md:col-span-7 bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {tiles.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground border-2 border-dashed border-border/60 rounded-2xl bg-muted/10 gap-3">
              <Layers className="h-10 w-10 text-muted-foreground/60" />
              <p className="text-xs">ارفع صورة عريضة لمعاينة تقسيمها إلى منشورات متجاورة هنا.</p>
            </div>
          ) : (
            /* Grid Preview & Output Tiles */
            <div className="space-y-8">
              
              {/* Instagram Profile Grid mockup */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                  <Grid className="h-4 w-4 text-primary" />
                  <span>معاينة الشبكة على حسابك (Grid Preview)</span>
                </span>
                
                {/* Horizontal grid list */}
                <div className="flex gap-0.5 bg-black rounded-xl overflow-hidden border border-border/40 shadow-lg">
                  {tiles.map((tile) => (
                    <div 
                      key={tile.index}
                      className="flex-1 aspect-[1/1.1] bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${tile.dataUrl})` }}
                    >
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                        {tile.index + 1}/{pieces}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ready tiles list */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-muted-foreground">الأجزاء الجاهزة للتحميل:</span>
                
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                  {tiles.map((tile) => (
                    <div 
                      key={tile.index}
                      className="flex-shrink-0 w-28 border border-border/80 bg-muted/20 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      <div 
                        className="w-full aspect-[4/5] bg-cover bg-center"
                        style={{ backgroundImage: `url(${tile.dataUrl})` }}
                      ></div>
                      <div className="p-2 flex items-center justify-between border-t border-border/40">
                        <span className="text-[10px] font-bold text-foreground">جزء {tile.index + 1}</span>
                        <a 
                          href={tile.dataUrl}
                          download={`tag-studio-part-${tile.index + 1}.png`}
                          className="p-1 rounded bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
                          title="تحميل الجزء"
                        >
                          <Download className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={downloadAllAsZip}
                  disabled={isZipLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50"
                >
                  <Download className="h-4.5 w-4.5" />
                  <span>{isZipLoading ? "جاري إنشاء ملف الـ ZIP..." : "تحميل جميع الأجزاء (ZIP) ↓"}</span>
                </button>
                
                <button
                  onClick={resetAll}
                  className="px-4 py-3 rounded-xl border border-border bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground font-bold text-xs transition-colors"
                >
                  ابدأ من جديد
                </button>
              </div>

              {/* Order notice warn */}
              <p className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-[11px] text-muted-foreground leading-relaxed">
                📌 <b>ترتيب النشر:</b> شبكة إنستغرام تعرض أحدث منشور أولاً في الأعلى، لذلك انشر الأجزاء بترتيب عكسي — ابدأ بـ **الجزء الأخير (الأيمن)** وانتهِ بـ **الجزء الأول (الأيسر)** في جلسة نشر واحدة متتالية حتى لا تتداخل مع منشورات أخرى.
              </p>

            </div>
          )}

          {/* CTA Banner */}
          <div className="w-full bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-5 space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              هل تريد أن تبدو شبكة حسابك واحترافية وذات هوية تسويقية متسقة على الدوام؟ دع فريق تاج ستوديو يتولى تصميم وإدارة محتوى حساباتك الاجتماعية بأسلوب إبداعي وجذاب.
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

      {/* How it works details */}
      <div className="max-w-5xl mx-auto mt-16 space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>كيف تعمل أداة تقسيم الصور؟</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">01</div>
            <h3 className="font-bold text-foreground">تقسيم دقيق وسريع</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              تقص الأداة صورتك إلى أجزاء متساوية العرض وبجودة كاملة دون أي ضغط يقلل من وضوح تفاصيل تصميمك البانورامي.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs">02</div>
            <h3 className="font-bold text-foreground">معاينة وتناسق قبل النشر</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              تشاهد شكل الأجزاء وهي متجاورة تماماً كما ستظهر في الملف الشخصي لإنستغرام، لتتأكد من مظهرها قبل التحميل.
            </p>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-6 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xs">03</div>
            <h3 className="font-bold text-foreground">خصوصية كاملة 100%</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              تتم عملية التقطيع والضغط بالكامل داخل متصفحك محلياً؛ صورك لا تُرفع لأي خوادم خارجية لحماية خصوصيتك وسرية تصاميمك.
            </p>
          </div>
        </div>
      </div>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-[10px] text-muted-foreground leading-relaxed">
        لأفضل نتيجة، انشر جميع الأجزاء في جلسة واحدة متتالية لتفادي تداخل منشورات أخرى بين الأجزاء. تاج ستوديو © 2026
      </footer>

    </div>
  )
}
