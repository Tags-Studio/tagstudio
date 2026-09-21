import { NextRequest, NextResponse } from "next/server"

const categoryRedirects: Record<string, string> = {
  "الهوية البصرية": "/services/visual-identity",
  "تصميمات السوشيال ميديا": "/services/social-media-design",
  "تصاميم المطبوعات": "/services/print-design",
  "فيديو موشن جرافيك": "/services/motion-graphics",
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
  ],
}
