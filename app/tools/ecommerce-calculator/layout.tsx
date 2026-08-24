import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "حاسبة أرباح وتكاليف المتاجر الإلكترونية وحساب ROI | تاج ستوديو",
  description: "احسب صافي أرباح متجرك الإلكتروني، وتكاليف الشحن والتغليف، وهامش الربح بدقة لاتخاذ قرارات تسعير مدروسة وزيادة مبيعاتك وأرباحك.",
  alternates: { canonical: "https://www.wearetagstudio.com/tools/ecommerce-calculator" },
  openGraph: {
    title: "حاسبة أرباح وتكاليف المتاجر الإلكترونية وحساب ROI | تاج ستوديو",
    description: "احسب صافي أرباح متجرك الإلكتروني، وتكاليف الشحن والتغليف، وهامش الربح بدقة لاتخاذ قرارات تسعير مدروسة وزيادة مبيعاتك وأرباحك.",
    url: "https://www.wearetagstudio.com/tools/ecommerce-calculator",
    siteName: "تاج ستوديو",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حاسبة أرباح وتكاليف المتاجر الإلكترونية وحساب ROI | تاج ستوديو",
    description: "احسب صافي أرباح متجرك الإلكتروني، وتكاليف الشحن والتغليف، وهامش الربح بدقة لاتخاذ قرارات تسعير مدروسة وزيادة مبيعاتك وأرباحك.",
  },
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
