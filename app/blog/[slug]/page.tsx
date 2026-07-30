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

function getSeoTitle(title: string): string {
  // If title is already short enough to fit inside 60 characters with layout template (which adds " | تاج ستوديو" -> 13 chars)
  if (title.length <= 47) {
    return title
  }
  
  // Try splitting by common separators like ' — ', ' - ', ' | '
  const separators = [' — ', ' - ', ' | ']
  for (const sep of separators) {
    if (title.includes(sep)) {
      const parts = title.split(sep)
      const firstPart = parts[0].trim()
      if (firstPart.length >= 25 && firstPart.length <= 47) {
        return firstPart
      }
    }
  }
  
  // Truncate cleanly at a space boundary to fit within 47 chars
  const truncated = title.substring(0, 44).trim()
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > 20) {
    return truncated.substring(0, lastSpace).trim() + '...'
  }
  return truncated + '...'
}

function getSeoDescription(description: string): string {
  if (description.length <= 157) {
    return description
  }
  const truncated = description.substring(0, 154).trim()
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > 100) {
    return truncated.substring(0, lastSpace).trim() + '...'
  }
  return truncated + '...'
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const today = new Date().toISOString().split("T")[0]
  const post = blogPosts.find((item) => item.slug === params.slug && item.date <= today)

  if (!post) {
    return {}
  }

  const canonical = `${baseUrl}/blog/${post.slug}`
  const seoTitle = getSeoTitle(post.title)
  const seoDesc = getSeoDescription(post.excerpt)

  return {
    title: seoTitle,
    description: seoDesc,
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
      title: seoTitle,
      description: seoDesc,
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
      title: seoTitle,
      description: seoDesc,
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
