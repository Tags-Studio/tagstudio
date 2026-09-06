"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ImageModal from "./ImageModal"
import { projects, ProjectItem } from "@/lib/portfolioData"

// Extended project interface with layout size and tags for the Bento Grid
interface BentoProject extends ProjectItem {
  size?: "large" | "wide" | "normal" | "tall"
  tags?: string[]
  subCategory?: string
}

// Map real projects to Bento sizes and tags matching the luxury editorial layout
const bentoProjects: BentoProject[] = [
  // 01. Large featured (2x2) - Al-Ameen Dates
  {
    ...projects.find((p) => p.id === 40) || projects[0],
    id: 40,
    title: "الأمين للتمور",
    description: "تصميم عبوة وتغليف كوكيز التمور الفاخر مع هوية تراثية عصرية متكاملة للمتاجر السعودية.",
    imageUrl: "/images/print-design-17.avif",
    category: "تصاميم المطبوعات",
    size: "large",
    subCategory: "تغليف ومطبوعات",
    tags: ["تغليف", "مطبوعات", "هويات"],
  },
  // 02. Normal (1x1) - Business cards
  {
    ...projects.find((p) => p.id === 26) || projects[1],
    id: 26,
    title: "تصاميم المطبوعات",
    description: "بطاقات عمل ومستندات رسمية للأمين للتمور",
    imageUrl: "/images/print-design-3.avif",
    category: "تصاميم المطبوعات",
    size: "normal",
    subCategory: "الأمين للتمور",
    tags: ["مطبوعات", "هويات"],
  },
  // 03. Normal (1x1) - Brochure
  {
    ...projects.find((p) => p.id === 28) || projects[2],
    id: 28,
    title: "تصاميم المطبوعات",
    description: "كتيب فاخر لوزارة السياحة والأكاديمية",
    imageUrl: "/images/print-design-5.avif",
    category: "تصاميم المطبوعات",
    size: "normal",
    subCategory: "مطبوعات وكتيبات",
    tags: ["مطبوعات"],
  },
  // 04. Wide (2x1) - Social Media campaign
  {
    ...projects.find((p) => p.id === 45) || projects[3],
    id: 45,
    title: "تصاميم السوشيال ميديا",
    description: "منشورات وحملات إعلانية ترويجية لمطعم زعتر وسمسم",
    imageUrl: "/images/social-media-zaatar-1.avif",
    category: "تصميمات السوشيال ميديا",
    size: "wide",
    subCategory: "منشورات إعلانية",
    tags: ["سوشيال ميديا", "هويات"],
  },
  // 05. Normal (1x1) - Promotional flyers / cards
  {
    ...projects.find((p) => p.id === 30) || projects[4],
    id: 30,
    title: "تصاميم السوشيال والمطبوعات",
    description: "حملة إعلانية ومطبوعات لعلامة الامتياز التجاري",
    imageUrl: "/images/print-design-7.avif",
    category: "تصميمات السوشيال ميديا",
    size: "normal",
    subCategory: "حملة إعلانية",
    tags: ["سوشيال ميديا", "مطبوعات"],
  },
  // 06. Normal (1x1) - Charity Brand Identity
  {
    ...projects.find((p) => p.id === 20) || projects[1],
    id: 20,
    title: "تصميم الهوية البصرية",
    description: "هوية بصرية كاملة لجمعية التنمية الزراعية بالأحساء",
    imageUrl: "/images/agricultural-development-association.avif",
    category: "الهوية البصرية",
    size: "normal",
    subCategory: "جمعية وتنمية",
    tags: ["هويات"],
  },
  // 07. Normal (1x1) - Stationery / Letterhead
  {
    ...projects.find((p) => p.id === 22) || projects[3],
    id: 22,
    title: "تصميم الهوية والمطبوعات",
    description: "أوراق مراسلات وأظرف رسمية لمجمع ساكن السكني بالجبيل",
    imageUrl: "/images/saken/saken-official-envelope-mockup.webp",
    category: "الهوية البصرية",
    size: "normal",
    subCategory: "مستندات مؤسسية",
    tags: ["هويات", "مطبوعات"],
  },
  // 08. Normal (1x1) - Packaging Cinnabon / Al-Ameen
  {
    ...projects.find((p) => p.id === 41) || projects[4],
    id: 41,
    title: "تصاميم التغليف والمطبوعات",
    description: "تصميم علبة سينابون رولز الفاخرة للأمين للتمور",
    imageUrl: "/images/print-design-19.avif",
    category: "تصاميم المطبوعات",
    size: "normal",
    subCategory: "سينابون رولز",
    tags: ["تغليف", "مطبوعات"],
  },
  // 09. Wide (2x1) - Educational Social Media Campaign
  {
    ...projects.find((p) => p.id === 52) || projects[5],
    id: 52,
    title: "تصاميم السوشيال ميديا",
    description: "منشورات تعليمية وبوستات تسويقية لمعهد إنجلش زون",
    imageUrl: "/images/social-media-english-zone-1.avif",
    category: "تصميمات السوشيال ميديا",
    size: "wide",
    subCategory: "منشورات تعليمية",
    tags: ["سوشيال ميديا", "هويات"],
  },
  // 10. Large (2x2) - Zaatar & Semsem Case Study
  {
    ...projects.find((p) => p.id === 19) || projects[0],
    id: 19,
    title: "مطعم زعتر وسمسم",
    description: "دراسة حالة وهوية بصرية كاملة وتغليف ورقي مستدام لمطعم زعتر وسمسم.",
    imageUrl: "/images/zaatar-identity-portfolio3.webp",
    category: "الهوية البصرية",
    size: "large",
    subCategory: "مطاعم وكافيهات",
    tags: ["دراسات حالة", "هويات", "تغليف"],
  },
  // 11. Normal (1x1) - Ragy Burger
  {
    ...projects.find((p) => p.id === 21) || projects[2],
    id: 21,
    title: "برجر راجي",
    description: "هوية بصرية مليئة بالطاقة وتطبيقات تغليف وجبات البرجر بالرياض",
    imageUrl: "/images/ragy-identity-portfolio.webp",
    category: "الهوية البصرية",
    size: "normal",
    subCategory: "مطاعم سريعة",
    tags: ["دراسات حالة", "هويات"],
  },
  // 12. Normal (1x1) - Motion Graphic Video
  {
    ...projects.find((p) => p.id === 23) || projects[6],
    id: 23,
    title: "فيديو موشن جرافيك - VOKO ERP",
    description: "فيديو موشن جرافيك احترافي لنظام VOKO ERP السحابي لإدارة الشركات",
    imageUrl: "/images/voko-erp-motion-graphic-thumbnail.jpg",
    category: "فيديو موشن جرافيك",
    size: "normal",
    subCategory: "موشن جرافيك",
    tags: ["موشن جرافيك"],
  }
]

const filterTabs = [
  { label: "الكل", value: "all" },
  { label: "هويات", value: "الهوية البصرية" },
  { label: "مطبوعات", value: "تصاميم المطبوعات" },
  { label: "تغليف", value: "تغليف" },
  { label: "سوشيال ميديا", value: "تصميمات السوشيال ميديا" },
  { label: "موشن جرافيك", value: "فيديو موشن جرافيك" },
  { label: "دراسات حالة", value: "دراسات حالة" },
]

export default function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects = bentoProjects.filter((item) => {
    if (activeFilter === "all") return true
    if (activeFilter === "تغليف") return item.tags?.includes("تغليف")
    if (activeFilter === "دراسات حالة") return Boolean(item.caseStudy) || item.tags?.includes("دراسات حالة")
    return item.category === activeFilter
  })

  const openModal = (project: ProjectItem) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const getCaseStudyUrl = (project: BentoProject) => {
    if (project.id === 19) return "/work/zaatar-w-simsim-brand-identity"
    if (project.id === 20) return "/work/agricultural-development-association-brand-identity"
    if (project.id === 21) return "/work/ragy-burger-brand-identity"
    if (project.id === 22) return "/work/saken-corporate-housing-brand-identity"
    return null
  }

  return (
    <section className="py-12 bg-background text-foreground transition-colors duration-300">
      {/* ── 1. FILTERS (PILL BUTTONS) ── */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none flex-nowrap sm:flex-wrap">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                    : "bg-card/60 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 2. BENTO PORTFOLIO GRID ── */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] sm:auto-rows-[260px] lg:auto-rows-[270px] gap-4 sm:gap-5">
          {filteredProjects.map((project, idx) => {
            const caseStudyUrl = getCaseStudyUrl(project)
            const isLarge = project.size === "large"
            const isWide = project.size === "wide"

            // Compute grid layout classes based on item size
            let gridSpanClass = "col-span-1 row-span-1"
            if (isLarge) {
              gridSpanClass = "sm:col-span-2 sm:row-span-2 col-span-1 row-span-1"
            } else if (isWide) {
              gridSpanClass = "sm:col-span-2 row-span-1 col-span-1"
            }

            const formattedNumber = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`

            return (
              <article
                key={`${project.id}-${idx}`}
                className={`group relative overflow-hidden rounded-2xl bg-card border border-border/80 shadow-sm hover:shadow-xl transition-all duration-500 ${gridSpanClass}`}
              >
                {/* Background Image with Next.js Optimization */}
                <div className="relative w-full h-full overflow-hidden bg-muted/40">
                  <Image
                    src={project.imageUrl || "/placeholder.jpg"}
                    alt={project.title}
                    fill
                    sizes={
                      isLarge
                        ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        : isWide
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 100vw, 25vw"
                    }
                    className="object-cover transition-transform duration-700 cubic-bezier(0.2, 0.7, 0.2, 1) group-hover:scale-105 group-hover:brightness-90"
                    priority={idx < 4}
                  />
                </div>

                {/* Always visible gradient & text overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-400">
                  {/* Project Number */}
                  <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs font-bold tracking-wider">
                    <span className="w-6 h-[2px] bg-primary inline-block" />
                    <span>{formattedNumber}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1 leading-tight drop-shadow-sm">
                    {project.title}
                  </h3>

                  {/* SubCategory */}
                  <p className="text-xs sm:text-sm text-gray-300 font-medium mb-3">
                    {project.subCategory || project.category}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 text-gray-100 border border-white/20 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link: Case Study or Modal View */}
                  {caseStudyUrl ? (
                    <Link
                      href={caseStudyUrl}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline mt-1"
                    >
                      <span>عرض دراسة الحالة</span>
                      <span className="text-base font-sans">←</span>
                    </Link>
                  ) : project.externalLink ? (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline mt-1"
                    >
                      <span>مشاهدة الفيديو على يوتيوب</span>
                      <span className="text-base font-sans">↗</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => openModal(project)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline mt-1 text-right cursor-pointer"
                    >
                      <span>عرض تفاصيل المشروع</span>
                      <span className="text-base font-sans">←</span>
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* ── 3. BOTTOM CTA SECTION (Editorial Style) ── */}
      <section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="text-primary font-bold text-xs tracking-wider mb-2 flex items-center gap-2">
              <span className="w-5 h-[2px] bg-primary inline-block" />
              <span>هل لديك مشروع قادم؟</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              جاهز لبدء مشروعك القادم؟
            </h2>
            <p className="mt-2 text-muted-foreground text-base">
              نحول أفكارك إلى تصاميم تصنع الفرق في السوقين السعودي والمصري.
            </p>
          </div>

          <Link
            href="/#contact-form"
            className="apple-button px-8 py-4 text-sm font-bold shadow-xl hover:scale-105 transition-transform shrink-0 inline-flex items-center gap-2"
          >
            <span>تواصل معنا الآن</span>
            <span>←</span>
          </Link>
        </div>
      </section>

      {/* ── 4. PROJECT MODAL (Preserved for projects without full case studies) ── */}
      <ImageModal
        imageUrl={selectedProject?.imageUrl || null}
        title={selectedProject?.title || ""}
        category={selectedProject?.category}
        description={selectedProject?.description}
        caseStudy={selectedProject?.caseStudy}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  )
}