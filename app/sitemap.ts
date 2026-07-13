import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blogData"
import { caseStudies } from "@/lib/caseStudies"
import { services } from "@/lib/servicesData"

const baseUrl = "https://www.wearetagstudio.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tasmim-huwiya-basariya-saudi`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  const today = new Date().toISOString().split("T")[0]

  const publishedPostRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.date <= today)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((item) => ({
    url: `${baseUrl}/work/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = services.map((item) => ({
    url: `${baseUrl}/services/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    ...staticRoutes,
    ...publishedPostRoutes,
    ...caseStudyRoutes,
    ...serviceRoutes,
  ]
}
