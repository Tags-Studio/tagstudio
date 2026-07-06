"use client"
// ✅ "use client" هنا بس — فقط الفلترة اللي تحتاج JavaScript في المتصفح

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BlogCard from "@/components/BlogCard"
import type { BlogPost } from "@/lib/blogData"
import { Search, SlidersHorizontal, RefreshCw } from "lucide-react"

interface BlogClientSectionProps {
  posts: BlogPost[]
}

export default function BlogClientSection({ posts }: BlogClientSectionProps) {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    "جميع المقالات",
    ...Array.from(new Set(posts.map((post) => post.category))),
  ]

  // Filter posts based on search term and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === "جميع المقالات" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="relative overflow-hidden text-foreground py-16 md:py-24">

      <section className="px-4 max-w-7xl mx-auto relative z-10">
        {/* Hero Text — Static HTML for SEO */}
        <div className="text-center mb-12 space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl font-black text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            مدونة <span className="text-primary">تاج ستوديو</span>
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            تعرف على آخر اتجاهات التصميم والتسويق الرقمي، واحصل على نصائح عملية ومقالات حصرية من خبرائنا.
          </motion.p>
        </div>

        {/* Controls Section: Search & Category Tabs */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input Bar */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث عن مقال (مثال: شعار، هوية، سوشيال ميديا...)"
                className="w-full pl-4 pr-12 py-3 rounded-2xl border border-border bg-card/65 backdrop-blur-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all text-sm font-semibold"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex gap-1.5 p-1 bg-muted/40 border border-border/60 rounded-2xl w-full md:w-auto overflow-x-auto scrollbar-none">
              {categories.map((category) => {
                const isSelected = selectedCategory === category || (selectedCategory === null && category === "جميع المقالات")
                return (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(
                        category === "جميع المقالات" ? null : category
                      )
                    }
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                      isSelected 
                        ? "bg-primary text-white shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-16 bg-card/45 backdrop-blur-md border border-border/60 rounded-3xl space-y-4 max-w-lg mx-auto"
          >
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <SlidersHorizontal className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-foreground">لم نجد أي مقالات متطابقة</h3>
              <p className="text-xs text-muted-foreground">تأكد من كتابة الكلمات بشكل صحيح أو قم بإعادة ضبط البحث.</p>
            </div>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-background hover:bg-accent text-xs font-bold transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>إعادة ضبط التصفية</span>
            </button>
          </motion.div>
        )}
      </section>
    </div>
  )
}

