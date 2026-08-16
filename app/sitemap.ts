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
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tasmim-huwiya-basariya-saudi`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]

  // Tools routes
  const toolSlugs = [
    "company-stamp-generator",
    "ads-budget-calculator",
    "ecommerce-calculator",
    "safe-area-previewer",
    "color-contrast-checker",
    "medical-roi-calculator",
    "brand-audit",
    "palette-generator",
    "instagram-grid-splitter"
  ]

  const toolRoutes: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // Locations routes
  const locationSlugs = [
    "riyadh",
    "jeddah",
    "dammam",
    "khobar",
    "mecca",
    "medina",
    "cairo",
    "alexandria"
  ]

  const locationRoutes: MetadataRoute.Sitemap = locationSlugs.map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  // All Published Blog Posts (Filter out future scheduled posts)
  const today = new Date().toISOString().split("T")[0]
  const publishedPosts = blogPosts.filter((post) => post.date <= today)

  const publishedPostRoutes: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Case Studies
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((item) => ({
    url: `${baseUrl}/work/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  // Services
  const serviceRoutes: MetadataRoute.Sitemap = services.map((item) => ({
    url: `${baseUrl}/services/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...locationRoutes,
    ...publishedPostRoutes,
    ...caseStudyRoutes,
    ...serviceRoutes,
  ]
}
