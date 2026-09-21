import { NextRequest, NextResponse } from "next/server"

const categoryRedirects: Record<string, string> = {
  "الهوية البصرية": "/services/visual-identity",
  "تصميمات السوشيال ميديا": "/services/social-media-design",
  "تصاميم المطبوعات": "/services/print-design",
  "فيديو موشن جرافيك": "/services/motion-graphics",
}

// Legacy blog slugs redirect map to resolve GSC 404 validation failures
const legacyBlogRedirects: Record<string, string> = {
  "5-hawiyat-basariyah-saudiyah": "/blog/afdal-amthilat-huwiyat-basariya-saudia",
  "afdal-sharikat-tasmim-riyadh": "/blog/afdal-sharikat-tasmim-huwiya-basariya-riyadh",
  "psychology-alwan-alhawiyah": "/blog/psychology-alwan-branding",
  "tasmim-shiaar-ihtirafi": "/blog/tasmim-shiaar-ihtirafi-millions",
  "8-maayer-ekhtiar-studio-tasmim": "/blog/kayf-takhtar-studio-tasmim",
  "anwa-malafat-at-tasmim": "/blog/anwa-malafat-tasmim-png-svg-pdf",
  "10-nasaeh-seo-tasmim-mawqi": "/blog/tasmim-mawqi-seo-google",
  "shiaar-faqat-bidoun-hawiyah": "/blog/shiaar-faqat-bidun-huwiya",
  "alfarq-baina-shiaar-walhawiyah": "/blog/farq-shiaar-huwiya-alama-tijariya",
  "6-alamat-tahdeth-alhawiyah": "/blog/mata-tuhadith-huwiya-basariya",
  "ahamiyat-ux-tasmim-almawqi": "/blog/ahamiyat-tajrubat-al-mustakhdim-ux",
  "kaifa-taktub-brief-tasmim": "/blog/kayfa-taktub-brief-tasmim",
  "shiaar-hawiyah-alamah-tijariyah": "/blog/farq-bayn-shear-huwiya-alama",
  "5-adawat-tasmim-majaniah": "/blog/afdal-adawat-tasmim-majaniya",
  "dalel-ekhtiar-musamim-tasmim": "/blog/kayfa-takhtar-musamim-munasib",
  "taswiq-bilmuhtawa-albasari": "/blog/taswiq-bil-muhtawa-al-mari",
  "akhta-tasmim-ashiaarat": "/blog/akhta-shaiya-tasmim-shiaraat",
  "dalel-tasmim-profile-sharikah": "/blog/dalil-tasmim-profile-sharika",
  "qiyas-najah-hamlat-social": "/blog/qiyas-najah-hamla-social-media",

  // Misdirected service links in articles 179-183
  "company-profile-design-printing-guide-2026": "/services/company-profile-design",
  "social-media-management-strategy-2026": "/services/social-media-design",
  "complete-corporate-visual-identity-guide": "/services/visual-identity",
  "motion-graphics-video-production-guide": "/services/motion-graphics",
  "medical-packaging-and-printing-guide-2026": "/services/packaging-design",
  "corporate-id-card-printing-guide": "/services/print-design",

  // Future scheduled posts linked in live posts
  "custom-product-packaging-printing-guide": "/services/packaging-design",
  "post-print-finishing-packaging-services": "/services/print-design",
  "importing-printed-materials-from-egypt-to-gulf": "/services/print-design",
  "measuring-branding-web-design-roi-2026": "/services/visual-identity",
  "eco-friendly-green-printing-factory-guide-2026": "/services/print-design",
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const decodedPath = decodeURIComponent(pathname)

  // Redirect any Arabic or alternate URL variations of National Day 96 to the dedicated tool page
  if (
    pathname !== "/tools/saudi-national-day-96-identity" &&
    (decodedPath.includes("اليوم-الوطني-96") ||
     decodedPath.includes("اليوم-الوطني-السعودي-96") ||
     pathname === "/tools/saudi-national-day-96" ||
     pathname === "/tools/nd96")
  ) {
    return NextResponse.redirect(new URL("/tools/saudi-national-day-96-identity", request.url), 308)
  }

  // Redirect Khobar location (which previously returned 404 in sitemap) to Dammam
  if (pathname === "/locations/khobar" || pathname === "/locations/khobar/") {
    return NextResponse.redirect(new URL("/locations/dammam", request.url), 301)
  }

  // Redirect legacy or broken blog slugs to active canonical URLs
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "")
    const destination = legacyBlogRedirects[slug]
    if (destination) {
      return NextResponse.redirect(new URL(destination, request.url), 301)
    }
  }

  if (pathname !== "/") {
    return NextResponse.next()
  }

  const category = searchParams.get("category")
  const destination = category ? categoryRedirects[category] : undefined

  if (!destination) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(destination, request.url), 301)
}

export const config = {
  matcher: [
    "/",
    "/tools/:path*",
    "/blog/:path*",
    "/locations/:path*",
  ],
}
