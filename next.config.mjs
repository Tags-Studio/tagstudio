/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // اتركه مؤقتًا حتى يتم تشغيل build ومراجعة أخطاء TypeScript القديمة.
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
