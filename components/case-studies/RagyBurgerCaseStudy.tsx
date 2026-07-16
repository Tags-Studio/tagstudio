import Image from "next/image"
import Link from "next/link"
import { caseStudies } from "@/lib/caseStudies"
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn"

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

  // Placeholder applications using the main image until more are provided
  const applications = [
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لبرجر راجي 1",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لبرجر راجي 2",
      className: "",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لبرجر راجي 3",
      className: "",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لبرجر راجي 4",
      className: "md:col-span-2",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لبرجر راجي 5",
      className: "md:col-span-2",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لبرجر راجي 6",
      className: "",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لبرجر راجي 7",
      className: "",
    },
    {
      src: project.image,
      alt: "تطبيق الهوية البصرية لبرجر راجي 8",
      className: "md:col-span-4",
    },
  ]

  const palette = [
    { name: "أحمر حيوي", value: "#D92525", text: "text-white" },
    { name: "أصفر ذهبي", value: "#F2A900", text: "text-neutral-900" },
    { name: "أسود فحمي", value: "#1A1A1A", text: "text-white" },
    { name: "بيج الخبز", value: "#F4EFE5", text: "text-neutral-900" },
  ]

  return (
    <main className="bg-[#fcfaf7] text-[#1A1A1A] relative">
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
          <nav className="text-sm text-[#737373]" aria-label="مسار التنقل">
            <Link href="/" className="hover:text-[#D92525]">
              الرئيسية
            </Link>
            <span className="mx-2">/</span>
            <Link href="/work" className="hover:text-[#D92525]">
              أعمالنا
            </Link>
            <span className="mx-2">/</span>
            <span aria-current="page">برجر راجي</span>
          </nav>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-[#a3a3a3] sm:block">
            Project No. 015
          </span>
        </div>

        <FadeIn direction="up" duration={0.8}>
          <header className="group overflow-hidden rounded-[2rem] border border-black/5 bg-[#ffffff] shadow-[0_25px_80px_rgba(217,37,37,0.06)] lg:grid-cols-[1.05fr_0.95fr] lg:grid">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
              <div>
                {/* Badge */}
                <FadeIn direction="up" duration={0.6} delay={0.1}>
                  <p className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#D92525]">
                    <span className="relative inline-block h-3 w-3 overflow-hidden rounded-full bg-[#D92525]">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#D92525] opacity-40" />
                    </span>
                    Brand Identity
                  </p>
                </FadeIn>

                {/* الاسم العربي */}
                <FadeIn direction="up" duration={1} delay={0.3}>
                  <p className="font-serif text-5xl font-black leading-none text-[#1A1A1A] sm:text-6xl lg:text-7xl">
                    برجر
                    <span className="block text-[#D92525] mt-3">راجي</span>
                  </p>
                </FadeIn>

                {/* العنوان العربي */}
                <FadeIn direction="up" duration={0.8} delay={0.5}>
                  <h1 className="mt-9 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                    هوية جريئة تخطف الأنظار في سوق المطاعم المزدحم
                  </h1>
                </FadeIn>

                {/* الوصف */}
                <FadeIn direction="up" duration={0.8} delay={0.7}>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#525252] sm:text-lg">
                    {project.problem} {project.solution}
                  </p>
                </FadeIn>
              </div>

              {/* البيانات */}
              <FadeIn direction="up" duration={0.8} delay={0.9}>
                <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-black/5 pt-8 text-sm sm:grid-cols-4">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
                      العميل
                    </dt>
                    <dd className="mt-2 font-semibold">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
                      الخدمة
                    </dt>
                    <dd className="mt-2 font-semibold">{project.service}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
                      القطاع
                    </dt>
                    <dd className="mt-2 font-semibold">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
                      النطاق
                    </dt>
                    <dd className="mt-2 font-semibold">{project.location}</dd>
                  </div>
                </dl>
              </FadeIn>
            </div>

            {/* الصورة البطلة */}
            <FadeIn direction="left" duration={1.2} delay={0.4} className="relative min-h-[460px] bg-[#f9f5ed] lg:min-h-[760px] overflow-hidden group">
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92525]">
              The Creative Concept
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl text-[#1A1A1A]">
              الفكرة الإبداعية وراء برجر راجي
            </h2>
            <p className="mt-5 leading-8 text-[#525252]">
              في سوق مطاعم البرجر التنافسي في الرياض، لم يكن كافياً أن نقدم تصميماً جميلاً فقط، بل كان يجب أن يكون جريئاً وملفتاً. انطلقت الفكرة من طاقة المطبخ وسرعة التقديم ونكهة الشواء، لنترجمها في هوية بصرية تنبض بالحياة وتشجع على التذوق.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-r-2 border-[#D92525] pr-4">
                <h3 className="font-bold text-[#D92525]">حيوية وطاقة</h3>
                <p className="mt-2 text-sm leading-7 text-[#525252]">
                  الأشكال الديناميكية والمنحنيات الجريئة في الشعار تعبر عن الحركة الدائمة في المطعم والطعم الذي يوقظ الحواس.
                </p>
              </div>
              <div className="border-r-2 border-[#F2A900] pr-4">
                <h3 className="font-bold text-[#D97700]">البساطة وسهولة التذكر</h3>
                <p className="mt-2 text-sm leading-7 text-[#525252]">
                  تصميم رمز مميز وسريع القراءة ليكون البطل على أكياس التغليف وعلب البرجر التي يراها الناس في الشارع.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-[#fef5f5] p-6 text-sm leading-7 text-[#525252]">
              النتيجة هي هوية متكاملة تتحدث لغة الشباب والمحبين للوجبات السريعة عالية الجودة، وتخلق ترابطاً بصرياً فورياً مع الجوع والطعم الرائع.
            </div>
          </FadeIn>

          <FadeIn direction="left" duration={0.8} delay={0.2} className="relative min-h-[400px] p-8 lg:min-h-[600px]">
            <Image
              src={project.image}
              alt="تطبيقات هوية برجر راجي"
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
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92525]">
            Logo Anatomy
          </p>
          <h2 className="mt-5 text-3xl font-bold">هيكل الشعار</h2>

          <div className="mt-10 space-y-8">
            <div className="rounded-2xl border border-black/5 bg-[#ffffff] p-7 text-center shadow-sm">
              <p className="font-black text-4xl text-[#1A1A1A] tracking-tighter">Ragy Burger</p>
              <p className="mt-3 text-2xl font-black text-[#D92525]">برجر راجي</p>
              <p className="mt-4 text-xs text-[#a3a3a3]">التركيب النصي الأساسي</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/5 bg-[#ffffff] shadow-sm p-6 flex flex-col items-center justify-center">
                <div className="h-16 w-16 bg-[#D92525] rounded-full transform" />
                <p className="mt-4 text-xs text-[#a3a3a3]">رمز الطاقة</p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-[#ffffff] shadow-sm p-6 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-lg border-4 border-[#1A1A1A] border-t-[#D92525] rotate-12" />
                <p className="mt-4 text-xs text-[#a3a3a3]">الشكل الهندسي الحر</p>
              </div>
            </div>
          </div>
          </article>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <article className="min-h-[520px] bg-[#ffffff] p-8 sm:p-12 rounded-tl-3xl rounded-bl-3xl lg:rounded-tl-none lg:rounded-br-3xl shadow-sm border border-black/5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92525]">
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
            <p className="text-sm font-bold uppercase tracking-wider text-[#a3a3a3]">
              Typography
            </p>
            <div className="mt-5 grid grid-cols-[0.8fr_1.2fr] items-end gap-5">
              <p className="font-black text-7xl leading-none text-[#1A1A1A]">Aa</p>
              <div>
                <p className="text-5xl font-black leading-none text-[#1A1A1A]">أب</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
                  Modern Bold Font
                </p>
                <p className="mt-2 text-sm leading-7 text-[#525252]">
                  خط سميك وجريء يعكس الشخصية القوية للعلامة ويسهل قراءته من مسافات بعيدة على اللافتات والتغليف.
                </p>
              </div>
            </div>
          </div>
          </article>
        </FadeIn>
      </section>

      {/* ── Design Decisions Section ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92525]">
            Design Rationale
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            فلسفة الألوان والخطوط
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-[#525252]">
            كل قرار تصميمي جاء لخدمة استراتيجية المطعم في لفت الانتباه وصنع هوية شهية.
          </p>
        </div>

        <FadeInStaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "🍔",
              label: "الأحمر الحيوي والذهبي",
              decision: "ألوان تفتح الشهية",
              reason:
                "الأحمر هو لون الطاقة ويُثبت علمياً قدرته على تحفيز الشهية، بينما الذهبي يذكرنا بلون الجبن الذائب والبطاطس المقرمشة.",
            },
            {
              icon: "🖤",
              label: "الأسود الفحمي",
              decision: "التباين والقوة",
              reason:
                "استخدام الأسود ليس للحداد بل للجرأة، يعطي تبايناً مثالياً مع الأحمر والأصفر، ويرمز للخبز الداكن والشواء القوي على الفحم.",
            },
            {
              icon: "✍️",
              label: "Modern Bold Font",
              decision: "خط جريء للفت الانتباه",
              reason:
                "اختيار خطوط بوزن ثقيل (Bold و Black) يضمن أن يبدو الاسم ضخماً ومشبعاً مثل الوجبة التي يقدمها، مما يترك أثراً بصرياً عميقاً.",
            },
          ].map((item) => (
            <FadeInStaggerItem
              key={item.label}
              direction="up"
              className="rounded-3xl border border-black/5 bg-[#ffffff] shadow-sm p-7"
            >
              <span className="text-3xl" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#D92525]">
                {item.label}
              </p>
              <h3 className="mt-2 text-lg font-bold text-[#1A1A1A]">
                {item.decision}
              </h3>
              <p className="mt-3 leading-8 text-sm text-[#525252]">{item.reason}</p>
            </FadeInStaggerItem>
          ))}
        </FadeInStaggerContainer>
      </section>

      {/* ── Applications Section ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92525]">
              Applications
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              تطبيقات الهوية
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#525252]">
            تظهر قوة الهوية في التغليف المبتكر الذي يحوّل كل عميل يحمل الكيس إلى سفير للعلامة التجارية في الشارع.
          </p>
        </div>

        <FadeInStaggerContainer className="grid auto-rows-[260px] gap-4 md:grid-cols-4 md:auto-rows-[300px]">
          {applications.map((application, index) => (
            <FadeInStaggerItem
              key={`${application.src}-${index}`}
              direction="up"
              className={`group relative overflow-hidden rounded-3xl bg-[#fef5f5] ${application.className}`}
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92525]">
              Deliverables
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              ماذا سُلِّم للعميل؟
            </h2>
            <p className="mt-5 leading-8 text-[#525252]">
              دليل متكامل وتطبيقات جاهزة للطباعة فوراً لضمان انتقال سلس من مرحلة التصميم إلى مرحلة التشغيل.
            </p>

            <FadeInStaggerContainer className="mt-10 space-y-4">
              {[
                { label: "ملفات الشعار", detail: "النسخ الأصلية بصيغ متعددة (AI, PDF, PNG)" },
                { label: "تصاميم التغليف", detail: "علب البرجر، البطاطس، الأكياس الورقية، وورق التغليف" },
                { label: "الدليل البصري (Brand Guidelines)", detail: "دليل يوضح النسب ومسافات الأمان وأكواد الألوان" },
                { label: "قوالب السوشيال ميديا", detail: "بوستات جاهزة للاستخدام للترويج للعروض والمنتجات" },
                { label: "يونيفورم الموظفين", detail: "تصميم الملابس والتيشيرتات ومرايل المطبخ" },
              ].map((item) => (
                <FadeInStaggerItem key={item.label} direction="up" className="flex items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D92525] text-white">
                    <svg viewBox="0 0 12 10" className="h-3 w-3" fill="none">
                      <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold text-[#1A1A1A]">{item.label}</p>
                    <p className="mt-1 text-sm text-[#a3a3a3]">{item.detail}</p>
                  </div>
                </FadeInStaggerItem>
              ))}
            </FadeInStaggerContainer>
          </div>

          <aside className="rounded-3xl border border-[#D92525]/20 bg-[#ffffff] shadow-sm p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D92525]">
              مدة التنفيذ
            </p>
            <p className="mt-3 text-5xl font-black text-[#1A1A1A]">
              3<span className="text-2xl font-bold"> أسابيع</span>
            </p>
            <p className="mt-2 text-sm text-[#a3a3a3]">
              من الفكرة إلى التسليم النهائي للطباعة
            </p>

            <hr className="my-8 border-black/5" />

            <Link
              href="/#contact-form"
              className="flex w-full items-center justify-center rounded-full bg-[#D92525] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              ابدأ تصميم مطعمك الآن
            </Link>
          </aside>
        </div>
      </section>

      {/* ── The Solution Banner ── */}
      <section className="bg-[#D92525]">
        <FadeIn direction="up" className="mx-auto grid max-w-[1500px] gap-10 px-6 py-14 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/75">
              The Solution
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              هوية جريئة تترك أثراً بصرياً لا يُنسى
            </h2>
            <p className="mt-5 max-w-3xl leading-8 text-white/85">
              {project.solution} النتيجة هي نظام بصري يجمع بين الشهية والحيوية، ويعزز من تواجد العلامة في سوق المطاعم السريعة كعلامة شبابية متميزة.
            </p>
          </div>
          <Link
            href="/#contact-form"
            className="inline-flex rounded-full bg-white px-8 py-4 font-bold text-[#D92525] transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            ابدأ مشروع مطعمك
          </Link>
        </FadeIn>
      </section>

      {/* ── Client Testimonial ── */}
      <section className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92525]">
            Client Words
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            قالها العميل
          </h2>
        </div>

        <FadeIn direction="up">
          <figure className="relative overflow-hidden rounded-3xl bg-[#ffffff] border border-black/5 p-10 sm:p-16 lg:p-20 shadow-sm">
            <span 
              className="absolute -left-4 -top-8 select-none font-serif text-[12rem] font-black leading-none text-[#D92525]/[0.08]"
              aria-hidden="true"
            >
              "
            </span>
            
            <blockquote className="relative text-2xl font-bold leading-relaxed text-[#1A1A1A] sm:text-3xl lg:text-4xl lg:leading-snug">
              التغليف شكله رائع جداً وجريء.. العملاء أصبحوا يتعرفون على الأكياس الخاصة بنا في الشارع من مسافة بعيدة!
            </blockquote>
            
            <div className="relative mt-10 flex items-center gap-5 border-t border-black/5 pt-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D92525] text-xl font-bold text-white">
                ر
              </div>
              <div>
                <p className="text-lg font-bold text-[#1A1A1A]">إدارة مطعم برجر راجي</p>
                <p className="mt-0.5 text-sm text-[#a3a3a3]">عميل تاج ستوديو — الرياض</p>
              </div>
            </div>
          </figure>
        </FadeIn>
      </section>

      {/* ── Related Work ── */}
      <section className="bg-[#ffffff] border-t border-black/5">
        <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D92525]">
              More Work
            </p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              أعمال مشابهة
            </h2>
          </div>

          <FadeInStaggerContainer className="grid gap-6 sm:grid-cols-2">
            {[
              {
                slug: "zaatar-w-simsim-brand-identity",
                title: "هوية مطعم زعتر وسمسم",
                category: "هوية بصرية للمطاعم",
                image: "/images/zaatar-box-highres.jpg",
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
                    <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:bg-[#D92525] group-hover:scale-110">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                    
                    <figcaption className="absolute bottom-0 left-0 right-0 p-7">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#D92525]">
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
      <section className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 px-6 py-10 text-sm text-[#a3a3a3] sm:flex-row sm:items-center lg:px-8 border-t border-black/5">
        <Link href="/work" className="font-bold text-[#D92525] hover:underline">
          ← العودة إلى كل الأعمال
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#a3a3a3]">
          TAG/015 — Ragy Burger
        </span>
        <Link
          href="/services/visual-identity"
          className="font-bold text-[#D92525] hover:underline"
        >
          تعرف على خدمة تصميم الهوية البصرية →
        </Link>
      </section>
    </main>
  )
}
