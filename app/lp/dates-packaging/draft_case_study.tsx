import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function CaseStudyAlAmeen() {
  return (
    <div className="bg-[#fafbfc] text-gray-900 overflow-x-hidden font-tajawal" dir="rtl">
      <style dangerouslySetInnerHTML={{ __html: `
        header, footer, #floating-contact { display: none !important; }
        .gradient-text{background:linear-gradient(135deg,#00C853,#1565C0,#FFD600);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .scene{perspective:1200px}
        .tilt-card{transform-style:preserve-3d;transition:transform .4s ease}
        .tilt-card:hover { transform: rotateY(-5deg) rotateX(5deg) translateZ(20px); }
        .float-3d{transform-style:preserve-3d;animation:float3d 8s ease-in-out infinite}
        @keyframes float3d{0%,100%{transform:translateY(0) rotateX(0) rotateY(0)}25%{transform:translateY(-12px) rotateX(4deg) rotateY(8deg)}50%{transform:translateY(-6px) rotateX(-2deg) rotateY(-4deg)}75%{transform:translateY(-16px) rotateX(6deg) rotateY(-6deg)}}
        .float-3d-d{animation:float3d 7s ease-in-out infinite 2s;transform-style:preserve-3d}
        .cube-wrap{perspective:800px;width:60px;height:60px}
        .cube{width:100%;height:100%;transform-style:preserve-3d;animation:rc 14s linear infinite}
        .cf{position:absolute;width:60px;height:60px;border:1.5px solid rgba(0,200,83,.25);background:rgba(0,200,83,.04);border-radius:10px}
        .cf:nth-child(1){transform:rotateY(0) translateZ(30px)}.cf:nth-child(2){transform:rotateY(90deg) translateZ(30px)}.cf:nth-child(3){transform:rotateY(180deg) translateZ(30px)}.cf:nth-child(4){transform:rotateY(270deg) translateZ(30px)}.cf:nth-child(5){transform:rotateX(90deg) translateZ(30px)}.cf:nth-child(6){transform:rotateX(-90deg) translateZ(30px)}
        @keyframes rc{from{transform:rotateX(-15deg) rotateY(0)}to{transform:rotateX(-15deg) rotateY(360deg)}}
        .sphere-3d{width:160px;height:160px;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(0,200,83,.25),rgba(0,200,83,.04) 60%,transparent);box-shadow:inset -15px -15px 30px rgba(0,200,83,.08),0 15px 40px rgba(0,200,83,.08);transform-style:preserve-3d;animation:sf 6s ease-in-out infinite}
        @keyframes sf{0%,100%{transform:translateZ(0)}50%{transform:translateZ(25px) rotateX(8deg)}}
        .service-card{transition:all .4s cubic-bezier(.23,1,.32,1);position:relative;overflow:hidden}
        .service-card::before{content:'';position:absolute;top:0;right:0;width:100%;height:4px;background:linear-gradient(to left,#00C853,#1565C0);transform:scaleX(0);transform-origin:right;transition:transform .4s ease}
        .service-card:hover::before{transform:scaleX(1)}
        .service-card:hover{transform:translateY(-6px);box-shadow:0 20px 40px -12px rgba(0,200,83,.12)}
        .btn-primary{background:linear-gradient(135deg,#009624,#00C853);color:white;transition:all .3s ease;box-shadow:0 4px 15px -3px rgba(0,200,83,.4)}
        .btn-primary:hover{box-shadow:0 8px 25px -3px rgba(0,200,83,.5);transform:translateY(-2px)}
        .timeline-line{position:absolute;right:23px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#00C853,#00C853 30%,#e5e7eb 30%,#e5e7eb)}
        .ba-card{transition:all .5s cubic-bezier(.23,1,.32,1)}
        .ba-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px -10px rgba(0,0,0,.1)}
        .ba-card img{transition:transform .6s ease}
        .ba-card:hover img{transform:scale(1.03)}
      `}} />

      {/* BG Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#00C853]/10 blur-[120px]"></div>
          <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full bg-[#FFD600]/10 blur-[120px]"></div>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
              <div id="navbar" className="bg-white/85 backdrop-blur-xl border border-gray-100 rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300">
                  <a href="#" className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00C853] to-[#009624] flex items-center justify-center shadow-lg shadow-[#00C853]/20">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </div>
                      <span className="font-extrabold text-sm tracking-tight">تمور باك</span>
                  </a>
                  <div className="hidden md:flex items-center gap-8">
                      <a href="#overview" className="text-xs font-semibold text-gray-500 hover:text-[#00C853] transition-colors">نظرة عامة</a>
                      <a href="#before" className="text-xs font-semibold text-gray-500 hover:text-[#00C853] transition-colors">قبل التعاون</a>
                      <a href="#after" className="text-xs font-semibold text-gray-500 hover:text-[#00C853] transition-colors">بعد التعاون</a>
                      <a href="#results" className="text-xs font-semibold text-gray-500 hover:text-[#00C853] transition-colors">النتائج</a>
                  </div>
                  <a href="#contact" className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide">ابدأ مشروعك</a>
              </div>
          </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center pt-28 pb-16 px-6 relative" style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(0,200,83,.06) 1px,transparent 0)", backgroundSize: "40px 40px" }}>
          <div className="absolute top-32 left-10 opacity-50 hidden lg:block"><div className="cube-wrap"><div className="cube"><div className="cf"></div><div className="cf"></div><div className="cf"></div><div className="cf"></div><div className="cf"></div><div className="cf"></div></div></div></div>
          <div className="absolute bottom-32 right-16 opacity-30 hidden lg:block"><div className="sphere-3d float-3d-d" style={{width:"120px",height:"120px"}}></div></div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <div className="inline-flex items-center gap-2 bg-[#FF1744]/10 border border-[#FF1744]/20 rounded-full px-4 py-2 mb-6">
                          <svg width="14" height="14" fill="none" stroke="#FF1744" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF1744]">دراسة حالة حقيقية</span>
                      </div>

                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6">
                          <span className="block">مصنع الأمين</span>
                          <span className="block mt-2 gradient-text">للتمور</span>
                      </h1>

                      <p className="text-base md:text-lg text-gray-500 max-w-xl mb-8 leading-relaxed font-light">
                          كيف حوّلنا علامة تجارية تعتمد على تغليف تقليدي إلى واحدة من أكثر علامات التمور تميّزاً في السوق السعودي — بزيادة مبيعات تجاوزت <strong className="text-gray-700">72%</strong> في 8 أشهر.
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mb-10">
                          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                              <svg width="16" height="16" fill="none" stroke="#00C853" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                              <span className="text-xs font-semibold text-gray-600">المدينة المنورة</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                              <svg width="16" height="16" fill="none" stroke="#00C853" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                              <span className="text-xs font-semibold text-gray-600">يناير — أغسطس 2024</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                              <svg width="16" height="16" fill="none" stroke="#00C853" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                              <span className="text-xs font-semibold text-gray-600">8 منتجات</span>
                          </div>
                      </div>

                      <div className="flex items-center gap-6">
                          <a href="#before" className="btn-primary px-7 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 group">
                              شاهد التحول
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="transition-transform group-hover:translate-y-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                          </a>
                      </div>
                  </div>

                  {/* Hero Visual */}
                  <div className="scene">
                      <div className="tilt-card relative">
                          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#00C853]/10 border border-gray-100">
                              <Image src="/images/print-design-2.avif" alt="مصنع الأمين" width={700} height={750} className="w-full h-[480px] md:h-[560px] object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-8">
                                  <div className="flex items-center gap-3">
                                      <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                          <span className="text-2xl font-extrabold gradient-text">أم</span>
                                      </div>
                                      <div>
                                          <div className="text-white font-extrabold text-lg">مصنع الأمين للتمور</div>
                                          <div className="text-white/70 text-xs">المدينة المنورة، المملكة العربية السعودية</div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-xl float-3d" style={{ transformStyle: "preserve-3d" }}>
                              <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[#00C853]/10 flex items-center justify-center">
                                      <svg width="16" height="16" fill="none" stroke="#00C853" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                                  </div>
                                  <div>
                                      <div className="text-[10px] font-extrabold text-gray-900">+72% مبيعات</div>
                                      <div className="text-[9px] text-gray-400">خلال 8 أشهر</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* MORE SECTIONS OMITTED FOR BREVITY UNTIL WE GET THE FULL CODE */}
      
    </div>
  )
}
