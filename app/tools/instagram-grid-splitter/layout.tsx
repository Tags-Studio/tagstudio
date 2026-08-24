import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "أداة تقسيم الصور لشبكة إنستغرام بانوراما وجريد 3x3 | تاج ستوديو",
  description: "قسم صورك وتصاميمك إلى مربعات متناسقة 3x1 أو 3x3 لإنشاء جريد إنستغرام احترافي ومبهر بصرياً. أداة مجانية سريعة بدون تقليل جودة الصورة.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/instagram-grid-splitter" },
  openGraph: {
    title: "أداة تقسيم الصور لشبكة إنستغرام بانوراما وجريد 3x3 | تاج ستوديو",
    description: "قسم صورك وتصاميمك إلى مربعات متناسقة 3x1 أو 3x3 لإنشاء جريد إنستغرام احترافي ومبهر بصرياً. أداة مجانية سريعة بدون تقليل جودة الصورة.",
    url: "https://www.wearetagstudio.com/tools/instagram-grid-splitter",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "أداة تقسيم الصور لشبكة إنستغرام بانوراما وجريد 3x3 | تاج ستوديو",
    description: "قسم صورك وتصاميمك إلى مربعات متناسقة 3x1 أو 3x3 لإنشاء جريد إنستغرام احترافي ومبهر بصرياً. أداة مجانية سريعة بدون تقليل جودة الصورة.",
  },
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
