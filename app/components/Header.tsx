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
