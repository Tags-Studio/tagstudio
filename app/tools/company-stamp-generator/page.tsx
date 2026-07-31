import { Metadata } from "next"
import StampGeneratorClient from "./StampGeneratorClient"

export const metadata: Metadata = {
  title: "مولّد الأختام الرسمية مجاناً للشركات والمؤسسات | تاج ستوديو",
  description:
    "صمم وأنشئ ختماً رسمياً لشركتك أو مؤسستك مجاناً وبثوانٍ معدودة. خصّص النصوص، الألوان، الأشكال والخطوط، وقم بتحميل الختم بصيغ PNG و SVG عالية الدقة.",
  keywords: [
    "توليد ختم مؤسسة",
    "تصميم ختم رسمي مجاني",
    "شعار الختم الإلكتروني",
    "صانع الأختام",
    "ختم شركة سعودية",
    "ختم عيادة طبية",
    "تاج ستوديو"
  ],
  alternates: { canonical: "https://www.wearetagstudio.com/tools/company-stamp-generator" },
  openGraph: {
    url: "https://www.wearetagstudio.com/tools/company-stamp-generator",
  },
}

export default function CompanyStampGeneratorPage() {
  return (
    <>
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 mb-4">
              <i className="fas fa-stamp text-[10px]"></i> أداة مجانية 100%
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 leading-tight">
              صانع ومولّد الأختام الرسمية للشركات
            </h1>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              أنشئ ختماً احترافياً ومحاكياً للواقع لمؤسستك، عيادتك، أو متجرك الإلكتروني. صمم ختمك بالكامل وحمله فوراً بصيغة متجهة (SVG) أو خلفية شفافة (PNG).
            </p>
          </div>
          <StampGeneratorClient />
        </div>
      </main>
    </>
  )
}
