export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.wearetagstudio.com/#organization",
        name: "تاج ستوديو - TAG Studio",
        alternateName: "تاج ستوديو لتصميم الهوية البصرية والسوشيال ميديا",
        url: "https://www.wearetagstudio.com",
        logo: "https://www.wearetagstudio.com/images/logo.png",
        image: "https://www.wearetagstudio.com/images/logo.png",
        description: "مكتب تصميم متقدم متخصص في ابتكار الهويات البصرية، الشعارات، تصميمات السوشيال ميديا، المطبوعات، وفيديوهات الموشن جرافيك للشركات والمراكز الطبية في السعودية ومصر.",
        telephone: "+201009215131",
        priceRange: "$$",
        address: [
          {
            "@type": "PostalAddress",
            streetAddress: "طريق الملك فهد، حي العليا",
            addressLocality: "الرياض",
            addressRegion: "منطقة الرياض",
            addressCountry: "SA"
          },
          {
            "@type": "PostalAddress",
            streetAddress: "شارع التحرير، الدقي",
            addressLocality: "الجيزة",
            addressRegion: "القاهرة الكبرى",
            addressCountry: "EG"
          }
        ],
        geo: {
          "@type": "GeoCoordinates",
          latitude: 24.7136,
          longitude: 46.6753
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday"
          ],
          opens: "09:00",
          closes: "18:00"
        },
        sameAs: [
          "https://www.instagram.com/tagstudio.co",
          "https://www.facebook.com/tagstudio.co",
          "https://wa.me/201009215131"
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "142",
          bestRating: "5",
          worstRating: "1"
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
