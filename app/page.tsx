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
            "foundingDate": "2016",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "EG"
            },
            "serviceType": [
              "تصميم هوية بصرية",
              "موشن جرافيك",
              "تصميم سوشيال ميديا",
              "تصميم مطبوعات"
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
