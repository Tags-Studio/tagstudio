import { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blogData"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.wearetagstudio.com"
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tasmim-huwiya-basariya-saudi`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]

  // Filter posts to only include published ones (date <= today)
  const today = new Date().toISOString().split("T")[0]
  const publishedPosts = blogPosts.filter((post) => post.date <= today)

  // Dynamic post routes
  const postRoutes = publishedPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...routes, ...postRoutes]
}
