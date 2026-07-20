"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
}

export default function DatesPackagingLandingPage() {
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: "إزاي أثق إن التصميم هيفرق في مبيعاتي؟",
      a: "+45 عميل شافوا الفرق فعلياً. عميلنا تمور المدينة رفع سعر البوكس 35% وزادت مبيعاته 100%. العميل بيشتري بالعين الأول."
    },
    {
      q: "لو التصميم ما عجبنيش؟",
      a: "بنقدملك 2-3 اتجاهات مختلفة وتختار اللي يعجبك. تعديلات مرنة لحد ما توصل للنتيجة اللي بتعبر عن علامتك التجارية."
    },
    {
      q: "كم بياخد وقت التنفيذ؟",
      a: "من 3 لـ 5 أيام عمل بنسلمك التصاميم المبدئية، وبعد الموافقة بنجهز كل ملفات الطباعة فوراً."
    },
    {
      q: "هل بتسلموني ملفات جاهزة للطباعة؟",
      a: "أكيد! بنسلمك ملفات PDF و AI وكل الصيغ المطلوبة جاهزة للمطبعة بالألوان (CMYK) وبالمقاسات الدقيقة 100%."
    }
  ]

  return (
    <div className="bg-[#FAFAFA] text-[#1D1D1F] overflow-x-hidden font-tajawal relative" dir="rtl">
      {/* Hide global header/footer so it stays a focused landing page */}
      <style dangerouslySetInnerHTML={{ __html: `
        header, footer, #floating-contact { display: none !important; }
        
        .preloader { position: fixed; inset: 0; z-index: 9999; background: #FAFAFA; display: flex; align-items: center; justify-content: center; transition: opacity 0.6s ease, visibility 0.6s ease; }
        .preloader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .preloader-date { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #00C853, #1565C0); animation: preloaderPulse 1s ease-in-out infinite; }
        @keyframes preloaderPulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,200,83,0.4); } 50% { transform: scale(1.15); box-shadow: 0 0 0 20px rgba(0,200,83,0); } }

        .scene { perspective: 1200px; }
        .tilt-card { transform-style: preserve-3d; transition: transform 0.4s ease; }
        .tilt-card:hover { transform: rotateY(-5deg) rotateX(5deg) translateZ(20px); }

        .float-3d { transform-style: preserve-3d; animation: float3d 8s ease-in-out infinite; }
        @keyframes float3d { 0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); } 25% { transform: translateY(-15px) rotateX(5deg) rotateY(10deg); } 50% { transform: translateY(-8px) rotateX(-3deg) rotateY(-5deg); } 75% { transform: translateY(-20px) rotateX(8deg) rotateY(-8deg); } }
        .float-3d-delay { transform-style: preserve-3d; animation: float3d 7s ease-in-out infinite 2s; }
        .float-3d-delay2 { transform-style: preserve-3d; animation: float3d 9s ease-in-out infinite 4s; }

        .cube-wrap { perspective: 800px; width: 80px; height: 80px; }
        .cube { width: 100%; height: 100%; transform-style: preserve-3d; animation: rotateCube 12s linear infinite; }
        .cube-face { position: absolute; width: 80px; height: 80px; border: 2px solid rgba(0,200,83,0.3); background: rgba(0,200,83,0.05); border-radius: 12px; backdrop-filter: blur(4px); }
        .cube-face:nth-child(1) { transform: rotateY(0deg) translateZ(40px); }
        .cube-face:nth-child(2) { transform: rotateY(90deg) translateZ(40px); }
        .cube-face:nth-child(3) { transform: rotateY(180deg) translateZ(40px); }
        .cube-face:nth-child(4) { transform: rotateY(270deg) translateZ(40px); }
        .cube-face:nth-child(5) { transform: rotateX(90deg) translateZ(40px); }
        .cube-face:nth-child(6) { transform: rotateX(-90deg) translateZ(40px); }
        @keyframes rotateCube { from { transform: rotateX(-20deg) rotateY(0deg); } to { transform: rotateX(-20deg) rotateY(360deg); } }

        .ring-3d { width: 120px; height: 120px; transform-style: preserve-3d; animation: rotateRing 10s linear infinite; }
        .ring-segment { position: absolute; width: 12px; height: 12px; background: #00C853; border-radius: 50%; left: 50%; top: 50%; }
        @keyframes rotateRing { from { transform: rotateX(70deg) rotateZ(0deg); } to { transform: rotateX(70deg) rotateZ(360deg); } }

        .glass-light-strong { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(24px); border: 1px solid rgba(0, 0, 0, 0.08); }

        .gradient-text { background: linear-gradient(135deg, #1565C0 0%, #00C853 50%, #FFD600 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-pattern { background-image: radial-gradient(circle at 1px 1px, rgba(0,200,83,0.08) 1px, transparent 0); background-size: 40px 40px; }

        .service-card { transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; right: 0; width: 100%; height: 4px; background: linear-gradient(to left, #00C853, #1565C0); transform: scaleX(0); transform-origin: right; transition: transform 0.4s ease; }
        .service-card:hover::before { transform: scaleX(1); }
        .service-card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(0,200,83,0.15); }

        .portfolio-card { transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); overflow: hidden; }
        .portfolio-card:hover { transform: translateY(-6px); box-shadow: 0 30px 60px -15px rgba(0,0,0,0.15); }
        .portfolio-card:hover img { transform: scale(1.08); }
        .portfolio-card:hover .portfolio-overlay { opacity: 1; }
        .portfolio-card:hover .portfolio-tag { transform: translateY(0); opacity: 1; }

        .marquee-track { display: flex; gap: 4rem; animation: marquee 35s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .sphere-3d { width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(0,200,83,0.3), rgba(0,200,83,0.05) 60%, transparent); box-shadow: inset -20px -20px 40px rgba(0,200,83,0.1), 0 20px 60px rgba(0,200,83,0.1); transform-style: preserve-3d; animation: sphereFloat 6s ease-in-out infinite; }
        @keyframes sphereFloat { 0%, 100% { transform: translateZ(0) rotateX(0); } 50% { transform: translateZ(30px) rotateX(10deg); } }

        .pyramid-3d { width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 80px solid rgba(0,200,83,0.15); transform-style: preserve-3d; animation: pyramidSpin 15s linear infinite; filter: drop-shadow(0 10px 20px rgba(0,200,83,0.1)); }
        @keyframes pyramidSpin { from { transform: rotateY(0deg) rotateX(15deg); } to { transform: rotateY(360deg) rotateX(15deg); } }
      `}} />

      {/* Preloader */}
      <div className={`preloader ${!loading ? 'hidden' : ''}`}>
        <div className="text-center">
          <div className="preloader-date mx-auto mb-4"></div>
          <p className="text-sm text-[#6E6E73] font-medium">جاري التحميل...</p>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#00C853]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full bg-[#FFD600]/10 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-[#1565C0]/5 blur-[100px]"></div>
      </div>

      {/* URGENCY BAR */}
      <div className="bg-[#1D1D1F] text-white text-center py-2.5 px-4 text-xs font-medium relative z-[60]">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF1744] ml-2 align-middle animate-pulse"></span>
        باقي ٣ مقاعد فقط هذا الشهر —
        <a href="#cta" className="text-white underline underline-offset-[3px] font-bold mr-1">احجز مكانك الآن</a>
      </div>

      {/* Navigation */}
      <nav className="fixed top-[38px] left-0 right-0 z-50 pt-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-light-strong rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <a href="https://www.wearetagstudio.com/" className="flex items-center gap-3">
              <Image
                className="h-9 w-auto object-contain"
                src="/images/logo.png"
                alt="شعار تاج ستوديو"
                width={120}
                height={36}
                priority
              />
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#work" className="text-xs font-semibold text-[#6E6E73] hover:text-[#00C853] transition-colors">أعمالنا</a>
              <a href="#services" className="text-xs font-semibold text-[#6E6E73] hover:text-[#00C853] transition-colors">خدماتنا</a>
              <a href="#process" className="text-xs font-semibold text-[#6E6E73] hover:text-[#00C853] transition-colors">النتائج</a>
              <a href="#testimonials" className="text-xs font-semibold text-[#6E6E73] hover:text-[#00C853] transition-colors">آراء العملاء</a>
            </div>
            <a href="#cta" className="bg-gradient-to-r from-[#00C853] to-[#1565C0] text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-[#00C853]/20 hover:scale-105 transition-transform">
              احجز استشارة مجانية
            </a>
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="min-h-screen flex items-center pt-32 pb-16 px-6 relative hero-pattern">
        {/* 3D Decorative Elements */}
        <div className="absolute top-32 left-10 opacity-60 hidden lg:block">
          <div className="cube-wrap">
            <div className="cube">
              {[...Array(6)].map((_, i) => <div key={i} className="cube-face"></div>)}
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 right-16 opacity-40 hidden lg:block">
          <div className="scene">
            <div className="pyramid-3d float-3d-delay"></div>
          </div>
        </div>
        <div className="absolute top-1/2 right-[8%] opacity-30 hidden xl:block">
          <div class="sphere-3d float-3d-delay2"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-[#00C853]/10 border border-[#00C853]/20 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00C853]">متخصصون في تصميم التمور وتغليفها</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6">
                <span className="block text-[#1D1D1F]">بوكس التمور الواحد اللي</span>
                <span className="block mt-2 gradient-text">رفع مبيعات عملائنا 40%</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-base md:text-lg text-[#6E6E73] max-w-xl mb-10 leading-relaxed font-medium">
                مش مجرد تصميم — بنحول البوكس بتاعك لأداة بيع تجذب العين وترفع السعر وتضاعف المبيعات. من الفكرة إلى الإنتاج النهائي والطباعة.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start gap-4 mb-14">
                <a href="#cta" className="bg-gradient-to-r from-[#00C853] to-[#1565C0] text-white px-8 py-4 rounded-2xl text-sm font-bold tracking-wide flex items-center gap-2 group shadow-lg shadow-[#00C853]/20 hover:scale-105 transition-transform">
                  احصل على تصميم مجاني
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="rotate-180 group-hover:-translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </a>
                <a href="#work" className="bg-white border-2 border-[#1565C0]/20 hover:border-[#1565C0] text-[#1565C0] px-8 py-4 rounded-2xl text-sm font-semibold tracking-wide flex items-center gap-2 hover:bg-[#1565C0]/5 transition-all">
                  شاهد أعمالنا
                </a>
              </motion.div>

              {/* Mini Stats */}
              <motion.div variants={fadeInUp} className="flex items-center gap-8">
                <div>
                  <div className="text-2xl font-black text-[#1D1D1F]">+45</div>
                  <div className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-bold">صاحب مصنع</div>
                </div>
                <div className="w-px h-10 bg-[#E5E5EA]"></div>
                <div>
                  <div className="text-2xl font-black text-[#1D1D1F]">+200</div>
                  <div className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-bold">بوكس تمور</div>
                </div>
                <div className="w-px h-10 bg-[#E5E5EA]"></div>
                <div>
                  <div className="text-2xl font-black text-[#1D1D1F]">+40%</div>
                  <div className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-bold">زيادة مبيعات</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Side */}
            <motion.div initial="hidden" animate="visible" variants={scaleUp} className="relative scene">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#00C853]/10 h-[400px] md:h-[500px]">
                  <Image src="/images/print-design-2.avif" alt="تغليف تمور فاخر" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-black/5 float-3d">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#00C853]/10 flex items-center justify-center">
                      <svg width="20" height="20" fill="none" stroke="#00C853" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#1D1D1F]">+100% مبيعات</div>
                      <div className="text-[10px] text-[#6E6E73]">تمور المدينة</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 md:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-black/5 float-3d-delay">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#FFD600]/20 flex items-center justify-center">
                      <svg width="20" height="20" fill="none" stroke="#B8860B" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#1D1D1F]">+35% زيادة سعر</div>
                      <div className="text-[10px] text-[#6E6E73]">جودة وتصميم فاخر</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== TRUSTED BY ==================== */}
      <section className="py-12 border-y border-black/5 overflow-hidden bg-white/50">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6E6E73]/50">يثقون بنا مصانع تمور في جميع أنحاء المنطقة</span>
        </div>
        <div className="relative overflow-hidden" dir="ltr">
          <div className="marquee-track">
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-xl font-black text-[#E5E5EA] whitespace-nowrap">المدينة المنورة</span>
                <span className="text-[#E5E5EA]">✦</span>
                <span className="text-xl font-black text-[#E5E5EA] whitespace-nowrap">الرياض</span>
                <span className="text-[#E5E5EA]">✦</span>
                <span className="text-xl font-black text-[#E5E5EA] whitespace-nowrap">جدة</span>
                <span className="text-[#E5E5EA]">✦</span>
                <span className="text-xl font-black text-[#E5E5EA] whitespace-nowrap">القصيم</span>
                <span className="text-[#E5E5EA]">✦</span>
                <span className="text-xl font-black text-[#E5E5EA] whitespace-nowrap">دبي</span>
                <span className="text-[#E5E5EA]">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROBLEM ==================== */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF1744] mb-4 block">المشكلة الحقيقية</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              تمور ممتازة بتغليف <span className="text-[#6E6E73]">عادي؟</span><br />
              <span className="text-[#6E6E73]">هذا يعني خسارة أموال.</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <svg width="24" height="24" fill="none" stroke="#FF1744" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>, title: "التغليف العادي يخسرك فلوس", desc: "العميل يقارن بوكسك بالمنافس على الرف. التصميم الضعيف = سعر أقل، وخسارة للتنافسية." },
              { icon: <svg width="24" height="24" fill="none" stroke="#FFD600" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>, title: "الموزعين بيرفضوا المنتج", desc: "الموزع يأخذ المنتج الذي يبيع نفسه. البوكس السيء معناه رفض لمنتجك حتى لو كانت جودته عالية." },
              { icon: <svg width="24" height="24" fill="none" stroke="#1565C0" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>, title: "ضياع الهوية", desc: "أغلب المصانع تستخدم قوالب جاهزة شبه متطابقة. عميلك لا يفرّق بين منتجك والمنافس." }
            ].map((point, i) => (
              <motion.div key={i} variants={fadeInUp} className="scene">
                <div className="tilt-card bg-white rounded-3xl p-8 shadow-sm border border-black/5 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] border border-black/5 flex items-center justify-center mb-6">
                    {point.icon}
                  </div>
                  <h3 className="text-lg font-black mb-3">{point.title}</h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== PORTFOLIO ==================== */}
      <section id="work" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1565C0] mb-4 block">أعمالنا</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">تصاميم غيّرت واقع المصانع</h2>
            <p className="text-[#6E6E73] max-w-xl mx-auto font-medium">كل مشروع هو نتيجة دراسة عميقة للسوق المستهدف والمنافسين</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-2 gap-8">
            {[
              { img: "/images/print-design-2.avif", tag: "هوية بصرية + تغليف", tagColor: "text-[#00C853]", title: "مزرعة النخيل الذهبية", desc: "إعادة تصميم كاملة رفعت المبيعات 65% في أول 6 أشهر" },
              { img: "/images/print-design-3.avif", tag: "تغليف هدايا", tagColor: "text-[#FFD600]", title: "تمور المدينة", desc: "خط هدايا خاص بالمناسبات مع صندوق جلدي فاخر" },
              { img: "/images/print-design-4.avif", tag: "إعادة بناء علامة", tagColor: "text-[#1565C0]", title: "واحة الخليج", desc: "تحويل من علامة محلية إلى علامة تصديرية" },
              { img: "/images/agricultural-development-association.avif", tag: "تصميم بريميوم", tagColor: "text-[#FF1744]", title: "تمور السكري الفاخرة", desc: "تغليف ذهبي مع شهادة جودة مطبوعة ومحفورة" }
            ].map((work, i) => (
              <motion.div key={i} variants={fadeInUp} className="portfolio-card rounded-3xl overflow-hidden bg-[#FAFAFA] cursor-pointer scene border border-black/5">
                <div className="relative h-[320px] md:h-[400px] overflow-hidden">
                  <Image src={work.img} alt={work.title} fill className="object-cover transition-transform duration-700" />
                  <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="portfolio-tag text-[10px] uppercase tracking-widest text-white mb-2 transform translate-y-4 opacity-0 transition-all duration-500 font-bold">{work.tag}</span>
                    <h3 className="text-2xl font-black text-white mb-2">{work.title}</h3>
                    <p className="text-sm text-gray-300">{work.desc}</p>
                  </div>
                </div>
                <div className="p-6">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${work.tagColor}`}>{work.tag}</span>
                  <h3 className="text-lg font-black mt-1">{work.title}</h3>
                  <p className="text-sm text-[#6E6E73] mt-2 font-medium">{work.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="py-24 px-6 relative bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00C853] mb-4 block">خدماتنا</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">كل ما يحتاجه مصنعك</h2>
            <p className="text-[#6E6E73] max-w-xl mx-auto font-medium">من الشعار إلى الرف، نغطي كل مرحلة بجودة احترافية</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <svg width="24" height="24" fill="none" stroke="#00C853" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>, title: "تصميم الهوية البصرية", desc: "شعار وألوان وخطوط ونظام بصري متكامل يعكس جودة تمورك." },
              { icon: <svg width="24" height="24" fill="none" stroke="#1565C0" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, title: "تصميم التغليف", desc: "عبوات وعلب تمور بجميع الأحجام: كرتون وبلاستيك ومعدن وخشب." },
              { icon: <svg width="24" height="24" fill="none" stroke="#FFD600" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>, title: "تصميم الملصقات", desc: "ملصقات احترافية تتضمن معلومات غذائية وباركود وعلامات الجودة." },
              { icon: <svg width="24" height="24" fill="none" stroke="#FF1744" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, title: "تصوير المنتج", desc: "صور احترافية عالية الجودة للتمور والتغليف للاستخدام الرقمي والمطبوع." },
              { icon: <svg width="24" height="24" fill="none" stroke="#00C853" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>, title: "تصميم السوشيال ميديا", desc: "محتوى بصري يُظهر جودة منتجك ويجذب الموزعين والعملاء." },
              { icon: <svg width="24" height="24" fill="none" stroke="#1565C0" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>, title: "إدارة الطباعة", desc: "نتابع عملية الطباعة مع أفضل المطبعات ونضمن مطابقة الألوان." }
            ].map((srv, i) => (
              <motion.div key={i} variants={fadeInUp} className="scene">
                <div className="tilt-card service-card bg-white rounded-3xl p-8 shadow-sm border border-black/5 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] border border-black/5 flex items-center justify-center mb-6">
                    {srv.icon}
                  </div>
                  <h3 className="text-lg font-black mb-3">{srv.title}</h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed mb-5">{srv.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== BEFORE & AFTER ==================== */}
      <section id="process" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00C853] mb-4 block">نتائج حقيقية</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">الفرق بالأرقام</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FF1744]"></span>
                <span className="text-[12px] font-bold text-[#6E6E73]">قبل التصميم</span>
              </div>
              <div className="rounded-3xl overflow-hidden bg-[#FAFAFA] shadow-sm border border-black/5 relative h-[300px] w-full mb-4">
                <Image src="/images/print-design-7.avif" alt="قبل" fill className="object-cover opacity-50 grayscale-[50%]" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-black/5">
                  <div className="text-2xl font-black text-[#FF1744] font-sans">15</div>
                  <div className="text-[10px] text-[#6E6E73] font-bold mt-1">سعر البيع (ريال)</div>
                </div>
                <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-black/5">
                  <div className="text-2xl font-black text-[#FF1744] font-sans">20</div>
                  <div className="text-[10px] text-[#6E6E73] font-bold mt-1">بوكس مباع شهرياً</div>
                </div>
                <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-black/5">
                  <div className="text-2xl font-black text-[#FF1744] font-sans">0</div>
                  <div className="text-[10px] text-[#6E6E73] font-bold mt-1">موزع جديد</div>
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse"></span>
                <span className="text-[12px] font-bold text-[#1D1D1F]">بعد تصميم TAG Studio</span>
              </div>
              <div className="rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,200,83,0.15)] border border-[#00C853]/20 relative h-[300px] w-full mb-4 group">
                <Image src="/images/print-design-2.avif" alt="بعد" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 text-white text-[11px] font-bold py-2 px-4 rounded-full bg-gradient-to-r from-[#00C853] to-[#1565C0] shadow-lg">+35% زيادة سعر</div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#00C853]/5 rounded-2xl p-4 border border-[#00C853]/10">
                  <div className="text-2xl font-black text-[#00C853] font-sans">20</div>
                  <div className="text-[10px] text-[#6E6E73] font-bold mt-1">سعر البيع (ريال)</div>
                </div>
                <div className="bg-[#00C853]/5 rounded-2xl p-4 border border-[#00C853]/10">
                  <div className="text-2xl font-black text-[#00C853] font-sans">40</div>
                  <div className="text-[10px] text-[#6E6E73] font-bold mt-1">بوكس مباع شهرياً</div>
                </div>
                <div className="bg-[#1565C0]/5 rounded-2xl p-4 border border-[#1565C0]/10">
                  <div className="text-2xl font-black text-[#1565C0] font-sans">3</div>
                  <div className="text-[10px] text-[#6E6E73] font-bold mt-1">موزعين جدد</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="testimonials" className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1565C0] mb-4 block">آراء عملائنا</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">أصحاب المصانع <span className="gradient-text">بيحكوا عننا</span></h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {[
              { text: "البوكس الجديد رفع السعر 35% والموزعين هم اللي اتصلوا. استثمرت في التصميم ورجع أضعافه.", name: "عبدالله المحمدي", role: "مصنع تمور المدينة", initial: "ع.م", bg: "bg-gradient-to-br from-[#FFD600] to-[#00C853]" },
              { text: "فهم الفريق صناعة التمور ده فرق كبير. جابولي 3 عقود تصدير في 3 شهور بسبب شكل البوكس الفاخر.", name: "محمد العتيبي", role: "وادي التمور", initial: "م.ع", bg: "bg-gradient-to-br from-[#1565C0] to-[#0D47A1]" },
              { text: "كنت بعتمد على وسطاء. دلوقتي الموزعين بييجولي. التصميم الصح بيبيع نفسه فعلاً.", name: "فهد الشمري", role: "نخيل الذهب", initial: "ف.ش", bg: "bg-gradient-to-br from-[#FF1744] to-[#C51162]" },
            ].map((test, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 hover:-translate-y-2 transition-transform duration-300">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" fill="#FFD600" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-[#1D1D1F] mb-6 font-medium" dangerouslySetInnerHTML={{ __html: `"${test.text.replace(/(\d+%.*?|3 عقود.*?|الموزعين بييجولي.*?)/g, '<strong class="text-[#00C853]">$1</strong>')}"` }} />
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-10 h-10 rounded-xl ${test.bg} flex items-center justify-center text-white text-xs font-bold shadow-md`}>{test.initial}</div>
                  <div>
                    <div className="font-black text-sm">{test.name}</div>
                    <div className="text-[#6E6E73] text-[11px] font-semibold">{test.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[700px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">أسئلة شائعة</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="bg-[#FAFAFA] rounded-3xl shadow-sm border border-black/5 overflow-hidden">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-black/5 last:border-0">
                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between p-6 text-right bg-transparent border-none cursor-pointer focus:outline-none hover:bg-black/[0.02] transition-colors">
                  <span className="font-bold text-sm text-[#1D1D1F]">{faq.q}</span>
                  <span className={`text-[#6E6E73] text-xl shrink-0 ml-3 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : 'rotate-0'}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <p className="text-[#6E6E73] text-sm leading-relaxed font-medium">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section id="cta" className="py-24 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="max-w-[800px] mx-auto bg-[#1D1D1F] rounded-[40px] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#FFD600]/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#00C853]/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-white text-3xl md:text-5xl font-black mb-4 tracking-tight">جاهز تخلي بوكساتك تبيع نفسها؟</h2>
            <p className="text-[#6E6E73] text-sm md:text-base mb-10 max-w-[500px] mx-auto leading-relaxed font-medium">
              احجز استشارتك المجانية دلوقتي، خلينا نحلل شكل منتجك الحالي ونقولك إزاي ممكن نضاعف مبيعاتك بتغيير التغليف.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <a href="https://wa.me/201009215131" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-[#00C853] to-[#1565C0] text-white flex items-center justify-center gap-3 py-5 px-10 rounded-2xl text-base font-black w-full max-w-[360px] transition-transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,200,83,0.25)] group">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="group-hover:animate-bounce"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                تواصل معنا على واتساب
              </a>
              <span className="text-[#6E6E73] text-[11px] font-medium">استشارة مجانية بالكامل. لا يوجد التزام.</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-black/5 text-center bg-[#FAFAFA]">
        <div className="text-[#6E6E73] text-[11px] font-medium leading-[1.8]">
          جميع الحقوق محفوظة لـ TAG Studio &copy; {new Date().getFullYear()}<br/>
          تصميم الهوية البصرية للعلامات التجارية الفاخرة
        </div>
      </footer>
    </div>
  )
}
