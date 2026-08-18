"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon, LanguageIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => setMounted(true), [])

  const logoSrc = theme === "dark" ? "/images/logo-dark.png" : "/images/logo.png"

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  return (
    <header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 animate-slide-down"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">تاج استوديو - Tag Studio</span>
            {mounted && (
              <Image
                className="h-8 w-auto"
                src={logoSrc || "/placeholder.svg"}
                alt="شعار تاج ستوديو"
                width={100}
                height={32}
                priority
              />
            )}
          </Link>
        </div>

        <div className="flex gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 flex-wrap justify-center items-center">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            {t.nav.home}
          </Link>

          <div className="relative group">
            <Link
              href="/services"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
            >
              {t.nav.services}
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
              <div className="bg-background rounded-xl shadow-lg border border-primary/10 overflow-hidden flex flex-col">
                <Link href="/services/visual-identity" className="px-4 py-3 text-sm hover:bg-primary/5 transition-colors border-b border-primary/5">
                  {language === "en" ? "Visual Identity Design" : "تصميم هوية بصرية"}
                </Link>
                <Link href="/services/packaging-design" className="px-4 py-3 text-sm hover:bg-primary/5 transition-colors border-b border-primary/5">
                  {language === "en" ? "Packaging & Box Design" : "تصميم باكنج وتغليف"}
                </Link>
                <Link href="/services/company-profile-design" className="px-4 py-3 text-sm hover:bg-primary/5 transition-colors border-b border-primary/5">
                  {language === "en" ? "Company Profile Design" : "تصميم بروفايل شركات"}
                </Link>
                <Link href="/services/social-media-design" className="px-4 py-3 text-sm hover:bg-primary/5 transition-colors border-b border-primary/5">
                  {language === "en" ? "Social Media Design" : "تصميمات السوشيال ميديا"}
                </Link>
                <Link href="/services/motion-graphics" className="px-4 py-3 text-sm hover:bg-primary/5 transition-colors">
                  {language === "en" ? "Motion Graphics Video" : "فيديو موشن جرافيك"}
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/#portfolio-grid"
            scroll={true}
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            {t.nav.work}
          </Link>

          <Link
            href="/work"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            {language === "en" ? "Case Studies" : "دراسات الحالة"}
          </Link>

          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            {t.nav.about}
          </Link>

          <Link
            href="/tools"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            {t.nav.tools}
          </Link>

          <Link
            href="/blog"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            {t.nav.blog}
          </Link>

          <Link
            href="/#contact-form"
            scroll={true}
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            {t.nav.contact}
          </Link>
        </div>

        <div className="flex flex-1 justify-end items-center gap-2">
          {/* Language Switcher Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20"
            title={language === "ar" ? "Switch to English" : "التحويل للغة العربية"}
          >
            <LanguageIcon className="h-4 w-4" />
            <span>{language === "ar" ? "EN" : "عربي"}</span>
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              title={theme === "dark" ? "Light Mode" : "Dark Mode"}
            >
              {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
