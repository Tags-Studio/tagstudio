import type { Metadata } from "next"
import WorkGrid from "../components/WorkGrid"

export const metadata: Metadata = {
  title: "أعمالنا | معرض أعمال تاج ستوديو للتصميم الجرافيكي",
  description: "استعرض أعمال تاج ستوديو في تصميم الهويات البصرية، السوشيال ميديا، المطبوعات، والموشن جرافيك لعملاء في مصر والسعودية.",
  keywords: ["أعمال تصميم", "معرض أعمال تصميم", "بورتفوليو تصميم", "تاج ستوديو أعمال", "هوية بصرية أعمال"],
  openGraph: {
    title: "أعمالنا | معرض أعمال تاج ستوديو",
    description: "استعرض أعمال تاج ستوديو في تصميم الهويات البصرية، السوشيال ميديا، المطبوعات، والموشن جرافيك.",
    url: "https://www.wearetagstudio.com/work",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  alternates: {
    canonical: "https://www.wearetagstudio.com/work",
  },
}

export default function WorkPage() {
  return (
    <div className="py-20">
      <WorkGrid />
    </div>
  )
}
