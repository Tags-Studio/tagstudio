import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/*?category=*"],
    },
    sitemap: "https://www.wearetagstudio.com/sitemap.xml",
  }
}
