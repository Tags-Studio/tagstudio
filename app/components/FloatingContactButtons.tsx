export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 md:hidden">
      <a href="https://wa.me/201009215131?text=مرحبًا%20تاج%20ستوديو،%20أريد%20الاستفسار%20عن%20خدماتكم" target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg" aria-label="تواصل مع تاج ستوديو عبر واتساب">واتساب</a>
      <a href="/#contact-form" className="rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg">عرض سعر</a>
    </div>
  )
}
