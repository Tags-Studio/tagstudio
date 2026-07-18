import { Metadata } from "next"
import BrandAuditClient from "./BrandAuditClient"

export const metadata: Metadata = {
  title: "أداة تدقيق وتقييم الهوية البصرية | تاج ستوديو",
  description:
    "قيّم قوة وتأثير الهوية البصرية لمشروعك (عيادة، مطعم، شركة) من خلال هذا الاختبار السريع واحصل على تقريرك مجاناً.",
  keywords: ["تدقيق هوية بصرية", "تقييم براندنج", "Brand Audit", "تاج ستوديو"],
}

export default function BrandAuditPage() {
  return (
    <>
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 leading-tight">
              هل هويتك البصرية تخدم أهدافك حقاً؟
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
              أجب على 5 أسئلة سريعة لاكتشاف الفجوات في علامتك التجارية وكيفية تحسينها.
            </p>
          </div>
          <BrandAuditClient />
        </div>
      </main>
    </>
  )
}
