"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the button after 1 second of page load
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://wa.me/201009215131"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50 cursor-pointer"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="تواصل معنا عبر واتساب"
        >
          {/* Pulsing ring background */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10" />
          
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.242-3.832c1.644.976 3.51 1.49 5.709 1.491 5.489 0 9.954-4.455 9.957-9.948.002-2.661-1.03-5.163-2.906-7.042C17.18 2.79 14.69 1.747 12.02 1.747 6.53 1.747 2.06 6.206 2.057 11.7c-.001 2.222.581 4.39 1.684 6.26l-.997 3.645 3.556-.937zm11.378-5.594c-.263-.132-1.557-.768-1.798-.855-.24-.087-.415-.13-.59.132-.175.263-.677.855-.83 1.03-.153.175-.306.197-.569.066-1.12-.56-2.203-1.032-3.076-1.79-.817-.707-1.368-1.58-1.528-1.855-.16-.263-.017-.406.115-.537.119-.118.263-.306.394-.46.131-.153.175-.263.263-.438.088-.175.044-.329-.022-.46-.066-.132-.59-1.422-.808-1.947-.213-.512-.446-.442-.614-.45l-.523-.008c-.18 0-.474.067-.722.338-.249.271-.951.93-.951 2.268s.973 2.63 1.104 2.806c.131.176 1.916 2.926 4.64 4.103.648.28 1.154.448 1.547.573.652.207 1.245.178 1.714.109.522-.078 1.557-.636 1.777-1.25.219-.614.219-1.14.153-1.25-.067-.109-.241-.197-.504-.329z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
