import Image from "next/image"
import Link from "next/link"
import { ServiceData } from "@/lib/servicesData"

interface Props {
  service: ServiceData
}

export default function CompanyProfilePage({ service }: Props) {
  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-24 lg:pt-32 pb-20 border-b border-border/60 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-primary/15 blur-[130px] pointer-events-none z-[-1]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none z-[-1]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav aria-label="مسار التنقل" className="breadcrumb-nav mb-6">
            <Link href="/">الرئيسية</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/services/">الخدمات</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" aria-current="page">بروفايل الشركات والتأهيل المؤسسي</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span>خدمات الوثائق المؤسسية وسوابق الأعمال — السعودية ومصر</span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                تصميم بروفايل الشركات وتنظيم ملفات التأهيل المؤسسي
              </h1>

              <p className="mt-5 text-xl sm:text-2xl font-bold text-primary leading-snug">
                تنظيم سوابق الأعمال، مصفوفات المشاريع، وملفات التأهيل للمشتريات والمنافسات في السعودية
              </p>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-2xl">
                نحول بيانات شركتك وسوابق أعمالها من أوراق ومستندات متفرقة إلى ملف تعريفي منظم، يُبرز قدراتكم الفنية أمام لجان المشتريات والتأهيل، وجاهز للإرسال الرقمي أو الطباعة الفاخرة.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/201009215131?text=${encodeURIComponent(
                    "مرحبًا، أريد مناقشة نطاق عمل وتصميم بروفايل لشركتنا في السعودية"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-button px-8 py-4 inline-flex items-center gap-2 text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                  <span>ناقش نطاق عمل ملف شركتك</span>
                  <span>↗</span>
                </a>
                <a
                  href="#saken-proof"
                  className="rounded-full border border-border/80 bg-card/60 px-8 py-4 text-base font-bold text-foreground transition hover:border-primary hover:text-primary hover:bg-card"
                >
                  استعرض نموذج من سوابق أعمالنا
                </a>
              </div>

              {/* Target Sectors Badges */}
              <div className="mt-12 pt-8 border-t border-border/80">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">القطاعات التي نخدمها بالمملكة</p>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground">شركات المقاولات والإنشاءات</span>
                  <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground">مؤسسات التوريد والخدمات اللوجستية</span>
                  <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground">الشركات الهندسية والاستشارية</span>
                  <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground">المجموعات الصناعية والتجارية</span>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl group">
                <Image
                  src="/images/saken/saken-official-envelope-mockup.webp"
                  alt="تصميم بروفايل ومطبوعات رسمية للشركات - تاج ستوديو"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 right-6 left-6 p-4 rounded-2xl bg-background/85 backdrop-blur-md border border-border/80 text-foreground">
                  <p className="text-xs text-primary font-bold">تاج ستوديو • وثائق مؤسسية</p>
                  <p className="text-sm font-bold mt-1">إخراج بروفايل الشركات وسوابق الأعمال</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MARQUEE TICKER ── */}
      <section className="py-6 border-b border-border bg-card/20 overflow-hidden select-none">
        <div className="flex whitespace-nowrap overflow-hidden gap-12">
          <div className="flex shrink-0 animate-marquee items-center gap-12 text-lg font-bold text-muted-foreground">
            <span className="flex items-center gap-3 text-foreground">✦ بروفايل الشركات</span>
            <span className="flex items-center gap-3">✦ ملفات التأهيل للمنافسات</span>
            <span className="flex items-center gap-3 text-foreground">✦ مصفوفة سوابق الأعمال</span>
            <span className="flex items-center gap-3">✦ قطاع المقاولات والتوريد</span>
            <span className="flex items-center gap-3 text-foreground">✦ ملفات تفاعلية خفيفة الحجم</span>
            <span className="flex items-center gap-3">✦ تجهيز طباعي فاخر</span>
          </div>
          <div aria-hidden="true" className="flex shrink-0 animate-marquee items-center gap-12 text-lg font-bold text-muted-foreground">
            <span className="flex items-center gap-3 text-foreground">✦ بروفايل الشركات</span>
            <span className="flex items-center gap-3">✦ ملفات التأهيل للمنافسات</span>
            <span className="flex items-center gap-3 text-foreground">✦ مصفوفة سوابق الأعمال</span>
            <span className="flex items-center gap-3">✦ قطاع المقاولات والتوريد</span>
            <span className="flex items-center gap-3 text-foreground">✦ ملفات تفاعلية خفيفة الحجم</span>
            <span className="flex items-center gap-3">✦ تجهيز طباعي فاخر</span>
          </div>
        </div>
      </section>

      {/* ── 3. THE BUSINESS NEED (PAIN POINTS) ── */}
      <section className="py-24 border-b border-border bg-card/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="font-semibold text-primary text-sm tracking-wider uppercase">الاحتياج التشغيلي — The Business Need</p>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-5xl">
              متى تحتاج الشركة إلى <span className="text-primary">إعادة تنظيم وتصميم</span> ملفها المؤسسي؟
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              تواجه لجان التأهيل وإدارات المشتريات مئات الملفات شهرياً. الملف غير المنظم لا يُعطي فرصة عادلة لقراءة خبرة الشركة وقدراتها الميدانية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-border/80 bg-card/60 p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-6">
                01
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">تشتت بيانات المشاريع</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                وجود سوابق الأعمال والمشاريع في ملفات نصية وجداول إكسيل غير متطابقة، مما يصعّب تجميعها وفرزها عند الدخول في منافسة جديدة.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card/60 p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-6">
                02
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">صعوبة الفهرسة والوصول</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                غياب الترتيب المنطقي الذي تبحث عنه لجان التقييم (بيانات السجل، سياسات الجودة والسلامة، الآليات والمعدات، ومصفوفة الإنجازات).
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card/60 p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-6">
                03
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">الملفات الثقيلة المرفوضة</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                تصدير ملفات PDF بأحجام تتجاوز 40 ميجابايت تفشل في الإرسال عبر البريد الإلكتروني أو ترفضها بوابات التقديم والتأهيل الإلكترونية.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card/60 p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-6">
                04
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">صعوبة التعديل والتحديث</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                الحاجة لإعادة تصميم الملف بالكامل في كل مرة تنهي فيها الشركة مشروعاً جديداً أو تضيف تصنيفاً أو شهادة معتمدة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE DELIVER (DELIVERABLES) ── */}
      <section className="py-24 border-b border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="font-semibold text-primary text-sm tracking-wider uppercase">ماذا تستلم — Deliverables</p>
              <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-5xl">
                مخرجات بروفايل متكاملة <span className="text-primary">جاهزة للتعاقدات</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                نهاية المشروع ليست مجرد صفحات ملونة؛ بل تستلم وثيقة مؤسسية منظمة ومحررة تدعم متطلبات أعمالكم.
              </p>

              <div className="mt-8 p-6 rounded-2xl border border-border bg-card/80">
                <p className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">الصيغ الفنية المسلّمة للمشروع</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-background rounded-lg text-sm font-mono border border-border">Interactive PDF</span>
                  <span className="px-3 py-1.5 bg-background rounded-lg text-sm font-mono border border-border">Press-Ready CMYK</span>
                  <span className="px-3 py-1.5 bg-background rounded-lg text-sm font-mono border border-border">Adobe InDesign</span>
                  <span className="px-3 py-1.5 bg-background rounded-lg text-sm font-mono border border-border">Vector Assets</span>
                  <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-mono font-bold">+ ملفات خطوط مرخصة</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border bg-card/50 p-8 space-y-6">
                {service.deliverables.map((item, idx) => (
                  <div key={item} className="flex items-start gap-4 pb-5 border-b border-border/60 last:border-0 last:pb-0 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0 group-hover:rotate-12 transition-transform">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{item}</h3>
                      <p className="text-sm text-muted-foreground mt-1">صياغة مهنية وإخراج هندسي دقيق يخدم لجان الفحص والتدقيق.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. REGULATORY & OPERATIONAL CLARITY ── */}
      <section className="py-20 border-b border-border bg-card/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-semibold text-primary text-sm tracking-wider uppercase">الوضوح والحدود المهنية</p>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
              كيف يُستخدم البروفايل المؤسسي ضمن ملفات التأهيل والمنافسات؟
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              نؤمن بالشفافية الكاملة مع عملائنا في قطاع الأعمال: البروفايل المؤسسي هو وثيقة استعراض بصرية وتنظيمية تخدم لجان الفحص لإبراز مؤهلات شركتكم بدقة وسرعة.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background/80 p-8 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">أداة تنظيمية واستعراضية مطلوبة</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                يُطلب الملف التعريفي ضمن مرفقات التأهيل المسبق للموردين (Vendor Pre-qualification) بجانب السجلات والقوائم المالية والتصنيف وشهادات الآيزو، لتسهيل مراجعة قدرات وخبرات الشركة من قِبل لجان المشتريات.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/80 p-8 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">الحدود القانونية والإجرائية</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                لا توجد جهة حكومية (مثل منصة اعتماد) تصدر شهادة تسمى "بروفايل معتمد"، لكن وجود ملف احترافي يعرض سياسات السلامة (HSE) والجودة والهيكل الإداري يمنح ملف تأهيلكم الموثوقية والسرعة في اتخاذ القرار.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SECTOR SPECIFIC MODULE: CONTRACTING & SUPPLY ── */}
      <section className="py-20 border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-semibold text-primary text-sm tracking-wider uppercase">التخصص القطاعي في المملكة</p>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
              بروفايلات متخصصة لقطاعات المقاولات، التوريد، والخدمات الفنية
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              تختلف حاجة شركة الإنشاءات والمقاولات عن المؤسسات التجارية؛ لذلك نخصص لكل قطاع هيكله الفني الملائم لمتطلبات مشاريعه:
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">شركات المقاولات والإنشاءات</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                نركز على استعراض تصنيف المقاولين، أسطول المعدات والآليات، سجل ساعات العمل بدون حوادث، ومصفوفة المشاريع المنفذة (بنية تحتية، مباني، أعمال كهروميكانيكية).
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">مؤسسات التوريد والخدمات اللوجستية</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                إبراز عقود التوزيع، الطاقة الاستيعابية للمستودعات، أسطول النقل والتوزيع، وأنظمة الجودة ومطابقة المواصفات القياسية.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">الشركات التقنية والاستشارية</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                عرض منهجيات العمل، خبرات الكوادر الاستشارية والشهادات المهنية، ونماذج التحول الرقمي وحلول الأعمال المنفذة للعملاء.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. REAL PROOF SECTION: SAKEN CASE STUDY ── */}
      <section id="saken-proof" className="py-24 border-b border-border bg-card/50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-4">
                نموذج إثبات واقعي • Verified Case Study
              </span>
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl leading-tight">
                تنظيم وإخراج الوثائق المؤسسية لمجمع «ساكن» بالجبيل الصناعية
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <div className="p-4 rounded-xl border border-border bg-background/60">
                  <strong className="text-foreground block mb-1">المشكلة قبل البدء:</strong>
                  الحاجة للانتقال من ملفات تعريفية فردية إلى مظهر مؤسسي متماسك يستهدف مدراء الموارد البشرية والمشتريات في كبرى مصانع وشركات الجبيل الصناعية لتوقيع عقود إسكان مؤسسي طويلة الأجل.
                </div>

                <div className="p-4 rounded-xl border border-border bg-background/60">
                  <strong className="text-foreground block mb-1">التدخل البصري والهيكلي من تاج ستوديو:</strong>
                  إعادة صياغة هيكل الوثيقة، بناء مصفوفة سعة الغرف والفلل الفندقية، وتوحيد المطبوعات الرسمية ومستندات التعاقد والفواتير بنظام بصري رسمي يعكس الاستقرار والصلابة.
                </div>

                <div className="p-4 rounded-xl border border-border bg-background/60">
                  <strong className="text-foreground block mb-1">المخرج المعتمد:</strong>
                  وثيقة مؤسسية رقمية ومطبوعة تستخدمها إدارة المجمع في جلسات التفاوض وتوقيع اتفاقيات الإسكان مع كبرى الشركات الصناعية.
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/work/saken-corporate-housing-brand-identity"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                >
                  <span>استعرض دراسة حالة ساكن كاملة</span>
                  <span>←</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background shadow-md">
                <Image
                  src="/images/saken/saken-official-envelope-mockup.webp"
                  alt="تصميم ظرف المراسلات والخطابات الرسمية الفاخر - شركة ساكن"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background shadow-md">
                <Image
                  src="/images/saken/saken-letterhead-stationery-mockup.webp"
                  alt="تصميم ورق المراسلات والخطابات الرسمية - هوية ساكن للإسكان المؤسسي"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background shadow-md">
                <Image
                  src="/images/saken/saken-official-invoice-mockup.webp"
                  alt="تصميم فاتورة ومستندات التعاقد الرسمية - شركة ساكن"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-background shadow-md">
                <Image
                  src="/images/saken/saken-room-phone-book-directory-mockup.webp"
                  alt="دليل الخدمات والمرافق الداخلية - ساكن"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. THE 4-STEP PROCESS ── */}
      <section className="py-24 border-b border-border bg-card/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="font-semibold text-primary text-sm tracking-wider uppercase">طريقة العمل — Process</p>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-5xl">
              أربع خطوات تفصلك عن <span className="text-primary">بروفايل مؤسسي</span> جاهز للتسليم
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              عملية واضحة ومدروسة تضمن تنظيم بياناتكم وسوابق مشاريعكم بدقة دون استنزاف وقت فريقكم التنفيذي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-3xl border border-border/80 bg-card/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-primary">0{index + 1}</span>
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                    مرحلة {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. COST DYNAMICS SECTION ── */}
      <section className="py-20 border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-semibold text-primary text-sm tracking-wider uppercase">محددات الميزانية</p>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
              كيف تتحدد تكلفة تصميم وتجهيز ملف الشركة؟
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              نبتعد عن الباقات الجاهزة المعلبة لأن متطلبات كل منشأة تختلف حسب طبيعة نشاطها. هذه العوامل الأربعة هي التي تحكم ميزانية العمل:
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-2xl border border-border bg-card/40">
              <h3 className="font-bold text-foreground mb-2">حجم الملف وعدد الصفحات</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                إعداد ملف موجز من 12 إلى 16 صفحة يختلف في وقته ومجهوده عن بروفايل شامل يوثق عشرات المشاريع في أكثر من 40 صفحة.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card/40">
              <h3 className="font-bold text-foreground mb-2">جاهزية المحتوى الأولي</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                هل البيانات وسوابق الأعمال مكتوبة ومراجعة من فريقكم، أم يتولى فريقنا تحريرها وصياغتها مهنياً من البداية؟
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card/40">
              <h3 className="font-bold text-foreground mb-2">اللغات والمصطلحات</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                تقديم الملف باللغة العربية فقط، أو نسخة ثنائية اللغة (عربي/إنجليزي) مع ضبط محاذاة اللغتين وتنسيق الجداول الفنية.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card/40">
              <h3 className="font-bold text-foreground mb-2">نوع ومواصفات المخرجات</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                ملف PDF تفاعلي للمراسلات الرقمية، أو إضافة إعداد ملفات الفرز الطباعي الفاخر وتنسيق عينات الطباعة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ SECTION ── */}
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <div className="text-center">
          <p className="font-semibold text-primary text-sm tracking-wider uppercase">الأسئلة الشائعة — FAQ</p>
          <h2 className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
            أسئلة شائعة حول تصميم البروفايل والملفات المؤسسية
          </h2>
        </div>

        <div className="mt-12 space-y-6">
          {service.faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-border bg-card/40 p-6 transition-all [&_summary::-webkit-details-marker]:none"
            >
              <summary className="flex cursor-pointer items-center justify-between font-bold text-foreground text-lg">
                <span>{item.question}</span>
                <span className="ml-3 font-bold text-primary group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground text-base border-t border-border/60 pt-4">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 11. FINAL CONTACT CTA SECTION ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24 text-center lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 lg:p-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl font-extrabold text-foreground sm:text-5xl">
            جاهز لتنظيم وتطوير <span className="text-primary">ملف شركتك وسوابق أعمالك؟</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            أرسل نبذة عن نشاط شركتك وسابقة أعمالك الحالية، وسنزودك بتصور مقترح للهيكل الأمثل للملف التعريفي الخاص بكم مع تقدير دقيق لنطاق العمل والوقت المطلوب.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/201009215131?text=${encodeURIComponent(
                "مرحبًا، أريد مناقشة نطاق عمل وتصميم بروفايل لشركتنا في السعودية"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button px-8 py-4 inline-flex items-center gap-2 text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              <span>ناقش ملف شركتك على واتساب</span>
              <span>↗</span>
            </a>
            <a
              href="mailto:wearetagstudio@gmail.com"
              className="rounded-full border border-border px-8 py-4 text-base font-bold text-foreground transition hover:border-primary hover:text-primary"
            >
              راسلنا بالإيميل
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}