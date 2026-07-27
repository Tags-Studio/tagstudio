import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "أدوات مجانية للمصممين والمسوقين | تاج ستوديو",
  description: "مجموعة أدوات مجانية مصممة لتسريع عملك: حاسبة ميزانية الإعلانات، عارض المنطقة الآمنة، فاحص تباين الألوان والمزيد.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools" },
  openGraph: {
    url: "https://www.wearetagstudio.com/tools",
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
