"use client"
// ✅ "use client" هنا بس — فقط الفلترة اللي تحتاج JavaScript في المتصفح

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BlogCard from "@/components/BlogCard"
import type { BlogPost } from "@/lib/blogData"

interface BlogClientSectionProps {
  posts: BlogPost[]
}

export default function BlogClientSection({ posts }: BlogClientSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    "جميع المقالات",
    ...new Set(posts.map((post) => post.category)),
  ]

  const filteredPosts =
    selectedCategory && selectedCategory !== "جميع المقالات"
      ? posts.filter((post) => post.category === selectedCategory)
      : posts

  return (
    <section className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
      {/* Hero Text — Static HTML for SEO */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          مدونة تاج ستوديو
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          تعرف على آخر اتجاهات التصميم والتسويق الرقمي، واحصل على نصائح
          عملية من خبرائنا.
        </motion.p>
      </div>

      {/* Category Filter Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                category === "جميع المقالات" ? null : category
              )
            }
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category ||
              (selectedCategory === null && category === "جميع المقالات")
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary/20"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-muted-foreground">
            لا توجد مقالات في هذه الفئة حالياً
          </p>
        </motion.div>
      )}
    </section>
  )
}
