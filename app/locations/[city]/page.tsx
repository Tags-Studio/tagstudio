import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { getLocationBySlug, getAllLocations } from "@/lib/locationsData"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CtaSection from "@/components/CtaSection"
import ContactSection from "@/components/ContactSection"

type Props = {
  params: { city: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = getLocationBySlug(params.city)
  if (!location) {
    return { title: "غير موجود" }
  }
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords: location.keywords,
  }
}

export async function generateStaticParams() {
  const locations = getAllLocations()
  return locations.map((loc) => ({
    city: loc.slug,
  }))
}

export default function LocationPage({ params }: Props) {
  const location = getLocationBySlug(params.city)

  if (!location) {
    notFound()
  }

  // Schema Markup for LocalBusiness
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "تاج ستوديو للتصميم - Tag Studio",
    image: "https://wearetagstudio.com/images/logo.png",
    "@id": \`https://wearetagstudio.com/locations/\${location.slug}\`,
    url: \`https://wearetagstudio.com/locations/\${location.slug}\`,
    telephone: "+201009215131",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressCountry: location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      // Placeholder coordinates, would be customized per city in a real highly advanced setup
      latitude: 24.7136,
      longitude: 46.6753,
    },
    description: location.metaDescription,
  }

  return (
    <>
      <Navbar />
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="min-h-screen pt-24 pb-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mt-12 mb-20">
            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight mb-6 leading-tight">
              {location.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              {location.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/#contact-form" 
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              >
                احصل على عرض سعر
              </Link>
              <Link 
                href="/services" 
                className="bg-transparent border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                تصفح خدماتنا
              </Link>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-xl mb-20 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">لماذا تختار تاج ستوديو في {location.city}؟</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-zinc-800 dark:text-zinc-200">فهم عميق للسوق المحلي</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  نحن لا نصمم فقط، بل ندرس الثقافة والسلوك الاستهلاكي في {location.city} لضمان أن هويتك البصرية تتحدث لغة جمهورك وتجذب عملاءك المستهدفين بدقة.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-zinc-800 dark:text-zinc-200">حلول تصميم شاملة</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  من تصميم الشعار إلى المطبوعات، وتغليف المنتجات، وحتى تصاميم السوشيال ميديا؛ نقدم لك نظاماً بصرياً متكاملاً يدعم نمو أعمالك.
                </p>
              </div>
            </div>
          </div>

          <CtaSection />
          
        </div>
      </main>
      
      <ContactSection />
      <Footer />
    </>
  )
}
