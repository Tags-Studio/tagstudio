import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blogData"
import ArticleClient from "@/app/blog/[slug]/ArticleClient"

interface Props {
  params: {
    slug: string
  }
}

const baseUrl = "https://www.wearetagstudio.com"

export const revalidate = 86400

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const today = new Date().toISOString().split("T")[0]
  const post = blogPosts.find((item) => item.slug === params.slug && item.date <= today)

  if (!post) {
    return {}
  }

  const canonical = `${baseUrl}/blog/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      post.category,
      "تاج ستوديو",
      "تصميم",
      ...post.title.split(" ").slice(0, 4),
    ],
    authors: [
      {
        name: "فريق تاج ستوديو",
        url: `${baseUrl}/about`,
      },
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
      type: "article",
      locale: "ar_EG",
      siteName: "تاج ستوديو",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ["فريق تاج ستوديو"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
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
  const post = blogPosts.find((item) => item.slug === params.slug && item.date <= today)

  if (!post) {
    notFound()
  }

  const canonical = `${baseUrl}/blog/${post.slug}`

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [`${baseUrl}${post.image}`],
    inLanguage: "ar",
    author: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "فريق تاج ستوديو",
      url: `${baseUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "تاج ستوديو",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "المدونة",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
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
