import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { caseStudies } from "@/lib/caseStudies"
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn"
import PizzaBoxVideo from "@/components/ui/PizzaBoxVideo"
import dynamic from "next/dynamic"

const ZaatarScene3D = dynamic(
  () => import("@/components/ui/ZaatarScene3D"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0" />,
  }
)

const baseUrl = "https://www.wearetagstudio.com"

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const item = caseStudies.find((entry) => entry.slug === params.slug)

  if (!item) {
    return {}
  }

  const canonical = `${baseUrl}/work/${item.slug}`

  return {
    title: item.title,
    description: `${item.service} لـ ${item.client}. تعرّف على فكرة المشروع والتحدي والحل وتطبيقات الهوية البصرية.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${item.title} | تاج ستوديو`,
      description: `${item.service} لـ ${item.client} — دراسة حالة من أعمال تاج ستوديو.`,
      url: canonical,
      type: "article",
      locale: "ar_EG",
      siteName: "تاج ستوديو",
      images: [
        {
          url: item.image,
          alt: item.title,
        },
      ],
    },
  }
}

function ZaatarCaseStudy() {
  const project = caseStudies.find(
    (item) => item.slug === "zaatar-w-simsim-brand-identity"
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
    {
      src: "/images/tasmim-hawiyah-basariyah-zaatar-w-simsim-paper.jpg",
      alt: "تصميم ورق تغليف معجنات مطعم زعتر وسمسم",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      src: "/images/tasmim-hawiyah-basariyah-zaatar-w-simsim-bag.jpg",
      alt: "أكياس ورقية مطبوعة بهوية مطعم زعتر وسمسم",
      className: "",
    },
    {
      src: "/images/tasmim-hawiyah-basariyah-zaatar-w-simsim-box.jpg",
      alt: "علب كرتون معجنات وبيتزا مطعم زعتر وسمسم",
      className: "",
    },
    {
      src: "/images/tasmim-hawiyah-basariyah-zaatar-w-simsim-polo-shirt.jpg",
      alt: "ملابس ويونيفورم موظفي مطعم زعتر وسمسم",
      className: "md:col-span-2",
    },
    {
      src: "/images/tasmim-hawiyah-basariyah-zaatar-w-simsim-app-20.jpg",
      alt: "ملابس الشيف لمطعم زعتر وسمسم",
      className: "md:col-span-2",
    },
    {
      src: "/images/tasmim-hawiyah-basariyah-zaatar-w-simsim-app-15.jpg",
      alt: "تطبيقات الهوية البصرية لمطعم زعتر وسمسم 2",
      className: "",
    },
    {
      src: "/images/tasmim-hawiyah-basariyah-zaatar-w-simsim-app-17.jpg",
      alt: "تطبيقات الهوية البصرية لمطعم زعتر وسمسم 3",
      className: "",
    },
    {
      src: "/images/tasmim-hawiyah-basariyah-zaatar-w-simsim-app-14.jpg",
      alt: "أظرف ومراسلات مطعم زعتر وسمسم",
      className: "md:col-span-4",
    },
  ]

  const palette = [
    { name: "أخضر الزيتون", value: "#A8B51D", text: "text-white" },
    { name: "أخضر رمادي", value: "#59645F", text: "text-white" },
    { name: "ذهبي دافئ", value: "#D39B51", text: "text-white" },
    { name: "عاجي طبيعي", value: "#F4EFE5", text: "text-neutral-900" },
  ]

  return (
    <main className="bg-[#f6f1e8] text-[#273127] relative">
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

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Project Number — Studio Touch */}
        <div className="mb-8 flex items-center justify-between">
          <nav className="text-sm text-[#66705f]" aria-label="مسار التنقل">
            <Link href="/" className="hover:text-[#95a20d]">
              الرئيسية
            </Link>
            <span className="mx-2">/</span>
            <Link href="/work" className="hover:text-[#95a20d]">
              أعمالنا
            </Link>
            <span className="mx-2">/</span>
            <span aria-current="page">زعتر وسمسم</span>
          </nav>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[#b5bfa8] sm:block">
            Project No. 012
          </span>
        </div>>

        <FadeIn direction="up" duration={0.8}>
          <header className="group overflow-hidden rounded-[2rem] border border-black/5 bg-[#fbf8f1] shadow-[0_25px_80px_rgba(58,55,40,0.10)] lg:grid-cols-[1.05fr_0.95fr] lg:grid">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
              <div>
                {/* Badge — يظهر أول حاجة */}
                <FadeIn direction="up" duration={0.6} delay={0.1}>
                  <p className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#84920b]">
                    <span className="relative inline-block h-3 w-3 overflow-hidden rounded-full bg-[#a8b51d]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#a8b51d] opacity-40" />
                    </span>
                    Brand Identity
                  </p>
                </FadeIn>

                {/* الاسم الإنجليزي — كبير درامي */}
                <FadeIn direction="up" duration={1} delay={0.3}>
                  <p className="font-serif text-5xl leading-none text-[#a5b315] sm:text-7xl lg:text-8xl">
                    Zaatar w
                    <span className="block text-[#c8914b]">Semsom</span>
                  </p>
                </FadeIn>

                {/* العنوان العربي */}
                <FadeIn direction="up" duration={0.8} delay={0.5}>
                  <h1 className="mt-9 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                    تطوير هوية مطعم زعتر وسمسم بروح طبيعية معاصرة
                  </h1>
                </FadeIn>

                {/* الوصف */}
                <FadeIn direction="up" duration={0.8} delay={0.7}>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#697166] sm:text-lg">
                    هوية بصرية تستلهم مكوّنات الاسم وطبيعة المطبخ، وتحوّلها إلى
                    نظام مرن يجمع بين البساطة والدفء، ويصلح للتغليف والمطبوعات
                    والمحتوى الرقمي.
                  </p>
                </FadeIn>
              </div>

              {/* البيانات — تظهر آخر حاجة */}
              <FadeIn direction="up" duration={0.8} delay={0.9}>
                <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-black/10 pt-8 text-sm sm:grid-cols-4">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#8b9387]">
                      العميل
                    </dt>
                    <dd className="mt-2 font-semibold">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#8b9387]">
                      الخدمة
                    </dt>
                    <dd className="mt-2 font-semibold">هوية بصرية</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#8b9387]">
                      القطاع
                    </dt>
                    <dd className="mt-2 font-semibold">مطاعم وأغذية</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#8b9387]">
                      النطاق
                    </dt>
                    <dd className="mt-2 font-semibold">{project.location}</dd>
                  </div>
                </dl>
              </FadeIn>
            </div>

            {/* الصورة — تدخل من اليمين */}
            <FadeIn direction="left" duration={1.2} delay={0.4} className="relative min-h-[460px] bg-[#d7a15d] lg:min-h-[760px]">
              <Image
                src={project.image}
                alt="الهوية البصرية لمطعم زعتر وسمسم"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              {/* 3D Animated Scene — layered over the hero image */}
              <div className="absolute inset-0 z-10" style={{ mixBlendMode: "screen" }}>
                <ZaatarScene3D />
              </div>
            </FadeIn>
          </header>
        </FadeIn>
      </section>

      <section className="bg-[#fbf8f1]">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
          {/* Text Column (Appears on the right in RTL) */}
          <FadeIn direction="right" duration={0.8} className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
              The Creative Concept
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl text-[#273127]">
              الفكرة الإبداعية وراء هوية زعتر وسمسم
            </h2>
            <p className="mt-5 leading-8 text-[#697166]">
              انطلقت فكرة الشعار من اسم العلامة نفسه، فتم البحث عن رابط بصري
              يجمع بين مكونين مألوفين في المطبخ العربي: أوراق الزعتر وحبة
              السمسم. الهدف لم يكن رسم المكونين بشكل مباشر، بل اختزالهما في
              رمز بسيط يحمل روح المنتج ويسهل تذكره.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-r-2 border-[#a8b51d] pr-4">
                <h3 className="font-bold text-[#84920b]">ورقة الزعتر</h3>
                <p className="mt-2 text-sm leading-7 text-[#697166]">
                  منحت الرمز اتجاهه العضوي وإحساسه بالطبيعة والطزاجة، كما عبّرت
                  عن المكون الأساسي المرتبط باسم العلامة.
                </p>
              </div>
              <div className="border-r-2 border-[#c8914b] pr-4">
                <h3 className="font-bold text-[#c8914b]">حبة السمسم</h3>
                <p className="mt-2 text-sm leading-7 text-[#697166]">
                  أضافت الشكل الداخلي الناعم والإحساس بالدفء والمخبوزات، وربطت
                  الرمز بصريًا بالمنتجات التي تقدمها العلامة.
                </p>
              </div>
              <div className="border-r-2 border-[#59645f] pr-4">
                <h3 className="font-bold text-[#59645f]">الرمز النهائي</h3>
                <p className="mt-2 text-sm leading-7 text-[#697166]">
                  نتج عن الدمج شكل متوازن يمكن قراءته كورقة نبات أو حبة طبيعية
                  في الوقت نفسه، ليعمل منفردًا كأيقونة أو بجوار الاسم العربي
                  والإنجليزي دون فقدان وضوحه.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-[#eee8d8] p-6 text-sm leading-7 text-[#697166]">
              يعكس الرمز وعد العلامة: مكونات طبيعية، نكهة أصيلة، وتجربة معاصرة.
              لذلك تم تصميمه ليظل واضحًا على العبوات والملابس والواجهات والمحتوى
              الرقمي بمقاسات مختلفة.
            </div>
          </FadeIn>

          {/* Image Column (Appears on the left in RTL) */}
          <FadeIn direction="left" duration={0.8} delay={0.2} className="relative min-h-[400px] p-8 lg:min-h-[600px]">
            <Image
              src="/images/zaatar-logo-concept-explanation.jpg"
              alt="شرح الفكرة الإبداعية لشعار زعتر وسمسم"
              fill
              className="object-contain p-4"
            />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-px px-4 pb-px sm:px-6 lg:grid-cols-2 lg:px-8">
        <FadeIn direction="up">
          <article className="min-h-[520px] bg-[#fbf8f1] p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
            Logo System
          </p>
          <h2 className="mt-5 text-3xl font-bold">نظام الشعار</h2>

          <div className="mt-10 space-y-8">
            <div className="rounded-2xl border border-black/8 bg-white/70 p-7 text-center">
              <p className="font-serif text-3xl text-[#9eac16]">Zaatar w Semsom</p>
              <p className="mt-3 text-xl font-bold text-[#bd8846]">زعتر وسمسم</p>
              <p className="mt-4 text-xs text-[#81897e]">النسخة الأفقية</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/8 bg-white/70 p-6 text-center">
                <div className="mx-auto h-20 w-14 rotate-12 rounded-[70%_20%_70%_30%] bg-[#a8b51d]" />
                <p className="mt-4 text-xs text-[#81897e]">الرمز</p>
              </div>
              <div className="rounded-2xl border border-black/8 bg-white/70 p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#a8b51d] text-[10px] font-bold text-[#87940e]">
                  ZAATAR
                  <br />
                  SEMSOM
                </div>
                <p className="mt-4 text-xs text-[#81897e]">الختم</p>
              </div>
            </div>
          </div>
          </article>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <article className="min-h-[520px] bg-[#fbf8f1] p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
            Visual Language
          </p>
          <h2 className="mt-5 text-3xl font-bold">الألوان والخطوط</h2>

          <div className="mt-9">
            {/* Large hero swatch */}
            <div 
              className="relative flex h-40 items-end overflow-hidden rounded-3xl p-7 sm:h-52"
              style={{ backgroundColor: palette[0].value }}
            >
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">{palette[0].name}</p>
                <p className="mt-1 font-mono text-sm text-white/60">{palette[0].value}</p>
              </div>
              {/* Decorative circle */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10 sm:h-56 sm:w-56" />
              <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-white/10 sm:h-40 sm:w-40" />
            </div>

            {/* Smaller swatches */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              {palette.slice(1).map((color) => (
                <div
                  key={color.name}
                  className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${color.text}`}
                  style={{ backgroundColor: color.value }}
                >
                  <p className="text-sm font-bold">{color.name}</p>
                  <p className="mt-0.5 font-mono text-xs opacity-70">{color.value}</p>
                  {/* Subtle inner border */}
                  <div className="absolute inset-2 rounded-xl border border-current opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-black/10 pt-8">
            <p className="text-sm font-bold uppercase tracking-wider text-[#8b9387]">
              Typography
            </p>
            <div className="mt-5 grid grid-cols-[0.8fr_1.2fr] items-end gap-5">
              <p className="font-serif text-7xl leading-none text-[#30372f]">Aa</p>
              <div>
                <p className="text-5xl font-bold leading-none">أب</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#8b9387]">
                  DG GHAREEB
                </p>
                <p className="mt-2 text-sm leading-7 text-[#697166]">
                  مزيج بين طابع دافئ ومقروئية واضحة في اللغتين العربية
                  والإنجليزية.
                </p>
              </div>
            </div>
          </div>
          </article>
        </FadeIn>
      </section>

      {/* ── Project Story Section ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
            Behind the Work
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            قصة المشروع
          </h2>
        </div>

        <FadeInStaggerContainer className="grid gap-px lg:grid-cols-3">
          {/* Card 1 — Client Brief */}
          <FadeInStaggerItem direction="up" className="relative overflow-hidden bg-[#fbf8f1] p-8 sm:p-12">
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-6 select-none font-serif text-[9rem] font-black leading-none text-[#a8b51d]/[0.06]"
            >
              01
            </span>
            <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
              Client Brief
            </p>
            <h3 className="relative mt-5 text-2xl font-bold">
              ما طلبه العميل
            </h3>
            <p className="relative mt-5 leading-9 text-[#697166]">
              جاءنا العميل بطلب واضح: هوية بصرية متكاملة تشمل التغليف
              والمطبوعات والمحتوى الرقمي. كان يعرف ما يريده من الناحية
              الوظيفية، لكنه لم يكن يمتلك تصوّرًا بصريًا محددًا للشكل
              النهائي. جلسنا معه نسمع أكثر مما نتكلم — عن القصة وراء
              الاسم، وعن الجمهور اللي يحبّ يخدمه، وعن الشعور اللي يريد
              العميل أن يحمله معه لما يمسك كيسة أو علبة من المطعم.
            </p>
          </FadeInStaggerItem>

          {/* Card 2 — Creative Vision */}
          <FadeInStaggerItem direction="up" className="relative overflow-hidden bg-[#f6f1e8] p-8 sm:p-12">
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-6 select-none font-serif text-[9rem] font-black leading-none text-[#a8b51d]/[0.06]"
            >
              02
            </span>
            <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
              Creative Vision
            </p>
            <h3 className="relative mt-5 text-2xl font-bold">
              رؤيتنا الفنية
            </h3>
            <p className="relative mt-5 leading-9 text-[#697166]">
              قرّرنا أن نذهب باتجاه هوية دافئة تستلهم الطبيعة والأكل الطازج
              بلمسة عصرية. الاسم نفسه كان كنزًا بصريًا — زعتر وسمسم: مكوّنان
              من مطبخ المنطقة، كل منهما له شكله وملمسه وحضوره. الفكرة
              الأساسية كانت: لا نرسم زعتر وسمسم بشكل حرفي، بل نعصرهما في
              رمز واحد يجمع الشكلين معًا بأسلوب مجرّد وأنيق. الألوان جاءت
              من الطبيعة مباشرةً — أخضر الزيتون والذهبي الدافئ والعاجي
              الذي يوحي بالخبز والطحين.
            </p>
          </FadeInStaggerItem>

          {/* Card 3 — Breakthrough */}
          <FadeInStaggerItem direction="up" className="relative overflow-hidden bg-[#eee8d8] p-8 sm:p-12">
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-6 select-none font-serif text-[9rem] font-black leading-none text-[#a8b51d]/[0.06]"
            >
              03
            </span>
            <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
              The Breakthrough
            </p>
            <h3 className="relative mt-5 text-2xl font-bold">
              لحظة الاتفاق
            </h3>
            <p className="relative mt-5 leading-9 text-[#697166]">
              اللحظة الحقيقية جاءت في مرحلتين: أولًا حين اكتشفنا أن اسم
              المطعم بحد ذاته فيه مادة بصرية غنية — فكرة دمج مكوّنَي الزعتر
              والسمسم في شكل مجرّد واحد أصبحت الحل الذي لم يكن يتوقعه أحد.
              وثانيًا لما شاف العميل التطبيقات على التغليف الحقيقي — الأكياس
              والعلب وأوراق اللف — وانبسط ورأى رؤيتنا متجسدة على شيء ملموس
              بين يديه. تلك اللحظة أكدت أن الهوية الجيدة لا تُقرأ على
              الشاشة فقط، بل تُشعر بها لما تمسكها.
            </p>
          </FadeInStaggerItem>
        </FadeInStaggerContainer>

        {/* Pull Quote */}
        <FadeIn direction="up">
          <figure className="mt-px bg-[#a8b51d] px-8 py-12 text-center sm:px-16 sm:py-16">
          <blockquote className="mx-auto max-w-3xl text-2xl font-bold leading-relaxed text-white sm:text-3xl">
            "الهوية الجيدة لا تُقرأ على الشاشة فقط — بل تُشعر بها لما تمسكها."
          </blockquote>
          <figcaption className="mt-5 text-sm font-semibold text-white/70">
            فريق تاج ستوديو — مشروع زعتر وسمسم
          </figcaption>
          </figure>
        </FadeIn>
      </section>

      {/* ── Cinematic Break ── */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <Image
          src="/images/zaatar-box-highres.jpg"
          alt="تفاصيل تغليف علب معجنات مطعم زعتر وسمسم"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f6f1e8] via-transparent to-[#f6f1e8]" />
        
        {/* Centered text on the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-serif text-4xl font-bold text-white/90 drop-shadow-lg sm:text-6xl text-center leading-snug px-4">
            "تغليف يفتح الشهية.. ويعكس أصالة المذاق"
          </p>
        </div>
      </section>

      {/* ── Design Decisions Section ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
            Design Rationale
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            لماذا هذه القرارات؟
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-[#697166]">
            كل عنصر في الهوية جاء بقرار مدروس، لا باختيار عشوائي — هنا نشرح
            السبب وراء كل اختيار.
          </p>
        </div>

        <FadeInStaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "🍃",
              label: "الرمز العضوي",
              decision: "لماذا الشكل غير الهندسي؟",
              reason:
                "المطبخ الشرقي يرتبط بالطبيعة والأصالة — الشكل العضوي المنحني يوحي بالنمو والدفء، بعيداً عن الجمود الهندسي الذي يُشعر بالبرود في قطاع الأغذية.",
            },
            {
              icon: "🎨",
              label: "لوحة الألوان",
              decision: "لماذا الأخضر والذهبي معاً؟",
              reason:
                "أخضر الزيتون (#A8B51D) يجسّد الطازج والنباتي، والذهبي (#D39B51) يوحي بالخبز المحمص ودفء المطبخ. التوازن بينهما يجعل العلامة تبدو صحية وشهية في آن واحد.",
            },
            {
              icon: "✍️",
              label: "الخط",
              decision: "لماذا مزج الطابعين؟",
              reason:
                "الخط الإنجليزي ذو النبرة الدافئة (Serif) يعكس الأصالة، بينما الخط العربي ذو المقروئية الواضحة يُيسّر القراءة على التغليف من مسافة. المزيج يخدم لغتين بأسلوب بصري موحّد.",
            },
            {
              icon: "📦",
              label: "العاجي كخلفية",
              decision: "لماذا ليس الأبيض النقي؟",
              reason:
                "العاجي (#F4EFE5) يُقلل الإجهاد البصري على التغليف المطبوع، ويُعطي إحساساً بالدفء والورق الطبيعي، مما يتناسق مع هوية المطعم القائمة على الأصالة والمكوّنات الطبيعية.",
            },
          ].map((item) => (
            <FadeInStaggerItem
              key={item.label}
              direction="up"
              className="rounded-3xl border border-black/8 bg-[#fbf8f1] p-7"
            >
              <span className="text-3xl" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#84920b]">
                {item.label}
              </p>
              <h3 className="mt-2 text-lg font-bold text-[#273127]">
                {item.decision}
              </h3>
              <p className="mt-3 leading-8 text-sm text-[#697166]">{item.reason}</p>
            </FadeInStaggerItem>
          ))}
        </FadeInStaggerContainer>
      </section>

      {/* ── Client Conversation Screenshots ── */}
      <section className="bg-[#fbf8f1]">
        <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
              The Brief
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              من المحادثة إلى الفكرة
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#697166]">
              بدأ المشروع برسائل واضحة لكن بلا تصوّر بصري — هذه المحادثات
              هي التي شكّلت نقطة البداية الحقيقية.
            </p>
          </div>

          <FadeInStaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/zaatar-chat-2.jpeg", alt: "محادثة العميل - تفاصيل المطعم" },
              { src: "/images/zaatar-chat-1.jpeg", alt: "محادثة العميل - طلب تصميم الهوية" },
              { src: "/images/zaatar-chat-3.jpeg", alt: "محادثة العميل - الاتفاق على الأفكار" },
            ].map((slot) => (
              <FadeInStaggerItem
                key={slot.src}
                direction="up"
                className="group relative min-h-[400px] overflow-hidden rounded-3xl border border-[#a8b51d]/30 bg-[#f6f1e8] md:min-h-[500px]"
              >
                <Image
                  src={slot.src}
                  alt={slot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain object-top transition duration-700 hover:scale-[1.03]"
                />
              </FadeInStaggerItem>
            ))}
          </FadeInStaggerContainer>
        </div>
      </section>

      {/* ── Applications Section ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
              Applications
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              تطبيقات الهوية
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#697166]">
            تم تصميم النظام ليعمل بصورة متناسقة عبر العبوات والمطبوعات
            والحضور الرقمي، مع الحفاظ على البساطة وسهولة التعرف على العلامة.
          </p>
        </div>

        <FadeInStaggerContainer className="grid auto-rows-[260px] gap-4 md:grid-cols-4 md:auto-rows-[300px]">
          {applications.map((application, index) => (
            <FadeInStaggerItem
              key={application.src}
              direction="up"
              className={`group relative overflow-hidden rounded-3xl bg-[#e6dcc9] ${application.className}`}
            >
              <Image
                src={application.src}
                alt={application.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-[0.7]"
              />
              
              {/* Corner Registration Marks — إحساس تصميم احترافي */}
              <div className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 h-4 w-4 border-l-2 border-b-2 border-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 right-4 h-4 w-4 border-r-2 border-b-2 border-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Number label */}
              <div className="absolute left-5 top-5 font-mono text-[10px] font-bold tracking-widest text-white/0 transition-colors duration-500 group-hover:text-white/60">
                {String(index + 1).padStart(2, "0")}
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStaggerContainer>
      </section>

      {/* ── Cinematic Pizza Box Video ── */}
      <section className="relative">
        {/* Fade into dark */}
        <div className="h-32 bg-gradient-to-b from-[#f6f1e8] to-black" />

        <PizzaBoxVideo />

        {/* Fade out to next section */}
        <div className="h-32 bg-gradient-to-t from-[#273127] to-black" />
      </section>

      {/* ── Social Media After Identity ── */}
      <section className="bg-[#273127]">
        <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a8b51d]">
              Live Results
            </p>
            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
              الهوية في الحياة الحقيقية
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/65">
              كيف بدت الهوية بعد تطبيقها فعلياً على صفحة المطعم على السوشيال
              ميديا — مع العلم أن المطعم كان جديداً تماماً ولم تكن له هوية
              سابقة.
            </p>
          </div>

          <FadeInStaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { src: "/images/zaatar-realistic-1.jpg", alt: "صورة واقعية لتغليف مطعم زعتر وسمسم" },
              { src: "/images/zaatar-realistic-2.jpg", alt: "صورة واقعية لأكياس مطعم زعتر وسمسم" },
              { src: "/images/zaatar-realistic-3.jpeg", alt: "صورة واقعية لعلب البيتزا لمطعم زعتر وسمسم" },
              { src: "/images/zaatar-realistic-4.webp", alt: "صورة واقعية لأوراق التغليف لمطعم زعتر وسمسم" },
            ].map((slot) => (
              <FadeInStaggerItem
                key={slot.src}
                direction="up"
                className="relative min-h-[480px] overflow-hidden rounded-3xl border border-white/10 bg-[#1d231d] md:min-h-[600px]"
              >
                <Image
                  src={slot.src}
                  alt={slot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-top transition duration-700 hover:scale-[1.03]"
                />
              </FadeInStaggerItem>
            ))}
          </FadeInStaggerContainer>
        </div>
      </section>

      <div className="h-24 bg-gradient-to-b from-[#273127] to-[#f6f1e8]" />

      {/* ── Deliverables ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
              Deliverables
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              ماذا سُلِّم للعميل؟
            </h2>
            <p className="mt-5 leading-8 text-[#697166]">
              الهوية الكاملة تُسلَّم في حزمة منظمة تضمن سهولة التطبيق من
              أي جهة — الطباعة، الديجيتال، أو التوظيف الداخلي للفريق.
            </p>

            <FadeInStaggerContainer className="mt-10 space-y-4">
              {[
                { label: "ملفات الشعار", detail: "SVG · AI · PNG بخلفية شفافة · نسخ ألوان متعددة" },
                { label: "لوحة الألوان والخطوط", detail: "Hex · RGB · CMYK لكل لون رسمي" },
                { label: "تطبيقات الهوية", detail: "التغليف · الأكياس · العلب · أوراق اللف" },
                { label: "كتيّب الاستخدام", detail: "قواعد استخدام الشعار · مسافات الحماية · الاستخدامات الخاطئة" },
                { label: "قوالب السوشيال ميديا", detail: "صور البروفايل · أبعاد الغلاف · قوالب المنشورات" },
                { label: "ملفات الطباعة الجاهزة", detail: "PDF وTIF عالية الدقة لكل تطبيق" },
              ].map((item) => (
                <FadeInStaggerItem key={item.label} direction="up" className="flex items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#a8b51d] text-white">
                    <svg viewBox="0 0 12 10" className="h-3 w-3" fill="none">
                      <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold text-[#273127]">{item.label}</p>
                    <p className="mt-1 text-sm text-[#8b9387]">{item.detail}</p>
                  </div>
                </FadeInStaggerItem>
              ))}
            </FadeInStaggerContainer>
          </div>

          <aside className="rounded-3xl border border-[#a8b51d]/25 bg-[#fbf8f1] p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#84920b]">
              مدة التنفيذ
            </p>
            <p className="mt-3 text-5xl font-black text-[#273127]">
              3<span className="text-2xl font-bold"> أسابيع</span>
            </p>
            <p className="mt-2 text-sm text-[#8b9387]">
              من جلسة الاستماع الأولى حتى التسليم النهائي
            </p>

            <hr className="my-8 border-black/10" />

            <p className="text-xs font-bold uppercase tracking-wider text-[#84920b]">
              مراحل العمل
            </p>
            <ol className="mt-4 space-y-0">
              {[
                "الاستماع وجمع المعلومات",
                "البحث والاتجاه الإبداعي",
                "تصميم الشعار والنظام البصري",
                "تطوير التطبيقات والتغليف",
                "التسليم والتوثيق",
              ].map((step, i) => (
                <li key={step} className="relative flex items-start gap-4 pb-5 last:pb-0">
                  {/* Vertical line */}
                  {i < 4 && (
                    <div className="absolute left-3 top-8 h-[calc(100%-16px)] w-px bg-[#a8b51d]/20" />
                  )}
                  
                  {/* Number circle */}
                  <span className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#a8b51d] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  
                  <span className="pt-0.5 text-sm text-[#697166]">{step}</span>
                </li>
              ))}
            </ol>

            <Link
              href="/#contact-form"
              className="mt-8 flex w-full items-center justify-center rounded-full bg-[#a8b51d] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              ابدأ مشروعك الآن
            </Link>
          </aside>
        </div>
      </section>

      {/* ── The Solution Banner ── */}
      <section className="bg-[#a7b317]">
        <FadeIn direction="up" className="mx-auto grid max-w-[1500px] gap-10 px-6 py-14 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/75">
              The Solution
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              هوية طبيعية، مرنة، وسهلة التذكّر
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-white/85">
              {project.solution} النتيجة هي نظام بصري يمكنه التوسع من الشعار
              والتغليف إلى المواد التسويقية والمنصات الرقمية دون فقدان
              شخصيته.
            </p>
          </div>
          <Link
            href="/#contact-form"
            className="inline-flex rounded-full bg-white px-8 py-4 font-bold text-[#66720a] transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            ابدأ مشروع هوية مشابه
          </Link>
        </FadeIn>
      </section>

      {/* ── Client Testimonial ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
            Client Words
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            قالها العميل
          </h2>
        </div>

        {/* TODO: ضع اقتباساً حقيقياً من العميل بعد الحصول عليه */}
        <FadeIn direction="up">
          <figure className="relative overflow-hidden rounded-3xl bg-[#273127] p-10 sm:p-16 lg:p-20">
            {/* Large decorative quote mark */}
            <span 
              className="absolute -left-4 -top-8 select-none font-serif text-[12rem] font-black leading-none text-[#a8b51d]/[0.08]"
              aria-hidden="true"
            >
              "
            </span>
            
            <blockquote className="relative text-2xl font-bold leading-relaxed text-white sm:text-3xl lg:text-4xl lg:leading-snug">
              ما توقعنا تطلع بهذا الشكل — الأكياس والعلب بقت جزء من تجربة
              عميلنا في المطعم، الناس بتاخد صور معاهم.
            </blockquote>
            
            <div className="relative mt-10 flex items-center gap-5 border-t border-white/10 pt-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#a8b51d] text-xl font-bold text-white">
                ز
              </div>
              <div>
                <p className="text-lg font-bold text-white">شيف مطعم زعتر وسمسم</p>
                <p className="mt-0.5 text-sm text-white/50">عميل تاج ستوديو — الأحساء</p>
              </div>
            </div>
          </figure>
        </FadeIn>
      </section>

      {/* ── Related Work ── */}
      <section className="bg-[#fbf8f1]">
        <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
              More Work
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              أعمال مشابهة
            </h2>
          </div>

          <FadeInStaggerContainer className="grid gap-6 sm:grid-cols-2">
            {[
              {
                slug: "ragy-burger-brand-identity",
                title: "هوية مطعم برجر راجي",
                category: "هوية بصرية للمطاعم",
                image: "/images/ragy-identity-portfolio.webp",
              },
              {
                slug: "agricultural-development-association-brand-identity",
                title: "هوية جمعية التنمية الزراعية",
                category: "هوية مؤسسية",
                image: "/images/agricultural-development-association.avif",
              },
            ].map((relatedItem) => (
              <FadeInStaggerItem
                key={relatedItem.slug}
                direction="up"
              >
                <Link
                  href={`/work/${relatedItem.slug}`}
                  className="group relative block overflow-hidden rounded-3xl"
                >
                  <figure className="relative h-64 overflow-hidden bg-[#e6dcc9] sm:h-80">
                    <Image
                      src={relatedItem.image}
                      alt={relatedItem.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-all duration-700 group-hover:scale-[1.06] group-hover:brightness-[0.75]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    
                    {/* Arrow indicator */}
                    <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:bg-[#a8b51d] group-hover:scale-110">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                    
                    <figcaption className="absolute bottom-0 left-0 right-0 p-7">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#a8b51d]">
                        {relatedItem.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-white transition-transform duration-500 group-hover:translate-x-1">
                        {relatedItem.title}
                        <span className="mr-2 inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
                      </h3>
                    </figcaption>
                  </figure>
                </Link>
              </FadeInStaggerItem>
            ))}
          </FadeInStaggerContainer>
        </div>
      </section>

      {/* ── Footer Nav ── */}
      <section className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 px-6 py-10 text-sm text-[#72796f] sm:flex-row sm:items-center lg:px-8">
        <Link href="/work" className="font-bold text-[#7f8c0b] hover:underline">
          ← العودة إلى كل الأعمال
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#b5bfa8]">
          TAG/012 — Zaatar w Semsom
        </span>
        <Link
          href="/services/visual-identity"
          className="font-bold text-[#7f8c0b] hover:underline"
        >
          تعرف على خدمة تصميم الهوية البصرية →
        </Link>
      </section>
    </main>
  )
}

function StandardCaseStudy({ slug }: { slug: string }) {
  const item = caseStudies.find((entry) => entry.slug === slug)

  if (!item) {
    notFound()
  }

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/work/${item.slug}#creative-work`,
    name: item.title,
    creator: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "تاج ستوديو",
      url: baseUrl,
    },
    image: `${baseUrl}${item.image}`,
    description: item.solution,
    mainEntityOfPage: `${baseUrl}/work/${item.slug}`,
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <Link href="/work" className="font-semibold text-primary">
        ← العودة للأعمال
      </Link>

      <section className="mt-8 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-semibold text-primary">{item.category}</p>
          <h1 className="mt-3 text-4xl font-bold">{item.title}</h1>
          <p className="mt-5 leading-8 text-muted-foreground">
            {item.solution}
          </p>
        </div>
        <Image
          src={item.image}
          alt={item.title}
          width={900}
          height={700}
          priority
          className="rounded-3xl object-cover"
        />
      </section>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {[
          ["عن المشروع", `العميل: ${item.client} — ${item.location}`],
          ["التحدي", item.problem],
          ["الحل الإبداعي", item.solution],
          ["النتيجة", item.results],
        ].map(([title, text]) => (
          <section key={title} className="rounded-2xl border p-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="mt-3 leading-8 text-muted-foreground">{text}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border p-6">
        <h2 className="text-2xl font-bold">تطبيقات الهوية</h2>
        <ul className="mt-4 list-disc pr-6 leading-8">
          {item.applications.map((application) => (
            <li key={application}>{application}</li>
          ))}
        </ul>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/#contact-form"
          className="apple-button inline-block px-8 py-3"
        >
          ابدأ مشروعك
        </Link>
      </div>
    </main>
  )
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  if (params.slug === "zaatar-w-simsim-brand-identity") {
    return <ZaatarCaseStudy />
  }

  return <StandardCaseStudy slug={params.slug} />
}
