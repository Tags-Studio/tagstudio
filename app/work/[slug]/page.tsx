import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { caseStudies } from "@/lib/caseStudies"

const baseUrl = "https://www.wearetagstudio.com"

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: {params:{slug:string}}): Promise<Metadata> {
  const item = caseStudies.find((x)=>x.slug===params.slug)
  if(!item) return {}
  return {
    title: `${item.title} | تاج ستوديو`,
    description: `${item.service} لـ ${item.client} - دراسة حالة من أعمال تاج ستوديو.`,
    alternates:{canonical:`${baseUrl}/work/${item.slug}`}
  }
}

export default function CaseStudyPage({params}:{params:{slug:string}}){
 const item=caseStudies.find((x)=>x.slug===params.slug)
 if(!item) notFound()

 const schema={
  "@context":"https://schema.org",
  "@type":"CreativeWork",
  "name":item.title,
  "creator":{"@type":"Organization","name":"تاج ستوديو","url":baseUrl},
  "image":`${baseUrl}${item.image}`,
  "description":item.solution
 }

 return <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  <Link href="/work" className="text-primary">← العودة للأعمال</Link>
  <section className="mt-8 grid gap-10 lg:grid-cols-2 items-center">
   <div>
    <p className="font-semibold text-primary">{item.category}</p>
    <h1 className="mt-3 text-4xl font-bold">{item.title}</h1>
    <p className="mt-5 text-muted-foreground leading-8">{item.solution}</p>
   </div>
   <Image src={item.image} alt={item.title} width={900} height={700} className="rounded-3xl object-cover"/>
  </section>
  <div className="mt-14 grid gap-6 md:grid-cols-2">
   {[
    ["عن المشروع",`العميل: ${item.client} - ${item.location}`],
    ["التحدي",item.problem],
    ["الحل الإبداعي",item.solution],
    ["النتيجة",item.results]
   ].map(([title,text])=><section key={title} className="rounded-2xl border p-6">
    <h2 className="text-2xl font-bold">{title}</h2><p className="mt-3 leading-8 text-muted-foreground">{text}</p>
   </section>)}
  </div>
  <section className="mt-8 rounded-2xl border p-6">
   <h2 className="text-2xl font-bold">تطبيقات الهوية</h2>
   <ul className="mt-4 list-disc pr-6 leading-8">{item.applications.map(a=><li key={a}>{a}</li>)}</ul>
  </section>
  <div className="mt-12 text-center">
   <Link href="/#contact-form" className="apple-button px-8 py-3 inline-block">ابدأ مشروعك</Link>
  </div>
 </main>
}
