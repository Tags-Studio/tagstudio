import type { Metadata } from "next"
import Link from "next/link"
import WorkGrid from "../components/WorkGrid"

export const metadata: Metadata = {
  title: "أعمالنا في الهوية البصرية والتصميم",
  description: "استعرض مختارات من أعمال تاج ستوديو في تصميم الهويات البصرية والمطبوعات والسوشيال ميديا والموشن جرافيك لعملاء في السعودية ومصر.",
  alternates: { canonical: "https://www.wearetagstudio.com/work" },
}

export default function WorkPage() {
  return <><header className="mx-auto max-w-7xl px-6 pb-4 pt-20 text-center lg:px-8"><p className="font-semibold text-primary">مختارات من أعمالنا</p><h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">تصميمات بُنيت حول احتياجات حقيقية للعلامات</h1><p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">استعرض مشروعات في الهوية البصرية والمطبوعات والمحتوى الرقمي، ثم تواصل معنا لمناقشة مشروع قريب من احتياجك.</p><Link href="/#contact-form" className="apple-button mt-7 inline-block px-7 py-3">ناقش مشروعك معنا</Link></header><div className="pb-20"><WorkGrid /></div></>
}
