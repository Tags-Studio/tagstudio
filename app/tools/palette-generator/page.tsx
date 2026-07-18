"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ColorPalette { primary: string; secondary: string; accent: string }

const PALETTE_PRESETS: Record<string, Record<string, ColorPalette>> = {
  medical: {
    official:    { primary: "#1e3a8a", secondary: "#3b82f6", accent: "#10b981" },
    premium:     { primary: "#0f172a", secondary: "#0284c7", accent: "#eab308" },
    friendly:    { primary: "#0d9488", secondary: "#2dd4bf", accent: "#f43f5e" },
    innovative:  { primary: "#312e81", secondary: "#6366f1", accent: "#ec4899" },
  },
  restaurant: {
    official:    { primary: "#7f1d1d", secondary: "#d1d5db", accent: "#b45309" },
    premium:     { primary: "#1c1917", secondary: "#78716c", accent: "#d97706" },
    friendly:    { primary: "#b91c1c", secondary: "#ea580c", accent: "#eab308" },
    innovative:  { primary: "#4c1d95", secondary: "#a78bfa", accent: "#f43f5e" },
  },
  startup: {
    official:    { primary: "#1e293b", secondary: "#475569", accent: "#cbd5e1" },
    premium:     { primary: "#111827", secondary: "#1f2937", accent: "#10b981" },
    friendly:    { primary: "#0369a1", secondary: "#38bdf8", accent: "#f97316" },
    innovative:  { primary: "#09090b", secondary: "#3f3f46", accent: "#3b82f6" },
  },
  corporate: {
    official:    { primary: "#0f172a", secondary: "#334155", accent: "#0284c7" },
    premium:     { primary: "#18181b", secondary: "#27272a", accent: "#eab308" },
    friendly:    { primary: "#1e3a8a", secondary: "#60a5fa", accent: "#f43f5e" },
    innovative:  { primary: "#020617", secondary: "#1e293b", accent: "#a855f7" },
  },
  agriculture: {
    official:    { primary: "#14532d", secondary: "#475569", accent: "#b45309" },
    premium:     { primary: "#064e3b", secondary: "#0f766e", accent: "#d97706" },
    friendly:    { primary: "#15803d", secondary: "#854d0e", accent: "#eab308" },
    innovative:  { primary: "#022c22", secondary: "#0d9488", accent: "#10b981" },
  },
}

const FONT_PRESETS: Record<string, { heading: string; body: string; desc: string }> = {
  medical:     { heading: "Cairo",              body: "Readex Pro",          desc: "توليفة نظيفة ومريحة تعطي ثقة وأمان للمريض" },
  restaurant:  { heading: "Tajawal",            body: "IBM Plex Sans Arabic", desc: "توليفة ودودة ومشهية تعبر عن الحيوية" },
  startup:     { heading: "IBM Plex Sans Arabic", body: "Inter",             desc: "خطوط تقنية واضحة ومستقبلية للمشاريع الرقمية" },
  corporate:   { heading: "Cairo",              body: "Tajawal",             desc: "توليفة رسمية وقوية تعبر عن الهيبة والموثوقية" },
  agriculture: { heading: "Cairo",              body: "Readex Pro",          desc: "توليفة طبيعية انسيابية ممتازة للبيئة والنمو" },
}

const INDUSTRIES = [
  { label: "عيادات ومراكز طبية",    emoji: "🩺", theme: "medical",     desc: "أزرق ودرجات التهدئة والثقة" },
  { label: "مطاعم وكافيهات",         emoji: "🍔", theme: "restaurant",  desc: "ألوان مشهية ودافئة" },
  { label: "شركات ناشئة وتقنية",     emoji: "🚀", theme: "startup",     desc: "درجات عصرية ومستقبلية" },
  { label: "مؤسسات وشركات رسمية",    emoji: "🏢", theme: "corporate",   desc: "ألوان جادة وموثوقة" },
  { label: "قطاع زراعي وتنموي",      emoji: "🌾", theme: "agriculture", desc: "درجات مستوحاة من الأرض" },
]

const PERSONALITIES = [
  { label: "فخمة وراقية",    sub: "Premium",    value: "premium"    as const, emoji: "👑" },
  { label: "ودودة وقريبة",   sub: "Friendly",   value: "friendly"   as const, emoji: "🤝" },
  { label: "رسمية وجادة",    sub: "Official",   value: "official"   as const, emoji: "🏛️" },
  { label: "عصرية ومبتكرة",  sub: "Innovative", value: "innovative" as const, emoji: "⚡" },
]

const MOOD_TAGS = [
  { id: "warm",     label: "دافئة",     color: "#F59E0B", hex: "#F59E0B" },
  { id: "cool",     label: "باردة",     color: "#3B82F6", hex: "#3B82F6" },
  { id: "vibrant",  label: "حيوية",     color: "#EF4444", hex: "#EF4444" },
  { id: "pastel",   label: "ناعمة",     color: "#A78BFA", hex: "#A78BFA" },
  { id: "dark",     label: "غامقة",     color: "#6366F1", hex: "#6366F1" },
  { id: "nature",   label: "طبيعية",    color: "#22C55E", hex: "#22C55E" },
  { id: "sunset",   label: "غروب",      color: "#F97316", hex: "#F97316" },
  { id: "ocean",    label: "بحرية",     color: "#06B6D4", hex: "#06B6D4" },
  { id: "minimal",  label: "بسيطة",     color: "#9CA3AF", hex: "#9CA3AF" },
  { id: "retro",    label: "كلاسيكية",  color: "#D97706", hex: "#D97706" },
  { id: "tropical", label: "استوائية",  color: "#EC4899", hex: "#EC4899" },
  { id: "earth",    label: "ترابية",    color: "#92400E", hex: "#92400E" },
]

const FAQ_DATA = [
  { q: "كيف تعمل قاعدة 60-30-10؟", a: "استخدم اللون الأساسي (60%) في الخلفيات والمساحات الكبرى، واللون الثانوي (30%) في العناوين والأيقونات، واللون التأكيدي (10%) فقط في أزرار الاتصال وعناصر الجذب." },
  { q: "هل يمكنني تغيير الألوان يدويًا؟", a: "نعم، انقر فوق أي لون في اللوحة لتغييره مباشرةً عبر منتقي الألوان. يمكنك أيضاً إدخال كود HEX مباشرة في الحقل المخصص." },
  { q: "كيف أنسخ الألوان الناتجة؟", a: "انقر نقراً مزدوجاً على أي بطاقة لون لنسخها. أو استخدم زر \"نسخ\" المخصص لكل لون في لوحة التفاصيل." },
  { q: "ما هي الخطوط الموصى بها للهوية؟", a: "تقترح الأداة الخطوط بناءً على قطاع عملك. للمراكز الطبية نوصي بـ Cairo وReadex Pro. للشركات التقنية IBM Plex Sans وInter." },
  { q: "هل يمكنني إرسال اللوحة مباشرة لفريق التصميم؟", a: "نعم، اضغط على زر 'أرسل اللوحة عبر واتساب' وسيُرسل ملخص كامل يتضمن الألوان والخطوط والقطاع لمستشاري تاج ستوديو مباشرة." },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
function getContrast(hex: string) {
  const [r, g, b] = hexToRgb(hex)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? "#000000" : "#ffffff"
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LogoIcon() {
  return (
    <div style={{ width: 32, height: 32, position: "relative" }}>
      {[
        { w: 14, h: 3.5, bg: "#FBBF24", top: 6,  left: 2,  rot: -25 },
        { w: 14, h: 3.5, bg: "#34D399", top: 12, left: 5,  rot: -5  },
        { w: 14, h: 3.5, bg: "#3B82F6", top: 18, left: 2,  rot: 15  },
        { w: 12, h: 3.5, bg: "#22D3EE", top: 8,  left: 14, rot: -40 },
        { w: 11, h: 3.5, bg: "#F87171", top: 16, left: 15, rot: 30  },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: 2,
          width: s.w, height: s.h, background: s.bg,
          top: s.top, left: s.left, transform: `rotate(${s.rot}deg)`,
        }} />
      ))}
    </div>
  )
}

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{
      padding: "10px 20px", borderRadius: 12,
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
      border: "1px solid rgba(15,29,61,0.08)", fontSize: 13, fontWeight: 500,
      color: "#0F1D3D", display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 8px 30px rgba(15,29,61,0.1)",
      animation: "toastIn .4s cubic-bezier(.25,.1,.25,1) forwards",
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 7, display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg,#34D399,#3B82F6)", fontSize: 11, color: "#fff",
      }}>✓</div>
      {msg}
    </div>
  )
}

interface SwatchProps {
  color: string; label: string; pct: string; colorKey: string;
  locked: boolean; onCopy: (hex: string, key: string) => void;
  onChange: (key: string, v: string) => void; onToggleLock: (key: string) => void;
}
function Swatch({ color, label, pct, colorKey, locked, onCopy, onChange, onToggleLock }: SwatchProps) {
  const [hovered, setHovered] = useState(false)
  const contrast = getContrast(color)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: 16, overflow: "hidden",
        height: 210, cursor: "pointer",
        transition: "all .4s cubic-bezier(.25,.1,.25,1)",
        transform: hovered ? "translateY(-5px) scale(1.02)" : "none",
        boxShadow: hovered ? "0 20px 60px rgba(15,29,61,0.1)" : "0 1px 4px rgba(0,0,0,0.06)",
        zIndex: hovered ? 2 : 1,
      }}
    >
      {/* Color fill */}
      <div style={{
        position: "absolute", inset: 0, background: color,
        transition: "background-color .4s ease",
      }} />

      {/* Lock button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleLock(colorKey) }}
        style={{
          position: "absolute", top: 9, right: 9, width: 28, height: 28,
          borderRadius: 8, background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(10px)", display: "flex", alignItems: "center",
          justifyContent: "center", opacity: hovered || locked ? 1 : 0,
          transition: "all .25s ease", cursor: "pointer", border: "none", fontSize: 11,
          color: contrast,
        }}
      >
        {locked ? "🔒" : "🔓"}
      </button>

      {/* Color picker */}
      <input
        type="color" value={color}
        onChange={(e) => onChange(colorKey, e.target.value)}
        style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
        title="انقر لتغيير اللون"
      />

      {/* Bottom overlay */}
      <div
        onDoubleClick={() => onCopy(color, colorKey)}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: hovered ? "16px" : "12px 14px",
          background: hovered ? "linear-gradient(transparent 10%, rgba(0,0,0,0.5))" : "linear-gradient(transparent,rgba(0,0,0,0.35))",
          transition: "all .3s ease",
        }}
      >
        <div style={{ fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 12.5, fontWeight: 600, color: contrast, letterSpacing: "0.02em" }}>
          {color.toUpperCase()}
        </div>
        <div style={{
          maxHeight: hovered ? 45 : 0, overflow: "hidden", opacity: hovered ? 1 : 0,
          transition: "max-height .3s ease, opacity .3s ease",
        }}>
          <div style={{ fontSize: 10, marginTop: 2, color, opacity: 0.75, filter: "invert(1) brightness(2)" }}>
            {label} · {pct}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PaletteGenerator() {
  const [industry, setIndustry] = useState("medical")
  const [personality, setPersonality] = useState<"premium"|"friendly"|"official"|"innovative">("premium")
  const [colors, setColors] = useState<ColorPalette>({ primary: "#0f172a", secondary: "#0284c7", accent: "#eab308" })
  const [locked, setLocked] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState<"web"|"card"|"post">("web")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([])
  const [showExport, setShowExport] = useState(false)
  const [exportCode, setExportCode] = useState("")
  const [exportLabel, setExportLabel] = useState("")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const toastId = useRef(0)

  // Sync colors when industry/personality changes
  useEffect(() => {
    const p = PALETTE_PRESETS[industry]?.[personality]
    if (p) {
      setColors(prev => ({
        primary:   locked.primary   ? prev.primary   : p.primary,
        secondary: locked.secondary ? prev.secondary : p.secondary,
        accent:    locked.accent    ? prev.accent    : p.accent,
      }))
    }
  }, [industry, personality]) // eslint-disable-line

  const toast = (msg: string) => {
    const id = ++toastId.current
    setToasts(t => [...t, { id, msg }])
  }

  const removeToast = (id: number) => setToasts(t => t.filter(x => x.id !== id))

  const copyHex = (hex: string, key: string) => {
    navigator.clipboard.writeText(hex)
    setCopiedKey(key); setTimeout(() => setCopiedKey(null), 2000)
    toast(`تم نسخ ${hex}`)
  }

  const handleColorChange = (key: string, value: string) =>
    setColors(prev => ({ ...prev, [key]: value }))

  const toggleLock = (key: string) =>
    setLocked(prev => ({ ...prev, [key]: !prev[key] }))

  const generateRandom = () => {
    const r = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0").toUpperCase()
    setColors({
      primary:   locked.primary   ? colors.primary   : r(),
      secondary: locked.secondary ? colors.secondary : r(),
      accent:    locked.accent    ? colors.accent    : r(),
    })
    toast("تم توليد لوحة عشوائية!")
  }

  const applyMood = (id: string) => {
    if (selectedMood === id) { setSelectedMood(null); return }
    setSelectedMood(id)
    const m = MOOD_TAGS.find(x => x.id === id)!
    setColors(prev => ({
      primary:   locked.primary   ? prev.primary   : m.hex,
      secondary: locked.secondary ? prev.secondary : m.hex + "99",
      accent:    locked.accent    ? prev.accent    : m.hex + "cc",
    }))
    toast(`حالة مزاجية: ${m.label}`)
  }

  const openExportModal = (type: "css"|"tailwind"|"json"|"scss") => {
    const labels: Record<string, string> = { css: "CSS Variables", tailwind: "Tailwind Config", json: "JSON", scss: "SCSS" }
    let code = ""
    if (type === "css") {
      code = `:root {\n  --color-primary: ${colors.primary};\n  --color-secondary: ${colors.secondary};\n  --color-accent: ${colors.accent};\n}`
    } else if (type === "tailwind") {
      code = `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: '${colors.primary}',\n        secondary: '${colors.secondary}',\n        accent: '${colors.accent}',\n      }\n    }\n  }\n}`
    } else if (type === "json") {
      code = JSON.stringify({ primary: colors.primary, secondary: colors.secondary, accent: colors.accent }, null, 2)
    } else if (type === "scss") {
      code = `$color-primary: ${colors.primary};\n$color-secondary: ${colors.secondary};\n$color-accent: ${colors.accent};`
    }
    setExportCode(code); setExportLabel(labels[type]); setShowExport(true)
  }

  const selectedFonts = FONT_PRESETS[industry] || FONT_PRESETS.medical
  const waText = encodeURIComponent(
    `مرحباً تاج ستوديو، قمت بتوليد لوحة ألوان:\n- القطاع: ${INDUSTRIES.find(i => i.theme === industry)?.label}\n- الشخصية: ${PERSONALITIES.find(p => p.value === personality)?.label}\n- الأساسي: ${colors.primary}\n- الثانوي: ${colors.secondary}\n- التأكيدي: ${colors.accent}\n- الخطوط: ${selectedFonts.heading} | ${selectedFonts.body}\n\nأريد استشارة مجانية.`
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .pg-root { font-family: 'Inter', system-ui, sans-serif; background: #F7F7F8; color: #0F1D3D; min-height: 100vh; }
        .pg-card { background: #fff; border: 1px solid #E8E9ED; border-radius: 20px; box-shadow: 0 1px 3px rgba(15,29,61,0.04),0 1px 2px rgba(15,29,61,0.03); }
        .pg-card-el { box-shadow: 0 4px 16px rgba(15,29,61,0.06),0 1px 4px rgba(15,29,61,0.04); }
        .harmony-pill { padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 500; background: #F0F1F4; border: 1px solid transparent; color: #7A8299; cursor: pointer; transition: all .3s cubic-bezier(.25,.1,.25,1); white-space: nowrap; }
        .harmony-pill:hover { background: #E4E6EB; color: #0F1D3D; }
        .harmony-pill.active { background: #0F1D3D; border-color: #0F1D3D; color: #fff; box-shadow: 0 2px 10px rgba(15,29,61,0.2); }
        .export-btn { padding: 9px 18px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #F0F1F4; border: 1px solid #E8E9ED; color: #7A8299; cursor: pointer; transition: all .25s cubic-bezier(.25,.1,.25,1); }
        .export-btn:hover { background: #E4E6EB; color: #0F1D3D; border-color: #D1D3D9; transform: translateY(-1px); box-shadow: 0 1px 3px rgba(15,29,61,0.04); }
        .mood-tag { display: inline-flex; align-items: center; gap: 7px; padding: 8px 14px; border-radius: 12px; font-size: 13px; font-weight: 500; background: #F0F1F4; border: 1.5px solid transparent; color: #7A8299; cursor: pointer; transition: all .3s cubic-bezier(.25,.1,.25,1); user-select: none; }
        .mood-tag:hover { background: #E8E9ED; color: #0F1D3D; border-color: #D1D3D9; }
        .mood-tag.selected { border-color: #0F1D3D; color: #0F1D3D; background: rgba(15,29,61,0.04); box-shadow: 0 2px 8px rgba(15,29,61,0.08); }
        .ind-btn { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 14px; border: 1.5px solid #E8E9ED; background: transparent; color: #7A8299; cursor: pointer; transition: all .3s cubic-bezier(.25,.1,.25,1); text-align: right; font-size: 13px; font-weight: 500; font-family: inherit; }
        .ind-btn:hover { background: #F0F1F4; color: #0F1D3D; border-color: #D1D3D9; }
        .ind-btn.active { border-color: #0F1D3D; color: #0F1D3D; background: rgba(15,29,61,0.03); box-shadow: 0 2px 8px rgba(15,29,61,0.07); }
        .pers-btn { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 14px; border-radius: 14px; border: 1.5px solid #E8E9ED; background: transparent; cursor: pointer; transition: all .3s cubic-bezier(.25,.1,.25,1); text-align: right; font-family: inherit; }
        .pers-btn:hover { background: #F0F1F4; border-color: #D1D3D9; }
        .pers-btn.active { border-color: #0F1D3D; background: rgba(15,29,61,0.03); box-shadow: 0 2px 8px rgba(15,29,61,0.07); }
        .faq-q { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; cursor: pointer; font-size: 14px; font-weight: 500; color: #0F1D3D; transition: color .2s ease; user-select: none; gap: 16px; border: none; background: transparent; width: 100%; text-align: right; font-family: inherit; }
        .faq-q:hover { color: #3B82F6; }
        .faq-a { font-size: 13px; line-height: 1.7; color: #7A8299; }
        .generate-btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 36px; border-radius: 16px; font-size: 15px; font-weight: 600; color: #fff; border: none; cursor: pointer; background: linear-gradient(135deg,#FBBF24 0%,#F87171 25%,#3B82F6 50%,#34D399 75%,#22D3EE 100%); background-size: 300% 300%; animation: genGrad 6s ease infinite; box-shadow: 0 6px 24px rgba(15,29,61,0.12); transition: all .35s cubic-bezier(.25,.1,.25,1); font-family: inherit; }
        .generate-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 10px 32px rgba(15,29,61,0.16); }
        .generate-btn:active { transform: scale(0.98); }
        .random-btn { width: 40px; height: 40px; border-radius: 12px; border: none; cursor: pointer; background: linear-gradient(135deg,#FBBF24,#F87171,#3B82F6,#34D399); background-size: 300% 300%; animation: gShift 8s ease infinite; display: flex; align-items: center; justify-content: center; transition: all .3s ease; box-shadow: 0 2px 8px rgba(15,29,61,0.08); font-size: 14px; flex-shrink: 0; }
        .random-btn:hover { transform: scale(1.08) rotate(15deg); }
        .random-btn:active { transform: scale(.95); }
        .tab-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px; border-radius: 10px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; background: transparent; color: #7A8299; transition: all .25s ease; font-family: inherit; }
        .tab-btn:hover { color: #0F1D3D; background: #F0F1F4; }
        .tab-btn.active { background: #0F1D3D; color: #fff; box-shadow: 0 2px 8px rgba(15,29,61,0.15); }
        .hex-input { background: #F0F1F4; border: 1.5px solid transparent; border-radius: 10px; padding: 7px 11px; font-size: 13.5px; font-family: 'SF Mono','Fira Code','Courier New',monospace; font-weight: 600; color: #0F1D3D; width: 100%; outline: none; transition: all .25s ease; }
        .hex-input:focus { border-color: rgba(15,29,61,0.15); background: #fff; box-shadow: 0 0 0 3px rgba(15,29,61,0.05); }
        .color-divider { height: 3px; border-radius: 2px; background: linear-gradient(90deg,#FBBF24,#34D399,#3B82F6,#22D3EE,#F87171); opacity: .6; }
        .category-card { background: #fff; border: 1px solid #E8E9ED; border-radius: 16px; padding: 20px 16px; text-align: center; cursor: pointer; transition: all .35s cubic-bezier(.25,.1,.25,1); box-shadow: 0 1px 3px rgba(15,29,61,0.04); }
        .category-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(15,29,61,0.08); border-color: rgba(15,29,61,0.1); }
        .feature-badge { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 14px; font-size: 13px; font-weight: 500; background: #fff; border: 1px solid #E8E9ED; box-shadow: 0 1px 3px rgba(15,29,61,0.04); color: #0F1D3D; transition: all .3s ease; }
        .feature-badge:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(15,29,61,0.06); }
        .modal-backdrop { background: rgba(15,29,61,0.2); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .modal-content { background: rgba(255,255,255,0.97); backdrop-filter: blur(60px); -webkit-backdrop-filter: blur(60px); border: 1px solid rgba(15,29,61,0.08); border-radius: 22px; max-width: 560px; width: 100%; box-shadow: 0 24px 80px rgba(15,29,61,0.15); }
        .modal-code { font-family: 'SF Mono','Fira Code','Courier New',monospace; font-size: 12px; line-height: 1.7; color: #374151; background: #F7F7F8; border: 1px solid #E8E9ED; border-radius: 12px; padding: 18px; max-height: 280px; overflow-y: auto; white-space: pre; }
        @keyframes genGrad { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes gShift { 0%,100%{background-position:0% 50%} 25%{background-position:100% 0%} 50%{background-position:100% 100%} 75%{background-position:0% 100%} }
        @keyframes toastIn { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes oF1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,40px) scale(1.08)} 66%{transform:translate(30px,-25px) scale(.95)} }
        @keyframes oF2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(45px,-35px) scale(1.1)} }
        @keyframes oF3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-35px,-30px) scale(1.05)} 66%{transform:translate(20px,25px) scale(.92)} }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: rgba(15,29,61,0.1); border-radius: 3px; }
      `}</style>

      <div className="pg-root" dir="rtl">

        {/* ── Orb background ── */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "radial-gradient(ellipse 80% 60% at 15% 10%,rgba(59,130,246,.04) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 85% 80%,rgba(248,113,113,.035) 0%,transparent 55%),#F7F7F8", pointerEvents: "none" }}>
          {[
            { cls: "orb-y", style: { width: 400, height: 400, background: "#FBBF24", top: -120, right: "10%", animation: "oF1 30s ease-in-out infinite" } },
            { cls: "orb-g", style: { width: 350, height: 350, background: "#34D399", bottom: "5%", left: -80, animation: "oF2 26s ease-in-out infinite" } },
            { cls: "orb-b", style: { width: 300, height: 300, background: "#3B82F6", top: "40%", right: -60, animation: "oF3 22s ease-in-out infinite" } },
            { cls: "orb-r", style: { width: 250, height: 250, background: "#F87171", bottom: "20%", left: "30%", animation: "oF1 28s ease-in-out infinite reverse" } },
          ].map((o, i) => (
            <div key={i} style={{ position: "absolute", borderRadius: "50%", filter: "blur(100px)", opacity: 0.07, ...o.style as any }} />
          ))}
        </div>

        {/* ── Nav ── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(247,247,248,0.72)", backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderBottom: "1px solid rgba(15,29,61,0.06)",
        }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/tools" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <LogoIcon />
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", color: "#0F1D3D" }}>TAG STUDIO</span>
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 12.5, fontWeight: 500, color: "#7A8299" }}>
              <a href="/tools" style={{ color: "#7A8299", textDecoration: "none" }}>الأدوات</a>
              <a href="/" style={{ color: "#7A8299", textDecoration: "none" }}>الرئيسية</a>
            </div>
          </div>
        </nav>

        {/* ── Main content ── */}
        <main style={{ position: "relative", zIndex: 10, paddingTop: 56, paddingBottom: 64, paddingLeft: 20, paddingRight: 20 }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>

            {/* ── Header ── */}
            <header style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="color-divider" style={{ width: 48, margin: "0 auto 24px" }} />
              <h1 style={{ fontSize: "clamp(28px,5vw,45px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 10, color: "#0F1D3D" }}>
                مُولّد لوحات الألوان الذكي
              </h1>
              <p style={{ fontSize: 15, color: "#7A8299" }}>
                أنشئ لوحات ألوان متناسقة ومدروسة بناءً على قطاعك وشخصية براندك
              </p>
            </header>

            {/* ── Tool Grid ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, alignItems: "start", marginBottom: 40 }}>

              {/* Left: Controls */}
              <div className="pg-card pg-card-el" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 22 }}>

                {/* Step 1: Industry */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#0F1D3D", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>1</div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#7A8299", textTransform: "uppercase", letterSpacing: "0.08em" }}>قطاع المشروع</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {INDUSTRIES.map(ind => (
                      <button key={ind.theme} className={`ind-btn${industry === ind.theme ? " active" : ""}`} onClick={() => setIndustry(ind.theme)}>
                        <span style={{ fontSize: 18 }}>{ind.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, color: industry === ind.theme ? "#0F1D3D" : "#7A8299", fontSize: 13 }}>{ind.label}</div>
                          <div style={{ fontSize: 11, color: "#A0A6B8", marginTop: 1 }}>{ind.desc}</div>
                        </div>
                        {industry === ind.theme && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0F1D3D", flexShrink: 0 }} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Personality */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#0F1D3D", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>2</div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#7A8299", textTransform: "uppercase", letterSpacing: "0.08em" }}>شخصية البراند</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {PERSONALITIES.map(p => (
                      <button key={p.value} className={`pers-btn${personality === p.value ? " active" : ""}`} onClick={() => setPersonality(p.value)}>
                        <span style={{ fontSize: 20 }}>{p.emoji}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: personality === p.value ? "#0F1D3D" : "#7A8299", lineHeight: 1.3 }}>{p.label}</span>
                        <span style={{ fontSize: 10, color: "#A0A6B8", fontFamily: "monospace" }}>{p.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/201009215131?text=${waText}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "13px 24px", borderRadius: 14, fontWeight: 600, fontSize: 14,
                    color: "#fff", background: "linear-gradient(135deg,#25D366 0%,#128C7E 100%)",
                    textDecoration: "none", boxShadow: "0 6px 20px rgba(37,211,102,0.25)",
                    transition: "all .3s ease",
                  }}
                >
                  <span>📲</span>
                  <span>أرسل اللوحة عبر واتساب</span>
                </a>
              </div>

              {/* Right: Colors + Preview */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Color Palette Panel */}
                <div className="pg-card pg-card-el" style={{ padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#0F1D3D", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#7A8299", textTransform: "uppercase", letterSpacing: "0.08em" }}>لوحة الألوان الناتجة</span>
                    </div>
                    <button className="random-btn" onClick={generateRandom} title="توليد عشوائي">🔀</button>
                  </div>

                  {/* 60-30-10 Banner */}
                  <div style={{ height: 18, borderRadius: 10, overflow: "hidden", display: "flex", marginBottom: 18 }}>
                    <div style={{ flex: 6, background: colors.primary }} />
                    <div style={{ flex: 3, background: colors.secondary }} />
                    <div style={{ flex: 1, background: colors.accent }} />
                  </div>

                  {/* Swatches */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    <Swatch color={colors.primary}   label="الأساسي"   pct="60%" colorKey="primary"   locked={!!locked.primary}   onCopy={copyHex} onChange={handleColorChange} onToggleLock={toggleLock} />
                    <Swatch color={colors.secondary} label="الثانوي"   pct="30%" colorKey="secondary" locked={!!locked.secondary} onCopy={copyHex} onChange={handleColorChange} onToggleLock={toggleLock} />
                    <Swatch color={colors.accent}    label="التأكيدي"  pct="10%" colorKey="accent"    locked={!!locked.accent}    onCopy={copyHex} onChange={handleColorChange} onToggleLock={toggleLock} />
                  </div>

                  {/* HEX inputs */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
                    {[
                      { key: "primary", label: "60%" },
                      { key: "secondary", label: "30%" },
                      { key: "accent", label: "10%" },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <div style={{ fontSize: 9, color: "#A0A6B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</div>
                        <input
                          className="hex-input"
                          value={colors[key as keyof ColorPalette].toUpperCase()}
                          onChange={e => handleColorChange(key, e.target.value)}
                          maxLength={7}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Font strip */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, padding: "10px 14px", borderRadius: 12, background: "#F7F7F8", border: "1px solid #E8E9ED" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#7A8299", fontSize: 12, fontWeight: 500 }}>
                      <span>🔤</span> الخطوط المقترحة
                    </div>
                    <div style={{ fontSize: 12, color: "#0F1D3D", fontWeight: 600 }}>
                      {selectedFonts.heading} · <span style={{ fontWeight: 400, color: "#7A8299" }}>{selectedFonts.body}</span>
                    </div>
                  </div>

                  {/* Export buttons */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                    {(["css","tailwind","json","scss"] as const).map(t => (
                      <button key={t} className="export-btn" onClick={() => openExportModal(t)}>{t.toUpperCase()}</button>
                    ))}
                    <button className="export-btn" onClick={() => { navigator.clipboard.writeText(`${colors.primary} ${colors.secondary} ${colors.accent}`); toast("تم نسخ جميع الألوان!") }}>نسخ الكل</button>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="pg-card pg-card-el" style={{ overflow: "hidden" }}>
                  {/* Tab bar */}
                  <div style={{ display: "flex", padding: "12px 12px 0", gap: 4, background: "#F7F7F8", borderBottom: "1px solid #E8E9ED" }}>
                    {[
                      { id: "web" as const, label: "موقع إلكتروني", icon: "🌐" },
                      { id: "card" as const, label: "كارت عمل", icon: "💳" },
                      { id: "post" as const, label: "بوست سوشيال", icon: "📱" },
                    ].map(({ id, label, icon }) => (
                      <button key={id} className={`tab-btn${activeTab === id ? " active" : ""}`} onClick={() => setActiveTab(id)}>
                        {icon} {label}
                      </button>
                    ))}
                  </div>

                  <div style={{ padding: "28px 20px", minHeight: 360, display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAFA", position: "relative" }}>
                    {/* macOS dots */}
                    <div style={{ position: "absolute", top: 10, right: 12, display: "flex", gap: 5 }}>
                      {["#F87171","#FBBF24","#34D399"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: .7 }} />)}
                    </div>

                    {/* Web */}
                    {activeTab === "web" && (
                      <div style={{ width: "100%", maxWidth: 320, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 30px rgba(15,29,61,0.12)", border: "1px solid #E8E9ED", background: "#fff" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid #F0F1F4", background: colors.primary + "10" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 14, height: 14, borderRadius: 4, background: colors.primary }} />
                            <span style={{ fontSize: 11, fontWeight: 800, color: colors.primary }}>علامتي</span>
                          </div>
                          <div style={{ display: "flex", gap: 10, fontSize: 9, fontWeight: 600, color: "#A0A6B8" }}>
                            <span>الرئيسية</span><span>الخدمات</span><span>تواصل</span>
                          </div>
                        </div>
                        <div style={{ padding: "24px 20px", textAlign: "center" }}>
                          <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 100, background: colors.accent + "25", color: colors.accent, fontSize: 9, fontWeight: 700, marginBottom: 10 }}>
                            خدمات احترافية ✦
                          </div>
                          <h3 style={{ fontSize: 18, fontWeight: 900, color: colors.primary, lineHeight: 1.3, marginBottom: 8 }}>نحن نصنع هوية تجارية تدوم</h3>
                          <p style={{ fontSize: 10, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 14 }}>من الشعار إلى التصميم الشامل — كل شيء يعبر عن قيمة علامتك التجارية الحقيقية.</p>
                          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                            <button style={{ padding: "7px 14px", borderRadius: 10, background: colors.accent, color: "#fff", fontSize: 10, fontWeight: 700, border: "none" }}>احجز موعداً</button>
                            <button style={{ padding: "7px 14px", borderRadius: 10, fontSize: 10, fontWeight: 700, border: `1.5px solid ${colors.secondary}`, color: colors.primary, background: "transparent" }}>المزيد</button>
                          </div>
                        </div>
                        <div style={{ display: "flex", borderTop: "1px solid #F0F1F4" }}>
                          {[["٢٠٠+","عميل"],["٩٨٪","رضا"],["٥ سنوات","خبرة"]].map(([n,l]) => (
                            <div key={l} style={{ flex: 1, textAlign: "center", padding: "10px 0" }}>
                              <div style={{ fontSize: 13, fontWeight: 900, color: colors.primary }}>{n}</div>
                              <div style={{ fontSize: 9, color: "#A0A6B8" }}>{l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Card */}
                    {activeTab === "card" && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                        <div style={{ width: 270, height: 155, borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between", background: colors.primary, position: "relative", overflow: "hidden", boxShadow: "0 12px 40px rgba(15,29,61,0.15)" }}>
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,.1),transparent)" }} />
                          <div style={{ position: "absolute", top: 0, left: 0, width: 6, height: "100%", background: colors.accent, borderRadius: "0 0 0 16px" }} />
                          <div style={{ display: "flex", alignItems: "center", gap: 8, zIndex: 1 }}>
                            <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors.accent }} />
                            </div>
                            <span style={{ color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em" }}>العلامة التجارية</span>
                          </div>
                          <div style={{ zIndex: 1 }}>
                            <div style={{ color: "rgba(255,255,255,.5)", fontSize: 8 }}>المدير التنفيذي</div>
                            <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>أ. محمد زهران</div>
                            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 9 }}>تطوير الهوية البصرية</div>
                          </div>
                        </div>
                        <div style={{ width: 270, height: 155, borderRadius: 16, padding: 18, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", border: "1px solid #E8E9ED", boxShadow: "0 8px 24px rgba(15,29,61,0.08)" }}>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                              <div style={{ width: 28, height: 28, borderRadius: 8, background: colors.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: 12, height: 12, borderRadius: "50%", background: colors.accent }} />
                              </div>
                              <span style={{ fontWeight: 800, color: colors.primary, fontSize: 13 }}>علامتي</span>
                            </div>
                            <div style={{ fontSize: 9, color: "#9CA3AF" }}>info@brand.com</div>
                            <div style={{ fontSize: 9, color: "#9CA3AF" }}>www.brand.com</div>
                            <div style={{ height: 2, width: 32, borderRadius: 2, background: colors.accent, margin: "8px auto 0" }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Post */}
                    {activeTab === "post" && (
                      <div style={{ width: 270, height: 270, borderRadius: 16, background: "#fff", border: "1px solid #E8E9ED", boxShadow: "0 12px 40px rgba(15,29,61,0.12)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <div style={{ height: 4, background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }} />
                        <div style={{ flex: 1, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <div style={{ width: 26, height: 26, borderRadius: 8, background: colors.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors.accent }} />
                              </div>
                              <span style={{ fontSize: 10, fontWeight: 800, color: colors.primary }}>حساب العيادة</span>
                            </div>
                            <span style={{ fontSize: 8, color: "#D1D5DB", background: "#F9FAFB", padding: "2px 8px", borderRadius: 100 }}>نصائح طبية</span>
                          </div>
                          <div>
                            <div style={{ width: 24, height: 2.5, borderRadius: 2, background: colors.accent, marginBottom: 8 }} />
                            <div style={{ fontSize: 13, fontWeight: 900, color: colors.primary, lineHeight: 1.4, marginBottom: 6 }}>كيف تحافظ على هدوء أعصابك أثناء العمل اليومي؟</div>
                            <div style={{ fontSize: 9, color: "#9CA3AF", lineHeight: 1.6 }}>سيكولوجية الألوان وتصميم بيئتك المحيطة تلعب دوراً مهماً في صحتك النفسية.</div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F9FAFB", paddingTop: 10 }}>
                            <span style={{ fontSize: 8, color: "#D1D5DB" }}>تاج ستوديو</span>
                            <button style={{ padding: "5px 12px", borderRadius: 8, background: colors.accent, color: "#fff", fontSize: 8, fontWeight: 700, border: "none" }}>اقرأ المزيد</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Mood Tags ── */}
            <section style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#FBBF24,#F87171)", fontSize: 14 }}>✨</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0F1D3D" }}>الحالة المزاجية للبراند</div>
                  <div style={{ fontSize: 11, color: "#7A8299" }}>اختر مزاجاً لاستكشاف لوحات ألوان مطابقة</div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {MOOD_TAGS.map(m => (
                  <button key={m.id} className={`mood-tag${selectedMood === m.id ? " selected" : ""}`} onClick={() => applyMood(m.id)}>
                    <div style={{ width: 10, height: 10, borderRadius: 4, background: m.color, flexShrink: 0 }} />
                    {m.label}
                  </button>
                ))}
              </div>
            </section>

            {/* ── Generate CTA ── */}
            <section style={{ textAlign: "center", marginBottom: 56 }}>
              <button className="generate-btn" onClick={generateRandom}>
                <span style={{ fontSize: 18 }}>🎨</span>
                <span>توليد لوحة عشوائية</span>
                <span style={{ fontSize: 14, opacity: .7 }}>←</span>
              </button>
              <p style={{ fontSize: 11, marginTop: 10, color: "#B0B5C3" }}>أو اضغط Space لتوليد فوري</p>
            </section>

            {/* ── Feature Badges ── */}
            <section style={{ marginBottom: 56 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#0F1D3D", marginBottom: 4 }}>مدعوم بمعايير التصميم العالمية</div>
                <div style={{ fontSize: 13, color: "#7A8299" }}>كل لوحة مبنية على علم الألوان وتجربة المستخدم</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
                {[
                  { label: "متناسق بصرياً",  color: "#34D399", icon: "✓" },
                  { label: "سيكولوجية الألوان", color: "#3B82F6", icon: "🧠" },
                  { label: "توليد فوري",      color: "#FBBF24", icon: "⚡" },
                  { label: "قابل للتصدير",   color: "#F87171", icon: "📤" },
                  { label: "خطوط عربية محسّنة", color: "#22D3EE", icon: "🔤" },
                  { label: "مجاني 100%",      color: "#A78BFA", icon: "🎁" },
                ].map(b => (
                  <div key={b.label} className="feature-badge">
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: b.color, flexShrink: 0 }} />
                    {b.icon} {b.label}
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{ marginBottom: 32 }}>
              <div className="pg-card pg-card-el" style={{ maxWidth: 680, margin: "0 auto", padding: "4px 24px 8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 0 12px" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#34D399,#22D3EE)", fontSize: 14 }}>❓</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0F1D3D" }}>الأسئلة الشائعة</div>
                </div>
                {FAQ_DATA.map((item, i) => (
                  <div key={i} style={{ borderBottom: i < FAQ_DATA.length - 1 ? "1px solid #E8E9ED" : "none" }}>
                    <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span>{item.q}</span>
                      <span style={{ fontSize: 11, color: "#A0A6B8", transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .35s cubic-bezier(.25,.1,.25,1)", flexShrink: 0 }}>▾</span>
                    </button>
                    {openFaq === i && (
                      <div className="faq-a" style={{ paddingBottom: 16 }}>{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>

        {/* ── Footer ── */}
        <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid #E8E9ED", padding: "24px", textAlign: "center" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10, fontSize: 11, color: "#B0B5C3" }}>
            <span>صُنع بعناية بواسطة تاج ستوديو</span>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="/tools" style={{ color: "#B0B5C3", textDecoration: "none" }}>الأدوات</a>
              <a href="https://github.com/Tags-Studio/tagstudio" target="_blank" rel="noopener noreferrer" style={{ color: "#B0B5C3", textDecoration: "none" }}>GitHub</a>
            </div>
          </div>
        </footer>

        {/* ── Export Modal ── */}
        {showExport && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div className="modal-backdrop" style={{ position: "absolute", inset: 0 }} onClick={() => setShowExport(false)} />
            <div className="modal-content" style={{ position: "relative", padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0F1D3D" }}>{exportLabel}</h3>
                <button onClick={() => setShowExport(false)} style={{ width: 28, height: 28, borderRadius: 8, background: "#F0F1F4", border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#7A8299" }}>✕</button>
              </div>
              <pre className="modal-code">{exportCode}</pre>
              <button
                onClick={() => { navigator.clipboard.writeText(exportCode); toast("تم نسخ الكود!"); setShowExport(false) }}
                style={{ marginTop: 16, width: "100%", padding: "11px", borderRadius: 14, fontSize: 13, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#0F1D3D,#1A2E52)", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(15,29,61,0.2)" }}
              >
                📋 نسخ إلى الحافظة
              </button>
            </div>
          </div>
        )}

        {/* ── Toasts ── */}
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, pointerEvents: "none" }}>
          {toasts.map(t => (
            <Toast key={t.id} msg={t.msg} onDone={() => removeToast(t.id)} />
          ))}
        </div>

      </div>
    </>
  )
}
