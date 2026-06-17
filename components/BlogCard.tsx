import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/lib/blogData"

interface BlogCardProps {
  post: BlogPost
}

const getCategoryStyles = (category: string) => {
  const c = category ? category.trim() : ""
  if (c === "تصميم") {
    return {
      badge: "text-rose-600 bg-rose-500/10 dark:text-rose-450 dark:bg-rose-500/20",
      hoverText: "group-hover:text-rose-500",
    }
  } else if (c === "تعليمي") {
    return {
      badge: "text-blue-600 bg-blue-500/10 dark:text-blue-450 dark:bg-blue-500/20",
      hoverText: "group-hover:text-blue-500",
    }
  } else if (c === "تقني") {
    return {
      badge: "text-cyan-600 bg-cyan-500/10 dark:text-cyan-450 dark:bg-cyan-500/20",
      hoverText: "group-hover:text-cyan-500",
    }
  } else {
    return {
      badge: "text-amber-600 bg-amber-500/10 dark:text-amber-450 dark:bg-amber-500/20",
      hoverText: "group-hover:text-amber-500",
    }
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  const styles = getCategoryStyles(post.category)
  const isSocial = post.image.includes("blog-social")
  const imagePositionClass = isSocial ? "object-center" : "object-top"

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={post.image || "/images/identity.avif"}
            alt={post.title}
            fill
            className={`object-cover ${imagePositionClass} transition-transform duration-500 group-hover:scale-105`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-5 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full mb-3 ${styles.badge}`}>
              {post.category}
            </span>
            <h3 className={`text-lg font-bold line-clamp-2 mb-2 transition-colors ${styles.hoverText}`}>
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
            <span>{post.author}</span>
            <span>{post.readTime} دقائق قراءة</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
