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
