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
      src: "/images/zaatar-identity-portfolio3.webp",
      alt: "تطبيقات هوية مطعم زعتر وسمسم",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      src: "/images/social-media-zaatar-1.avif",
      alt: "تصميم سوشيال ميديا لزعتر وسمسم",
      className: "",
    },
    {
      src: "/images/social-media-zaatar-2.avif",
      alt: "تطبيق رقمي لهوية زعتر وسمسم",
      className: "",
    },
    {
      src: "/images/social-media-zaatar-3.avif",
      alt: "منشور بصري لعلامة زعتر وسمسم",
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

      <section className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 px-6 py-10 text-sm text-[#72796f] sm:flex-row sm:items-center lg:px-8">
        <Link href="/work" className="font-bold text-[#7f8c0b] hover:underline">
          ← العودة إلى كل الأعمال
        </Link>
        <Link
          href="/services/restaurant-branding"
          className="font-bold text-[#7f8c0b] hover:underline"
        >
          تعرف على خدمة تصميم هوية المطاعم →
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
