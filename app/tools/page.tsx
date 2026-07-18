"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"

const TOOLS = [
  {
    id: 'ads-budget-calculator',
    name: 'حاسبة ميزانية الإعلانات',
    desc: 'قدّر نتائج حملاتك الإعلانية بدقة. أدخل ميزانيتك واختر منصتك واحصل على توقعات واقعية للنقرات والتحويلات والتكاليف.',
    cat: 'marketing',
    badge: 'popular',
    color: '#2563EB',
    colorDim: 'rgba(37,99,235,0.06)',
    icon: 'fas fa-calculator',
    url: '/tools/ads-budget-calculator',
    features: ['5 منصات إعلانية', '8 قطاعات صناعية', '3 سيناريوهات أداء', 'نصائح مخصصة']
  },
  {
    id: 'safe-area-previewer',
    name: 'عارض المنطقة الآمنة',
    desc: 'تحقق من تصميماتك ضد مناطق الآمان لجميع أجهزة Apple. شاهد بالضبط أين تضع عناصرك التفاعلية بأمان.',
    cat: 'design',
    badge: 'new',
    color: '#EC4899',
    colorDim: 'rgba(236,72,153,0.06)',
    icon: 'fas fa-shield-halved',
    url: '/tools/safe-area-previewer',
    features: ['8 أجهزة Apple', 'وضع عمودي وأفقي', 'نسخ كود CSS', 'رفع صورة مخصصة']
  },
  {
    id: 'color-contrast-checker',
    name: 'فاحص تباين الألوان',
    desc: 'تحقق من توافق ألوانك مع معايير WCAG 2.1. تأكد أن نصوصك مقروءة للجميع بما في ذلك ذوي الاحتياجات الخاصة.',
    cat: 'design',
    badge: null,
    color: '#10B981',
    colorDim: 'rgba(16,185,129,0.06)',
    icon: 'fas fa-eye',
    url: '/tools/color-contrast-checker',
    features: ['معيار WCAG 2.1 AA/AAA', 'تباين نصوص ورسومات', 'اقتراحات للألوان البديلة', 'حفظ الألوان المفضلة']
  },
  {
    id: 'social-sizes-guide',
    name: 'دليل مقاسات السوشيال',
    desc: 'جميع مقاسات الصور والفيديوهات لكل منصات التواصل الاجتماعي في مكان واحد. محدّث باستمرار مع أحدث التغييرات.',
    cat: 'content',
    badge: 'popular',
    color: '#F59E0B',
    colorDim: 'rgba(245,158,11,0.06)',
    icon: 'fas fa-images',
    url: '#',
    features: ['Instagram, TikTok, X', 'مقاسات الإعلانات', 'قوالب جاهزة للتحميل', 'تحديثات فورية']
  },
  {
    id: 'unit-converter',
    name: 'محول الوحدات للمصممين',
    desc: 'حوّل بين pt و px و rem و em و dp بضغطة واحدة. أدوات مخصصة لسير عمل المصممين والمطوّرين.',
    cat: 'dev',
    badge: null,
    color: '#8B5CF6',
    colorDim: 'rgba(139,92,246,0.06)',
    icon: 'fas fa-ruler-combined',
    url: '#',
    features: ['pt / px / rem / em / dp', 'كثافة الشاشة (1x-3x)', 'جدول مقارنة شامل', 'نسخ فوري']
  },
  {
    id: 'shadow-generator',
    name: 'مولّد الظلال CSS',
    desc: 'أنشئ ظلال CSS معقدة ومتعددة الطبقات بواجهة مرئية مباشرة. شاهد النتيجة فوراً وانسخ الكود الجاهز.',
    cat: 'dev',
    badge: 'new',
    color: '#2563EB',
    colorDim: 'rgba(37,99,235,0.06)',
    icon: 'fas fa-clone',
    url: '#',
    features: ['ظلال متعددة الطبقات', 'معاينة فورية', 'أشكال مختلفة', 'تصدير CSS / Tailwind']
  },
  {
    id: 'typography-scaler',
    name: 'منسّق الخطوط المتناسق',
    desc: 'أنشئ نظام خطوط متناسق بناءً على نسبة ثابتة. اختر حجماً أساسياً واحصل على كل الأحجام المتدرجة.',
    cat: 'design',
    badge: 'beta',
    color: '#EC4899',
    colorDim: 'rgba(236,72,153,0.06)',
    icon: 'fas fa-text-height',
    url: '#',
    features: ['نسبة متناسقة (Modular Scale)', 'معاينة نصية حية', 'تصدير CSS Variables', 'أحجام مخصصة للاستجابة']
  },
  {
    id: 'meta-tag-generator',
    name: 'مولّد وسوم SEO',
    desc: 'أنشئ وسوم meta كاملة لصفحاتك: عنوان، وصف، Open Graph، Twitter Cards، وبيانات منظّمة JSON-LD.',
    cat: 'dev',
    badge: 'beta',
    color: '#10B981',
    colorDim: 'rgba(16,185,129,0.06)',
    icon: 'fas fa-code',
    url: '#',
    features: ['Open Graph كامل', 'Twitter Cards', 'JSON-LD Schema', 'معاينة في جوجل']
  }
]

export default function ToolsIndex() {
  const [currentCat, setCurrentCat] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Stats Animation
  const [toolsCount, setToolsCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  
  useEffect(() => {
    // Basic counter animations
    let t = 0
    const tTimer = setInterval(() => {
      t += 1
      if (t >= 8) { t = 8; clearInterval(tTimer) }
      setToolsCount(t)
    }, 50)
    
    let u = 0
    const uTimer = setInterval(() => {
      u += 300
      if (u >= 12000) { u = 12000; clearInterval(uTimer) }
      setUsersCount(u)
    }, 30)

    return () => { clearInterval(tTimer); clearInterval(uTimer); }
  }, [])

  const filteredTools = useMemo(() => {
    let res = TOOLS
    if (currentCat !== "all") {
      res = res.filter(t => t.cat === currentCat)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      res = res.filter(t =>
        t.name.includes(q) ||
        t.desc.includes(q) ||
        t.features.some(f => f.includes(q))
      )
    }
    return res
  }, [currentCat, searchQuery])

  // Subscription Logic
  const [email, setEmail] = useState("")
  const [subState, setSubState] = useState<"idle"|"loading"|"success"|"error">("idle")

  const handleSubscribe = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setSubState("error")
      return
    }
    setSubState("loading")
    setTimeout(() => {
      setSubState("success")
      setEmail("")
      setTimeout(() => setSubState("idle"), 3000)
    }, 1200)
  }

  const getPreviewDecoration = (id: string, color: string, dimColor: string) => {
    switch (id) {
      case 'ads-budget-calculator':
        return (
          <div className="absolute bottom-2 left-2 right-2 flex gap-1">
            <div style={{ height: 8, borderRadius: 2, background: dimColor, width: '40%' }}></div>
            <div style={{ height: 8, borderRadius: 2, background: dimColor, width: '25%' }}></div>
            <div style={{ height: 8, borderRadius: 2, background: dimColor, width: '20%' }}></div>
            <div style={{ height: 8, borderRadius: 2, background: dimColor, width: '15%' }}></div>
          </div>
        )
      case 'safe-area-previewer':
        return (
          <div className="absolute inset-3 border border-dashed rounded-lg" style={{ borderColor: dimColor }}>
            <div className="absolute top-0 left-0 right-0 h-3 rounded-t-lg" style={{ background: dimColor }}></div>
            <div className="absolute bottom-0 left-0 right-0 h-2.5 rounded-b-lg" style={{ background: dimColor }}></div>
          </div>
        )
      case 'color-contrast-checker':
        return (
          <div className="absolute bottom-2 left-2 right-2 flex gap-1.5">
            <div className="flex-1 h-6 rounded-md" style={{ background: '#0F172A' }}></div>
            <div className="flex-1 h-6 rounded-md" style={{ background: '#F1F5F9' }}></div>
          </div>
        )
      case 'social-sizes-guide':
        return (
          <div className="absolute bottom-2 left-2 flex gap-1">
            <div className="w-7 h-9 rounded" style={{ background: dimColor }}></div>
            <div className="w-9 h-7 rounded" style={{ background: dimColor }}></div>
            <div className="w-8 h-8 rounded" style={{ background: dimColor }}></div>
          </div>
        )
      case 'unit-converter':
        return (
          <div className="absolute bottom-2 left-2 right-2 h-5 rounded-md flex items-center px-2" style={{ background: dimColor }}>
            <span className="font-dm text-[8px]" style={{ color }}>16px → 12pt</span>
          </div>
        )
      case 'shadow-generator':
        return (
          <div className="absolute bottom-2 left-2 right-2 h-6 rounded-lg" style={{ background: dimColor, boxShadow: `0 4px 12px ${dimColor}` }}></div>
        )
      case 'typography-scaler':
        return (
          <div className="absolute bottom-2 left-2 right-2 space-y-0.5">
            <div style={{ height: 3, borderRadius: 1, background: dimColor, width: '90%', margin: '0 auto' }}></div>
            <div style={{ height: 4, borderRadius: 1, background: dimColor, width: '75%', margin: '0 auto' }}></div>
            <div style={{ height: 5, borderRadius: 1, background: dimColor, width: '60%', margin: '0 auto' }}></div>
          </div>
        )
      case 'meta-tag-generator':
        return (
          <div className="absolute bottom-2 left-2 right-2 space-y-1">
            <div style={{ height: 2, borderRadius: 1, background: dimColor, width: '80%' }}></div>
            <div style={{ height: 2, borderRadius: 1, background: dimColor, width: '60%' }}></div>
            <div style={{ height: 2, borderRadius: 1, background: dimColor, width: '70%' }}></div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=DM+Sans:wght@400;500;700&display=swap');
        .tools-root {
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

        .brand-gradient {
          background: linear-gradient(135deg, #F59E0B 0%, #10B981 30%, #2563EB 65%, #EC4899 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .brand-gradient-bg { background: linear-gradient(135deg, #F59E0B 0%, #10B981 30%, #2563EB 65%, #EC4899 100%); }

        .orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; will-change: transform; }
        .orb-1 { width: 600px; height: 600px; background: rgba(245,158,11,0.06); top: -250px; right: -200px; animation: oA 28s ease-in-out infinite; }
        .orb-2 { width: 500px; height: 500px; background: rgba(37,99,235,0.05); bottom: -150px; left: -150px; animation: oB 32s ease-in-out infinite; }
        .orb-3 { width: 350px; height: 350px; background: rgba(236,72,153,0.04); top: 40%; left: 35%; animation: oC 22s ease-in-out infinite; }
        .orb-4 { width: 280px; height: 280px; background: rgba(16,185,129,0.04); top: 70%; right: 20%; animation: oD 26s ease-in-out infinite; }
        @keyframes oA { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-100px,80px) scale(1.12)} 66%{transform:translate(50px,-40px) scale(.88)} }
        @keyframes oB { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(80px,-60px) scale(1.08)} 66%{transform:translate(-50px,40px) scale(.92)} }
        @keyframes oC { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-30%,-65%) scale(1.2)} }
        @keyframes oD { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-60px,30px) scale(1.15)} }

        .tool-card {
          position: relative; border-radius: 24px; overflow: hidden;
          background: var(--surface); border: 1px solid var(--border);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.04);
          transition: all .45s cubic-bezier(.4,0,.2,1); cursor: pointer; text-decoration: none; display: block;
        }
        .tool-card::before { content: ''; position: absolute; inset: 0; border-radius: 24px; opacity: 0; transition: opacity .45s; z-index: 0; pointer-events: none; }
        .tool-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(37,99,235,0.1); border-color: rgba(37,99,235,0.15); }
        .tool-card:hover::before { opacity: 1; }
        .tool-card:hover .tool-preview { transform: scale(1.02); }
        .tool-card:hover .tool-arrow { transform: translateX(-4px); opacity: 1; }
        .tool-card:hover .tool-glow { opacity: 1; }

        .tool-preview { transition: transform .6s cubic-bezier(.4,0,.2,1); position: relative; z-index: 1; border-radius: 14px; overflow: hidden; background: var(--surface-2); aspect-ratio: 16/10; }
        .tool-arrow { transition: all .3s; opacity: 0.5; }
        .tool-glow { position: absolute; width: 200px; height: 200px; border-radius: 50%; filter: blur(80px); opacity: 0; transition: opacity .5s; pointer-events: none; z-index: 0; }

        .cat-pill { padding: 7px 18px; border-radius: 100px; font-size: 13px; border: 1px solid var(--border); background: var(--surface); color: var(--txt2); cursor: pointer; transition: all .3s; white-space: nowrap; }
        .cat-pill:hover { color: var(--txt); border-color: var(--border-h); }
        .cat-pill.on { background: var(--blue); border-color: var(--blue); color: #fff; box-shadow: 0 2px 12px rgba(37,99,235,0.2); }

        .search-box { position: relative; max-width: 420px; width: 100%; }
        .search-box input { width: 100%; padding: 14px 48px 14px 18px; border-radius: 14px; border: 1px solid var(--border); background: var(--surface); font-family: 'Tajawal', sans-serif; font-size: 14px; color: var(--txt); outline: none; transition: all .3s; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .search-box input::placeholder { color: var(--txt3); }
        .search-box input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,0.08), 0 2px 8px rgba(0,0,0,0.04); }
        .search-box .search-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--txt3); font-size: 14px; pointer-events: none; transition: color .3s; }
        .search-box input:focus ~ .search-icon { color: var(--blue); }

        .stat-card { text-align: center; padding: 24px 16px; border-radius: 16px; background: var(--surface); border: 1px solid var(--border); transition: all .3s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.04); }

        .tag-logo { width: 32px; height: 32px; position: relative; }
        .tag-logo span { position: absolute; width: 16px; height: 4px; border-radius: 2px; top: 50%; left: 50%; }
        .tag-logo span:nth-child(1) { background: #F59E0B; transform: translate(-50%,-50%) rotate(45deg); }
        .tag-logo span:nth-child(2) { background: #10B981; transform: translate(-50%,-50%) rotate(-15deg); }
        .tag-logo span:nth-child(3) { background: #2563EB; transform: translate(-50%,-50%) rotate(-45deg); }
        .tag-logo span:nth-child(4) { background: #EC4899; transform: translate(-50%,-50%) rotate(15deg); }

        .badge-new { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 100px; font-size: 10px; font-weight: 700; background: linear-gradient(135deg, var(--green), #059669); color: #fff; letter-spacing: 0.5px; font-family: 'DM Sans', sans-serif; }
        .badge-popular { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 100px; font-size: 10px; font-weight: 700; background: linear-gradient(135deg, var(--yellow), #D97706); color: #fff; letter-spacing: 0.5px; font-family: 'DM Sans', sans-serif; }
        .badge-beta { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 100px; font-size: 10px; font-weight: 700; background: linear-gradient(135deg, var(--purple), #7C3AED); color: #fff; letter-spacing: 0.5px; font-family: 'DM Sans', sans-serif; }

        .grid-pattern { background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px); background-size: 16px 16px; }

        .cta-section { position: relative; overflow: hidden; background: linear-gradient(160deg, #0F172A 0%, #1E293B 50%, #0F172A 100%); border-radius: 28px; }
        .cta-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 400px 300px at 20% 50%, rgba(37,99,235,0.15), transparent), radial-gradient(ellipse 300px 250px at 80% 30%, rgba(236,72,153,0.1), transparent), radial-gradient(ellipse 250px 200px at 50% 80%, rgba(16,185,129,0.08), transparent); pointer-events: none; }
      `}</style>
      
      <div className="tools-root relative">
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4" style={{ background: 'rgba(250,251,255,0.82)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', borderBottom: '1px solid var(--border)' }}>
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <div className="tag-logo"><span></span><span></span><span></span><span></span></div>
            <span className="font-dm font-bold text-base tracking-tight" style={{ color: 'var(--blue)' }}>TAG STUDIO</span>
          </Link>
          <div className="flex items-center gap-3">
            <a href="https://www.wearetagstudio.com" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105" style={{ color: 'var(--txt2)', border: '1px solid var(--border)', textDecoration: 'none' }}>
              <i className="fas fa-globe text-[10px]"></i>الموقع الرسمي
            </a>
            <a href="#tools" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'var(--blue)', color: '#fff', boxShadow: '0 2px 12px rgba(37,99,235,0.25)', textDecoration: 'none' }}>
              <i className="fas fa-grid-2 text-xs"></i>
              استكشف الأدوات
            </a>
          </div>
        </nav>

        <main className="relative z-10 pt-32 pb-12 md:pt-44 md:pb-20">
          
          {/* Header */}
          <header className="px-6 text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8" style={{ background: 'var(--blue-dim)', color: 'var(--blue)', border: '1px solid rgba(37,99,235,0.12)' }}>
              <i className="fas fa-wand-magic-sparkles text-[10px]"></i>
              مجاني ومفتوح المصدر
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-6">
              <span className="brand-gradient">أدوات مجانية</span><br/>
              <span style={{ color: 'var(--txt)' }}>للمصممين والمسوّقين</span>
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: 'var(--txt2)' }}>
              مجموعة أدوات مصمّمة بعناية لتسريع سير عملك. من حساب ميزانيات الإعلانات إلى التحقق من المناطق الآمنة — كل شيء في مكان واحد.
            </p>
            <div className="flex items-center justify-center gap-3 text-xs" style={{ color: 'var(--txt3)' }}>
              <div className="brand-gradient-bg" style={{ width: 30, height: 1.5, borderRadius: 1 }}></div>
              <span className="font-dm tracking-wider">EXPLORE</span>
              <div className="brand-gradient-bg" style={{ width: 30, height: 1.5, borderRadius: 1 }}></div>
            </div>
          </header>

          {/* Stats */}
          <section className="px-4 md:px-8 max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="stat-card">
                <div className="font-dm font-bold text-2xl md:text-3xl brand-gradient">{toolsCount}</div>
                <div className="text-[11px] mt-1.5" style={{ color: 'var(--txt3)' }}>أداة متاحة</div>
              </div>
              <div className="stat-card">
                <div className="font-dm font-bold text-2xl md:text-3xl" style={{ color: 'var(--green)' }}>
                  {usersCount >= 1000 ? (usersCount/1000).toFixed(usersCount >= 12000 ? 0 : 1) + 'K' : usersCount}+
                </div>
                <div className="text-[11px] mt-1.5" style={{ color: 'var(--txt3)' }}>مستخدم شهرياً</div>
              </div>
              <div className="stat-card">
                <div className="font-dm font-bold text-2xl md:text-3xl" style={{ color: 'var(--yellow)' }}>100%</div>
                <div className="text-[11px] mt-1.5" style={{ color: 'var(--txt3)' }}>مجاني تماماً</div>
              </div>
              <div className="stat-card">
                <div className="font-dm font-bold text-2xl md:text-3xl" style={{ color: 'var(--pink)' }}>0</div>
                <div className="text-[11px] mt-1.5" style={{ color: 'var(--txt3)' }}>حاجة لتسجيل</div>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section id="tools" className="px-4 md:px-8 max-w-7xl mx-auto mb-10 scroll-mt-32">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'marketing', label: 'تسويق' },
                  { id: 'design', label: 'تصميم' },
                  { id: 'dev', label: 'تطوير' },
                  { id: 'content', label: 'محتوى' }
                ].map(c => (
                  <button 
                    key={c.id} 
                    className={`cat-pill ${currentCat === c.id ? 'on' : ''}`}
                    onClick={() => setCurrentCat(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="ابحث عن أداة..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24 min-h-[400px]">
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTools.map((tool) => (
                  <Link key={tool.id} href={tool.url} className="tool-card group">
                    <div className="tool-glow" style={{ background: tool.color, top: -50, right: -50 }}></div>
                    
                    <div className="tool-preview m-4 mb-0 grid-pattern" style={{ border: '1px solid var(--border)' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: tool.colorDim }}>
                          <i className={`${tool.icon} text-xl`} style={{ color: tool.color }}></i>
                        </div>
                      </div>
                      {getPreviewDecoration(tool.id, tool.color, tool.colorDim)}
                    </div>
                    
                    <div className="p-5 pt-4 relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {tool.badge === 'new' && <span className="badge-new">NEW</span>}
                          {tool.badge === 'popular' && <span className="badge-popular"><i className="fas fa-fire text-[8px]"></i>POPULAR</span>}
                          {tool.badge === 'beta' && <span className="badge-beta">BETA</span>}
                        </div>
                        <div className="tool-arrow">
                          <i className="fas fa-arrow-left text-xs" style={{ color: tool.color }}></i>
                        </div>
                      </div>
                      <h3 className="text-base font-bold mb-2 leading-snug" style={{ color: 'var(--txt)' }}>{tool.name}</h3>
                      <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: 'var(--txt2)' }}>{tool.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {tool.features.map((f, idx) => (
                          <span key={idx} className="text-[10px] px-2.5 py-1 rounded-md font-medium" style={{ background: 'var(--surface-2)', color: 'var(--txt3)' }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Top line on hover */}
                    <div className="absolute top-0 right-0 left-0 h-[2px] opacity-0 transition-opacity duration-400 group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${tool.color}, transparent)` }}></div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
                  <i className="fas fa-search text-xl" style={{ color: 'var(--txt3)' }}></i>
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--txt)' }}>لا توجد نتائج</p>
                <p className="text-xs" style={{ color: 'var(--txt3)' }}>جرّب كلمات بحث مختلفة أو اختر فئة أخرى</p>
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section className="px-4 md:px-8 max-w-5xl mx-auto pb-24">
            <div className="cta-section p-10 md:p-16 text-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="tag-logo" style={{ width: 28, height: 28 }}>
                    <span style={{ width: 14, height: 3.5, borderRadius: 1.75 }}></span>
                    <span style={{ width: 14, height: 3.5, borderRadius: 1.75 }}></span>
                    <span style={{ width: 14, height: 3.5, borderRadius: 1.75 }}></span>
                    <span style={{ width: 14, height: 3.5, borderRadius: 1.75 }}></span>
                  </div>
                  <span className="font-dm font-bold text-xs tracking-tight" style={{ color: 'var(--blue-light)' }}>TAG STUDIO</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black mb-4 text-white leading-tight">عندنا أدوات كتير تانية<br/>جاري تطويرها</h2>
                <p className="text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  أشترك في القائمة البريدية عشان تكون أول واحد يجرب الأدوات الجديدة مباشرة عند إطلاقها.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="بريدك الإلكتروني" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                    className="w-full sm:flex-1 px-5 py-3.5 rounded-xl text-sm font-tajawal outline-none transition-all duration-300" 
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                  <button 
                    onClick={handleSubscribe}
                    disabled={subState === "loading"}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2" 
                    style={{ background: subState === "success" ? 'var(--green)' : 'var(--blue)', color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    {subState === "loading" ? (
                      <><i className="fas fa-spinner fa-spin text-xs"></i> جاري الإرسال...</>
                    ) : subState === "success" ? (
                      <><i className="fas fa-check text-xs"></i> تم الاشتراك</>
                    ) : (
                      <>أشترك الآن <i className="fas fa-arrow-left text-xs"></i></>
                    )}
                  </button>
                </div>
                {subState === "error" && <div className="mt-3 text-xs font-medium" style={{ color: 'var(--pink)' }}>يرجى إدخال بريد إلكتروني صحيح</div>}
                {subState === "success" && <div className="mt-3 text-xs font-medium" style={{ color: 'var(--green)' }}>تم الاشتراك بنجاح! شكراً لك.</div>}
              </div>
            </div>
          </section>

        </main>

        <footer className="relative z-10 px-6 py-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <div className="tag-logo" style={{ width: 18, height: 18 }}>
              <span style={{ width: 9, height: 2, borderRadius: 1 }}></span>
              <span style={{ width: 9, height: 2, borderRadius: 1 }}></span>
              <span style={{ width: 9, height: 2, borderRadius: 1 }}></span>
              <span style={{ width: 9, height: 2, borderRadius: 1 }}></span>
            </div>
            <span className="text-xs font-medium font-dm" style={{ color: 'var(--blue)' }}>TAG STUDIO</span>
          </div>
          <p className="text-[11px]" style={{ color: 'var(--txt3)' }}>أدوات مجانية مفتوحة المصدر من فريق Tag Studio — صُممت بحب للمجتمع العربي</p>
        </footer>
      </div>
    </>
  )
}
