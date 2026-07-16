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

  // Placeholder applications
  const applications = [
    { src: project.image, alt: "تطبيق الهوية الرسمية 1" },
    { src: project.image, alt: "تطبيق الهوية الرسمية 2" },
    { src: project.image, alt: "تطبيق الهوية الرسمية 3" },
    { src: project.image, alt: "تطبيق الهوية الرسمية 4" },
    { src: project.image, alt: "تطبيق الهوية الرسمية 5" },
    { src: project.image, alt: "تطبيق الهوية الرسمية 6" },
  ]

  const palette = [
    { name: "Forest Green", value: "#1A2F1B", text: "text-white" },
    { name: "Leaf Green", value: "#6BA642", text: "text-white" },
    { name: "Clay Sand", value: "#D2BCA2", text: "text-[#1A2F1B]" },
    { name: "Paper White", value: "#FBFAF8", text: "text-[#1A2F1B]" },
  ]

  return (
    <main className="bg-[#fbfaf8] text-[#1A2F1B] relative selection:bg-[#6BA642] selection:text-white">
      {/* ── Premium Noise Overlay ── */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 mix-blend-multiply opacity-[0.03]"
        style={{ backgroundImage: "url('/noise.svg')" }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── EDITORIAL SPLIT HERO ── */}
      <section className="min-h-screen border-b border-[#1A2F1B]/10 grid lg:grid-cols-2">
        {/* Left/Top side: Typography & Info */}
        <div className="flex flex-col justify-between px-6 py-12 sm:px-12 lg:px-20 lg:py-24 pt-32 lg:pt-32 bg-[#FBFAF8] relative z-10">
          <div>
            <nav className="mb-16 text-xs font-bold text-[#1A2F1B]/50 uppercase tracking-[0.2em] flex gap-3 items-center" aria-label="مسار التنقل">
              <Link href="/" className="hover:text-[#6BA642] transition-colors">الرئيسية</Link>
              <span>—</span>
              <Link href="/work" className="hover:text-[#6BA642] transition-colors">أعمالنا</Link>
              <span>—</span>
              <span className="text-[#1A2F1B]" aria-current="page">جمعية التنمية الزراعية</span>
            </nav>

            <FadeIn direction="up" duration={0.8}>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#6BA642] mb-6">
                Institutional Identity • 018
              </p>
              <h1 className="font-serif text-5xl sm:text-7xl font-light leading-[1.1] tracking-tight">
                أصالة الأرض،
                <br />
                <span className="font-bold text-[#1A2F1B] italic">ونماء المستقبل.</span>
              </h1>
              <p className="mt-10 max-w-lg text-lg leading-relaxed text-[#1A2F1B]/70">
                إعادة صياغة الهوية البصرية لجمعية التنمية الزراعية بالأحساء لتكون أيقونة للمؤسسية، والجذور العميقة، والتنمية المستدامة.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.3} className="mt-20">
            <div className="grid grid-cols-2 gap-8 border-t border-[#1A2F1B]/10 pt-8 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A2F1B]/40 mb-2">العميل</p>
                <p className="font-medium text-[#1A2F1B]">{project.client}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A2F1B]/40 mb-2">النطاق</p>
                <p className="font-medium text-[#1A2F1B]">{project.location}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A2F1B]/40 mb-2">الخدمة</p>
                <p className="font-medium text-[#1A2F1B]">{project.service}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A2F1B]/40 mb-2">السنة</p>
                <p className="font-medium text-[#1A2F1B]">2023</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right/Bottom side: Image */}
        <div className="relative min-h-[500px] lg:min-h-screen w-full lg:border-r border-[#1A2F1B]/10 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[4s] hover:scale-105"
            priority
          />
        </div>
      </section>

      {/* ── THE EDITORIAL CONCEPT ── */}
      <section className="relative mx-auto max-w-[1500px] border-x border-[#1A2F1B]/10 bg-[#fbfaf8]">
        {/* Massive Watermark */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          <span className="font-serif text-[20vw] font-black text-[#1A2F1B]/[0.02] whitespace-nowrap">
            AGRICULTURE
          </span>
        </div>

        <div className="grid lg:grid-cols-12 relative z-10">
          <div className="lg:col-span-5 p-8 sm:p-16 lg:p-24 border-b lg:border-b-0 lg:border-l border-[#1A2F1B]/10">
            <FadeIn direction="right">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#6BA642]">
                The Challenge
              </p>
              <h2 className="mt-8 font-serif text-3xl sm:text-4xl font-bold leading-snug">
                كيف نمزج بين رسمية المؤسسات وحيوية الطبيعة؟
              </h2>
            </FadeIn>
          </div>
          <div className="lg:col-span-7 p-8 sm:p-16 lg:p-24 bg-white/50 backdrop-blur-sm">
            <FadeIn direction="left" delay={0.2}>
              <p className="text-lg leading-loose text-[#1A2F1B]/80 columns-1 md:columns-2 gap-10">
                {project.problem} كان التحدي الأكبر هو إنشاء نظام بصري يعبر بوضوح عن الطابع الرسمي والموثوق للجمعية، وبنفس الوقت لا يفقد ارتباطه العميق بالأرض والزراعة في منطقة الأحساء. <br/><br/>
                الحل لم يكن في تعقيد الشعار، بل في تبسيط الرمز واستلهام الألوان والخطوط من التراث والطبيعة، لتكون الهوية قادرة على الحضور بثبات في المخاطبات الرسمية والفعاليات المجتمعية على حد سواء.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── VISUAL SYSTEM (MAGAZINE SPREAD) ── */}
      <section className="mx-auto max-w-[1500px] border-x border-[#1A2F1B]/10 border-t bg-[#1A2F1B] text-[#fbfaf8]">
        <div className="grid lg:grid-cols-2">
          
          {/* Colors */}
          <div className="p-8 sm:p-16 lg:p-24 border-b lg:border-b-0 lg:border-l border-white/10">
            <FadeIn direction="up">
              <h3 className="font-serif text-3xl font-light mb-16">
                لوحة الألوان المستلهمة من <span className="font-bold italic text-[#6BA642]">أرض الأحساء.</span>
              </h3>
              
              <div className="space-y-6">
                {palette.map((color, i) => (
                  <div key={color.name} className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full border border-white/20 transition-transform group-hover:scale-110 flex-shrink-0" style={{ backgroundColor: color.value }} />
                    <div className="border-b border-white/10 pb-4 flex-grow flex justify-between items-end">
                      <p className="font-serif text-xl">{color.name}</p>
                      <p className="font-mono text-xs opacity-50 tracking-widest">{color.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Typography */}
          <div className="p-8 sm:p-16 lg:p-24 relative overflow-hidden bg-[#132214]">
            <FadeIn direction="up" delay={0.2} className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#6BA642] mb-4">
                  Typography
                </p>
                <p className="font-serif text-8xl sm:text-9xl font-light text-white/10 mb-8 select-none">
                  ع‌غ
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-4">Saudi Font</h3>
                <p className="text-lg leading-relaxed text-white/60">
                  اختيار خط Saudi Font لم يكن لمجرد الشكل، بل لأنه خط وطني يعبر عن الأصالة والخير، ويدعم الهوية السعودية بخطوط واضحة ومقروئية عالية في المخاطبات الرسمية، مما يمنح الجمعية صوتاً رسمياً ورصيناً.
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ── DESIGN RATIONALE ── */}
      <section className="mx-auto max-w-[1500px] border-x border-[#1A2F1B]/10 bg-[#fbfaf8]">
        <div className="p-8 sm:p-16 lg:p-24">
          <FadeIn direction="up">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-center max-w-3xl mx-auto leading-tight mb-20">
              فلسفة بصرية تتحدث بلغة الأرض والتنمية.
            </h2>
          </FadeIn>

          <FadeInStaggerContainer className="grid md:grid-cols-3 gap-px bg-[#1A2F1B]/10 border border-[#1A2F1B]/10">
            {[
              {
                title: "الأخضر الداكن",
                desc: "يعبر عن الرسوخ والاستقرار المؤسسي، وهو اللون الذي يغلف المراسلات الرسمية ليعطي هيبة للجمعية."
              },
              {
                title: "الأخضر الحيوي",
                desc: "يرمز للنماء، الزراعة، والتجدد المستمر، ويستخدم في لفت الانتباه وتظليل العناصر التفاعلية."
              },
              {
                title: "الترابي الرملي",
                desc: "يوازن برودة الألوان الرسمية ويضيف الدفء، مستوحى من طبيعة الأحساء ليعكس الجذور والارتباط بالمجتمع."
              }
            ].map((item, i) => (
              <FadeInStaggerItem key={i} direction="up" className="bg-[#fbfaf8] p-10 sm:p-14 hover:bg-white transition-colors">
                <span className="text-4xl font-serif text-[#1A2F1B]/10 mb-6 block">0{i+1}</span>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="leading-loose text-[#1A2F1B]/70">{item.desc}</p>
              </FadeInStaggerItem>
            ))}
          </FadeInStaggerContainer>
        </div>
      </section>

      {/* ── APPLICATIONS GRID ── */}
      <section className="mx-auto max-w-[1500px] border-x border-t border-[#1A2F1B]/10 bg-[#fbfaf8] overflow-hidden">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A2F1B]/10">
          
          <div className="md:col-span-2 lg:col-span-3 bg-[#FBFAF8] p-8 sm:p-16 text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#6BA642]">
              Applications
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold">حضور رسمي وراقي</h2>
          </div>

          {applications.map((app, i) => (
            <FadeInStaggerItem 
              key={i} 
              direction="up" 
              className={`relative bg-white aspect-[4/5] group overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-[16/9]' : ''}`}
            >
              <Image 
                src={app.src} 
                alt={app.alt} 
                fill 
                className="object-cover opacity-90 transition-transform duration-[2s] group-hover:scale-105" 
              />
            </FadeInStaggerItem>
          ))}
        </div>
      </section>

      {/* ── THE SOLUTION & DELIVERABLES ── */}
      <section className="mx-auto max-w-[1500px] border-x border-[#1A2F1B]/10 bg-[#1A2F1B] text-white">
        <div className="grid lg:grid-cols-[1fr_0.8fr]">
          
          <div className="p-8 sm:p-16 lg:p-24 border-b lg:border-b-0 lg:border-l border-white/10 flex flex-col justify-center">
            <FadeIn direction="up">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#6BA642] mb-6">
                The Solution
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-light leading-tight mb-8">
                نظام بصري يعزز من مكانة الجمعية.
              </h2>
              <p className="text-lg leading-relaxed text-white/70 max-w-2xl">
                النتيجة هي هوية مؤسسية مرنة وموثوقة، تعبر عن الاستدامة والتطوير، وتتيح للجمعية الظهور بأفضل صورة في كل المخاطبات، الفعاليات، والشراكات المجتمعية.
              </p>
            </FadeIn>
          </div>

          <div className="p-8 sm:p-16 lg:p-24 bg-[#152516]">
            <FadeIn direction="up" delay={0.2}>
              <h3 className="text-2xl font-bold mb-10">المُخرجات (Deliverables)</h3>
              <ul className="space-y-6">
                {[
                  "ملفات الشعار بالصيغ الرسمية",
                  "ورق المراسلات، الأظرف، كروت العمل",
                  "الدليل البصري (Brand Guidelines)",
                  "قوالب العروض التقديمية والتقارير",
                  "مستلزمات الفعاليات والمعارض"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/80 border-b border-white/10 pb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6BA642] block" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ── CLIENT TESTIMONIAL ── */}
      <section className="mx-auto max-w-[1500px] border-x border-[#1A2F1B]/10 bg-[#fbfaf8] py-32 relative">
        <FadeIn direction="up" className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-serif text-8xl text-[#6BA642]/20 leading-none mb-6">"</p>
          <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-snug text-[#1A2F1B]">
            الهوية الجديدة أعطت الجمعية طابعاً رسمياً يعكس مكانتنا ودورنا الحقيقي في التنمية المستدامة، وأصبح حضورنا في المخاطبات أقوى بكثير.
          </blockquote>
          <div className="mt-12">
            <p className="font-bold text-lg text-[#1A2F1B]">إدارة الجمعية</p>
            <p className="text-sm text-[#1A2F1B]/50 mt-1 uppercase tracking-widest">المملكة العربية السعودية</p>
          </div>
        </FadeIn>
      </section>

      {/* ── RELATED WORK ── */}
      <section className="mx-auto max-w-[1500px] border-x border-t border-[#1A2F1B]/10 bg-white">
        <div className="grid sm:grid-cols-2 gap-px bg-[#1A2F1B]/10">
          {[
            {
              slug: "zaatar-w-simsim-brand-identity",
              title: "هوية مطعم زعتر وسمسم",
              category: "هوية بصرية للمطاعم",
              image: "/images/zaatar-box-highres.jpg",
            },
            {
              slug: "ragy-burger-brand-identity",
              title: "برجر راجي",
              category: "هوية مطاعم فاست فود",
              image: "/images/ragy-identity-portfolio.webp",
            },
          ].map((relatedItem) => (
            <Link
              key={relatedItem.slug}
              href={`/work/${relatedItem.slug}`}
              className="group relative block aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-white"
            >
              <Image
                src={relatedItem.image}
                alt={relatedItem.title}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F1B]/90 via-[#1A2F1B]/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full flex justify-between items-end">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#6BA642] mb-3">
                    {relatedItem.category}
                  </p>
                  <h3 className="text-2xl font-serif text-white">{relatedItem.title}</h3>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#6BA642] group-hover:border-[#6BA642] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <section className="mx-auto max-w-[1500px] border-x border-t border-[#1A2F1B]/10 bg-[#fbfaf8]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-8 sm:p-12 text-sm text-[#1A2F1B]/50">
          <Link href="/work" className="font-bold text-[#1A2F1B] hover:text-[#6BA642] transition-colors">
            ← العودة إلى الأعمال
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            TAG/018 — Agricultural Dev
          </span>
          <Link href="/services/visual-identity" className="font-bold text-[#1A2F1B] hover:text-[#6BA642] transition-colors">
            خدمة تصميم الهوية البصرية →
          </Link>
        </div>
      </section>
    </main>
  )
}
