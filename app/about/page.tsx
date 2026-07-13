import type { Metadata } from "next"
import AboutUs from "../components/AboutUs"

export const metadata: Metadata = {
  title: "من نحن — وكالة تصميم هوية بصرية",
  description: "تعرف على قصة تاج ستوديو ومنهجنا في تصميم الهويات البصرية والشعارات والمحتوى البصري للشركات في السعودية ومصر.",
  alternates: { canonical: "https://www.wearetagstudio.com/about" },
}

export default function AboutPage() { return <AboutUs /> }
