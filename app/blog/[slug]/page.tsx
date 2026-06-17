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
    keywords: [post.category, "تاج ستوديو", "تصميم", post.title.split(" ").slice(0, 3).join(" ")],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
      locale: "ar_EG",
      siteName: "تاج ستوديو",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
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

  // ✅ Article Schema (JSON-LD) for Rich Results in Google
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://www.wearetagstudio.com${post.image}`,
    "author": {
      "@type": "Organization",
      "name": "تاج ستوديو",
      "url": "https://www.wearetagstudio.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "تاج ستوديو",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.wearetagstudio.com/images/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.wearetagstudio.com/blog/${post.slug}`
    }
  }

  // ✅ Breadcrumb Schema for Google breadcrumb display
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://www.wearetagstudio.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "المدونة",
        "item": "https://www.wearetagstudio.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleClient post={post} />
    </>
  )
}
