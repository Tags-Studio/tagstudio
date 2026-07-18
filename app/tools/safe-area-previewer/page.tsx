"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion } from "framer-motion"

// ─── Data ─────────────────────────────────────────────────────────────────────

interface DeviceSpec {
  name: string
  icon: string
  w: number
  h: number
  cr: number
  pTop: number
  pBottom: number
  pLeft: number
  pRight: number
  lTop: number
  lBottom: number
  lLeft: number
  lRight: number
  di: { w: number, h: number, top: number } | null
  notch: { w: number, h: number, top: number } | null
  homeBtn: boolean
  hasHomeInd: boolean
}

const DEVICES: Record<string, DeviceSpec> = {
  "iphone-15-pro-max": {
    name: "iPhone 15 Pro Max", icon: "fa-mobile-screen", w: 430, h: 932, cr: 55,
    pTop: 59, pBottom: 34, pLeft: 0, pRight: 0, lTop: 0, lBottom: 0, lLeft: 59, lRight: 21,
    di: { w: 126, h: 37, top: 11 }, notch: null, homeBtn: false, hasHomeInd: true
  },
  "iphone-15-pro": {
    name: "iPhone 15 Pro", icon: "fa-mobile-screen", w: 393, h: 852, cr: 55,
    pTop: 59, pBottom: 34, pLeft: 0, pRight: 0, lTop: 0, lBottom: 0, lLeft: 59, lRight: 21,
    di: { w: 126, h: 37, top: 11 }, notch: null, homeBtn: false, hasHomeInd: true
  },
  "iphone-15": {
    name: "iPhone 15", icon: "fa-mobile-screen", w: 393, h: 852, cr: 55,
    pTop: 59, pBottom: 34, pLeft: 0, pRight: 0, lTop: 0, lBottom: 0, lLeft: 59, lRight: 21,
    di: { w: 126, h: 37, top: 11 }, notch: null, homeBtn: false, hasHomeInd: true
  },
  "iphone-14": {
    name: "iPhone 14", icon: "fa-mobile-screen", w: 390, h: 844, cr: 47,
    pTop: 54, pBottom: 34, pLeft: 0, pRight: 0, lTop: 0, lBottom: 0, lLeft: 47, lRight: 21,
    di: null, notch: { w: 126, h: 34, top: 0 }, homeBtn: false, hasHomeInd: true
  },
  "iphone-se": {
    name: "iPhone SE", icon: "fa-mobile-screen", w: 375, h: 667, cr: 0,
    pTop: 20, pBottom: 0, pLeft: 0, pRight: 0, lTop: 0, lBottom: 0, lLeft: 0, lRight: 0,
    di: null, notch: null, homeBtn: true, hasHomeInd: false
  },
  "ipad-pro-129": {
    name: "iPad Pro 12.9\"", icon: "fa-tablet-screen-button", w: 1024, h: 1366, cr: 20,
    pTop: 24, pBottom: 20, pLeft: 20, pRight: 20, lTop: 20, lBottom: 20, lLeft: 24, lRight: 20,
    di: null, notch: null, homeBtn: false, hasHomeInd: true
  },
  "ipad-pro-11": {
    name: "iPad Pro 11\"", icon: "fa-tablet-screen-button", w: 834, h: 1194, cr: 20,
    pTop: 24, pBottom: 20, pLeft: 20, pRight: 20, lTop: 20, lBottom: 20, lLeft: 24, lRight: 20,
    di: null, notch: null, homeBtn: false, hasHomeInd: true
  },
  "ipad-mini": {
    name: "iPad Mini", icon: "fa-tablet-screen-button", w: 744, h: 1133, cr: 16,
    pTop: 20, pBottom: 20, pLeft: 16, pRight: 16, lTop: 16, lBottom: 16, lLeft: 20, lRight: 20,
    di: null, notch: null, homeBtn: false, hasHomeInd: true
  }
}

const PHONES = ["iphone-15-pro-max","iphone-15-pro","iphone-15","iphone-14","iphone-se"]
const IPADS = ["ipad-pro-129","ipad-pro-11","ipad-mini"]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ checked, onChange, label, color }: { checked: boolean, onChange: () => void, label: string, color: string }) {
  return (
    <div className="toggle-wrap" onClick={onChange}>
      <div className="toggle-label"><span className="dot" style={{ background: color }}></span>{label}</div>
      <div className={`toggle ${checked ? "on" : ""}`}></div>
    </div>
  )
}

function Toast({ show }: { show: boolean }) {
  return (
    <div className={`toast ${show ? "show" : ""}`}>
      <i className="fas fa-check-circle ml-2" style={{ color: "var(--green)" }}></i>تم نسخ كود CSS بنجاح
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SafeAreaPreviewer() {
  const [deviceKey, setDeviceKey] = useState("iphone-15-pro-max")
  const [orientation, setOrientation] = useState<"portrait"|"landscape">("portrait")
  const [layers, setLayers] = useState({ status: true, di: true, home: true, content: true, sides: true })
  const [opacity, setOpacity] = useState(18)
  const [bg, setBg] = useState<"grid"|"white"|"dark"|"image">("grid")
  const [bgImage, setBgImage] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const d = DEVICES[deviceKey]
  const isLand = orientation === "landscape"
  const dw = isLand ? d.h : d.w
  const dh = isLand ? d.w : d.h
  const top = isLand ? d.lTop : d.pTop
  const bottom = isLand ? d.lBottom : d.pBottom
  const left = isLand ? d.lLeft : d.pLeft
  const right = isLand ? d.lRight : d.pRight

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setBgImage(url)
      setBg("image")
    }
  }

  const toggleAll = () => {
    setLayers({ status: true, di: true, home: true, content: true, sides: true })
  }

  const hasHardware = !isLand && (d.di || d.notch)
  const hw = d.di || d.notch

  const cssCode = useMemo(() => {
    const comment = `${d.name} — ${isLand ? "Landscape" : "Portrait"}`
    return `/* ${comment} */
/* أضف هذا في <meta name="viewport"> */
<meta name="viewport" content="viewport-fit=cover, width=device-width">

.safe-area-container {
  padding-top: env(safe-area-inset-top, ${top}px);
  padding-bottom: env(safe-area-inset-bottom, ${bottom}px);
  padding-left: env(safe-area-inset-left, ${left}px);
  padding-right: env(safe-area-inset-right, ${right}px);
}

/* لشريط تنقل ثابت أسفل الشاشة */
.bottom-bar {
  padding-bottom: env(safe-area-inset-bottom, ${bottom}px);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

/* لتجنب المحتوى تحت الجزيرة الديناميكية */
@supports (padding-top: env(safe-area-inset-top)) {
  .content {
    padding-top: env(safe-area-inset-top);
  }
}`
  }, [d, isLand, top, bottom, left, right])

  const copyCSS = () => {
    const plainCode = cssCode.replace(/<[^>]+>/g, "")
    navigator.clipboard.writeText(plainCode)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=DM+Sans:wght@400;500;700&display=swap');
        .sa-root {
            --blue: #2563EB; --blue-light: #60A5FA; --blue-dim: rgba(37,99,235,0.06);
            --green: #10B981; --green-dim: rgba(16,185,129,0.08);
            --yellow: #F59E0B; --yellow-dim: rgba(245,158,11,0.1);
            --pink: #EC4899; --pink-dim: rgba(236,72,153,0.08);
            --purple: #8B5CF6; --purple-dim: rgba(139,92,246,0.08);
            --bg: #FAFBFF; --surface: #FFFFFF; --surface-2: #F1F3F9; --surface-3: #E8EAF2;
            --border: rgba(0,0,0,0.06); --border-h: rgba(0,0,0,0.12);
            --txt: #0F172A; --txt2: #64748B; --txt3: #94A3B8;
            font-family: 'Tajawal', sans-serif; background: var(--bg); color: var(--txt); min-height: 100vh; overflow-x: hidden; direction: rtl;
        }
        .font-dm { font-family: 'DM Sans', sans-serif; }

        .brand-gradient { background:linear-gradient(135deg,#F59E0B 0%,#10B981 30%,#2563EB 65%,#EC4899 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .brand-gradient-bg { background:linear-gradient(135deg,#F59E0B 0%,#10B981 30%,#2563EB 65%,#EC4899 100%); }

        .orb { position:fixed; border-radius:50%; filter:blur(100px); pointer-events:none; z-index:0; }
        .orb-1 { width:500px;height:500px;background:rgba(245,158,11,0.07);top:-200px;right:-150px;animation:oA 25s ease-in-out infinite; }
        .orb-2 { width:400px;height:400px;background:rgba(37,99,235,0.05);bottom:-100px;left:-100px;animation:oB 30s ease-in-out infinite; }
        .orb-3 { width:300px;height:300px;background:rgba(236,72,153,0.04);top:50%;left:50%;animation:oC 20s ease-in-out infinite; transform: translate(-50%,-50%); }
        @keyframes oA { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-80px,60px) scale(1.1)} 66%{transform:translate(40px,-30px) scale(.9)} }
        @keyframes oB { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(70px,-50px) scale(1.08)} 66%{transform:translate(-40px,30px) scale(.92)} }
        @keyframes oC { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-30%,-60%) scale(1.2)} }

        .sa-card { background:var(--surface); border:1px solid var(--border); border-radius:20px; box-shadow:0 1px 3px rgba(0,0,0,0.03),0 8px 24px rgba(0,0,0,0.04); }
        .card-sticky { background:var(--surface); border:1px solid var(--border); border-radius:20px; box-shadow:0 4px 16px rgba(0,0,0,0.05); }

        .toggle-wrap { display:flex; align-items:center; justify-content:space-between; padding:10px 0; cursor:pointer; }
        .toggle-label { display:flex; align-items:center; gap:10px; font-size:13.5px; color:var(--txt2); }
        .toggle-label .dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
        .toggle { position:relative; width:44px; height:24px; border-radius:12px; background:var(--surface-3); transition:background .3s; flex-shrink:0; }
        .toggle::after { content:''; position:absolute; top:2px; right:2px; width:20px; height:20px; border-radius:50%; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.15); transition:transform .3s cubic-bezier(.4,0,.2,1); }
        .toggle.on { background:var(--blue); }
        .toggle.on::after { transform:translateX(-20px); }

        .dev-btn { padding:10px 12px; border-radius:12px; border:1px solid var(--border); background:var(--surface); cursor:pointer; transition:all .3s; text-align:center; user-select:none; }
        .dev-btn:hover { border-color:var(--border-h); box-shadow:0 2px 8px rgba(0,0,0,0.04); }
        .dev-btn.on { border-color:var(--blue); background:var(--blue-dim); box-shadow:0 2px 12px rgba(37,99,235,0.1); }
        .dev-btn.on .dev-name { color:var(--blue); }

        .ori-btn { flex:1; padding:8px; border-radius:10px; border:1px solid var(--border); background:var(--surface); color:var(--txt2); cursor:pointer; transition:all .3s; font-family:'Tajawal',sans-serif; font-size:13px; user-select:none; text-align: center; }
        .ori-btn:hover { color:var(--txt); border-color:var(--border-h); }
        .ori-btn.on { background:var(--blue); border-color:var(--blue); color:#fff; }

        .bg-opt { width:36px; height:36px; border-radius:10px; border:2px solid var(--border); cursor:pointer; transition:all .3s; overflow:hidden; }
        .bg-opt:hover { border-color:var(--border-h); }
        .bg-opt.on { border-color:var(--blue); box-shadow:0 0 0 2px var(--blue-dim); }
        .bg-opt.bg-grid { background-color:#fff; background-image:linear-gradient(rgba(0,0,0,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.06) 1px,transparent 1px); background-size:6px 6px; }
        .bg-opt.bg-white { background:#fff; }
        .bg-opt.bg-dark { background:#1a1a2e; }
        .bg-opt.bg-img { background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); display:flex; align-items:center; justify-content:center; }

        .device-frame { position:relative; background:#000; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.15),0 0 0 1px rgba(0,0,0,0.08); max-height:620px; transition:border-radius .4s, aspect-ratio .4s; }
        
        .safe-layer { position:absolute; transition:opacity .35s, transform .35s; display:flex; align-items:center; justify-content:center; font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; pointer-events:none; z-index:5; }
        .safe-layer.hidden { opacity:0; transform:scale(0.95); pointer-events:none; }
        .layer-label { padding:3px 8px; border-radius:6px; background:rgba(255,255,255,0.9); backdrop-filter:blur(8px); white-space:nowrap; box-shadow:0 1px 4px rgba(0,0,0,0.08); }

        .layer-status { top:0; left:0; right:0; z-index:10; background:rgba(37,99,235,var(--overlay-opacity,0.18)); }
        .layer-status .layer-label { color:var(--blue); }

        .layer-di-wrap { left:50%; transform:translateX(-50%); z-index:15; background:transparent !important; }
        .layer-di-wrap.hidden { opacity:0; transform:translateX(-50%) scale(0.9); }
        .layer-di { background:#000; border-radius:999px; box-shadow:0 0 0 2px rgba(236,72,153,calc(var(--overlay-opacity,0.18)*2)); transition:box-shadow .3s; }
        .layer-di-label { position:absolute; bottom:-22px; left:50%; transform:translateX(-50%); padding:2px 7px; border-radius:5px; background:rgba(255,255,255,0.92); font-family:'DM Sans',sans-serif; font-size:9px; font-weight:600; color:var(--pink); white-space:nowrap; box-shadow:0 1px 3px rgba(0,0,0,0.06); }

        .layer-home { bottom:0; left:0; right:0; z-index:10; background:rgba(245,158,11,var(--overlay-opacity,0.18)); }
        .layer-home .layer-label { color:var(--yellow); }
        .home-bar { position:absolute; bottom:8px; left:50%; transform:translateX(-50%); width:35%; height:4px; background:rgba(0,0,0,0.2); border-radius:2px; z-index:16; }

        .layer-content { z-index:3; border:2px dashed rgba(16,185,129,0.5); background:rgba(16,185,129,calc(var(--overlay-opacity,0.18)*0.5)); }
        .layer-content .layer-label { color:var(--green); position:absolute; bottom:6px; left:50%; transform:translateX(-50%); }

        .layer-side-l { left:0; top:0; bottom:0; z-index:4; background:rgba(139,92,246,var(--overlay-opacity,0.18)); }
        .layer-side-r { right:0; top:0; bottom:0; z-index:4; background:rgba(139,92,246,var(--overlay-opacity,0.18)); }
        .layer-side-l .layer-label, .layer-side-r .layer-label { color:var(--purple); writing-mode:vertical-lr; }

        .tag-logo { width:32px; height:32px; position:relative; }
        .tag-logo span { position:absolute; width:16px; height:4px; border-radius:2px; top:50%; left:50%; }
        .tag-logo span:nth-child(1){background:#F59E0B;transform:translate(-50%,-50%) rotate(45deg)}
        .tag-logo span:nth-child(2){background:#10B981;transform:translate(-50%,-50%) rotate(-15deg)}
        .tag-logo span:nth-child(3){background:#2563EB;transform:translate(-50%,-50%) rotate(-45deg)}
        .tag-logo span:nth-child(4){background:#EC4899;transform:translate(-50%,-50%) rotate(15deg)}

        .code-block { background:#0F172A; border-radius:14px; padding:24px; overflow-x:auto; font-family:'DM Sans',monospace; font-size:12.5px; line-height:1.8; color:#E2E8F0; white-space:pre; text-align:left; direction:ltr; }
        .code-block .ck { color:#7DD3FC; }
        .code-block .cv { color:#FDE68A; }
        .code-block .cp { color:#C084FC; }
        .code-block .cc { color:#64748B; }

        .brand-line { width:40px; height:2px; border-radius:1px; }

        .tip-card { padding:18px 22px; border-radius:14px; border:1px solid var(--border); background:var(--surface); transition:all .3s; display:flex; gap:14px; align-items:flex-start; }
        .tip-card:hover { border-color:var(--border-h); box-shadow:0 4px 12px rgba(0,0,0,0.03); }

        .toast { position:fixed; bottom:30px; left:50%; transform:translateX(-50%) translateY(80px); padding:12px 24px; border-radius:12px; background:#0F172A; color:#fff; font-size:13px; font-weight:500; z-index:999; opacity:0; transition:all .4s cubic-bezier(.4,0,.2,1); pointer-events:none; box-shadow:0 8px 30px rgba(0,0,0,0.2); }
        .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
      `}</style>

      <div className="sa-root">
        
        {/* Background Orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        {/* Toast */}
        <Toast show={showToast} />

        {/* Navbar */}
        <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4" style={{ background: "rgba(250,251,255,0.8)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid var(--border)" }}>
          <a href="/tools" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
            <div className="tag-logo"><span></span><span></span><span></span><span></span></div>
            <span className="font-dm font-bold text-base tracking-tight" style={{ color: "var(--blue)" }}>TAG STUDIO</span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/tools" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium" style={{ color: "var(--txt2)", border: "1px solid var(--border)", textDecoration: "none" }}>
              الأدوات
            </a>
            <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: "var(--blue)", color: "#fff", boxShadow: "0 2px 12px rgba(37,99,235,0.25)", textDecoration: "none" }}>
              الرئيسية
            </a>
          </div>
        </nav>

        <main className="relative z-10">

          {/* Hero */}
          <header className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8" style={{ background: "var(--blue-dim)", color: "var(--blue)", border: "1px solid rgba(37,99,235,0.12)" }}>
              <i className="fas fa-shield-halved text-[10px]"></i> أدوات المصممين
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
              <span className="brand-gradient">عارض المنطقة</span><br/>
              <span style={{ color: "var(--txt)" }}>الآمنة</span>
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--txt2)" }}>
              تحقق من تصميماتك ضد مناطق الآمان لجميع أجهزة Apple. شاهد بالضبط أين يجب تجنب وضع العناصر التفاعلية والمحتوى المهم.
            </p>
          </header>

          <section className="px-4 md:px-8 lg:px-12 pb-24 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

              {/* Sidebar */}
              <aside className="lg:col-span-5">
                <div className="card-sticky p-6 md:p-8 sticky top-24 space-y-6">

                  {/* Device Select */}
                  <div>
                    <h2 className="text-sm font-bold mb-1" style={{ color: "var(--txt)" }}>اختر الجهاز</h2>
                    <p className="text-[11px] mb-4" style={{ color: "var(--txt3)" }}>هواتف iPhone</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {PHONES.map(k => (
                        <div key={k} className={`dev-btn ${deviceKey === k ? "on" : ""}`} onClick={() => setDeviceKey(k)}>
                          <i className={`fas ${DEVICES[k].icon} text-sm mb-1`} style={{ color: deviceKey === k ? "var(--blue)" : "var(--txt3)" }}></i>
                          <div className="dev-name text-[11px] font-medium leading-tight" style={{ color: deviceKey === k ? "var(--blue)" : "var(--txt2)" }}>{DEVICES[k].name}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] mb-3" style={{ color: "var(--txt3)" }}>أجهزة iPad</p>
                    <div className="grid grid-cols-3 gap-2">
                      {IPADS.map(k => (
                        <div key={k} className={`dev-btn ${deviceKey === k ? "on" : ""}`} onClick={() => setDeviceKey(k)}>
                          <i className={`fas ${DEVICES[k].icon} text-sm mb-1`} style={{ color: deviceKey === k ? "var(--blue)" : "var(--txt3)" }}></i>
                          <div className="dev-name text-[11px] font-medium leading-tight" style={{ color: deviceKey === k ? "var(--blue)" : "var(--txt2)" }}>{DEVICES[k].name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Orientation */}
                  <div>
                    <label className="text-xs font-medium block mb-2" style={{ color: "var(--txt3)" }}>الاتجاه</label>
                    <div className="flex gap-2">
                      <button className={`ori-btn ${orientation === "portrait" ? "on" : ""}`} onClick={() => setOrientation("portrait")}>عمودي</button>
                      <button className={`ori-btn ${orientation === "landscape" ? "on" : ""}`} onClick={() => setOrientation("landscape")}>أفقي</button>
                    </div>
                  </div>

                  {/* Layers */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium" style={{ color: "var(--txt3)" }}>طبقات العرض</label>
                      <button className="text-[11px] font-medium" style={{ color: "var(--blue)", background: "none", border: "none", cursor: "pointer" }} onClick={toggleAll}>إظهار الكل</button>
                    </div>
                    <div className="space-y-1">
                      <Toggle checked={layers.status} onChange={() => setLayers(l => ({...l, status: !l.status}))} label="شريط الحالة" color="var(--blue)" />
                      <Toggle checked={layers.di} onChange={() => setLayers(l => ({...l, di: !l.di}))} label="الجزيرة / النوتش" color="var(--pink)" />
                      <Toggle checked={layers.home} onChange={() => setLayers(l => ({...l, home: !l.home}))} label="مؤشر الصفحة الرئيسية" color="var(--yellow)" />
                      <Toggle checked={layers.content} onChange={() => setLayers(l => ({...l, content: !l.content}))} label="منطقة المحتوى الآمنة" color="var(--green)" />
                      <Toggle checked={layers.sides} onChange={() => setLayers(l => ({...l, sides: !l.sides}))} label="الهوامش الجانبية" color="var(--purple)" />
                    </div>
                  </div>

                  {/* Opacity */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium" style={{ color: "var(--txt3)" }}>شفافية الطبقات</label>
                      <span className="text-xs font-dm font-semibold" style={{ color: "var(--txt2)" }}>{opacity}%</span>
                    </div>
                    <input type="range" min="5" max="60" value={opacity} onChange={e => setOpacity(Number(e.target.value))} style={{ "--fill": `${((opacity - 5) / 55) * 100}%`, width: "100%", height: 5, borderRadius: 3, outline: "none", cursor: "pointer", direction: "ltr", background: "linear-gradient(to right, var(--blue) 0%, var(--blue) var(--fill), var(--surface-3) var(--fill), var(--surface-3) 100%)", WebkitAppearance: "none" } as any} />
                  </div>

                  {/* Background */}
                  <div>
                    <label className="text-xs font-medium block mb-2" style={{ color: "var(--txt3)" }}>خلفية الشاشة</label>
                    <div className="flex gap-2 items-center">
                      <div className={`bg-opt bg-grid ${bg === "grid" ? "on" : ""}`} onClick={() => setBg("grid")}></div>
                      <div className={`bg-opt bg-white ${bg === "white" ? "on" : ""}`} onClick={() => setBg("white")}></div>
                      <div className={`bg-opt bg-dark ${bg === "dark" ? "on" : ""}`} onClick={() => setBg("dark")}></div>
                      <div className={`bg-opt bg-img ${bg === "image" ? "on" : ""}`} onClick={() => { if(!bgImage) fileInputRef.current?.click(); else setBg("image") }}>
                        <i className="fas fa-image text-white text-[10px]"></i>
                      </div>
                      <label className="bg-opt flex items-center justify-center cursor-pointer" style={{ background: "var(--surface-2)", borderStyle: "dashed" }}>
                        <i className="fas fa-plus text-[10px]" style={{ color: "var(--txt3)" }}></i>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="rounded-2xl p-4" style={{ background: "var(--surface-2)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold" style={{ color: "var(--txt)" }}>المواصفات</span>
                      <span className="text-[10px] font-dm font-semibold px-2 py-0.5 rounded-md" style={{ background: "var(--blue-dim)", color: "var(--blue)" }}>{d.name} {isLand ? "(أفقي)" : "(عمودي)"}</span>
                    </div>
                    <div className="space-y-2 text-[11.5px]">
                      <div className="flex justify-between"><span style={{ color: "var(--txt3)" }}>دقة الشاشة</span><span className="font-dm font-semibold" style={{ color: "var(--txt)" }}>{dw} × {dh} pt</span></div>
                      <div className="flex justify-between"><span style={{ color: "var(--txt3)" }}>الأعلى (safe-area-inset-top)</span><span className="font-dm font-semibold" style={{ color: "var(--blue)" }}>{top}pt</span></div>
                      <div className="flex justify-between"><span style={{ color: "var(--txt3)" }}>الأسفل (safe-area-inset-bottom)</span><span className="font-dm font-semibold" style={{ color: "var(--yellow)" }}>{bottom}pt</span></div>
                      <div className="flex justify-between"><span style={{ color: "var(--txt3)" }}>اليسار (safe-area-inset-left)</span><span className="font-dm font-semibold" style={{ color: "var(--purple)" }}>{left}pt</span></div>
                      <div className="flex justify-between"><span style={{ color: "var(--txt3)" }}>اليمين (safe-area-inset-right)</span><span className="font-dm font-semibold" style={{ color: "var(--purple)" }}>{right}pt</span></div>
                      <div className="flex justify-between" style={{ borderTop: "1px solid var(--border)", paddingTop: 8, marginTop: 4 }}><span style={{ color: "var(--txt3)" }}>منطقة المحتوى الفعّالة</span><span className="font-dm font-semibold" style={{ color: "var(--green)" }}>{dw - left - right} × {dh - top - bottom} pt</span></div>
                    </div>
                  </div>

                  {/* Copy */}
                  <button onClick={copyCSS} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg" style={{ background: "var(--blue)", color: "#fff", boxShadow: "0 4px 16px rgba(37,99,235,0.2)", border: "none", cursor: "pointer" }}>
                    <i className="fas fa-code text-xs"></i> نسخ كود CSS
                  </button>
                </div>
              </aside>

              {/* Preview */}
              <div className="lg:col-span-7">
                <div className="sa-card p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold" style={{ color: "var(--txt)" }}>المعاينة المباشرة</h2>
                    <span className="text-[11px] font-dm px-3 py-1 rounded-full" style={{ background: "var(--surface-2)", color: "var(--txt3)" }}>{dw} × {dh} pt</span>
                  </div>
                  
                  <div className="flex items-center justify-center" style={{ minHeight: 500 }}>
                    <div className="device-frame" style={{ borderRadius: d.cr, aspectRatio: `${dw}/${dh}` } as any}>
                      <div className="device-screen" style={{
                        position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit",
                        backgroundColor: bg === "white" || bg === "grid" ? "#fff" : bg === "dark" ? "#1a1a2e" : "transparent",
                        backgroundImage: bg === "grid" ? "linear-gradient(rgba(0,0,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 1px)" : bg === "dark" ? "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)" : bg === "image" ? (bgImage ? `url(${bgImage})` : "linear-gradient(135deg,#667eea 0%,#764ba2 100%)") : "none",
                        backgroundSize: bg === "image" ? "cover" : "20px 20px", backgroundPosition: "center",
                        "--overlay-opacity": opacity / 100
                      } as any}>
                        
                        {/* Status Bar */}
                        <div className={`safe-layer layer-status ${!layers.status || top === 0 ? "hidden" : ""}`} style={{ height: top > 0 ? `${(top/dh)*100}%` : 0 }}>
                          <span className="layer-label">{top}pt</span>
                        </div>

                        {/* Hardware */}
                        <div className={`safe-layer layer-di-wrap ${!layers.di || !hasHardware ? "hidden" : ""}`} style={{ top: hw ? `${(hw.top/dh)*100}%` : 0 }}>
                          {hw && <div className="layer-di" style={{ width: `${(hw.w/dw)*100}%`, height: `${(hw.h/dh)*100}%` }}></div>}
                          {hw && <span className="layer-di-label">{hw.w} × {hw.h}pt</span>}
                        </div>

                        {/* Home Bar */}
                        <div className={`safe-layer layer-home ${!layers.home || bottom === 0 || !d.hasHomeInd ? "hidden" : ""}`} style={{ height: bottom > 0 ? `${(bottom/dh)*100}%` : 0 }}>
                          <span className="layer-label">{bottom}pt</span>
                        </div>
                        {d.hasHomeInd && !isLand && <div className="home-bar" style={{ display: layers.home && bottom > 0 ? "block" : "none" }}></div>}

                        {d.homeBtn && !isLand && (
                          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 50, height: 50, border: "2px solid rgba(0,0,0,0.15)", borderRadius: "50%", zIndex: 16 }}></div>
                        )}

                        {/* Content Area */}
                        <div className={`safe-layer layer-content ${!layers.content ? "hidden" : ""}`} style={{ top: `${(top/dh)*100}%`, bottom: `${(bottom/dh)*100}%`, left: `${(left/dw)*100}%`, right: `${(right/dw)*100}%` }}>
                          <span className="layer-label">منطقة المحتوى الآمنة</span>
                        </div>

                        {/* Sides */}
                        <div className={`safe-layer layer-side-l ${!layers.sides || left === 0 ? "hidden" : ""}`} style={{ width: left > 0 ? `${(left/dw)*100}%` : 0 }}>
                          <span className="layer-label">{left}pt</span>
                        </div>
                        <div className={`safe-layer layer-side-r ${!layers.sides || right === 0 ? "hidden" : ""}`} style={{ width: right > 0 ? `${(right/dw)*100}%` : 0 }}>
                          <span className="layer-label">{right}pt</span>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-4 mt-6 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--txt2)" }}><span className="w-3 h-3 rounded" style={{ background: "rgba(37,99,235,0.3)" }}></span>شريط الحالة</div>
                    <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--txt2)" }}><span className="w-3 h-3 rounded" style={{ background: "rgba(236,72,153,0.3)" }}></span>الجزيرة / النوتش</div>
                    <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--txt2)" }}><span className="w-3 h-3 rounded" style={{ background: "rgba(245,158,11,0.3)" }}></span>مؤشر الصفحة الرئيسية</div>
                    <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--txt2)" }}><span className="w-3 h-3 rounded border border-dashed" style={{ borderColor: "rgba(16,185,129,0.5)" }}></span>منطقة المحتوى</div>
                    <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--txt2)" }}><span className="w-3 h-3 rounded" style={{ background: "rgba(139,92,246,0.3)" }}></span>الهوامش الجانبية</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CSS Code section */}
          <section className="px-4 md:px-8 lg:px-12 pb-16 max-w-7xl mx-auto">
            <div className="sa-card p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "var(--blue-dim)" }}><i className="fas fa-code text-[10px]" style={{ color: "var(--blue)" }}></i></div>
                <span className="text-sm font-bold">كود CSS الجاهز للاستخدام</span>
              </div>
              <div className="code-block" dangerouslySetInnerHTML={{ __html: cssCode
                .replace(/([^{}]+)(?=\{)/g, '<span class="cp">$1</span>')
                .replace(/([A-Za-z0-9-]+):/g, '<span class="ck">$1</span>:')
                .replace(/: ([^;]+);/g, ': <span class="cv">$1</span>;')
                .replace(/(\/\*.*?\*\/)/g, '<span class="cc">$1</span>')
                .replace(/<meta.*?>/g, '<span class="ck">$&</span>')
              }}></div>
            </div>
          </section>

          {/* Tips section */}
          <section className="px-4 md:px-8 lg:px-12 pb-16 max-w-7xl mx-auto">
            <div className="sa-card p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "var(--yellow-dim)" }}><i className="fas fa-lightbulb text-[10px]" style={{ color: "var(--yellow)" }}></i></div>
                <span className="text-sm font-bold">نصائح لتصميم يتوافق مع المنطقة الآمنة</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="tip-card">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--blue-dim)" }}><span className="font-dm font-bold text-xs" style={{ color: "var(--blue)" }}>1</span></div>
                  <div>
                    <p className="text-[13px] font-medium mb-1" style={{ color: "var(--txt)" }}>استخدم env() بدل القيم الثابتة</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--txt2)" }}>استبدل القيم الصلبة بـ <code className="font-dm text-[11px] px-1.5 py-0.5 rounded" style={{ background: "var(--surface-2)", color: "var(--blue)" }}>env(safe-area-inset-*)</code> حتى يتكيف تصميمك تلقائياً مع كل جهاز.</p>
                  </div>
                </div>
                <div className="tip-card">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--green-dim)" }}><span className="font-dm font-bold text-xs" style={{ color: "var(--green)" }}>2</span></div>
                  <div>
                    <p className="text-[13px] font-medium mb-1" style={{ color: "var(--txt)" }}>أضف viewport-fit=cover</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--txt2)" }}>بدون هذه الخاصية في meta viewport، لن تمتد صفحتك لكل الشاشة ولن تحتاج للمنطقة الآمنة أصلاً.</p>
                  </div>
                </div>
                <div className="tip-card">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--pink-dim)" }}><span className="font-dm font-bold text-xs" style={{ color: "var(--pink)" }}>3</span></div>
                  <div>
                    <p className="text-[13px] font-medium mb-1" style={{ color: "var(--txt)" }}>لا تضع أزراراً تحت الجزيرة الديناميكية</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--txt2)" }}>المستخدمون يعتادون السحب من الأسفل للتبديل بين التطبيقات — تجنب وضع عناصر تفاعلية قرب الحواف.</p>
                  </div>
                </div>
                <div className="tip-card">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--purple-dim)" }}><span className="font-dm font-bold text-xs" style={{ color: "var(--purple)" }}>4</span></div>
                  <div>
                    <p className="text-[13px] font-medium mb-1" style={{ color: "var(--txt)" }}>اختبر في الوضعين عمودي وأفقي</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--txt2)" }}>الهوامش الجانبية تظهر بقوة في الوضع الأفقي خاصة على أجهزة iPhone مع الجزيرة الديناميكية.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
            <div className="sa-card p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-[0.04]" style={{ background: "var(--blue)", filter: "blur(80px)", transform: "translate(-40%,-40%)" }}></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-[0.04]" style={{ background: "var(--pink)", filter: "blur(60px)", transform: "translate(40%,40%)" }}></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="tag-logo" style={{ width: 24, height: 24 }}><span style={{ width: 12, height: 3 }}></span><span style={{ width: 12, height: 3 }}></span><span style={{ width: 12, height: 3 }}></span><span style={{ width: 12, height: 3 }}></span></div>
                  <span className="font-dm font-bold text-xs tracking-tight" style={{ color: "var(--blue)" }}>TAG STUDIO</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">تحتاج تصميم يتوافق مع كل الأجهزة؟</h2>
                <p className="text-sm font-light leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: "var(--txt2)" }}>
                  فريق تصميم Tag Studio ينتج واجهات مستخدم محسّنة لكل شاشة — من iPhone SE إلى iPad Pro.
                </p>
                <a href="https://www.wearetagstudio.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: "var(--blue)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.3)", textDecoration: "none" }}>
                  تواصل معنا
                  <i className="fas fa-arrow-left text-xs"></i>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
