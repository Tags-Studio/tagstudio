import Link from "next/link"

export default function CTASection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 text-center lg:px-8">
      <div className="rounded-3xl border border-primary/20 bg-card p-10">
        <h2 className="text-3xl font-bold text-foreground">
          لديك مشروع يحتاج هوية أقوى؟
        </h2>
        <p className="mt-4 text-muted-foreground">
          شاركنا فكرتك وسنساعدك في بناء اتجاه بصري مناسب لعلامتك.
        </p>
        <Link href="/#contact-form" className="apple-button mt-6 inline-block px-7 py-3">
          ابدأ مشروعك الآن
        </Link>
      </div>
    </section>
  )
}
