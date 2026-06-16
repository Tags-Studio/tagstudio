// ✅ NO "use client" — this is a Server Component for SEO
import type { Metadata } from "next"
import { blogPosts } from "@/lib/blogData"
import BlogClientSection from "@/app/blog/BlogClientSection"

// ✅ SEO Metadata - Google will read this
export const metadata: Metadata = {
  title: "مدونة تاج ستوديو | نصائح التصميم والتسويق الرقمي",
  description:
    "اكتشف أحدث اتجاهات التصميم الجرافيكي، الهوية البصرية، وتصميم السوشيال ميديا. نصائح احترافية من فريق تاج ستوديو لمساعدتك في بناء علامتك التجارية.",
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

// ✅ Server Component — rendered on the server, fully readable by Google
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 
        ✅ Static H1 rendered on server — Google indexes this immediately
        The BlogClientSection handles interactive filtering on the client
      */}
      <BlogClientSection posts={blogPosts} />
    </div>
  )
}
