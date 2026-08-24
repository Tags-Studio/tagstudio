import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "فحص وتقييم قوة الهوية البصرية والعلامة التجارية | تاج ستوديو",
  description: "أداة تقييم شاملة لفحص قوة الهوية البصرية لشركتك، مدى اتساق الشعار والألوان، وتوافقها مع معايير السوق لتحديد نقاط القوة وفرص التطوير.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/brand-audit" },
  openGraph: {
    title: "فحص وتقييم قوة الهوية البصرية والعلامة التجارية | تاج ستوديو",
    description: "أداة تقييم شاملة لفحص قوة الهوية البصرية لشركتك، مدى اتساق الشعار والألوان، وتوافقها مع معايير السوق لتحديد نقاط القوة وفرص التطوير.",
    url: "https://www.wearetagstudio.com/tools/brand-audit",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فحص وتقييم قوة الهوية البصرية والعلامة التجارية | تاج ستوديو",
    description: "أداة تقييم شاملة لفحص قوة الهوية البصرية لشركتك، مدى اتساق الشعار والألوان، وتوافقها مع معايير السوق لتحديد نقاط القوة وفرص التطوير.",
  },
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
