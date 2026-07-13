import type { Metadata } from "next"
import { Suspense } from "react"
import Hero from "./components/Hero"
import WearYourStory from "./components/WearYourStory"
import FeatureCarousel0 from "./components/FeatureCarousel-0"
import FeatureCarousel from "./components/FeatureCarousel"
import PortfolioGrid from "./components/PortfolioGrid"
import Testimonials from "./components/Testimonials"
import Timeline from "./components/Timeline"
import Marquee from "./components/Marquee"
import ContactForm from "./components/ContactForm"
import Process from "./components/Process"
import Partners from "./components/Partners"

export const metadata: Metadata = {
  title: "شركة تصميم هوية بصرية وشعارات في السعودية ومصر",
  description:
    "تاج ستوديو وكالة تصميم متخصصة في تصميم الهوية البصرية والشعارات والسوشيال ميديا والمطبوعات والموشن جرافيك للشركات في السعودية ومصر.",
  alternates: {
    canonical: "https://www.wearetagstudio.com/",
  },
  openGraph: {
    title: "شركة تصميم هوية بصرية وشعارات في السعودية ومصر | تاج ستوديو",
    description:
      "نصمم هويات بصرية وشعارات وتصميمات سوشيال ميديا ومطبوعات وموشن جرافيك للشركات في السعودية ومصر.",
    url: "https://www.wearetagstudio.com/",
    type: "website",
    locale: "ar_EG",
    siteName: "تاج ستوديو",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "شعار تاج ستوديو",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "شركة تصميم هوية بصرية وشعارات في السعودية ومصر | تاج ستوديو",
    description:
      "نصمم هويات بصرية وشعارات وتصميمات سوشيال ميديا ومطبوعات وموشن جرافيك للشركات.",
    images: ["/images/logo.png"],
  },
}

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.wearetagstudio.com/#organization",
  name: "تاج ستوديو",
  alternateName: ["Tag Studio", "استديو تاج", "استديو التاج"],
  description:
    "وكالة تصميم متخصصة في الهوية البصرية والشعارات والموشن جرافيك وتصميمات السوشيال ميديا والمطبوعات للشركات في مصر والسعودية.",
  url: "https://www.wearetagstudio.com/",
  image: "https://www.wearetagstudio.com/images/logo.png",
  logo: {
    "@type": "ImageObject",
    url: "https://www.wearetagstudio.com/images/logo.png",
  },
  telephone: "+201009215131",
  foundingDate: "2016",
  priceRange: "$$",
  areaServed: [
    {
      "@type": "Country",
      name: "Egypt",
    },
    {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    {
      "@type": "AdministrativeArea",
      name: "Gulf Cooperation Council",
    },
  ],
  sameAs: [
    "https://www.instagram.com/tagstudio.co",
    "https://www.facebook.com/tagstudio.co",
  ],
  knowsAbout: [
    "تصميم هوية بصرية",
    "تصميم شعارات",
    "موشن جرافيك",
    "تصميم سوشيال ميديا",
    "تصميم مطبوعات",
    "تصميم مواقع إلكترونية",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.wearetagstudio.com/#website",
  url: "https://www.wearetagstudio.com/",
  name: "تاج ستوديو",
  alternateName: "Tag Studio",
  inLanguage: "ar",
  publisher: {
    "@id": "https://www.wearetagstudio.com/#organization",
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <Hero />
      <WearYourStory />
      <FeatureCarousel0 />
      <FeatureCarousel />
      <Partners />
      <Process />

      <Suspense fallback={null}>
        <PortfolioGrid />
      </Suspense>

      <Testimonials />
      <Timeline />
      <Marquee />
      <ContactForm />
    </>
  )
}
