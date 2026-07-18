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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.className} min-h-screen bg-background text-foreground relative`}
      >
        <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/15 via-blue-600/10 to-emerald-500/5 blur-[130px] opacity-80 dark:opacity-60 pointer-events-none z-[-1] select-none" />

        <div className="fixed top-[40%] left-[-15%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-500/8 via-indigo-600/10 to-transparent blur-[120px] opacity-70 dark:opacity-50 pointer-events-none z-[-1] select-none" />

        <div className="fixed bottom-[-15%] right-[-5%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-primary/10 to-blue-500/5 blur-[140px] opacity-80 dark:opacity-60 pointer-events-none z-[-1] select-none" />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingContactButtons />
        </ThemeProvider>

        <SpeedInsights />

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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "تاج ستوديو - Tag Studio",
              url: "https://www.wearetagstudio.com",
              logo: "https://www.wearetagstudio.com/images/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+201009215131",
                contactType: "customer service",
                areaServed: ["SA", "EG", "KW", "AE"],
                availableLanguage: ["Arabic", "English"]
              },
              sameAs: [
                "https://www.instagram.com/wearetagstudio",
                "https://www.behance.net/wearetagstudio"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
