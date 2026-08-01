import { Metadata } from "next"
import dynamic from "next/dynamic"

const EcommerceCalculatorClient = dynamic(
  () => import("./EcommerceCalculatorClient"),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "حاسبة التجارة الإلكترونية والتسعير الاحترافي | تاج ستوديو",
  description:
    "احسب تكاليف منتجاتك، عمولات الشحن، ونسب الإلغاء والمرتجع. اعرف تعادل الـ ROAS وأقصى تكلفة طلب (BE CPS) لتجارتك الإلكترونية أو الدروبشيبينج مجاناً وبسهولة.",
  keywords: [
    "حاسبة التجارة الإلكترونية",
    "حاسبة تسعير المنتجات",
    "حساب الـ ROAS للتعادل",
    "حاسبة دروبشيبينج",
    "BE ROAS calculator",
    "BE CPS",
    "حساب أرباح المتجر الإلكتروني",
    "تاج ستوديو"
  ],
  alternates: { canonical: "https://www.wearetagstudio.com/tools/ecommerce-calculator" },
  openGraph: {
    url: "https://www.wearetagstudio.com/tools/ecommerce-calculator",
  },
}

export default function EcommerceCalculatorPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <EcommerceCalculatorClient />
      </div>
    </main>
  )
}
