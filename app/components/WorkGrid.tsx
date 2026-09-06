"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import ImageModal from "./ImageModal"
import { projects, ProjectItem } from "@/lib/portfolioData"

// Extended project interface with layout size and tags for the Bento Grid
interface BentoProject extends ProjectItem {
  size?: "large" | "wide" | "normal"
  tags?: string[]
  subCategory?: string
}

// Explicit overrides for key showcase projects
const projectOverrides: Record<
  number,
  {
    size?: "large" | "wide" | "normal"
    subCategory?: string
    tags?: string[]
    title?: string
    description?: string
  }
> = {
  // Case Studies & Brand Identities (Grand 2x2 Showcases)
  19: {
    size: "large",
    title: "مطعم زعتر وسمسم",
    subCategory: "مطاعم ومقاهي",
    tags: ["دراسات حالة", "هويات"],
  },
  20: {
    size: "large",
    title: "جمعية التنمية الزراعية",
    subCategory: "جمعيات ومؤسسات",
    tags: ["دراسات حالة", "هويات"],
  },
  21: {
    size: "large",
    title: "برجر راجي",
    subCategory: "مطاعم سريعة",
    tags: ["دراسات حالة", "هويات"],
  },
  22: {
    size: "large",
    title: "مجمع ساكن للإسكان المؤسسي",
    subCategory: "إسكان مؤسسي وعقارات",
    tags: ["دراسات حالة", "هويات", "مطبوعات"],
  },

  // Packaging Designs (Al-Ameen Dates Boxes)
  25: {
    size: "normal",
    title: "الأمين للتمور - علبة سينابون رولز",
    description: "تصميم عبوة وتغليف كرتوني مبتكر لسينابون رولز بالتمر والقرفة لمصنع الأمين للتمور.",
    subCategory: "تصميم عبوات وتغليف",
    tags: ["تغليف"],
  },
  27: {
    size: "normal",
    title: "الأمين للتمور - خليط كوكيز التمر",
    description: "تصميم عبوة كرتونية فاخرة لمنتج خليط كوكيز التمر العضوي لمصنع الأمين للتمور.",
    subCategory: "تصميم عبوات غذائية",
    tags: ["تغليف"],
  },
  42: {
    size: "normal",
    title: "الأمين للتمور - علبة تمور محشوة بالمكسرات",
    description: "تصميم عبوة هدايا كرتونية هندسية فريدة للتمور الفاخرة المحشوة بالمكسرات لمصنع الأمين للتمور.",
    subCategory: "تغليف كرتوني مبتكر",
    tags: ["تغليف"],
  },
  43: {
    size: "normal",
    title: "الأمين للتمور - علبة سناك التمر والصقعي",
    description: "تصميم علبة تمور كرتونية فاخرة باللون الأخضر الزيتي والذهبي لسناك التمر وصقعي التمر للأمين للتمور.",
    subCategory: "علب تمور فاخرة",
    tags: ["تغليف"],
  },
  44: {
    size: "normal",
    title: "مصنع الأمين للتمور - علبة تمور مستطيلة فاخرة",
    description: "تصميم علبة هدايا مستطيلة فاخرة لتمور محشوة بالمكسرات لمصنع الأمين للتمور.",
    subCategory: "علب هدايا فاخرة",
    tags: ["تغليف"],
  },

  // Highlighted Print Designs
  26: {
    size: "normal",
    title: "الأمين للتمور - كروت عمل",
    description: "بطاقات عمل ومستندات رسمية للأمين للتمور بأسلوب عصري وأنيق.",
    subCategory: "مطبوعات وهويات",
    tags: ["مطبوعات", "هويات"],
  },
  28: {
    size: "normal",
    title: "الأكاديمية المالية",
    description: "كتيب فاخر وتصميم مطبوعات تعريفية متعددة الصفحات للأكاديمية المالية.",
    subCategory: "كتيبات وبروشورات",
    tags: ["مطبوعات"],
  },
  31: {
    size: "normal",
    title: "وزارة السياحة",
    description: "تصميم ملصق وإعلانات مطبوعة كبرى للحملات الترويجية لوزارة السياحة.",
    subCategory: "ملصقات وإعلانات",
    tags: ["مطبوعات"],
  },
  34: {
    size: "normal",
    title: "جمعية الفيصلية",
    description: "تصميم كتيب تعريفي فاخر وبطاقات رسمية لجمعية الفيصلية الخيرية.",
    subCategory: "كتيبات وتقارير",
    tags: ["مطبوعات"],
  },
  35: {
    size: "normal",
    title: "كتاب الأحساء - التسامح المذهبي",
    description: "تصميم وإخراج غلاف كتاب الأحساء نموذج التسامح المذهبي للكاتب محمد علي الحرز.",
    subCategory: "تصميم كتب ومطبوعات",
    tags: ["مطبوعات"],
  },
  36: {
    size: "normal",
    title: "مكتب محاماة آل زرعه",
    description: "تصميم بروفايل شركات تعريفي فاخر ومطبوعات قانونية ومستندات رسمية.",
    subCategory: "بروفايل شركات",
    tags: ["مطبوعات"],
  },
  37: {
    size: "normal",
    title: "الأكاديمية المالية - عرض تقديمي",
    description: "تصميم عرض تقديمي وبريزينتيشن احترافي ومطبوع للأكاديمية المالية.",
    subCategory: "عروض ومطبوعات",
    tags: ["مطبوعات"],
  },
  38: {
    size: "normal",
    title: "الأكاديمية المالية - مطبوعات المستثمرين",
    description: "تصميم مطبوعات وبروشور تعريفي لمشروع تعزيز وتطوير قدرات المستثمرين للأكاديمية المالية.",
    subCategory: "كتيبات ومطبوعات",
    tags: ["مطبوعات"],
  },
  39: {
    size: "normal",
    title: "كارت شخصي AMP CONNECT",
    description: "تصميم بطاقات عمل وهوية شخصية لعلامة AMP CONNECT بألوان وتنسيق عصري.",
    subCategory: "كروت شخصية",
    tags: ["مطبوعات"],
  },
  40: {
    size: "normal",
    title: "كارت شخصي لشركة أبعاد",
    description: "تصميم بطاقة عمل ومستندات رسمية لشركة أبعاد الاستثمارية بتشطيبات راقية.",
    subCategory: "كروت شخصية",
    tags: ["مطبوعات"],
  },
  41: {
    size: "normal",
    title: "الفريج للأسماك - بطاقات ترويجية",
    description: "تصميم بطاقات وكروت ترويجية لمتجر الفريج للأسماك والروبيان.",
    subCategory: "بطاقات ترويجية",
    tags: ["مطبوعات"],
  },

  // Social Media Campaigns
  45: {
    size: "normal",
    title: "مطعم زعتر وسمسم - سوشيال ميديا",
    description: "منشورات وحملات إعلانية ترويجية وتفاعلية لمطعم زعتر وسمسم.",
    subCategory: "سوشيال ميديا ومطاعم",
    tags: ["سوشيال ميديا"],
  },
  46: {
    size: "normal",
    title: "مطعم زعتر وسمسم - إعلان وجبات",
    description: "تصميم إعلان وجبات جديدة وعروض موسمية لمنصات التواصل الاجتماعي.",
    subCategory: "سوشيال ميديا",
    tags: ["سوشيال ميديا"],
  },
  48: {
    size: "normal",
    title: "برجر راجي - بوست سبيشال",
    description: "تصميم إعلان وجبة برجر جديدة بأسلوب بصري شهي وجذاب.",
    subCategory: "سوشيال ميديا ومطاعم",
    tags: ["سوشيال ميديا"],
  },
  52: {
    size: "normal",
    title: "Bateel Diver - الواحة",
    description: "تصميم حملة إعلانية لموسم الغوص الجديد لعلامة Bateel Diver والواحة.",
    subCategory: "حملات إعلانية",
    tags: ["سوشيال ميديا"],
  },
  54: {
    size: "normal",
    title: "إنجلش زون - بوستات تعليمية",
    description: "منشورات تعليمية وبوستات تسويقية لمعهد إنجلش زون.",
    subCategory: "سوشيال ميديا",
    tags: ["سوشيال ميديا"],
  },

  // Motion Graphics
  23: {
    size: "normal",
    title: "فيديو موشن جرافيك - VOKO ERP",
    description: "فيديو موشن جرافيك احترافي لنظام VOKO ERP السحابي لإدارة الشركات.",
    subCategory: "موشن جرافيك وإعلانات",
    tags: ["موشن جرافيك"],
  },
}

// Curated order for the "الكل" view to blend packaging, identities, prints, and social media seamlessly
const curatedOrder = [
  // الصف الأول: 4 تصاميم تغليف ومطبوعات بارزة
  25, 26, 42, 43,

  // البلوك الثاني: هوية مطعم زعتر وسمسم (كبير 2x2) وبجانبها 4 تصاميم منوعة
  19, 27, 44, 28, 45,

  // البلوك الثالث: ثنائية هويات بارزة (مجمع ساكن 2x2 + جمعية التنمية الزراعية 2x2)
  22, 20,

  // الصف الرابع: 4 تصاميم متوازنة
  31, 52, 24, 34,

  // البلوك الخامس: هوية برجر راجي (كبير 2x2) وبجانبها 4 تصاميم
  21, 23, 29, 30, 32,

  // باقي الأعمال
  33, 35, 36, 37, 38, 39, 40, 41, 46, 47, 48, 49, 50, 51, 53, 54,
  55, 56, 57, 58, 59, 60,
]

// Build the complete enriched list of all 42 projects
const allProjectsMap = new Map<number, ProjectItem>()
projects.forEach((p) => allProjectsMap.set(p.id, p))

const allBentoProjects: BentoProject[] = curatedOrder
  .map((id) => {
    const p = allProjectsMap.get(id)
    if (!p) return null

    const override = projectOverrides[id] || {}

    // Dynamic tags and subcategories
    let defaultTags: string[] = []
    let defaultSubCategory = p.category

    if (p.category === "تغليف") {
      defaultTags = ["تغليف"]
      defaultSubCategory = "تصميم التغليف والعلب"
    } else if (p.category === "تصاميم المطبوعات") {
      defaultTags = ["مطبوعات"]
      defaultSubCategory = "مطبوعات وكتيبات"
    } else if (p.category === "تصميمات السوشيال ميديا") {
      defaultTags = ["سوشيال ميديا"]
      defaultSubCategory = "سوشيال ميديا وإعلانات"
    } else if (p.category === "الهوية البصرية") {
      defaultTags = ["هويات"]
      defaultSubCategory = "هوية بصرية كاملة"
    } else if (p.category === "فيديو موشن جرافيك") {
      defaultTags = ["موشن جرافيك"]
      defaultSubCategory = "موشن جرافيك"
    }

    if (p.caseStudy) {
      defaultTags.unshift("دراسات حالة")
    }

    return {
      ...p,
      title: override.title || p.title,
      description: override.description || p.description,
      size: override.size || "normal",
      subCategory: override.subCategory || defaultSubCategory,
      tags: override.tags || defaultTags,
    }
  })
  .filter((p): p is BentoProject => p !== null)

export default function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Compute exact count for each filter category
  const filterTabs = useMemo(() => {
    const totalCount = allBentoProjects.length
    const identityCount = allBentoProjects.filter((p) => p.category === "الهوية البصرية").length
    const packagingCount = allBentoProjects.filter((p) => p.category === "تغليف").length
    const printCount = allBentoProjects.filter((p) => p.category === "تصاميم المطبوعات").length
    const socialCount = allBentoProjects.filter((p) => p.category === "تصميمات السوشيال ميديا").length
    const motionCount = allBentoProjects.filter((p) => p.category === "فيديو موشن جرافيك").length

    return [
      { label: "الكل", value: "all", count: totalCount },
      { label: "هويات", value: "الهوية البصرية", count: identityCount },
      { label: "تغليف", value: "تغليف", count: packagingCount },
      { label: "مطبوعات", value: "تصاميم المطبوعات", count: printCount },
      { label: "سوشيال ميديا", value: "تصميمات السوشيال ميديا", count: socialCount },
      { label: "موشن جرافيك", value: "فيديو موشن جرافيك", count: motionCount },
    ]
  }, [])

  const filteredProjects = useMemo(() => {
    return allBentoProjects.filter((item) => {
      if (activeFilter === "all") return true
      if (activeFilter === "تغليف") return item.category === "تغليف"
      return item.category === activeFilter
    })
  }, [activeFilter])

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
      {/* ── 1. FILTERS (PILL BUTTONS WITH COUNTS) ── */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none flex-nowrap sm:flex-wrap">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer border flex items-center gap-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                    : "bg-card/60 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-extrabold ${
                    isActive
                      ? "bg-black/25 text-black"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 2. BENTO PORTFOLIO GRID (FULL 42 PROJECTS) ── */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] sm:auto-rows-[260px] lg:auto-rows-[270px] gap-4 sm:gap-5 grid-flow-dense">
          {filteredProjects.map((project, idx) => {
            const caseStudyUrl = getCaseStudyUrl(project)
            const isLarge = project.size === "large"
            const isWide = project.size === "wide"

            // Compute responsive grid layout classes based on item size
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
                onClick={() => {
                  if (caseStudyUrl) {
                    window.location.href = caseStudyUrl
                  } else if (project.externalLink) {
                    window.open(project.externalLink, "_blank", "noopener,noreferrer")
                  } else {
                    openModal(project)
                  }
                }}
                className={`group relative overflow-hidden rounded-2xl bg-card border border-border/80 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${gridSpanClass}`}
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
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                  {/* Project Number */}
                  <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs font-bold tracking-wider">
                    <span className="w-6 h-[2px] bg-primary inline-block" />
                    <span>{formattedNumber}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1 leading-tight drop-shadow-sm line-clamp-1">
                    {project.title}
                  </h3>

                  {/* SubCategory */}
                  <p className="text-xs sm:text-sm text-gray-300 font-medium mb-3 line-clamp-1">
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
                  <div className="pointer-events-auto mt-1">
                    {caseStudyUrl ? (
                      <Link
                        href={caseStudyUrl}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>عرض دراسة الحالة</span>
                        <span className="text-base font-sans">←</span>
                      </Link>
                    ) : project.externalLink ? (
                      <a
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>مشاهدة الفيديو على يوتيوب</span>
                        <span className="text-base font-sans">↗</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary group-hover:underline text-right">
                        <span>عرض تفاصيل العمل</span>
                        <span className="text-base font-sans">←</span>
                      </span>
                    )}
                  </div>
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
              جاهز لبدء مشروعك القادم مع تاج ستوديو؟
            </h2>
            <p className="mt-2 text-muted-foreground text-base max-w-xl">
              نحول أفكارك إلى تصاميم تصنع الفرق في السوقين السعودي والمصري، مع اهتمام كامل بأدق التفاصيل والطباعة الفاخرة.
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

      {/* ── 4. PROJECT MODAL ── */}
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