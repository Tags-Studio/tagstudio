import type { Metadata } from "next"
import Script from "next/script"
import NationalDay96Client from "./NationalDay96Client"

export const metadata: Metadata = {
  title: "تحميل هوية وشعار اليوم الوطني السعودي 96 (2026) — عزنا بطبعنا PDF و PNG ورسومات تلوين | تاج ستوديو",
  description:
    "حمّل مجاناً هوية وشعار اليوم الوطني السعودي 96 (عزنا بطبعنا) مفرغ PNG عالي الدقة، دليل الهوية PDF، فيديو موشن الشعار MP4، ورسومات تلوين للمدارس، صور وخلفيات 4K، والخطوط الرسمية من وزارة الثقافة.",
  keywords: [
    "تحميل هوية اليوم الوطني 96",
    "شعار اليوم الوطني 2026",
    "شعار اليوم الوطني 96",
    "الهوية البصرية لليوم الوطني 96",
    "هوية اليوم الوطني السعودي 2026",
    "شعار عزنا بطبعنا",
    "لوجو اليوم الوطني السعودي",
    "لوجو عزنا بطبعنا png",
    "دليل هوية اليوم الوطني pdf",
    "متى اليوم الوطني السعودي 96",
    "صور اليوم الوطني 96",
    "خلفيات اليوم الوطني 96",
    "رسومات تلوين لليوم الوطني 96",
    "رسم اليوم الوطني 96",
    "تلوين شعار اليوم الوطني",
    "خطوط اليوم الوطني 96",
    "الخط السعودي",
    "تحميل فيديو شعار اليوم الوطني 96",
    "فيديو عزنا بطبعنا mp4",
    "أغاني اليوم الوطني 96",
    "تاج ستوديو",
    "تصميم هوية اليوم الوطني"
  ],
  alternates: {
    canonical: "https://www.wearetagstudio.com/tools/saudi-national-day-96-identity",
  },
  openGraph: {
    type: "article",
    url: "https://www.wearetagstudio.com/tools/saudi-national-day-96-identity",
    title: "تحميل هوية وشعار اليوم الوطني السعودي 96 (2026) — عزنا بطبعنا PDF و PNG ورسومات تلوين",
    description:
      "حمّل مجاناً هوية وشعار اليوم الوطني السعودي 96 (عزنا بطبعنا) مفرغ PNG عالي الدقة، دليل الهوية PDF، فيديو موشن الشعار MP4، ورسومات تلوين للمدارس، صور وخلفيات 4K، وأغاني اليوم الوطني.",
    images: [
      {
        url: "https://a-amaq.com/assets/blog/2026/07/saudi-national-day-96-identity.webp",
        width: 1200,
        height: 630,
        alt: "تحميل هوية وشعار اليوم الوطني السعودي 96 عزنا بطبعنا",
      },
    ],
    locale: "ar_SA",
    siteName: "تاج ستوديو - Tag Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "تحميل هوية وشعار اليوم الوطني السعودي 96 (2026) — عزنا بطبعنا PDF و PNG ورسومات تلوين",
    description:
      "حمّل مجاناً هوية وشعار اليوم الوطني السعودي 96 مفرغ PNG عالي الدقة، دليل الهوية PDF، فيديو موشن الشعار MP4، ورسومات تلوين للمدارس والخطوط الرسمية.",
    images: ["https://a-amaq.com/assets/blog/2026/07/saudi-national-day-96-identity.webp"],
  },
}

export default function SaudiNationalDay96Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://www.wearetagstudio.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "أدواتنا",
        item: "https://www.wearetagstudio.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "تحميل هوية وشعار اليوم الوطني السعودي 96",
        item: "https://www.wearetagstudio.com/tools/saudi-national-day-96-identity",
      },
    ],
  }

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "تحميل فيديو شعار اليوم الوطني السعودي 96 عزنا بطبعنا بدقة 1080p Full HD",
    description:
      "فيديو موشن جرافيك رسمي لشعار وهوية اليوم الوطني السعودي 96 (عزنا بطبعنا) بصيغة MP4 عالية الجودة بدون حقوق جاهز للمونتاج ولتصاميم السوشيال ميديا وتيك توك وإنستغرام.",
    thumbnailUrl: ["https://a-amaq.com/assets/blog/2026/07/saudi-national-day-96-identity.webp"],
    uploadDate: "2026-07-28T12:00:00+03:00",
    contentUrl: "https://a-amaq.com/assets/national-day-96/SaudiNationalDay_Outro.mp4",
    embedUrl: "https://www.wearetagstudio.com/tools/saudi-national-day-96-identity#download-video",
    inLanguage: "ar",
    publisher: {
      "@type": "Organization",
      name: "تاج ستوديو - Tag Studio",
      url: "https://www.wearetagstudio.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.wearetagstudio.com/images/logo.png",
      },
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "متى موعد اليوم الوطني السعودي 96 لعام 2026م (1448هـ) وتاريخ الإجازة الرسمية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يوافق اليوم الوطني السعودي 96 يوم الأربعاء 23 سبتمبر 2026م (الموافق 11 ربيع الأول 1448هـ)، وهو إجازة وعطلة رسمية مدفوعة الأجر لكافة القطاعات الحكومية والخاصة وغير الربحية وجميع المدارس والجامعات في المملكة العربية السعودية تحت شعار «عزّنا بطبعنا».",
        },
      },
      {
        "@type": "Question",
        name: "ما هو الشعار الرسمي لليوم الوطني 96 وما معناه وفلسفته «عزّنا بطبعنا»؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "الشعار الرسمي المعتمد من الهيئة العامة للترفيه هو «عزّنا بطبعنا» (النسخة الـ 96). ويرمز إلى أن عزة ومنعة الشعب السعودي ليست شيئاً طارئاً بل هي سجية وفطرة وطبيعة أصيلة متجذرة عبر الأجيال، وترتكز على 6 صفات رئيسية: الرؤية، الشجاعة، الهمة، الأصالة، الكرم، والجود.",
        },
      },
      {
        "@type": "Question",
        name: "كيف أحمل شعار اليوم الوطني 96 مفرغ PNG ودليل الهوية PDF؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يمكنك تحميل شعار اليوم الوطني 96 الرسمي مفرغاً بدون خلفية بصيغة PNG عالية الدقة وملفات فيكتور AI، بالإضافة إلى دليل الهوية الكامل المعتمد بصيغة PDF عبر كروت التحميل المباشرة والسريعة في هذه الأداة.",
        },
      },
      {
        "@type": "Question",
        name: "أين أجد رسومات وتلوين اليوم الوطني السعودي 96 للأطفال والمدارس للطباعة A4؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يوفر تاج ستوديو قسماً خاصاً يحتوي على رسومات تلوين شعار اليوم الوطني 96 (عزنا بطبعنا) بالخط الخارجي Outline أبيض وأسود مفرغة، ورسم علم السعودية والسيفين والنخلة، بالإضافة إلى كراسة أنشطة وتلوين اليوم الوطني 96 كاملة بصيغة PDF مقاس A4 عالية الدقة 300 DPI جاهزة للطباعة الفورية.",
        },
      },
      {
        "@type": "Question",
        name: "ما هي ركائز وصفات الهوية الستة لليوم الوطني السعودي 96 «عزّنا بطبعنا»؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بُنيت الهوية البصرية لليوم الوطني 96 على ست صفات سعودية أصيلة تجسد الشخصية الوطنية: (1) عزّنا برؤيتنا (#7c5d21)، (2) عزّنا بشجاعتنا (#607c4f)، (3) عزّنا بهمتنا (#971a4d)، (4) عزّنا بأصالتنا (#5aba1c)، (5) عزّنا بكرمنا (#0050af)، (6) عزّنا بجودنا (#6565e0). ولكل ركيزة نسيج سدو عصري ثلاثي الأبعاد وأيقونة منسوجة ونقوش خاصة.",
        },
      },
      {
        "@type": "Question",
        name: "ما هي ملحقات وهوية «عزّنا برؤيتنا» (Vision Kit) وكيف أحملها؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تشمل حزمة استوديو وملحقات «عزّنا برؤيتنا» المعتمدة رسمياً: المشهد السينمائي التكويني لاستوديو الرؤية، وشاح الرؤية التراثي المركزي ثلاثي الأبعاد، 4 نماذج من السجاد والمنسوجات التراثية المسطحة، وعناصر فنية مفرغة PNG تشمل شخصية الشاب السعودي والصقر والأنسجة المعلقة، مع روابط تحميل مباشرة كملفات مفتوحة AI و PNG.",
        },
      },
      {
        "@type": "Question",
        name: "ما هي أكواد الألوان الرسمية لهوية اليوم الوطني السعودي 96 (HEX)؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تعتمد هوية اليوم الوطني 96 على لونين رئيسيين: الأخضر السعودي (#006C35) والذهبي (#D4AF37)، بالإضافة إلى ألوان الركائز الستة المعتمدة: الرؤية (#7c5d21)، الشجاعة (#607c4f)، الهمة (#971a4d)، الأصالة (#5aba1c)، الكرم (#0050af)، والجود (#6565e0).",
        },
      },
      {
        "@type": "Question",
        name: "أين أجد خطوط اليوم الوطني 96 وأغاني اليوم الوطني الرسمية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "توفر الصفحة قسماً خاصاً لتحميل 8 خطوط رسمية معتمدة من وزارة الثقافة، بالإضافة إلى مشغل صوتي واستماع مباشر لأغاني اليوم الوطني 96 الرسمية (MP3) بروابط تنزيل مباشرة.",
        },
      },
      {
        "@type": "Question",
        name: "كيف يساعد تاج ستوديو الشركات في موسم اليوم الوطني السعودي 96؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يقدم تاج ستوديو خدمات تصميم الهوية البصرية، وتجهيز حملات اليوم الوطني الاحتفالية للشركات والمصانع، وتصميم هدايا وتوزيعات الشركات، وتخصيص بروفايل الشركة بالثيم الوطني، وتصاميم السوشيال ميديا الاحترافية.",
        },
      },
    ],
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "أداة تحميل هوية وشعار اليوم الوطني السعودي 96 (عزنا بطبعنا)",
    url: "https://www.wearetagstudio.com/tools/saudi-national-day-96-identity",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SAR",
    },
    description:
      "مركز تحميل شامل ومجاني لكافة ملحقات وملفات هوية وشعار اليوم الوطني السعودي 96: فيكتور AI، مفرغ PNG، دليل الهوية PDF، والخطوط والتلوين.",
  }

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="video-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-zinc-50/60 to-white text-zinc-900 pt-28 md:pt-36 pb-20 selection:bg-[#006C35] selection:text-white relative overflow-hidden">
        {/* Subtle Ambient National Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#006C35]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-96 -right-20 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        <NationalDay96Client />
      </main>
    </>
  )
}
