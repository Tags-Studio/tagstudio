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
        {/* Global Background 3D Glowing Circles */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
          {/* Circle 1: Top Right - Royal Blue & Teal */}
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/15 via-blue-600/10 to-emerald-500/5 blur-[130px] opacity-80 dark:opacity-60"></div>
          
          {/* Circle 2: Middle Left - Gold/Amber & Indigo */}
          <div className="absolute top-[40%] left-[-15%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-500/8 via-indigo-600/10 to-transparent blur-[120px] opacity-70 dark:opacity-50"></div>
          
          {/* Circle 3: Bottom Right - Deep Emerald & Royal Blue */}
          <div className="absolute bottom-[-15%] right-[-5%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-primary/10 to-blue-500/5 blur-[140px] opacity-80 dark:opacity-60"></div>
        </div>
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
