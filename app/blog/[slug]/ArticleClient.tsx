"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { BlogPost } from "@/lib/blogData"

// ✅ دالة ذكية لاستبدال التاجات (مثل [صح] أو [تحذير] أو [نجمة]) بأيقونات SVG تفاعلية فورية دون الحاجة لرفع صور
const replaceIcons = (text: string): React.ReactNode => {
  if (!text) return ""
  
  // تقسيم النص بناءً على وجود الأقواس المربعة
  const parts = text.split(/(\[[a-zA-Z0-9\u0600-\u06FF]+\])/g)
  return parts.map((part, index) => {
    if (part.startsWith("[") && part.endsWith("]")) {
      const tag = part.slice(1, -1).toLowerCase()
      switch (tag) {
        case "check":
        case "صح":
          return (
            <span key={index} className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mx-1 align-middle flex-shrink-0">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )
        case "star":
        case "نجمة":
          return (
            <span key={index} className="inline-flex items-center justify-center w-5 h-5 text-amber-500 mx-1 align-middle flex-shrink-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
              </svg>
            </span>
          )
        case "warning":
        case "تحذير":
          return (
            <span key={index} className="inline-flex items-center justify-center w-5 h-5 text-rose-500 mx-1 align-middle flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          )
        case "info":
        case "معلومات":
          return (
            <span key={index} className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 mx-1 align-middle flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01M12 12h.01M12 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          )
        case "idea":
        case "فكرة":
          return (
            <span key={index} className="inline-flex items-center justify-center w-5 h-5 text-yellow-500 mx-1 align-middle flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </span>
          )
        case "target":
        case "هدف":
          return (
            <span key={index} className="inline-flex items-center justify-center w-5 h-5 text-red-500 mx-1 align-middle flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
          )
        default:
          return part
      }
    }
    return part
  })
}

interface Props {
  post: BlogPost
}

interface HeadingItem {
  id: string
  text: string
}

export default function ArticleClient({ post }: Props) {
  const [activeHeading, setActiveHeading] = useState<string>("")
  const [headings, setHeadings] = useState<HeadingItem[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // ✅ Calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ✅ Parse headings dynamically from content for Table of Contents
  useEffect(() => {
    if (!post.content) return

    const lines = post.content.split("\n")
    const extractedHeadings: HeadingItem[] = []

    lines.forEach((line, index) => {
      const trimmed = line.trim()
      if (!trimmed) return

      // Heading detection matching the formatter logic (excluding numbered lists which are processed as cards)
      const isHeading = 
        (trimmed.length < 90 && (
          trimmed.endsWith(":") || 
          trimmed.startsWith("السر") || 
          trimmed.startsWith("الخطوة") || 
          trimmed.startsWith("لماذا") || 
          trimmed.startsWith("ما هي") || 
          trimmed.startsWith("أخطاء") ||
          trimmed.startsWith("أولاً") ||
          trimmed.startsWith("ثانياً") ||
          trimmed.startsWith("ثالثاً") ||
          trimmed.startsWith("رابعاً") ||
          trimmed.startsWith("خامساً")
        )) && !/^[١٢٣٤٥٦٧٨٩\d]+\./.test(trimmed)

      if (isHeading) {
        const text = trimmed.replace(/:$/, "")
        extractedHeadings.push({
          id: `heading-${index}`,
          text,
        })
      }
    })

    setHeadings(extractedHeadings)
  }, [post.content])

  // ✅ Active heading scroll tracker
  useEffect(() => {
    const handleObserver = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean)
      
      let currentActive = ""
      for (const el of headingElements) {
        const rect = el!.getBoundingClientRect()
        if (rect.top <= 140) {
          currentActive = el!.id
        }
      }
      setActiveHeading(currentActive || (headings[0]?.id || ""))
    }

    window.addEventListener("scroll", handleObserver)
    return () => window.removeEventListener("scroll", handleObserver)
  }, [headings])

  // ✅ Smooth scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 110,
        behavior: "smooth",
      })
    }
  }

  // 1. Definition of the Logo Colors based on the Tag Studio brand identity
  const logoColors = [
    { primary: "blue-600", border: "border-blue-500", text: "text-blue-600 dark:text-blue-400", bgLight: "bg-blue-500/10", borderLight: "border-blue-500/20", hover: "hover:border-blue-500/30", check: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400" },
    { primary: "cyan-500", border: "border-cyan-500", text: "text-cyan-600 dark:text-cyan-400", bgLight: "bg-cyan-500/10", borderLight: "border-cyan-500/20", hover: "hover:border-cyan-500/30", check: "bg-cyan-500/10 border-cyan-500/25 text-cyan-600 dark:text-cyan-400" },
    { primary: "amber-500", border: "border-amber-500", text: "text-amber-600 dark:text-amber-400", bgLight: "bg-amber-500/10", borderLight: "border-amber-500/20", hover: "hover:border-amber-500/30", check: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400" },
    { primary: "rose-500", border: "border-rose-500", text: "text-rose-600 dark:text-rose-400", bgLight: "bg-rose-500/10", borderLight: "border-rose-500/20", hover: "hover:border-rose-500/30", check: "bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400" }
  ]

  // 2. Map Category to primary brand theme color
  const getCategoryTheme = (category: string) => {
    const c = category ? category.trim() : ""
    if (c === "تصميم") return logoColors[3] // Rose/Purple
    if (c === "تعليمي") return logoColors[0] // Blue
    if (c === "تقني") return logoColors[1] // Cyan
    return logoColors[2] // Amber/Orange as default for tips ("نصائح")
  }

  const theme = getCategoryTheme(post.category)

  // Selection class based on category
  const selectionClass = 
    theme.primary === "rose-500" ? "selection:bg-rose-500/20" : 
    theme.primary === "blue-600" ? "selection:bg-blue-500/20" : 
    theme.primary === "cyan-500" ? "selection:bg-cyan-500/20" : 
    "selection:bg-amber-500/20"

  // 3. Custom Callout Styles based on type
  const getCalloutStyles = (line: string) => {
    if (line.startsWith("تحذير:")) {
      return {
        border: "border-rose-500",
        bg: "bg-rose-500/[0.04]",
        text: "text-rose-600 dark:text-rose-400",
      }
    }
    if (line.startsWith("قاعدة ذهبية:") || line.startsWith("فكرة:") || line.startsWith("نصيحة:")) {
      return {
        border: "border-amber-500",
        bg: "bg-amber-500/[0.04]",
        text: "text-amber-600 dark:text-amber-400",
      }
    }
    if (line.startsWith("نتيجة الاتساق:") || line.startsWith("معلومات:")) {
      return {
        border: "border-cyan-500",
        bg: "bg-cyan-500/[0.04]",
        text: "text-cyan-600 dark:text-cyan-400",
      }
    }
    return {
      border: theme.border,
      bg: theme.bgLight.replace("/10", "/[0.04]"),
      text: theme.text,
    }
  }

  // ✅ Dynamic Line-by-Line Content Formatter (Looka Style & High Contrast Typography)
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n")
    const renderedElements: React.ReactNode[] = []
    let currentListItems: string[] = []

    // Helper to output accumulated list items
    const flushList = (key: string | number) => {
      if (currentListItems.length > 0) {
        renderedElements.push(
          <ul key={`list-${key}`} className="space-y-4 my-6 pr-6 list-none">
            {currentListItems.map((item, i) => {
              const hasBoldPart = item.includes(":")
              if (hasBoldPart) {
                const [boldText, normalText] = item.split(":")
                return (
                  <li key={i} className="flex items-start gap-3 text-[17px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-loose">
                    <span className={`mt-2.5 text-xs flex-shrink-0 ${theme.text.split(" ")[0]}`}>●</span>
                    <p>
                      <strong className="text-neutral-900 dark:text-neutral-100 font-bold">{boldText}:</strong>
                      {replaceIcons(normalText)}
                    </p>
                  </li>
                )
              }
              return (
                <li key={i} className="flex items-start gap-3 text-[17px] md:text-[18px] text-neutral-700 dark:text-neutral-300 leading-loose">
                  <span className={`mt-2.5 text-xs flex-shrink-0 ${theme.text.split(" ")[0]}`}>●</span>
                  <span>{replaceIcons(item)}</span>
                </li>
              )
            })}
          </ul>
        )
        currentListItems = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) {
        flushList(i)
        continue
      }

      // 1. Heading Formatting (Cycles through Logo colors)
      const isHeading = 
        (line.length < 90 && (
          line.endsWith(":") || 
          line.startsWith("السر") || 
          line.startsWith("الخطوة") || 
          line.startsWith("لماذا") || 
          line.startsWith("ما هي") || 
          line.startsWith("أخطاء") ||
          line.startsWith("أولاً") ||
          line.startsWith("ثانياً") ||
          line.startsWith("ثالثاً") ||
          line.startsWith("رابعاً") ||
          line.startsWith("خامساً")
        )) && !/^[١٢٣٤٥٦٧٨٩\d]+\./.test(line)

      if (isHeading) {
        flushList(i)
        const cleanText = line.replace(/:$/, "")
        // Alternate headings through logo colors
        const headingColorClass = logoColors[renderedElements.length % logoColors.length].border
        renderedElements.push(
          <h2 
            key={`h2-${i}`} 
            id={`heading-${i}`}
            className={`text-[24px] md:text-[30px] font-black text-neutral-900 dark:text-neutral-100 mt-12 mb-6 pt-4 border-r-[5px] ${headingColorClass} pr-4 scroll-mt-28 leading-snug font-outfit`}
          >
            {cleanText}
          </h2>
        )
        continue
      }

      // 2. Numbered Options Formatting (Looka Style - Option Card with Green/Alternating Checkmark)
      const numberedMatch = line.match(/^([١٢٣٤٥٦٧٨٩\d]+)\.\s*(.*)/)
      if (numberedMatch) {
        flushList(i)
        const optionTitle = line

        // Lookahead to pull description block inside the card
        let description = ""
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim()
          const isNextLineSpecial = 
            (nextLine.length < 90 && (
              nextLine.endsWith(":") || 
              nextLine.startsWith("السر") || 
              nextLine.startsWith("الخطوة") || 
              nextLine.startsWith("لماذا") || 
              nextLine.startsWith("ما هي") || 
              nextLine.startsWith("أخطاء") ||
              nextLine.startsWith("أولاً") ||
              nextLine.startsWith("ثانياً")
            )) || 
            /^[١٢٣٤٥٦٧٨٩\d]+\./.test(nextLine) ||
            nextLine.startsWith("-") || 
            nextLine.startsWith("*") ||
            !nextLine

          if (!isNextLineSpecial) {
            description = nextLine
            i++ // Skip next line in iteration
          }
        }

        // Cycle option cards style using logo colors
        const cardTheme = logoColors[i % logoColors.length]

        renderedElements.push(
          <div 
            key={`option-${i}`} 
            className={`my-8 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 ${cardTheme.hover} transition-all duration-300 shadow-sm`}
          >
            <div className="flex items-start gap-4">
              {/* Clean Checkmark Circle colored by logo theme */}
              <div className={`flex-shrink-0 w-7 h-7 rounded-full ${cardTheme.check} flex items-center justify-center mt-1`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-[22px] font-extrabold text-neutral-900 dark:text-neutral-100 mb-3 leading-snug">
                  {optionTitle}
                </h3>
                {description && (
                  <p className="text-[16px] md:text-[17px] text-neutral-600 dark:text-neutral-400 leading-relaxed text-justify">
                    {replaceIcons(description)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
        continue
      }

      // 3. Bullet list collection
      if (line.startsWith("-") || line.startsWith("*")) {
        currentListItems.push(line.replace(/^[-*]\s*/, ""))
        continue
      }

      // 4. Callout Box Formatting (Tips / Note / Warning with dynamic semantic border/bg)
      const isCallout = line.startsWith("تحذير:") || line.startsWith("قاعدة ذهبية:") || line.startsWith("نتيجة الاتساق:") || line.startsWith("أولاً:") || line.startsWith("ثانياً:") || line.startsWith("ثالثاً:") || line.startsWith("رابعاً:")
      if (isCallout) {
        flushList(i)
        const colonIndex = line.indexOf(":")
        const title = line.substring(0, colonIndex + 1)
        const text = line.substring(colonIndex + 1).trim()
        const calloutStyle = getCalloutStyles(line)
        
        renderedElements.push(
          <div key={`callout-${i}`} className={`my-8 p-6 rounded-l-2xl border-r-4 ${calloutStyle.border} ${calloutStyle.bg} text-[17px] md:text-[18px] leading-relaxed shadow-sm`}>
            <strong className={`block ${calloutStyle.text} mb-2 font-black text-lg`}>{title}</strong>
            <span className="text-neutral-700 dark:text-neutral-300">{replaceIcons(text)}</span>
          </div>
        )
        continue
      }

      // 5. Embedded Markdown Images
      const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)/)
      if (imageMatch) {
        flushList(i)
        const alt = imageMatch[1]
        const src = imageMatch[2]
        renderedElements.push(
          <div key={`img-${i}`} className="my-10 relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-md group bg-neutral-50/50 dark:bg-neutral-900/30 p-2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image 
                src={src} 
                alt={alt || "Image"} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
              />
            </div>
            {alt && (
              <span className="block text-center text-sm text-neutral-500 mt-3 font-medium">
                {alt}
              </span>
            )}
          </div>
        )
        continue
      }

      // 6. Regular Paragraphs
      flushList(i)
      renderedElements.push(
        <p 
          key={`p-${i}`} 
          className="text-[17px] md:text-[18px] leading-loose text-neutral-700 dark:text-neutral-300 mb-6 text-justify font-normal"
        >
          {replaceIcons(line)}
        </p>
      )
    }

    flushList("end")
    return renderedElements
  }

  return (
    <div className={`min-h-screen bg-background text-foreground pb-24 relative ${selectionClass} font-sans`}>
      {/* 🔴 Multi-Color Scroll Progress Indicator (Full Logo Spectrum) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[4px] bg-muted/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 via-amber-500 to-rose-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        {/* Breadcrumbs (Using Primary Hover) */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-neutral-500/80 mb-8 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">المدونة</Link>
          <span>/</span>
          <span className="hover:text-primary transition-colors cursor-pointer">{post.category}</span>
          <span>/</span>
          <span className="text-neutral-800 dark:text-neutral-200 truncate max-w-[200px] md:max-w-xs">{post.title}</span>
        </nav>

        {/* Title and Intro */}
        <div className="max-w-4xl mb-12">
          {/* Category-Specific Badge Color */}
          <span className={`inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${theme.text} ${theme.bgLight} rounded-full mb-5`}>
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-[52px] font-black text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight md:leading-[1.15] mb-6">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mt-4">
            {post.excerpt}
          </p>

          {/* Author/Date Row (Styled by category theme) */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500/80 mt-8 border-y border-border/50 py-4">
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full ${theme.bgLight} border ${theme.borderLight} flex items-center justify-center font-bold ${theme.text.split(" ")[0]}`}>ت</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">{post.author}</span>
            </div>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>وقت القراءة: {post.readTime} دقائق</span>
          </div>
        </div>

        {/* Large Featured Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border/40 shadow-xl mb-16">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className={`object-cover ${post.image.includes("blog-social") ? "object-center" : "object-top"}`}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/25 to-transparent" />
        </div>

        {/* Two-Column Grid: Left (Sidebar) and Right (Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 🛠️ RIGHT COLUMN: Sticky Table of Contents & CTA (Looka Layout) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 order-last lg:order-first space-y-8">
            
            {/* Table of Contents Box (Active link highlights in respective heading's brand color) */}
            {headings.length > 0 && (
              <div className="p-6 rounded-2xl border border-border/60 bg-neutral-50/50 dark:bg-neutral-900/30 backdrop-blur-sm shadow-sm">
                <h4 className="text-md font-bold text-neutral-900 dark:text-neutral-100 mb-4 pb-2 border-b border-border/50">
                  فهرس المحتوى
                </h4>
                <nav className="space-y-3">
                  {headings.map((heading, idx) => {
                    const isActive = activeHeading === heading.id
                    const activeColorClass = logoColors[idx % logoColors.length].text
                    const activeBorderClass = logoColors[idx % logoColors.length].border
                    return (
                      <button
                        key={heading.id}
                        onClick={() => scrollToHeading(heading.id)}
                        className={`block w-full text-right text-[15px] transition-all duration-200 py-1.5 border-r-2 pr-3 -mr-[2px] ${
                          isActive 
                            ? `${activeBorderClass} ${activeColorClass} font-bold translate-x-[-4px]` 
                            : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                        }`}
                      >
                        {heading.text}
                      </button>
                    )
                  })}
                </nav>
              </div>
            )}

            {/* Premium Multi-Color Accent CTA for Services */}
            <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-neutral-50/50 to-transparent dark:from-neutral-900/30 dark:to-transparent shadow-md relative overflow-hidden text-center hover:border-blue-500/20 transition-all duration-500">
              {/* Premium top accent line with logo color spectrum */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-500 via-amber-500 to-rose-500" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
              <h4 className="text-xl font-black text-neutral-900 dark:text-neutral-100 mb-3 leading-snug">هل تريد تصميم شعار وهوية بصرية تُميّزك حقاً؟</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                فريق تاج ستوديو يساعدك في تحويل فكرة مشروعك إلى علامة تجارية قوية وجذابة تجذب عملائك المثاليين.
              </p>
              <a 
                href="https://wa.me/201009215131" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.01]"
              >
                تحدث مع خبير تصميم 💬
              </a>
            </div>

            {/* Share Buttons */}
            <div className="p-6 rounded-2xl border border-border/60 bg-neutral-50/50 dark:bg-neutral-900/30 backdrop-blur-sm text-center">
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">مشاركة المقال</span>
              <div className="flex items-center justify-center gap-3">
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)}
                  className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  فيس بوك
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    alert("تم نسخ رابط المقال!")
                  }}
                  className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  نسخ الرابط
                </button>
              </div>
            </div>
          </aside>

          {/* 📝 LEFT COLUMN: Main Post Text */}
          <div ref={contentRef} className="lg:col-span-8 flex flex-col">
            {renderFormattedContent(post.content)}
          </div>

        </div>
      </div>
    </div>
  )
}
