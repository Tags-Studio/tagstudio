import "./globals.css"
import { Cairo } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FloatingContactButtons from "./components/FloatingContactButtons"
import type { Metadata } from "next"
import type React from "react"
import Script from "next/script"
import { SpeedInsights } from "@vercel/speed-insights/next"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wearetagstudio.com"),
  title: {
    default: "تاج ستوديو | تصميم هوية بصرية وشعارات احترافية",
    template: "%s | تاج ستوديو",
  },
  description:
    "تاج ستوديو وكالة تصميم متخصصة في الهوية البصرية والشعارات وتصميمات السوشيال ميديا والمطبوعات والموشن جرافيك للشركات في مصر والسعودية.",
  keywords: [
    "تصميم هوية بصرية",
    "تصميم شعار",
    "وكالة تصميم",
    "تاج ستوديو",
    "موشن جرافيك",
    "تصميم سوشيال ميديا",
    "تصميم مطبوعات",
    "هوية تجارية",
  ],
  openGraph: {
    title: "تاج ستوديو | تصميم هوية بصرية وشعارات احترافية",
    description:
      "نصمم هويات بصرية وشعارات وتصميمات سوشيال ميديا ومطبوعات وموشن جرافيك للشركات في مصر والسعودية.",
    url: "https://www.wearetagstudio.com",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "شعار تاج ستوديو",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "تاج ستوديو | تصميم هوية بصرية وشعارات احترافية",
    description:
      "نصمم هويات بصرية وشعارات وتصميمات سوشيال ميديا ومطبوعات وموشن جرافيك للشركات.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  verification: {
    google: "4a88UEyz_c7KWmh3TyykZoUjK3hWSHnWUc0FSufI7Ss",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <LocalBusinessSchema />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingContactButtons />
        </ThemeProvider>
        <SpeedInsights />

        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7EET2GCC8N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7EET2GCC8N');
          `}
        </Script>
      </body>
    </html>
  )
}
