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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
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
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <ArticleClient post={post} />
}
