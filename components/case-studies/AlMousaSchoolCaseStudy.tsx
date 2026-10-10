"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn"

const baseUrl = "https://www.wearetagstudio.com"

interface GalleryImage {
  src: string
  alt: string
  title: string
  category: string
  description: string
  width: number
  height: number
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/cladding/al-mousa-school/thumbnail-signboard.webp",
    alt: "لوحة مدرسة الشيخ عبدالرحمن بن عبداللطيف الموسى لتحفيظ القرآن الكريم بالحروف الذهبية البارزة",
    title: "لوحة الواجهة الرئيسية وشعار وزارة التعليم",
    category: "لوحات البوابات والصروح",
    description: "لوحة المدخل الرئيسي بالحروف البارزة ثلاثية الأبعاد المصنوعة من الإستانلس ستيل المطلي بالتيتانيوم الذهبي مع شعار وزارة التعليم وسنة التدشين 1448هـ.",
    width: 1079,
    height: 573,
  },
  {
    src: "/images/cladding/al-mousa-school/facade-panoramic-view.webp",
    alt: "الواجهة المعمارية البانورامية لمدرسة الشيخ عبدالرحمن الموسى لتحفيظ القرآن الكريم وقت الغسق بالأحساء",
    title: "المنظور البانورامي للواجهة المعمارية وقت الغسق",
    category: "الواجهات المعمارية المتكاملة",
    description: "إطلالة شاملة توضح التناغم البصري بين تكسيات الحجر الطبيعي وألواح الكلادينج والإضاءة الخلفية الدافئة للحروف البارزة عند المغيب.",
    width: 1200,
    height: 896,
  },
  {
    src: "/images/cladding/al-mousa-school/grand-entrance-arches.webp",
    alt: "أقواس البوابة الرئيسية ولوحة الكلادينج المذهبة لمدرسة الشيخ عبدالرحمن الموسى",
    title: "أقواس المدخل الصرحي والبوابة المزدوجة",
    category: "مداخل الصروح والمنشآت",
    description: "بوابة صرحية بقوسين معماريين تتوسطهما لوحة الكلادينج العلوية المرتفعة، مما يمنح الصرح هيبة وقاراً وبصمة بصرية فريدة.",
    width: 1200,
    height: 896,
  },
  {
    src: "/images/cladding/al-mousa-school/architectural-side-view.webp",
    alt: "المنظور الجانبي لواجهات مدرسة الشيخ عبدالرحمن الموسى بالأحساء وحركة الطلاب",
    title: "المنظور الجانبي وتكامل الكتل الإنشائية",
    category: "زوايا الرؤية الميدانية",
    description: "وضوح قراءة اللوحة والحروف الذهبية من زوايا الحركة الجانبية للشارع والمحيط، مع تكامل التصميم مع حركة الطلاب والكوادر.",
    width: 896,
    height: 1200,
  },
  {
    src: "/images/cladding/al-mousa-school/3d-gold-letters-detail.webp",
    alt: "تفاصيل الحروف البارزة 3D من الإستانلس ستيل المطلي بالتيتانيوم الذهبي",
    title: "الحرفية الدقيقة للحروف البارزة 3D",
    category: "المواد والتفاصيل الفنية",
    description: "لقطة ماكرو مقربة تبرز دقة القطع الليزري وشطف الحواف وانعكاس التيتانيوم الذهبي الفاخر المقاوم للعوامل الجوية والحرارة العالية.",
    width: 896,
    height: 1200,
  },
]

export default function AlMousaSchoolCaseStudy() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/work/al-mousa-school-cladding-facade#creative-work`,
    name: "لوحات وكلادينج مدرسة الشيخ عبدالرحمن بن عبداللطيف الموسى لتحفيظ القرآن الكريم",
    description:
      "دراسة حالة معمارية وهندسية لتصميم وتنفيذ واجهات الكلادينج المعمارية واللوحات الصرحية بالحروف البارزة 3D المطلية بالتيتانيوم الذهبي لمدرسة تحفيظ القرآن الكريم بمحافظة الأحساء.",
    image: `${baseUrl}/images/cladding/al-mousa-school/thumbnail-signboard.webp`,
    genre: "Architectural Signage & Cladding Facades",
    inLanguage: "ar",
    creator: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "تاج ستوديو",
      url: baseUrl,
    },
    about: {
      "@type": "EducationalOrganization",
      name: "مدرسة الشيخ عبدالرحمن بن عبداللطيف الموسى لتحفيظ القرآن الكريم",
      address: {
        "@type": "PostalAddress",
        addressLocality: "الأحساء",
        addressCountry: "SA",
      },
    },
    mainEntityOfPage: `${baseUrl}/work/al-mousa-school-cladding-facade`,
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
        name: "لوحات وكلادينج مدرسة الشيخ عبدالرحمن الموسى",
        item: `${baseUrl}/work/al-mousa-school-cladding-facade`,
      },
    ],
  }

  const specifications = [
    { label: "نوع المشروع", value: "واجهات كلادينج معمارية ولوحات صرحية بالحروف البارزة 3D" },
    { label: "الموقع الجغرافي", value: "محافظة الأحساء، المملكة العربية السعودية" },
    { label: "الجهة المستفيدة", value: "الإدارة العامة للتعليم بمحافظة الأحساء (تعليم الأحساء)" },
    { label: "المبادرة والوقف", value: "شراكة مجتمعية مع أسرة الموسى بالأحساء (الشيخ عبدالعزيز بن عبدالله الموسى)" },
    { label: "تاريخ الافتتاح", value: "1448هـ" },
    { label: "خامة الحروف", value: "إستانلس ستيل عيار 304 مطلي بطبقة تيتانيوم ذهبي مرآتي عالي المقاومة" },
    { label: "سماكة الكلادينج", value: "ألواح ألومنيوم مركبة 4mm مقاومة للحريق (PVDF Coated)" },
    { label: "نظام الإضاءة", value: "إضاءة ليد خلفية غير مباشرة (Indirect Halo/Backlit LED) بدرجة 3000K Warm" },
    { label: "معيار الحماية والعزل", value: "IP68 معزول تماماً ضد الأتربة ومياه الأمطار والحرارة الشديدة" },
    { label: "الهيكل الداخلي", value: "تيوبات حديدية مجلفنة ومطلية بالإيبوكسي المقاوم للصدأ ومثبتة ميكانيكياً" },
  ]

  const challenges = [
    {
      num: "01",
      title: "المناخ الصحراوي القاسي للأحساء",
      desc: "تصل درجات الحرارة في صيف الأحساء إلى قرابة 50 درجة مئوية مع إشعاع شمسي مباشر وأتربة ناعمة ورطوبة، مما يتطلب مواد طلاء وتكسية تضمن عدم بهتان اللون الذهبي أو تشقق الفواصل على مدار سنوات طويلة.",
    },
    {
      num: "02",
      title: "الوقار المعماري والهيبة الدينية والتربوية",
      desc: "طبيعة الصرح القرآني تفرض تصميماً هادئاً ومهيباً يبتعد عن الصخب التجاري، مع ضرورة الحفاظ على أصالة الخط العربي ونسب الكتل المعمارية المتناسقة مع حجر البناء.",
    },
    {
      num: "03",
      title: "المقروئية العالية في النهار والليل",
      desc: "ضرورة وضوح وقراءة اسم المدرسة وشعار وزارة التعليم من مسافات تتجاوز 150 متراً من حركة المركبات، مع إضاءة ليلية دافئة لا تسبب وهجاً بصرياً (Glare-free).",
    },
    {
      num: "04",
      title: "السلامة الإنشائية ومقاومة أحمال الرياح",
      desc: "ارتفاع اللوحة على الأقواس العلوية للمدخل الرئيسي تطلب دراسة هندسية دقيقة لتثبيت الشاسيهات المعدنية المجلفنة وتوزيع نقاط التحميل دون التأثير على العزل الإنشائي للمبنى.",
    },
  ]

  const executionSteps = [
    {
      step: "1",
      title: "المسح الهندسي ودراسة واجهات الصرح",
      desc: "رفع المقاسات الميدانية ثلاثية الأبعاد لبوابة المدخل والأقواس، وتحديد محاور الرؤية المثالية لمرتادي الطريق والشارع المقابل للمدرسة.",
    },
    {
      step: "2",
      title: "تصميم المخططات التنفيذية والخط العربي",
      desc: "معالجة خط اسم الصرح ومحاكاته بالحجم الطبيعي (1:1) وضبط مقاييس شعار وزارة التعليم لتتوافق بدقة مع الدليل الإرشادي الرسمي لوزارة التعليم السعودية.",
    },
    {
      step: "3",
      title: "القص الليزري والتشكيل الميكانيكي 3D",
      desc: "قص ألواح الإستانلس ستيل 304 بأشعة الفايبر ليزر فائقة الدقة، وتشكيل الجوانب والعمق (Return) بلحام غير مرئي وتشطيب تيتانيوم ذهبي عاكس كالمرايا.",
    },
    {
      step: "4",
      title: "تركيب الكلادينج المعماري وشبكة الإضاءة",
      desc: "تركيب ألواح الكلادينج المقاومة للحريق مع فواصل سيليكون إنشائية متخصصة، وتمديد شبكة إضاءة LED كورية عالية الكفاءة مع محولات طاقة معزولة.",
    },
    {
      step: "5",
      title: "التثبيت الميداني والاختبارات التشغيلية",
      desc: "تثبيت الحروف على براغي مباعدة (Spacers) لتحقيق تأثير الهالة الضوئية المنتظمة (Halo Effect)، وإجراء اختبارات التبريد والمقاومة الكهربائية الميدانية.",
    },
  ]

  return (
    <main className="bg-[#FAF8F5] text-[#1E1B18] min-h-screen selection:bg-[#D4AF37]/30">
      {/* ── JSON-LD STRUCTURED DATA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO HEADER SECTION ── */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pb-24 border-b border-[#E8E2D8]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E6]/80 via-[#FAF8F5] to-[#FAF8F5] pointer-events-none" />
        
        {/* Subtle decorative golden ambient glow */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-[#C29B38]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-xs sm:text-sm text-[#8C827A] mb-8 font-medium">
            <Link href="/" className="hover:text-[#1E1B18] transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/work" className="hover:text-[#1E1B18] transition-colors">
              أعمالنا
            </Link>
            <span>/</span>
            <span className="text-[#1E1B18] font-bold" aria-current="page">
              لوحات وكلادينج مدرسة الشيخ عبدالرحمن الموسى
            </span>
          </nav>

          <FadeIn direction="up" duration={0.8}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#8F6B10] text-xs font-bold tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>واجهات معمارية ولوحات صرحية 3D — الأحساء</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B18] leading-[1.25] tracking-tight max-w-4xl">
              لوحات وكلادينج مدرسة الشيخ عبدالرحمن بن عبداللطيف الموسى لتحفيظ القرآن الكريم
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#5A524A] max-w-3xl">
              تنفيذ هندسي صرحي يجمع بين تكسيات الكلادينج المعمارية وألواح الحجر الطبيعي، مع حروف بارزة ثلاثية الأبعاد من الإستانلس ستيل المطلي بالتيتانيوم الذهبي ونظام إضاءة LED خلفية غير مباشرة (Halo-lit) لصرح قرآني رائد بمحافظة الأحساء.
            </p>

            {/* Quick Stats Grid */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "الجهة المستفيدة", value: "مدرسة الشيخ عبدالرحمن الموسى" },
                { label: "الشراكة المجتمعية", value: "تعليم الأحساء & أسرة الموسى" },
                { label: "الموقع", value: "محافظة الأحساء - السعودية" },
                { label: "سنة التدشين", value: "1448هـ (ابتدائي - متوسط)" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#E8E2D8] shadow-sm hover:border-[#D4AF37]/50 transition-colors"
                >
                  <p className="text-xs font-bold text-[#8C827A] mb-1.5">{item.label}</p>
                  <p className="text-sm sm:text-base font-extrabold text-[#1E1B18]">{item.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ── MAIN FEATURED HERO IMAGE (Specified by user) ── */}
          <FadeIn direction="up" duration={1} delay={0.2} className="mt-12 sm:mt-16">
            <div className="group relative rounded-[2.5rem] overflow-hidden border border-[#E8E2D8] bg-black shadow-2xl">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full max-h-[680px]">
                <Image
                  src="/images/cladding/al-mousa-school/thumbnail-signboard.webp"
                  alt="لوحة مدرسة الشيخ عبدالرحمن بن عبداللطيف الموسى لتحفيظ القرآن الكريم"
                  fill
                  priority
                  sizes="(max-width: 1450px) 100vw, 1450px"
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Overlay Caption */}
                <div className="absolute bottom-6 right-6 left-6 sm:bottom-10 sm:right-10 sm:left-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37] text-black mb-2">
                      اللوحة الصرحية الرئيسية
                    </span>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black drop-shadow-md">
                      مدرسة الشيخ عبدالرحمن بن عبداللطيف الموسى - رحمه الله - لتحفيظ القرآن الكريم
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-200 mt-1">
                      حروف بارزة 3D من الإستانلس ستيل المطلي بالتيتانيوم الذهبي المرآتي على تكسيات الكلادينج المعماري
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveImageIndex(0)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/30 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span>تكبير اللوحة والتفاصيل</span>
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ABOUT THE SCHOOL & BENEFICIARY ENTITY ── */}
      <section className="py-16 sm:py-24 border-b border-[#E8E2D8] bg-white">
        <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#8F6B10] text-xs font-bold mb-4">
                <span>عن الصرح القرآني</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B18] leading-tight">
                نموذج رائد للشراكة المجتمعية والوقفية في خدمة كتاب الله بالأحساء
              </h2>
              <div className="w-16 h-1 bg-[#D4AF37] rounded-full mt-6 mb-8" />
              
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5A524A]">
                <p>
                  تعد <strong>مدرسة الشيخ عبدالرحمن بن عبداللطيف الموسى - رحمه الله - لتحفيظ القرآن الكريم (ابتدائي - متوسط)</strong> من أحدث وأبرز المجمعات التعليمية المتخصصة في محافظة الأحساء، وافتتحت في عام <strong>1448هـ</strong>.
                </p>
                <p>
                  يمثل هذا المجمع ثمرة تعاون وشراكة مجتمعية نوعية ومثمرة بين <strong>الإدارة العامة للتعليم بمحافظة الأحساء (تعليم الأحساء)</strong> و<strong>أسرة الموسى الكريمة</strong> بقيادة الشيخ عبدالعزيز بن عبدالله الموسى، استمراراً لمسيرة العطاء والوقف التعليمي الذي يخدم مئات الطلاب في بيئة تربوية نموذجية مجهزة بأعلى المواصفات.
                </p>
                <p>
                  من هذا المنطلق، تطلبت الواجهة الخارجية للمدرسة تعبيراً معمارياً يعكس هذه المكانة الجليلة: مزيجاً متزناً بين الأصالة الإسلامية المستوحاة من عمارة الأحساء، وبين الحداثة الهندسية المعتمدة في مشاريع وزارة التعليم بالمملكة العربية السعودية.
                </p>
              </div>
            </div>

            {/* School Profile Card & Pillars */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-10 border border-[#E8E2D8] shadow-sm space-y-6">
              <h3 className="text-xl font-black text-[#1E1B18] border-b border-[#E8E2D8] pb-4">
                ركائز التصميم المعماري واللوحات الصرحية للمدرسة
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: "🕌",
                    title: "الوقار والسكينة",
                    desc: "خط عربي رصين يتناسب مع شرف تحفيظ القرآن الكريم دون تكلف أو بهرجة تجارية زائدة.",
                  },
                  {
                    icon: "🏛️",
                    title: "الهيبة المعمارية",
                    desc: "أقواس صرحية متناظرة وتكسيات كلادينج تنسجم بانسيابية مع الحجر الطبيعي للواجهات.",
                  },
                  {
                    icon: "☀️",
                    title: "مقاومة المناخ للأحساء",
                    desc: "ألواح PVDF وإستانلس ستيل تيتانيوم ذهبي معالج لمقاومة أشعة الشمس المباشرة وحرارة 50°C.",
                  },
                  {
                    icon: "✨",
                    title: "إضاءة ليلية دافئة",
                    desc: "توزيع مدروس لإضاءة Halo-lit الدافئة يعزز الطابع الروحاني والجمالي للمبنى بعد المغيب.",
                  },
                ].map((pillar, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-[#E8E2D8]/80">
                    <span className="text-2xl mb-2 block">{pillar.icon}</span>
                    <h4 className="text-base font-extrabold text-[#1E1B18] mb-1">{pillar.title}</h4>
                    <p className="text-xs sm:text-sm text-[#6B5E54] leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#D4AF37]/10 rounded-2xl p-4 border border-[#D4AF37]/30 flex items-center gap-3">
                <span className="text-xl">📍</span>
                <p className="text-xs sm:text-sm text-[#7A5A0A] font-bold">
                  الموقع: محافظة الأحساء — تحت إشراف الإدارة العامة للتعليم بمحافظة الأحساء
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ENGINEERING CHALLENGES ── */}
      <section className="py-16 sm:py-24 border-b border-[#E8E2D8] bg-[#FAF8F5]">
        <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F6B10] block mb-2">
              The Engineering Challenge
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B18] leading-tight">
              التحديات الهندسية والتنفيذية للواجهة
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5A524A]">
              تنفيذ واجهة لمرفق تعليمي وديني بمثل هذا الحجم يفرض متطلبات قياسية دقيقة في المتانة الهندسية، السلامة الإنشائية، والجمال البصري.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="text-4xl font-black text-[#D4AF37]/25 group-hover:text-[#D4AF37]/40 transition-colors mb-4">
                  {c.num}
                </div>
                <h3 className="text-lg font-black text-[#1E1B18] mb-3 leading-snug">
                  {c.title}
                </h3>
                <p className="text-sm text-[#6B5E54] leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNICAL SOLUTION & MATERIALS ── */}
      <section className="py-16 sm:py-24 border-b border-[#E8E2D8] bg-[#1E1B18] text-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C29B38]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              Technical Solution & Materials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              الحل الهندسي والمواد المعتمدة في التنفيذ
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              تم اختيار وتصنيع كافة عناصر الواجهة وفق كود البناء السعودي ومعايير الجودة المعتمدة للمنشآت الحكومية والتعليمية.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cladding Panels */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-2xl mb-6">
                🧱
              </div>
              <h3 className="text-xl font-black mb-3">ألواح الكلادينج المعمارية</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                ألواح ألومنيوم مركبة (ACP) بسماكة 4 ملم مع شريحة ألومنيوم خارجية 0.5 ملم معالجة بدهان PVDF الكوري المقاوم للحريق من فئة B1/A2، مع فواصل تمدد محسوبة هندسياً لاستيعاب التغيرات الحرارية الشديدة.
              </p>
              <ul className="text-xs space-y-2 text-gray-400 border-t border-white/10 pt-4">
                <li>• مقاومة كاملة للأشعة فوق البنفسجية UV</li>
                <li>• عزل مائي وحراري متكامل مع جدران المبنى</li>
                <li>• تشطيب غير لامع متوافق مع الحجر الطبيعي</li>
              </ul>
            </div>

            {/* 3D Titanium Letters */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-2xl mb-6">
                ✨
              </div>
              <h3 className="text-xl font-black mb-3">حروف 3D إستانلس تيتانيوم ذهبي</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                تصنيع حروف الاسم وشعار الوزارة من ألواح الإستانلس ستيل غير القابل للصدأ (Grade 304) بسماكة 1.5 ملم مع طلاء التيتانيوم الذهبي المرآتي عبر تقنية الترسيب الفزيائي للبخار (PVD Coating) لمنح بريق دائم لا يبهت.
              </p>
              <ul className="text-xs space-y-2 text-gray-400 border-t border-white/10 pt-4">
                <li>• قص ليزر أليافي Fiber Laser عالي الدقة</li>
                <li>• لحام مخفي بالكامل للجوانب (Returns)</li>
                <li>• مقاومة قصوى للأملاح والرطوبة الجوية</li>
              </ul>
            </div>

            {/* Indirect Halo Lighting */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-2xl mb-6">
                💡
              </div>
              <h3 className="text-xl font-black mb-3">إضاءة ليد مخفية غير مباشرة (Halo)</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                توزيع وحدات LED كورية مخصصة للأجواء الخارجية بدرجة حرارة لون دافئة (3000K Warm White) داخل تجاويف الحروف، مع توجيه الضوء نحو سطح الكلادينج الخلفي عبر قواعد تباعد ميكانيكية متقنة.
              </p>
              <ul className="text-xs space-y-2 text-gray-400 border-t border-white/10 pt-4">
                <li>• تصنيف حماية IP68 مضاد للماء والأتربة</li>
                <li>• محولات MeanWell معزولة ومحمية ضد ارتفاع الجهد</li>
                <li>• إضاءة ناعمة متجانسة خالية من الوهج المزعج</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY: ALL REMAINING IMAGES IN DETAIL ── */}
      <section className="py-16 sm:py-24 border-b border-[#E8E2D8] bg-white">
        <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F6B10] block mb-2">
                Project Visual Gallery
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B18] leading-tight">
                معرض الزوايا المعمارية والتنفيذية للصرح
              </h2>
              <p className="mt-3 text-base text-[#5A524A] max-w-2xl">
                استعراض تفصيلي لكافة زوايا المشروع: من المنظور البانورامي للمبنى وقت الغسق وحتى أدق تفاصيل الحرفية للحروف الذهبية البارزة. اضغط على أي صورة لتكبيرها.
              </p>
            </div>

            <div className="text-xs font-bold text-[#8C827A] bg-[#FAF8F5] px-4 py-2 rounded-full border border-[#E8E2D8] self-start md:self-auto">
              5 لقطات عالية الدقة موثقة ميدانياً
            </div>
          </div>

          {/* Grid layout for all 5 images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {galleryImages.map((img, index) => {
              // Highlight the first 2 images as wider / panoramic
              const isLarge = index === 1 // Panoramic sunset view
              return (
                <div
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`group relative rounded-3xl overflow-hidden border border-[#E8E2D8] bg-[#FAF8F5] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col ${
                    isLarge ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={
                        isLarge
                          ? "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 66vw"
                          : "(max-width: 768px) 100vw, 33vw"
                      }
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                      {img.category}
                    </div>

                    {/* Hover Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black text-[#1E1B18] group-hover:text-[#8F6B10] transition-colors mb-2">
                        {img.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B5E54] leading-relaxed">
                        {img.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-bold text-[#8C827A]">
                      <span>انقر لمعاينة التفاصيل بالحجم الكامل</span>
                      <span className="text-[#8F6B10]">تكبير ↗</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── EXECUTION METHODOLOGY / STEP-BY-STEP ── */}
      <section className="py-16 sm:py-24 border-b border-[#E8E2D8] bg-[#FAF8F5]">
        <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F6B10] block mb-2">
              Execution Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B18] leading-tight">
              مراحل التصميم والتنفيذ الهندسي للصرح
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5A524A]">
              سلسلة عمل منضبطة تضمن تحويل المخططات والرسومات إلى واقع معماري شامخ بأعلى معايير الإتقان.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {executionSteps.map((s, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm relative">
                <span className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 text-[#8F6B10] font-black flex items-center justify-center text-base mb-4 border border-[#D4AF37]/30">
                  {s.step}
                </span>
                <h3 className="text-base font-black text-[#1E1B18] mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E54] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNICAL SPECIFICATIONS TABLE ── */}
      <section className="py-16 sm:py-24 border-b border-[#E8E2D8] bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F6B10] block mb-2">
              Project Data & Specs
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B18]">
              جدول المواصفات الفنية المعتمدة
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B5E54]">
              توثيق شامل للمواصفات الهندسية ومطابقتها للمتطلبات الإنشائية لوزارة التعليم.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E8E2D8] text-[#1E1B18]">
                    <th className="py-4 px-6 font-black text-sm">البند الهندسي</th>
                    <th className="py-4 px-6 font-black text-sm">المواصفة المنفذة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D8]">
                  {specifications.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#FAF8F5]/50"}
                    >
                      <td className="py-4 px-6 font-bold text-[#1E1B18] whitespace-nowrap">
                        {item.label}
                      </td>
                      <td className="py-4 px-6 text-[#5A524A] font-medium">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT RESULTS & COMMUNITY IMPACT ── */}
      <section className="py-16 sm:py-24 border-b border-[#E8E2D8] bg-[#FAF8F5]">
        <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1E1B18] to-[#2D2824] rounded-[3rem] p-8 sm:p-14 lg:p-16 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-3">
                Results & Impact
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                صرح معماري يجسد شرف تعليم القرآن الكريم
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
                أثمر هذا الإنجاز عن واجهة متكاملة تجمع بين الهيبة والسكينة، ونالت إشادة واسعة من مسؤولي التعليم والمجتمع المحلي في محافظة الأحساء، مؤكدة على أن اختيار المواد الفائقة كالإستانلس ستيل التيتانيوم الذهبي وألواح الكلادينج المعماري هو الاستثمار الأمثل للمشاريع الصرحية التي تدوم لأجيال.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-white/15">
                <div>
                  <p className="text-3xl font-black text-[#D4AF37]">100%</p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">مقاومة للعوامل الجوية والرطوبة</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-[#D4AF37]">150m+</p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">مسافة قراءة واضحة بالنهار والليل</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-[#D4AF37]">1448هـ</p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">تدشين الصرح القرآني المبارك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-20 sm:py-28 bg-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#8F6B10] text-xs font-bold mb-6">
            <span>واجهات معمارية • لوحات كلادينج • حروف بارزة 3D</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B18] tracking-tight leading-tight">
            هل تخطط لتنفيذ واجهات كلادينج أو لوحات صرحية لمشروعك؟
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#5A524A] max-w-2xl mx-auto leading-relaxed">
            نقدم دراسات هندسية وتصاميم تنفيذية متكاملة للواجهات المعمارية واللوحات الإعلانية والصرحية بالحروف البارزة المضيئة لكبرى المنشآت والمدارس والمجمعات التجارية بالسوق السعودي.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact-form"
              className="px-8 py-4 rounded-full bg-[#1E1B18] hover:bg-black text-white text-sm sm:text-base font-bold shadow-lg shadow-black/10 hover:shadow-xl transition-all"
            >
              ابدأ دراسة مشروعك
            </Link>
            <Link
              href="/work"
              className="px-8 py-4 rounded-full bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#1E1B18] text-sm sm:text-base font-bold border border-[#E8E2D8] transition-all"
            >
              استعراض باقي الأعمال
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE LIGHTBOX MODAL ── */}
      {activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Lightbox Header Bar */}
          <div
            className="w-full max-w-7xl flex items-center justify-between text-white pb-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#D4AF37] text-black">
                {galleryImages[activeImageIndex].category}
              </span>
              <span className="text-sm text-gray-300 font-medium hidden sm:inline">
                صورة {activeImageIndex + 1} من {galleryImages.length}
              </span>
            </div>

            <button
              onClick={() => setActiveImageIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="إغلاق المعاينة"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lightbox Center Image View */}
          <div
            className="relative w-full max-w-6xl max-h-[75vh] flex-1 flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={galleryImages[activeImageIndex].src}
                alt={galleryImages[activeImageIndex].alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveImageIndex((prev) =>
                  prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length
                )
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
              aria-label="الصورة السابقة"
            >
              <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveImageIndex((prev) =>
                  prev === null ? 0 : (prev + 1) % galleryImages.length
                )
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
              aria-label="الصورة التالية"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Lightbox Footer Caption */}
          <div
            className="w-full max-w-4xl text-center text-white pt-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg sm:text-xl font-bold mb-1">
              {galleryImages[activeImageIndex].title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
              {galleryImages[activeImageIndex].description}
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
