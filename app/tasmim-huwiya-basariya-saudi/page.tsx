import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "تصميم هوية بصرية في الرياض | تصميم شعارات احترافية بالسعودية | تاج ستوديو",
  description: "وكالة تصميم هوية بصرية في الرياض وجدة. نقدم خدمات تصميم شعارات احترافية، تصميم سوشيال ميديا، وموشن جرافيك متوافق مع رؤية السعودية 2030 وبأسعار منافسة.",
  alternates: {
    canonical: "https://www.wearetagstudio.com/tasmim-huwiya-basariya-saudi",
  },
}

export default function SaudiDesignPage() {
  return (
    <div className="relative isolate overflow-hidden bg-background pt-16">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl max-w-4xl mx-auto">
          تصميم هوية بصرية في <span className="text-gradient">الرياض وجدة</span>
        </h1>
        <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
          نحن في تاج ستوديو نصنع منظومة بصرية متكاملة وشعارات احترافية ترتقي بمشروعك الطبي أو التجاري وتلبي طموحات وتوجهات رؤية المملكة 2030. نوفر لك تصميم هوية بصرية بالرياض يبني الثقة ويحقق انطباعاً أولاً لا يُنسى.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://wa.me/201009215131"
            target="_blank"
            rel="noopener noreferrer"
            className="apple-button text-lg px-8 py-3"
          >
            احصل على استشارة مجانية على واتساب
          </a>
        </div>
      </div>

      {/* Services Section */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 border-t border-white/10">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">لماذا تختار تاج ستوديو؟</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            خدمات تصميم جرافيك وهويات بصرية متكاملة بالمملكة
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col bg-card/50 p-6 rounded-2xl border border-white/5">
              <dt className="flex items-center gap-x-3 text-xl font-bold text-foreground">
                <span className="text-gradient">01</span> تصميم هويات بصرية متكاملة
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p>
                  نبتكر كافة عناصر الهوية البصرية من شعار مخصص، اختيار لوحة الألوان السيكولوجية المناسبة لقطاعك، تصميم المطبوعات، اليونيفورم، وحتى واجهة المشروع الطبي أو التجاري.
                </p>
              </dd>
            </div>
            <div className="flex flex-col bg-card/50 p-6 rounded-2xl border border-white/5">
              <dt className="flex items-center gap-x-3 text-xl font-bold text-foreground">
                <span className="text-gradient">02</span> تصميم شعارات احترافية مخصصة
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p>
                  نصمم لك شعاراً مبتكراً فريداً يعكس قيم علامتك التجارية ويكون عملياً في كافة أحجامه وسياقات استخدامه (الطباعة والمنشورات الرقمية).
                </p>
              </dd>
            </div>
            <div className="flex flex-col bg-card/50 p-6 rounded-2xl border border-white/5">
              <dt className="flex items-center gap-x-3 text-xl font-bold text-foreground">
                <span className="text-gradient">03</span> إدارة وتصميم السوشيال ميديا
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p>
                  خدمة متكاملة تشمل كتابة المحتوى الإبداعي والتصميم البصري الجذاب للمنشورات والفيديوهات والريلز لتنشيط صفحاتك وزيادة التفاعل وجذب عملاء جدد.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Pricing Packages */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 border-t border-white/10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
          باقات الأسعار لتصميم الهوية البصرية بالسعودية
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          باقات مرنة تناسب الشركات الناشئة والمراكز الطبية والمشاريع المتوسطة بجودة فائقة وضمان الالتزام بالمواعيد.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
          {/* Package 1 */}
          <div className="bg-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground">الباقة الأساسية</h3>
              <p className="text-muted-foreground mt-2">مثالية للشركات الناشئة والمشاريع الصغيرة</p>
              <div className="my-6 text-3xl font-bold text-gradient">2500 - 3500 ريال</div>
              <ul className="space-y-3 text-muted-foreground text-sm border-t border-white/5 pt-6">
                <li>• تصميم الشعار (مفهومين مخصصين)</li>
                <li>• اختيار الألوان والخطوط الرسمية</li>
                <li>• تصميم كرت العمل والقرطاسية الأساسية</li>
                <li>• تسليم الملفات المصدرية بجودة عالية</li>
              </ul>
            </div>
            <a
              href="https://wa.me/201009215131?text=استفسار%20عن%20الباقة%20الأساسية%20لتصميم%20الهوية"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button mt-8 text-center block"
            >
              اطلب الباقة الآن
            </a>
          </div>

          {/* Package 2 */}
          <div className="bg-card p-8 rounded-2xl border border-primary/30 relative flex flex-col justify-between ring-1 ring-primary/40">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
              الأكثر طلباً
            </span>
            <div>
              <h3 className="text-2xl font-bold text-foreground">الباقة الاحترافية</h3>
              <p className="text-muted-foreground mt-2">الباقة المتكاملة للمراكز الطبية والشركات المتوسطة</p>
              <div className="my-6 text-3xl font-bold text-gradient">4000 - 6000 ريال</div>
              <ul className="space-y-3 text-muted-foreground text-sm border-t border-white/5 pt-6">
                <li>• تصميم الشعار (3 مفاهيم حصرية وتعديلات مرنة)</li>
                <li>• تصميم الهوية البصرية الكاملة (اليونيفورم، الهدايا الدعائية)</li>
                <li>• تصميم المطبوعات التجارية والفواتير</li>
                <li>• تصميم بروفايل الشركة (Company Profile) حتى 12 صفحة</li>
                <li>• دليل إرشادي متكامل لاستخدام الهوية (Brand Guidelines)</li>
              </ul>
            </div>
            <a
              href="https://wa.me/201009215131?text=استفسار%20عن%20الباقة%20الاحترافية%20لتصميم%20الهوية"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button mt-8 text-center block"
            >
              اطلب الباقة الآن
            </a>
          </div>

          {/* Package 3 */}
          <div className="bg-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground">باقة إدارة السوشيال ميديا</h3>
              <p className="text-muted-foreground mt-2">لتنشيط حساباتك وبناء تفاعل حقيقي ومستدام</p>
              <div className="my-6 text-3xl font-bold text-gradient">3000 - 5000 ريال / شهرياً</div>
              <ul className="space-y-3 text-muted-foreground text-sm border-t border-white/5 pt-6">
                <li>• إعداد خطة وتقويم المحتوى الشهري</li>
                <li>• تصميم 12 إلى 16 منشور سوشيال ميديا مبتكر</li>
                <li>• إنتاج ومونتاج 4 مقاطع ريلز / تيك توك قصيرة</li>
                <li>• كتابة المحتوى والهاشتاجات المناسبة وإدارة النشر</li>
                <li>• تقرير أداء شهري موضح به مؤشرات التفاعل والوصول</li>
              </ul>
            </div>
            <a
              href="https://wa.me/201009215131?text=استفسار%20عن%20باقة%20إدارة%20السوشيال%20ميديا"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button mt-8 text-center block"
            >
              اطلب الباقة الآن
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 border-t border-white/10 text-right">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            الأسئلة الشائعة حول خدمات التصميم في السعودية
          </h2>
          <p className="text-muted-foreground mt-4">
            إجابات كاملة وتفصيلية عن كل ما يدور في ذهنك حول تصميم الهويات البصرية والشعارات.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-card/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-2">1. لماذا أحتاج إلى تصميم هوية بصرية مخصصة في الرياض؟</h3>
            <p className="text-muted-foreground">
              السوق السعودي وخاصة في الرياض يزدحم بمنافسة شديدة في كافة القطاعات. تصميم هوية بصرية مخصصة ومبنية على أسس تسويقية صحيحة يجعلك مميزاً عن منافسيك، ويبني مصداقية سريعة لدى عملائك، ويترك انطباعاً أولاً قوياً يترجم لمبيعات مستدامة.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-2">2. كم يستغرق وقت تصميم الهوية البصرية الكاملة؟</h3>
            <p className="text-muted-foreground">
              يستغرق العمل على الهوية البصرية المتكاملة في العادة ما بين 3 إلى 5 أسابيع. تشمل هذه المدة مرحلة البحث ودراسة المنافسين، ابتكار مفاهيم الشعار، جولات التعديل والتحسين، وتطوير كافة تطبيقات الهوية البصرية كالمطبوعات وملفات استخدام العلامة التجارية.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-2">3. هل تقدمون خدمات تصميم متوافقة مع القطاع الطبي والمراكز العلاجية؟</h3>
            <p className="text-muted-foreground">
              نعم بكل تأكيد. نحن في تاج ستوديو نمتلك خبرة وريادة واسعة في تصميم وإدارة الهوية البصرية للمراكز الطبية والمستشفيات والعيادات التخصصية. نراعي سيكولوجية الألوان الطبية التي توحي بالثقة والأمان ونلتزم بالمعايير المهنية والصحية المطلوبة في الإعلانات الطبية.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-2">4. هل أحصل على الملفات المصدرية والقابلة للتعديل للهوية؟</h3>
            <p className="text-muted-foreground">
              نعم، بعد اعتماد الهوية وتصفية الحسابات بشكل كامل، نسلمك كافة الملفات المصدرية المفتوحة والقابلة للتعديل بصيغ متعددة مثل (AI, EPS, PSD, PDF) بالإضافة لملفات الاستخدام الفوري الشفافة (PNG, SVG).
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-2">5. ما هو الفرق بين تصميم الشعار وتصميم الهوية البصرية؟</h3>
            <p className="text-muted-foreground">
              الشعار هو الرمز الأساسي للعلامة التجارية، بينما الهوية البصرية هي المنظومة الشاملة المحيطة بالشعار والتي تشمل لوحة الألوان المحددة، الخطوط الرسمية، نمط الصور والأيقونات، تصميم المطبوعات كالفواتير والأظرف، اليونيفورم واللوحات الإعلانية لتعمل معاً بشكل متسق لبناء صورة موحدة.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-2">6. هل متاح تعديل باقات الأسعار المذكورة؟</h3>
            <p className="text-muted-foreground">
              نعم، الباقات المذكورة استرشادية لتوضيح النطاق التقريبي للأسعار في السوق السعودي، ولكن يمكننا دائماً تخصيص باقة محددة تحتوي على تطبيقات تصميمية معينة تناسب ميزانيتك واحتياجات مشروعك الفعلي بعد عقد جلسة استشارية معك.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-2">7. كيف يتم التنسيق معكم إذا كنت أقيم خارج الرياض؟</h3>
            <p className="text-muted-foreground">
              نحن نقدم خدماتنا بشكل مرن وسلس عبر الإنترنت لكافة أصحاب المشاريع بالمملكة العربية السعودية ودول الخليج. نعقد جلسات العصف الذهني والمتابعة الدورية عبر مكالمات الفيديو والتواصل الفوري على الواتساب لضمان سير المشروع بأعلى دقة واحترافية.
            </p>
          </div>

          <div className="bg-card/30 p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-2">8. ما هو دليل استخدام الهوية البصرية (Brand Guidelines)؟</h3>
            <p className="text-muted-foreground">
              هو ملف توجيهي نسلمه مع باقة التصميم يوضح القواعد والضوابط الصارمة لاستخدام الشعار والألوان والخطوط بطريقة صحيحة ويحذر من الاستخدام الخاطئ، وهو الأداة الأساسية للمطابع ومصممي المستقبل للحفاظ على ثبات هوية علامتك التجارية وجودتها.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 py-16 border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            ابدأ رحلة بناء علامتك التجارية اليوم
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            تواصل مع فريق تاج ستوديو للحصول على استشارة مجانية وعرض سعر مخصص يناسب أهدافك وتطلعاتك.
          </p>
          <a
            href="https://wa.me/201009215131?text=أود%20طلب%20استشارة%20لتصميم%20هوية%20بصرية%20في%20السعودية"
            target="_blank"
            rel="noopener noreferrer"
            className="apple-button text-lg px-8 py-3"
          >
            تواصل معنا عبر واتساب الآن
          </a>
        </div>
      </div>
    </div>
  )
}
