export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-zinc-900/95 dark:bg-black/95 backdrop-blur-md border-t border-zinc-800 p-3 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between gap-3 max-w-sm mx-auto">
        <a 
          href="/#contact-form" 
          className="flex-1 text-center bg-primary text-primary-foreground py-3 rounded-xl font-bold text-base shadow-lg animate-pulse"
        >
          اطلب عرض سعر
        </a>
        <a 
          href="https://wa.me/201009215131?text=مرحبًا%20تاج%20ستوديو،%20أريد%20الاستفسار%20عن%20خدماتكم" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-none bg-emerald-600 text-white p-3 rounded-xl shadow-lg flex items-center justify-center" 
          aria-label="تواصل عبر واتساب"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
        </a>
      </div>
    </div>
  )
}
