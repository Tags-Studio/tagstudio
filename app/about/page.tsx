import AboutUs from "../components/AboutUs"

export const metadata = {
  title: "من نحن | تاج ستوديو",
  description: "تعرف على قصة تاج ستوديو، رؤيتنا، وفريقنا المبدع.",
}

export default function AboutPage() {
  return (
    <div className="py-20">
      <AboutUs />
    </div>
  )
}
