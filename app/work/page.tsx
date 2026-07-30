import type { Metadata } from "next"
import Link from "next/link"
import WorkGrid from "../components/WorkGrid"

export const metadata: Metadata = {
  title: "معرض أعمالنا | تصميم هوية بصرية وشعارات",
  description: "شاهد كيف حوّلنا أفكار عملائنا في السعودية ومصر إلى هويات بصرية جذابة ومشاريع ناجحة. تصفح سابقة أعمال تاج ستوديو واستلهم فكرة مشروعك القادم.",
  alternates: { canonical: "https://www.wearetagstudio.com/work" },
  openGraph: {
    url: "https://www.wearetagstudio.com/work",
  },
}

export default function WorkPage() {
  return (
    <>
      <header className="mx-auto max-w-7xl px-6 pb-4 pt-20 text-center lg:px-8">
        <p className="font-semibold text-primary">مختارات من أعمالنا</p>
        <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">تصميمات بُنيت حول احتياجات حقيقية للعلامات</h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
          استعرض مشروعات في الهوية البصرية والمطبوعات والمحتوى الرقمي، ثم تواصل معنا لمناقشة مشروع قريب من احتياجك.
        </p>
        <Link href="/#contact-form" className="apple-button mt-7 inline-block px-7 py-3">
          ناقش مشروعك معنا
        </Link>
      </header>

      <div className="pb-10">
        <WorkGrid />
      </div>

      {/* SEO content section to fix thin content warning and highlight healthcare branding expertise */}
      <section className="mx-auto max-w-5xl px-6 pt-12 pb-24 border-t border-border/30 text-center lg:px-8">
        <h2 className="text-2xl font-black text-foreground sm:text-3xl mb-6">
          تصميم الهوية البصرية للمراكز الطبية والمشاريع التجارية
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground">
          نحن في تاج ستوديو نفخر بتقديم تصاميم متكاملة تدمج بين الابتكار الفني والاحتياجات الوظيفية للعلامات التجارية في مصر والمملكة العربية السعودية.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right mt-12">
          <div className="p-6 bg-card/35 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm">
            <h3 className="text-lg font-bold text-primary mb-3">بناء الثقة والمصداقية الطبية</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              نصمم هويات بصرية مخصصة للعيادات والمجمعات الطبية تسهم في نقل شعور الراحة والأمان للمرضى، مع الالتزام بالمعايير المهنية التي تعكس جودة ومصداقية الرعاية الصحية.
            </p>
          </div>
          <div className="p-6 bg-card/35 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm">
            <h3 className="text-lg font-bold text-primary mb-3">حضور رقمي متكامل وقوي</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              من خلال تصميمات السوشيال ميديا الاحترافية وإدارة المحتوى، نساعد المراكز الطبية على تقديم رسائل توعوية جذابة تسهم في مضاعفة الحجوزات وبناء مجتمع مخلص ومتفاعل.
            </p>
          </div>
          <div className="p-6 bg-card/35 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm">
            <h3 className="text-lg font-bold text-primary mb-3">مطبوعات تعزز احترافية العلامة</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              نهتم بأدق التفاصيل البصرية في تصميم مطبوعات العيادات، بدءاً من الوصفات الطبية الرسمية وكروت مواعيد المرضى، وصولاً إلى لوحات المجمع الطبي والبروفايل التعريفي الفاخر.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
