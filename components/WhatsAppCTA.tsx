"use client"

import React from "react"

interface Props {
  href: string
  pagePath: string
  serviceName: string
  className?: string
  children: React.ReactNode
}

export default function WhatsAppCTA({
  href,
  pagePath,
  serviceName,
  className,
  children,
}: Props) {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "whatsapp_click", {
        page_path: pagePath,
        service_name: serviceName,
      })
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}
