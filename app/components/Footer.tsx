"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

export default function Footer() {
  const { language, t } = useLanguage()

  const footerLinks = [
    {
      href: "/services/visual-identity",
      label: language === "en" ? "Visual Identity Design" : "تصميم هوية بصرية",
    },
    {
      href: "/services/social-media-design",
      label: language === "en" ? "Social Media Design" : "تصميم السوشيال ميديا",
    },
    {
      href: "/services/packaging-design",
      label: language === "en" ? "Packaging & Box Design" : "تصميم باكنج وتغليف",
    },
    {
      href: "/services/company-profile-design",
      label: language === "en" ? "Company Profile Design" : "تصميم بروفايل شركات",
    },
    {
      href: "/services/motion-graphics",
      label: language === "en" ? "Motion Graphics" : "فيديو موشن جرافيك",
    },
    { href: "/work", label: language === "en" ? "Case Studies" : "دراسات الحالة" },
    { href: "/about", label: t.nav.about },
    { href: "/tools", label: t.nav.tools },
    { href: "/blog", label: t.nav.blog },
    { href: "/faq", label: language === "en" ? "FAQ" : "الأسئلة الشائعة" },
    { href: "/#contact-form", label: t.nav.contact },
    {
      href: "/privacy-policy",
      label: language === "en" ? "Privacy Policy" : "سياسة الخصوصية",
    },
    {
      href: "/cookie-policy",
      label: language === "en" ? "Cookie Policy" : "سياسة ملفات الارتباط",
    },
    {
      href: "/terms",
      label: language === "en" ? "Terms & Conditions" : "الشروط والأحكام",
    },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
        <div className="mb-8 text-center max-w-xl mx-auto">
          <h3 className="font-bold text-lg text-foreground">
            {language === "en" ? "Tag Studio" : "تاج ستوديو"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t.footer.description}
          </p>
        </div>

        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-4 border-t border-border/40 pt-8"
          aria-label="Footer Navigation"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>{t.footer.rights}</p>
          <div className="flex gap-4">
            <span>📍 {t.footer.saudiBranch}</span>
            <span>📍 {t.footer.egyptBranch}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
