import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { caseStudies } from "@/lib/caseStudies"

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
  ]

  const palette = [
    { name: "أخضر الزيتون", value: "#A8B51D", text: "text-white" },
    { name: "أخضر رمادي", value: "#59645F", text: "text-white" },
    { name: "ذهبي دافئ", value: "#D39B51", text: "text-white" },
    { name: "عاجي طبيعي", value: "#F4EFE5", text: "text-neutral-900" },
  ]

  return (
    <main className="bg-[#f6f1e8] text-[#273127]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <nav className="mb-8 text-sm text-[#66705f]" aria-label="مسار التنقل">
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

        <header className="grid overflow-hidden rounded-[2rem] border border-black/5 bg-[#fbf8f1] shadow-[0_25px_80px_rgba(58,55,40,0.10)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
            <div>
              <p className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#84920b]">
                <span className="inline-block h-3 w-3 rounded-full bg-[#a8b51d]" />
                Brand Identity
              </p>

              <p className="font-serif text-5xl leading-none text-[#a5b315] sm:text-7xl lg:text-8xl">
                Zaatar w
                <span className="block text-[#c8914b]">Semsom</span>
              </p>

              <h1 className="mt-9 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                تطوير هوية مطعم زعتر وسمسم بروح طبيعية معاصرة
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#697166] sm:text-lg">
                هوية بصرية تستلهم مكوّنات الاسم وطبيعة المطبخ، وتحوّلها إلى
                نظام مرن يجمع بين البساطة والدفء، ويصلح للتغليف والمطبوعات
                والمحتوى الرقمي.
              </p>
            </div>

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
          </div>

          <div className="relative min-h-[460px] bg-[#d7a15d] lg:min-h-[760px]">
            <Image
              src={project.image}
              alt="الهوية البصرية لمطعم زعتر وسمسم"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </header>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-px px-4 pb-px sm:px-6 lg:grid-cols-3 lg:px-8">
        <article className="min-h-[520px] bg-[#fbf8f1] p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
            The Concept
          </p>
          <h2 className="mt-5 text-3xl font-bold">الفكرة الإبداعية</h2>
          <p className="mt-5 leading-8 text-[#697166]">{project.problem}</p>

          <div className="mt-12 flex items-center justify-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#d8d0bf] bg-[#efe5ca] text-center text-xs font-semibold">
              السمسم
            </div>
            <span className="text-2xl text-[#a8b51d]">←</span>
            <div className="flex h-32 w-24 rotate-12 items-center justify-center rounded-[70%_20%_70%_30%] bg-[#a8b51d] text-center text-xs font-bold text-white shadow-lg">
              رمز الهوية
            </div>
            <span className="text-2xl text-[#a8b51d]">→</span>
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#d8d0bf] bg-[#dce2bd] text-center text-xs font-semibold">
              الزعتر
            </div>
          </div>

          <p className="mt-12 border-r-4 border-[#a8b51d] pr-5 leading-8 text-[#697166]">
            تم اختزال المكوّنين الأساسيين في شكل بصري واحد، ليصبح الرمز سهل
            التذكّر وقابلًا للاستخدام منفردًا أو مع الاسم العربي والإنجليزي.
          </p>
        </article>

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

        <article className="min-h-[520px] bg-[#fbf8f1] p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#84920b]">
            Visual Language
          </p>
          <h2 className="mt-5 text-3xl font-bold">الألوان والخطوط</h2>

          <div className="mt-9 grid grid-cols-2 gap-3">
            {palette.map((color) => (
              <div
                key={color.name}
                className={`flex aspect-square flex-col justify-end rounded-2xl p-5 ${color.text}`}
                style={{ backgroundColor: color.value }}
              >
                <p className="text-sm font-bold">{color.name}</p>
                <p className="mt-1 font-mono text-xs opacity-80">{color.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-black/10 pt-8">
            <p className="text-sm font-bold uppercase tracking-wider text-[#8b9387]">
              Typography
            </p>
            <div className="mt-5 grid grid-cols-[0.8fr_1.2fr] items-end gap-5">
              <p className="font-serif text-7xl leading-none text-[#30372f]">Aa</p>
              <div>
                <p className="text-5xl font-bold leading-none">أب</p>
                <p className="mt-4 text-sm leading-7 text-[#697166]">
                  مزيج بين طابع دافئ ومقروئية واضحة في اللغتين العربية
                  والإنجليزية.
                </p>
              </div>
            </div>
          </div>
        </article>
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

        <div className="grid gap-px lg:grid-cols-3">
          {/* Card 1 — Client Brief */}
          <article className="relative overflow-hidden bg-[#fbf8f1] p-8 sm:p-12">
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
          </article>

          {/* Card 2 — Creative Vision */}
          <article className="relative overflow-hidden bg-[#f6f1e8] p-8 sm:p-12">
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
          </article>

          {/* Card 3 — Breakthrough */}
          <article className="relative overflow-hidden bg-[#eee8d8] p-8 sm:p-12">
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
          </article>
        </div>

        {/* Pull Quote */}
        <figure className="mt-px bg-[#a8b51d] px-8 py-12 text-center sm:px-16 sm:py-16">
          <blockquote className="mx-auto max-w-3xl text-2xl font-bold leading-relaxed text-white sm:text-3xl">
            "الهوية الجيدة لا تُقرأ على الشاشة فقط — بل تُشعر بها لما تمسكها."
          </blockquote>
          <figcaption className="mt-5 text-sm font-semibold text-white/70">
            فريق تاج ستوديو — مشروع زعتر وسمسم
          </figcaption>
        </figure>
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <article
              key={item.label}
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
            </article>
          ))}
        </div>
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/zaatar-chat-2.jpeg", alt: "محادثة العميل - تفاصيل المطعم" },
              { src: "/images/zaatar-chat-1.jpeg", alt: "محادثة العميل - طلب تصميم الهوية" },
              { src: "/images/zaatar-chat-3.jpeg", alt: "محادثة العميل - الاتفاق على الأفكار" },
            ].map((slot) => (
              <figure
                key={slot.src}
                className="group relative min-h-[400px] overflow-hidden rounded-3xl border border-[#a8b51d]/30 bg-[#f6f1e8] md:min-h-[500px]"
              >
                <Image
                  src={slot.src}
                  alt={slot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain object-top transition duration-700 hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>
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

        <div className="grid auto-rows-[260px] gap-4 md:grid-cols-4 md:auto-rows-[300px]">
          {applications.map((application) => (
            <figure
              key={application.src}
              className={`group relative overflow-hidden rounded-3xl bg-[#e6dcc9] ${application.className}`}
            >
              <Image
                src={application.src}
                alt={application.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { src: "/images/zaatar-social-media-1.jpg", alt: "صفحة المطعم على إنستغرام" },
              { src: "/images/zaatar-social-media-2.jpg", alt: "منشورات إنستغرام لمطعم زعتر وسمسم" },
              { src: "/images/zaatar-social-media-3.jpg", alt: "تصميمات السوشيال ميديا لمطعم زعتر وسمسم" },
              { src: "/images/zaatar-social-media-4.jpeg", alt: "ستوريات إنستغرام لمطعم زعتر وسمسم" },
            ].map((slot) => (
              <figure
                key={slot.src}
                className="relative min-h-[480px] overflow-hidden rounded-3xl border border-white/10 bg-[#1d231d] md:min-h-[600px]"
              >
                <Image
                  src={slot.src}
                  alt={slot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-top transition duration-700 hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

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

            <ul className="mt-10 space-y-4">
              {[
                { label: "ملفات الشعار", detail: "SVG · AI · PNG بخلفية شفافة · نسخ ألوان متعددة" },
                { label: "لوحة الألوان والخطوط", detail: "Hex · RGB · CMYK لكل لون رسمي" },
                { label: "تطبيقات الهوية", detail: "التغليف · الأكياس · العلب · أوراق اللف" },
                { label: "كتيّب الاستخدام", detail: "قواعد استخدام الشعار · مسافات الحماية · الاستخدامات الخاطئة" },
                { label: "قوالب السوشيال ميديا", detail: "صور البروفايل · أبعاد الغلاف · قوالب المنشورات" },
                { label: "ملفات الطباعة الجاهزة", detail: "PDF وTIF عالية الدقة لكل تطبيق" },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#a8b51d] text-white">
                    <svg viewBox="0 0 12 10" className="h-3 w-3" fill="none">
                      <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold text-[#273127]">{item.label}</p>
                    <p className="mt-1 text-sm text-[#8b9387]">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
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
            <ol className="mt-4 space-y-3">
              {[
                "الاستماع وجمع المعلومات",
                "البحث والاتجاه الإبداعي",
                "تصميم الشعار والنظام البصري",
                "تطوير التطبيقات والتغليف",
                "التسليم والتوثيق",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#eee8d8] text-xs font-bold text-[#84920b]">
                    {i + 1}
                  </span>
                  <span className="text-[#697166]">{step}</span>
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
        <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-14 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
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
        </div>
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
        <figure className="rounded-3xl bg-[#fbf8f1] p-8 sm:p-14">
          <svg
            className="mb-6 h-10 w-10 text-[#a8b51d]"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <blockquote className="text-2xl font-bold leading-relaxed text-[#273127] sm:text-3xl">
            {/* استبدل هذا النص باقتباس حقيقي من العميل */}
            ما توقعنا تطلع بهذا الشكل — الأكياس والعلب بقت جزء من تجربة
            عميلنا في المطعم، الناس بتاخد صور معاهم.
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a8b51d] font-bold text-white">
              ز
            </div>
            <div>
              <p className="font-bold text-[#273127]">صاحب مطعم زعتر وسمسم</p>
              <p className="text-sm text-[#8b9387]">عميل تاج ستوديو — القاهرة</p>
            </div>
          </figcaption>
        </figure>
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

          <div className="grid gap-6 sm:grid-cols-2">
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
              <Link
                key={relatedItem.slug}
                href={`/work/${relatedItem.slug}`}
                className="group relative overflow-hidden rounded-3xl"
              >
                <figure className="relative h-64 overflow-hidden bg-[#e6dcc9] sm:h-80">
                  <Image
                    src={relatedItem.image}
                    alt={relatedItem.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <figcaption className="absolute bottom-0 p-7 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      {relatedItem.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">{relatedItem.title}</h3>
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer Nav ── */}
      <section className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 px-6 py-10 text-sm text-[#72796f] sm:flex-row sm:items-center lg:px-8">
        <Link href="/work" className="font-bold text-[#7f8c0b] hover:underline">
          ← العودة إلى كل الأعمال
        </Link>
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
