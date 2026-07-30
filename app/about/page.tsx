import type { Metadata } from "next"
import AboutUs from "../components/AboutUs"

export const metadata: Metadata = {
  title: "من نحن | تصميم الهوية البصرية والشعارات",
  description: "تعرف على تاج ستوديو: وكالة تصميم متخصصة في ابتكار الهويات البصرية والشعارات والسوشيال ميديا والمطبوعات والموشن جرافيك للشركات في السعودية ومصر.",
  alternates: { canonical: "https://www.wearetagstudio.com/about" },
  openGraph: {
    title: "من نحن | تصميم الهوية البصرية والشعارات",
    description: "تعرف على تاج ستوديو: وكالة تصميم متخصصة في ابتكار الهويات البصرية والشعارات والسوشيال ميديا والمطبوعات والموشن جرافيك للشركات في السعودية ومصر.",
    url: "https://www.wearetagstudio.com/about",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
}

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://www.wearetagstudio.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "من نحن",
        item: "https://www.wearetagstudio.com/about",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutUs />
    </>
  )
}
