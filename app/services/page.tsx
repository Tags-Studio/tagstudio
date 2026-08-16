import type { Metadata } from "next"
import Link from "next/link"
import { services } from "@/lib/servicesData"

const baseUrl = "https://www.wearetagstudio.com"

export const metadata: Metadata = {
  title: "خدمات تصميم الهوية البصرية والسوشيال ميديا والمطبوعات",
  description:
    "اكتشف خدمات تاج ستوديو المتخصصة في تصميم الهوية البصرية، السوشيال ميديا، المطبوعات والتغليف، وفيديو الموشن جرافيك للشركات في السعودية ومصر.",
  keywords: [
    "خدمات تصميم",
    "تصميم هوية بصرية",
    "تصميم سوشيال ميديا",
    "موشن جرافيك",
    "تصميم مطبوعات",
    "وكالة تصميم السعودية",
  ],
  alternates: {
    canonical: `${baseUrl}/services/`,
  },
  openGraph: {
    title: "خدمات تاج ستوديو — تصميم هوية بصرية وسوشيال ميديا",
    description:
      "خدمات تصميم احترافية في الهوية البصرية، السوشيال ميديا، المطبوعات والتغليف، والموشن جرافيك للشركات في السعودية ومصر.",
    url: `${baseUrl}/services/`,
    type: "website",
    locale: "ar_EG",
    siteName: "تاج ستوديو",
    images: [{ url: "/images/logo.png", width: 512, height: 512, alt: "خدمات تاج ستوديو" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "خدمات تاج ستوديو للتصميم",
    description: "تصميم هوية بصرية، سوشيال ميديا، مطبوعات، وموشن جرافيك في السعودية ومصر.",
  },
}

const icons: Record<string, string> = {
  "visual-identity": "🎨",
  "packaging-design": "📦",
  "company-profile-design": "📑",
  "product-catalog-design": "📖",
  "social-media-design": "📱",
  "print-design": "🖨️",
  "motion-graphics": "🎬",
  "branding-agency-saudi": "🇸🇦",
  "restaurant-branding": "🍔",
  "medical-clinics-branding": "🏥",
  "dates-packaging-design": "🌴",
  "annual-reports-design": "📊",
}

const serviceDescriptions: Record<string, string> = {
  "visual-identity":
    "شعار، ألوان، خطوط، ودليل هوية متكامل — نبني علامتك من الصفر حتى تسليم الملفات الجاهزة للطباعة والنشر.",
  "packaging-design":
    "تصميم علب وعبوات وتغليف للمنتجات والمطاعم مع مخططات Dieline هندسية دقيقة للمطابع.",
  "company-profile-design":
    "ملفات تعريفية مؤسسية فاخرة تبرز سابقة أعمالك للمناقصات والجهات الحكومية والشركات.",
  "product-catalog-design":
    "كتالوجات وفهارس منتجات تفاعلية للمصانع والمتاجر مع كود QR وروابط شراء مباشرة.",
  "social-media-design":
    "قوالب سوشيال ميديا مخصصة وجذابة لإنستغرام، فيسبوك، وسناب شات تعكس هويتك وتزيد التفاعل.",
  "print-design":
    "تصاميم مطبوعات وتغليف احترافية — علب، أكياس، منيوهات، كروت عمل، وكتيبات بمواصفات طباعة عالمية.",
  "motion-graphics":
    "فيديوهات موشن جرافيك إبداعية لشرح خدماتك، الإعلان عن منتجاتك، وتضخيم حضورك على السوشيال ميديا.",
}

const servicesHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${baseUrl}/services/#webpage`,
  name: "خدمات تاج ستوديو للتصميم",
  description:
    "مجموعة خدمات تاج ستوديو المتخصصة في الهوية البصرية، السوشيال ميديا، المطبوعات، والموشن جرافيك.",
  url: `${baseUrl}/services/`,
  inLanguage: "ar",
  isPartOf: { "@id": `${baseUrl}/#website` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "الخدمات", item: `${baseUrl}/services/` },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${baseUrl}/services/${s.slug}/#service`,
        name: s.title,
        description: s.metaDescription,
        url: `${baseUrl}/services/${s.slug}/`,
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "Egypt" },
        ],
      },
    })),
  },
}

export default function ServicesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesHubSchema) }}
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-secondary/30 via-background to-background border-b border-border">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="breadcrumb-nav justify-center mb-8">
              <Link href="/">الرئيسية</Link>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">الخدمات</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6 border border-primary/15">
              ✨ ما نقدمه لمشروعك
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6">
              خدمات تصميم متخصصة
              <br />
              <span className="text-primary">تبني علامتك</span> في السوق
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
              من الشعار إلى الهوية الكاملة، ومن السوشيال ميديا إلى الموشن جرافيك — كل ما تحتاجه لتبدو
              محترفاً ومتميزاً في السوق السعودي والمصري في مكان واحد.
            </p>
            <Link
              href="https://wa.me/201009215131"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.03]"
            >
              احصل على عرض سعر مجاني →
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col gap-5 p-8 rounded-3xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{icons[service.slug] ?? "🎯"}</span>
                    <div>
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {service.shortTitle}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">{service.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {serviceDescriptions[service.slug] ?? service.description}
                  </p>
                  <ul className="space-y-1.5">
                    {service.deliverables.slice(0, 3).map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5 shrink-0">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-auto">
                    اكتشف الخدمة
                    <svg
                      className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              مش عارف تختار الخدمة المناسبة؟
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              تواصل معنا وسنساعدك في اختيار الباقة المثالية لمشروعك بدون أي التزام.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://wa.me/201009215131"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-all duration-300"
              >
                استشارة مجانية على واتساب
              </Link>
              <Link
                href="/#contact-form"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-foreground border border-border rounded-full font-bold hover:bg-secondary/80 transition-all duration-300"
              >
                راسلنا من هنا
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
