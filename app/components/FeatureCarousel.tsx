import Image from "next/image"
import Link from "next/link"

const features = [
  {
    title: "الهوية البصرية",
    description:
      "هوية بصرية تخلي عميلك يميّزك من أول نظرة في السوق السعودي والمصري — نظام متكامل جاهز يشتغل على كل نقاط التواصل بشكل موحّد.",
    icon: "/images/identity.avif",
    href: "/services/visual-identity",
  },
  {
    title: "تصميمات السوشيال ميديا",
    description:
      "محتوى بصري يخلي صفحتك تبان احترافية وتضاعف تفاعل ومبيعاتك في الرياض والقاهرة من أول سكرول.",
    icon: "/images/social-media.avif",
    href: "/services/social-media-design",
  },
  {
    title: "تصاميم المطبوعات",
    description:
      "مطبوعات فاخرة وجاهزة تسلّمها لعميلك أو تستخدمها في اجتماعاتك في المملكة ومصر من غير أي تعديل.",
    icon: "/images/prints.avif",
    href: "/services/print-design",
  },
  {
    title: "فيديو موشن جرافيك",
    description:
      "فيديو احترافي بيشرح فكرتك في ثواني ويخلي جمهورك المستهدف يفهمك ويتخذ قرار الشراء فوراً.",
    icon: "/images/motion.avif",
    href: "/services/motion-graphics",
  },
]

export default function FeatureCarousel() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-gradient-to-b from-background to-secondary/20 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-semibold text-primary">حلول بصرية متكاملة</p>
          <h2
            id="services-heading"
            className="mt-2 text-3xl font-bold text-foreground"
          >
            خدماتنا
          </h2>
        </div>

        {/* Pure CSS scroll-snap container: Zero JS, zero forced reflow, ultra fast */}
        <div className="flex overflow-x-auto pb-4 gap-6 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {features.map((feature) => (
            <article
              key={feature.href}
              className="flex h-[420px] min-w-[280px] sm:min-w-[320px] flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md snap-start shrink-0"
            >
              <div className="text-center">
                <div className="mb-4 flex h-24 items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={160}
                    height={160}
                    sizes="160px"
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="leading-7 text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href={feature.href}
                  className="inline-flex items-center font-semibold text-primary hover:underline text-sm"
                  aria-label={`اعرف المزيد عن ${feature.title}`}
                >
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  اعرف المزيد
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
