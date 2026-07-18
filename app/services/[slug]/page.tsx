import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServiceBySlug, services } from "@/lib/servicesData"

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
  "تبدأ مشروعًا جديدًا وتحتاج نظامًا بصريًا واضحًا من البداية.",
  "لديك تصميمات متفرقة أو هوية غير متناسقة بين القنوات المختلفة.",
  "تخطط للتوسع وتحتاج ملفات وقواعد يسهل على فريقك تطبيقها.",
  "تريد اتخاذ قرارات التصميم بناءً على الجمهور والسوق وليس الذوق الشخصي فقط.",
]

const notFitPoints = [
  "تبحث عن تنفيذ سريع لعنصر واحد دون فهم المشروع أو سياقه.",
  "لم تحدد بعد طبيعة النشاط أو الجمهور أو الخدمة الأساسية.",
  "تريد أرخص تنفيذ ممكن بغض النظر عن الاستراتيجية أو قابلية التطبيق.",
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
    name: service.shortTitle,
    description: service.metaDescription,
    url: canonical,
    image: `${baseUrl}${service.image}`,
    areaServed: [
      {
        "@type": "Country",
        name: "Egypt",
      },
      {
        "@type": "Country",
        name: "Saudi Arabia",
      },
    ],
    provider: {
      "@type": "ProfessionalService",
      "@id": `${baseUrl}/#organization`,
      name: "تاج ستوديو",
      url: `${baseUrl}/`,
      telephone: "+201009215131",
    },
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
        item: `${baseUrl}/#services`,
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

      <article className="relative isolate overflow-hidden">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <nav
              aria-label="مسار التنقل"
              className="mb-6 text-sm text-muted-foreground"
            >
              <Link href="/" className="hover:text-primary">
                الرئيسية
              </Link>
              <span className="mx-2">/</span>
              <span>الخدمات</span>
              <span className="mx-2">/</span>
              <span aria-current="page">{service.shortTitle}</span>
            </nav>

            <p className="mb-4 font-semibold text-primary">خدمات تاج ستوديو</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/201009215131?text=${encodeURIComponent(
                  `مرحبًا، أريد الاستفسار عن خدمة ${service.shortTitle}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-button px-7 py-3"
              >
                اطلب استشارة
              </a>
              <Link
                href="/work"
                className="rounded-full border border-border px-7 py-3 font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                شاهد أعمالنا
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="border-y border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-semibold text-primary">ما الذي تحصل عليه؟</p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                مخرجات واضحة قابلة للاستخدام
              </h2>
            </div>

            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border bg-background/70 p-6 text-foreground"
                >
                  <span className="ml-3 font-bold text-primary">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-semibold text-primary">منهجية تاج</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              نظام TAG لبناء علامات أكثر وضوحًا
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              لا نبدأ التصميم من الفراغ. نستخدم منهجية تربط فهم السوق
              والاستراتيجية بالنظام البصري والتطبيق العملي.
            </p>
          </div>

          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {tagMethod.map((step) => (
              <li
                key={step.letter}
                className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-3 -top-8 text-[9rem] font-black leading-none text-primary/[0.07]"
                >
                  {step.letter}
                </span>
                <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-2xl font-black text-primary-foreground">
                  {step.letter}
                </span>
                <h3 className="relative mt-6 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="relative mt-4 leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-y border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-semibold text-primary">طريقة العمل</p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">
                خطوات منظمة من الفكرة إلى التسليم
              </h2>
            </div>

            <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-border bg-background/70 p-6"
                >
                  <span className="text-2xl font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-semibold text-primary">قبل أن تبدأ</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              هل هذه الخدمة مناسبة لمشروعك؟
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              نفضل أن يكون نطاق العمل مناسبًا فعلًا لمرحلة المشروع، لذلك نوضح
              لك متى تحقق الخدمة أفضل قيمة ومتى قد تحتاج حلًا أبسط.
            </p>
          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            <section className="rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.05] p-7">
              <h3 className="text-2xl font-bold text-foreground">
                الخدمة مناسبة لك إذا:
              </h3>
              <ul className="mt-6 space-y-4">
                {fitPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-lg font-bold text-emerald-600">
                      ✓
                    </span>
                    <span className="leading-7 text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-amber-500/20 bg-amber-500/[0.05] p-7">
              <h3 className="text-2xl font-bold text-foreground">
                قد تحتاج خيارًا أبسط إذا:
              </h3>
              <ul className="mt-6 space-y-4">
                {notFitPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-lg font-bold text-amber-600">
                      •
                    </span>
                    <span className="leading-7 text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section className="border-y border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="font-semibold text-primary">القيمة للمشروع</p>
                <h2 className="mt-2 text-3xl font-bold text-foreground">
                  لماذا تستثمر في {service.shortTitle}؟
                </h2>
                <p className="mt-5 leading-8 text-muted-foreground">
                  الهدف ليس إنتاج تصميم جميل فقط، بل بناء أصل بصري يدعم
                  التسويق والمبيعات ويجعل العلامة أكثر وضوحًا واتساقًا أمام
                  جمهورها.
                </p>
              </div>

              <ul className="grid gap-4">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="rounded-2xl border border-border bg-background/70 p-5 font-semibold text-foreground"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <p className="font-semibold text-primary">الأسئلة الشائعة</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              معلومات مهمة قبل بدء المشروع
            </h2>
          </div>

          <div className="mt-12 space-y-5">
            {service.faq.map((item) => (
              <section
                key={item.question}
                className="rounded-2xl border border-border bg-card/40 p-6"
              >
                <h3 className="text-lg font-bold text-foreground">
                  {item.question}
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24 text-center lg:px-8">
          <div className="rounded-3xl border border-primary/20 bg-card p-10">
            <h2 className="text-3xl font-bold text-foreground">
              جاهز لبناء حضور بصري أقوى؟
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground">
              شاركنا تفاصيل مشروعك وسنساعدك على تحديد النطاق الأنسب بدل شراء
              عناصر لا يحتاجها المشروع.
            </p>
            <a
              href={`https://wa.me/201009215131?text=${encodeURIComponent(
                `مرحبًا، أريد عرض سعر لخدمة ${service.shortTitle}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button mt-7 inline-block px-8 py-3"
            >
              تواصل معنا عبر واتساب
            </a>
          </div>
        </section>

        {/* FAQ Schema */}
        {service.faq && service.faq.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
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
              }),
            }}
          />
        )}
      </article>
    </>
  )
}
