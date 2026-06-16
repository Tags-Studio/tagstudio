import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12 sm:space-x-reverse" aria-label="Footer">
          {/* تحديث رابط "من نحن" */}
          <div className="pb-6">
            <Link
              href="/about" // تم تحديث الرابط هنا ليشير إلى صفحة "من نحن" الجديدة
              className="text-sm leading-6 text-muted-foreground hover:text-foreground"
            >
              من نحن
            </Link>
          </div>
          <div className="pb-6">
            <Link
              href="https://www.wearetagstudio.com/#contact-form"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm leading-6 text-muted-foreground hover:text-foreground"
            >
              تواصل معنا
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/work" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              الأعمال
            </Link>
          </div>
        </nav>
        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          مصمم ومطور من قبل تاج استوديو وحقوق الطبع والنشر لنا
        </p>
      </div>
    </footer>
  )
}
