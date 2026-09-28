import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "تصميم وتغليف تمور الأمين | دراسة حالة | تاج ستوديو",
  description:
    "دراسة حالة تفصيلية لإعادة تصميم وتغليف منتجات تمور الأمين: استراتيجية بناء هوية التغليف وتوسيع التوزيع في الأسواق السعودية مع تاج ستوديو.",
  alternates: {
    canonical: "https://www.wearetagstudio.com/lp/dates-packaging",
  },
  openGraph: {
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "تاج ستوديو" }],
    title: "تصميم وتغليف تمور الأمين | دراسة حالة | تاج ستوديو",
    description:
      "دراسة حالة تفصيلية لإعادة تصميم وتغليف منتجات تمور الأمين وتطوير الهوية البصرية للعبوات مع تاج ستوديو.",
    url: "https://www.wearetagstudio.com/lp/dates-packaging",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "article",
  },
}

export default function DatesPackagingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
