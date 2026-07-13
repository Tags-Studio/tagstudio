import Link from "next/link"

type Section = {
  title: string
  paragraphs: string[]
}

type LegalPageProps = {
  title: string
  description: string
  updatedAt: string
  sections: Section[]
}

export default function LegalPage({
  title,
  description,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <nav className="mb-8 text-sm text-muted-foreground" aria-label="مسار التنقل">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <span aria-current="page">{title}</span>
      </nav>

      <header className="border-b border-border pb-10">
        <h1 className="text-4xl font-bold text-foreground">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          {description}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          آخر تحديث: {updatedAt}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-bold text-foreground">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="leading-8 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14 rounded-2xl border border-border bg-card/40 p-6">
        <h2 className="text-xl font-bold text-foreground">التواصل معنا</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          للاستفسارات المتعلقة بهذه الصفحة، تواصل معنا من خلال نموذج التواصل
          بالموقع أو عبر واتساب على الرقم +20 100 921 5131.
        </p>
      </section>
    </article>
  )
}
