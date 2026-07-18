// ✅ NO "use client" — this is a Server Component for SEO
import type { Metadata } from "next"
import { blogPosts } from "@/lib/blogData"
import BlogClientSection from "@/app/blog/BlogClientSection"

// ✅ SEO Metadata - Google will read this
export const metadata: Metadata = {
  title: "أسرار التسويق والهوية البصرية | مدونة تاج ستوديو لرواد الأعمال 💡",
  description:
    "دليلك الشامل لتصدر السوق! اكتشف أسرار وتكتيكات بناء الهوية البصرية، والموشن جرافيك، ومضاعفة التفاعل على السوشيال ميديا. مقالات حصرية من خبراء تاج ستوديو.",
  keywords: [
    "مدونة تصميم",
    "هوية بصرية",
    "تصميم جرافيك",
    "تصميم سوشيال ميديا",
    "موشن جرافيك",
    "تاج ستوديو",
  ],
  openGraph: {
    title: "مدونة تاج ستوديو | نصائح التصميم والتسويق",
    description:
      "نصائح احترافية في التصميم الجرافيكي والتسويق الرقمي من فريق تاج ستوديو",
    url: "https://www.wearetagstudio.com/blog",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  alternates: {
    canonical: "https://www.wearetagstudio.com/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ✅ Revalidate the page daily to auto-publish scheduled articles
export const revalidate = 86400

// ✅ Server Component — rendered on the server, fully readable by Google
export default function BlogPage() {
  const today = new Date().toISOString().split("T")[0]
  const publishedPosts = blogPosts.filter((post) => post.date <= today)

  return (
    <div className="min-h-screen bg-background">
      {/* 
        ✅ Static H1 rendered on server — Google indexes this immediately
        The BlogClientSection handles interactive filtering on the client
      */}
      <BlogClientSection posts={publishedPosts} />
    </div>
  )
}
