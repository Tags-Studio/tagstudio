"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Download,
  Film,
  FileText,
  Paintbrush,
  Calendar,
  Layers,
  Palette,
  Eye,
  Check,
  Copy,
  Music,
  Play,
  Pause,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Search,
  X,
  Volume2,
  Share2,
  Clock,
  Shield,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ArrowDown,
  Compass,
  Flame,
  Award,
  Heart,
  Gift
} from "lucide-react"

// ═══════════════════════════════════════════════════════════════
// DATA ARRAYS
// ═══════════════════════════════════════════════════════════════

const QUICK_ACTIONS = [
  { id: "download-logo", label: "الشعار مفرغ PNG", icon: Download, bg: "bg-[#006C35] hover:bg-[#005228] text-white" },
  { id: "download-video", label: "فيديو الشعار MP4", icon: Film, bg: "bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 text-white font-bold" },
  { id: "download-guideline", label: "دليل الهوية PDF", icon: FileText, bg: "bg-[#D4AF37] hover:bg-yellow-500 text-black font-bold" },
  { id: "section-coloring", label: "رسومات وتلوين 96", icon: Paintbrush, bg: "bg-pink-950/40 border border-pink-500/30 text-pink-300 hover:bg-pink-900/40" },
  { id: "section-date", label: "موعد الإجازة (23 سبتمبر)", icon: Calendar, bg: "bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40" },
  { id: "section-pillars", label: "ركائز الهوية الـ 6", icon: Layers, bg: "bg-zinc-800/80 border border-zinc-700 text-zinc-200 hover:bg-zinc-800" },
  { id: "section-vision-kit", label: "ملحقات Vision Kit", icon: Compass, bg: "bg-zinc-800/80 border border-zinc-700 text-[#D4AF37] hover:bg-zinc-800" },
  { id: "colors-and-elements", label: "أكواد الألوان HEX", icon: Palette, bg: "bg-zinc-800/80 border border-zinc-700 text-zinc-200 hover:bg-zinc-800" },
  { id: "songs-section", label: "أغاني اليوم الوطني MP3", icon: Music, bg: "bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/40" },
]

const MAIN_DOWNLOADS = [
  {
    id: "logo-pack",
    title: "الشعار الرسمي المعتمد",
    subtitle: "PNG مفرغ عالي الدقة + ملف تصميم متجهات AI",
    size: "ZIP · 1.6 MB",
    link: "https://cdn.gea.gov.sa/ND-FILES/Guideline/Logo.zip",
    image: "https://a-amaq.com/assets/blog/2026/07/brand-emblem.webp",
    featured: true,
  },
  {
    id: "guideline-pdf",
    title: "دليل الهوية الكامل (Guideline)",
    subtitle: "كتيب الإرشادات ومعايير التصميم الرسمي PDF",
    size: "ZIP / PDF · 211 MB",
    link: "https://cdn.gea.gov.sa/ND-FILES/Guideline.zip",
    image: "https://cdn.gea.gov.sa/ND-2026/assets/identity-file/ar-hover-national-day-logo.png",
    featured: true,
  },
  {
    id: "leaders-images",
    title: "صور القادة بدقة فائقة",
    subtitle: "الملك سلمان وولي العهد الأمير محمد بن سلمان",
    size: "ZIP · 45 MB",
    link: "https://cdn.gea.gov.sa/ND-FILES/Guideline/LeadersImages.zip",
    image: "https://cdn.gea.gov.sa/ND-2026/assets/identity-file/leader-3-king-abdulaziz.png",
  },
  {
    id: "office-kit",
    title: "تطبيقات المكاتب والشركات",
    subtitle: "قوالب الهدايا، الأختام، المراسلات والقرطاسية",
    size: "ZIP · 15 MB",
    link: "https://a-amaq.com/assets/national-day-96/OfficeKit.zip",
    image: "https://cdn.gea.gov.sa/ND-2026/assets/identity-file/ar-hover-office-applications.png",
  },
  {
    id: "outdoor-kit",
    title: "تطبيقات الإعلانات الخارجية",
    subtitle: "بنرات، بيلبورد، شاشات رقمية وأعلام الشوارع",
    size: "ZIP · 125 MB",
    link: "https://cdn.gea.gov.sa/ND-FILES/Indoor&OutdoorKit.zip",
    image: "https://cdn.gea.gov.sa/ND-2026/assets/identity-file/ar-hover-outdoor-advertising.png",
  },
  {
    id: "merchandise-kit",
    title: "تطبيقات المتاجر والمنتجات",
    subtitle: "أكياس التسوق، التيشيرتات، والتوزيعات الترويجية",
    size: "ZIP · 9 MB",
    link: "https://a-amaq.com/assets/national-day-96/MerchandiseKit.zip",
    image: "https://cdn.gea.gov.sa/ND-2026/assets/identity-file/ar-hover-product-applications.png",
  },
  {
    id: "visual-elements",
    title: "عناصر الهوية البصرية",
    subtitle: "الرموز التراثية، الأنسجة والنقوش (PNG + AI)",
    size: "ZIP · 201 MB",
    link: "https://cdn.gea.gov.sa/ND-FILES/Guideline/VisualIdentityElements.zip",
    icon: Layers,
  },
  {
    id: "general-templates",
    title: "قوالب التصميم الشاملة",
    subtitle: "ملفات مفتوحة AI/PSD للسوشيال ميديا والعروض",
    size: "ZIP · 1.4 GB",
    link: "https://cdn.gea.gov.sa/ND-FILES/Guideline/GeneralTemplate.zip",
    icon: Sparkles,
  },
  {
    id: "motion-video-kit",
    title: "فيديو الشعار المتحرك",
    subtitle: "آوترو وأنترو موشن جرافيك رسمي MP4 عالي الجودة",
    size: "ZIP · 5.1 MB",
    link: "https://cdn.gea.gov.sa/ND-FILES/Guideline/Video.zip",
    icon: Film,
  },
  {
    id: "authenticity-kit",
    title: "عناصر صفات الهوية (الأصالة)",
    subtitle: "ملحقات النخلة والرموز الوطنية العريقة",
    size: "ZIP · 461 MB",
    link: "https://cdn.gea.gov.sa/ND-FILES/Guideline/Authenticity.zip",
    icon: Award,
  },
  {
    id: "generosity-kit",
    title: "استلهام الرسومات والزخارف",
    subtitle: "الصورة النهائية للملفات المفتوحة AI + PNG",
    size: "ZIP · ملفات مفتوحة",
    link: "https://cdn.gea.gov.sa/ND-FILES/Guideline/Generosity.zip",
    icon: Gift,
  },
  {
    id: "vision-kit-bundle",
    title: "ملحقات استوديو الرؤية",
    subtitle: "الوشاح التراثي، سجاد 96، والشخصيات المفرغة",
    size: "ZIP · ملفات مفتوحة",
    link: "https://cdn.gea.gov.sa/ND-FILES/Guideline/Vison.zip",
    icon: Compass,
  },
]

const PILLARS = [
  {
    id: "vision",
    nameEn: "VISION",
    nameAr: "عزّنا برؤيتنا",
    desc: "تجسد الطموح الوطني اللامحدود واستشراف المستقبل الواعد والريادة العالمية في ظل رؤية المملكة 2030.",
    sub: "شعاع الرؤية والنسيج المستقبلي",
    hex: "#7c5d21",
    tagColor: "border-[#7c5d21]/50 text-[#d4af37] bg-[#7c5d21]/20",
    tapestryImg: "https://a-amaq.com/assets/national-day-96/elements/tapestry-vision.webp",
    typoImg: "https://a-amaq.com/assets/national-day-96/elements/typo-vision.webp",
    patterns: [
      { title: "أيقونة الرؤية المنسوجة", src: "https://a-amaq.com/assets/national-day-96/elements/icon-vision.webp" },
      { title: "نقش سدو تراثي 1 (الرؤية)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern1-vision.webp" },
      { title: "نقش سدو تراثي 2 (الرؤية)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern2-vision.webp" },
      { title: "نقش سدو تراثي 3 (الرؤية)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern3-vision.webp" },
    ],
  },
  {
    id: "courage",
    nameEn: "COURAGE",
    nameAr: "عزّنا بشجاعتنا",
    desc: "ترمز للبطولة وبسالة الأجداد والفروسية وحماية تراب الوطن الغالي بكل قوة وتضحية عبر التاريخ.",
    sub: "السيف السعودي والفروسية التراثية",
    hex: "#607c4f",
    tagColor: "border-[#607c4f]/50 text-[#8bb871] bg-[#607c4f]/20",
    tapestryImg: "https://a-amaq.com/assets/national-day-96/elements/tapestry-courage.webp",
    typoImg: "https://a-amaq.com/assets/national-day-96/elements/typo-courage.webp",
    patterns: [
      { title: "أيقونة الشجاعة والسيف المنسوجة", src: "https://a-amaq.com/assets/national-day-96/elements/icon-courage.webp" },
      { title: "نقش سدو تراثي 1 (الشجاعة)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern1-courage.webp" },
      { title: "نقش سدو تراثي 2 (الشجاعة)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern2-courage.webp" },
      { title: "نقش سدو تراثي 3 (الشجاعة)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern3-courage.webp" },
    ],
  },
  {
    id: "determination",
    nameEn: "DETERMINATION",
    nameAr: "عزّنا بهمتنا",
    desc: "مستوحاة من مقولة «همة السعوديين كجبل طويق»، تعبر عن الصمود والإصرار الذي لا يعرف المستحيل.",
    sub: "جبل طويق وقوة الإصرار",
    hex: "#971a4d",
    tagColor: "border-[#971a4d]/50 text-[#e24c83] bg-[#971a4d]/20",
    tapestryImg: "https://a-amaq.com/assets/national-day-96/elements/tapestry-determination.webp",
    typoImg: "https://a-amaq.com/assets/national-day-96/elements/typo-determination.webp",
    patterns: [
      { title: "أيقونة الهمة والعزيمة المنسوجة", src: "https://a-amaq.com/assets/national-day-96/elements/icon-determination.webp" },
      { title: "نقش سدو تراثي 1 (الهمة)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern1-determination.webp" },
      { title: "نقش سدو تراثي 2 (الهمة)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern2-determination.webp" },
      { title: "نقش سدو تراثي 3 (الهمة)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern3-determination.webp" },
    ],
  },
  {
    id: "authenticity",
    nameEn: "AUTHENTICITY",
    nameAr: "عزّنا بأصالتنا",
    desc: "تجسيد للجذور التاريخية العميقة والتمسك بالتقاليد والهوية الوطنية المتوارثة عبر الأجيال.",
    sub: "النخلة الباسقة والجذور الراسخة",
    hex: "#5aba1c",
    tagColor: "border-[#5aba1c]/50 text-[#79df3b] bg-[#5aba1c]/20",
    tapestryImg: "https://a-amaq.com/assets/national-day-96/elements/tapestry-authenticity.webp",
    typoImg: "https://a-amaq.com/assets/national-day-96/elements/typo-authenticity.webp",
    patterns: [
      { title: "أيقونة الأصالة والنخلة المنسوجة", src: "https://a-amaq.com/assets/national-day-96/elements/icon-authenticity.webp" },
      { title: "نقش سدو تراثي 1 (الأصالة)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern1-authenticity.webp" },
      { title: "نقش سدو تراثي 2 (الأصالة)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern2-authenticity.webp" },
      { title: "نقش سدو تراثي 3 (الأصالة)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern3-authenticity.webp" },
    ],
  },
  {
    id: "generosity",
    nameEn: "GENEROSITY",
    nameAr: "عزّنا بكرمنا",
    desc: "رمز كرم الضيافة السعودية الأصيلة وحفاوة الاستقبال التي أصبحت علامة فارقة للمملكة عالمياً.",
    sub: "الدلة وفنجان القهوة السعودية",
    hex: "#0050af",
    tagColor: "border-[#0050af]/50 text-[#418eff] bg-[#0050af]/20",
    tapestryImg: "https://a-amaq.com/assets/national-day-96/elements/tapestry-generosity.webp",
    typoImg: "https://a-amaq.com/assets/national-day-96/elements/typo-generosity.webp",
    patterns: [
      { title: "أيقونة الكرم والدلة المنسوجة", src: "https://a-amaq.com/assets/national-day-96/elements/icon-generosity.webp" },
      { title: "نقش سدو تراثي 1 (الكرم)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern1-generosity.webp" },
      { title: "نقش سدو تراثي 2 (الكرم)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern2-generosity.webp" },
      { title: "نقش سدو تراثي 3 (الكرم)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern3-generosity.webp" },
    ],
  },
  {
    id: "giving",
    nameEn: "EXCEPTIONAL GIVING",
    nameAr: "عزّنا بجودنا",
    desc: "تعبر عن الجود الإنساني والعطاء السخي وطيب الأثر والخير الممتد للجميع في كل زمان ومكان.",
    sub: "المبخرة السعودية ونفحات الخزامى",
    hex: "#6565e0",
    tagColor: "border-[#6565e0]/50 text-[#9c9cf5] bg-[#6565e0]/20",
    tapestryImg: "https://a-amaq.com/assets/national-day-96/elements/tapestry-giving.webp",
    typoImg: "https://a-amaq.com/assets/national-day-96/elements/typo-giving.webp",
    patterns: [
      { title: "أيقونة الجود والمبخرة المنسوجة", src: "https://a-amaq.com/assets/national-day-96/elements/icon-giving.webp" },
      { title: "نقش سدو تراثي 1 (الجود)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern1-giving.webp" },
      { title: "نقش سدو تراثي 2 (الجود)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern2-giving.webp" },
      { title: "نقش سدو تراثي 3 (الجود)", src: "https://a-amaq.com/assets/national-day-96/elements/pattern3-giving.webp" },
    ],
  },
]

const VISION_STUDIO_ASSETS = [
  {
    type: "scene",
    title: "المشهد التكويني الكامل لاستوديو الرؤية",
    desc: "تكوين سينمائي يجمع الشاب السعودي بالزي الوطني حاملاً كتاب المعرفة، بجواره الصقر على الوكر، محاطاً بنفائس الكتب والمخطوطات.",
    img: "https://a-amaq.com/assets/national-day-96/vision/vision-scene-full.webp",
    badge: "Ultra-HD Render",
  },
  {
    type: "scarf",
    title: "وشاح ونسيج الرؤية التراثي المركزي (3D)",
    desc: "تحفة نسيجية ثلاثية الأبعاد تحاكي نسيج الصوف وحياكة السدو، يتوسطها شعاع الرؤية الهندسي المشرق نحو الآفاق.",
    img: "https://a-amaq.com/assets/national-day-96/vision/vision-tapestry-main.webp",
    badge: "3D Woven Scarf",
  },
]

const VISION_CARPETS = [
  { id: 1, title: "سجاد الرؤية التراثي — نمط المعينات المتداخلة", src: "https://a-amaq.com/assets/national-day-96/vision/vision-carpet-1.webp" },
  { id: 2, title: "سجاد الرؤية التراثي — نمط النسيج الشريطي المعاصر", src: "https://a-amaq.com/assets/national-day-96/vision/vision-carpet-2.webp" },
  { id: 3, title: "سجاد الرؤية التراثي — نمط التعاشيق والدوائر", src: "https://a-amaq.com/assets/national-day-96/vision/vision-carpet-3.webp" },
  { id: 4, title: "سجاد الرؤية التراثي — البساط متعدد النقوش", src: "https://a-amaq.com/assets/national-day-96/vision/vision-carpet-4.webp" },
]

const VISION_CUTOUTS = [
  { title: "الشاب السعودي مع كتاب المعرفة", sub: "شخصية مفرغة عالية الدقة", src: "https://a-amaq.com/assets/national-day-96/vision/vision-cutout-character.webp" },
  { title: "الصقر الأصيل على الوكر", sub: "رمز الشموخ والفروسية", src: "https://a-amaq.com/assets/national-day-96/vision/vision-cutout-falcon.webp" },
  { title: "النسيج المعلق المهدّل", sub: "قطعة ديكورية مفرغة", src: "https://a-amaq.com/assets/national-day-96/vision/vision-draped-2.webp" },
  { title: "بساط السدو الجداري", sub: "تطريز جداري 3D", src: "https://a-amaq.com/assets/national-day-96/vision/vision-draped-4.webp" },
]

const FONTS_LIST = [
  { name: "الخط السعودي", nameEn: "Saudi Font", size: "ZIP · 448 KB", link: "https://a-amaq.com/assets/national-day-96/fonts/Saudi-Font.zip" },
  { name: "الخط الأول", nameEn: "Alawwal Font", size: "ZIP · 463 KB", link: "https://a-amaq.com/assets/national-day-96/fonts/Alawwal-Font.zip" },
  { name: "خط عام الحرف اليدوية", nameEn: "Year of Handcrafts", size: "ZIP · 480 KB", link: "https://a-amaq.com/assets/national-day-96/fonts/Year-of-Handcrafts-Font.zip" },
  { name: "خط عام الإبل", nameEn: "Camel Year Font", size: "ZIP · 2.3 MB", link: "https://a-amaq.com/assets/national-day-96/fonts/Camel-Year-Font.zip" },
  { name: "خط عام الشعر العربي", nameEn: "Year of Arabic Poetry", size: "ZIP · 198 KB", link: "https://a-amaq.com/assets/national-day-96/fonts/Year-of-Arabic-Poetry-Font.zip" },
  { name: "خط المصمك", nameEn: "Masmak Font", size: "ZIP · 65 KB", link: "https://a-amaq.com/assets/national-day-96/fonts/Masmak-Font.zip" },
  { name: "خط النسيب", nameEn: "Naseeb Font", size: "ZIP · 47 KB", link: "https://a-amaq.com/assets/national-day-96/fonts/Naseeb-Font.zip" },
  { name: "خط الوتد", nameEn: "Watad Font", size: "ZIP · 45 KB", link: "https://a-amaq.com/assets/national-day-96/fonts/Watad-Font.zip" },
]

const SONGS_PLAYLIST = [
  { title: "ونعم", titleEn: "Wena'am", src: "https://a-amaq.com/assets/national-day-96/audio/wenaam.mp3" },
  { title: "موعدنا 2030", titleEn: "Maw'edna 2030", src: "https://a-amaq.com/assets/national-day-96/audio/mawedna-2030.mp3" },
  { title: "فوق السحايب", titleEn: "Foq Al-Sahaye'b", src: "https://a-amaq.com/assets/national-day-96/audio/foq-al-sahayeb.mp3" },
]

const FAQS = [
  {
    q: "متى موعد اليوم الوطني السعودي 96 لعام 2026 وتاريخ الإجازة الرسمية؟",
    a: "يوافق اليوم الوطني السعودي 96 يوم الأربعاء 23 سبتمبر 2026م (الموافق 11 ربيع الأول 1448هـ)، وهو إجازة رسمية مدفوعة الأجر لكافة القطاعات الحكومية والخاصة وغير الربحية والمدارس والجامعات في المملكة العربية السعودية تحت شعار «عزّنا بطبعنا».",
  },
  {
    q: "ما هو الشعار الرسمي المعتمد لليوم الوطني 96 وما فلسفته؟",
    a: "الشعار الرسمي هو «عزّنا بطبعنا»، ويرمز إلى أن عزة ومنعة وشهامة الشعب السعودي ليست شيئاً طارئاً أو مصطنعاً، بل هي سجية وفطرة وطبيعة أصيلة متجذرة عبر الأجيال، وترتكز على ست قيم نبيلة: الرؤية، الشجاعة، الهمة، الأصالة، الكرم، والجود.",
  },
  {
    q: "كيف أحمل شعار اليوم الوطني 96 مفرغ PNG ودليل الهوية PDF؟",
    a: "يمكنك الضغط على كرت 'الشعار الرسمي' في قسم التحميلات بأعلى الصفحة للحصول على نسخة PNG مفرغة بدون خلفية عالية الدقة وملفات فيكتور AI، كما يمكنك تحميل دليل الهوية الرسمي الكامل (Guideline PDF) برابط مباشر وسريع.",
  },
  {
    q: "أين أجد رسومات وتلوين اليوم الوطني السعودي 96 للأطفال والمدارس للطباعة A4؟",
    a: "يوفر تاج ستوديو قسماً خاصاً يضم شعار اليوم الوطني 96 مفرغاً بالخط الخارجي (Outline) أبيض وأسود، ورسم علم المملكة والسيفين والنخلة، بالإضافة إلى كراسة أنشطة وتلوين كاملة بصيغة PDF مقاس A4 دقة 300 DPI جاهزة للطباعة الفورية.",
  },
  {
    q: "ما هي أكواد الألوان الرسمية المعتمدة في هوية اليوم الوطني 96 (HEX)؟",
    a: "تعتمد الهوية على اللونين الأساسيين: الأخضر السعودي (#006C35) والذهبي (#D4AF37)، بالإضافة إلى ألوان الركائز الست: الرؤية (#7c5d21)، الشجاعة (#607c4f)، الهمة (#971a4d)، الأصالة (#5aba1c)، الكرم (#0050af)، والجود (#6565e0). جميع الأكواد قابلة للنسخ بنقرة واحدة في قسم الألوان.",
  },
  {
    q: "هل أحتاج إلى برامج معينة لفتح ملفات الهوية وقوالب التصميم؟",
    a: "ملفات PNG و PDF و MP4 و MP3 تعمل على أي جهاز وهاتف مباشر. أما الملفات المفتوحة (Vector AI و PSD) فتحتاج برامج أدوبي مثل Illustrator و Photoshop للتعديل عليها وتخصيصها بدقة عالية.",
  },
  {
    q: "كيف يساعد تاج ستوديو الشركات في موسم اليوم الوطني السعودي؟",
    a: "في تاج ستوديو، نساعد الشركات والمصانع والمؤسسات السعودية على تصميم حملاتها الاحتفالية المتكاملة: هدايا وتوزيعات الشركات الفاخرة، بروفايل الشركة بالثيم الوطني، بنرات المعارض، بوستات وفيديوهات السوشيال ميديا، وتطبيقات الهوية بلمسة إبداعية راقية.",
  },
]

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function NationalDay96Client() {
  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false })

  // Audio Player State
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Lightbox Modal State
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null)

  // Copy Toast State
  const [copiedHex, setCopiedHex] = useState<string | null>(null)
  const [downloadToast, setDownloadToast] = useState<string | null>(null)

  // Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // WhatsApp Form State
  const [waName, setWaName] = useState("")
  const [waDetails, setWaDetails] = useState("")

  // 1. Calculate Countdown
  useEffect(() => {
    const targetDate = new Date("2026-09-23T00:00:00+03:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, isToday: false })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  // 2. Audio Handlers
  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.src = SONGS_PLAYLIST[index].src
      audioRef.current.play().catch(() => {})
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const progress = (audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100
    setAudioProgress(progress)
  }

  // 3. Copy HEX Code
  const copyHex = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).then(() => {
        setCopiedHex(hex)
        setTimeout(() => setCopiedHex(null), 2500)
      })
    }
  }

  // 4. Download Notification
  const triggerDownloadFeedback = (name: string) => {
    setDownloadToast(name)
    setTimeout(() => setDownloadToast(null), 3000)
  }

  // 5. WhatsApp submit
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!waName.trim() || !waDetails.trim()) return
    const message = `السلام عليكم تاج ستوديو،\n\nأنا: ${waName.trim()}\nأرغب بالاستفسار عن خدمات وتصاميم اليوم الوطني 96:\n${waDetails.trim()}`
    window.open(`https://wa.me/201553909983?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      {/* Audio Element Hidden */}
      <audio
        ref={audioRef}
        src={SONGS_PLAYLIST[currentTrackIndex].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          const nextIndex = (currentTrackIndex + 1) % SONGS_PLAYLIST.length
          selectTrack(nextIndex)
        }}
      />

      {/* Top Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-white transition-colors">أدواتنا</Link>
        <span>/</span>
        <span className="text-[#D4AF37] font-bold">تحميل هوية وشعار اليوم الوطني السعودي 96</span>
      </nav>

      {/* Header Badge & Title */}
      <div className="text-center md:text-right mb-8">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#006C35]/20 text-[#4ade80] border border-[#006C35]/40 text-xs font-black px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            هوية رسمية معتمدة 1448هـ
          </span>
          <span className="text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#D4AF37]" /> آخر تحديث: 21 سبتمبر 2026
          </span>
          <span className="text-xs text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full font-bold">
            تحميل مجاني 100%
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-snug sm:leading-tight mb-4 tracking-tight">
          تحميل هوية وشعار اليوم الوطني السعودي 96 (2026) — عزنا بطبعنا PDF و PNG ورسومات تلوين
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
          الدليل الشامل والمكتبة الرسمية المتكاملة لملفات وهوية <strong>اليوم الوطني السعودي 96</strong> تحت شعار{" "}
          <span className="text-[#4ade80] font-black">«عزّنا بطبعنا»</span>: حمّل مجاناً شعار اليوم الوطني 2026 مفرغ بدقة فائقة،
          ودليل الهوية المعتمد PDF، والخطوط الرسمية الـ 8، وفيديو موشن الشعار بدقة 1080p، ورسومات تلوين الأطفال للمدارس، وسجاد وملحقات استوديو الرؤية.
        </p>
      </div>

      {/* Quick Action Pills Navigation */}
      <div className="bg-zinc-900/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-zinc-800 shadow-xl mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 mb-3 px-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>وصول فوري وسريع للأقسام وملفات التحميل:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <a
                key={action.id}
                href={`#${action.id}`}
                className={`${action.bg} py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center hover:scale-[1.02] shadow-sm`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{action.label}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Instant Answer Callout (Featured Snippet) */}
      <div
        id="section-date"
        className="scroll-mt-32 bg-gradient-to-l from-emerald-950/40 via-zinc-900 to-zinc-900 border-r-4 border-r-[#006C35] border border-emerald-900/40 p-4 sm:p-5 rounded-2xl mb-8 shadow-lg"
      >
        <div className="flex items-center gap-2 text-[#4ade80] font-black text-sm mb-1.5">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>إجابة سريعة: متى موعد اليوم الوطني السعودي 96 لعام 2026؟</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
          يوافق اليوم الوطني السعودي 96 يوم <span className="text-[#4ade80] font-black underline decoration-2">الأربعاء 23 سبتمبر 2026م</span> (الموافق 11 ربيع الأول 1448هـ)، وهو إجازة رسمية مدفوعة الأجر لكافة القطاعات الحكومية والخاصة والمدارس في كافة أرجاء المملكة العربية السعودية تحت الشعار الرسمي المعتمد <span className="text-[#D4AF37] font-black">«عزّنا بطبعنا»</span>.
        </p>
      </div>

      {/* Live Interactive Countdown Widget */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#002615] to-zinc-900 border border-[#006C35]/40 rounded-3xl p-6 sm:p-8 mb-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#006C35]/15 blur-2xl rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-3 py-1 rounded-full mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>العد التنازلي لليوم الوطني السعودي 96</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
            كم باقي على موعد اليوم الوطني 96 (عزنا بطبعنا)؟
          </h3>

          {timeLeft.isToday ? (
            <div className="p-6 bg-[#006C35]/30 border border-[#4ade80]/40 rounded-2xl">
              <span className="text-2xl sm:text-3xl font-black text-[#4ade80]">
                🇸🇦 اليوم نحتفل باليوم الوطني السعودي 96 — دمت عزيزاً وشامخاً يا وطن! 🇸🇦
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              <div className="bg-black/50 border border-zinc-800 rounded-2xl p-3 sm:p-4">
                <span className="block text-2xl sm:text-4xl font-black font-mono text-[#4ade80]">{timeLeft.days}</span>
                <span className="text-[11px] sm:text-xs text-zinc-400 font-bold">يوم</span>
              </div>
              <div className="bg-black/50 border border-zinc-800 rounded-2xl p-3 sm:p-4">
                <span className="block text-2xl sm:text-4xl font-black font-mono text-[#4ade80]">{timeLeft.hours}</span>
                <span className="text-[11px] sm:text-xs text-zinc-400 font-bold">ساعة</span>
              </div>
              <div className="bg-black/50 border border-zinc-800 rounded-2xl p-3 sm:p-4">
                <span className="block text-2xl sm:text-4xl font-black font-mono text-[#4ade80]">{timeLeft.minutes}</span>
                <span className="text-[11px] sm:text-xs text-zinc-400 font-bold">دقيقة</span>
              </div>
              <div className="bg-black/50 border border-zinc-800 rounded-2xl p-3 sm:p-4">
                <span className="block text-2xl sm:text-4xl font-black font-mono text-[#D4AF37]">{timeLeft.seconds}</span>
                <span className="text-[11px] sm:text-xs text-zinc-400 font-bold">ثانية</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Outro Preview & Download Card */}
      <div id="download-video" className="scroll-mt-32 mb-14">
        {/* Video Preview */}
        <div className="mb-4 overflow-hidden rounded-3xl shadow-2xl relative bg-black aspect-video border-2 border-[#006C35]/30">
          <video
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            preload="metadata"
            className="w-full h-full object-cover select-none"
            poster="https://a-amaq.com/assets/blog/2026/07/saudi-national-day-96-identity.webp"
          >
            <source src="https://a-amaq.com/assets/national-day-96/SaudiNationalDay_Outro.mp4" type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        </div>

        {/* Video Download Card */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#002615] border-2 border-[#006C35]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1 space-y-2.5">
              <div className="inline-flex items-center gap-2 bg-[#006C35]/20 text-[#4ade80] px-3.5 py-1 rounded-full text-xs font-black border border-[#006C35]/40">
                <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>فيديو موشن جرافيك رسمي معتمد (آوترو 96)</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug">
                تحميل فيديو شعار اليوم الوطني 96 (عزنا بطبعنا) بدقة 1080p Full HD
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                احصل على النسخة الرسمية الأصلية لموشن جرافيك شعار اليوم الوطني السعودي 96 بصيغة{" "}
                <span className="text-[#4ade80] font-black">MP4 عالية الدقة</span> وبدون حقوق مزعجة، جاهزة للاستخدام الفوري
                في المونتاج (CapCut, Premiere, After Effects)، وإنترو إعلانات الشركات، ومقاطع ريلز وتيك توك وسناب شات.
              </p>

              {/* Specs Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-bold text-zinc-300">
                <span className="inline-flex items-center gap-1.5 bg-black/50 border border-zinc-800 px-3 py-1 rounded-lg">
                  <Eye className="w-3.5 h-3.5 text-[#4ade80]" /> 1920x1080 (Full HD)
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/50 border border-zinc-800 px-3 py-1 rounded-lg">
                  <Film className="w-3.5 h-3.5 text-[#D4AF37]" /> صيغة MP4
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/50 border border-zinc-800 px-3 py-1 rounded-lg">
                  <FileText className="w-3.5 h-3.5 text-zinc-400" /> الحجم: 5.4 ميجابايت
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#006C35]/20 border border-[#006C35]/40 text-[#4ade80] px-3 py-1 rounded-lg">
                  <Shield className="w-3.5 h-3.5" /> ترخيص رسمي مجاني
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <a
                href="https://a-amaq.com/assets/national-day-96/SaudiNationalDay_Outro.mp4"
                download="فيديو-شعار-اليوم-الوطني-96-عزنا-بطبعنا.mp4"
                onClick={() => triggerDownloadFeedback("فيديو الشعار MP4")}
                className="group inline-flex items-center justify-center gap-3 bg-[#006C35] hover:bg-[#005228] text-white px-8 py-4 rounded-2xl font-black text-base shadow-xl hover:scale-[1.03] transition-all border border-[#4ade80]/30 w-full md:w-auto"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                <div className="flex flex-col text-right leading-tight">
                  <span>تحميل فيديو الشعار الآن</span>
                  <span className="text-[11px] text-white/80 font-normal">تحميل مباشر وسريع (MP4 - 5.4MB)</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Downloads Grid Section */}
      <div id="downloads-section" className="scroll-mt-32 mb-16">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-3.5 py-1 rounded-full mb-2">
            <Download className="w-3.5 h-3.5" /> مركز الملفات والروابط الرسمية
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            روابط تحميل هوية وشعار اليوم الوطني 96 المعتمدة
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            اضغط على أي كارت بالأسفل لتحميل الحزمة الأصلية مباشرة بروابط سريعة ومباشرة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {MAIN_DOWNLOADS.map((item) => {
            const ItemIcon = item.icon || Download
            return (
              <a
                key={item.id}
                id={item.id === "logo-pack" ? "download-logo" : item.id === "guideline-pdf" ? "download-guideline" : undefined}
                href={item.link}
                download
                onClick={() => triggerDownloadFeedback(item.title)}
                className={`group relative flex flex-col justify-between bg-zinc-900/80 hover:bg-zinc-850 border ${
                  item.featured ? "border-[#006C35]/60 hover:border-[#4ade80]" : "border-zinc-800 hover:border-zinc-700"
                } rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg overflow-hidden`}
              >
                {item.featured && (
                  <span className="absolute top-3 left-3 bg-[#006C35] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full z-10">
                    ملف أساسي
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    {item.image ? (
                      <div className="w-16 h-16 rounded-xl bg-black/50 border border-zinc-800 overflow-hidden flex items-center justify-center p-1 shrink-0 group-hover:scale-105 transition-transform">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-[#006C35]/15 border border-[#006C35]/30 text-[#4ade80] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <ItemIcon className="w-7 h-7" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-base font-black text-white group-hover:text-[#4ade80] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <span className="inline-block text-[11px] font-mono text-[#D4AF37] mt-0.5 font-bold">
                        {item.size}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-zinc-300 group-hover:text-white">
                  <span className="flex items-center gap-1.5 text-[#4ade80]">
                    <Download className="w-3.5 h-3.5" /> تحميل مباشر
                  </span>
                  <span className="text-zinc-500 font-mono text-[11px] group-hover:text-zinc-400">
                    GEA CDN
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* Slogan Meaning & Philosophy Section («عزنا بطبعنا») */}
      <div id="section-slogan-meaning" className="scroll-mt-32 my-16 bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#002615] border border-[#006C35]/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-zinc-800">
          <div className="w-12 h-12 rounded-2xl bg-[#006C35] text-white flex items-center justify-center text-xl shrink-0 shadow-md">
            <Award className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ما معنى وفلسفة شعار اليوم الوطني 96 «عزّنا بطبعنا»؟
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              الدلالات اللغوية والثقافية للشعار الرسمي لعام 2026 / 1448هـ المعتمد من الهيئة العامة للترفيه
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
          أطلقت الهيئة العامة للترفيه الهوية الرسمية لليوم الوطني الـ 96 تحت شعار <strong>«عزّنا بطبعنا»</strong>،
          وهو شعار يحمل أبعاداً وجدانية وتاريخية وثقافية تمس كل مواطن ومقيم على أرض المملكة:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5">
            <h4 className="text-sm sm:text-base font-black text-[#D4AF37] mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D4AF37]" /> دلالة كلمة «عزّنا»:
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              العز والمنعة والرفعة المستمدة من ثوابت الدين الحنيف، والتاريخ التليد الممتد لأكثر من ثلاثة قرون منذ تأسيس الدولة السعودية الأولى، وفخر الانتماء لوطن عزيز بوحدته وتلاحم شعبه مع قيادته الرشيدة.
            </p>
          </div>
          <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5">
            <h4 className="text-sm sm:text-base font-black text-[#4ade80] mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" /> دلالة كلمة «بطبعنا»:
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              أن العزة والشجاعة والكرم والجود والشهامة ليست سلوكاً طارئاً أو مظهراً مصطنعاً، بل هي سجية وفطرة وطبيعة متجذرة في سمات الشخصية السعودية عبر الأجيال، متوارثة من الآباء إلى الأبناء.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          ويأتي الشعار ليربط بين ماضي المملكة المجيد وعراقة تقاليدها، وبين حاضرها المزدهر ومستقبلها الريادي العالمي في إطار <strong>رؤية السعودية 2030</strong>.
        </p>
      </div>

      {/* 6 Identity Pillars Section (ركائز وصفات الهوية الستة) */}
      <div id="section-pillars" className="scroll-mt-32 my-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-[#006C35]/20 text-[#4ade80] border border-[#006C35]/30 text-xs font-black px-4 py-1.5 rounded-full mb-3">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" /> الهوية البصرية الرسمية المعتمدة
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
            ركائز وصفات الهوية الستة <span className="text-[#D4AF37]">«عزّنا بطبعنا»</span> — نقوش وأنسجة سدو 3D
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            بُنيت الهوية البصرية لليوم الوطني 96 على ست صفات وقيم سعودية أصيلة، تم تجسيد كل صفة بنسيج سدو عصري ثلاثي الأبعاد، أيقونة منسوجة مفرغة، ونقوش تراثية خاصة مع كود HEX معتمد. انقر على أي عنصر لمعاينته أو تحميله مباشرة:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div>
                {/* Pillar Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-black tracking-widest px-3 py-1 rounded-full uppercase border ${pillar.tagColor}`}>
                    {pillar.nameEn}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyHex(pillar.hex)}
                    className="inline-flex items-center gap-1.5 bg-black/60 hover:bg-zinc-800 text-xs font-mono font-bold text-zinc-200 px-3 py-1 rounded-lg border border-zinc-700 transition-colors"
                    title="اضغط لنسخ كود اللون"
                  >
                    {copiedHex === pillar.hex ? (
                      <>
                        <Check className="w-3 h-3 text-[#4ade80]" />
                        <span className="text-[#4ade80]">تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-zinc-400" />
                        <span>{pillar.hex}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Tapestry & Typo Calligraphy */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    onClick={() => setLightboxImg({ src: pillar.tapestryImg, title: `نسيج سدو 3D — ${pillar.nameAr}` })}
                    className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-700 bg-black/50 cursor-pointer group/tap"
                    title="انقر لتكبير ومعاينة النسيج"
                  >
                    <img
                      src={pillar.tapestryImg}
                      alt={pillar.nameAr}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/tap:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/tap:opacity-100 flex items-center justify-center transition-opacity">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div
                        onClick={() => setLightboxImg({ src: pillar.typoImg, title: `مخطوطة ${pillar.nameAr}` })}
                        className="cursor-pointer"
                        title="انقر لمعاينة المخطوطة"
                      >
                        <img
                          src={pillar.typoImg}
                          alt={pillar.nameAr}
                          loading="lazy"
                          className="h-8 w-auto object-contain hover:scale-105 transition-transform"
                        />
                      </div>
                      <a
                        href={pillar.typoImg}
                        download={`مخطوطة-${pillar.nameAr}-96.webp`}
                        onClick={(e) => {
                          e.stopPropagation()
                          triggerDownloadFeedback(`مخطوطة ${pillar.nameAr}`)
                        }}
                        className="w-7 h-7 rounded-lg bg-black/50 hover:bg-zinc-800 text-[#D4AF37] hover:text-white border border-zinc-700 flex items-center justify-center text-xs transition-colors shrink-0"
                        title="تحميل المخطوطة مباشرة"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <h4 className="text-base font-black text-white">{pillar.nameAr}</h4>
                    <p className="text-xs text-zinc-400">{pillar.sub}</p>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {pillar.desc}
                </p>
              </div>

              {/* 4 Pattern Mini Gallery */}
              <div className="pt-3 border-t border-zinc-800 mt-auto">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-bold mb-2">
                  <span>أنماط وأيقونات الركيزة (HD):</span>
                  <span className="font-mono text-[10px] text-zinc-500">4 عناصر</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {pillar.patterns.map((pat, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImg({ src: pat.src, title: pat.title })}
                      className="group/pat relative aspect-square rounded-lg overflow-hidden border border-zinc-800 bg-black/40 hover:border-[#D4AF37] transition-all cursor-pointer"
                      title={pat.title}
                    >
                      <img
                        src={pat.src}
                        alt={pat.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/pat:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/pat:opacity-100 flex items-center justify-center text-white text-xs transition-opacity">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Color Palette Summary */}
        <div id="colors-and-elements" className="scroll-mt-32 mt-10 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-zinc-300 font-bold">
            <Palette className="w-4 h-4 text-[#D4AF37]" />
            <span>لوحة ألوان الهوية الرسمية (HEX Codes):</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => copyHex("#006C35")}
              className="inline-flex items-center gap-1.5 bg-[#006C35]/30 hover:bg-[#006C35] border border-[#006C35] text-white px-2.5 py-1 rounded-md font-mono transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#006C35]" /> #006C35 الأخضر
            </button>
            <button
              type="button"
              onClick={() => copyHex("#D4AF37")}
              className="inline-flex items-center gap-1.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37] border border-[#D4AF37] text-white px-2.5 py-1 rounded-md font-mono transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" /> #D4AF37 الذهبي
            </button>
            {PILLARS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => copyHex(p.hex)}
                className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 px-2.5 py-1 rounded-md font-mono transition-colors"
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.hex }} />
                {p.hex} {p.nameAr.replace("عزّنا ب", "")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vision Studio Showcase («عزّنا برؤيتنا» Vision Kit) */}
      <div id="section-vision-kit" className="scroll-mt-32 my-16 bg-gradient-to-br from-[#021f1d] via-zinc-900 to-zinc-900 border-2 border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-black px-4 py-1.5 rounded-full mb-3">
            <Compass className="w-3.5 h-3.5" /> استوديو ملحقات الهوية الرسمية — Vision Kit
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            ملحقات وهوية «عزّنا برؤيتنا» — سجاد اليوم الوطني 96، الوشاح ثلاثي الأبعاد، وعناصر التصميم
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            استعراض شامل لكافة عناصر وملحقات ملف الهوية الرسمي <span className="text-[#D4AF37] font-bold font-mono">Vision.pdf</span> المعتمد من الهيئة العامة للترفيه لليوم الوطني 96.
          </p>
        </div>

        {/* Studio Scene & Central Scarf */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {VISION_STUDIO_ASSETS.map((asset, idx) => (
            <div
              key={idx}
              className="bg-black/40 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-md border border-[#D4AF37]/30">
                    {asset.badge}
                  </span>
                </div>
                <div
                  onClick={() => setLightboxImg({ src: asset.img, title: asset.title })}
                  className="aspect-video sm:aspect-square rounded-xl overflow-hidden bg-black/60 border border-zinc-800 mb-4 cursor-pointer relative"
                  title="انقر لتكبير ومعاينة الصورة"
                >
                  <img
                    src={asset.img}
                    alt={asset.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="bg-black/80 text-white border border-[#D4AF37]/50 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> تكبير الصورة
                    </span>
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white mb-2">{asset.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">{asset.desc}</p>
              </div>

              <a
                href={asset.img}
                download={`${asset.title}.webp`}
                onClick={() => triggerDownloadFeedback(asset.title)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" /> تحميل عالي الدقة (HD)
              </a>
            </div>
          ))}
        </div>

        {/* 4 Flat Heritage Tapestries (سجاد اليوم الوطني 96) */}
        <div className="mb-10">
          <h4 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            أنماط سجاد اليوم الوطني 96 التراثية الأربعة
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {VISION_CARPETS.map((carpet) => (
              <div
                key={carpet.id}
                onClick={() => setLightboxImg({ src: carpet.src, title: carpet.title })}
                className="group bg-black/40 border border-zinc-800 hover:border-[#D4AF37] rounded-xl p-3 flex flex-col justify-between cursor-pointer transition-all"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-black mb-2.5 relative">
                  <img
                    src={carpet.src}
                    alt={carpet.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h5 className="text-[11px] sm:text-xs font-bold text-zinc-200 line-clamp-2 leading-tight mb-2">
                  {carpet.title}
                </h5>
                <a
                  href={carpet.src}
                  download={`سجاد-اليوم-الوطني-96-نمط-${carpet.id}.webp`}
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerDownloadFeedback(carpet.title)
                  }}
                  className="w-full bg-zinc-800 hover:bg-[#006C35] text-white text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3 h-3" /> تحميل
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Cutout Transparent PNG Elements */}
        <div>
          <h4 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
            عناصر فنية مفرغة PNG (بدون خلفية)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {VISION_CUTOUTS.map((cutout, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg({ src: cutout.src, title: cutout.title })}
                className="group bg-black/40 border border-zinc-800 hover:border-[#4ade80] rounded-xl p-3 flex flex-col justify-between cursor-pointer transition-all text-center"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-zinc-950/80 mb-2.5 relative flex items-center justify-center p-2">
                  <img
                    src={cutout.src}
                    alt={cutout.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h5 className="text-[11px] sm:text-xs font-black text-white">{cutout.title}</h5>
                <p className="text-[10px] text-zinc-400 mb-2">{cutout.sub}</p>
                <a
                  href={cutout.src}
                  download={`${cutout.title}.webp`}
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerDownloadFeedback(cutout.title)
                  }}
                  className="w-full bg-[#006C35]/30 hover:bg-[#006C35] text-[#4ade80] hover:text-white border border-[#006C35]/40 text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3 h-3" /> مفرغ PNG
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coloring Section for Kids & Schools (رسومات وتلوين اليوم الوطني 96) */}
      <div id="section-coloring" className="scroll-mt-32 my-16 bg-gradient-to-br from-pink-950/20 via-zinc-900 to-zinc-900 border border-pink-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-pink-500/20">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Paintbrush className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                رسومات وتلوين اليوم الوطني السعودي 96 للأطفال والمدارس
              </h2>
              <span className="hidden sm:inline-block text-[11px] bg-pink-500/20 border border-pink-500/30 text-pink-300 font-bold px-2.5 py-0.5 rounded-full">
                طباعة A4 جاهزة
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              رسومات وشعار مفرغ للتلوين بالخط الخارجي (Outline) بدقة فائقة لمشاريع المدارس والأنشطة الطلابية
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
          نوفر للمعلمين والمعلمات وأولياء الأمور مجموعة حصرية وشاملة من <strong>رسومات اليوم الوطني 96</strong> الجاهزة للطباعة بجودة عالية A4. تتضمن المجموعة <strong>شعار اليوم الوطني 96 مفرغ للتلوين (أبيض وأسود Outline)</strong>، ورسمات لعلم المملكة العربية السعودية والسيفين والنخلة، و<strong>كراسة أنشطة وتلوين اليوم الوطني 96 للمدارس</strong> مقاس A4 بدقة 300 DPI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Outline Logo */}
          <div className="bg-black/50 border border-zinc-800 hover:border-pink-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all group">
            <div>
              <div
                onClick={() => setLightboxImg({ src: "https://a-amaq.com/assets/national-day-96/Outline.png", title: "شعار عزنا بطبعنا للتلوين (Outline)" })}
                className="aspect-square rounded-xl bg-white p-4 flex items-center justify-center mb-4 cursor-pointer relative"
              >
                <img
                  src="https://a-amaq.com/assets/national-day-96/Outline.png"
                  alt="شعار عزنا بطبعنا للتلوين"
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-2 right-2 bg-zinc-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  A4 أبيض وأسود
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white mb-1">شعار عزنا بطبعنا للتلوين (Outline)</h4>
              <p className="text-xs text-zinc-400 mb-4">رسم وتلوين شعار اليوم الوطني 96 مفرغ عالي الدقة</p>
            </div>
            <div className="flex gap-2">
              <a
                href="https://a-amaq.com/assets/national-day-96/outline.zip"
                download="شعار-عزنا-بطبعنا-96-تلوين-outline.zip"
                onClick={() => triggerDownloadFeedback("شعار التلوين ZIP")}
                className="flex-1 bg-[#006C35] hover:bg-[#005228] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> تحميل ZIP
              </a>
              <a
                href="https://a-amaq.com/assets/national-day-96/Outline.png"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center transition-colors shrink-0"
                title="طباعة"
              >
                <Printer className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Flag & Crest */}
          <div className="bg-black/50 border border-zinc-800 hover:border-pink-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all group">
            <div>
              <div
                onClick={() => setLightboxImg({ src: "https://a-amaq.com/assets/national-day-96/saudi-flag-crest-coloring.jpeg", title: "رسم علم السعودية والسيفين والنخلة للتلوين" })}
                className="aspect-square rounded-xl bg-white p-4 flex items-center justify-center mb-4 cursor-pointer relative"
              >
                <img
                  src="https://a-amaq.com/assets/national-day-96/saudi-flag-crest-coloring.jpeg"
                  alt="رسم علم السعودية والسيفين للتلوين"
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-2 right-2 bg-zinc-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  علم وسيفين
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white mb-1">رسم علم السعودية والسيفين والنخلة</h4>
              <p className="text-xs text-zinc-400 mb-4">رسمة سهلة وبسيطة لطلاب الروضة والابتدائي</p>
            </div>
            <div className="flex gap-2">
              <a
                href="https://a-amaq.com/assets/national-day-96/saudi-flag-crest-coloring.jpeg"
                download="رسم-علم-السعودية-للتلوين.jpeg"
                onClick={() => triggerDownloadFeedback("رسم علم السعودية")}
                className="flex-1 bg-[#006C35] hover:bg-[#005228] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> تحميل الرسمة
              </a>
              <a
                href="https://a-amaq.com/assets/national-day-96/saudi-flag-crest-coloring.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center transition-colors shrink-0"
                title="طباعة"
              >
                <Printer className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: School Activity Booklet PDF */}
          <div className="bg-black/50 border border-zinc-800 hover:border-pink-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all group">
            <div>
              <div className="aspect-square rounded-xl bg-gradient-to-tr from-pink-950/40 to-rose-950/40 border border-pink-500/30 p-4 flex flex-col items-center justify-center text-center mb-4 relative">
                <FileText className="w-14 h-14 text-rose-400 mb-2" />
                <span className="block text-sm font-black text-white">كراسة تلوين 96</span>
                <span className="block text-[11px] text-zinc-400">أنشطة مدرسية ومسابقات</span>
                <span className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  PDF · 1.9MB
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white mb-1">كراسة أنشطة وتلوين اليوم الوطني 96</h4>
              <p className="text-xs text-zinc-400 mb-4">أوراق عمل متكاملة جاهزة للطباعة والتوزيع المدرسي</p>
            </div>
            <div className="flex gap-2">
              <a
                href="https://a-amaq.com/assets/national-day-96/كراسة-أنشطة-وتلوين-اليوم-الوطني-96.pdf"
                download="كراسة-أنشطة-وتلوين-اليوم-الوطني-96.pdf"
                onClick={() => triggerDownloadFeedback("كراسة التلوين PDF")}
                className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> تحميل PDF
              </a>
              <a
                href="https://a-amaq.com/assets/national-day-96/كراسة-أنشطة-وتلوين-اليوم-الوطني-96.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center transition-colors shrink-0"
                title="تصفح"
              >
                <Eye className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Official Fonts Suite (خطوط وزارة الثقافة) */}
      <div id="section-fonts" className="scroll-mt-32 my-16 bg-gradient-to-br from-[#00381e] via-zinc-900 to-zinc-900 border border-[#006C35]/40 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-3.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> وزارة الثقافة السعودية
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            تحميل خطوط اليوم الوطني 96 المعتمدة — 8 خطوط رسمية
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
            الخطوط الرسمية المعتمدة لليوم الوطني من وزارة الثقافة (الخط السعودي الأصيل، الخط الأول، عام الحرف، والمصمك) بصيغتي TTF و OTF للمصممين والمطابع:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {FONTS_LIST.map((font, idx) => (
            <a
              key={idx}
              href={font.link}
              download
              onClick={() => triggerDownloadFeedback(font.name)}
              className="bg-black/40 hover:bg-zinc-850 border border-zinc-800 hover:border-[#4ade80] rounded-xl p-4 text-center transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#006C35]/20 text-[#4ade80] flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#4ade80] transition-colors">
                  {font.name}
                </h4>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{font.nameEn}</p>
                <span className="inline-block text-[10px] text-zinc-400 font-mono mt-2 bg-zinc-900 px-2 py-0.5 rounded">
                  {font.size}
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-center gap-1.5 text-xs text-[#D4AF37] group-hover:text-white font-bold">
                <Download className="w-3 h-3" /> تحميل الخط
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Official Audio Player (أغاني اليوم الوطني 96 الرسمية) */}
      <div id="songs-section" className="scroll-mt-32 my-16 bg-gradient-to-b from-[#1b1740] to-zinc-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3.5 py-1 rounded-full mb-2">
            <Music className="w-3.5 h-3.5" /> الأغاني الوطنية الرسمية MP3
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            مشغل أغاني اليوم الوطني السعودي 96 (استماع وتحميل مباشر)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1">
            استمع مباشرة للأغاني الوطنية الرسمية وحمّلها بصيغة MP3 للاحتفالات المدرسية والفعاليات
          </p>
        </div>

        {/* Player Bar */}
        <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-zinc-800 p-5 mb-6 max-w-xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center text-lg shadow-lg hover:scale-105 transition-all"
                title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
              <div>
                <h4 className="text-base font-black text-white">
                  {SONGS_PLAYLIST[currentTrackIndex].title}
                </h4>
                <p className="text-xs text-zinc-400">
                  {SONGS_PLAYLIST[currentTrackIndex].titleEn} · اليوم الوطني 96
                </p>
              </div>
            </div>
            <a
              href={SONGS_PLAYLIST[currentTrackIndex].src}
              download={`${SONGS_PLAYLIST[currentTrackIndex].title}.mp3`}
              onClick={() => triggerDownloadFeedback(SONGS_PLAYLIST[currentTrackIndex].title)}
              className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-cyan-500 hover:text-black text-zinc-300 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> تحميل MP3
            </a>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-cyan-500 h-full transition-all duration-200"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        </div>

        {/* Playlist Items */}
        <div className="max-w-xl mx-auto space-y-2">
          {SONGS_PLAYLIST.map((song, idx) => (
            <div
              key={idx}
              onClick={() => selectTrack(idx)}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                currentTrackIndex === idx
                  ? "bg-cyan-950/30 border-cyan-500/50 text-white"
                  : "bg-black/30 border-zinc-800 text-zinc-300 hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-mono text-cyan-400">
                  {idx + 1}
                </span>
                <div>
                  <h5 className="text-sm font-black text-white">{song.title}</h5>
                  <span className="text-[10px] text-zinc-400 font-mono">{song.titleEn}</span>
                </div>
              </div>
              <a
                href={song.src}
                download={`${song.title}.mp3`}
                onClick={(e) => {
                  e.stopPropagation()
                  triggerDownloadFeedback(song.title)
                }}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-cyan-500 hover:text-black text-zinc-400 flex items-center justify-center transition-colors"
                title="تحميل"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Tag Studio Custom Corporate Design Services Banner (B2B Authority) */}
      <div className="my-16 bg-gradient-to-br from-[#00381e] via-[#002615] to-black border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-zinc-800">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-black px-3.5 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" /> خدمات تاج ستوديو للشركات والمصانع السعودية
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                هل تستعد شركتك لموسم اليوم الوطني 96؟ صمم حملتك مع تاج ستوديو
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                يُعد موسم اليوم الوطني السعودي الحدث التسويقي والتجاري الأضخم سنوياً في المملكة. نحن في <strong>تاج ستوديو</strong> نساعد الشركات والمصانع والمؤسسات الكبرى على تحويل الهوية الوطنية إلى حضور بصري استثنائي:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-200 pt-2 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4ade80] shrink-0" /> تصميم هدايا وتوزيعات الشركات الفاخرة
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4ade80] shrink-0" /> تخصيص بروفايل الشركة (Company Profile) بالثيم الوطني
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4ade80] shrink-0" /> تصاميم وإعلانات السوشيال ميديا والحملات الترويجية
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4ade80] shrink-0" /> بنرات وأعلام وتجهيزات المعارض والفعاليات
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/services/company-profile-design"
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-yellow-500 text-black font-black text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all text-center"
              >
                <span>استكشف خدمة بروفايل الشركات</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 bg-zinc-850 hover:bg-zinc-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl border border-zinc-700 transition-all text-center"
              >
                <span>شاهد أعمالنا ودراسات الحالة</span>
              </Link>
            </div>
          </div>

          {/* Quick WhatsApp Inquiry Form */}
          <div className="bg-black/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6">
            <h4 className="text-sm sm:text-base font-black text-white mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" /> هل تحتاج إلى تصاميم مخصصة أو ملحقات إضافية؟ تواصل معنا فوراً
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              اكتب طلبك وسيقوم فريق تاج ستوديو بالتواصل معك مباشرة عبر واتساب لتقديم الاستشارة وعرض العمل:
            </p>

            <form onSubmit={handleWhatsAppSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="اسمك أو اسم شركتك *"
                value={waName}
                onChange={(e) => setWaName(e.target.value)}
                required
                className="bg-zinc-900 border border-zinc-700 px-4 py-2.5 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="text"
                placeholder="تفاصيل التصاميم التي تحتاجها (بروفايل، سوشيال ميديا، هدايا...) *"
                value={waDetails}
                onChange={(e) => setWaDetails(e.target.value)}
                required
                className="bg-zinc-900 border border-zinc-700 px-4 py-2.5 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="bg-[#25D366] hover:bg-[#1ebe5d] text-black font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> إرسال الطلب عبر واتساب
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section (AEO/GEO & Snippets) */}
      <div className="my-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-3.5 py-1 rounded-full mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> الأسئلة الشائعة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            كل ما تريد معرفته عن هوية اليوم الوطني السعودي 96
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-right p-4 sm:p-5 font-black text-sm sm:text-base text-zinc-100 flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-black/40">
              <h4 className="text-sm sm:text-base font-black text-white truncate max-w-md">
                {lightboxImg.title}
              </h4>
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/80">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.title}
                className="max-h-[70vh] max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-black/40 flex items-center justify-between gap-4">
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline-block">
                هوية اليوم الوطني السعودي 96
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxImg.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                >
                  فتح بالحجم الكامل
                </a>
                <a
                  href={lightboxImg.src}
                  download={`${lightboxImg.title}.webp`}
                  onClick={() => triggerDownloadFeedback(lightboxImg.title)}
                  className="bg-[#D4AF37] hover:bg-[#c49f2e] text-black text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> تحميل الصورة
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Download Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#006C35] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#4ade80]/40 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <Check className="w-5 h-5 text-[#D4AF37]" />
          <div className="text-xs">
            <span className="block font-black">بدأ تحميل الملف بنجاح!</span>
            <span className="text-zinc-200">{downloadToast}</span>
          </div>
        </div>
      )}
    </div>
  )
}
