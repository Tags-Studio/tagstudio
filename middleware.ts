import { NextRequest, NextResponse } from "next/server"

const categoryRedirects: Record<string, string> = {
  "الهوية البصرية": "/services/visual-identity",
  "تصميمات السوشيال ميديا": "/services/social-media-design",
  "تصاميم المطبوعات": "/services/print-design",
  "فيديو موشن جرافيك": "/services/motion-graphics",
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

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
  matcher: "/",
}
