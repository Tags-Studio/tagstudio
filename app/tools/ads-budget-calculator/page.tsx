"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"

// ─── Constants & Data ─────────────────────────────────────────────────────────

const BENCHMARKS: Record<string, { cpm: number, cpc: number, cvr: number, ctr: number, icon: string, name: string, avgCPA: number, color: string }> = {
  meta:     { cpm: 10,  cpc: 1.2,  cvr: 3.5,  ctr: 0.80, icon: "fa-brands fa-meta",       name: "ميتا",      avgCPA: 42, color: "#1877F2" },
  google:   { cpm: 20,  cpc: 2.5,  cvr: 5.0,  ctr: 1.20, icon: "fa-brands fa-google",     name: "جوجل",      avgCPA: 50, color: "#4285F4" },
  tiktok:   { cpm: 7,   cpc: 0.6,  cvr: 2.0,  ctr: 1.10, icon: "fa-brands fa-tiktok",     name: "تيك توك",   avgCPA: 30, color: "#000000" },
  linkedin: { cpm: 50,  cpc: 8.0,  cvr: 3.0,  ctr: 0.45, icon: "fa-brands fa-linkedin-in",name: "لينكد إن",  avgCPA: 180, color: "#0A66C2" },
  snapchat: { cpm: 5,   cpc: 0.8,  cvr: 1.5,  ctr: 0.95, icon: "fa-brands fa-snapchat",   name: "سناب شات",  avgCPA: 53, color: "#FFFC00" }
}

const IND_MULT: Record<string, number> = {
  ecommerce: 1.0, technology: 1.3, services: 0.95, education: 0.8,
  health: 1.5, restaurants: 0.7, realestate: 1.2, fashion: 0.85
}

const COUNTRY_MULT: Record<string, { label: string, mult: number }> = {
  saudi: { label: "السعودية", mult: 1.5 },
  egypt: { label: "مصر", mult: 0.5 },
  uae: { label: "الإمارات", mult: 1.8 },
  kuwait: { label: "الكويت", mult: 1.6 },
  jordan: { label: "الأردن", mult: 0.8 },
  global: { label: "دول أخرى", mult: 1.0 }
}

const GOAL_ADJ: Record<string, { impM: number, cvrM: number, roiM: number, label: string, icon: string }> = {
  awareness:   { impM: 1.5,  cvrM: 0.4,  roiM: 1.8, label: "زيادة الوعي", icon: "fa-eye" },
  traffic:     { impM: 1.1,  cvrM: 0.7,  roiM: 2.5, label: "زيارة الموقع", icon: "fa-arrow-pointer" },
  conversions: { impM: 0.9,  cvrM: 1.3,  roiM: 3.2, label: "تحويلات", icon: "fa-bullseye" },
  engagement:  { impM: 1.2,  cvrM: 0.5,  roiM: 2.0, label: "تفاعل", icon: "fa-heart" }
}

const FUNNEL: Record<string, [number, number, number]> = {
  awareness:   [60, 30, 10],
  traffic:     [40, 40, 20],
  conversions: [20, 30, 50],
  engagement:  [50, 35, 15]
}

const SCEN_MULT: Record<string, { val: number, label: string }> = { 
  optimistic: { val: 0.75, label: "متفائل" }, 
  realistic: { val: 1.0, label: "واقعي" }, 
  conservative: { val: 1.35, label: "محافظ" } 
}

const LEARN: Record<string, string> = {
  meta: "3-5 أيام", google: "5-7 أيام", tiktok: "2-4 أيام",
  linkedin: "7-10 أيام", snapchat: "2-3 أيام"
}

const TIPS: Record<string, Record<string, string[]>> = {
  meta: {
      awareness:   ["استخدم فيديوهات قصيرة بتصميم احترافي — أول 3 ثوانٍ هي الأهم","جرّب إعلانات Carousel لعرض قصة المنتج بطريقة تفاعلية","استهدف Lookalike Audiences بناءً على عملائك الحاليين الأفضل"],
      traffic:     ["استخدم CTA مباشر مثل 'تسوق الآن' بدلاً من 'اعرف المزيد'","جرّب Collection Ads لتجربة تسوق سلسة داخل التطبيق","أعد استهداف زوار الموقع بتصاميم مختلفة لرفع النقر"],
      conversions: ["استخدم Dynamic Product Ads لإعادة استهداف الزوار بالمنتجات التي شاهدوها","طبّق استراتيجية Retargeting متعددة المراحل — يمكن أن ترفع التحويلات 70%","جرّب Advantage+ Shopping Campaigns للاستفادة من الذكاء الاصطناعي"],
      engagement:  ["أنشئ محتوى تفاعلي كالاستطلاعات والأسئلة لزيادة التفاعل العضوي","استخدم Reels Ads للوصول لجمهور أوسع بتكلفة أقل","حافظ على تواصل يومي عبر Stories تفاعلية تبني المجتمع"]
  },
  google: {
      awareness:   ["استخدم Display Network مع تصميمات بصري جذابة للوعي بالعلامة","جرّب YouTube Bumper Ads (6 ثوانٍ) لرسائل قصيرة وقوية","استهدف جماهير متخصصة عبر Affinity و In-Market Audiences"],
      traffic:     ["ركّز على Extended Text Ads مع كلمات مفتاحية Transactional","أضف Site Links و Callouts لزيادة مساحة الإعلان وتحسين النقر","استخدم Negative Keywords لتقليل النقرات غير المفيدة"],
      conversions: ["طبّق Performance Max للاستفادة من جميع قنوات جوجل معاً","استخدم Smart Bidding مع Target CPA لتحسين التحويلات تلقائياً","أنشئ صفحات هبوط مخصصة لكل مجموعة إعلانية"],
      engagement:  ["استخدم Discovery Ads للوصول للمستخدمين أثناء تصفحهم","جرّب إعلانات Gmail Sponsored لتفاعل مباشر في الصندوق الوارد","أنشئ محتوى Gallery Ads تفاعلي يعرض المنتج بزاوية 360°"]
  },
  tiktok: {
      awareness:   ["أنشئ محتوى يبدو طبيعياً وليس كإعلان — جمهور تيك توك يكره الإعلانات التقليدية","استخدم الموسيقى الرائجة والتحديات لزيادة الانتشار","جرّب TopView Ads لظهور في أول مقطع يشاهده المستخدم"],
      traffic:     ["أضف رابط مباشر في الإعلان مع CTA واضح 'تسوق من الرابط'","استخدم Spark Ads لتعزيز المحتوى العضوي الأداء","أنشئ سلسلة مقاطع مترابطة تبني الفضول وتدفع للنقر"],
      conversions: ["استخدم TikTok Shop لتحويل مباشر داخل المنصة","طبّق استراتيجية Retargeting عبر Pixel لاستهداف المهتمين","جرّب Live Shopping لخلق تجربة شراء تفاعلية فورية"],
      engagement:  ["شارك في التحديات الرائجة وأضف لمستك الإبداعية","استخدم Duets و Stitches للتفاعل مع محتوى المجتمع","أنشئ محتوى سريع ومثير — أول ثانية تحدد البقاء أو التخطي"]
  },
  linkedin: {
      awareness:   ["استخدم Document Ads لعرض تقارير ودراسات حالة تبني المصداقية","استهدف حسب الوظيفة والصناعة وحجم الشركة بدقة عالية","جرّب Thought Leader Ads لنشر محتوى من حسابات القادة في الشركة"],
      traffic:     ["استخدم Lead Gen Forms المدمجة لتقليل فرك التسرب","أنشئ إعلانات Single Image مع عنوان قوي يثير الفضول","استهدف مجموعة Decision Makers بمحتوى مخصص لهم"],
      conversions: ["استخدم Matched Audiences لإعادة استهداف زوار الموقع","أنشئ حملات ABM (Account-Based) للشركات الكبرى المستهدفة","جرّب Conversation Ads للتواصل المباشر مع prospects عبر الإعلان"],
      engagement:  ["انشر محتوى تفكير قيادي يثير النقاش في التعليقات","استخدم Poll Ads لجمع بيانات وتفاعل في نفس الوقت","أنشئ مجموعة LinkedIn متخصصة وبنِ مجتمعاً حول علامتك"]
  },
  snapchat: {
      awareness:   ["استخدم AR Lenses المخصصة — المستخدمون يحبون تجربتها ومشاركتها","جرّب Story Ads بتصميم عمودي كامل الشاشة","استهدف الجماهير حسب الاهتمامات والموقع والسلوك"],
      traffic:     ["أضف Web View attachment لتجربة تصفح سلسة داخل التطبيق","استخدم Deep Links لتوجيه المستخدمين مباشرة للصفحة المطلوبة","جرّب Collection Ads لعرض منتجات متعددة بقصة بصرية"],
      conversions: ["استخدم Dynamic Product Ads لإعادة استهداف المشاهدين","طبّق استراتيجية Retargeting عبر Snap Pixel","جرّب Shoppable Ads للتحويل المباشر داخل سناب"],
      engagement:  ["أنشئ Snap Games أو Filters تفاعلية تبني الوعي بالعلامة","استخدم Geofilters للمحتاجات المحلية والأحداث","شارك في Highlight Stories للوصول لجمهور أوسع عضوياً"]
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtMetric(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return (n / 1000).toFixed(1) + "K"
  return Math.round(n).toLocaleString("en")
}
function fmtCurrency(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function calculateMetrics(budg: number, plat: string, gl: string, ind: string, duration: number, scen: string, cntry: string) {
  const b = BENCHMARKS[plat]
  const im = IND_MULT[ind]
  const ga = GOAL_ADJ[gl]
  const sm = SCEN_MULT[scen].val
  const cm = COUNTRY_MULT[cntry]?.mult || 1.0

  const adjustedCPM = b.cpm * im * sm * cm
  const adjustedCVR = b.cvr * ga.cvrM
  const adjustedCTR = b.ctr

  const dailyBudget = budg / duration
  const dailyImpressions = (dailyBudget / adjustedCPM) * 1000 * ga.impM
  const totalImpressions = Math.round(dailyImpressions * duration)
  const totalClicks = Math.round(totalImpressions * (adjustedCTR / 100))
  const totalConversions = Math.round(totalClicks * (adjustedCVR / 100))

  return {
    impressions: totalImpressions,
    clicks: totalClicks,
    conversions: totalConversions,
    cpc: budg / Math.max(1, totalClicks),
    cpm: (budg / Math.max(1, totalImpressions)) * 1000,
    cpa: budg / Math.max(1, totalConversions),
    ctr: adjustedCTR,
    cvr: adjustedCVR,
    dailyBudget: dailyBudget,
    roi: ga.roiM * (1 / sm),
    avgCPA: b.avgCPA * im
  }
}

function DonutChart({ data, budget, pulse }: { data: [number, number, number], budget: number, pulse: boolean }) {
  const r = 40
  const circ = 2 * Math.PI * r
  
  let offset = 0
  const segments = data.map((val, i) => {
    const len = (val / 100) * circ
    const color = i === 0 ? "var(--blue)" : i === 1 ? "var(--green)" : "var(--pink)"
    const strokeDasharray = `${len} ${circ - len}`
    const strokeDashoffset = -offset
    
    // Calculate angle for text placement
    const angleStart = (offset / circ) * 360
    const angleSweep = (len / circ) * 360
    const angleMid = angleStart + angleSweep / 2
    
    // The angle in radians is (angleMid - 90) * PI / 180 to start from top
    const rad = (angleMid - 90) * Math.PI / 180
    const tx = 50 + r * Math.cos(rad)
    const ty = 50 + r * Math.sin(rad)

    offset += len

    return (
      <g key={i}>
        <circle
          r={r} cx="50" cy="50"
          fill="transparent"
          stroke={color}
          strokeWidth="16"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
          transform="rotate(-90 50 50)"
        />
        {val > 0 && (
          <text 
            x={tx} y={ty} 
            fill="#ffffff" 
            fontSize="5.5" 
            fontWeight="bold" 
            fontFamily="'DM Sans', sans-serif"
            textAnchor="middle" 
            dominantBaseline="central"
            style={{ pointerEvents: "none" }}
          >
            {val}%
          </text>
        )}
      </g>
    )
  })

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}>
        <circle r={r} cx="50" cy="50" fill="transparent" stroke="var(--surface-3)" strokeWidth="16" />
        {segments}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
        <div className={`font-dm font-bold text-xl ${pulse ? "nupd inline-block" : "inline-block"}`} style={{ color: "var(--blue)", lineHeight: 1 }}>
          ${budget.toLocaleString("en")}
        </div>
        <div className="text-[10px] font-medium mt-1" style={{ color: "var(--txt3)" }}>الميزانية الشهرية</div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdsBudgetCalculator() {
  const [budget, setBudget] = useState(5000)
  const [platform, setPlatform] = useState("meta")
  const [goal, setGoal] = useState("conversions")
  const [industry, setIndustry] = useState("ecommerce")
  const [country, setCountry] = useState("saudi")
  const [duration, setDuration] = useState(30)
  const [scenario, setScenario] = useState("realistic")

  // Animated numbers trigger
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    setPulse(true)
    const t = setTimeout(() => setPulse(false), 300)
    return () => clearTimeout(t)
  }, [budget, platform, goal, industry, duration, scenario, country])

  const res = useMemo(() => calculateMetrics(budget, platform, goal, industry, duration, scenario, country), [budget, platform, goal, industry, duration, scenario, country])
  
  const compData = useMemo(() => {
    return Object.keys(BENCHMARKS).map(k => {
      const m = calculateMetrics(budget, k, goal, industry, duration, scenario, country)
      return { id: k, name: BENCHMARKS[k].name, ...m }
    })
  }, [budget, goal, industry, duration, scenario, country])

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=DM+Sans:wght@400;500;700&display=swap');
        .ads-root {
          --blue: #2563EB; --blue-light: #60A5FA; --blue-dim: rgba(37,99,235,0.06);
          --green: #10B981; --yellow: #F59E0B; --pink: #EC4899; --purple: #8B5CF6;
          --bg: #FAFBFF; --surface: #FFFFFF; --surface-2: #F1F3F9; --surface-3: #E8EAF2;
          --border: rgba(0,0,0,0.06); --border-h: rgba(0,0,0,0.12);
          --txt: #0F172A; --txt2: #64748B; --txt3: #94A3B8;
          font-family: 'Tajawal', sans-serif; background: var(--bg); color: var(--txt); min-height: 100vh; overflow-x: hidden; direction: rtl;
        }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        
        .brand-gradient {
            background: linear-gradient(135deg, #F59E0B 0%, #10B981 30%, #2563EB 65%, #EC4899 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .brand-gradient-bg { background: linear-gradient(135deg, #F59E0B 0%, #10B981 30%, #2563EB 65%, #EC4899 100%); }

        .orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
        .orb-1 { width: 500px; height: 500px; background: rgba(245,158,11,0.08); top: -200px; right: -150px; animation: orbA 25s ease-in-out infinite; }
        .orb-2 { width: 400px; height: 400px; background: rgba(37,99,235,0.06); bottom: -100px; left: -100px; animation: orbB 30s ease-in-out infinite; }
        .orb-3 { width: 300px; height: 300px; background: rgba(236,72,153,0.05); top: 50%; left: 50%; animation: orbC 20s ease-in-out infinite; transform: translate(-50%,-50%); }

        @keyframes orbA { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-80px,60px) scale(1.1)} 66%{transform:translate(40px,-30px) scale(0.9)} }
        @keyframes orbB { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(70px,-50px) scale(1.08)} 66%{transform:translate(-40px,30px) scale(0.92)} }
        @keyframes orbC { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-30%,-60%) scale(1.2)} }
        @keyframes npulse { 0%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.97)} 100%{opacity:1;transform:scale(1)} }
        .nupd { animation: npulse 0.25s ease; }

        .ads-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04); transition: box-shadow 0.35s, border-color 0.35s, transform 0.35s; }
        .ads-card:hover { box-shadow: 0 2px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06); }
        .card-sticky { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }

        input[type="range"] { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 3px; outline: none; cursor: pointer; direction: ltr; background: var(--surface-3); }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 24px; height: 24px; border-radius: 50%; background: var(--surface); border: 3px solid var(--blue); cursor: pointer; box-shadow: 0 2px 8px rgba(37,99,235,0.2); transition: box-shadow 0.25s, transform 0.25s; }
        input[type="range"]::-webkit-slider-thumb:hover { box-shadow: 0 2px 12px rgba(37,99,235,0.35); transform: scale(1.15); }

        .plat-pill { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface); cursor: pointer; transition: all 0.3s; font-size: 13.5px; color: var(--txt2); }
        .plat-pill:hover { border-color: var(--border-h); color: var(--txt); box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .plat-pill.on { border-color: var(--blue); background: var(--blue-dim); color: var(--blue); box-shadow: 0 2px 12px rgba(37,99,235,0.1); }

        .goal-card { padding: 18px 12px; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); cursor: pointer; transition: all 0.3s; text-align: center; }
        .goal-card:hover { border-color: var(--border-h); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
        .goal-card.on { border-color: var(--blue); background: var(--blue-dim); box-shadow: 0 2px 16px rgba(37,99,235,0.08); }
        .goal-card.on .g-icon { color: var(--blue); }

        .dur-pill { padding: 7px 18px; border-radius: 10px; font-size: 13px; border: 1px solid var(--border); background: var(--surface); color: var(--txt2); cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif; }
        .dur-pill:hover { color: var(--txt); border-color: var(--border-h); }
        .dur-pill.on { background: var(--blue); border-color: var(--blue); color: #fff; }

        .sel { appearance: none; -webkit-appearance: none; width: 100%; padding: 13px 42px 13px 16px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat left 16px center; color: var(--txt); font-family: 'Tajawal', sans-serif; font-size: 14.5px; cursor: pointer; transition: all 0.3s; outline: none; }
        .sel:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }

        .met-card { padding: 22px; border-radius: 16px; border: 1px solid var(--border); background: var(--surface); transition: all 0.35s; position: relative; overflow: hidden; }
        .met-card::before { content: ''; position: absolute; top: 0; right: 0; left: 0; height: 3px; border-radius: 16px 16px 0 0; opacity: 0; transition: opacity 0.35s; }
        .met-card:nth-child(1)::before { background: linear-gradient(90deg, #F59E0B, #10B981); }
        .met-card:nth-child(2)::before { background: linear-gradient(90deg, #10B981, #2563EB); }
        .met-card:nth-child(3)::before { background: linear-gradient(90deg, #2563EB, #8B5CF6); }
        .met-card:nth-child(4)::before { background: linear-gradient(90deg, #8B5CF6, #EC4899); }
        .met-card:nth-child(5)::before { background: linear-gradient(90deg, #EC4899, #F59E0B); }
        .met-card:nth-child(6)::before { background: linear-gradient(90deg, #F59E0B, #EC4899); }
        .met-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .met-card:hover::before { opacity: 1; }

        .sc-btn { padding: 7px 16px; border-radius: 8px; font-size: 12.5px; border: 1px solid var(--border); background: var(--surface); color: var(--txt2); cursor: pointer; transition: all 0.3s; font-family: 'Tajawal', sans-serif; }
        .sc-btn:hover { color: var(--txt); border-color: var(--border-h); }
        .sc-btn.on { background: var(--blue); border-color: var(--blue); color: #fff; }

        .comp-bar { height: 6px; border-radius: 3px; background: var(--surface-3); overflow: hidden; }
        .comp-fill { height: 100%; border-radius: 3px; transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
        .comp-table tr { transition: background 0.2s; }
        .comp-table tbody tr:hover { background: rgba(37,99,235,0.03); }

        .tag-logo-mark { width: 32px; height: 32px; position: relative; }
        .tag-logo-mark span { position: absolute; width: 16px; height: 4px; border-radius: 2px; top: 50%; left: 50%; }
        .tag-logo-mark span:nth-child(1) { background: #F59E0B; transform: translate(-50%,-50%) rotate(45deg); }
        .tag-logo-mark span:nth-child(2) { background: #10B981; transform: translate(-50%,-50%) rotate(-15deg); }
        .tag-logo-mark span:nth-child(3) { background: #2563EB; transform: translate(-50%,-50%) rotate(-45deg); }
        .tag-logo-mark span:nth-child(4) { background: #EC4899; transform: translate(-50%,-50%) rotate(15deg); }
      `}</style>

      <div className="ads-root relative min-h-screen pb-16">
        
        {/* Background Orbs */}
        <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4" style={{ background: "rgba(250,251,255,0.8)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid var(--border)" }}>
          <a href="/tools" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
            <div className="tag-logo-mark"><span></span><span></span><span></span><span></span></div>
            <span className="font-dm font-bold text-base tracking-tight" style={{ color: "var(--blue)" }}>TAG STUDIO</span>
          </a>
          <a href="/" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: "var(--blue)", color: "#fff", boxShadow: "0 2px 12px rgba(37,99,235,0.25)", textDecoration: "none" }}>
            الرئيسية
          </a>
        </nav>

        <main className="relative z-10">
          
          {/* Header */}
          <header className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8" style={{ background: "var(--blue-dim)", color: "var(--blue)", border: "1px solid rgba(37,99,235,0.12)" }}>
              <i className="fas fa-bolt text-[10px]"></i> أدوات التسويق الرقمي
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
              <span className="brand-gradient">حاسبة ميزانية</span><br/>
              <span style={{ color: "var(--txt)" }}>الإعلانات المدفوعة</span>
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--txt2)" }}>
              قدّر نتائج حملاتك الإعلانية بدقة قبل إنفاق دولار واحد. اختر منصتك، حدد ميزانيتك، واحصل على توقعات واقعية فوراً.
            </p>
          </header>

          <section className="px-4 md:px-8 lg:px-12 pb-24 max-w-[1300px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

              {/* Left Column - Controls */}
              <div className="lg:col-span-5">
                <div className="card-sticky p-6 md:p-8 sticky top-24">
                  <h2 className="text-lg font-bold mb-1" style={{ color: "var(--txt)" }}>إعدادات الحملة</h2>
                  <p className="text-xs mb-8" style={{ color: "var(--txt3)" }}>عدّل القيم وشاهد النتائج تتحدث لحظياً</p>

                  {/* Budget */}
                  <div className="mb-8">
                    <div className="flex items-baseline justify-between mb-4">
                      <label className="text-sm font-medium" style={{ color: "var(--txt2)" }}>الميزانية الشهرية</label>
                      <div className="font-dm font-bold text-2xl" style={{ color: "var(--blue)" }}>
                        $<span className={pulse ? "nupd inline-block" : "inline-block"}>{budget.toLocaleString("en")}</span>
                      </div>
                    </div>
                    <input 
                      type="range" min="500" max="100000" step="500" value={budget}
                      onChange={e => setBudget(Number(e.target.value))}
                      style={{ background: `linear-gradient(to right, var(--blue) 0%, var(--blue) ${(budget/100000)*100}%, var(--surface-3) ${(budget/100000)*100}%, var(--surface-3) 100%)` }}
                    />
                    <div className="flex justify-between mt-2.5 text-[11px] font-dm" style={{ color: "var(--txt3)" }}>
                      <span>$500</span><span>$100,000</span>
                    </div>
                  </div>

                  {/* Platform */}
                  <div className="mb-8">
                    <label className="text-sm font-medium block mb-3" style={{ color: "var(--txt2)" }}>المنصة الإعلانية</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(BENCHMARKS).map(([k, v]) => (
                        <button key={k} className={`plat-pill ${platform === k ? "on" : ""}`} onClick={() => setPlatform(k)}>
                          <i className={v.icon}></i> {v.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Goal */}
                  <div className="mb-8">
                    <label className="text-sm font-medium block mb-3" style={{ color: "var(--txt2)" }}>هدف الحملة</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {Object.entries(GOAL_ADJ).map(([k, v]) => (
                        <div key={k} className={`goal-card ${goal === k ? "on" : ""}`} onClick={() => setGoal(k)}>
                          <div className="g-icon text-xl mb-2" style={{ color: "var(--txt3)", transition: "color .3s" }}><i className={`fas ${v.icon}`}></i></div>
                          <div className="text-sm font-medium">{v.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Country */}
                  <div className="mb-8">
                    <label className="text-sm font-medium block mb-3" style={{ color: "var(--txt2)" }}>البلد المستهدف</label>
                    <select className="sel" value={country} onChange={e => setCountry(e.target.value)}>
                      {Object.entries(COUNTRY_MULT).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Industry */}
                  <div className="mb-8">
                    <label className="text-sm font-medium block mb-3" style={{ color: "var(--txt2)" }}>القطاع الصناعي</label>
                    <select className="sel" value={industry} onChange={e => setIndustry(e.target.value)}>
                      <option value="ecommerce">تجارة إلكترونية</option>
                      <option value="technology">تكنولوجيا وبرمجيات</option>
                      <option value="services">خدمات مهنية</option>
                      <option value="education">تعليم وتدريب</option>
                      <option value="health">صحة وعافية</option>
                      <option value="restaurants">مطاعم وأغذية</option>
                      <option value="realestate">عقارات</option>
                      <option value="fashion">أزياء وموضة</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-sm font-medium block mb-3" style={{ color: "var(--txt2)" }}>مدة الحملة</label>
                    <div className="flex flex-wrap gap-2">
                      {[7, 14, 30, 60, 90].map(d => (
                        <button key={d} className={`dur-pill ${duration === d ? "on" : ""}`} onClick={() => setDuration(d)}>
                          {d} يوم
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column - Results */}
              <div className="lg:col-span-7">
                <div className="space-y-6">

                  {/* Scenario */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <h2 className="text-lg font-bold" style={{ color: "var(--txt)" }}>النتائج المتوقعة</h2>
                    <div className="flex gap-1.5">
                      {Object.entries(SCEN_MULT).map(([k, v]) => (
                        <button key={k} className={`sc-btn ${scenario === k ? "on" : ""}`} onClick={() => setScenario(k)}>
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: "الانطباعات", val: fmtMetric(res.impressions), sub: "شهرياً", col: "var(--green)" },
                      { label: "النقرات", val: fmtMetric(res.clicks), sub: "شهرياً", col: "var(--green)" },
                      { label: "التحويلات", val: fmtMetric(res.conversions), sub: "شهرياً", col: "var(--blue)" },
                      { label: "تكلفة النقرة", val: "$" + fmtCurrency(res.cpc), sub: "CPC", col: "var(--txt3)" },
                      { label: "تكلفة الألف ظهور", val: "$" + fmtCurrency(res.cpm), sub: "CPM", col: "var(--txt3)" },
                      { label: "تكلفة التحويل", val: "$" + fmtCurrency(res.cpa), sub: "CPA", col: "var(--pink)" },
                    ].map((m, i) => (
                      <div key={i} className="met-card">
                        <div className="text-[11px] font-medium mb-2" style={{ color: "var(--txt3)" }}>{m.label}</div>
                        <div className={`font-dm font-bold text-xl md:text-2xl ${pulse ? "nupd inline-block" : "inline-block"}`} style={{ color: i === 2 ? "var(--blue)" : i === 5 ? "var(--pink)" : "var(--txt)" }}>{m.val}</div>
                        <div className="text-[11px] mt-1.5 font-dm" style={{ color: m.col }}>{m.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Charts & Benchmarks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Funnel Donut */}
                    <div className="ads-card p-6 flex flex-col items-center justify-center">
                      <div className="text-xs font-medium mb-4" style={{ color: "var(--txt3)" }}>توزيع الميزانية على القمع</div>
                      <DonutChart data={FUNNEL[goal]} budget={budget} pulse={pulse} />
                      <div className="flex flex-wrap justify-center gap-4 mt-5">
                        <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--txt2)" }}><span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--blue)" }}></span> أعلى القمع</div>
                        <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--txt2)" }}><span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--green)" }}></span> منتصف القمع</div>
                        <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--txt2)" }}><span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--pink)" }}></span> أسفل القمع</div>
                      </div>
                    </div>

                    {/* Comparison Bars */}
                    <div className="ads-card p-6">
                      <div className="text-xs font-medium mb-5" style={{ color: "var(--txt3)" }}>مقارنة مع متوسط القطاع</div>
                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1.5">
                            <span style={{ color: "var(--txt2)" }}>معدل النقر (CTR)</span>
                            <span className={`font-dm font-semibold ${pulse ? 'nupd inline-block' : 'inline-block'}`} style={{ color: "var(--txt)" }}>{res.ctr.toFixed(2)}%</span>
                          </div>
                          <div className="comp-bar"><div className="comp-fill" style={{ width: `${Math.min(100, (res.ctr / (BENCHMARKS[platform].ctr * 1.3)) * 100)}%`, background: res.ctr >= BENCHMARKS[platform].ctr ? 'var(--blue)' : 'var(--pink)' }}></div></div>
                          <div className="text-[10px] mt-1 font-dm" style={{ color: "var(--txt3)" }}>المتوسط: {BENCHMARKS[platform].ctr.toFixed(2)}%</div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[11px] mb-1.5">
                            <span style={{ color: "var(--txt2)" }}>معدل التحويل (CVR)</span>
                            <span className={`font-dm font-semibold ${pulse ? 'nupd inline-block' : 'inline-block'}`} style={{ color: "var(--txt)" }}>{res.cvr.toFixed(2)}%</span>
                          </div>
                          <div className="comp-bar"><div className="comp-fill" style={{ width: `${Math.min(100, (res.cvr / 8) * 100)}%`, background: res.cvr >= BENCHMARKS[platform].cvr ? 'var(--green)' : 'var(--pink)' }}></div></div>
                          <div className="text-[10px] mt-1 font-dm" style={{ color: "var(--txt3)" }}>المتوسط: {BENCHMARKS[platform].cvr.toFixed(2)}%</div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[11px] mb-1.5">
                            <span style={{ color: "var(--txt2)" }}>تكلفة التحويل (CPA)</span>
                            <span className={`font-dm font-semibold ${pulse ? 'nupd inline-block' : 'inline-block'}`} style={{ color: "var(--txt)" }}>${fmtCurrency(res.cpa)}</span>
                          </div>
                          <div className="comp-bar"><div className="comp-fill" style={{ width: `${Math.min(100, (BENCHMARKS[platform].avgCPA * IND_MULT[industry] / Math.max(1, res.cpa)) * 100)}%`, background: res.cpa <= (BENCHMARKS[platform].avgCPA * IND_MULT[industry]) ? 'var(--green)' : 'var(--pink)' }}></div></div>
                          <div className="text-[10px] mt-1 font-dm" style={{ color: "var(--txt3)" }}>المتوسط: ${(BENCHMARKS[platform].avgCPA * IND_MULT[industry]).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="ads-card p-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-row-reverse text-start">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--blue-dim)" }}>
                        <i className="fas fa-chart-line text-sm" style={{ color: "var(--blue)" }}></i>
                      </div>
                      <div>
                        <div className="text-[11px] text-end" style={{ color: "var(--txt3)" }}>الإنفاق اليومي المتوقع</div>
                        <div className={`font-dm font-bold text-lg text-end ${pulse ? 'nupd inline-block' : 'inline-block'}`}>${fmtMetric(res.dailyBudget)}</div>
                      </div>
                    </div>
                    <div className="h-8 w-px" style={{ background: "var(--border)" }}></div>
                    <div className="flex items-center gap-4 flex-row-reverse text-start">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.08)" }}>
                        <i className="fas fa-arrow-trend-up text-sm" style={{ color: "var(--green)" }}></i>
                      </div>
                      <div>
                        <div className="text-[11px] text-end" style={{ color: "var(--txt3)" }}>معدل العائد المتوقع</div>
                        <div className="font-dm font-bold text-lg text-end" style={{ color: "var(--green)" }}>{res.roi.toFixed(1)}x</div>
                      </div>
                    </div>
                    <div className="h-8 w-px hidden sm:block" style={{ background: "var(--border)" }}></div>
                    <div className="flex items-center gap-4 flex-row-reverse text-start hidden sm:flex">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(236,72,153,0.08)" }}>
                        <i className="fas fa-clock text-sm" style={{ color: "var(--pink)" }}></i>
                      </div>
                      <div>
                        <div className="text-[11px]" style={{ color: "var(--txt3)" }}>فترة التعلم المتوقعة</div>
                        <div className="font-dm font-bold text-lg">{LEARN[platform]}</div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Tips */}
                  <div className="ads-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,158,11,0.12)" }}>
                        <i className="fas fa-lightbulb text-[10px]" style={{ color: "var(--yellow)" }}></i>
                      </div>
                      <span className="text-sm font-bold">نصائح مخصصة لتحسين أدائك</span>
                    </div>
                    <div className="space-y-3">
                      {TIPS[platform][goal].map((t, i) => {
                        const colors = ["var(--blue)", "var(--green)", "var(--pink)"]
                        return (
                          <div key={i} className="p-[14px_18px] rounded-xl flex items-start gap-[14px]" style={{ border: "1px solid var(--border)", background: "var(--surface)", transition: "all .3s" }}>
                            <div className="font-dm font-bold text-sm mt-0.5" style={{ color: colors[i % 3] }}>{i + 1}</div>
                            <div className="text-[13px] leading-relaxed" style={{ color: "var(--txt2)" }}>{t}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Platforms Comparison Table */}
                  <div className="ads-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.1)" }}>
                        <i className="fas fa-scale-balanced text-[10px]" style={{ color: "var(--purple)" }}></i>
                      </div>
                      <span className="text-sm font-bold">كيف ستبدو نفس الميزانية على منصات أخرى</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[12px] min-w-[520px] comp-table">
                        <thead>
                          <tr style={{ color: "var(--txt3)", borderBottom: "1px solid var(--border)" }}>
                            <th className="text-start py-3 font-medium">المنصة</th>
                            <th className="text-center py-3 font-medium font-dm">النقرات</th>
                            <th className="text-center py-3 font-medium font-dm">التحويلات</th>
                            <th className="text-center py-3 font-medium font-dm">CPC</th>
                            <th className="text-center py-3 font-medium font-dm">CPA</th>
                          </tr>
                        </thead>
                        <tbody>
                          {compData.map(c => (
                            <tr key={c.id} style={{ borderBottom: "1px solid var(--border)", background: c.id === platform ? "rgba(37,99,235,0.04)" : "transparent" }}>
                              <td className="py-3.5">
                                <div className="flex items-center gap-2.5">
                                  <i className={BENCHMARKS[c.id].icon} style={{ color: BENCHMARKS[c.id].color, fontSize: "16px" }}></i>
                                  <span className="font-bold">{c.name}</span>
                                  {c.id === platform && <span style={{ fontSize: "9px", background: "var(--blue)", color: "#fff", padding: "2px 6px", borderRadius: "100px" }}>الحالي</span>}
                                </div>
                              </td>
                              <td className="text-center py-3.5 font-dm font-semibold" style={{ color: "var(--txt2)" }}>{fmtMetric(c.clicks)}</td>
                              <td className="text-center py-3.5 font-dm font-semibold" style={{ color: c.id === platform ? "var(--blue)" : "var(--txt2)" }}>{fmtMetric(c.conversions)}</td>
                              <td className="text-center py-3.5 font-dm" style={{ color: "var(--txt2)" }}>${fmtCurrency(c.cpc)}</td>
                              <td className="text-center py-3.5 font-dm" style={{ color: c.id === platform ? "var(--pink)" : "var(--txt2)" }}>${fmtCurrency(c.cpa)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* CTA */}
          <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
            <div className="ads-card p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-[0.04]" style={{ background: "var(--blue)", filter: "blur(80px)", transform: "translate(-40%,-40%)" }}></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-[0.04]" style={{ background: "var(--pink)", filter: "blur(60px)", transform: "translate(40%,40%)" }}></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="tag-logo-mark" style={{ width: 24, height: 24 }}>
                    <span style={{ width: 12, height: 3 }}></span><span style={{ width: 12, height: 3 }}></span><span style={{ width: 12, height: 3 }}></span><span style={{ width: 12, height: 3 }}></span>
                  </div>
                  <span className="font-dm font-bold text-xs tracking-tight" style={{ color: "var(--blue)" }}>TAG STUDIO</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">تحتاج خطة إعلانية متكاملة؟</h2>
                <p className="text-sm font-light leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: "var(--txt2)" }}>
                  فريقنا في Tag Studio يصمم حملات إعلانية مدفوعة تحقق أعلى عائد على الاستثمار. من الاستراتيجية إلى التنفيذ والتحسين المستمر.
                </p>
                <a href="https://www.wearetagstudio.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ background: "var(--blue)", color: "#fff", boxShadow: "0 4px 20px rgba(37,99,235,0.3)", textDecoration: "none" }}>
                  تواصل معنا
                  <i className="fas fa-arrow-left text-xs"></i>
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative z-10 px-6 py-8 text-center" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <div className="tag-logo-mark" style={{ width: 18, height: 18 }}>
                <span style={{ width: 9, height: 2, borderRadius: 1 }}></span>
                <span style={{ width: 9, height: 2, borderRadius: 1 }}></span>
                <span style={{ width: 9, height: 2, borderRadius: 1 }}></span>
                <span style={{ width: 9, height: 2, borderRadius: 1 }}></span>
              </div>
              <span className="text-xs font-medium font-dm" style={{ color: "var(--blue)" }}>TAG STUDIO</span>
            </div>
            <p className="text-[11px]" style={{ color: "var(--txt3)" }}>هذه الأرقام تقديرية مبنية على متوسطات القطاع وقد تختلف حسب السوق والمنطقة الجغرافية</p>
          </footer>

        </main>
      </div>
    </>
  )
}
