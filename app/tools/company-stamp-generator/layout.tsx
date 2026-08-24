import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "صانع أختام الشركات والمؤسسات الرسمية أونلاين | تاج ستوديو",
  description: "صمم ختم شركتك أو مؤسستك الرسمية مجاناً وبجودة عالية للطباعة بصيغ PNG و SVG. خيارات تخصيص متعددة للشركات في السعودية ومصر.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/company-stamp-generator" },
  openGraph: {
    title: "صانع أختام الشركات والمؤسسات الرسمية أونلاين | تاج ستوديو",
    description: "صمم ختم شركتك أو مؤسستك الرسمية مجاناً وبجودة عالية للطباعة بصيغ PNG و SVG. خيارات تخصيص متعددة للشركات في السعودية ومصر.",
    url: "https://www.wearetagstudio.com/tools/company-stamp-generator",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "صانع أختام الشركات والمؤسسات الرسمية أونلاين | تاج ستوديو",
    description: "صمم ختم شركتك أو مؤسستك الرسمية مجاناً وبجودة عالية للطباعة بصيغ PNG و SVG. خيارات تخصيص متعددة للشركات في السعودية ومصر.",
  },
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
