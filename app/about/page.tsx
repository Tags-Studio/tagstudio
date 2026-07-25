import type { Metadata } from "next"
import AboutUs from "../components/AboutUs"

export const metadata: Metadata = {
  title: "من نحن | تاج ستوديو - وكالة تصميم هوية بصرية وشعارات",
  description: "تعرف على تاج ستوديو: وكالة تصميم متخصصة في ابتكار الهويات البصرية والشعارات والسوشيال ميديا والمطبوعات والموشن جرافيك للشركات في السعودية ومصر.",
  alternates: { canonical: "https://www.wearetagstudio.com/about" },
  openGraph: {
    title: "من نحن | تاج ستوديو - وكالة تصميم هوية بصرية وشعارات",
    description: "تعرف على تاج ستوديو: وكالة تصميم متخصصة في ابتكار الهويات البصرية والشعارات والسوشيال ميديا والمطبوعات والموشن جرافيك للشركات في السعودية ومصر.",
    url: "https://www.wearetagstudio.com/about",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
}

export default function AboutPage() { return <AboutUs /> }
