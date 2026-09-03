export interface CaseStudy {
  client: string
  problem: string
  solution: string
  results: string
}

export interface ProjectItem {
  id: number
  title: string
  description: string
  imageUrl: string
  category: "الهوية البصرية" | "تصميمات السوشيال ميديا" | "تصاميم المطبوعات" | "فيديو موشن جرافيك"
  caseStudy?: CaseStudy
  externalLink?: string
}

export const serviceSlugToCategory: Record<string, string> = {
  "visual-identity": "الهوية البصرية",
  "social-media-design": "تصميمات السوشيال ميديا",
  "print-design": "تصاميم المطبوعات",
  "motion-graphics": "فيديو موشن جرافيك",
  "company-profile-design": "تصاميم المطبوعات",
}

export const categoryToServiceSlug: Record<string, string> = {
  "الهوية البصرية": "visual-identity",
  "تصميمات السوشيال ميديا": "social-media-design",
  "تصاميم المطبوعات": "print-design",
  "فيديو موشن جرافيك": "motion-graphics",
}

export const projects: ProjectItem[] = [
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
    },
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
    },
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
    },
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
    imageUrl: "/images/print-design-1.avif",
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
    title: "فيديو موشن جرافيك - VOKO ERP",
    description: "فيديو موشن جرافيك احترافي لنظام VOKO ERP، يعرض بيئة العمل الحديثة والتقنيات المتطورة.",
    imageUrl: "/images/voko-erp-motion-graphic-thumbnail.jpg",
    category: "فيديو موشن جرافيك",
    externalLink: "https://youtu.be/PlwOtO7kPuM",
  },
]

export function getProjectsByCategory(categoryName: string): ProjectItem[] {
  if (categoryName === "الكل") return projects
  return projects.filter((item) => item.category === categoryName)
}

export function getProjectsByServiceSlug(slug: string): ProjectItem[] {
  const cat = serviceSlugToCategory[slug]
  if (!cat) return projects
  return projects.filter((item) => item.category === cat)
}
