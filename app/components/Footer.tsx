import Link from "next/link"

const footerLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/work", label: "الأعمال" },
  { href: "/blog", label: "المدونة" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/#contact-form", label: "تواصل معنا" },
  { href: "/privacy-policy", label: "سياسة الخصوصية" },
  { href: "/terms", label: "الشروط والأحكام" },
  { href: "/cookie-policy", label: "ملفات الارتباط" },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-16 lg:px-8">
        <nav
          className="flex flex-wrap justify-center gap-x-8 gap-y-5"
          aria-label="روابط تذييل الموقع"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm leading-6 text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          © {new Date().getFullYear()} تاج ستوديو — جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  )
}
