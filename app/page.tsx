import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة - Tags Studio | FAQ",
  description: "إجابات لأهم الأسئلة حول خدمات التصميم الجرافيكي والهوية البصرية في Tags Studio. تعرف على أسعارنا، مدة التنفيذ، وكيفية بدء مشروعك معنا.",
  openGraph: {
    title: "الأسئلة الشائعة - Tags Studio",
    description: "إجابات لأهم الأسئلة حول خدمات التصميم الجرافيكي والهوية البصرية",
    type: "website",
  },
};

export default function FAQPage() {
  const faqs = [
    {
        "q": "لماذا تختار أن تعمل معنا؟",
        "a": "نقدم لك جودة عالية بتكلفة مناسبة جداً! السبب بسيط: نحن لا ندفع رسوم تأشيرات أو تكاليف إضافية كالتي تدفعها الوكالات السعودية التقليدية، لذلك نستطيع تقديم خدمة ممتازة بأسعار تنافسية.\n\n**مميزاتنا:**\n✓ **جودة احترافية عالية** - فريق متخصص بخبرة واسعة\n✓ **أسعار تنافسية** - بدون رسوم إضافية أو تكاليف خفية  \n✓ **سرعة في التنفيذ** - نلتزم بمواعيد التسليم المحددة\n✓ **دعم مستمر** - نبقى معك حتى بعد التسليم\n✓ **تعديلات مجانية** - ضمن الاتفاق لضمان رضاك التام\n✓ **فهم السوق السعودي** - تصاميم تتناسب مع الذوق والثقافة المحلية"
    },
    {
        "q": "ما هي الخدمات التي تقدمونها؟",
        "a": "نقدم مجموعة شاملة من خدمات التصميم الجرافيكي:\n\n• **تصميم الهوية البصرية الكاملة** (الشعار، الألوان، الخطوط، الأنماط البصرية، دليل الاستخدام)\n• **تصميم الشعارات** الاحترافية\n• **تصميم المواد التسويقية** (منشورات، بروشورات، فلايرات)\n• **تصميم محتوى السوشيال ميديا** (Instagram, Facebook, Twitter, LinkedIn)\n• **تصميم العروض التقديمية** (Presentations)\n• **تصميم المطبوعات** (كروت العمل، الأظرف، الأوراق الرسمية)\n• **تصميم البنرات الإعلانية** الرقمية والمطبوعة"
    },
    {
        "q": "ما هي المدة الزمنية اللازمة لإنهاء مشروع التصميم؟",
        "a": "تختلف المدة حسب حجم وتعقيد المشروع:\n\n• **الشعار فقط**: 3-5 أيام عمل\n• **الهوية البصرية الكاملة**: 7-14 يوم عمل  \n• **تصميمات السوشيال ميديا**: 2-3 أيام للحزمة\n• **المطبوعات والبروشورات**: 3-5 أيام عمل\n\nنحرص دائماً على التسليم في الوقت المحدد مع الحفاظ على أعلى معايير الجودة. في حالة المشاريع العاجلة، يمكننا التفاوض على خدمة تسليم سريع."
    },
    {
        "q": "هل يمكن تعديل التصميم بعد التسليم؟",
        "a": "نعم بالتأكيد! نحن نقدم عدداً محدداً من التعديلات المجانية وفقاً للاتفاق:\n\n• **جولة مراجعة أثناء العمل**: نعرض عليك التصاميم خطوة بخطوة\n• **تعديلات مجانية**: حسب الباقة المتفق عليها (عادة 2-3 جولات تعديل)\n• **تعديلات إضافية**: متاحة برسوم معقولة بعد استنفاذ التعديلات المجانية\n\nهدفنا هو رضاك التام عن التصميم النهائي!"
    },
    {
        "q": "كيف يمكنني بدء العمل معكم؟",
        "a": "البداية سهلة وبسيطة:\n\n**1. تواصل معنا** عبر الواتساب، البريد الإلكتروني، أو نموذج التواصل\n**2. مكالمة استكشافية** نتعرف فيها على احتياجاتك وأهدافك\n**3. عرض سعر مخصص** نقدم لك عرضاً واضحاً بالتكلفة والمدة الزمنية\n**4. الموافقة والبدء** بعد الاتفاق نبدأ العمل فوراً\n**5. المراجعة والتسليم** نعرض عليك التصاميم ونجري التعديلات حتى رضاك التام\n\nنحن معك في كل خطوة! 🚀"
    },
    {
        "q": "هل تعملون مع عملاء خارج السعودية؟",
        "a": "نعم! نحن نقدم خدماتنا لعملاء في السعودية والخليج والوطن العربي وحتى دولياً. \n\nنعتمد على وسائل الاتصال الرقمية (Zoom، Google Meet، WhatsApp) لضمان التواصل السلس والمتابعة المستمرة أينما كنت. \n\nخبرتنا مع السوق السعودي تجعلنا الخيار المثالي للعلامات التجارية التي تستهدف هذا السوق."
    },
    {
        "q": "ماذا تحتوي الهوية البصرية الكاملة؟",
        "a": "الهوية البصرية الكاملة تشمل:\n\n📌 **العناصر الأساسية:**\n• الشعار (Logo) بجميع الأشكال والصيغ\n• الألوان الرسمية (Color Palette)  \n• الخطوط المعتمدة (Typography)\n• الأنماط البصرية (Patterns & Textures)\n\n📌 **التطبيقات:**\n• كروت العمل (Business Cards)\n• الأوراق الرسمية (Letterheads)\n• الأظرف (Envelopes)\n• توقيع البريد الإلكتروني\n• قوالب السوشيال ميديا\n\n📌 **دليل الهوية البصرية (Brand Guidelines):**\nوثيقة شاملة توضح كيفية استخدام العناصر بشكل صحيح"
    },
    {
        "q": "هل سيتم تسليم الملفات الأصلية؟",
        "a": "نعم! نسلمك جميع الملفات بصيغ احترافية:\n\n• **AI / EPS** (Adobe Illustrator) - ملفات قابلة للتعديل\n• **PDF** عالي الجودة للطباعة\n• **PNG** بخلفية شفافة  \n• **JPG** للاستخدام الرقمي\n• **SVG** للمواقع والتطبيقات\n\nكل الملفات ملكك بالكامل مع حقوق الاستخدام الكاملة."
    },
    {
        "q": "كم عدد التعديلات المتاح لي في المشروع؟",
        "a": "عدد التعديلات يعتمد على الباقة المختارة:\n\n• **الباقة الأساسية**: 2 جولات تعديل\n• **الباقة المتقدمة**: 3 جولات تعديل\n• **الباقة الشاملة**: تعديلات غير محدودة حتى الرضا التام\n\n**ملاحظة مهمة:** \nالتعديلات تعني تحسينات على التصميم الحالي (تغيير ألوان، تعديل خطوط، ترتيب عناصر).  \nأما تغيير الفكرة بالكامل فيعتبر تصميم جديد ويحتاج اتفاق إضافي."
    },
    {
        "q": "ما الفرق بين الشعار والهوية البصرية؟",
        "a": "**الشعار (Logo):**\nهو الرمز أو العلامة التي تمثل علامتك التجارية - مثل علامة Apple أو Nike.\n\n**الهوية البصرية (Brand Identity):**\nهي المنظومة الكاملة التي تشمل:\n• الشعار + الألوان + الخطوط + الأنماط\n• تطبيقات الشعار على جميع المواد (كروت، أوراق، منشورات)\n• دليل استخدام موحد\n\n**التشبيه:**\nالشعار هو الوجه، والهوية البصرية هي الشخصية الكاملة! \n\nلو تبي تبني علامة تجارية قوية ومتماسكة، الهوية البصرية الكاملة هي الخيار الصحيح."
    }
];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header Section */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              الأسئلة الشائعة
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              إجابات واضحة لكل ما يهمك حول خدماتنا في التصميم الجرافيكي والهوية البصرية
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span>{faq.q}</span>
                </h2>
                <div 
                  className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line mr-11"
                  dangerouslySetInnerHTML={{ __html: faq.a.replace(/\n/g, '<br/>') }}
                />
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              تواصل معنا مباشرة وسنكون سعداء بالإجابة على جميع استفساراتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                تواصل معنا الآن
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              قد يهمك أيضاً:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                من نحن
              </Link>
              <Link
                href="/work"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                أعمالنا
              </Link>
              <Link
                href="/blog"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                المدونة
              </Link>

              <Link
                href="/faq"
                className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                الأسئلة الشائعة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a.replace(/\*/g, '').replace(/[✓•📌]/g, '').trim()
              }
            }))
          })
        }}
      />
    </div>
  );
}
