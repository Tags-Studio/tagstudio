"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

export default function AlAmeenCaseStudy() {
    const [activeLine, setActiveLine] = useState("daily");

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).lucide) {
            (window as any).lucide.createIcons();
        }

        const ro = new IntersectionObserver(e => { e.forEach(en => { if(en.isIntersecting){ en.target.classList.add("vis"); ro.unobserve(en.target); } }); }, {rootMargin:"0px 0px -50px 0px",threshold:.1});
        document.querySelectorAll(".sr,.sr-l,.sr-r,.sr-s").forEach(el => ro.observe(el));

        function animC(c:any,t:any,d:any){ const s=performance.now(); (function u(n){ const p=Math.min((n-s)/d,1), e=1-Math.pow(1-p,3); c.textContent=Math.round(t*e); if(p<1) requestAnimationFrame(u); else c.textContent=t; })(s); }
        const co = new IntersectionObserver(e => { e.forEach(en => { if(en.isIntersecting){ animC(en.target,parseInt((en.target as any).dataset.target),2000); co.unobserve(en.target); } }); }, {threshold:.5});
        document.querySelectorAll(".counter-w").forEach(el => co.observe(el));

        document.querySelectorAll(".scene").forEach(sc => {
            const card = sc.querySelector(".tilt-card") as HTMLElement;
            if(!card) return;
            sc.addEventListener("mousemove", (e:any) => {
                const r = sc.getBoundingClientRect(), x = e.clientX-r.left, y = e.clientY-r.top;
                const rx = ((y-r.height/2)/r.height/2)*-10, ry = ((x-r.width/2)/r.width/2)*10;
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
            });
            sc.addEventListener("mouseleave", () => { card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"; });
        });

        const compSlider = document.getElementById("compSlider");
        const compBefore = document.getElementById("compBefore");
        const compBeforeImg = document.getElementById("compBeforeImg");
        const compHandle = document.getElementById("compHandle");
        let isDragging = false;

        if(compSlider && compBefore && compBeforeImg && compHandle) {
            function updateSlider(x:any) {
                if(!compSlider) return;
                const rect = compSlider.getBoundingClientRect();
                let pos = (rect.right - x) / rect.width * 100;
                pos = Math.max(5, Math.min(95, pos));
                compBefore!.style.width = pos + "%";
                compBeforeImg!.style.width = (rect.width / (pos/100)) + "px";
                compHandle!.style.right = `calc(${pos}% - 2px)`;
            }

            compSlider.addEventListener("mousedown", (e:any) => { isDragging = true; updateSlider(e.clientX); });
            window.addEventListener("mousemove", (e:any) => { if(isDragging) updateSlider(e.clientX); });
            window.addEventListener("mouseup", () => { isDragging = false; });
            compSlider.addEventListener("touchstart", (e:any) => { isDragging = true; updateSlider(e.touches[0].clientX); }, {passive:true});
            window.addEventListener("touchmove", (e:any) => { if(isDragging) updateSlider(e.touches[0].clientX); }, {passive:true});
            window.addEventListener("touchend", () => { isDragging = false; });

            function initSlider() {
                if(!compSlider) return;
                const rect = compSlider.getBoundingClientRect();
                compBeforeImg!.style.width = (rect.width / 0.5) + "px";
            }
            initSlider();
            window.addEventListener("resize", initSlider);
        }

        const navHandler = () => {
            const navbar = document.getElementById("navbar");
            if(navbar) navbar.style.boxShadow = window.scrollY > 50 ? "0 4px 30px rgba(0,0,0,.08)" : "none";
        };
        window.addEventListener("scroll", navHandler);

        document.querySelectorAll("a[href^='#']").forEach(a => {
            a.addEventListener("click", function(this:any, e) {
                if(this.getAttribute("href") === "#") return;
                e.preventDefault();
                const t = document.querySelector(this.getAttribute("href"));
                if(t) t.scrollIntoView({behavior:"smooth",block:"start"});
            });
        });

        return () => {
            window.removeEventListener("scroll", navHandler);
        };
    }, [activeLine]); // added activeLine dependency so tilt re-attaches if needed on render

    return (
        <div className="bg-[#fafbfc] text-gray-900 overflow-x-hidden font-sans" dir="rtl">
            <Script src="https://unpkg.com/lucide@latest" strategy="beforeInteractive" />
            <Script id="lucide-init" strategy="lazyOnload">
                {`if(window.lucide) window.lucide.createIcons();`}
            </Script>

            <style dangerouslySetInnerHTML={{__html: `
        *{font-family:'Noto Kufi Arabic','Inter',sans-serif}
        .gradient-text{background:linear-gradient(135deg,#004D40,#00C853,#009624);-webkit-background-clip:text;-webkit-text-fill-color:transparent}

        /* 3D */
        .scene{perspective:1200px}
        .tilt-card{transform-style:preserve-3d;transition:transform .4s ease}
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

        /* Comparison Slider */
        .comparison-container{position:relative;overflow:hidden;cursor:col-resize;user-select:none}
        .comparison-before,.comparison-after{position:absolute;inset:0}
        .comparison-after img{width:100%;height:100%;object-fit:cover}
        .comparison-before{z-index:2;overflow:hidden}
        .comparison-before img{width:100%;height:100%;object-fit:cover;position:absolute;top:0;right:0;height:100%}
        .comparison-slider{position:absolute;top:0;bottom:0;width:4px;background:white;z-index:3;cursor:col-resize;box-shadow:0 0 20px rgba(0,0,0,.3)}
        .comparison-slider::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;background:white;border-radius:50%;box-shadow:0 4px 20px rgba(0,0,0,.2)}
        .comparison-slider::after{content:'‹ ›';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:14px;font-weight:800;color:#374151;letter-spacing:4px;white-space:nowrap}
        .comparison-label{position:absolute;bottom:16px;z-index:4;padding:6px 16px;border-radius:9999px;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}

        /* Scroll reveal */
        .sr{opacity:0;transform:translateY(35px);transition:all .8s cubic-bezier(.23,1,.32,1)}
        .sr.vis{opacity:1;transform:translateY(0)}
        .sr-l{opacity:0;transform:translateX(-35px);transition:all .8s cubic-bezier(.23,1,.32,1)}
        .sr-l.vis{opacity:1;transform:translateX(0)}
        .sr-r{opacity:0;transform:translateX(35px);transition:all .8s cubic-bezier(.23,1,.32,1)}
        .sr-r.vis{opacity:1;transform:translateX(0)}
        .sr-s{opacity:0;transform:scale(.88);transition:all .8s cubic-bezier(.23,1,.32,1)}
        .sr-s.vis{opacity:1;transform:scale(1)}

        /* Cards */
        .service-card{transition:all .4s cubic-bezier(.23,1,.32,1);position:relative;overflow:hidden}
        .service-card::before{content:'';position:absolute;top:0;right:0;width:100%;height:4px;background:linear-gradient(to left,#00C853,#69F0AE);transform:scaleX(0);transform-origin:right;transition:transform .4s ease}
        .service-card:hover::before{transform:scaleX(1)}
        .service-card:hover{transform:translateY(-6px);box-shadow:0 20px 40px -12px rgba(0,200,83,.12)}

        .btn-primary{background:linear-gradient(135deg,#009624,#00C853);color:white;transition:all .3s ease;box-shadow:0 4px 15px -3px rgba(0,200,83,.4)}
        .btn-primary:hover{box-shadow:0 8px 25px -3px rgba(0,200,83,.5);transform:translateY(-2px)}
        .btn-dark{background:#0a0a0a;color:white;transition:all .3s ease}
        .btn-dark:hover{background:#1a1a1a;transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,0,0,.2)}

        /* Before/After Card */
        .ba-card{transition:all .5s cubic-bezier(.23,1,.32,1)}
        .ba-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px -10px rgba(0,0,0,.1)}
        .ba-card img{transition:transform .6s ease}
        .ba-card:hover img{transform:scale(1.03)}

        /* Timeline */
        .timeline-line{position:absolute;right:23px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#00C853,#00C853 30%,#e5e7eb 30%,#e5e7eb)}

        /* Stat card glow */
        .stat-glow{box-shadow:0 0 0 0 rgba(0,200,83,0);transition:box-shadow .4s ease}
        .stat-glow:hover{box-shadow:0 0 40px rgba(0,200,83,.12)}

        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#f9fafb}::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#9ca3af}
    
header, footer, #floating-contact { display: none !important; }
`}} />

            

{/* BG Decorations */}
<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-brand-100/50 blur-[120px]"></div>
    <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full bg-amber-100/30 blur-[120px]"></div>
</div>

{/* Nav */}
<nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6">
    <div className="max-w-7xl mx-auto">
        <div id="navbar" className="bg-white/85 backdrop-blur-xl border border-gray-100 rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300">
            <a href="#" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
                    <i data-lucide="date" className="w-4.5 h-4.5 text-white"></i>
                </div>
                <span className="font-extrabold text-sm tracking-tight">تمور باك</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
                <a href="#overview" className="text-xs font-semibold text-gray-500 hover:text-brand-600 transition-colors">نظرة عامة</a>
                <a href="#before" className="text-xs font-semibold text-gray-500 hover:text-brand-600 transition-colors">قبل التعاون</a>
                <a href="#after" className="text-xs font-semibold text-gray-500 hover:text-brand-600 transition-colors">بعد التعاون</a>
                <a href="#results" className="text-xs font-semibold text-gray-500 hover:text-brand-600 transition-colors">النتائج</a>
            </div>
            <a href="#contact" className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide">ابدأ مشروعك</a>
        </div>
    </div>
</nav>

{/* ==================== HERO ==================== */}
<section className="min-h-screen flex items-center pt-28 pb-16 px-6 relative" style={{backgroundImage: "radial-gradient(circle at 1px 1px,rgba(16,185,129,.06) 1px,transparent 0)", backgroundSize: "40px 40px"}}>
    {/* 3D Deco */}
    <div className="absolute top-32 left-10 opacity-50 hidden lg:block"><div className="cube-wrap"><div className="cube"><div className="cf"></div><div className="cf"></div><div className="cf"></div><div className="cf"></div><div className="cf"></div><div className="cf"></div></div></div></div>
    <div className="absolute bottom-32 right-16 opacity-30 hidden lg:block"><div className="sphere-3d float-3d-d" style={{width: "120px", height: "120px"}}></div></div>

    <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <div className="sr inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-2 mb-6">
                    <i data-lucide="file-case-study" className="w-3.5 h-3.5 text-red-500"></i>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">دراسة حالة حقيقية</span>
                </div>

                <h1 className="sr text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6" style={{transitionDelay: ".1s"}}>
                    <span className="block">مصنع الأمين</span>
                    <span className="block mt-2 gradient-text">للتمور</span>
                </h1>

                <p className="sr text-base md:text-lg text-gray-500 max-w-xl mb-8 leading-relaxed font-light" style={{transitionDelay: ".2s"}}>
                    كيف حوّلنا علامة تجارية تعتمد على تغليف تقليدي إلى واحدة من أكثر علامات التمور تميّزاً في السوق السعودي — بزيادة مبيعات تجاوزت <strong className="text-gray-700">72%</strong> في 8 أشهر.
                </p>

                <div className="sr flex flex-wrap items-center gap-4 mb-10" style={{transitionDelay: ".3s"}}>
                    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                        <i data-lucide="map-pin" className="w-4 h-4 text-brand-500"></i>
                        <span className="text-xs font-semibold text-gray-600">المدينة المنورة</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                        <i data-lucide="calendar" className="w-4 h-4 text-brand-500"></i>
                        <span className="text-xs font-semibold text-gray-600">يناير — أغسطس 2024</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                        <i data-lucide="package" className="w-4 h-4 text-brand-500"></i>
                        <span className="text-xs font-semibold text-gray-600">8 منتجات</span>
                    </div>
                </div>

                <div className="sr flex items-center gap-6" style={{transitionDelay: ".4s"}}>
                    <a href="#before" className="btn-primary px-7 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 group">
                        شاهد التحول
                        <i data-lucide="arrow-down" className="w-4 h-4 transition-transform group-hover:translate-y-0.5"></i>
                    </a>
                    <a href="https://www.instagram.com/alameen_factory/" target="_blank" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-600 transition-colors">
                        <i data-lucide="instagram" className="w-4 h-4"></i>
                        <span>@alameen_factory</span>
                    </a>
                </div>
            </div>

            {/* Hero Visual */}
            <div className="sr-s scene" style={{transitionDelay: ".2s"}}>
                <div className="tilt-card relative">
                    <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/10 border border-gray-100">
                        <img src="https://picsum.photos/seed/alameen-hero-dates-factory/700/750.jpg" alt="مصنع الأمين" className="w-full h-[480px] md:h-[560px] object-cover" />
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

                    {/* Floating badge */}
                    <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-xl float-3d" style={{transformStyle: "preserve-3d"}}>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                                <i data-lucide="trophy" className="w-4 h-4 text-brand-600"></i>
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

{/* ==================== OVERVIEW ==================== */}
<section id="overview" className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <span className="sr text-[11px] font-bold uppercase tracking-widest text-brand-600 mb-4 block">نظرة عامة</span>
            <h2 className="sr text-3xl md:text-4xl font-extrabold tracking-tight" style={{transitionDelay: ".1s"}}>العميل والتحدي</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="sr-l">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                    <h3 className="text-xl font-extrabold mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center"><i data-lucide="building-2" className="w-5 h-5 text-brand-600"></i></div>
                        عن العميل
                    </h3>
                    <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                        <p>مصنع الأمين للتمور من المصانع المتوسطة الحجم في المدينة المنورة، يُنتج حوالي <strong className="text-gray-800">15 طن سنوياً</strong> من أجود أنواع التمور 包括 السكري، المجضول، والبرحي.</p>
                        <p>يبيع عبر قنوات متعددة: <strong className="text-gray-800">المعرض الرئيسي، موزعين محليين، ومنصات تجارة إلكترونية</strong>. لكن رغم جودة المنتج، كان يواجه صعوبة في التميّز عن عشرات المصانع المنافسة.</p>
                        <p>التقى صاحب المصنع مع فريقنا في معرض التمور الدولي بالرياض أواخر 2023، وقدّم لنا عيّنات من منتجاته مع تغليفه الحالي وطلب رأينا.</p>
                    </div>
                </div>
            </div>

            <div className="sr-r" style={{transitionDelay: ".1s"}}>
                <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100/50">
                    <h3 className="text-xl font-extrabold mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><i data-lucide="alert-triangle" className="w-5 h-5 text-red-500"></i></div>
                        التحديات التي واجهوها
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-red-50">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-[10px] font-extrabold text-red-600">1</span></div>
                            <div><div className="text-sm font-bold text-gray-800 mb-1">تغليف لا يُوصل رسالة الجودة</div><p className="text-xs text-gray-500">تمور سكري فاخرة بعلب تبدو كأي منتج سوبرماركت عادي</p></div>
                        </div>
                        <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-red-50">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-[10px] font-extrabold text-red-600">2</span></div>
                            <div><div className="text-sm font-bold text-gray-800 mb-1">غياب الهوية البصرية</div><p className="text-xs text-gray-500">لا يوجد شعار واضح أو نظام ألوان موحد بين المنتجات المختلفة</p></div>
                        </div>
                        <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-red-50">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-[10px] font-extrabold text-red-600">3</span></div>
                            <div><div className="text-sm font-bold text-gray-800 mb-1">صعوبة في فتح قنوات بيع جديدة</div><p className="text-xs text-gray-500">الموزعون الكبار يرفضون التوزيع لأن التغليف لا يناسب الرفوف الفاخرة</p></div>
                        </div>
                        <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-red-50">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-[10px] font-extrabold text-red-600">4</span></div>
                            <div><div className="text-sm font-bold text-gray-800 mb-1">أسعار أقل من القيمة الحقيقية</div><p className="text-xs text-gray-500">يُجبر على بيع الكيلو بـ 45 ريال بينما المنافس بتصميم أفضل يبيعه بـ 85 ريال</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/* ==================== BEFORE ==================== */}
<section id="before" className="py-24 px-6 relative overflow-hidden">
    <div className="absolute top-10 right-10 opacity-10 hidden lg:block"><div className="sphere-3d float-3d" style={{width: "100px", height: "100px"}}></div></div>

    <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <span className="sr text-[11px] font-bold uppercase tracking-widest text-red-500 mb-4 block">قبل التعاون</span>
            <h2 className="sr text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{transitionDelay: ".1s"}}>الواقع الذي كانوا يعيشونه</h2>
            <p className="sr text-gray-500 max-w-2xl mx-auto" style={{transitionDelay: ".15s"}}>هذه هي التصاميم والتغليف الذي كان مصنع الأمين يستخدمه قبل التعاون معنا. لاحظ الفجوة بين جودة المنتج وجودة العرض.</p>
        </div>

        {/* Before Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="sr scene">
                <div className="tilt-card ba-card bg-white rounded-3xl overflow-hidden border border-gray-100">
                    <div className="relative">
                        <img src="https://picsum.photos/seed/old-dates-pack-plain/500/400.jpg" alt="تغليف قديم 1" className="w-full h-[240px] object-cover" />
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">قبل</div>
                    </div>
                    <div className="p-5">
                        <h4 className="font-bold text-sm mb-1">علبة السكري — 500 جرام</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">كرتون عادي بدون أي تمييز بصري. لا يوجد شعار واضح أو لون مميز.</p>
                    </div>
                </div>
            </div>
            <div className="sr scene" style={{transitionDelay: ".05s"}}>
                <div className="tilt-card ba-card bg-white rounded-3xl overflow-hidden border border-gray-100">
                    <div className="relative">
                        <img src="https://picsum.photos/seed/old-dates-bag-basic/500/400.jpg" alt="تغليف قديم 2" className="w-full h-[240px] object-cover" />
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">قبل</div>
                    </div>
                    <div className="p-5">
                        <h4 className="font-bold text-sm mb-1">كيس المجضول — 1 كجم</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">كيس شفاف بملصق صغير غير مقروء. لا معلومات غذائية واضحة.</p>
                    </div>
                </div>
            </div>
            <div className="sr scene" style={{transitionDelay: ".1s"}}>
                <div className="tilt-card ba-card bg-white rounded-3xl overflow-hidden border border-gray-100">
                    <div className="relative">
                        <img src="https://picsum.photos/seed/old-dates-gift-bad/500/400.jpg" alt="تغليف قديم 3" className="w-full h-[240px] object-cover" />
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">قبل</div>
                    </div>
                    <div className="p-5">
                        <h4 className="font-bold text-sm mb-1">صندوق الهدايا</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">صندوق بلاستيك شفاف مع شريط لاصق. لا يصلح كهدية فاخرة أبداً.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Problems Analysis */}
        <div className="sr bg-white rounded-3xl p-8 md:p-10 border border-gray-100">
            <h3 className="text-lg font-extrabold mb-6 flex items-center gap-3">
                <i data-lucide="scan-eye" className="w-5 h-5 text-red-500"></i>
                تحليلنا للتغليف القديم
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3"><i data-lucide="eye-off" className="w-6 h-6 text-red-400"></i></div>
                    <div className="text-sm font-bold mb-1">لا تميّز بصري</div>
                    <p className="text-[11px] text-gray-400">العميل يمر عليه كأي منتج آخر</p>
                </div>
                <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3"><i data-lucide="ban" className="w-6 h-6 text-red-400"></i></div>
                    <div className="text-sm font-bold mb-1">لا هوية تجارية</div>
                    <p className="text-[11px] text-gray-400">شعار غير واضح وألوان عشوائية</p>
                </div>
                <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3"><i data-lucide="coins" className="w-6 h-6 text-red-400"></i></div>
                    <div className="text-sm font-bold mb-1">تسعير ضعيف</div>
                    <p className="text-[11px] text-gray-400">التغليف لا يبرر سعراً أعلى</p>
                </div>
                <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3"><i data-lucide="store" className="w-6 h-6 text-red-400"></i></div>
                    <div className="text-sm font-bold mb-1">مرفوض من الفنادق</div>
                    <p className="text-[11px] text-gray-400">لا يصلح كضيافة فاخرة</p>
                </div>
            </div>
        </div>
    </div>
</section>

{/* ==================== OUR APPROACH ==================== */}
<section className="py-24 px-6 bg-white relative overflow-hidden">
    <div className="absolute bottom-10 left-10 opacity-10 hidden lg:block"><div className="cube-wrap"><div className="cube" style={{animationDuration: "20s"}}><div className="cf"></div><div className="cf"></div><div className="cf"></div><div className="cf"></div><div className="cf"></div><div className="cf"></div></div></div></div>

    <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <span className="sr text-[11px] font-bold uppercase tracking-widest text-brand-600 mb-4 block">منهجيتنا</span>
            <h2 className="sr text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{transitionDelay: ".1s"}}>كيف عملنا مع مصنع الأمين</h2>
            <p className="sr text-gray-500 max-w-2xl mx-auto" style={{transitionDelay: ".15s"}}>لم نبدأ بالتصميم مباشرة. بدأنا بالفهم العميق للعميل والسوق.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
            {/* Timeline */}
            <div className="relative">
                <div className="timeline-line"></div>

                <div className="sr space-y-10">
                    <div className="flex gap-6 relative">
                        <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center flex-shrink-0 z-10 text-sm font-extrabold shadow-lg shadow-brand-500/20">1</div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-1">
                            <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">الأسبوع 1</div>
                            <h4 className="font-extrabold mb-2">زيارة المصنع والدراسة الميدانية</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">زرنا المصنع في المدينة المنورة، شفنا خطوط الإنتاج، تذوقنا المنتجات، وتحدثنا مع فريق العمل عن رؤيتهم وقيمتهم.</p>
                        </div>
                    </div>
                    <div className="sr flex gap-6 relative" style={{transitionDelay: ".05s"}}>
                        <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center flex-shrink-0 z-10 text-sm font-extrabold shadow-lg shadow-brand-500/20">2</div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-1">
                            <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">الأسبوع 2</div>
                            <h4 className="font-extrabold mb-2">تحليل السوق والمنافسين</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">حللنا 23 علامة تجارية منافسة في السوق السعودي والإماراتي. حددنا الفجوات والفرص. اكتشفنا أن لا أحد يستهدف شريحة «الهدايا المؤسسية».</p>
                        </div>
                    </div>
                    <div className="sr flex gap-6 relative" style={{transitionDelay: ".1s"}}>
                        <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center flex-shrink-0 z-10 text-sm font-extrabold shadow-lg shadow-brand-500/20">3</div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-1">
                            <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">الأسبوع 3-4</div>
                            <h4 className="font-extrabold mb-2">تطوير الهوية البصرية</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">صممنا شعاراً يجمع بين النخلة والهلال في شكل هندسي حديث. اخترنا لونين رئيسيين: الذهبي (يرمز للجودة) والأخضر الداكن (يرمز للنخيل).</p>
                        </div>
                    </div>
                    <div className="sr flex gap-6 relative" style={{transitionDelay: ".15s"}}>
                        <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center flex-shrink-0 z-10 text-sm font-extrabold shadow-lg shadow-brand-500/20">4</div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-1">
                            <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">الأسبوع 5-8</div>
                            <h4 className="font-extrabold mb-2">تصميم 8 عبوات + إنتاج</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">صممنا 8 عبوات مختلفة: 3 للاستهلاك اليومي، 3 للهدايا، و2 للتصدير. كل عبوة تحكي قصة مختلفة عن نفس المنتج.</p>
                        </div>
                    </div>
                    <div className="sr flex gap-6 relative" style={{transitionDelay: ".2s"}}>
                        <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center flex-shrink-0 z-10 text-sm font-extrabold shadow-lg shadow-brand-500/20">5</div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-1">
                            <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">مستمر</div>
                            <h4 className="font-extrabold mb-2">الدعم والمتابعة</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">نصمم محتوى السوشيال ميديا شهرياً وندعمهم في أي تعديلات أو إضافات على التغليف.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Side */}
            <div className="sr-r space-y-6" style={{transitionDelay: ".1s"}}>
                <div className="scene">
                    <div className="tilt-card rounded-3xl overflow-hidden shadow-lg">
                        <img src="https://picsum.photos/seed/design-studio-meeting-dates/700/450.jpg" alt="جلسة تصميم" className="w-full h-[300px] object-cover" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="scene">
                        <div className="tilt-card rounded-2xl overflow-hidden shadow-md">
                            <img src="https://picsum.photos/seed/sketches-brand-identity/400/300.jpg" alt="مسودات" className="w-full h-[180px] object-cover" />
                        </div>
                    </div>
                    <div className="scene">
                        <div className="tilt-card rounded-2xl overflow-hidden shadow-md">
                            <img src="https://picsum.photos/seed/color-palette-gold-green/400/300.jpg" alt="ألوان" className="w-full h-[180px] object-cover" />
                        </div>
                    </div>
                </div>
                <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                    <h4 className="font-extrabold text-sm mb-3 flex items-center gap-2"><i data-lucide="lightbulb" className="w-4 h-4 text-brand-600"></i>اكتشاف رئيسي</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">اكتشفنا أن 68% من مشتري التمور الفاخرة في المدينة المنورة هم من الزوار والمعتمرين يبحثون عن هدايا. لا أحد يستهدفهم بتغليف مخصص — وكان هذا فرصتنا الذهبية.</p>
                </div>
            </div>
        </div>
    </div>
</section>

{/* ==================== AFTER ==================== */}
<section id="after" className="py-24 px-6 relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <span className="sr text-[11px] font-bold uppercase tracking-widest text-brand-600 mb-4 block">بعد التعاون</span>
            <h2 className="sr text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{transitionDelay: ".1s"}}>النتيجة النهائية</h2>
            <p className="sr text-gray-500 max-w-2xl mx-auto" style={{transitionDelay: ".15s"}}>تصاميم تحكي قصة الجودة وتُبرز هوية مصنع الأمين بكل فخر.</p>
        </div>

        {/* After Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="sr scene">
                <div className="tilt-card ba-card bg-white rounded-3xl overflow-hidden border border-gray-100">
                    <div className="relative">
                        <img src="https://picsum.photos/seed/new-luxury-sukari-box/500/450.jpg" alt="تصميم جديد 1" className="w-full h-[260px] object-cover" />
                        <div className="absolute top-3 right-3 bg-brand-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">بعد</div>
                    </div>
                    <div className="p-5">
                        <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">خط الفخامة</div>
                        <h4 className="font-bold text-sm mb-1">علبة السكري الملكية</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">كرتون مقوّى بلمسة ذهبية مع نافذة شفافة تُظهر جودة التمور.</p>
                    </div>
                </div>
            </div>
            <div className="sr scene" style={{transitionDelay: ".05s"}}>
                <div className="tilt-card ba-card bg-white rounded-3xl overflow-hidden border border-gray-100">
                    <div className="relative">
                        <img src="https://picsum.photos/seed/new-modern-majdool-pack/500/450.jpg" alt="تصميم جديد 2" className="w-full h-[260px] object-cover" />
                        <div className="absolute top-3 right-3 bg-brand-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">بعد</div>
                    </div>
                    <div className="p-5">
                        <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">خط الاستهلاك اليومي</div>
                        <h4 className="font-bold text-sm mb-1">كيس المجضول العصري</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">كيس معدني مع طباعة أوفست كاملة ومعلومات غذائية واضحة.</p>
                    </div>
                </div>
            </div>
            <div className="sr scene" style={{transitionDelay: ".1s"}}>
                <div className="tilt-card ba-card bg-white rounded-3xl overflow-hidden border border-gray-100">
                    <div className="relative">
                        <img src="https://picsum.photos/seed/new-gift-box-premium-dates/500/450.jpg" alt="تصميم جديد 3" className="w-full h-[260px] object-cover" />
                        <div className="absolute top-3 right-3 bg-brand-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">بعد</div>
                    </div>
                    <div className="p-5">
                        <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">خط الهدايا</div>
                        <h4 className="font-bold text-sm mb-1">صندوق الهدايا المؤسسي</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">صندوق صلب بغطاء مغطى بالقماش مع شريط ذهبي وبطاقة مخصصة.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Comparison Slider */}
        <div className="sr-s max-w-4xl mx-auto">
            <h3 className="text-xl font-extrabold text-center mb-8">قارن بنفسك — اسحب المؤشر</h3>
            <div className="comparison-container rounded-3xl shadow-xl shadow-black/5 border border-gray-100" style={{height: "450px"}} id="compSlider">
                <div className="comparison-after">
                    <img src="https://picsum.photos/seed/after-dates-pack-hero-final/1000/450.jpg" alt="بعد" />
                    <div className="comparison-label left-4 bg-brand-500 text-white">بعد التصميم</div>
                </div>
                <div className="comparison-before" id="compBefore" style={{width: "50%"}}>
                    <img src="https://picsum.photos/seed/before-dates-pack-old-final/1000/450.jpg" alt="قبل" style={{width: "calc(1000 / 0.5 * 1px)", maxWidth: "none"}} id="compBeforeImg" />
                    <div className="comparison-label right-4 bg-red-500 text-white">قبل التصميم</div>
                </div>
                <div className="comparison-slider" id="compHandle" style={{right: "calc(50% - 2px)"}}></div>
            </div>
        </div>
    </div>
</section>

{/* ==================== IDENTITY SHOWCASE ==================== */}
<section className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <span className="sr text-[11px] font-bold uppercase tracking-widest text-brand-600 mb-4 block">الهوية البصرية</span>
            <h2 className="sr text-3xl md:text-4xl font-extrabold tracking-tight" style={{transitionDelay: ".1s"}}>عناصر الهوية الجديدة</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="sr-l scene">
                <div className="tilt-card bg-gray-50 rounded-3xl p-10 border border-gray-100 flex flex-col items-center justify-center min-h-[360px]">
                    <div className="w-28 h-28 rounded-3xl bg-white shadow-lg flex items-center justify-center mb-6">
                        <span className="text-5xl font-extrabold gradient-text">أمين</span>
                    </div>
                    <h4 className="font-extrabold text-lg mb-2">الشعار الجديد</h4>
                    <p className="text-xs text-gray-400 text-center max-w-xs">تصميم هندسي يجمع بين النخلة والهلال بخط عصري يعكس الأصالة والحداثة معاً</p>
                </div>
            </div>

            <div className="sr-r scene" style={{transitionDelay: ".1s"}}>
                <div className="tilt-card bg-gray-50 rounded-3xl p-10 border border-gray-100">
                    <h4 className="font-extrabold text-lg mb-6 text-center">لوحة الألوان</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <div className="w-full h-20 rounded-2xl mb-2 shadow-inner" style={{background: "#064e3b"}}></div>
                            <div className="text-[10px] font-bold text-gray-600">أخضر نخيلي</div>
                            <div className="text-[10px] text-gray-400 font-mono">#064E3B</div>
                        </div>
                        <div className="text-center">
                            <div className="w-full h-20 rounded-2xl mb-2 shadow-inner" style={{background: "#D4A843"}}></div>
                            <div className="text-[10px] font-bold text-gray-600">ذهبي فاخر</div>
                            <div className="text-[10px] text-gray-400 font-mono">#D4A843</div>
                        </div>
                        <div className="text-center">
                            <div className="w-full h-20 rounded-2xl mb-2 shadow-inner" style={{background: "#FAF8F5"}}></div>
                            <div className="text-[10px] font-bold text-gray-600">كريمي دافئ</div>
                            <div className="text-[10px] text-gray-400 font-mono">#FAF8F5</div>
                        </div>
                        <div className="text-center">
                            <div className="w-full h-20 rounded-2xl mb-2 shadow-inner" style={{background: "#1A1A1A"}}></div>
                            <div className="text-[10px] font-bold text-gray-600">أسود داكن</div>
                            <div className="text-[10px] text-gray-400 font-mono">#1A1A1A</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/* ==================== RESULTS ==================== */}
<section id="results" className="py-24 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-l from-brand-700 via-brand-600 to-brand-800"></div>
    <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 1px 1px,white 1px,transparent 0)", backgroundSize: "30px 30px"}}></div>
    <div className="absolute top-4 left-[10%] opacity-15 hidden lg:block"><div className="cube-wrap" style={{width: "40px", height: "40px"}}><div className="cube" style={{animationDuration: "18s"}}><div className="cf" style={{width: "40px", height: "40px", transform: "rotateY(0) translateZ(20px)", borderColor: "rgba(255,255,255,.3)", background: "rgba(255,255,255,.05)"}}></div><div className="cf" style={{width: "40px", height: "40px", transform: "rotateY(90deg) translateZ(20px)", borderColor: "rgba(255,255,255,.3)", background: "rgba(255,255,255,.05)"}}></div><div className="cf" style={{width: "40px", height: "40px", transform: "rotateY(180deg) translateZ(20px)", borderColor: "rgba(255,255,255,.3)", background: "rgba(255,255,255,.05)"}}></div><div className="cf" style={{width: "40px", height: "40px", transform: "rotateY(270deg) translateZ(20px)", borderColor: "rgba(255,255,255,.3)", background: "rgba(255,255,255,.05)"}}></div><div className="cf" style={{width: "40px", height: "40px", transform: "rotateX(90deg) translateZ(20px)", borderColor: "rgba(255,255,255,.3)", background: "rgba(255,255,255,.05)"}}></div><div className="cf" style={{width: "40px", height: "40px", transform: "rotateX(-90deg) translateZ(20px)", borderColor: "rgba(255,255,255,.3)", background: "rgba(255,255,255,.05)"}}></div></div></div></div>

    <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <span className="sr text-[11px] font-bold uppercase tracking-widest text-brand-200 mb-4 block">النتائج بالأرقام</span>
            <h2 className="sr text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={{transitionDelay: ".1s"}}>8 أشهر غيّرت كل شيء</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="sr text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="text-4xl md:text-5xl font-extrabold text-white stat-number"><span className="counter-w" data-target="72">0</span>%</div>
                    <div className="text-xs text-white/50 mt-2 uppercase tracking-wider font-semibold">زيادة المبيعات</div>
                </div>
            </div>
            <div className="sr text-center" style={{transitionDelay: ".1s"}}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="text-4xl md:text-5xl font-extrabold text-white stat-number"><span className="counter-w" data-target="89">0</span>%</div>
                    <div className="text-xs text-white/50 mt-2 uppercase tracking-wider font-semibold">رضا العملاء</div>
                </div>
            </div>
            <div className="sr text-center" style={{transitionDelay: ".2s"}}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="text-4xl md:text-5xl font-extrabold text-white stat-number">x<span className="counter-w" data-target="2">0</span>.5</div>
                    <div className="text-xs text-white/50 mt-2 uppercase tracking-wider font-semibold">متوسط سعر البيع</div>
                </div>
            </div>
            <div className="sr text-center" style={{transitionDelay: ".3s"}}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="text-4xl md:text-5xl font-extrabold text-white stat-number"><span className="counter-w" data-target="5">0</span></div>
                    <div className="text-xs text-white/50 mt-2 uppercase tracking-wider font-semibold">قنوات بيع جديدة</div>
                </div>
            </div>
        </div>

        {/* Detailed Results */}
        <div className="grid md:grid-cols-3 gap-6">
            <div className="sr bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4"><i data-lucide="trending-up" className="w-5 h-5 text-brand-200"></i></div>
                <h4 className="font-extrabold text-white mb-2">ارتفاع سعر الكيلو</h4>
                <p className="text-sm text-white/60 leading-relaxed">من 45 ريال إلى 85 ريال للسكري الفاخر — بدون أي تغيير في جودة المنتج نفسه. التغيير كان في التغليف فقط.</p>
            </div>
            <div className="sr bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10" style={{transitionDelay: ".1s"}}>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4"><i data-lucide="hotel" className="w-5 h-5 text-brand-200"></i></div>
                <h4 className="font-extrabold text-white mb-2">دخول فنادق 5 نجوم</h4>
                <p className="text-sm text-white/60 leading-relaxed">بعد التغيير، وافق 3 فنادق 5 نجوم في المدينة المنورة على وضع تمور الأمين كضيافة للغرف.</p>
            </div>
            <div className="sr bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10" style={{transitionDelay: ".2s"}}>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4"><i data-lucide="plane" className="w-5 h-5 text-brand-200"></i></div>
                <h4 className="font-extrabold text-white mb-2">طلبات تصدير</h4>
                <p className="text-sm text-white/60 leading-relaxed">تلقّى المصنع أول طلبات تصدير إلى الإمارات والكويت بفضل التغليف الاحترافي الذي يعكس ثقة.</p>
            </div>
        </div>
    </div>
</section>

{/* ==================== CLIENT TESTIMONIAL ==================== */}
<section className="py-24 px-6 bg-white">
    <div className="max-w-4xl mx-auto">
        <div className="sr-s scene">
            <div className="tilt-card bg-gray-50 rounded-3xl p-10 md:p-14 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-brand-400 via-brand-500 to-amber-400"></div>
                <div className="absolute top-6 right-8 text-[120px] font-serif text-brand-100 leading-none select-none">"</div>

                <div className="relative z-10 text-center">
                    <div className="flex justify-center mb-6">
                        <img src="https://picsum.photos/seed/alameen-owner-face/120/120.jpg" alt="صاحب مصنع الأمين" className="w-20 h-20 rounded-2xl object-cover shadow-lg" />
                    </div>

                    <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                        "صراحة كنت متشكك إن التغليف يفرق كذا. بس بعد ما غيّرنا وفّرنا المنتجات الجديدة، الموزعين اللي كانوا يرفضون يتواصلون هم فيّ. والسعر ارتفع وأصحاب المحلات يقولون الزبون يطلب أمين بالاسم. استثمار كل ريال دفعته في التصميم رجعلي أضعافه."
                    </blockquote>

                    <div>
                        <div className="font-extrabold text-lg">أبو عبدالله — صاحب مصنع الأمين</div>
                        <div className="text-sm text-gray-400 mt-1">المدينة المنورة، المملكة العربية السعودية</div>
                        <div className="flex justify-center gap-1 mt-3">
                            <i data-lucide="star" className="w-4 h-4 text-amber-400 fill-amber-400"></i>
                            <i data-lucide="star" className="w-4 h-4 text-amber-400 fill-amber-400"></i>
                            <i data-lucide="star" className="w-4 h-4 text-amber-400 fill-amber-400"></i>
                            <i data-lucide="star" className="w-4 h-4 text-amber-400 fill-amber-400"></i>
                            <i data-lucide="star" className="w-4 h-4 text-amber-400 fill-amber-400"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/* ==================== PRODUCT RANGE ==================== */}
<section className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <span className="sr text-[11px] font-bold uppercase tracking-widest text-brand-600 mb-4 block">المنتجات النهائية</span>
            <h2 className="sr text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{transitionDelay: ".1s"}}>8 عبوات — 3 خطوط متنوعة</h2>
        </div>

        {/* Line Tabs */}
        <div className="sr flex justify-center gap-3 mb-12" style={{transitionDelay: ".1s"}}>
            <button className="line-tab active bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all" onClick="switchLine('daily',this)">خط الاستهلاك اليومي</button>
            <button className="line-tab bg-gray-100 text-gray-500 px-6 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-gray-200" onClick="switchLine('luxury',this)">خط الفخامة</button>
            <button className="line-tab bg-gray-100 text-gray-500 px-6 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-gray-200" onClick="switchLine('gift',this)">خط الهدايا</button>
        </div>

        {/* Products */}
        <div id="line-daily" className={`product-line grid sm:grid-cols-3 gap-6 ${activeLine === "daily" ? "" : "hidden"}`}>
            <div className="sr scene"><div className="tilt-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"><img src="https://picsum.photos/seed/product-sukari-daily/500/350.jpg" alt="سكري يومي" className="w-full h-[200px] object-cover" /><div className="p-5"><div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">500 جرام</div><h4 className="font-bold text-sm mt-1">سكري يومي</h4><p className="text-xs text-gray-400 mt-1">كرتون مقوّى بطباعة واحدة</p></div></div></div>
            <div className="sr scene" style={{transitionDelay: ".05s"}}><div className="tilt-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"><img src="https://picsum.photos/seed/product-majdool-daily/500/350.jpg" alt="مجضول يومي" className="w-full h-[200px] object-cover" /><div className="p-5"><div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">1 كجم</div><h4 className="font-bold text-sm mt-1">مجضول يومي</h4><p className="text-xs text-gray-400 mt-1">كيس معدني مطبوع</p></div></div></div>
            <div className="sr scene" style={{transitionDelay: ".1s"}}><div className="tilt-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"><img src="https://picsum.photos/seed/product-barhi-daily/500/350.jpg" alt="برحي يومي" className="w-full h-[200px] object-cover" /><div className="p-5"><div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">1 كجم</div><h4 className="font-bold text-sm mt-1">برحي يومي</h4><p className="text-xs text-gray-400 mt-1">كيس شفاف مع ملصق فاخر</p></div></div></div>
        </div>

        <div id="line-luxury" className={`product-line grid sm:grid-cols-3 gap-6 ${activeLine === "luxury" ? "" : "hidden"}`}>
            <div className="scene"><div className="tilt-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"><img src="https://picsum.photos/seed/product-sukari-luxury-royal/500/350.jpg" alt="سكري ملكي" className="w-full h-[200px] object-cover" /><div className="p-5"><div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">500 جرام</div><h4 className="font-bold text-sm mt-1">سكري ملكي</h4><p className="text-xs text-gray-400 mt-1">كرتون فاخر بلمسة ذهبية</p></div></div></div>
            <div className="scene"><div className="tilt-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"><img src="https://picsum.photos/seed/product-majdool-luxury-premium/500/350.jpg" alt="مجضول بريميوم" className="w-full h-[200px] object-cover" /><div className="p-5"><div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">750 جرام</div><h4 className="font-bold text-sm mt-1">مجضول بريميوم</h4><p className="text-xs text-gray-400 mt-1">علبة مغلفة بورق ذهبي</p></div></div></div>
            <div className="scene"><div className="tilt-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"><img src="https://picsum.photos/seed/product-mixed-luxury-box/500/350.jpg" alt="مكس فاخر" className="w-full h-[200px] object-cover" /><div className="p-5"><div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">1 كجم</div><h4 className="font-bold text-sm mt-1">مكس فاخر</h4><p className="text-xs text-gray-400 mt-1">علبة مقسمة بأقسام</p></div></div></div>
        </div>

        <div id="line-gift" className={`product-line grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto ${activeLine === "gift" ? "" : "hidden"}`}>
            <div className="scene"><div className="tilt-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"><img src="https://picsum.photos/seed/product-gift-corporate-box/500/350.jpg" alt="هدية مؤسسية" className="w-full h-[220px] object-cover" /><div className="p-5"><div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">1.5 كجم</div><h4 className="font-bold text-sm mt-1">هدية مؤسسية</h4><p className="text-xs text-gray-400 mt-1">صندوق صلب بغطاء قماشي وشريط ذهبي</p></div></div></div>
            <div className="scene"><div className="tilt-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"><img src="https://picsum.photos/seed/product-gift-special-edition/500/350.jpg" alt="إصدار خاص" className="w-full h-[220px] object-cover" /><div className="p-5"><div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">2 كجم</div><h4 className="font-bold text-sm mt-1">إصدار رمضان خاص</h4><p className="text-xs text-gray-400 mt-1">صندوق جلدي مع بطاقة مطبوعة وشمع</p></div></div></div>
        </div>
    </div>
</section>

{/* ==================== CTA ==================== */}
<section id="contact" className="py-24 px-6 bg-white relative overflow-hidden">
    <div className="absolute bottom-0 right-0 opacity-10 hidden lg:block"><div className="sphere-3d float-3d-d" style={{width: "140px", height: "140px"}}></div></div>

    <div className="max-w-4xl mx-auto relative z-10">
        <div className="sr-s scene">
            <div className="tilt-card bg-gradient-to-l from-brand-50 to-emerald-50 rounded-3xl p-10 md:p-16 text-center border border-brand-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-brand-400 via-brand-500 to-teal-400"></div>
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg shadow-brand-500/10 flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="rocket" className="w-8 h-8 text-brand-600"></i>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">تبي تصير القصة الجاية أنت؟</h2>
                <p className="text-gray-500 leading-relaxed max-w-xl mx-auto mb-10">مصنع الأمين مش الوحيد اللي غيّر واقعه. عندنا أكثر من 87 مصنع تمور نفتخر بشراكتنا معهم. ابداً حكايتك اليوم.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#" className="btn-primary px-8 py-4 rounded-2xl text-sm font-extrabold flex items-center gap-2 group">
                        احجز استشارة مجانية
                        <i data-lucide="arrow-left" className="w-4 h-4 transition-transform group-hover:-translate-x-1"></i>
                    </a>
                    <a href="https://wa.me/966500000000" target="_blank" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-600 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        أو تواصل واتساب
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

{/* Footer */}
<footer className="bg-gray-900 py-14 px-6">
    <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center"><i data-lucide="date" className="w-4.5 h-4.5 text-white"></i></div>
                <span className="font-extrabold text-sm text-white">تمور باك</span>
                <span className="text-gray-600 text-xs mr-2">— دراسة حالة: مصنع الأمين</span>
            </div>
            <div className="text-xs text-gray-600">© 2024 تمور باك. جميع الحقوق محفوظة.</div>
        </div>
    </div>
</footer>

{/* WhatsApp Float */}
<a href="https://wa.me/966500000000" target="_blank" className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-brand-500 hover:bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/30 transition-all hover:scale-110 hover:-translate-y-1 group">
    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    <span className="absolute left-full mr-3 bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">تواصل معنا</span>
</a>


        </div>
    );
}
