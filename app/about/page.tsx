import type { Metadata } from "next"
import AboutUs from "../components/AboutUs"

export const metadata: Metadata = {
  title: "لماذا تاج ستوديو؟ وكالة تصميم الهوية البصرية التي تضاعف أرباحك 🚀",
  description: "لا نصمم مجرد شعارات! نبتكر هويات بصرية متكاملة تبني الثقة وتزيد مبيعاتك في السعودية ومصر. اكتشف قصة تاج ستوديو وكيف نصنع الفارق لعلامتك التجارية.",
  alternates: { canonical: "https://www.wearetagstudio.com/about" },
}

export default function AboutPage() { return <AboutUs /> }
