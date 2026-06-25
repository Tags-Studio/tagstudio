"use client"

import { motion } from "framer-motion"
import Image from "next/image" // استيراد مكون Image

export default function AboutUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          من نحن
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-3xl font-bold mb-6 text-white">البداية كانت شغفاً.. والآن نصنع علامات تجارية تقود السوق</h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              بدأت رحلتنا الإبداعية في عام **2012**، عندما انطلق مؤسس الاستوديو بشغف خالص تجاه قوة التصميم وقدرته على تغيير مسار المشاريع. كنا نؤمن دائماً بأن الهوية البصرية ليست مجرد ألوان عشوائية أو رمز جمالي يوضع على واجهة المحل، بل هي **لغة صامتة تصنع انطباعاً أولاً لا يزول وتولد ثقة فورية في قلوب عملائك**.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              في عام **2016**، قمنا بإنشاء **تاج ستوديو (TAG Studio)** كمكتب تصميم إبداعي متخصص في بناء الهويات البصرية المبتكرة وإدارة المحتوى البصري للسوشيال ميديا للمشاريع الطموحة والمراكز الطبية والمطاعم في السوق السعودي والمصري والخليجي.
            </p>

            <h4 className="text-2xl font-bold mb-4 text-white">فلسفتنا في التصميم:</h4>
            <p className="text-gray-300 mb-6 leading-relaxed">
              التصميم الناجح لا يثير الإعجاب الفني فقط؛ بل **يخدم أهداف البيع والتسويق**. نحن لا نصمم لإبهار المصممين الآخرين، بل نصمم لنقنع عميلك المستهدف بأنك الخيار الأكثر احترافية وأماناً في السوق.
            </p>

            <h4 className="text-2xl font-semibold mb-4 text-white">خبراتنا التي نضعها بين يديك:</h4>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 pr-4 leading-relaxed">
              <li>بناء الهويات البصرية المتكاملة للمراكز الطبية والشركات التجارية.</li>
              <li>تصميم حزم التعبئة والتغليف (Packaging) المبتكرة للمطاعم والمتاجر.</li>
              <li>إدارة المحتوى وتصميم منشورات السوشيال ميديا لجذب العملاء وزيادة المبيعات.</li>
              <li>إنتاج فيديوهات الموشن جرافيك لتبسيط الأفكار والخدمات المعقدة.</li>
            </ul>

            <p className="text-gray-300 mb-6 leading-relaxed">
              نعمل بكل حب وإخلاص من مقرنا الرئيسي لإدارة المشاريع ومكتب التصميم، لنكون شركاء نمو حقيقيين لعلامتك التجارية ونسير معك خطوة بخطوة من الفكرة وحتى النشر والطباعة.
            </p>

            <p className="text-primary font-bold text-lg">
              في تاج ستوديو، نحن لا نبيع تصميمات.. نحن نبيع الثقة والنمو لبراند أحلامك.
            </p>
          </motion.div>
          <motion.div
            className="relative h-96"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform rotate-3"></div>
            <div className="absolute inset-0 bg-gray-800 rounded-lg transform -rotate-3 flex items-center justify-center overflow-hidden">
              {/* استبدال النص بالصورة */}
              <Image
                src="/images/about-us-placeholder.avif"
                alt="صورة توضيحية لتاج ستوديو"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
