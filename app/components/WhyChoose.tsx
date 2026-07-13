export default function WhyChoose() {
  const items = [
    ["استراتيجية قبل التصميم", "نفهم نشاطك وجمهورك قبل بناء أي عنصر بصري."],
    ["هوية قابلة للتطبيق", "نصمم نظامًا واضحًا يعمل على كل نقاط التواصل."],
    ["خبرة مع قطاعات مختلفة", "حلول بصرية للشركات والمشروعات في السعودية ومصر."],
    ["تسليم احترافي", "ملفات منظمة وجاهزة للاستخدام والطباعة."],
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="max-w-3xl">
        <p className="font-semibold text-primary">لماذا تختار تاج ستوديو؟</p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          لا نصمم شكلًا فقط، بل نبني نظامًا يخدم علامتك
        </h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {items.map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-border bg-card/40 p-6">
            <h3 className="font-bold text-foreground">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
