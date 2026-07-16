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

  // Placeholder applications using the main image until more are provided
  const applications = [
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لجمعية التنمية الزراعية 1",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لجمعية التنمية الزراعية 2",
      className: "",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لجمعية التنمية الزراعية 3",
      className: "",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لجمعية التنمية الزراعية 4",
      className: "md:col-span-2",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لجمعية التنمية الزراعية 5",
      className: "md:col-span-2",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لجمعية التنمية الزراعية 6",
      className: "",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لجمعية التنمية الزراعية 7",
      className: "",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لجمعية التنمية الزراعية 8",
      className: "md:col-span-4",
    },
  ]

  const palette = [
    { name: "أخضر زراعي", value: "#2D452B", text: "text-white" },
    { name: "أخضر حيوي", value: "#6BA642", text: "text-white" },
    { name: "ترابي أصيل", value: "#9C7B5A", text: "text-white" },
    { name: "خلفية رملية", value: "#F7F4EC", text: "text-neutral-900" },
  ]

  return (
    <main className="bg-[#F7F4EC] text-[#2D452B] relative">
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
          <nav className="text-sm text-[#50684e]" aria-label="مسار التنقل">
            <Link href="/" className="hover:text-[#6ba642]">
              الرئيسية
            </Link>
            <span className="mx-2">/</span>
            <Link href="/work" className="hover:text-[#6ba642]">
              أعمالنا
            </Link>
            <span className="mx-2">/</span>
            <span aria-current="page">جمعية التنمية الزراعية</span>
          </nav>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[#9cae99] sm:block">
            Project No. 018
          </span>
        </div>

        <FadeIn direction="up" duration={0.8}>
          <header className="group overflow-hidden rounded-[2rem] border border-black/5 bg-[#ffffff] shadow-[0_25px_80px_rgba(45,69,43,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:grid">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
              <div>
                {/* Badge */}
                <FadeIn direction="up" duration={0.6} delay={0.1}>
                  <p className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#6ba642]">
                    <span className="relative inline-block h-3 w-3 overflow-hidden rounded-full bg-[#6ba642]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#6ba642] opacity-40" />
                    </span>
                    Institutional Identity
                  </p>
                </FadeIn>

                {/* الاسم الإنجليزي */}
                <FadeIn direction="up" duration={1} delay={0.3}>
                  <p className="font-serif text-5xl leading-none text-[#2d452b] sm:text-6xl lg:text-7xl">
                    Agricultural
                    <span className="block text-[#6ba642]">Development</span>
                  </p>
                </FadeIn>

                {/* العنوان العربي */}
                <FadeIn direction="up" duration={0.8} delay={0.5}>
                  <h1 className="mt-9 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                    بناء هوية مؤسسية تعكس الأصالة، التنمية، والارتباط بالأرض
                  </h1>
                </FadeIn>

                {/* الوصف */}
                <FadeIn direction="up" duration={0.8} delay={0.7}>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#50684e] sm:text-lg">
                    {project.problem} {project.solution}
                  </p>
                </FadeIn>
              </div>

              {/* البيانات */}
              <FadeIn direction="up" duration={0.8} delay={0.9}>
                <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-black/5 pt-8 text-sm sm:grid-cols-4">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#9cae99]">
                      العميل
                    </dt>
                    <dd className="mt-2 font-semibold">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#9cae99]">
                      الخدمة
                    </dt>
                    <dd className="mt-2 font-semibold">{project.service}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#9cae99]">
                      القطاع
                    </dt>
                    <dd className="mt-2 font-semibold">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#9cae99]">
                      النطاق
                    </dt>
                    <dd className="mt-2 font-semibold">{project.location}</dd>
                  </div>
                </dl>
              </FadeIn>
            </div>

            {/* الصورة البطلة (بديلة عن الفيديو) */}
            <FadeIn direction="left" duration={1.2} delay={0.4} className="relative min-h-[460px] bg-[#eef2ec] lg:min-h-[760px] overflow-hidden group">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </FadeIn>
          </header>
        </FadeIn>
      </section>

      {/* ── The Creative Concept ── */}
      <section className="bg-[#ffffff]">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
          <FadeIn direction="right" duration={0.8} className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6ba642]">
              The Creative Concept
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl text-[#2d452b]">
              الفكرة الإبداعية للجمعية
            </h2>
            <p className="mt-5 leading-8 text-[#50684e]">
              انطلقت فكرة الهوية من طبيعة النشاط الزراعي الذي تقوم به الجمعية في منطقة الأحساء الشهيرة بالنخيل والمزروعات. الهدف كان بناء رمز مؤسسي رسمي يعبر عن الثقة والنمو في آن واحد، ليكون واجهة للجمعية أمام الجهات الحكومية والمجتمعية.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-r-2 border-[#6ba642] pr-4">
                <h3 className="font-bold text-[#6ba642]">النمو والزراعة</h3>
                <p className="mt-2 text-sm leading-7 text-[#50684e]">
                  تم استيحاء عناصر الشعار من وريقات النخيل والنباتات لتعكس الطابع الزراعي الأساسي للجمعية ولترتبط ببيئة الأحساء.
                </p>
              </div>
              <div className="border-r-2 border-[#9c7b5a] pr-4">
                <h3 className="font-bold text-[#9c7b5a]">الطابع المؤسسي</h3>
                <p className="mt-2 text-sm leading-7 text-[#50684e]">
                  تمت موازنة الخطوط والألوان لتعطي إحساساً بالاستقرار والرسمية لتتناسب مع كونها جهة تنموية وتطوعية ذات وزن اعتباري.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-[#f0f4ec] p-6 text-sm leading-7 text-[#50684e]">
              الشعار ليس مجرد رسمة لنخلة، بل هو نظام متكامل يعبر عن التنمية المستدامة، ويسهل استخدامه في المخاطبات الرسمية، الفعاليات، والمحتوى الرقمي التوعوي.
            </div>
          </FadeIn>

          <FadeIn direction="left" duration={0.8} delay={0.2} className="relative min-h-[400px] p-8 lg:min-h-[600px]">
            <Image
              src={project.image}
              alt="تطبيقات هوية جمعية التنمية الزراعية"
              fill
              className="object-contain p-4"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── Visual Language ── */}
      <section className="mx-auto grid max-w-[1500px] gap-px px-4 pb-px sm:px-6 lg:grid-cols-2 lg:px-8 mt-12">
        <FadeIn direction="up">
          <article className="min-h-[520px] bg-[#ffffff] p-8 sm:p-12 rounded-tr-3xl rounded-br-3xl lg:rounded-br-none lg:rounded-tl-3xl shadow-sm border border-black/5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6ba642]">
            Logo Anatomy
          </p>
          <h2 className="mt-5 text-3xl font-bold">هيكل الشعار</h2>

          <div className="mt-10 space-y-8">
            <div className="rounded-2xl border border-black/5 bg-[#f7f4ec] p-7 text-center">
              <p className="font-serif text-3xl text-[#2d452b]">Agri-Dev Association</p>
              <p className="mt-3 text-xl font-bold text-[#6ba642]">جمعية التنمية الزراعية</p>
              <p className="mt-4 text-xs text-[#9cae99]">التركيب النصي الأساسي</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/5 bg-[#f7f4ec] p-6 flex flex-col items-center justify-center">
                <div className="h-16 w-16 bg-[#6ba642] rounded-[50%_0_50%_50%] transform rotate-45" />
                <p className="mt-4 text-xs text-[#9cae99]">رمز النمو</p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-[#f7f4ec] p-6 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full border-4 border-[#2d452b] border-t-[#6ba642]" />
                <p className="mt-4 text-xs text-[#9cae99]">التكامل المستدام</p>
              </div>
            </div>
          </div>
          </article>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <article className="min-h-[520px] bg-[#ffffff] p-8 sm:p-12 rounded-tl-3xl rounded-bl-3xl lg:rounded-tl-none lg:rounded-br-3xl shadow-sm border border-black/5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6ba642]">
            Visual Language
          </p>
          <h2 className="mt-5 text-3xl font-bold">الألوان والخطوط</h2>

          <div className="mt-9">
            <div 
              className="relative flex h-40 items-end overflow-hidden rounded-3xl p-7 sm:h-52"
              style={{ backgroundColor: palette[0].value }}
            >
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">{palette[0].name}</p>
                <p className="mt-1 font-mono text-sm text-white/60">{palette[0].value}</p>
              </div>
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10 sm:h-56 sm:w-56" />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {palette.slice(1).map((color) => (
                <div
                  key={color.name}
                  className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${color.text}`}
                  style={{ backgroundColor: color.value }}
                >
                  <p className="text-sm font-bold">{color.name}</p>
                  <p className="mt-0.5 font-mono text-xs opacity-70">{color.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-black/5 pt-8">
            <p className="text-sm font-bold uppercase tracking-wider text-[#9cae99]">
              Typography
            </p>
            <div className="mt-5 grid grid-cols-[0.8fr_1.2fr] items-end gap-5">
              <p className="font-serif text-7xl leading-none text-[#2d452b]">Aa</p>
              <div>
                <p className="text-5xl font-bold leading-none text-[#2d452b]">أب</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#9cae99]">
                  Institutional Kufi
                </p>
                <p className="mt-2 text-sm leading-7 text-[#50684e]">
                  خط كوفي هندسي يعكس الرسمية والاستقرار في المخاطبات الرسمية للجمعية.
                </p>
              </div>
            </div>
          </div>
          </article>
        </FadeIn>
      </section>

      {/* ── Applications Section ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6ba642]">
              Applications
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              تطبيقات الهوية
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#50684e]">
            تم تصميم النظام ليعمل بصورة متناسقة عبر المطبوعات الرسمية والمحتوى
            الرقمي والفعاليات.
          </p>
        </div>

        <FadeInStaggerContainer className="grid auto-rows-[260px] gap-4 md:grid-cols-4 md:auto-rows-[300px]">
          {applications.map((application, index) => (
            <FadeInStaggerItem
              key={`${application.src}-${index}`}
              direction="up"
              className={`group relative overflow-hidden rounded-3xl bg-[#f0f4ec] ${application.className}`}
            >
              <Image
                src={application.src}
                alt={application.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-[0.8]"
              />
              <div className="absolute left-5 top-5 font-mono text-[10px] font-bold tracking-widest text-white/0 transition-colors duration-500 group-hover:text-white/80 drop-shadow-md">
                {String(index + 1).padStart(2, "0")}
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStaggerContainer>
      </section>

      {/* ── Deliverables ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6ba642]">
              Deliverables
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              ماذا سُلِّم للجمعية؟
            </h2>
            <p className="mt-5 leading-8 text-[#50684e]">
              تم تزويد الجمعية بكافة الملفات الضرورية لضمان استمرارية استخدام الهوية بكفاءة في المطبوعات والمناسبات الرسمية.
            </p>

            <FadeInStaggerContainer className="mt-10 space-y-4">
              {[
                { label: "ملفات الشعار", detail: "النسخ الأصلية بصيغ متعددة (AI, PDF, PNG)" },
                { label: "الهوية المؤسسية", detail: "ورق المراسلات، الأظرف، كروت العمل، والأختام" },
                { label: "الدليل البصري (Brand Guidelines)", detail: "دليل إرشادي يوضح طرق استخدام الهوية بشكل صحيح" },
                { label: "قوالب العروض والتقارير", detail: "قوالب Word و PowerPoint لتقارير الجمعية السنوية" },
                { label: "مستلزمات الفعاليات", detail: "تصاميم للرول أب، البنرات، وبطاقات التعريف (ID Cards)" },
              ].map((item) => (
                <FadeInStaggerItem key={item.label} direction="up" className="flex items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#6ba642] text-white">
                    <svg viewBox="0 0 12 10" className="h-3 w-3" fill="none">
                      <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold text-[#2d452b]">{item.label}</p>
                    <p className="mt-1 text-sm text-[#9cae99]">{item.detail}</p>
                  </div>
                </FadeInStaggerItem>
              ))}
            </FadeInStaggerContainer>
          </div>

          <aside className="rounded-3xl border border-[#6ba642]/20 bg-[#ffffff] shadow-sm p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#6ba642]">
              مدة التنفيذ
            </p>
            <p className="mt-3 text-5xl font-black text-[#2d452b]">
              4<span className="text-2xl font-bold"> أسابيع</span>
            </p>
            <p className="mt-2 text-sm text-[#9cae99]">
              مرحلة بحث وتطوير واعتمادات إدارية
            </p>

            <hr className="my-8 border-black/5" />

            <Link
              href="/#contact-form"
              className="flex w-full items-center justify-center rounded-full bg-[#6ba642] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              ابدأ مشروع جمعيتك الآن
            </Link>
          </aside>
        </div>
      </section>

      {/* ── Footer Nav ── */}
      <section className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 px-6 py-10 text-sm text-[#9cae99] sm:flex-row sm:items-center lg:px-8 border-t border-black/5">
        <Link href="/work" className="font-bold text-[#6ba642] hover:underline">
          ← العودة إلى كل الأعمال
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#9cae99]">
          TAG/018 — Agricultural Dev
        </span>
        <Link
          href="/services/visual-identity"
          className="font-bold text-[#6ba642] hover:underline"
        >
          تعرف على خدمة تصميم الهوية البصرية →
        </Link>
      </section>
    </main>
  )
}
