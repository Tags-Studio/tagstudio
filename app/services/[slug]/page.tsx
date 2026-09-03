import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServiceBySlug, services } from "@/lib/servicesData"
import { blogPosts } from "@/lib/blogData"
import ServicePortfolioGrid from "@/app/components/ServicePortfolioGrid"

type Props = {
  params: {
    slug: string
  }
}

const baseUrl = "https://www.wearetagstudio.com"

const tagMethod = [
  {
    letter: "T",
    title: "Target — نفهم السوق والجمهور",
    description:
      "نبدأ بفهم النشاط، الجمهور المستهدف، المنافسين، وأهداف المشروع حتى يكون كل قرار بصري مبنيًا على سياق حقيقي.",
  },
  {
    letter: "A",
    title: "Alignment — نوحّد الاستراتيجية والتصميم",
    description:
      "نحوّل الفكرة والقيم إلى اتجاه بصري واضح، ثم نراجع اتساقه مع شخصية العلامة وطريقة ظهورها أمام العملاء.",
  },
  {
    letter: "G",
    title: "Growth-ready — نبني نظامًا قابلًا للنمو",
    description:
      "نسلّم عناصر وملفات منظمة يمكن تطبيقها وتطويرها عبر المنصات والمطبوعات مع توسع المشروع.",
  },
]

const fitPoints = [
  "مشروع جديد محتاج نظام بصري واضح ومستقر من البداية.",
  "هويتك متفرقة وتائهة بين القنوات والمقاسات المختلفة.",
  "مخطط للتوسع وتأكيد حضورك في السوق المصري والسعودي.",
]

const notFitPoints = [
  "عايز عنصر واحد بسرعة وبدون دراسة متكاملة لمشروعك.",
  "مش محدد نشاطك التجاري أو طبيعة جمهورك المستهدف بعد.",
  "عايز أرخص سعر وبس بدون اهتمام بالجودة أو الاستراتيجية.",
]

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    return {}
  }

  const canonical = `${baseUrl}/services/${service.slug}`

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${service.metaTitle} | تاج ستوديو`,
      description: service.metaDescription,
      url: canonical,
      siteName: "تاج ستوديو",
      locale: "ar_EG",
      type: "website",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.shortTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} | تاج ستوديو`,
      description: service.metaDescription,
      images: [service.image],
    },
  }
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  const canonical = `${baseUrl}/services/${service.slug}`

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: service.title,
    description: service.metaDescription,
    url: canonical,
    image: `${baseUrl}${service.image}`,
    provider: {
      "@id": `${baseUrl}/#organization`,
      "@type": "ProfessionalService",
      name: "تاج ستوديو"
    },
    areaServed: [
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Egypt" },
      { "@type": "AdministrativeArea", name: "Gulf Cooperation Council" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.shortTitle,
      itemListElement: service.deliverables.map((d, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: d,
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock",
      }))
    }
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
        name: "الخدمات",
        item: `${baseUrl}/services/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.shortTitle,
        item: canonical,
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="relative isolate overflow-hidden bg-background text-foreground">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 lg:pt-32 pb-20 border-b border-border/60 overflow-hidden">
          {/* Ambient Background Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] pointer-events-none z-[-1]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none z-[-1]" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav aria-label="مسار التنقل" className="breadcrumb-nav mb-6">
              <Link href="/">الرئيسية</Link>
              <span className="breadcrumb-sep">/</span>
              <Link href="/services/">الخدمات</Link>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current" aria-current="page">{service.shortTitle}</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span>متاح لمشاريع جديدة — 2026</span>
                </div>

                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  {service.title}
                </h1>

                {service.subtitle && (
                  <p className="mt-5 text-xl sm:text-2xl font-bold text-primary leading-snug">
                    {service.subtitle}
                  </p>
                )}

                <p className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-2xl">
                  {service.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`https://wa.me/201009215131?text=${encodeURIComponent(
                      `مرحبًا، أريد الاستفسار عن خدمة ${service.shortTitle}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-button px-8 py-4 inline-flex items-center gap-2 text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                  >
                    <span>اطلب استشارة</span>
                    <span>↗</span>
                  </a>
                  <a
                    href="#service-portfolio"
                    className="rounded-full border border-border/80 bg-card/60 px-8 py-4 text-base font-bold text-foreground transition hover:border-primary hover:text-primary hover:bg-card"
                  >
                    شاهد الأعمال
                  </a>
                </div>

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/80 max-w-xl">
                  <div>
                    <div className="text-3xl font-extrabold text-primary sm:text-4xl">+120</div>
                    <div className="text-sm text-muted-foreground mt-1">مشروع منجز</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-foreground sm:text-4xl">2-4</div>
                    <div className="text-sm text-muted-foreground mt-1">أسابيع تسليم</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-foreground sm:text-4xl">EG<span className="text-primary">/</span>SA</div>
                    <div className="text-sm text-muted-foreground mt-1">السوق العربي</div>
                  </div>
                </div>
              </div>

              {/* Hero Image Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl group">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-6 right-6 left-6 p-4 rounded-2xl bg-background/80 backdrop-blur-md border border-border/80 text-foreground">
                    <p className="text-xs text-primary font-bold">تاج ستوديو • TAG Studio</p>
                    <p className="text-sm font-bold mt-1">{service.shortTitle} احترافية عالية الجودة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE TICKER SECTION */}
        <section className="py-6 border-b border-border bg-card/20 overflow-hidden select-none">
          <div className="flex whitespace-nowrap overflow-hidden gap-12">
            <div className="flex shrink-0 animate-marquee items-center gap-12 text-lg font-bold text-muted-foreground">
              <span className="flex items-center gap-3 text-foreground">✦ الهوية البصرية</span>
              <span className="flex items-center gap-3">✦ استراتيجية العلامة</span>
              <span className="flex items-center gap-3 text-foreground">✦ تصميم الشعار</span>
              <span className="flex items-center gap-3">✦ دليل قواعد الهوية (Brand Guidelines)</span>
              <span className="flex items-center gap-3 text-foreground">✦ تطبيقات التغليف والمطبوعات</span>
              <span className="flex items-center gap-3">✦ مصر والسعودية</span>
            </div>
            <div aria-hidden="true" className="flex shrink-0 animate-marquee items-center gap-12 text-lg font-bold text-muted-foreground">
              <span className="flex items-center gap-3 text-foreground">✦ الهوية البصرية</span>
              <span className="flex items-center gap-3">✦ استراتيجية العلامة</span>
              <span className="flex items-center gap-3 text-foreground">✦ تصميم الشعار</span>
              <span className="flex items-center gap-3">✦ دليل قواعد الهوية (Brand Guidelines)</span>
              <span className="flex items-center gap-3 text-foreground">✦ تطبيقات التغليف والمطبوعات</span>
              <span className="flex items-center gap-3">✦ مصر والسعودية</span>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION (4 STEPS) */}
        <section className="py-24 border-b border-border bg-card/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <p className="font-semibold text-primary text-sm tracking-wider uppercase">طريقة العمل — Process</p>
              <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-5xl">
                أربع خطوات تفصلك عن <span className="text-primary">هوية بصرية</span> جاهزة للتطبيق
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                عملية واضحة ومدروسة تضمن أن كل قرار بصري مبني على استراتيجية، لا على ذوق عشوائي.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, index) => (
                <div
                  key={step.title}
                  className="relative rounded-3xl border border-border/80 bg-card/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-primary">0{index + 1}</span>
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                      خطوة {index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FIT / NOT FIT COMPARISON SECTION */}
        <section className="py-24 border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="font-semibold text-primary text-sm tracking-wider uppercase">شفافية كاملة — Fit Check</p>
              <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
                هل نحن <span className="text-primary">مناسبون</span> لمشروعك؟
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                قبل أي التزام، خذ نظرة صادقة على متى تكون خدمتنا الاستثمار الصحيح لمشروعك — ومتى لا تكون.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* FIT */}
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.04] p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-emerald-500" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 tracking-wider">SUITABLE</span>
                    <h3 className="text-2xl font-extrabold text-foreground">مناسبة لك لو...</h3>
                  </div>
                </div>
                <ul className="space-y-5">
                  {fitPoints.map((point) => (
                    <li key={point} className="flex items-start gap-4 text-foreground text-base leading-relaxed">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm shrink-0 mt-1 font-bold">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* NOT FIT */}
              <div className="rounded-3xl border border-rose-500/30 bg-rose-500/[0.04] p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-rose-500" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl font-bold">
                    ✕
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-400 tracking-wider">UNSUITABLE</span>
                    <h3 className="text-2xl font-extrabold text-foreground">مش مناسبة لك لو...</h3>
                  </div>
                </div>
                <ul className="space-y-5">
                  {notFitPoints.map((point) => (
                    <li key={point} className="flex items-start gap-4 text-foreground text-base leading-relaxed">
                      <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm shrink-0 mt-1 font-bold">✕</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DELIVERABLES SECTION */}
        <section className="py-24 border-b border-border bg-card/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <p className="font-semibold text-primary text-sm tracking-wider uppercase">ماذا تستلم — Deliverables</p>
                <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-5xl">
                  مخرجات واضحة <span className="text-primary">قابلة للاستخدام</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  نهاية المشروع مش بس "شعار" — تستلم منظومة كاملة جاهزة تُطبَّق على أي قناة، مطبوعة أو رقمية.
                </p>

                {/* Formats Badge Box */}
                <div className="mt-8 p-6 rounded-2xl border border-border bg-card/80">
                  <p className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">صيغ الملفات المسلّمة للمشروع</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-background rounded-lg text-sm font-mono border border-border">.AI</span>
                    <span className="px-3 py-1.5 bg-background rounded-lg text-sm font-mono border border-border">.EPS</span>
                    <span className="px-3 py-1.5 bg-background rounded-lg text-sm font-mono border border-border">.PDF</span>
                    <span className="px-3 py-1.5 bg-background rounded-lg text-sm font-mono border border-border">.SVG</span>
                    <span className="px-3 py-1.5 bg-background rounded-lg text-sm font-mono border border-border">.PNG</span>
                    <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-mono font-bold">+ Brand Guidelines PDF</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-border bg-card/50 p-8 space-y-6">
                  {service.deliverables.map((item, idx) => (
                    <div key={item} className="flex items-start gap-4 pb-5 border-b border-border/60 last:border-0 last:pb-0 group">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0 group-hover:rotate-12 transition-transform">
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{item}</h3>
                        <p className="text-sm text-muted-foreground mt-1">تجهيز دقيق بمواصفات قياسية للطباعة والاستخدام الرقمي.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TAG METHODOLOGY (T-A-G) SECTION */}
        <section className="py-24 border-b border-border bg-card/40 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="font-semibold text-primary text-sm tracking-wider uppercase">منهجية تاج — TAG Methodology</p>
              <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-5xl">
                ليه <span className="text-primary">TAG</span>؟
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                ثلاث كلمات بيمثّلوا منهجيتنا في بناء كل هوية — من أول سؤال استراتيجي لحد آخر ملف مُسلَّم.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {tagMethod.map((step) => (
                <div
                  key={step.letter}
                  className="rounded-3xl border border-border/80 bg-background/80 p-8 lg:p-10 transition-all duration-500 hover:border-primary hover:bg-card group"
                >
                  <span className="text-8xl font-black text-primary/40 group-hover:text-primary transition-colors block mb-4" style={{ fontFamily: 'Cairo' }}>
                    {step.letter}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE PORTFOLIO GALLERY GRID */}
        <ServicePortfolioGrid serviceSlug={service.slug} serviceTitle={service.shortTitle} />

        {/* SPECIALIZED B2B SECTIONS FOR COMPANY PROFILE DESIGN */}
        {service.slug === "company-profile-design" && (
          <>
            {/* REGULATORY & OPERATIONAL CLARITY */}
            <section className="py-20 border-t border-border bg-card/10">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
                  <p className="font-semibold text-primary text-sm tracking-wider uppercase">الوضوح والحدود المهنية</p>
                  <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
                    كيف يُستخدم البروفايل المؤسسي ضمن ملفات التأهيل والمنافسات؟
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    نؤمن بالشفافية الكاملة مع عملائنا في قطاع الأعمال: البروفايل المؤسسي هو وثيقة استعراض بصرية وتنظيمية تخدم لجان الفحص لإبراز مؤهلات شركتكم بدقة وسرعة.
                  </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-background/80 p-8 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                      01
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">أداة تنظيمية واستعراضية مطلوبة</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      يُطلب الملف التعريفي ضمن مرفقات التأهيل المسبق للموردين (Vendor Pre-qualification) بجانب السجلات والقوائم المالية والتصنيف وشهادات الآيزو، لتسهيل مراجعة قدرات وخبرات الشركة من قِبل لجان المشتريات.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/80 p-8 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                      02
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">الحدود القانونية والإجرائية</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      لا توجد جهة حكومية (مثل منصة اعتماد) تصدر شهادة تسمى "بروفايل معتمد"، لكن وجود ملف احترافي يعرض سياسات السلامة (HSE) والجودة والهيكل الإداري يمنح ملف تأهيلكم الموثوقية والسرعة في اتخاذ القرار.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTOR SPECIFIC MODULE: CONTRACTING & SUPPLY (ANTI-CANNIBALIZATION) */}
            <section className="py-20 border-t border-border bg-card/30">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
                  <p className="font-semibold text-primary text-sm tracking-wider uppercase">التخصص القطاعي في المملكة</p>
                  <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
                    بروفايلات متخصصة لقطاعات المقاولات، التوريد، والخدمات الفنية
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    تختلف حاجة شركة الإنشاءات والمقاولات عن المؤسسات التجارية؛ لذلك نخصص لكل قطاع هيكله الفني الملائم لمتطلبات مشاريعه:
                  </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-background p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">شركات المقاولات والإنشاءات</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      نركز على استعراض تصنيف المقاولين، أسطول المعدات والآليات، سجل ساعات العمل بدون حوادث، ومصفوفة المشاريع المنفذة (بنية تحتية، مباني، أعمال كهروميكانيكية).
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">مؤسسات التوريد والخدمات اللوجستية</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      إبراز عقود التوزيع، الطاقة الاستيعابية للمستودعات، أسطول النقل والتوزيع، وأنظمة الجودة ومطابقة المواصفات القياسية.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">الشركات التقنية والاستشارية</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      عرض منهجيات العمل، خبرات الكوادر الاستشارية والشهادات المهنية، ونماذج التحول الرقمي وحلول الأعمال المنفذة للعملاء.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* REAL PROOF SECTION: SAKEN CASE STUDY */}
            <section className="py-24 border-t border-border bg-card/50 relative overflow-hidden">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-4">
                      نموذج إثبات واقعي • Verified Case Study
                    </span>
                    <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl leading-tight">
                      تنظيم وإخراج الوثائق المؤسسية لمجمع «ساكن» بالجبيل الصناعية
                    </h2>

                    <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                      <div className="p-4 rounded-xl border border-border bg-background/60">
                        <strong className="text-foreground block mb-1">المشكلة قبل البدء:</strong>
                        الحاجة للانتقال من ملفات تعريفية فردية إلى مظهر مؤسسي متماسك يستهدف مدراء الموارد البشرية والمشتريات في كبرى مصانع وشركات الجبيل الصناعية لتوقيع عقود إسكان مؤسسي طويلة الأجل.
                      </div>

                      <div className="p-4 rounded-xl border border-border bg-background/60">
                        <strong className="text-foreground block mb-1">التدخل البصري والهيكلي من تاج ستوديو:</strong>
                        إعادة صياغة هيكل الوثيقة، بناء مصفوفة سعة الغرف والفلل الفندقية، وتوحيد المطبوعات الرسمية ومستندات التعاقد والفواتير بنظام بصري رسمي يعكس الاستقرار والصلابة.
                      </div>

                      <div className="p-4 rounded-xl border border-border bg-background/60">
                        <strong className="text-foreground block mb-1">المخرج المعتمد:</strong>
                        وثيقة مؤسسية رقمية ومطبوعة تستخدمها إدارة المجمع في جلسات التفاوض وتوقيع اتفاقيات الإسكان مع كبرى الشركات الصناعية.
                      </div>
                    </div>

                    <div className="mt-8">
                      <Link
                        href="/work/saken-corporate-housing-brand-identity"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                      >
                        <span>استعرض دراسة حالة ساكن كاملة</span>
                        <span>←</span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background shadow-md">
                      <Image
                        src="/images/saken/saken-official-envelope-mockup.webp"
                        alt="تصميم ظرف المراسلات والخطابات الرسمية الفاخر - شركة ساكن"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background shadow-md">
                      <Image
                        src="/images/saken/saken-letterhead-stationery-mockup.webp"
                        alt="تصميم ورق المراسلات والخطابات الرسمية - هوية ساكن للإسكان المؤسسي"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background shadow-md">
                      <Image
                        src="/images/saken/saken-official-invoice-mockup.webp"
                        alt="تصميم فاتورة ومستندات التعاقد الرسمية - شركة ساكن"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background shadow-md">
                      <Image
                        src="/images/saken/saken-room-phone-book-directory-mockup.webp"
                        alt="دليل الخدمات والمرافق الداخلية - ساكن"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* COST DYNAMICS SECTION */}
            <section className="py-20 border-t border-border bg-background">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
                  <p className="font-semibold text-primary text-sm tracking-wider uppercase">محددات الميزانية</p>
                  <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
                    كيف تتحدد تكلفة تصميم وتجهيز ملف الشركة؟
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    نبتعد عن الباقات الجاهزة المعلبة لأن متطلبات كل منشأة تختلف حسب طبيعة نشاطها. هذه العوامل الأربعة هي التي تحكم ميزانية العمل:
                  </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="p-6 rounded-2xl border border-border bg-card/40">
                    <h3 className="font-bold text-foreground mb-2">حجم الملف وعدد الصفحات</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      إعداد ملف موجز من 12 إلى 16 صفحة يختلف في وقته ومجهوده عن بروفايل شامل يوثق عشرات المشاريع في أكثر من 40 صفحة.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-border bg-card/40">
                    <h3 className="font-bold text-foreground mb-2">جاهزية المحتوى الأولي</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      هل البيانات وسوابق الأعمال مكتوبة ومراجعة من فريقكم، أم يتولى فريقنا تحريرها وصياغتها مهنياً من البداية؟
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-border bg-card/40">
                    <h3 className="font-bold text-foreground mb-2">اللغات والمصطلحات</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      تقديم الملف باللغة العربية فقط، أو نسخة ثنائية اللغة (عربي/إنجليزي) مع ضبط محاذاة اللغتين وتنسيق الجداول الفنية.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-border bg-card/40">
                    <h3 className="font-bold text-foreground mb-2">نوع ومواصفات المخرجات</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      ملف PDF تفاعلي للمراسلات الرقمية، أو إضافة إعداد ملفات الفرز الطباعي الفاخر وتنسيق عينات الطباعة.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* RELATED ARTICLES SECTION */}
        {(() => {
          const todayStr = new Date().toISOString().split("T")[0]
          const relatedPosts = blogPosts
            .filter((post) =>
              post.date <= todayStr && (
                post.category?.includes(service.shortTitle) ||
                post.title?.includes(service.shortTitle) ||
                service.keywords?.some((kw) => post.title?.includes(kw) || post.excerpt?.includes(kw))
              )
            )
            .slice(0, 3)

          if (relatedPosts.length === 0) return null

          return (
            <section className="border-b border-border bg-card/20 py-20">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div>
                    <p className="font-semibold text-primary">المعرفة والإرشادات</p>
                    <h2 className="mt-2 text-3xl font-bold text-foreground">
                      مقالات وكتيبات إرشادية حول {service.shortTitle}
                    </h2>
                  </div>
                  <Link
                    href="/blog"
                    className="mt-4 md:mt-0 font-semibold text-primary hover:underline"
                  >
                    تصفح جميع المقالات ←
                  </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  {relatedPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/40"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <p className="text-xs font-semibold text-primary">
                            {post.category}
                          </p>
                          <h3 className="mt-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
                          {post.date}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )
        })()}

        {/* FAQ SECTION */}
        <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="font-semibold text-primary text-sm tracking-wider uppercase">الأسئلة الشائعة — FAQ</p>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
              معلومات مهمة قبل بدء المشروع
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {service.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border bg-card/40 p-6 transition-all [&_summary::-webkit-details-marker]:none"
              >
                <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground text-lg">
                  <span>{item.question}</span>
                  <span className="ml-3 font-bold text-primary group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground text-base border-t border-border/60 pt-4">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CONTACT CTA SECTION */}
        <section className="mx-auto max-w-5xl px-6 pb-24 text-center lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 lg:p-16 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl font-extrabold text-foreground sm:text-5xl">
              {service.slug === "company-profile-design" ? (
                <>
                  جاهز لتنظيم وتطوير <span className="text-primary">ملف شركتك وسوابق أعمالك؟</span>
                </>
              ) : (
                <>
                  جاهز لبناء <span className="text-primary">حضور بصري أقوى؟</span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {service.slug === "company-profile-design"
                ? "أرسل نبذة عن نشاط شركتك وسابقة أعمالك الحالية، وسنزودك بتصور مقترح للهيكل الأمثل للملف التعريفي الخاص بكم مع تقدير دقيق لنطاق العمل والوقت المطلوب."
                : "شاركنا تفاصيل مشروعك وسنساعدك على تحديد النطاق الأنسب بدل شراء عناصر لا يحتاجها المشروع."}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/201009215131?text=${encodeURIComponent(
                  service.slug === "company-profile-design"
                    ? "مرحبًا، أريد مناقشة نطاق عمل وتصميم بروفايل لشركتنا في السعودية"
                    : `مرحبًا، أريد عرض سعر لخدمة ${service.shortTitle}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-button px-8 py-4 inline-flex items-center gap-2 text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
              >
                <span>تواصل واتساب</span>
                <span>↗</span>
              </a>
              <a
                href="mailto:wearetagstudio@gmail.com"
                className="rounded-full border border-border px-8 py-4 text-base font-bold text-foreground transition hover:border-primary hover:text-primary"
              >
                راسلنا بالإيميل
              </a>
            </div>
          </div>
        </section>

      </article>
    </>
  )
}
