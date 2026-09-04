# Tag Studio — SEO Tracker & Source of Truth

تاريخ التحديث: 2026-09-04

---

## 1. حقائق الموقع الثابتة (Project Architecture & State)
- **إطار العمل:** Next.js `14.2.25` (App Router) + React + TypeScript + Tailwind CSS.
- **الاستضافة:** Vercel (`main` branch auto-deployment).
- **اللغة والنطاق:** لغة عربية (`lang="ar" dir="rtl"`). النطاق الأساسي: `https://www.wearetagstudio.com`.
- **معرف التحليلات:** Google Analytics 4 مباشر (`G-7EET2GCC8N`) عبر `dataLayer` في `app/layout.tsx`.
- **التموضع المعتمد:** B2B عام للشركات مع تخصصات قطاعية (طبي، مطاعم، تعليمي، شركات/مقاولات/مصانع).
- **مرجعية قواعد المحتوى:** ملف `Documents/.agents/AGENTS.md` يحكم مقالات القطاع الطبي فقط، ولا يمثل القواعد العامة للبراند.
- **إجمالي الصفحات الحية المولّدة (85 صفحة حية في السايت ماب وبناء SSG):**
  - 12 صفحات رئيسية وثابتة (`/`, `/about`, `/blog`, `/work`, `/services`, `/tools`, `/faq`, `/terms`, `/privacy-policy`, `/cookie-policy`, `/lp/dates-packaging`, `/tasmim-huwiya-basariya-saudi`).
  - 15 صفحة خدمة ديناميكية (`/services/[slug]`).
  - 8 صفحات مدن سعودية ومصرية (`/locations/[city]`).
  - 9 أدوات تصميم تفاعلية (`/tools/[slug]`).
  - 4 دراسات حالة (`/work/[slug]`).
  - 32 مقالاً منشوراً حياً بالمدونة (تاريخها $\le$ 2026-09-04).
  - 5 مسارات نظام وخدمية (`_not-found`, `robots.txt`, `sitemap.xml`, إلخ).
- **المحتوى المخزون المجدول:** 151 مقالاً في `lib/blogData.ts` بتواريخ مستقبلية ترجع خطأ 404 ومستبعدة برمجياً من السايت ماب حتى تاريخ حلولها.

---

## 2. Baseline الأداء (تاريخ التسجيل: 2026-09-04)
- **المصدر:** إكسبورت رسمي من Google Search Console:
  `C:\Users\zahran\Downloads\https___www.wearetagstudio.com_-Performance-on-Search-2026-09-04.zip`
- **فترة التقرير:** آخر 3 أشهر (90 يوماً).
- **إجمالي أداء الموقع بالكامل:**
  - النقرات الإجمالية: **8 نقرات**.
  - مرات الظهور الإجمالية: **1,049 ظهور**.
  - التوزيع الجغرافي: السعودية **609 ظهور** (58.05%)، مصر **73 ظهور** (6.95%).
- **أداء صفحة البروفايل (`/services/company-profile-design`):**
  - مرات الظهور: **9 ظهور** (يمثل 0.85% من ظهور الموقع).
  - النقرات: **0 نقرات**.
  - نسبة النقر (CTR): **0%**.
  - متوسط الترتيب: **50.56**.
  - الكلمات المسجلة في GSC:
    - `company profile writing saudi arabia`: 3 ظهور | ترتيب 68.0.
    - `مصمم بروفايل شركات`: 1 ظهور | ترتيب 58.0.
- **أداء صفحة دراسة حالة «زعتر وسمسم» (`/work/zaatar-w-simsim-brand-identity`):**
  - مرات الظهور: **457 ظهور** (يمثل 43.56% من ظهور الموقع).
  - النقرات: 0.
  - متوسط الترتيب: 6.91.

---

## 3. سجل تغييرات الكود (Code Changes Log)
- **Commit `69296e1`:**
  `feat(tracking): add whatsapp_click gtag event tracking to CompanyProfilePage`
  إضافة حدث تتبع نقرات الواتساب.
- **Commit `e024b78`:**
  `refactor(cta): extract WhatsAppCTA client component and restore CompanyProfilePage as server component`
  فصل منطق العميل إلى المكون `components/WhatsAppCTA.tsx` وإعادة صفحة البروفايل كـ Server Component كامل لتسريع الأداء والسيو.
- **Push الإنتاج:** تم الرفع بنجاح لـ `origin/main` (متاح على Vercel).

---

## 4. الأخطاء البرمجية المكتشفة في المدونة (Discovered Code & Content Bugs)
- **إزاحة وتضارب العناوين والروابط (Offset Shift Mismatch):**
  كشف الفحص المنهجي لـ 183 مقالاً عن انزلاق متسلسل في المصفوفة بين المقالات 158 و 176:
  - المقال 160: عنوان صيانة أجهزة منزلية برابط قاعة أفراح (`luxury-wedding-hall-events-brand-identity`).
  - المقال 161: عنوان قاعة أفراح برابط تطوير عقاري (`real-estate-developer-company-profile-design`).
  - المقال 162: عنوان تطوير عقاري برابط طباعة أوفست (`digital-vs-offset-printing-guide-2026`).
  - المقالات 164-176: استمرار ترحيل الروابط مع ظهور عناوين غير مكتملة لمقالات خام (`article_96_best_printing_companies_saudi`, `article_99_modern_printing_company`, `article_100_paper_cups_printing`).
- **القرار:** تجميد الـ 151 مقالاً المجدولة كمسودات خام واعتبارها غير صالحة للنشر التلقائي لحين إعادة التدقيق والإصلاح البرمجي الشامل.

---

## 5. قرارات المنظومة والمرحلة 0 و 1 (Company Profile Cluster Decisions)
- **قرار Gate 0:** اعتماد خيار **تحديث في المكان (Update in place)** للصفحة المركزية `/services/company-profile-design` واستكمال العنقود المعرفي.
- **اعتماد الـ Slugs للمنظومة:**
  - الصفحة المركزية: `/services/company-profile-design`
  - الدليل الداعم: `/blog/company-profile-contents-guide`
  - دليل التكلفة: `/blog/company-profile-design-cost-saudi`
- **المقال 30 (`id: 30`):** معتمد كمسودة للدليل الداعم بعد تعديل عنوانه إلى *"محتويات بروفايل الشركة: دليل إعداد وتنظيم الملف التعريفي المؤسسي"* وإعادة صياغته عربياً وفق §7، ويدخل مع الصفحة في المرحلة 2 دون تقديم تاريخ نشره الآن.
- **المصطلح الرئيسي المبدئي:** "تصميم بروفايل شركات في السعودية".

---

## 6. البنود المفتوحة والمعلقة (Pending Action Items)
- [ ] استلام أرقام تغطية الفهرسة (Coverage Report: Indexed / Crawled-not-indexed / Discovered-not-indexed / noindex / Duplicate).
- [ ] استلام تقرير ملفات السايت ماب (Sitemaps Status & Discovered URLs).
- [ ] معرفة تاريخ إطلاق الموقع وعمر الدومين.
- [ ] تفعيل حدث `whatsapp_click` كـ Key Event في Google Analytics 4.
- [ ] إغلاق Gate 1 رسمياً بعد مراجعة بيانات SERP وحجم البحث السعودي.

---

## 7. جدول مواعيد المراجعة والقياس (Review Schedule)
- **تاريخ الأساس (Baseline Date):** 2026-09-04.
- **مراجعة 30 يوماً (30-Day Check):** **2026-10-04**.
- **مراجعة 90 يوماً (90-Day Check):** **2026-12-03**.
- **الـ KPIs المستهدفة:**
  - ظهور صفحة البروفايل: من 9 ظهور إلى 300+ ظهور.
  - متوسط ترتيب البروفايل: من 50.56 إلى ما دون 30.
  - نقرات الواتساب المسجلة عبر `whatsapp_click`: $\ge$ 10 نقرات شهرياً.
