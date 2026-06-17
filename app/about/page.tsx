import type { Metadata } from "next"
import AboutUs from "../components/AboutUs"

export const metadata: Metadata = {
  title: "من نحن | تاج ستوديو — وكالة تصميم في مصر والسعودية",
  description: "تعرف على فريق تاج ستوديو وقصتنا منذ 2016. خدمنا +200 عميل في تصميم الهويات البصرية والشعارات والموشن جرافيك في مصر والسعودية.",
  keywords: ["من نحن تاج ستوديو", "وكالة تصميم مصر", "استوديو تصميم السعودية", "فريق تصميم جرافيك"],
  openGraph: {
    title: "من نحن | تاج ستوديو — وكالة تصميم إبداعية",
    description: "تعرف على فريق تاج ستوديو وقصتنا منذ 2016. خدمنا +200 عميل في مصر والسعودية.",
    url: "https://www.wearetagstudio.com/about",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  alternates: {
    canonical: "https://www.wearetagstudio.com/about",
  },
}

export default function AboutPage() {
  return (
    <div className="py-20">
      <AboutUs />
    </div>
  )
}
