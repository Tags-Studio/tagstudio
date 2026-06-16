// ✅ NO "use client" — Server Component for SEO
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blogData"
import ArticleClient from "@/app/blog/[slug]/ArticleClient"

interface Props {
  params: {
    slug: string
  }
}

// ✅ Revalidate daily to rebuild pages for newly published articles
export const revalidate = 86400

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const today = new Date().toISOString().split("T")[0]
  const post = blogPosts.find((p) => p.slug === params.slug && p.date <= today)
  if (!post) return {}

  return {
    title: `${post.title} | مدونة تاج ستوديو`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
      locale: "ar_EG",
    },
    alternates: {
      canonical: `https://www.wearetagstudio.com/blog/${post.slug}`,
    },
  }
}

export async function generateStaticParams() {
  const today = new Date().toISOString().split("T")[0]
  return blogPosts
    .filter((post) => post.date <= today)
    .map((post) => ({
      slug: post.slug,
    }))
}

export default function BlogPostPage({ params }: Props) {
  const today = new Date().toISOString().split("T")[0]
  const post = blogPosts.find((p) => p.slug === params.slug && p.date <= today)

  if (!post) {
    notFound()
  }

  return <ArticleClient post={post} />
}
