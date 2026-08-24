import Image from "next/image"
import Link from "next/link"
import { caseStudies } from "@/lib/caseStudies"
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn"

const baseUrl = "https://www.wearetagstudio.com"

export default function SakenCaseStudy() {
  const project = caseStudies.find(
    (item) => item.slug === "saken-corporate-housing-brand-identity"
  )!

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/work/${project.slug}#creative-work`,
    name: project.title,
    description: project.solution,
    image: `${baseUrl}${project.image}`,
    genre: "Real Estate & Corporate Brand Identity",
    inLanguage: "ar",
    creator: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "تاج ستوديو",
      url: baseUrl,
    },
    about: {
      "@type": "RealEstateAgent",
      name: project.client,
      url: "https://saken.sa",
    },
    mainEntityOfPage: `${baseUrl}/work/${project.slug}`,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "أعمالنا",
        item: `${baseUrl}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${baseUrl}/work/${project.slug}`,
      },
    ],
  }

  const palette = [
    { name: "Deep Earth Brown", value: "#664936", text: "text-white", desc: "الأصالة والدفء المعماري" },
    { name: "Warm Sand", value: "#AB9678", text: "text-white", desc: "رمال الطبيعة والسكينة" },
    { name: "Taupe Slate", value: "#9E9A8F", text: "text-white", desc: "الاتزان والعصرية المؤسسية" },
    { name: "Natural Beige", value: "#C4BAA4", text: "text-[#664936]", desc: "الفخامة الهادئة والراحة" },
    { name: "Cream White", value: "#ECE5D3", text: "text-[#664936]", desc: "النقاء والمساحات المفتوحة" },
    { name: "Silver Gray", value: "#B9B7B3", text: "text-[#664936]", desc: "اللمسة المعمارية الحديثة" },
  ]

  const pillars = [
    {
      icon: "🏢",
      title: "إسكان مؤسسي متكامل للشركات",
      desc: "تصميم يعكس قوة الحلول السكنية الموجهة للشركات الكبرى والكوادر التنفيذية في مدينة الجبيل الصناعية."
    },
    {
      icon: "🏡",
      title: "فلل وشقق مفروشة فاخرة",
      desc: "نظام بصري يرسخ مفهوم البيت الثاني المريح والمجهز بأعلى معايير الضيافة والخدمات الفندقية."
    },
    {
      icon: "🌿",
      title: "بيئة مجمع سكني نابضة بالحياة",
      desc: "إبراز المرافق الحيوية (المسابح، النادي الصحي، المساحات الخضراء، والمطاعم) في كل نقاط الاتصال."
    },
    {
      icon: "📜",
      title: "بروفايل ومطبوعات موثوقة للتعاقدات",
      desc: "قوالب عروض أسعار وبروفايلات تعاقدية مصممة خصيصاً للتفاوض مع كبرى الجهات الحكومية والشركات."
    }
  ]

  return (
    <main className="bg-[#FAF8F5] text-[#2C241E] relative overflow-hidden selection:bg-[#664936] selection:text-white">
      {/* ── Warm Background Glowing Orbs ── */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#AB9678]/15 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-[#664936]/10 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#ECE5D3]/40 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── MODERN HERO ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto min-h-[85vh] flex flex-col justify-center">
        <nav className="mb-8 text-sm font-bold text-[#8C827A] tracking-wide flex gap-3 items-center" aria-label="مسار التنقل">
          <Link href="/" className="hover:text-[#664936] transition-colors">الرئيسية</Link>
          <span className="text-[#D8D2C9]">/</span>
          <Link href="/work" className="hover:text-[#664936] transition-colors">أعمالنا</Link>
          <span className="text-[#D8D2C9]">/</span>
          <span className="text-[#2C241E] bg-white px-3 py-1 rounded-full shadow-sm" aria-current="page">ساكن للإسكان المؤسسي</span>
        </nav>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-center">
          <FadeIn direction="up" duration={0.8}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_8px_30px_rgb(102,73,54,0.06)] border border-[#E8E2D8] mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#AB9678] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#664936]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#664936]">
                Corporate Housing & Hospitality Identity
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[5.2rem] font-black leading-[1.1] tracking-tight text-[#2C241E]">
              سكينة السكن، <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#664936] via-[#AB9678] to-[#664936]">
                بفخامة الضيافة المؤسسية.
              </span>
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-[#6B5E54] max-w-xl">
              تطوير هوية بصرية فاخرة لمجمع ساكن في الجبيل الصناعية — تجسيد لمفهوم الإسكان المؤسسي والفلل والشقق المفروشة التي تجمع بين هدوء المنزل وأناقة المرافق الفندقية.
            </p>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: "العميل", value: "مجمع ساكن السكني" },
                { label: "الخدمة", value: "هوية بصرية وعقارية" },
                { label: "الموقع", value: "الجبيل الصناعية" },
                { label: "الموقع الرسمي", value: "saken.sa" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-[#E8E2D8] shadow-sm">
                  <p className="text-xs font-bold text-[#8C827A] mb-2">{stat.label}</p>
                  <p className="text-sm font-bold text-[#2C241E]">{stat.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="left" duration={1} delay={0.2} className="relative aspect-square lg:aspect-auto lg:h-[620px] w-full">
            <div className="absolute inset-0 bg-white/50 backdrop-blur-2xl rounded-[3rem] border border-[#E8E2D8] shadow-[0_20px_50px_rgb(102,73,54,0.08)] p-6 sm:p-8 transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#ECE5D3]/50 flex items-center justify-center p-6">
                <Image
                  src="/images/saken-color-palette-guide.webp"
                  alt="دليل الهوية البصرية ونظام الألوان لمجمع ساكن السكني"
                  fill
                  className="object-contain p-4 transition-transform duration-[3s] hover:scale-105"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── THE BRIEF ── */}
      <section className="relative mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 bg-white rounded-[3rem] border border-[#E8E2D8] shadow-[0_20px_60px_rgb(102,73,54,0.03)] p-10 sm:p-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#AB9678]">The Challenge</p>
            <h2 className="mt-4 text-4xl font-black text-[#2C241E]">التحدي العقاري</h2>
          </div>
          <div>
            <p className="text-xl leading-loose text-[#6B5E54]">
              سوق الإسكان في الجبيل الصناعية يشهد طلباً متزايداً من الشركات العالمية والمحلية لإسكان كوادرها وفرق عملها. كان التحدي أمام تاج ستوديو هو صياغة هوية بصرية تتجاوز نمطية الشقق المفروشة التقليدية، لتقدم مجمع ساكن كوجهة سكنية راقية متكاملة الخدمات تعكس الراحة، الخصوصية، الاستقرار طويل الأمد، وتلائم كبرى التعاقدات المؤسسية للشركات.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE CREATIVE CONCEPT ── */}
      <section className="relative mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-[#2C241E] text-white rounded-[3rem] border border-[#AB9678]/20 shadow-[0_20px_60px_rgb(0,0,0,0.25)] p-10 sm:p-16 lg:p-24 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#AB9678]/25 to-transparent rounded-full blur-3xl" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#AB9678] mb-4">The Creative Concept</p>
              <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-8">
                فلسفة السكينة والأناقة المعمارية
              </h2>
              <p className="text-xl leading-loose text-white/80 mb-6">
                استوحينا الهوية من المعنى اللغوي لـ ساكن — الاستقرار، الهدوء، والسكينة. دمجنا بين الخطوط المعمارية الهندسية الصريحة للفلل والوحدات السكنية وبين درجات الألوان الطبيعية الترابية، لخلق تجربة بصرية تشعر النزيل بالألفة والراحة من اللحظة الأولى.
              </p>
              <div className="space-y-4 text-white/80">
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="w-8 h-8 rounded-full bg-[#AB9678]/20 text-[#AB9678] font-bold flex items-center justify-center flex-shrink-0 text-sm">1</span>
                  <div>
                    <strong className="text-white block">رمزية الملاذ السكني:</strong>
                    <span className="text-sm text-white/70">أشكال تعبر عن الأمان والاستقرار والاحتواء المنزلي.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="w-8 h-8 rounded-full bg-[#C4BAA4]/20 text-[#C4BAA4] font-bold flex items-center justify-center flex-shrink-0 text-sm">2</span>
                  <div>
                    <strong className="text-white block">العصرية المؤسسية (Corporate Elegance):</strong>
                    <span className="text-sm text-white/70">خطوط وأسلوب يلائم خطابات التعاقد الرسمية وعروض الشركات.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white/10 shadow-2xl p-6 border border-white/20 backdrop-blur-md flex flex-col justify-center items-center text-center">
              <div className="w-24 h-24 rounded-full bg-[#AB9678]/20 border border-[#AB9678]/40 flex items-center justify-center text-4xl mb-6">
                🏛️
              </div>
              <h3 className="text-3xl font-black text-white mb-3">Saken Corporate Housing</h3>
              <p className="text-white/70 text-base max-w-sm">
                مجمع سكني راقٍ في الجبيل يجمع بين الفلل، الشقق المفروشة، والخدمات الترفيهية المتكاملة
              </p>
              <a
                href="https://saken.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#AB9678] text-[#2C241E] font-bold hover:bg-white transition-colors text-sm"
              >
                زيارة موقع ساكن الرسمي ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLOR PALETTE & TYPOGRAPHY SYSTEM ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colors Card */}
          <FadeIn direction="up" className="lg:col-span-2 bg-[#2C241E] rounded-[3rem] p-10 sm:p-14 text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#AB9678]/20 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="inline-flex px-3.5 py-1 bg-white/10 text-[#C4BAA4] rounded-full text-xs font-bold mb-6">
                Color System
              </div>
              <h3 className="text-3xl font-black mb-4">نظام ألوان ترابي مستوحى من الطبيعة</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xl">
                نظام لوني متوازن يعتمد على التناغم الطبيعي (Earth Tones) لإضفاء الفخامة، السكينة، والراحة النفسية للنزلاء والشركات.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {palette.map((color) => (
                  <div key={color.name} className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex-shrink-0 shadow-inner border border-white/20" style={{ backgroundColor: color.value }} />
                    <div>
                      <p className="font-bold text-sm text-white">{color.name}</p>
                      <p className="text-xs text-[#C4BAA4]">{color.desc}</p>
                      <p className="text-[11px] text-white/50 font-mono mt-0.5">{color.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Typography Card */}
          <FadeIn direction="up" delay={0.2} className="bg-white rounded-[3rem] p-10 sm:p-14 border border-[#E8E2D8] shadow-[0_20px_40px_rgb(102,73,54,0.04)] flex flex-col justify-between">
            <div>
              <div className="inline-flex px-3.5 py-1 bg-[#FAF8F5] border border-[#E8E2D8] rounded-full text-xs font-bold text-[#664936] mb-6">
                Typography
              </div>
              <h3 className="text-3xl font-black text-[#2C241E] mb-4">الخط الطباعي الرسمي</h3>
              <p className="text-[#6B5E54] text-sm leading-relaxed">
                تم اعتماد خط <strong>MADANI FONT</strong> كخط رسمي للهوية؛ ليمزج بين هندسية الحروف العربية الأصيلة والعصرية التي تعكس الفخامة المعمارية والاستقرار المؤسسي.
              </p>
            </div>
            
            <div className="mt-8 bg-[#FAF8F5] rounded-2xl p-8 border border-[#E8E2D8] text-center">
              <span className="text-6xl font-black text-[#2C241E]">ساكن</span>
              <p className="mt-3 font-bold text-[#664936] tracking-wide text-sm">MADANI FONT — مدني</p>
              <p className="text-xs text-[#8C827A] mt-1">العناوين الرئيسية والنصوص المؤسسية</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PILLARS & VALUE PROPOSITION ── */}
      <section className="relative mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#664936] mb-4">Brand Pillars</p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#2C241E]">ركائز الهوية والتطبيقات</h2>
        </div>

        <FadeInStaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <FadeInStaggerItem
              key={i}
              direction="up"
              className="bg-white rounded-[2rem] p-8 border border-[#E8E2D8] shadow-sm text-right flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="w-14 h-14 bg-[#FAF8F5] rounded-2xl flex items-center justify-center text-3xl mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-black text-[#2C241E] mb-3">{pillar.title}</h3>
                <p className="text-sm text-[#6B5E54] leading-relaxed">{pillar.desc}</p>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStaggerContainer>
      </section>

      {/* ── DELIVERABLES SECTION ── */}
      <section className="bg-white border-t border-[#E8E2D8] mt-12">
        <div className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="bg-[#2C241E] rounded-[3rem] p-10 sm:p-20 relative overflow-hidden text-white">
            <div className="absolute inset-0 opacity-15 bg-[url('/noise.svg')] mix-blend-overlay" />
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#AB9678]/30 to-transparent rounded-full blur-[100px]" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#AB9678] mb-4">Deliverables</p>
                <h2 className="text-4xl sm:text-5xl font-black mb-6">ماذا صممنا لمجمع ساكن؟</h2>
                <p className="text-lg text-white/70 leading-relaxed mb-12">
                  منظومة تصميم متكاملة تدعم العمليات التسويقية والتشغيلية للمجمع السكني وتعزز المبيعات المؤسسية.
                </p>
                
                <div className="space-y-5">
                  {[
                    { icon: "🏛️", text: "الشعار العقاري ونظام الخطوط والألوان الطبيعية المتناسقة" },
                    { icon: "📂", text: "بروفايل تعريفي فاخر (Company Profile) لعروض الشركات والمناقصات" },
                    { icon: "🪧", text: "تصاميم اللوحات الإرشادية والتوجيه المكاني داخل المجمع والفلل" },
                    { icon: "📱", text: "أصول وبوستات منصات التواصل الاجتماعي والموقع الإلكتروني" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                      <span className="text-2xl">{item.icon}</span>
                      <p className="font-bold text-white/90">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-10 sm:p-14 border border-white/10 text-center flex flex-col justify-center h-full">
                <div className="w-20 h-20 bg-[#AB9678]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#AB9678]">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">قطاع المشروع</p>
                <p className="text-3xl sm:text-4xl font-black mb-4 text-white">إسكان مؤسسي وعقارات</p>
                <p className="text-white/60 text-sm">Corporate Housing & Real Estate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SOLUTION BANNER ── */}
      <section className="bg-[#664936] relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
        <FadeIn direction="up" className="relative z-10 mx-auto grid max-w-[1500px] gap-10 px-6 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#C4BAA4]">
              The Real Estate Edge
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              جاهز لتطوير هوية مشروعك العقاري أو المؤسسي؟
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80 font-medium">
              نصنع في تاج ستوديو هويات بصرية وبروفايلات احترافية تمنح مجمعك السكني أو علامتك العقارية الثقة التي تقنع كبار العملاء والمستثمرين.
            </p>
          </div>
          <Link
            href="/#contact-form"
            className="inline-flex rounded-full bg-[#FAF8F5] px-10 py-5 font-bold text-[#664936] transition hover:-translate-y-1 hover:shadow-2xl shadow-xl text-lg items-center gap-2"
          >
            ابدأ مشروعك العقاري
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </FadeIn>
      </section>

      {/* ── MORE CASE STUDIES ── */}
      <section className="bg-[#FAF8F5] pt-16 pb-24 border-t border-[#E8E2D8]">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#664936] mb-2">More Portfolio</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#2C241E]">دراسات حالة أخرى</h2>
            </div>
            <Link
              href="/work"
              className="mt-4 sm:mt-0 font-bold text-[#664936] hover:underline flex items-center gap-2"
            >
              عرض كل الأعمال ←
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/work/agricultural-development-association-brand-identity"
              className="bg-white rounded-3xl p-6 border border-[#E8E2D8] hover:shadow-lg transition-all group"
            >
              <span className="text-xs font-bold text-[#84CC16] uppercase">هوية مؤسسية</span>
              <h3 className="text-xl font-bold text-[#2C241E] mt-2 group-hover:text-[#664936] transition-colors">
                جمعية التنمية الزراعية
              </h3>
              <p className="text-sm text-[#6B5E54] mt-2">نظام بصري حديث للقطاع الزراعي والاستدامة بالأحساء.</p>
            </Link>

            <Link
              href="/work/zaatar-w-simsim-brand-identity"
              className="bg-white rounded-3xl p-6 border border-[#E8E2D8] hover:shadow-lg transition-all group"
            >
              <span className="text-xs font-bold text-[#D97706] uppercase">هوية وتغليف مطاعم</span>
              <h3 className="text-xl font-bold text-[#2C241E] mt-2 group-hover:text-[#664936] transition-colors">
                مطعم زعتر وسمسم
              </h3>
              <p className="text-sm text-[#6B5E54] mt-2">هوية بصرية دافئة وتغليف معجنات مستدام في مصر والسعودية.</p>
            </Link>

            <Link
              href="/work/ragy-burger-brand-identity"
              className="bg-white rounded-3xl p-6 border border-[#E8E2D8] hover:shadow-lg transition-all group"
            >
              <span className="text-xs font-bold text-[#DC2626] uppercase">Fast Food Branding</span>
              <h3 className="text-xl font-bold text-[#2C241E] mt-2 group-hover:text-[#664936] transition-colors">
                مطعم راجي برجر
              </h3>
              <p className="text-sm text-[#6B5E54] mt-2">تصميم هوية بصرية مفعمة بالحيوية وتغليف وجبات سريعة بالرياض.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}