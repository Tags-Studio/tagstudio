import type { Metadata } from "next"
import { Suspense } from "react"
import Hero from "./components/Hero"
import WearYourStory from "./components/WearYourStory"
import FeatureCarousel0 from "./components/FeatureCarousel-0"
import FeatureCarousel from "./components/FeatureCarousel"
import PortfolioGrid from "./components/PortfolioGrid"
import Testimonials from "./components/Testimonials" // استيراد مكون الشهادات
import Timeline from "./components/Timeline"
import Marquee from "./components/Marquee"
import ContactForm from "./components/ContactForm"

export const metadata: Metadata = {
  title: "تاج ستوديو | تصميم هوية بصرية وشعارات احترافية بالرياض وجدة والقاهرة",
  description: "تاج ستوديو — وكالة تصميم جرافيك احترافية رائدة متخصصة في الهوية البصرية، تصميم الشعارات، السوشيال ميديا، والموشن جرافيك في الرياض وجدة والقاهرة. خدمنا +200 عميل في السعودية ومصر منذ 2016.",
  alternates: {
    canonical: "https://www.wearetagstudio.com",
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "تاج ستوديو",
            "alternateName": "Tag Studio",
            "description": "وكالة تصميم جرافيك احترافية متخصصة في الهوية البصرية والموشن جرافيك في مصر والسعودية",
            "url": "https://www.wearetagstudio.com",
            "image": "https://www.wearetagstudio.com/images/logo.png",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.wearetagstudio.com/images/logo.png"
            },
            "telephone": "+201009215131",
            "foundingDate": "2016",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "EG",
              "addressLocality": "القاهرة"
            },
            "areaServed": [
              { "@type": "Country", "name": "Egypt" },
              { "@type": "Country", "name": "Saudi Arabia" }
            ],
            "sameAs": [
              "https://www.instagram.com/tagstudio.co",
              "https://www.facebook.com/tagstudio.co"
            ],
            "serviceType": [
              "تصميم هوية بصرية",
              "تصميم شعارات",
              "موشن جرافيك",
              "تصميم سوشيال ميديا",
              "تصميم مطبوعات",
              "تصميم مواقع إلكترونية"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "200"
            }
          })
        }}
      />
      <Hero />
      <WearYourStory />
      <FeatureCarousel0 />
      <FeatureCarousel />
      <Suspense fallback={null}>
        <PortfolioGrid />
      </Suspense>
      <Testimonials /> {/* إضافة مكون الشهادات هنا */}
      <Timeline />
      <Marquee />
      <ContactForm />
    </>
  )
}
