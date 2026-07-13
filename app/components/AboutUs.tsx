"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const capabilities = ["بناء الهويات البصرية والشعارات", "تصميم المطبوعات والتغليف", "تصميم المحتوى البصري للسوشيال ميديا", "إنتاج فيديوهات الموشن جرافيك"]
const principles = [
  { title: "نفهم قبل أن نصمم", description: "نبدأ من النشاط والجمهور والسوق، ثم نبني اتجاهًا بصريًا يخدم هدفًا واضحًا." },
  { title: "الاتساق أهم من اللقطة الجميلة", description: "نصمم نظامًا يمكن تطبيقه عبر المنصات والمطبوعات بدل إنتاج عناصر منفصلة." },
  { title: "التسليم جزء من الجودة", description: "نهتم بتنظيم الملفات والمقاسات وقواعد الاستخدام حتى يستطيع العميل تطبيق الهوية بثقة." },
]

export default function AboutUs() {
  return (
    <article className="bg-background">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-semibold text-primary">من نحن</p>
          <h1 className="mt-3 text-4xl font-bold leading-normal text-foreground sm:text-5xl">خبرة بدأت في التصميم عام 2012، وتحولت إلى تاج ستوديو عام 2016</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">تاج ستوديو وكالة تصميم تساعد الشركات والمشروعات على بناء حضور بصري واضح ومتسق. نعمل مع عملاء في السعودية ومصر، ونربط قرارات التصميم بأهداف العلامة والجمهور وطريقة الاستخدام الفعلية.</p>
          <p className="mt-5 leading-8 text-muted-foreground">لا نتعامل مع الهوية باعتبارها شعارًا فقط، بل كنظام يشمل الألوان والخطوط والتطبيقات والمحتوى البصري، ويمنح المشروع صورة أكثر احترافية وثباتًا أمام عملائه.</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link href="/work" className="apple-button px-7 py-3">شاهد أعمالنا</Link><Link href="/#contact-form" className="rounded-full border border-border px-7 py-3 font-semibold text-foreground transition hover:border-primary hover:text-primary">تحدث معنا عن مشروعك</Link></div>
        </motion.div>
        <motion.div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}><Image src="/images/about-us-placeholder.avif" alt="فريق تاج ستوديو وعملية تطوير الهوية البصرية" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></motion.div>
      </section>
      <section className="border-y border-border bg-card/30"><div className="mx-auto max-w-7xl px-6 py-20 lg:px-8"><p className="font-semibold text-primary">ما الذي نعمل عليه؟</p><h2 className="mt-2 text-3xl font-bold text-foreground">خدمات بصرية مترابطة بدل حلول منفصلة</h2><ul className="mt-10 grid gap-5 sm:grid-cols-2">{capabilities.map((item) => <li key={item} className="rounded-2xl border border-border bg-background/70 p-6 font-semibold text-foreground"><span className="ml-3 text-primary">✓</span>{item}</li>)}</ul></div></section>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8"><p className="font-semibold text-primary">طريقة تفكيرنا</p><h2 className="mt-2 text-3xl font-bold text-foreground">التصميم الجيد يجب أن يكون جميلًا وقابلًا للاستخدام</h2><div className="mt-12 grid gap-6 md:grid-cols-3">{principles.map((p) => <section key={p.title} className="rounded-2xl border border-border bg-card/40 p-7"><h3 className="text-xl font-bold text-foreground">{p.title}</h3><p className="mt-4 leading-7 text-muted-foreground">{p.description}</p></section>)}</div></section>
    </article>
  )
}
