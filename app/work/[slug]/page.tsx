import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { caseStudies } from "@/lib/caseStudies"
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn"
import HeroVideoScrub from "@/components/ui/HeroVideoScrub"
import ZaatarCaseStudy from "@/components/case-studies/ZaatarCaseStudy"
import AgriculturalCaseStudy from "@/components/case-studies/AgriculturalCaseStudy"

const baseUrl = "https://www.wearetagstudio.com"

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const item = caseStudies.find((entry) => entry.slug === params.slug)

  if (!item) {
    return {}
  }

  const canonical = `${baseUrl}/work/${item.slug}`

  return {
    title: item.title,
    description: `${item.service} لـ ${item.client}. تعرّف على فكرة المشروع والتحدي والحل وتطبيقات الهوية البصرية.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${item.title} | تاج ستوديو`,
      description: `${item.service} لـ ${item.client} — دراسة حالة من أعمال تاج ستوديو.`,
      url: canonical,
      type: "article",
      locale: "ar_EG",
      siteName: "تاج ستوديو",
      images: [
        {
          url: item.image,
          alt: item.title,
        },
      ],
    },
  }
}


function StandardCaseStudy({ slug }: { slug: string }) {
  const item = caseStudies.find((entry) => entry.slug === slug)

  if (!item) {
    notFound()
  }

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/work/${item.slug}#creative-work`,
    name: item.title,
    creator: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "تاج ستوديو",
      url: baseUrl,
    },
    image: `${baseUrl}${item.image}`,
    description: item.solution,
    mainEntityOfPage: `${baseUrl}/work/${item.slug}`,
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <Link href="/work" className="font-semibold text-primary">
        ← العودة للأعمال
      </Link>

      <section className="mt-8 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-semibold text-primary">{item.category}</p>
          <h1 className="mt-3 text-4xl font-bold">{item.title}</h1>
          <p className="mt-5 leading-8 text-muted-foreground">
            {item.solution}
          </p>
        </div>
        <Image
          src={item.image}
          alt={item.title}
          width={900}
          height={700}
          priority
          className="rounded-3xl object-cover"
        />
      </section>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {[
          ["عن المشروع", `العميل: ${item.client} — ${item.location}`],
          ["التحدي", item.problem],
          ["الحل الإبداعي", item.solution],
          ["النتيجة", item.results],
        ].map(([title, text]) => (
          <section key={title} className="rounded-2xl border p-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="mt-3 leading-8 text-muted-foreground">{text}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border p-6">
        <h2 className="text-2xl font-bold">تطبيقات الهوية</h2>
        <ul className="mt-4 list-disc pr-6 leading-8">
          {item.applications.map((application) => (
            <li key={application}>{application}</li>
          ))}
        </ul>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/#contact-form"
          className="apple-button inline-block px-8 py-3"
        >
          ابدأ مشروعك
        </Link>
      </div>
    </main>
  )
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  if (params.slug === "zaatar-w-simsim-brand-identity") {
    return <ZaatarCaseStudy />
  }

  if (params.slug === "agricultural-development-association-brand-identity") {
    return <AgriculturalCaseStudy />
  }

  return <StandardCaseStudy slug={params.slug} />
}
