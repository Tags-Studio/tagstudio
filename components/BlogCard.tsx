import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/lib/blogData"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={post.image || "/images/identity.avif"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-5 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-amber-600 bg-amber-500/10 rounded-full mb-3">
              {post.category}
            </span>
            <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-amber-500 transition-colors">
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
