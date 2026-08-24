import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "حاسبة العائد على الاستثمار التسويقي للعيادات والمراكز الطبية | تاج ستوديو",
  description: "احسب العائد المالي لحملات التسويق الطبي والهوية البصرية لعيادتك، وتكلفة استقطاب المريض الجديد، ومعدل زيادة الحجوزات السنوية بدقة.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/medical-roi-calculator" },
  openGraph: {
    title: "حاسبة العائد على الاستثمار التسويقي للعيادات والمراكز الطبية | تاج ستوديو",
    description: "احسب العائد المالي لحملات التسويق الطبي والهوية البصرية لعيادتك، وتكلفة استقطاب المريض الجديد، ومعدل زيادة الحجوزات السنوية بدقة.",
    url: "https://www.wearetagstudio.com/tools/medical-roi-calculator",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حاسبة العائد على الاستثمار التسويقي للعيادات والمراكز الطبية | تاج ستوديو",
    description: "احسب العائد المالي لحملات التسويق الطبي والهوية البصرية لعيادتك، وتكلفة استقطاب المريض الجديد، ومعدل زيادة الحجوزات السنوية بدقة.",
  },
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
