"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { translations, Language } from "@/lib/i18n/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations["ar"]
  dir: "rtl" | "ltr"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar")

  useEffect(() => {
    // Check saved language or browser preference
    const savedLang = localStorage.getItem("tagstudio_lang") as Language
    if (savedLang && (savedLang === "ar" || savedLang === "en")) {
      setLanguageState(savedLang)
    }
  }, [])

  useEffect(() => {
    // Update HTML element attributes for accessibility and layout direction
    const root = document.documentElement
    if (language === "en") {
      root.dir = "ltr"
      root.lang = "en"
    } else {
      root.dir = "rtl"
      root.lang = "ar"
    }
    localStorage.setItem("tagstudio_lang", language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const dir = language === "en" ? "ltr" : "rtl"
  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Fallback default for static SSR rendering if called outside provider
    return {
      language: "ar" as Language,
      setLanguage: () => {},
      t: translations.ar,
      dir: "rtl" as const,
    }
  }
  return context
}
