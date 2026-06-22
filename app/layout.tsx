import "./globals.css"
import { Cairo } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react"
import Script from "next/script"
import { SpeedInsights } from "@vercel/speed-insights/next"

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
})

export const metadata = {
  metadataBase: new URL("https://www.wearetagstudio.com"),
  title: {
    default: "تاج ستوديو | نصنع هويات بصرية تترك أثرًا — من القاهرة إلى الرياض",
    template: "%s | تاج ستوديو",
  },
  description: "تاج ستوديو: وكالة تصميم هوية بصرية وشعارات احترافية بالرياض وجدة ومصر. نقدم خدمات الهوية البصرية، السوشيال ميديا والموشن جرافيك لـ +200 عميل.",
  keywords: ["تصميم هوية بصرية", "تصميم شعار", "وكالة تصميم", "تاج ستوديو", "موشن جرافيك", "تصميم سوشيال ميديا", "تصميم مطبوعات", "هوية تجارية"],
  openGraph: {
    title: "تاج ستوديو | تصميم هوية بصرية وشعارات احترافية",
    description: "نصمم هويات بصرية، شعارات، سوشيال ميديا، وموشن جرافيك احترافي. تواصل معنا الآن.",
    url: "https://www.wearetagstudio.com",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
    images: [{ url: "/images/logo.png", width: 512, height: 512, alt: "شعار تاج ستوديو" }],
  },
  twitter: {
    card: "summary",
    title: "تاج ستوديو | تصميم هوية بصرية وشعارات احترافية",
    description: "نصمم هويات بصرية، شعارات، سوشيال ميديا، وموشن جرافيك احترافي.",
  },
  alternates: {
    canonical: "https://www.wearetagstudio.com",
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
      <body className={`${cairo.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
        {/* Google Analytics */}
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
