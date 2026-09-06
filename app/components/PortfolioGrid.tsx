"use client"

import WorkGrid from "./WorkGrid"

export default function PortfolioGrid() {
  return (
    <WorkGrid
      showHeader={true}
      showBottomCTA={false}
      id="portfolio-grid"
      title="أعمال صُنعت لتترك أثراً"
      subtitle="استكشف نخبة من مشاريع تصميم الهوية البصرية، التغليف، والمطبوعات لعملائنا في السعودية ومصر."
    />
  )
}
