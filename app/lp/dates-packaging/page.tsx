"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
}

export default function DatesPackagingLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: "إزاي أثق إن التصميم هيفرق في مبيعاتي؟",
      a: "+45 عميل شافوا الفرق فعلياً. عميلنا تمور المدينة رفع سعر البوكس 35% وزادت مبيعاته 100%. العميل بيشتري بالعين الأول."
    },
    {
      q: "لو التصميم ما عجبنيش؟",
      a: "بنقدملك 2-3 اتجاهات مختلفة وتختار اللي يعجبك. تعديلات مرنة لحد ما توصل للنتيجة اللي بتعبر عن علامتك التجارية."
    },
    {
      q: "كم بياخد وقت التنفيذ؟",
      a: "من 3 لـ 5 أيام عمل بنسلمك التصاميم المبدئية، وبعد الموافقة بنجهز كل ملفات الطباعة فوراً."
    },
    {
      q: "هل بتسلموني ملفات جاهزة للطباعة؟",
      a: "أكيد! بنسلمك ملفات PDF و AI وكل الصيغ المطلوبة جاهزة للمطبعة بالألوان (CMYK) وبالمقاسات الدقيقة 100%."
    }
  ]

  return (
    <div className="bg-[#FAFAFA] text-[#1D1D1F] overflow-x-hidden pb-10 font-tajawal" dir="rtl">
      {/* Hide global header/footer so it stays a focused landing page */}
      <style dangerouslySetInnerHTML={{ __html: `
        header, footer, #floating-contact { display: none !important; }
        .gt {
          background: linear-gradient(90deg, #FFD600, #00C853, #1565C0, #FF1744);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gbar {
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #FFD600, #00C853, #1565C0, #FF1744);
        }
        .mqt {
          animation: mq 20s linear infinite;
        }
        @keyframes mq {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .flt {
          animation: fl 3s ease-in-out infinite;
        }
        @keyframes fl {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}} />

      {/* URGENCY BAR */}
      <div className="bg-[#1D1D1F] text-white text-center py-2.5 px-4 text-xs font-medium relative z-[60]">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF1744] ml-2 align-middle animate-pulse"></span>
        باقي ٣ مقاعد فقط هذا الشهر —
        <a href="#cta" className="text-white underline underline-offset-[3px] font-bold mr-1">احجز مكانك الآن</a>
      </div>

      {/* NAV */}
      <nav className="fixed top-[38px] left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-[1024px] mx-auto px-5">
          <div className="flex items-center justify-between h-14">
            <a href="https://www.wearetagstudio.com/" className="flex items-center gap-2 no-underline">
              <Image
                className="h-10 w-auto object-contain"
                src="/images/logo.png"
                alt="شعار تاج ستوديو"
                width={120}
                height={40}
                priority
              />
            </a>
            <a href="#cta" className="bg-[#1565C0] hover:bg-[#0D47A1] text-white px-5 py-2 rounded-full text-xs font-semibold transition-all shadow-[0_4px_18px_rgba(21,101,192,0.25)] hover:scale-105 active:scale-95">
              احجز استشارة مجانية
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-[120px] pb-10 px-5 overflow-hidden">
        <div className="absolute top-[80px] right-0 w-[280px] h-[280px] bg-[#FFD600]/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#1565C0]/5 rounded-full blur-[100px]"></div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-[1024px] mx-auto relative z-10">
          {/* Social proof */}
          <motion.div variants={fadeInUp} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white rounded-full py-2 px-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-black/5 text-xs">
              <div className="flex gap-0 ml-1">
                <div className="w-[22px] h-[22px] rounded-full bg-[#FFD600] flex items-center justify-center text-[8px] font-bold text-[#1D1D1F] border-2 border-white -ml-1.5">م</div>
                <div className="w-[22px] h-[22px] rounded-full bg-[#00C853] flex items-center justify-center text-[8px] font-bold text-white border-2 border-white -ml-1.5">ع</div>
                <div className="w-[22px] h-[22px] rounded-full bg-[#1565C0] flex items-center justify-center text-[8px] font-bold text-white border-2 border-white -ml-1.5">ف</div>
              </div>
              <span className="text-[#6E6E73]"><strong className="text-[#1D1D1F]">+45 صاحب مصنع</strong> وثقوا بنا</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeInUp} className="text-center max-w-[720px] mx-auto">
            <h1 className="text-[clamp(2rem,6vw,3.2rem)] font-black leading-[1.12] tracking-tight text-[#1D1D1F]">
              بوكس التمور الواحد اللي<br />
              <span className="gt">رفع مبيعات عملائنا 40%</span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center max-w-[480px] mx-auto mt-4">
            <p className="text-[#6E6E73] text-[15px] leading-relaxed">
              مش مجرد تصميم — بنحول البوكس بتاعك لأداة بيع تجذب العين وترفع السعر. شوف النتائج.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-2.5 mt-7">
            <a href="#work" className="bg-[#1565C0] hover:bg-[#0D47A1] text-white flex items-center justify-center gap-2 py-3.5 px-7 rounded-full text-sm font-bold w-full max-w-[320px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/20">
              شوف التصاميم اللي بتبيع
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="rotate-180"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </a>
            <a href="https://wa.me/201009215131" target="_blank" rel="noreferrer" className="bg-white border-2 border-[#1565C0]/20 hover:border-[#1565C0] hover:bg-[#1565C0]/5 text-[#1565C0] flex items-center justify-center gap-2 py-3.5 px-7 rounded-full text-sm font-semibold w-full max-w-[320px] transition-all">
              <svg width="17" height="17" fill="#16A34A" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              كلمنا واتساب
            </a>
          </motion.div>

          {/* Trust */}
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mt-4 text-[11px] text-[#86868B]">
            <span className="flex items-center gap-1"><svg width="13" height="13" fill="none" stroke="#00C853" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>مجانية</span>
            <span>•</span>
            <span className="flex items-center gap-1"><svg width="13" height="13" fill="none" stroke="#00C853" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>بدون التزام</span>
            <span>•</span>
            <span className="flex items-center gap-1"><svg width="13" height="13" fill="none" stroke="#00C853" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>رد سريع</span>
          </motion.div>

          {/* Hero Image */}
          <motion.div variants={scaleUp} className="mt-12 relative">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)] bg-white relative h-[clamp(200px,40vw,440px)] w-full">
              <Image src="/images/print-design-2.avif" alt="بوكسات تمور فاخرة" fill className="object-cover block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
            </div>
            <div className="absolute bottom-3 right-3 left-3 flex gap-2">
              <div className="flt bg-white/95 backdrop-blur-md rounded-xl py-2.5 px-4 shadow-lg">
                <div className="text-lg font-black text-[#1D1D1F] font-sans">+200</div>
                <div className="text-[9px] text-[#6E6E73] font-medium">بوكس تمور</div>
              </div>
              <div className="flt bg-white/95 backdrop-blur-md rounded-xl py-2.5 px-4 shadow-lg" style={{ animationDelay: '0.4s' }}>
                <div className="text-lg font-black text-[#00C853] font-sans">%40</div>
                <div className="text-[9px] text-[#6E6E73] font-medium">زيادة مبيعات</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <div className="gbar max-w-[1024px] mx-auto"></div>

      {/* MARQUEE */}
      <section className="py-8 overflow-hidden">
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center text-[10px] font-semibold text-[#6E6E73]/35 uppercase tracking-widest mb-5">
          عملائنا في صناعة التمور
        </motion.p>
        <div className="mqt flex gap-12 items-center whitespace-nowrap">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="text-[#6E6E73]/20 text-[15px] font-bold">
              {['تمور المدينة', 'وادي التمور', 'نخيل الذهب', 'تمور الخليج', 'دار التمور', 'بستان النخيل'][i % 6]}
            </span>
          ))}
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-10 px-5">
        <div className="max-w-[1024px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-9">
            <p className="text-[#FF1744] text-[13px] font-bold mb-2.5">المشكلة الحقيقية</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-black tracking-tight">تمورك ممتازة بس<span className="text-[#6E6E73]"> العميل مش بيعرف</span></h2>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: "التغليف العادي يخسرك فلوس", desc: "العميل بيقارن بوكسك بالمنافس على الرف. التصميم الضعيف = سعر أقل" },
              { title: "الموزعين بيرفضوا المنتج", desc: "الموزع ياخد المنتج اللي يبيع نفسه. البوكس السيء معناه رفض" },
              { title: "المعارض محتاجة شكل احترافي", desc: "بدون تغليف عالمي المستورد الأجنبي مارهوش ياخد منتجك" },
              { title: "تصميم عشوائي يهد الهوية", desc: "كل منتج بتصميم مختلف يعني العميل مش بيتعرف على علامتك" }
            ].map((point, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-black/5 flex gap-3.5 items-start">
                <div className="w-[34px] h-[34px] rounded-xl bg-[#FF1744]/5 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" fill="none" stroke="#FF1744" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-[13px] mb-1">{point.title}</h3>
                  <p className="text-[#6E6E73] text-[11px] leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center text-[#6E6E73] text-xs mt-8">ده اللي هيتحل لما تتعامل معانا ↓</motion.p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="py-10 px-5 bg-[#F5F5F7]">
        <div className="max-w-[1024px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-9">
            <p className="text-[#1565C0] text-[13px] font-bold mb-2.5">أعمالنا الحقيقية</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-black">كل بوكس اتعمل <span className="gt">لعميل حقيقي</span></h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { img: "/images/print-design-2.avif", title: "بوكس تمور المدينة", desc: "فاخر — 3 أحجام" },
              { img: "/images/print-design-3.avif", title: "بوكس هدايا نخيل", desc: "هدايا — 5 تصاميم" },
              { img: "/images/print-design-4.avif", title: "بوكس دار التمور", desc: "هوية + تغليف" },
              { img: "/images/zaatar-box-highres.jpg", title: "تمور الخليج", desc: "تصديري — إنجليزي" },
              { img: "/images/agricultural-development-association.avif", title: "بستان النخيل", desc: "علب خشبية فاخرة" },
              { img: "/images/tasmim-hawiyah-basariyah-zaatar-w-simsim-box.jpg", title: "بوكس رمضان", desc: "موسمي محدود" }
            ].map((work, i) => (
              <motion.div key={i} variants={fadeInUp} className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative w-full h-[180px] overflow-hidden">
                  <Image src={work.img} alt={work.title} fill className="object-cover block group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-[12px]">{work.title}</h3>
                  <p className="text-[#6E6E73] text-[10px] mt-0.5">{work.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mt-9 flex justify-center">
            <a href="#cta" className="bg-[#1565C0] hover:bg-[#0D47A1] text-white flex items-center justify-center gap-2 py-3.5 px-7 rounded-full text-sm font-bold w-fit transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20">
              عايز بوكس زي كده لمنتجي
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="rotate-180"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* BEFORE/AFTER WITH NUMBERS */}
      <section className="py-10 px-5">
        <div className="max-w-[1024px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-9">
            <p className="text-[#00C853] text-[13px] font-bold mb-2.5">نتائج حقيقية</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-black">الفرق بالأرقام</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FF1744]"></span>
                <span className="text-[11px] font-bold text-[#6E6E73]">قبل التعامل معانا</span>
              </div>
              <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/5 relative h-[200px] w-full">
                <Image src="/images/print-design-7.avif" alt="قبل" fill className="object-cover opacity-50" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2.5 text-center">
                <div className="bg-white rounded-xl p-3 border border-black/5">
                  <div className="text-lg font-black text-[#FF1744] font-sans">15<br/><span className="text-[9px] font-medium text-[#6E6E73]">ريال</span></div>
                  <div className="text-[9px] text-[#6E6E73] mt-1">سعر البيع</div>
                </div>
                <div className="bg-white rounded-xl p-3 border border-black/5">
                  <div className="text-lg font-black text-[#FF1744] font-sans">20<br/><span className="text-[9px] font-medium text-[#6E6E73]">بوكس</span></div>
                  <div className="text-[9px] text-[#6E6E73] mt-1">مبيعات شهرياً</div>
                </div>
                <div className="bg-white rounded-xl p-3 border border-black/5">
                  <div className="text-lg font-black text-[#FF1744] font-sans">0<br/><span className="text-[9px] font-medium text-[#6E6E73]">موزع</span></div>
                  <div className="text-[9px] text-[#6E6E73] mt-1">جديد</div>
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#00C853]"></span>
                <span className="text-[11px] font-bold text-[#6E6E73]">بعد التصميم الجديد</span>
              </div>
              <div className="rounded-xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/5 relative h-[200px] w-full">
                <Image src="/images/print-design-2.avif" alt="بعد" fill className="object-cover" />
                <div className="absolute top-2.5 left-2.5 text-white text-[10px] font-bold py-1.5 px-3 rounded-full bg-gradient-to-r from-[#00C853] to-[#1565C0]">+35% سعر • +100% مبيعات</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2.5 text-center">
                <div className="bg-white rounded-xl p-3 border border-black/5">
                  <div className="text-lg font-black text-[#00C853] font-sans">20<br/><span className="text-[9px] font-medium text-[#6E6E73]">ريال</span></div>
                  <div className="text-[9px] text-[#6E6E73] mt-1">سعر البيع</div>
                </div>
                <div className="bg-white rounded-xl p-3 border border-black/5">
                  <div className="text-lg font-black text-[#00C853] font-sans">40<br/><span className="text-[9px] font-medium text-[#6E6E73]">بوكس</span></div>
                  <div className="text-[9px] text-[#6E6E73] mt-1">مبيعات شهرياً</div>
                </div>
                <div className="bg-white rounded-xl p-3 border border-black/5">
                  <div className="text-lg font-black text-[#00C853] font-sans">3<br/><span className="text-[9px] font-medium text-[#6E6E73]">موزعين</span></div>
                  <div className="text-[9px] text-[#6E6E73] mt-1">جدد</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-10 px-5 bg-[#F5F5F7]">
        <div className="max-w-[640px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-8">
            <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-black">إحنا مش زي <span className="gt">أي وكالة تانية</span></h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            <div className="grid grid-cols-3 text-center text-[10px] font-bold p-3.5 border-b border-black/5 bg-[#F5F5F7]">
              <span className="text-[#6E6E73]">المعيار</span>
              <span className="text-[#1565C0]">TAG Studio</span>
              <span className="text-[#6E6E73]/40">وكالة عامة</span>
            </div>
            {[
              { label: "متخصص في التمور", tag: true, other: false },
              { label: "+200 بوكس تمور", tag: true, other: false },
              { label: "ملفات جاهزة للطباعة", tag: true, other: "أحياناً" },
              { label: "متابعة المطبعة", tag: true, other: false },
              { label: "تعديلات مجانية", tag: true, other: "محدودة" },
              { label: "تسليم 3-5 أيام", tag: true, other: "أسبوعين+" }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 text-center text-[11px] p-3 items-center border-b border-black/5 last:border-0">
                <span className="text-[#6E6E73] font-medium">{row.label}</span>
                <span><svg width="18" height="18" fill="none" stroke="#00C853" strokeWidth="2.5" viewBox="0 0 24 24" className="block mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>
                <span>
                  {typeof row.other === 'boolean' ? (
                    <svg width="18" height="18" fill="none" stroke="rgba(255,23,68,0.25)" strokeWidth="2" viewBox="0 0 24 24" className="block mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  ) : (
                    <span className="text-[#6E6E73]/30 text-[10px]">{row.other}</span>
                  )}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 px-5">
        <div className="max-w-[1024px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-8">
            <p className="text-[#1565C0] text-[13px] font-bold mb-2.5">آراء عملائنا</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-black">أصحاب المصانع <span className="gt">بيحكوا عننا</span></h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { text: "البوكس الجديد رفع السعر 35% والموزعين هم اللي اتصلوا. استثمرت في التصميم ورجع أضعافه.", name: "عبدالله المحمدي", role: "مصنع تمور المدينة", initial: "ع.م", bg: "bg-gradient-to-br from-[#FFD600] to-[#00C853]" },
              { text: "الموقع اللي صمموه جابني 3 عقود تصدير في 3 شهور. فهم الفريق صناعة التمور ده فرق كبير.", name: "محمد العتيبي", role: "وادي التمور", initial: "م.ع", bg: "bg-[#1565C0]" },
              { text: "كنت بعتمد على وسطاء. دلوقتي الموزعين بييجولي. التصميم الصح بيبيع نفسه فعلاً.", name: "فهد الشمري", role: "نخيل الذهب", initial: "ف.ش", bg: "bg-[#FF1744]" },
            ].map((test, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
                <div className="flex gap-0.5 mb-3.5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" fill="#F59E0B" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-xs leading-[1.8] text-[#1D1D1F] mb-3.5" dangerouslySetInnerHTML={{ __html: `"${test.text.replace(/(\d+%.*?|3 عقود.*?|الموزعين بييجولي.*?)/g, '<strong>$1</strong>')}"` }} />
                <div className="flex items-center gap-2.5">
                  <div className={`w-[34px] h-[34px] rounded-full ${test.bg} flex items-center justify-center text-white text-[10px] font-bold`}>{test.initial}</div>
                  <div>
                    <div className="font-bold text-[11px]">{test.name}</div>
                    <div className="text-[#6E6E73] text-[9px]">{test.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 px-5 bg-[#F5F5F7]">
        <div className="max-w-[560px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-7">
            <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-black">أسئلة شائعة</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-black/5 last:border-0">
                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between p-4 text-right bg-transparent border-none cursor-pointer focus:outline-none">
                  <span className="font-bold text-xs text-[#1D1D1F]">{faq.q}</span>
                  <span className={`text-[#6E6E73] text-lg shrink-0 ml-3 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : 'rotate-0'}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <p className="text-[#6E6E73] text-[11px] leading-[1.8]">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="py-16 px-5 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-[600px] mx-auto bg-[#1D1D1F] rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-[#FFD600]/20 rounded-full blur-[50px]"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] bg-[#1565C0]/30 rounded-full blur-[60px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-white text-2xl md:text-3xl font-black mb-3 tracking-tight">جاهز تخلي بوكساتك تبيع نفسها؟</h2>
            <p className="text-[#6E6E73] text-xs mb-8 max-w-[400px] mx-auto leading-relaxed">
              احجز استشارتك المجانية دلوقتي، خلينا نحلل شكل منتجك الحالي ونقولك إزاي ممكن نضاعف مبيعاتك بتغيير التغليف.
            </p>
            
            <div className="flex flex-col items-center gap-3">
              <a href="https://wa.me/201009215131" target="_blank" rel="noreferrer" className="bg-[#FFD600] hover:bg-[#FACC15] text-[#1D1D1F] flex items-center justify-center gap-2 py-4 px-8 rounded-full text-sm font-black w-full max-w-[320px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-yellow-500/20">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                تواصل معنا على واتساب
              </a>
              <span className="text-[#6E6E73] text-[10px]">استشارة مجانية بالكامل. لا يوجد التزام.</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 border-t border-black/5 text-center mt-4">
        <div className="text-[#6E6E73] text-[10px] font-medium leading-[1.6]">
          جميع الحقوق محفوظة لـ TAG Studio &copy; {new Date().getFullYear()}<br/>
          تصميم بوكسات التمور والهوية البصرية للعلامات التجارية الفاخرة
        </div>
      </footer>
    </div>
  )
}
