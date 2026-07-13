"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ImageModal from "./ImageModal"
import Link from "next/link"

const projects = [
  {
    id: 19,
    title: "هوية زعتر و سمسم",
    description: "تصميم هوية بصرية متكاملة لمطعم زعتر و سمسم، تشمل الشعار، الألوان، التعبئة، والزي الرسمي.",
    imageUrl: "/images/zaatar-identity-portfolio3.webp",
    category: "الهوية البصرية",
    caseStudy: {
      client: "مطعم زعتر وسمسم (القاهرة والرياض)",
      problem: "الهوية القديمة للمطعم كانت تفتقر إلى التناغم والتفرد البصري، وصعوبة تطبيقها على مواد التعبئة والتغليف الصديقة للبيئة.",
      solution: "تصميم شعار جديد مبتكر يدمج بين حبتي السمسم وورقة الزعتر، وتطوير لوحة ألوان دافئة مستوحاة من ريف الشرق الأوسط مع أنماط خطوط فريدة تلائم الباكجينج والمطبوعات الورقية.",
      results: "توحيد الحضور البصري للمطعم عبر فروعه، وزيادة ثقة وسعادة العملاء بالعبوات الجديدة، وتحقيق زيادة ملحوظة في نسبة مشاركة تصاميم التغليف على منصات التواصل الاجتماعي."
    }, // تم التحديث هنا
  },
  {
    id: 20,
    title: "هوية جمعية التنمية الزراعية",
    description: "تطوير هوية بصرية لجمعية التنمية الزراعية، مع التركيز على الاستدامة والطبيعة.",
    imageUrl: "/images/agricultural-development-association.avif",
    category: "الهوية البصرية",
    caseStudy: {
      client: "جمعية التنمية الزراعية بالأحساء (المملكة العربية السعودية)",
      problem: "كانت الجمعية تبحث عن هوية بصرية تجمع بين الطابع المؤسسي الرسمي وبين الطبيعة الزراعية لمنطقة الأحساء الغنية بالنخيل والخيرات.",
      solution: "ابتكار شعار مستلهم من سعف النخيل وتقسيمات الحقول، وتطوير هوية بصرية بألوان ترابية ودرجات أخضر تعبر عن النمو والازدهار مع كتابة كوفية هندسية رصينة للخطاب الرسمي.",
      results: "نالت الهوية استحسان الهيئات الحكومية والجمهور بالأحساء، وعززت المظهر المؤسسي للجمعية في المعارض والملتقيات الزراعية الإقليمية."
    }, // تم التحديث هنا
  },
  {
    id: 21,
    title: "هوية برجر راجي",
    description: "تصميم هوية بصرية شاملة لعلامة برجر راجي.",
    imageUrl: "/images/ragy-identity-portfolio.webp",
    category: "الهوية البصرية",
    caseStudy: {
      client: "مطعم برجر راجي (الرياض)",
      problem: "المنافسة الشديدة في قطاع مطاعم البرجر في الرياض تتطلب هوية بصرية مليئة بالطاقة والحيوية لتجذب فئة الشباب بشكل فوري.",
      solution: "تصميم هوية بصرية ممتعة ومليئة بالنشاط باستخدام لوحة ألوان دافئة (أحمر، برتقالي، أصفر) تعزز الشهية، وتصميم علب وأكواب التوصيل برسومات كرتونية تفاعلية مخصصة.",
      results: "نجاح باهر في جذب الزبائن من النظرة الأولى، وتزايد كبير في طلبات التوصيل بفضل المظهر المميز لأكياس وعلب المطعم في الشوارع."
    }, // تم التحديث هنا
  },
  {
    id: 24,
    title: "الفريج للأسماك",
    description: "تصميم بروشور أو كتيب، ربما لعلامة تجارية فاخرة أو عقارية.",
    imageUrl: "/images/print-design-1.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 25,
    title: "الأمين للتمور",
    description: "تصميم كتيب أو تقرير سنوي للشركات، يتميز بتصميم نظيف ومهني.",
    imageUrl: "/images/print-design-2.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 26,
    title: "الأمين للتمور",
    description: "تصميم بطاقة عمل بأسلوب عصري وبسيط.",
    imageUrl: "/images/print-design-3.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 27,
    title: "الأمين للتمور",
    description: "تصميم آخر لبطاقة عمل، يتميز بتصميم فريد أو استخدام مواد مميزة.",
    imageUrl: "/images/print-design-4.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 28,
    title: "الأكاديمية المالية",
    description: "تصميم صفحة مجلة أو مطبوعة كبيرة الحجم، ربما للأزياء أو نمط الحياة.",
    imageUrl: "/images/print-design-5.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 29,
    title: "السهلي",
    description: "تصميم بروشور أو نشرة إعلانية، قد يكون لحدث أو منتج.",
    imageUrl: "/images/print-design-6.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 30,
    title: "الامتياز التجاري",
    description: "تصميم غلاف كتاب أو منشور، يركز على الطباعة والصور.",
    imageUrl: "/images/print-design-7.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 31,
    title: "وزارة السياحة",
    description: "تصميم ملصق أو إعلان كبير الحجم، ربما لحدث ثقافي أو إطلاق منتج.",
    imageUrl: "/images/print-design-8.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 32,
    title: "انجلش زون",
    description: "تصميم عبوة منتج، قد يكون لمنتج غذائي أو استهلاكي، مع هوية بصرية مميزة.",
    imageUrl: "/images/print-design-9.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 33,
    title: "انجلش زون",
    description: "تصميم غلاف مجلة أو كتاب، يظهر فيه نص عربي بارز وتصميم فني.",
    imageUrl: "/images/print-design-10.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 34,
    title: "كتيب لجمعية الفيصلية",
    description: "تصميم بطاقة عمل أو دعوة، مع تركيز على التفاصيل الدقيقة والخطوط الأنيقة.",
    imageUrl: "/images/print-design-11.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 35,
    title: "روابي الخليج",
    description: "تصميم عبوة منتج فاخرة، ربما لمستحضرات تجميل أو منتجات فاخرة، مع شعار مميز.",
    imageUrl: "/images/print-design-12.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 36,
    title: "بروفايل لمكتب محاماه آل زرعه",
    description: "تصميم بروشور أو كتيب، يظهر فيه تخطيط متعدد الصفحات ومعلومات منظمة.",
    imageUrl: "/images/print-design-13.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 37,
    title: "بريزينتيشن للأكاديمية المالية",
    description: "تصميم ملصق أو إعلان، يتميز برسومات توضيحية أو أيقونات.",
    imageUrl: "/images/print-design-14.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 38,
    title: "كارت شخصي AMP",
    description: "تصميم بطاقة عمل أو هوية بصرية، مع استخدام ألوان جريئة وتصميم حديث.",
    imageUrl: "/images/print-design-15.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 39,
    title: "كارت شخصي لشركة أبعاد",
    description: "تصميم عبوة منتج، ربما لمنتجات غذائية أو مشروبات، مع التركيز على الجاذبية البصرية.",
    imageUrl: "/images/print-design-16.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 40,
    title: "بوكسات للأمين للتمور",
    description: "تصميم غلاف كتاب أو مجلة، يظهر فيه صورة جذابة وعنوان واضح.",
    imageUrl: "/images/print-design-17.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 41,
    title: "بوكسات للأمين للتمور",
    description: "تصميم بطاقة عمل أو دعوة، مع استخدام عناصر تصميم بسيطة وأنيقة.",
    imageUrl: "/images/print-design-18.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 42,
    title: "بوكسات للأمين للتمور",
    description: "تصميم بطاقة عمل أو هوية بصرية، مع شعار بسيط وأنيق.",
    imageUrl: "/images/print-design-19.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 43,
    title: "غلاف مجلة بتصميم فني",
    description: "تصميم غلاف مجلة أو كتاب، يظهر فيه تصميم فني معقد.",
    imageUrl: "/images/print-design-20.avif",
    category: "تصاميم المطبوعات",
  },
  {
    id: 44,
    title: "بروشور بصور كبيرة",
    description: "تصميم بروشور أو كتيب، يركز على الصور الكبيرة والنصوص الموجزة.",
    imageUrl: "/images/print-design-21.avif",
    category: "تصاميم المطبوعات",
  },
  // مشاريع السوشيال ميديا
  {
    id: 45,
    title: "الامتياز التجاري",
    description: "تصميم منشور لوسائل التواصل الاجتماعي لمطعم زعتر و سمسم.",
    imageUrl: "/images/social-media-zaatar-1.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 46,
    title: "الامتياز التجاري",
    description: "تصميم إعلان وجبة جديدة لمطعم زعتر و سمسم.",
    imageUrl: "/images/social-media-zaatar-2.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 47,
    title: "divehood",
    description: "تصميم عرض خاص لمطعم زعتر و سمسم.",
    imageUrl: "/images/social-media-zaatar-3.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 48,
    title: "divehood",
    description: "تصميم إعلان لبرجر جديد لعلامة برجر راجي.",
    imageUrl: "/images/social-media-ragy-1.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 49,
    title: "divehood",
    description: "تصميم منشور تفاعلي لعلامة برجر راجي.",
    imageUrl: "/images/social-media-ragy-2.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 50,
    title: "جمعية التنمية الأهلية بالقارة",
    description: "تصميم حملة تسويقية لعلامة برجر راجي.",
    imageUrl: "/images/social-media-ragy-3.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 51,
    title: "دايف هود",
    description: "تصميم منشور لمنتج جديد لعلامة الواحة.",
    imageUrl: "/images/social-media-alwaha-1.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 52,
    title: "Bateel Diver",
    description: "تصميم إعلان لموسم جديد لعلامة الواحة.",
    imageUrl: "/images/social-media-alwaha-2.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 53,
    title: "جدارة",
    description: "تصميم منشور توعوي لعلامة الواحة.",
    imageUrl: "/images/social-media-alwaha-3.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 54,
    title: "انجلش زون",
    description: "تصميم منشور إخباري لعلامة المساء.",
    imageUrl: "/images/social-media-almasaa-1.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 55,
    title: "الامتياز التجاري",
    description: "تصميم إعلان لحدث قادم لعلامة المساء.",
    imageUrl: "/images/social-media-almasaa-2.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 56,
    title: "الامتياز التجاري",
    description: "تصميم منشور تفاعلي لعلامة المساء.",
    imageUrl: "/images/social-media-almasaa-3.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 57,
    title: "الامتياز التجاري",
    description: "تصميم منشور ديني لعلامة النور.",
    imageUrl: "/images/social-media-alnour-1.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 58,
    title: "انجلش زون",
    description: "تصميم إعلان لمناسبة دينية لعلامة النور.",
    imageUrl: "/images/social-media-alnour-2.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 59,
    title: "انجلش زون",
    description: "تصميم منشور صباحي لعلامة الفجر.",
    imageUrl: "/images/social-media-alfajr-1.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 60,
    title: "انجلش زون",
    description: "تصميم إعلان لمنتج جديد لعلامة الفجر.",
    imageUrl: "/images/social-media-alfajr-2.avif",
    category: "تصميمات السوشيال ميديا",
  },
  {
    id: 23,
    title: "فيديو موشن جرافيك",
    description: "جاري التحديث",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "فيديو موشن جرافيك",
  },
]

const categories = ["الكل", "الهوية البصرية", "تصميمات السوشيال ميديا", "تصاميم المطبوعات", "فيديو موشن جرافيك"]

export default function WorkGrid() {
  const [filter, setFilter] = useState("الهوية البصرية")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects = filter === "الكل" ? projects : projects.filter((project) => project.category === filter)

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">أعمالنا</h1>
          <p className="mt-4 text-lg text-muted-foreground">استكشف مجموعة واسعة من مشاريعنا الإبداعية.</p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8 space-x-reverse flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary/10"
              >
                <div
                  className={`relative overflow-hidden ${
                    project.category === "تصميمات السوشيال ميديا" ? "h-[400px]" : "h-64"
                  }`}
                >
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit={project.category === "تصميمات السوشيال ميديا" ? "contain" : "cover"}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-white text-center px-4">{project.description}</p>
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-primary mb-1">{project.category}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  {project.caseStudy ? (
                    <Link
                      href={`/work/${project.id === 19 ? "zaatar-w-simsim-brand-identity" : project.id === 20 ? "agricultural-development-association-brand-identity" : "ragy-burger-brand-identity"}`}
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      عرض دراسة الحالة
                    </Link>
                  ) : (
                  <button
                    onClick={() => openModal(project)}
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    عرض المشروع
                  </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <ImageModal
          imageUrl={selectedProject?.imageUrl || null}
          title={selectedProject?.title || ""}
          category={selectedProject?.category}
          description={selectedProject?.description}
          caseStudy={selectedProject?.caseStudy}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  )
}
