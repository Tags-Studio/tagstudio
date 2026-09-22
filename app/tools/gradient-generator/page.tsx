import type { Metadata } from "next"
import Script from "next/script"
import GradientGeneratorClient from "./GradientGeneratorClient"

export const metadata: Metadata = {
  title: "مولّد التدرجات اللونية الفاخرة — Mesh & Grainy Gradients Builder | تاج ستوديو",
  description:
    "أداة مجانية لتصميم تدرجات لونية سائلة وعصرية (Mesh Gradients) مع ملمس نويز سينمائي (Grainy Texture) وأورورا متحركة. صدّر كود CSS، وانسخ فيكتور SVG لبرنامج Figma مباشرة، أو حمّل خلفيات 4K فائقة الدقة.",
  keywords: [
    "مولد تدرجات لونية",
    "mesh gradient generator",
    "grainy gradient",
    "تدرجات الوان فوتوشوب",
    "خلفيات جرادينت نويز",
    "gradient builder",
    "تدرجات فيجما figma",
    "تدرج لوني css",
    "aurora gradient",
    "خلفيات 4k تدرجات",
    "أدوات مصممين مجانية",
    "تاج ستوديو أدوات"
  ],
  alternates: {
    canonical: "https://www.wearetagstudio.com/tools/gradient-generator",
  },
  openGraph: {
    type: "website",
    url: "https://www.wearetagstudio.com/tools/gradient-generator",
    title: "مولّد التدرجات اللونية الفاخرة (Mesh & Grainy Gradients) | تاج ستوديو",
    description:
      "اصنع تدرجات لونية سائلة ومحببة مع نويز سينمائي مجاناً. انسخ كود CSS وفيكتور SVG لـ Figma أو حمّل خلفيات بدقة 4K.",
    images: [
      {
        url: "https://www.wearetagstudio.com/images/logo.png",
        width: 1200,
        height: 630,
        alt: "مولد التدرجات اللونية الفاخرة تاج ستوديو",
      },
    ],
    locale: "ar_SA",
    siteName: "تاج ستوديو",
  },
  twitter: {
    card: "summary_large_image",
    title: "مولّد التدرجات اللونية الفاخرة — Mesh & Grainy Gradients Builder",
    description:
      "تدرجات لونية سائلة وشبكية ونويز سينمائي. تصدير مباشر لـ Figma و CSS وخلفيات 4K مجاناً.",
    images: ["https://www.wearetagstudio.com/images/logo.png"],
  },
}

export default function GradientGeneratorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://www.wearetagstudio.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "أدوات التصميم",
        item: "https://www.wearetagstudio.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "مولد التدرجات اللونية الفاخرة",
        item: "https://www.wearetagstudio.com/tools/gradient-generator",
      },
    ],
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "مولد التدرجات اللونية الفاخرة — Mesh & Grainy Gradients Generator",
    url: "https://www.wearetagstudio.com/tools/gradient-generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "تاج ستوديو — Tag Studio",
      url: "https://www.wearetagstudio.com",
    },
    description:
      "أداة ويب تفاعلية مجانية لتوليد تدرجات Mesh و Grainy وتصديرها بصيغ SVG لـ Figma و CSS وصور 4K عالية الدقة.",
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف ألصق التدرج في برنامج فيجما (Figma) كطبقات قابلة للتعديل؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "اضغط على زر 'نسخ لـ Figma'، ثم داخل فيجما اضغط Ctrl + V. سيتم لصق التدرج فوراً كإطار SVG يحتوي على أشكال التدرج الشعاعية وفلتر البلور كطبقات حية.",
        },
      },
      {
        "@type": "Question",
        name: "ما هي دقة صور PNG التي يتم تصديرها من الأداة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتم تصدير الصور بدقة فائقة 4K UHD (3840×2160 بكسل بنسبة 16:9، أو 3000×3000 بنسبة 1:1) بنقاوة ممتازة للطباعة والتصميم.",
        },
      },
      {
        "@type": "Question",
        name: "هل كود CSS المولد متوافق مع كافة المتصفحات؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، الكود المولد يعتمد على معايير W3C القياسية لخاصية radial-gradient مع لون أساسي بديل (fallback background-color) لضمان التوافق التام.",
        },
      },
      {
        "@type": "Question",
        name: "هل الأداة مجانية وتسمح بالاستخدام التجاري؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم 100%! الأداة مجانية بالكامل بدون أي علامات مائية وتسمح لك باستخدام كافة التدرجات في مشاريعك التجارية بحرية.",
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#07090e] text-zinc-100 pt-28 md:pt-36 pb-20 selection:bg-purple-600 selection:text-white relative overflow-hidden">
        {/* Subtle Ambient Studio Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-96 -right-20 w-[500px] h-[500px] bg-pink-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-[800px] -left-20 w-[500px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

        <GradientGeneratorClient />
      </main>
    </>
  )
}
