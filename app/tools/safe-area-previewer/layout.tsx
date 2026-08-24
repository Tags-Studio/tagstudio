import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "أداة معاينة المنطقة الآمنة لستوري وريلز السوشيال ميديا | تاج ستوديو",
  description: "تأكد من عدم تغطية أزرار ونصوص تيك توك وإنستغرام وسناب شات لعناصر تصميمك. عاين المنطقة الآمنة (Safe Area) لتصاميمك وفيديوهاتك فوراً.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/safe-area-previewer" },
  openGraph: {
    title: "أداة معاينة المنطقة الآمنة لستوري وريلز السوشيال ميديا | تاج ستوديو",
    description: "تأكد من عدم تغطية أزرار ونصوص تيك توك وإنستغرام وسناب شات لعناصر تصميمك. عاين المنطقة الآمنة (Safe Area) لتصاميمك وفيديوهاتك فوراً.",
    url: "https://www.wearetagstudio.com/tools/safe-area-previewer",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "أداة معاينة المنطقة الآمنة لستوري وريلز السوشيال ميديا | تاج ستوديو",
    description: "تأكد من عدم تغطية أزرار ونصوص تيك توك وإنستغرام وسناب شات لعناصر تصميمك. عاين المنطقة الآمنة (Safe Area) لتصاميمك وفيديوهاتك فوراً.",
  },
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
