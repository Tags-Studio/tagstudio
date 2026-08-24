import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "أداة فحص تباين الألوان ومعايير WCAG للتصميم | تاج ستوديو",
  description: "تأكد من وضوح وقابلية قراءة ألوان تصميمك وموقعك وفق معايير الوصول العالمية WCAG 2.1. افحص تباين النصوص والخلفيات بسهولة وبشكل فوري.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/color-contrast-checker" },
  openGraph: {
    title: "أداة فحص تباين الألوان ومعايير WCAG للتصميم | تاج ستوديو",
    description: "تأكد من وضوح وقابلية قراءة ألوان تصميمك وموقعك وفق معايير الوصول العالمية WCAG 2.1. افحص تباين النصوص والخلفيات بسهولة وبشكل فوري.",
    url: "https://www.wearetagstudio.com/tools/color-contrast-checker",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "أداة فحص تباين الألوان ومعايير WCAG للتصميم | تاج ستوديو",
    description: "تأكد من وضوح وقابلية قراءة ألوان تصميمك وموقعك وفق معايير الوصول العالمية WCAG 2.1. افحص تباين النصوص والخلفيات بسهولة وبشكل فوري.",
  },
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
