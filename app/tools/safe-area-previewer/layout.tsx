import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "أداة معاينة المنطقة الآمنة لستوري وريلز السوشيال | تاج ستوديو",
  description: "تأكد من عدم تغطية أزرار ونصوص تيك توك وإنستغرام وسناب شات لعناصر تصميمك. عاين المنطقة الآمنة (Safe Area) لتصاميمك وفيديوهاتك فوراً.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/safe-area-previewer" },
  openGraph: {
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "تاج ستوديو" }],
    title: "أداة معاينة المنطقة الآمنة لستوري وريلز السوشيال | تاج ستوديو",
    description: "تأكد من عدم تغطية أزرار ونصوص تيك توك وإنستغرام وسناب شات لعناصر تصميمك. عاين المنطقة الآمنة (Safe Area) لتصاميمك وفيديوهاتك فوراً.",
    url: "https://www.wearetagstudio.com/tools/safe-area-previewer",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "أداة معاينة المنطقة الآمنة لستوري وريلز السوشيال | تاج ستوديو",
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
