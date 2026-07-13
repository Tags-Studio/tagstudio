import type { Metadata } from "next"
import LegalPage from "@/app/components/LegalPage"

export const metadata: Metadata = {
  title: "سياسة ملفات الارتباط",
  description:
    "معلومات عن ملفات الارتباط وأدوات التحليل المستخدمة في موقع تاج ستوديو.",
  alternates: {
    canonical: "https://www.wearetagstudio.com/cookie-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const sections = [
  {
    title: "ما ملفات الارتباط؟",
    paragraphs: [
      "ملفات الارتباط هي ملفات صغيرة قد تُحفظ على جهازك لمساعدة المواقع على تذكر بعض الإعدادات وفهم كيفية استخدام الصفحات.",
    ],
  },
  {
    title: "الأدوات المستخدمة",
    paragraphs: [
      "يستخدم الموقع أدوات قياس أداء وتحليل مثل Google Analytics وVercel Speed Insights لفهم الزيارات والأداء التقني وتحسين تجربة الاستخدام.",
      "قد تجمع هذه الأدوات بيانات تقنية مثل نوع الجهاز والمتصفح والصفحات التي تمت زيارتها ومدة التفاعل، وفق إعدادات الأداة وسياسة مزودها.",
    ],
  },
  {
    title: "إدارة ملفات الارتباط",
    paragraphs: [
      "يمكنك التحكم في ملفات الارتباط أو حذفها من إعدادات المتصفح. وقد يؤدي تعطيل بعض الملفات إلى تأثر بعض وظائف المواقع.",
    ],
  },
  {
    title: "تحديث السياسة",
    paragraphs: [
      "قد يتم تحديث هذه السياسة عند تغيير الأدوات أو طريقة استخدام الموقع، وسيظهر تاريخ آخر تحديث في أعلى الصفحة.",
    ],
  },
]

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="سياسة ملفات الارتباط"
      description="توضح هذه الصفحة استخدام ملفات الارتباط وأدوات القياس والتحليل بالموقع."
      updatedAt="12 يوليو 2026"
      sections={sections}
    />
  )
}
