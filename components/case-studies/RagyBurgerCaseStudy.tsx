"use client"

import Image from "next/image"
import Link from "next/link"
import { caseStudies } from "@/lib/caseStudies"
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn"
import { Fredoka } from "next/font/google"

const fredoka = Fredoka({ subsets: ["latin"], weight: ["700"] })

const baseUrl = "https://www.wearetagstudio.com"

export default function RagyBurgerCaseStudy() {
  const project = caseStudies.find(
    (item) => item.slug === "ragy-burger-brand-identity"
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
      "@type": "Restaurant",
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
    { src: project.image, alt: "تغليف برجر راجي 1" },
    { src: project.image, alt: "تغليف برجر راجي 2" },
    { src: project.image, alt: "تغليف برجر راجي 3" },
    { src: project.image, alt: "تغليف برجر راجي 4" },
    { src: project.image, alt: "تغليف برجر راجي 5" },
    { src: project.image, alt: "تغليف برجر راجي 6" },
  ]

  const palette = [
    { name: "Spicy Red", value: "#E31E24", text: "text-white" },
    { name: "Cheese Yellow", value: "#FFC222", text: "text-[#0a0a0a]" },
    { name: "Charcoal", value: "#1A1A1A", text: "text-white" },
    { name: "Dough", value: "#F4ECE1", text: "text-[#0a0a0a]" },
  ]

  return (
    <main className="bg-[#0a0a0a] text-white relative selection:bg-[#E31E24] selection:text-white">
      {/* ── Premium Noise Overlay ── */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 mix-blend-screen opacity-[0.05]"
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

      {/* ── EDGE-TO-EDGE HERO ── */}
      <section className="relative h-screen min-h-[800px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-60 brightness-75 transition-transform duration-[3s] hover:scale-105"
            priority
          />
        </div>
        
        {/* Gradients to blend with background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-4 sm:px-8 lg:px-16 max-w-[1500px] mx-auto w-full">
          {/* Breadcrumb - Over image */}
          <nav className="mb-12 text-sm font-bold text-white/50 tracking-wider" aria-label="مسار التنقل">
            <Link href="/" className="hover:text-[#FFC222] transition-colors">
              الرئيسية
            </Link>
            <span className="mx-3">/</span>
            <Link href="/work" className="hover:text-[#FFC222] transition-colors">
              أعمالنا
            </Link>
            <span className="mx-3">/</span>
            <span className="text-white" aria-current="page">برجر راجي</span>
          </nav>

          <FadeIn direction="up" duration={0.8} delay={0.2}>
            <p className="mb-4 inline-block bg-[#E31E24] px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-white">
              Project No. 015
            </p>
            <h1 
              className={`${fredoka.className} text-[5rem] font-black leading-[0.85] tracking-tight sm:text-[8rem] lg:text-[11rem] text-[#E31E24]`}
              style={{ 
                textShadow: "3px 3px 0px #fff, -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff, 0px 3px 0px #fff, 0px 0px 15px rgba(227,30,36,0.5)",
                WebkitTextStroke: "1px #E31E24"
              }}
            >
              BURGER
              <br />
              <span className="pl-4 sm:pl-8">RAGY</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-bold leading-relaxed text-white/80 sm:text-3xl">
              هوية جريئة، صاخبة، وتخطف الأنظار في شارع مزدحم بالمنافسين.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CSS MARQUEE TAPE ── */}
      <div className="relative flex overflow-x-hidden bg-[#FFC222] py-4 text-[#0a0a0a] -rotate-2 scale-105 transform-gpu z-10 border-y-4 border-black">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: flex;
            white-space: nowrap;
            animation: marquee 20s linear infinite;
          }
        `}} />
        <div className="animate-marquee items-center font-black text-3xl sm:text-5xl uppercase tracking-widest">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-6 flex items-center">
              FRESH & BOLD <span className="mx-6 text-[#E31E24] text-5xl">★</span> RAGY BURGER
            </span>
          ))}
        </div>
      </div>

      {/* ── THE CREATIVE CONCEPT ── */}
      <section className="relative mt-24 mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
          <FadeIn direction="right">
            <div className="relative">
              {/* Massive background text */}
              <span className="absolute -left-10 -top-20 z-0 text-[15rem] font-black leading-none text-white/[0.03] select-none">
                FIRE
              </span>
              <div className="relative z-10">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-[#FFC222]">
                  The Concept
                </p>
                <h2 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight">
                  الشارع يحتاج إلى هوية تصرخ بالجوع!
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-white/70">
                  سوق مطاعم البرجر في الرياض لا يرحم. التصميم الهادئ والمؤسسي لا مكان له هنا. لكي ينجح "برجر راجي"، كان لابد أن تكون هويته البصرية صاخبة ومليئة بالطاقة والحيوية. انطلقنا من فكرة الشواء اللاهب وسرعة التقديم لبناء نظام بصري يفتح الشهية قبل حتى أن تتذوق الطعام.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="relative h-[600px] w-full">
            {/* Edge image with hard offset borders */}
            <div className="absolute inset-0 border-4 border-[#E31E24] translate-x-4 translate-y-4" />
            <div className="absolute inset-0 bg-[#1A1A1A]">
              <Image
                src={project.image}
                alt="فكرة برجر راجي"
                fill
                className="object-cover opacity-80"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── VISUAL LANGUAGE (DARK & BOLD) ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Colors */}
          <FadeIn direction="up">
            <div className="bg-[#111] p-10 border border-white/10 h-full">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#FFC222]">Colors</p>
              <h2 className="mt-4 text-3xl font-black">ألوان تفتح الشهية</h2>
              
              <div className="mt-12 grid grid-cols-2 gap-4">
                {palette.map((color, i) => (
                  <div 
                    key={color.name}
                    className={`aspect-square p-6 flex flex-col justify-between transition-transform hover:scale-105 ${color.text}`}
                    style={{ backgroundColor: color.value }}
                  >
                    <span className="text-4xl font-black opacity-20">0{i+1}</span>
                    <div>
                      <p className="font-bold text-lg">{color.name}</p>
                      <p className="font-mono text-sm opacity-80 mt-1">{color.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Typography */}
          <FadeIn direction="up" delay={0.2}>
            <div className="bg-[#E31E24] p-10 h-full flex flex-col justify-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-black">Typography</p>
              <h2 className="mt-4 text-3xl font-black text-black">خطوط تصرخ بالقوة</h2>
              
              <div className="mt-16 text-center">
                <p className="font-serif text-[10rem] font-black leading-none text-white drop-shadow-xl">Aa</p>
                <div className="mt-12 bg-black p-8 text-left text-white inline-block w-full">
                  <p className="text-4xl font-black text-[#FFC222]">URBAN BLACK FONT</p>
                  <p className="mt-4 text-lg leading-relaxed opacity-90">
                    استخدمنا أوزان الـ Black والـ Extra Bold حصرياً. خطوط هندسية حادة لا تعتذر عن حجمها ومساحتها، تقرأها من الجهة المقابلة للشارع بكل وضوح.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DESIGN RATIONALE ── */}
      <section className="bg-[#111] py-24 border-y border-white/10">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-black text-white">لماذا هذا التوجه؟</h2>
            <p className="mt-6 text-xl text-white/60">
              لم نكن نبحث عن الأناقة المفرطة، بل عن الجرأة والوضوح والحضور الطاغي.
            </p>
          </div>

          <FadeInStaggerContainer className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "طاقة الأحمر",
                desc: "الأحمر لا يفتح الشهية فحسب، بل يصنع حالة من الاستعجال والترقب الإيجابي، وهو المطلوب في مطاعم الفاست فود.",
                num: "01"
              },
              {
                title: "تباين قاسي",
                desc: "استخدام الأسود كخلفية أساسية بدلاً من الأبيض، ليجعل اللون الأحمر والأصفر يقفزان من العبوة ليضربا العين مباشرة.",
                num: "02"
              },
              {
                title: "رمز غير تقليدي",
                desc: "ابتعدنا عن رسمة البرجر المستهلكة، واستخدمنا أشكالاً هندسية حرة تعبر عن الطاقة والحركة.",
                num: "03"
              }
            ].map((item) => (
              <FadeInStaggerItem key={item.num} direction="up" className="relative p-10 bg-[#1A1A1A] border-t-4 border-[#E31E24] hover:bg-[#222] transition-colors">
                <span className="absolute right-6 top-6 text-5xl font-black text-white/5">{item.num}</span>
                <h3 className="text-2xl font-black mt-4">{item.title}</h3>
                <p className="mt-6 leading-relaxed text-white/60">{item.desc}</p>
              </FadeInStaggerItem>
            ))}
          </FadeInStaggerContainer>
        </div>
      </section>

      {/* ── APPLICATIONS GALLERY (MASONRY-ISH) ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-5xl font-black">التطبيقات</h2>
            <p className="mt-4 text-xl text-white/60 max-w-lg">
              الهوية في أقوى صورها على التغليف، الأكياس، والزي الرسمي.
            </p>
          </div>
          <div className="bg-[#E31E24] w-24 h-4" />
        </div>

        <FadeInStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, i) => (
            <FadeInStaggerItem 
              key={i} 
              direction="up" 
              className={`relative bg-[#1A1A1A] overflow-hidden group ${i === 0 || i === 3 ? 'md:col-span-2 lg:col-span-2 aspect-[21/9]' : 'aspect-square'}`}
            >
              <Image 
                src={app.src} 
                alt={app.alt} 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <p className="font-bold text-white text-lg">{app.alt}</p>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStaggerContainer>
      </section>

      {/* ── DELIVERABLES ── */}
      <section className="bg-[#E31E24] text-black">
        <div className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-6xl font-black uppercase tracking-tighter">ماذا سُلِّم للعميل؟</h2>
              <div className="mt-12 space-y-6">
                {[
                  "ملفات الشعار بأوزان وألوان مختلفة للطباعة والديجيتال",
                  "تصميم شامل للعلب، أوراق اللف، الأكياس والمطبوعات",
                  "دليل هوية بصري (Brand Guidelines) كامل",
                  "قوالب سوشيال ميديا قابلة للتعديل للحملات الإعلانية",
                  "تصميم المنيو المطبوع والرقمي"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 bg-black/10 p-6 font-bold text-xl">
                    <span className="text-[#FFC222] text-3xl">✔</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black text-white p-12 flex flex-col justify-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#FFC222]">المدة الزمنية</p>
              <p className="mt-6 text-8xl font-black">3<span className="text-4xl"> أسابيع</span></p>
              <p className="mt-6 text-xl text-white/70">من دراسة السوق حتى تسليم الملفات النهائية جاهزة للمطبعة.</p>
              <Link
                href="/#contact-form"
                className="mt-12 bg-[#FFC222] text-black text-center py-6 text-2xl font-black uppercase hover:bg-white transition-colors"
              >
                ابدأ مشروع مطعمك الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT WORDS ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-32 sm:px-6 lg:px-8 text-center">
        <FadeIn direction="up">
          <span className="text-9xl text-[#E31E24]">"</span>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight max-w-4xl mx-auto -mt-10">
            التغليف شكله رائع جداً وجريء.. العملاء أصبحوا يتعرفون على الأكياس الخاصة بنا في الشارع من مسافة بعيدة!
          </h2>
          <p className="mt-12 text-xl font-bold text-[#FFC222]">إدارة مطعم برجر راجي — الرياض</p>
        </FadeIn>
      </section>

      {/* ── RELATED WORK ── */}
      <section className="bg-[#111] border-t border-white/10">
        <div className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl font-black">مشاريع أخرى</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                slug: "zaatar-w-simsim-brand-identity",
                title: "مطعم زعتر وسمسم",
                category: "هوية مطاعم",
                image: "/images/zaatar-box-highres.jpg",
              },
              {
                slug: "agricultural-development-association-brand-identity",
                title: "جمعية التنمية الزراعية",
                category: "هوية مؤسسية",
                image: "/images/agricultural-development-association.avif",
              },
            ].map((related) => (
              <Link key={related.slug} href={`/work/${related.slug}`} className="group relative block overflow-hidden aspect-[16/9]">
                <Image src={related.image} alt={related.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-[#FFC222] font-black uppercase text-sm mb-2">{related.category}</p>
                  <h3 className="text-3xl font-black text-white">{related.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <section className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 px-6 py-12 text-sm text-white/50 sm:flex-row sm:items-center lg:px-8 border-t border-white/10">
        <Link href="/work" className="font-bold text-white hover:text-[#E31E24]">
          ← العودة إلى كل الأعمال
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          TAG/015 — Ragy Burger
        </span>
        <Link href="/services/visual-identity" className="font-bold text-white hover:text-[#E31E24]">
          تعرف على خدمة تصميم الهوية البصرية →
        </Link>
      </section>
    </main>
  )
}
