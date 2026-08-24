import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "حاسبة ميزانية الإعلانات الممولة | تقدير تكلفة الحملات - تاج ستوديو",
  description: "احسب ميزانية إعلاناتك على فيسبوك وتيك توك وجوجل بدقة. أداة مجانية لتقدير تكلفة النقرة والعائد على الإنفاق الإعلاني ROAS وتوزيع الميزانية التسويقية.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/ads-budget-calculator" },
  openGraph: {
    title: "حاسبة ميزانية الإعلانات الممولة | تقدير تكلفة الحملات - تاج ستوديو",
    description: "احسب ميزانية إعلاناتك على فيسبوك وتيك توك وجوجل بدقة. أداة مجانية لتقدير تكلفة النقرة والعائد على الإنفاق الإعلاني ROAS وتوزيع الميزانية التسويقية.",
    url: "https://www.wearetagstudio.com/tools/ads-budget-calculator",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حاسبة ميزانية الإعلانات الممولة | تقدير تكلفة الحملات - تاج ستوديو",
    description: "احسب ميزانية إعلاناتك على فيسبوك وتيك توك وجوجل بدقة. أداة مجانية لتقدير تكلفة النقرة والعائد على الإنفاق الإعلاني ROAS وتوزيع الميزانية التسويقية.",
  },
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
