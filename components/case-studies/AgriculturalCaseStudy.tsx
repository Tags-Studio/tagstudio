"use client"

import Image from "next/image"
import Link from "next/link"
import { caseStudies } from "@/lib/caseStudies"
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn"

const baseUrl = "https://www.wearetagstudio.com"

export default function AgriculturalCaseStudy() {
  const project = caseStudies.find(
    (item) => item.slug === "agricultural-development-association-brand-identity"
  )!

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/work/${project.slug}#creative-work`,
    name: project.title,
    description: project.solution,
    image: `${baseUrl}${project.image}`,
    genre: "Brand Identity Design",
    inLanguage: "ar",
    creator: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "تاج ستوديو",
      url: baseUrl,
    },
    about: {
      "@type": "Organization",
      name: project.client,
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

  const applications = [
    { src: project.image, alt: "تطبيق الهوية الرقمي 1" },
    { src: project.image, alt: "تطبيق الهوية الرقمي 2" },
    { src: project.image, alt: "تطبيق الهوية الرقمي 3" },
    { src: project.image, alt: "تطبيق الهوية الرقمي 4" },
  ]

  const palette = [
    { name: "Neon Lime", value: "#84CC16", text: "text-white" },
    { name: "Eco Green", value: "#22C55E", text: "text-white" },
    { name: "Slate Dark", value: "#1E293B", text: "text-white" },
    { name: "Cloud White", value: "#F8FAFC", text: "text-[#1E293B]" },
  ]

  return (
    <main className="bg-[#f4f6f8] text-[#1E293B] relative overflow-hidden selection:bg-[#84CC16] selection:text-white">
      {/* ── Background Glowing Orbs ── */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#84CC16]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-[#22C55E]/10 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── MODERN HERO ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto min-h-[90vh] flex flex-col justify-center">
        <nav className="mb-8 text-sm font-bold text-[#64748B] tracking-wide flex gap-3 items-center" aria-label="مسار التنقل">
          <Link href="/" className="hover:text-[#84CC16] transition-colors">الرئيسية</Link>
          <span className="text-[#CBD5E1]">/</span>
          <Link href="/work" className="hover:text-[#84CC16] transition-colors">أعمالنا</Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#1E293B] bg-white px-3 py-1 rounded-full shadow-sm" aria-current="page">الجمعية الزراعية</span>
        </nav>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-center">
          <FadeIn direction="up" duration={0.8}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84CC16] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#84CC16]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#475569]">
                Sustainable Identity
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[1.1] tracking-tight text-[#0F172A]">
              زراعة الأمس، <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#84CC16] to-[#22C55E]">
                بتكنولوجيا الغد.
              </span>
            </h1>
            
            <p className="mt-8 text-xl leading-relaxed text-[#475569] max-w-xl">
              إعادة تصور هوية جمعية التنمية الزراعية كمنصة رائدة ومبتكرة في مجال الاستدامة والتقنية الخضراء، بدلاً من الصورة النمطية للزراعة التقليدية.
            </p>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: "العميل", value: project.client },
                { label: "الخدمة", value: "هوية بصرية" },
                { label: "القطاع", value: "الاستدامة" },
                { label: "السنة", value: "2023" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <p className="text-xs font-bold text-[#94A3B8] mb-2">{stat.label}</p>
                  <p className="text-sm font-bold text-[#1E293B]">{stat.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="left" duration={1} delay={0.2} className="relative aspect-square lg:aspect-auto lg:h-[650px] w-full">
            {/* Glass Container for Image */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_20px_40px_rgb(132,204,22,0.1)] p-4 sm:p-6 transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-[3s] hover:scale-105"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── THE APPROACH (AGRITECH STYLE) ── */}
      <section className="relative mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_60px_rgb(0,0,0,0.03)] p-10 sm:p-16 lg:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#84CC16]/20 to-transparent rounded-full blur-3xl" />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <div className="w-16 h-16 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-8 text-[#22C55E]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] leading-tight">
                من التقليد إلى الابتكار
              </h2>
            </div>
            
            <div className="flex flex-col justify-center">
              <p className="text-xl leading-loose text-[#475569]">
                المؤسسات الزراعية تواجه تحدياً في الظهور بمظهر عصري يواكب رؤية الاستدامة العالمية. لم نرد أن تكون الهوية مجرد "نخلة ولون أخضر غامق". أردنا أن تعبر عن التكنولوجيا، الكفاءة، والنماء الذكي.
              </p>
              <div className="mt-8 p-6 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                <p className="text-[#334155] font-medium leading-relaxed">
                  الحل هو نظام بصري ديناميكي يعتمد على الإضاءة، الشفافية، والألوان المشعة التي تعطي انطباعاً بأن هذه الجمعية تقود المستقبل الأخضر.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISUAL SYSTEM (DATA DRIVEN) ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Colors Card */}
          <FadeIn direction="up" className="lg:col-span-2 bg-[#0F172A] rounded-[3rem] p-10 sm:p-16 text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#84CC16]/20 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-12">نظام ألوان مستدام</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {palette.map((color, i) => (
                  <div key={color.name} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl flex-shrink-0 shadow-inner" style={{ backgroundColor: color.value }} />
                    <div>
                      <p className="font-bold text-lg">{color.name}</p>
                      <p className="text-sm text-white/50 font-mono mt-1">{color.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Typography Card */}
          <FadeIn direction="up" delay={0.2} className="bg-white rounded-[3rem] p-10 sm:p-16 border border-slate-100 shadow-[0_20px_40px_rgb(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="inline-flex px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-[#64748B] mb-8">
                Typography
              </div>
              <h3 className="text-3xl font-black text-[#0F172A] mb-4">الخطوط</h3>
              <p className="text-[#64748B] leading-relaxed">
                استخدمنا خطوطاً خالية من التذييل (Sans-Serif) هندسية بالكامل، تبرز البيانات بوضوح تام وتدعم المظهر التقني للهوية.
              </p>
            </div>
            
            <div className="mt-12 bg-[#F8FAFC] rounded-2xl p-8 border border-slate-200 text-center">
              <span className="text-7xl font-black text-[#0F172A]">Aa</span>
              <p className="mt-4 font-bold text-[#475569]">Modern Geometric</p>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── DIGITAL APPLICATIONS ── */}
      <section className="relative mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] leading-tight mb-6">
            تطبيقات تواكب العصر الرقمي
          </h2>
          <p className="text-xl text-[#64748B]">
            تم تصميم الهوية لتكون مثالية على الشاشات أولاً (Digital First)، مما يسهل تواصل الجمعية مع جمهورها بشكل عصري عبر المنصات المختلفة.
          </p>
        </div>

        <FadeInStaggerContainer className="grid md:grid-cols-2 gap-8">
          {applications.map((app, i) => (
            <FadeInStaggerItem 
              key={i} 
              direction="up" 
              className="group relative bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_rgb(132,204,22,0.08)] transition-all duration-500"
            >
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-50">
                <Image 
                  src={app.src} 
                  alt={app.alt} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStaggerContainer>
      </section>

      {/* ── THE IMPACT (DELIVERABLES) ── */}
      <section className="bg-white border-t border-slate-100 mt-12">
        <div className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] rounded-[3rem] p-10 sm:p-20 relative overflow-hidden text-white">
            <div className="absolute inset-0 opacity-20 bg-[url('/noise.svg')] mix-blend-overlay" />
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#84CC16]/30 to-transparent rounded-full blur-[100px]" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl font-black mb-6">ماذا سلمنا للجمعية؟</h2>
                <p className="text-lg text-white/70 leading-relaxed mb-12">
                  نظام تصميم شامل (Design System) جاهز للتشغيل الرقمي والمطبوع، يدعم تحول الجمعية لكيان يعتمد على التقنية في برامجه.
                </p>
                
                <div className="space-y-6">
                  {[
                    { icon: "🌐", text: "أصول رقمية لمنصات التواصل والموقع الإلكتروني" },
                    { icon: "📄", text: "قوالب تقارير تفاعلية لعرض إنجازات الاستدامة" },
                    { icon: "📗", text: "دليل هوية بصرية رقمي لتوجيه المطورين والمصممين" },
                    { icon: "🏢", text: "تصميم للمطبوعات والمرافق يدمج بين الطبيعة والزجاج" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                      <span className="text-2xl">{item.icon}</span>
                      <p className="font-bold">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-10 sm:p-14 border border-white/10 text-center">
                <div className="w-20 h-20 bg-[#84CC16]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#84CC16]">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">مدة التنفيذ</p>
                <p className="text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">4 أسابيع</p>
                <Link
                  href="/#contact-form"
                  className="inline-block w-full bg-[#84CC16] hover:bg-[#65A30D] text-[#0F172A] font-black py-5 rounded-2xl transition-colors text-lg"
                >
                  ابدأ تحديث مؤسستك
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MORE WORK ── */}
      <section className="bg-[#f4f6f8] pt-12 pb-24">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-[#0F172A]">مشاريع أخرى</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                slug: "zaatar-w-simsim-brand-identity",
                title: "هوية مطعم زعتر وسمسم",
                category: "قطاع الأغذية",
                image: "/images/zaatar-box-highres.jpg",
              },
              {
                slug: "ragy-burger-brand-identity",
                title: "برجر راجي",
                category: "مطاعم سريعة",
                image: "/images/ragy-identity-portfolio.webp",
              },
            ].map((relatedItem) => (
              <Link
                key={relatedItem.slug}
                href={`/work/${relatedItem.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-white border border-slate-200 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <Image
                    src={relatedItem.image}
                    alt={relatedItem.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-xs font-bold text-[#84CC16] mb-2 uppercase tracking-widest">{relatedItem.category}</p>
                <h3 className="text-2xl font-black text-[#0F172A] group-hover:text-[#84CC16] transition-colors">{relatedItem.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <section className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm">
        <Link href="/work" className="font-bold text-[#64748B] hover:text-[#84CC16] transition-colors">
          ← العودة إلى الأعمال
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#94A3B8]">
          TAG/018 — Agricultural Dev
        </span>
        <Link href="/services/visual-identity" className="font-bold text-[#64748B] hover:text-[#84CC16] transition-colors">
          خدمة تصميم الهوية البصرية →
        </Link>
      </section>
    </main>
  )
}
