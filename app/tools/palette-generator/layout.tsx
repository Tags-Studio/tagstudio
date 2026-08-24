import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "مولد لوحات الألوان المتناسقة للهويات والمواقع | تاج ستوديو",
  description: "ولد لوحات ألوان احترافية متناسقة لهويتك البصرية وموقعك الإلكتروني مع أكواد HEX و RGB و CSS مع نصائح التطبيق لمختلف المجالات التجارية.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/palette-generator" },
  openGraph: {
    title: "مولد لوحات الألوان المتناسقة للهويات والمواقع | تاج ستوديو",
    description: "ولد لوحات ألوان احترافية متناسقة لهويتك البصرية وموقعك الإلكتروني مع أكواد HEX و RGB و CSS مع نصائح التطبيق لمختلف المجالات التجارية.",
    url: "https://www.wearetagstudio.com/tools/palette-generator",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مولد لوحات الألوان المتناسقة للهويات والمواقع | تاج ستوديو",
    description: "ولد لوحات ألوان احترافية متناسقة لهويتك البصرية وموقعك الإلكتروني مع أكواد HEX و RGB و CSS مع نصائح التطبيق لمختلف المجالات التجارية.",
  },
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
