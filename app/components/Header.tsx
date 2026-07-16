"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const logoSrc = theme === "dark" ? "/images/logo-dark.png" : "/images/logo.png"

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
        {" "}
        {/* تقليل padding على الشاشات الصغيرة */}
        <div className="flex flex-1 items-center">
          {" "}
          {/* flex-1 على جميع الشاشات ومحاذاة العناصر */}
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">تاج استودیو</span>
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
        <div className="flex gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-12 flex-wrap justify-center">
          {" "}
          {/* مسافات متجاوبة و flex-wrap */}
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            الرئيسية
          </Link>
          <Link
            href="/work"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            الأعمال
          </Link>
          <div className="relative group">
            <button className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1">
              دراسات حالة
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
              <div className="bg-background rounded-xl shadow-lg border border-primary/10 overflow-hidden flex flex-col">
                <Link href="/work/zaatar-w-simsim-brand-identity" className="px-4 py-3 text-sm hover:bg-primary/5 transition-colors border-b border-primary/5">
                  هوية مطعم زعتر وسمسم
                </Link>
                <Link href="/work/ragy-burger-brand-identity" className="px-4 py-3 text-sm hover:bg-primary/5 transition-colors border-b border-primary/5">
                  هوية برجر راجي
                </Link>
                <Link href="/work/agricultural-development-association-brand-identity" className="px-4 py-3 text-sm hover:bg-primary/5 transition-colors">
                  هوية الجمعية الزراعية
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            من نحن
          </Link>
          <Link
            href="/blog"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            المدونة
          </Link>
          <Link
            href="/tools"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            أدواتنا
          </Link>
          <Link
            href="/faq"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            الأسئلة الشائعة
          </Link>
          <Link
            href="/#contact-form"
            scroll={true}
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors whitespace-nowrap"
          >
            تواصل معنا
          </Link>
        </div>
        <div className="flex flex-1 justify-end items-center">
          {" "}
          {/* flex-1 على جميع الشاشات ومحاذاة العناصر */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors mr-2 sm:mr-0" // مسافة على اليمين في RTL
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
