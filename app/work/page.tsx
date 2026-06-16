import WorkGrid from "../components/WorkGrid"

export const metadata = {
  title: "أعمالنا | تاج ستوديو",
  description: "استكشف مجموعة أعمالنا الإبداعية في تصميم الهوية البصرية، المطبوعات، والسوشيال ميديا.",
}

export default function WorkPage() {
  return (
    <div className="py-20">
      <WorkGrid />
    </div>
  )
}
