</script>
    <style>
        :root {
            --blue: #2563EB;
            --blue-light: #60A5FA;
            --blue-dim: rgba(37,99,235,0.06);
            --green: #10B981;
            --yellow: #F59E0B;
            --pink: #EC4899;
            --purple: #8B5CF6;
            --bg: #FAFBFF;
            --surface: #FFFFFF;
            --surface-2: #F1F3F9;
            --surface-3: #E8EAF2;
            --border: rgba(0,0,0,0.06);
            --border-h: rgba(0,0,0,0.12);
            --txt: #0F172A;
            --txt2: #64748B;
            --txt3: #94A3B8;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--txt); overflow-x: hidden; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 3px; }

        /* === التدرج متعدد الألوان من الشعار === */
        .brand-gradient {
            background: linear-gradient(135deg, #F59E0B 0%, #10B981 30%, #2563EB 65%, #EC4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .brand-gradient-bg {
            background: linear-gradient(135deg, #F59E0B 0%, #10B981 30%, #2563EB 65%, #EC4899 100%);
        }
        .brand-gradient-bg-soft {
            background: linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(16,185,129,0.08) 30%, rgba(37,99,235,0.08) 65%, rgba(236,72,153,0.08) 100%);
        }

        /* === الأجسام المتحركة === */
        .orb {
            position: fixed; border-radius: 50%; filter: blur(100px);
            pointer-events: none; z-index: 0; will-change: transform;
        }
        .orb-1 {
            width: 500px; height: 500px;
            background: rgba(245,158,11,0.08);
            top: -200px; right: -150px;
            animation: orbA 25s ease-in-out infinite;
        }
        .orb-2 {
            width: 400px; height: 400px;
            background: rgba(37,99,235,0.06);
            bottom: -100px; left: -100px;
            animation: orbB 30s ease-in-out infinite;
        }
        .orb-3 {
            width: 300px; height: 300px;
            background: rgba(236,72,153,0.05);
            top: 50%; left: 50%;
            animation: orbC 20s ease-in-out infinite;
        }
        @keyframes orbA {
            0%,100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(-80px,60px) scale(1.1); }
            66% { transform: translate(40px,-30px) scale(0.9); }
        }
        @keyframes orbB {
            0%,100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(70px,-50px) scale(1.08); }
            66% { transform: translate(-40px,30px) scale(0.92); }
        }
        @keyframes orbC {
            0%,100% { transform: translate(-50%,-50%) scale(1); }
            50% { transform: translate(-30%,-60%) scale(1.2); }
        }

        /* === بطاقة محدثة للثيم الفاتح === */
        .card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04);
            transition: box-shadow 0.35s, border-color 0.35s, transform 0.35s;
        }
        .card:hover {
            box-shadow: 0 2px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06);
        }
        .card-sticky {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 20px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.05);
        }

        /* === الشريط المنزلق === */
        input[type="range"] {
            -webkit-appearance: none; appearance: none;
            width: 100%; height: 6px; border-radius: 3px;
            outline: none; cursor: pointer; direction: ltr;
            background: linear-gradient(
                to right,
                var(--blue) 0%, var(--blue) var(--fill, 45%),
                var(--surface-3) var(--fill, 45%),
                var(--surface-3) 100%
            );
            transition: background 0.15s;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 24px; height: 24px; border-radius: 50%;
            background: var(--surface);
            border: 3px solid var(--blue);
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(37,99,235,0.2);
            transition: box-shadow 0.25s, transform 0.25s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
            box-shadow: 0 2px 12px rgba(37,99,235,0.35);
            transform: scale(1.15);
        }
        input[type="range"]::-moz-range-thumb {
            width: 24px; height: 24px; border-radius: 50%;
            background: var(--surface); border: 3px solid var(--blue);
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(37,99,235,0.2);
        }
        input[type="range"]::-moz-range-track {
            height: 6px; border-radius: 3px; background: transparent;
        }

        /* === حبوب المنصة === */
        .plat-pill {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 10px 18px; border-radius: 12px;
            border: 1px solid var(--border); background: var(--surface);
            cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
            font-size: 13.5px; color: var(--txt2); user-select: none;
        }
        .plat-pill:hover { border-color: var(--border-h); color: var(--txt); box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .plat-pill.on {
            border-color: var(--blue); background: var(--blue-dim);
            color: var(--blue); box-shadow: 0 2px 12px rgba(37,99,235,0.1);
        }
        .plat-pill i { font-size: 16px; }

        /* === بطاقة الهدف === */
        .goal-card {
            padding: 18px 12px; border-radius: 14px;
            border: 1px solid var(--border); background: var(--surface);
            cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
            text-align: center; user-select: none;
        }
        .goal-card:hover { border-color: var(--border-h); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
        .goal-card.on {
            border-color: var(--blue); background: var(--blue-dim);
            box-shadow: 0 2px 16px rgba(37,99,235,0.08);
        }
        .goal-card.on .g-icon { color: var(--blue); }

        /* === حبوب المدة === */
        .dur-pill {
            padding: 7px 18px; border-radius: 10px; font-size: 13px;
            border: 1px solid var(--border); background: var(--surface);
            color: var(--txt2); cursor: pointer; transition: all 0.3s;
            font-family: 'DM Sans', sans-serif; user-select: none;
        }
        .dur-pill:hover { color: var(--txt); border-color: var(--border-h); }
        .dur-pill.on { background: var(--blue); border-color: var(--blue); color: #fff; }

        /* === القائمة المنسدلة === */
        .sel {
            appearance: none; -webkit-appearance: none;
            width: 100%; padding: 13px 42px 13px 16px;
            border-radius: 12px; border: 1px solid var(--border);
            background: var(--surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat left 16px center;
            color: var(--txt); font-family: 'Tajawal', sans-serif;
            font-size: 14.5px; cursor: pointer; transition: all 0.3s; outline: none;
        }
        .sel:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .sel option { background: #fff; color: var(--txt); }

        /* === بطاقة المقياس === */
        .met-card {
            padding: 22px; border-radius: 16px;
            border: 1px solid var(--border); background: var(--surface);
            transition: all 0.35s; position: relative; overflow: hidden;
        }
        .met-card::before {
            content: ''; position: absolute; top: 0; right: 0; left: 0; height: 3px;
            border-radius: 16px 16px 0 0;
            opacity: 0; transition: opacity 0.35s;
        }
        .met-card:nth-child(1)::before { background: linear-gradient(90deg, #F59E0B, #10B981); }
        .met-card:nth-child(2)::before { background: linear-gradient(90deg, #10B981, #2563EB); }
        .met-card:nth-child(3)::before { background: linear-gradient(90deg, #2563EB, #8B5CF6); }
        .met-card:nth-child(4)::before { background: linear-gradient(90deg, #8B5CF6, #EC4899); }
        .met-card:nth-child(5)::before { background: linear-gradient(90deg, #EC4899, #F59E0B); }
        .met-card:nth-child(6)::before { background: linear-gradient(90deg, #F59E0B, #EC4899); }
        .met-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .met-card:hover::before { opacity: 1; }

        /* === زر السيناريو === */
        .sc-btn {
            padding: 7px 16px; border-radius: 8px; font-size: 12.5px;
            border: 1px solid var(--border); background: var(--surface);
            color: var(--txt2); cursor: pointer; transition: all 0.3s;
            font-family: 'Tajawal', sans-serif; user-select: none;
        }
        .sc-btn:hover { color: var(--txt); border-color: var(--border-h); }
        .sc-btn.on { background: var(--blue); border-color: var(--blue); color: #fff; }

        /* === بطاقة النصيحة === */
        .tip-card {
            padding: 18px 22px; border-radius: 14px;
            border: 1px solid var(--border); background: var(--surface);
            transition: all 0.3s; display: flex; gap: 14px; align-items: flex-start;
        }
        .tip-card:hover { border-color: var(--border-h); box-shadow: 0 4px 12px rgba(0,0,0,0.03); }

        /* === ظهور تدريجي === */
        .fup {
            opacity: 0; transform: translateY(28px);
            transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .fup.vis { opacity: 1; transform: translateY(0); }

        /* === نبض الرقم === */
        @keyframes npulse { 0%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.97)} 100%{opacity:1;transform:scale(1)} }
        .nupd { animation: npulse 0.25s ease; }

        /* === شريط المقارنة === */
        .comp-bar {
            height: 6px; border-radius: 3px;
            background: var(--surface-3); overflow: hidden;
        }
        .comp-fill {
            height: 100%; border-radius: 3px;
            transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
        }

        /* === شعار Tag Studio === */
        .tag-logo-mark {
            width: 32px; height: 32px; position: relative;
        }
        .tag-logo-mark span {
            position: absolute; width: 16px; height: 4px; border-radius: 2px;
            top: 50%; left: 50%;
        }
        .tag-logo-mark span:nth-child(1) { background: #F59E0B; transform: translate(-50%,-50%) rotate(45deg); }
        .tag-logo-mark span:nth-child(2) { background: #10B981; transform: translate(-50%,-50%) rotate(-15deg); }
        .tag-logo-mark span:nth-child(3) { background: #2563EB; transform: translate(-50%,-50%) rotate(-45deg); }
        .tag-logo-mark span:nth-child(4) { background: #EC4899; transform: translate(-50%,-50%) rotate(15deg); }

        /* === جدول === */
        .comp-table tr { transition: background 0.2s; }
        .comp-table tbody tr:hover { background: rgba(37,99,235,0.03); }

        /* === خط فاصل متدرج === */
        .brand-line {
            width: 40px; height: 2px; border-radius: 1px;
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    </style>
</head>
<body class="font-tajawal min-h-screen relative">

    <!-- الأجسام المتحركة -->
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>
    <div class="orb orb-3" aria-hidden="true"></div>

    <!-- شريط التنقل -->
    <nav class="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4" style="background:rgba(250,251,255,0.8);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--border);">
        <a href="#" class="flex items-center gap-3" aria-label="Tag Studio">
            <div class="tag-logo-mark">
                <span></span><span></span><span></span><span></span>
            </div>
            <span class="font-dm font-bold text-base tracking-tight" style="color:var(--blue);">TAG STUDIO</span>
        </a>
        <a href="#calculator" class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg" style="background:var(--blue);color:#fff;box-shadow:0 2px 12px rgba(37,99,235,0.25);">
            <i class="fas fa-calculator text-xs"></i>
            ابدأ الحساب
        </a>
    </nav>

    <main class="relative z-10">

        <!-- قسم البطل -->
        <header class="pt-32 pb-16 md:pt-40 md:pb-24 px-6 text-center max-w-4xl mx-auto fup">
            <!-- شارة صغيرة -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8" style="background:var(--blue-dim);color:var(--blue);border:1px solid rgba(37,99,235,0.12);">
                <i class="fas fa-bolt text-[10px]"></i>
                أدوات التسويق الرقمي
            </div>
            <h1 class="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
                <span class="brand-gradient">حاسبة ميزانية</span><br>
                <span style="color:var(--txt);">الإعلانات المدفوعة</span>
            </h1>
            <p class="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto" style="color:var(--txt2);">
                قدّر نتائج حملاتك الإعلانية بدقة قبل إنفاق دولار واحد. اختر منصتك، حدد ميزانيتك، واحصل على توقعات واقعية فوراً.
            </p>
            <div class="mt-10 flex items-center justify-center gap-3 text-xs" style="color:var(--txt3);">
                <div class="brand-line brand-gradient-bg" style="width:30px;height:1.5px;"></div>
                <span class="font-dm tracking-wider">SCROLL</span>
                <div class="brand-line brand-gradient-bg" style="width:30px;height:1.5px;"></div>
            </div>
        </header>

        <!-- قسم الحاسبة -->
        <section id="calculator" class="px-4 md:px-8 lg:px-12 pb-24 max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                <!-- عمود المدخلات -->
                <div class="lg:col-span-5 fup" style="transition-delay:0.1s;">
                    <div class="card-sticky p-6 md:p-8 sticky top-24">
                        <h2 class="text-lg font-bold mb-1" style="color:var(--txt);">إعدادات الحملة</h2>
                        <p class="text-xs mb-8" style="color:var(--txt3);">عدّل القيم وشاهد النتائج تتحدث لحظياً</p>

                        <!-- الميزانية -->
                        <div class="mb-8">
                            <div class="flex items-baseline justify-between mb-4">
                                <label class="text-sm font-medium" style="color:var(--txt2);">الميزانية الشهرية</label>
                                <div class="font-dm font-bold text-2xl" style="color:var(--blue);">
                                    $<span id="budgetVal">5,000</span>
                                </div>
                            </div>
                            <input type="range" id="budgetSlider" min="500" max="100000" step="500" value="5000" aria-label="الميزانية الشهرية">
                            <div class="flex justify-between mt-2.5 text-[11px] font-dm" style="color:var(--txt3);">
                                <span>$500</span>
                                <span>$100,000</span>
                            </div>
                        </div>

                        <!-- المنصة -->
                        <div class="mb-8">
                            <label class="text-sm font-medium block mb-3" style="color:var(--txt2);">المنصة الإعلانية</label>
                            <div class="flex flex-wrap gap-2" id="platformWrap">
                                <button class="plat-pill on" data-val="meta"><i class="fa-brands fa-meta"></i> ميتا</button>
                                <button class="plat-pill" data-val="google"><i class="fa-brands fa-google"></i> جوجل</button>
                                <button class="plat-pill" data-val="tiktok"><i class="fa-brands fa-tiktok"></i> تيك توك</button>
                                <button class="plat-pill" data-val="linkedin"><i class="fa-brands fa-linkedin-in"></i> لينكد إن</button>
                                <button class="plat-pill" data-val="snapchat"><i class="fa-brands fa-snapchat"></i> سناب شات</button>
                            </div>
                        </div>

                        <!-- الهدف -->
                        <div class="mb-8">
                            <label class="text-sm font-medium block mb-3" style="color:var(--txt2);">هدف الحملة</label>
                            <div class="grid grid-cols-2 gap-2.5" id="goalWrap">
                                <div class="goal-card" data-val="awareness">
                                    <div class="g-icon text-xl mb-2" style="color:var(--txt3);"><i class="fas fa-eye"></i></div>
                                    <div class="text-sm font-medium">زيادة الوعي</div>
                                </div>
                                <div class="goal-card" data-val="traffic">
                                    <div class="g-icon text-xl mb-2" style="color:var(--txt3);"><i class="fas fa-arrow-pointer"></i></div>
                                    <div class="text-sm font-medium">زيارة الموقع</div>
                                </div>
                                <div class="goal-card on" data-val="conversions">
                                    <div class="g-icon text-xl mb-2" style="color:var(--txt3);"><i class="fas fa-bullseye"></i></div>
                                    <div class="text-sm font-medium">تحويلات</div>
                                </div>
                                <div class="goal-card" data-val="engagement">
                                    <div class="g-icon text-xl mb-2" style="color:var(--txt3);"><i class="fas fa-heart"></i></div>
                                    <div class="text-sm font-medium">تفاعل</div>
                                </div>
                            </div>
                        </div>

                        <!-- القطاع -->
                        <div class="mb-8">
                            <label class="text-sm font-medium block mb-3" style="color:var(--txt2);">القطاع الصناعي</label>
                            <select class="sel" id="industrySel" aria-label="القطاع الصناعي">
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

                        <!-- المدة -->
                        <div>
                            <label class="text-sm font-medium block mb-3" style="color:var(--txt2);">مدة الحملة</label>
                            <div class="flex flex-wrap gap-2" id="durWrap">
                                <button class="dur-pill" data-val="7">7 أيام</button>
                                <button class="dur-pill" data-val="14">14 يوم</button>
                                <button class="dur-pill on" data-val="30">30 يوم</button>
                                <button class="dur-pill" data-val="60">60 يوم</button>
                                <button class="dur-pill" data-val="90">90 يوم</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- عمود النتائج -->
                <div class="lg:col-span-7 fup" style="transition-delay:0.25s;">
                    <div class="space-y-6">

                        <!-- تبديل السيناريو -->
                        <div class="flex items-center justify-between flex-wrap gap-3">
                            <h2 class="text-lg font-bold" style="color:var(--txt);">النتائج المتوقعة</h2>
                            <div class="flex gap-1.5" id="scenarioWrap">
                                <button class="sc-btn" data-val="optimistic">متفائل</button>
                                <button class="sc-btn on" data-val="realistic">واقعي</button>
                                <button class="sc-btn" data-val="conservative">محافظ</button>
                            </div>
                        </div>

                        <!-- بطاقات المقاييس -->
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3" id="metricsGrid">
                            <div class="met-card">
                                <div class="text-[11px] font-medium mb-2" style="color:var(--txt3);">الانطباعات</div>
                                <div class="font-dm font-bold text-xl md:text-2xl" style="color:var(--txt);" id="mImpressions">417.5K</div>
                                <div class="text-[11px] mt-1.5 font-dm" style="color:var(--green);">شهرياً</div>
                            </div>
                            <div class="met-card">
                                <div class="text-[11px] font-medium mb-2" style="color:var(--txt3);">النقرات</div>
                                <div class="font-dm font-bold text-xl md:text-2xl" style="color:var(--txt);" id="mClicks">3,333</div>
                                <div class="text-[11px] mt-1.5 font-dm" style="color:var(--green);">شهرياً</div>
                            </div>
                            <div class="met-card">
                                <div class="text-[11px] font-medium mb-2" style="color:var(--txt3);">التحويلات</div>
                                <div class="font-dm font-bold text-xl md:text-2xl" style="color:var(--blue);" id="mConversions">117</div>
                                <div class="text-[11px] mt-1.5 font-dm" style="color:var(--blue);">شهرياً</div>
                            </div>
                            <div class="met-card">
                                <div class="text-[11px] font-medium mb-2" style="color:var(--txt3);">تكلفة النقرة</div>
                                <div class="font-dm font-bold text-xl md:text-2xl" style="color:var(--txt);" id="mCPC">$1.50</div>
                                <div class="text-[11px] mt-1.5 font-dm" style="color:var(--txt3);">CPC</div>
                            </div>
                            <div class="met-card">
                                <div class="text-[11px] font-medium mb-2" style="color:var(--txt3);">تكلفة الألف ظهور</div>
                                <div class="font-dm font-bold text-xl md:text-2xl" style="color:var(--txt);" id="mCPM">$11.98</div>
                                <div class="text-[11px] mt-1.5 font-dm" style="color:var(--txt3);">CPM</div>
                            </div>
                            <div class="met-card">
                                <div class="text-[11px] font-medium mb-2" style="color:var(--txt3);">تكلفة التحويل</div>
                                <div class="font-dm font-bold text-xl md:text-2xl" style="color:var(--pink);" id="mCPA">$42.74</div>
                                <div class="text-[11px] mt-1.5 font-dm" style="color:var(--pink);">CPA</div>
                            </div>
                        </div>

                        <!-- مخطط الدونات + توزيع القمع -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="card p-6 flex flex-col items-center justify-center">
                                <div class="text-xs font-medium mb-4" style="color:var(--txt3);">توزيع الميزانية على القمع</div>
                                <canvas id="donutCanvas" width="200" height="200" style="width:200px;height:200px;"></canvas>
                                <div class="flex flex-wrap justify-center gap-4 mt-5">
                                    <div class="flex items-center gap-2 text-[11px]" style="color:var(--txt2);">
                                        <span class="w-2.5 h-2.5 rounded-full" style="background:var(--blue);"></span> أعلى القمع
                                    </div>
                                    <div class="flex items-center gap-2 text-[11px]" style="color:var(--txt2);">
                                        <span class="w-2.5 h-2.5 rounded-full" style="background:var(--green);"></span> منتصف القمع
                                    </div>
                                    <div class="flex items-center gap-2 text-[11px]" style="color:var(--txt2);">
                                        <span class="w-2.5 h-2.5 rounded-full" style="background:var(--pink);"></span> أسفل القمع
                                    </div>
                                </div>
                            </div>

                            <!-- مقارنة الأداء -->
                            <div class="card p-6">
                                <div class="text-xs font-medium mb-5" style="color:var(--txt3);">مقارنة مع متوسط القطاع</div>
                                <div class="space-y-5" id="compBars">
                                    <div>
                                        <div class="flex justify-between text-[11px] mb-1.5">
                                            <span style="color:var(--txt2);">معدل النقر (CTR)</span>
                                            <span class="font-dm font-semibold" style="color:var(--txt);" id="compCTR">0.80%</span>
                                        </div>
                                        <div class="comp-bar"><div class="comp-fill" id="barCTR" style="width:60%;background:var(--blue);"></div></div>
                                        <div class="text-[10px] mt-1 font-dm" style="color:var(--txt3);">المتوسط: 0.90%</div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between text-[11px] mb-1.5">
                                            <span style="color:var(--txt2);">معدل التحويل (CVR)</span>
                                            <span class="font-dm font-semibold" style="color:var(--txt);" id="compCVR">3.50%</span>
                                        </div>
                                        <div class="comp-bar"><div class="comp-fill" id="barCVR" style="width:70%;background:var(--green);"></div></div>
                                        <div class="text-[10px] mt-1 font-dm" style="color:var(--txt3);">المتوسط: 2.80%</div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between text-[11px] mb-1.5">
                                            <span style="color:var(--txt2);">تكلفة التحويل (CPA)</span>
                                            <span class="font-dm font-semibold" style="color:var(--txt);" id="compCPA">$42.74</span>
                                        </div>
                                        <div class="comp-bar"><div class="comp-fill" id="barCPA" style="width:45%;background:var(--pink);"></div></div>
                                        <div class="text-[10px] mt-1 font-dm" style="color:var(--txt3);">المتوسط: $55.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- الإنفاق اليومي + ملخص سريع -->
                        <div class="card p-5 flex flex-wrap items-center justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:var(--blue-dim);">
                                    <i class="fas fa-chart-line text-sm" style="color:var(--blue);"></i>
                                </div>
                                <div>
                                    <div class="text-[11px]" style="color:var(--txt3);">الإنفاق اليومي المتوقع</div>
                                    <div class="font-dm font-bold text-lg" id="dailySpend">$167</div>
                                </div>
                            </div>
                            <div class="h-8 w-px" style="background:var(--border);"></div>
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(16,185,129,0.08);">
                                    <i class="fas fa-arrow-trend-up text-sm" style="color:var(--green);"></i>
                                </div>
                                <div>
                                    <div class="text-[11px]" style="color:var(--txt3);">معدل العائد المتوقع</div>
                                    <div class="font-dm font-bold text-lg" style="color:var(--green);" id="roiEst">3.2x</div>
                                </div>
                            </div>
                            <div class="h-8 w-px hidden sm:block" style="background:var(--border);"></div>
                            <div class="flex items-center gap-4 hidden sm:flex">
                                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(236,72,153,0.08);">
                                    <i class="fas fa-clock text-sm" style="color:var(--pink);"></i>
                                </div>
                                <div>
                                    <div class="text-[11px]" style="color:var(--txt3);">فترة التعلم المتوقعة</div>
                                    <div class="font-dm font-bold text-lg" id="learnPeriod">3-5 أيام</div>
                                </div>
                            </div>
                        </div>

                        <!-- نصائح مخصصة -->
                        <div class="card p-6">
                            <div class="flex items-center gap-2 mb-5">
                                <div class="w-6 h-6 rounded-lg flex items-center justify-center" style="background:rgba(245,158,11,0.12);">
                                    <i class="fas fa-lightbulb text-[10px]" style="color:var(--yellow);"></i>
                                </div>
                                <span class="text-sm font-bold">نصائح مخصصة لتحسين أدائك</span>
                            </div>
                            <div class="space-y-3" id="tipsContainer"></div>
                        </div>

                        <!-- مقارنة المنصات -->
                        <div class="card p-6">
                            <div class="flex items-center gap-2 mb-5">
                                <div class="w-6 h-6 rounded-lg flex items-center justify-center" style="background:rgba(139,92,246,0.1);">
                                    <i class="fas fa-scale-balanced text-[10px]" style="color:var(--purple);"></i>
                                </div>
                                <span class="text-sm font-bold">كيف ستبدو نفس الميزانية على منصات أخرى</span>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full text-[12px] min-w-[520px] comp-table">
                                    <thead>
                                        <tr style="color:var(--txt3);border-bottom:1px solid var(--border);">
                                            <th class="text-start py-3 font-medium">المنصة</th>
                                            <th class="text-center py-3 font-medium font-dm">النقرات</th>
                                            <th class="text-center py-3 font-medium font-dm">التحويلات</th>
                                            <th class="text-center py-3 font-medium font-dm">CPC</th>
                                            <th class="text-center py-3 font-medium font-dm">CPA</th>
                                        </tr>
                                    </thead>
                                    <tbody id="compTable"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- دعوة للتواصل -->
        <section class="px-6 pb-24 max-w-3xl mx-auto text-center fup">
            <div class="card p-10 md:p-14 relative overflow-hidden">
                <!-- خلفية تزيينية -->
                <div class="absolute top-0 left-0 w-64 h-64 rounded-full opacity-[0.04]" style="background:var(--blue);filter:blur(80px);transform:translate(-40%,-40%);"></div>
                <div class="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-[0.04]" style="background:var(--pink);filter:blur(60px);transform:translate(40%,40%);"></div>
                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 mb-6">
                        <div class="tag-logo-mark" style="width:24px;height:24px;">
                            <span style="width:12px;height:3px;border-radius:1.5px;"></span>
                            <span style="width:12px;height:3px;border-radius:1.5px;"></span>
                            <span style="width:12px;height:3px;border-radius:1.5px;"></span>
                            <span style="width:12px;height:3px;border-radius:1.5px;"></span>
                        </div>
                        <span class="font-dm font-bold text-xs tracking-tight" style="color:var(--blue);">TAG STUDIO</span>
                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold mb-4">تحتاج خطة إعلانية متكاملة؟</h2>
                    <p class="text-sm font-light leading-relaxed mb-8 max-w-lg mx-auto" style="color:var(--txt2);">
                        فريقنا في Tag Studio يصمم حملات إعلانية مدفوعة تحقق أعلى عائد على الاستثمار. من الاستراتيجية إلى التنفيذ والتحسين المستمر.
                    </p>
                    <a href="https://www.wearetagstudio.com" target="_blank" rel="noopener" class="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" style="background:var(--blue);color:#fff;box-shadow:0 4px 20px rgba(37,99,235,0.3);">
                        تواصل معنا
                        <i class="fas fa-arrow-left text-xs"></i>
                    </a>
                </div>
            </div>
        </section>
    </main>

    <!-- التذييل -->
    <footer class="relative z-10 px-6 py-8 text-center" style="border-top:1px solid var(--border);">
        <div class="flex items-center justify-center gap-2.5 mb-3">
            <div class="tag-logo-mark" style="width:18px;height:18px;">
                <span style="width:9px;height:2px;border-radius:1px;"></span>
                <span style="width:9px;height:2px;border-radius:1px;"></span>
                <span style="width:9px;height:2px;border-radius:1px;"></span>
                <span style="width:9px;height:2px;border-radius:1px;"></span>
            </div>
            <span class="text-xs font-medium font-dm" style="color:var(--blue);">TAG STUDIO</span>
        </div>
        <p class="text-[11px]" style="color:var(--txt3);">هذه الأرقام تقديرية مبنية على متوسطات القطاع وقد تختلف حسب السوق والمنطقة الجغرافية</p>
    </footer>

    