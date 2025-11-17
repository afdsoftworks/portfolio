export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AFD Softworks",
    "alternateName": "AFD",
    "url": "https://afdsoftworks.com",
    "logo": "https://afdsoftworks.com/favicon.png",
    "description": "Desarrollo web profesional - E-commerce, landing pages, sitios corporativos y portfolios a medida",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UY",
      "addressLocality": "Uruguay"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+598 92 480 589",
      "availableLanguage": ["Spanish"]
    },
    "sameAs": [
      "https://instagram.com/afdsoftworks",
      "https://github.com/afdsoftworks"
    ]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "AFD Softworks",
    "image": "https://afdsoftworks.com/favicon.png",
    "url": "https://afdsoftworks.com",
    "telephone": "+598 92 480 589",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -34.9011, // Coordenadas aproximadas de Uruguay
      "longitude": -56.1645
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "8"
    }
  }

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "E-commerce",
        "description": "Tiendas online rápidas, seguras y listas para vender",
        "provider": {
          "@type": "Organization",
          "name": "AFD Softworks"
        }
      },
      {
        "@type": "Service",
        "name": "Landing Pages",
        "description": "Páginas de aterrizaje ideales para campañas, servicios o lanzamientos",
        "provider": {
          "@type": "Organization",
          "name": "AFD Softworks"
        }
      },
      {
        "@type": "Service",
        "name": "Sitios Corporativos",
        "description": "Sitios web profesionales, claros y confiables para empresas",
        "provider": {
          "@type": "Organization",
          "name": "AFD Softworks"
        }
      },
      {
        "@type": "Service",
        "name": "Portfolios",
        "description": "Portfolios y marcas personales para mostrar tu trabajo con presencia",
        "provider": {
          "@type": "Organization",
          "name": "AFD Softworks"
        }
      },
      {
        "@type": "Service",
        "name": "Optimización & SEO",
        "description": "Mejoramos tu posicionamiento y rendimiento web",
        "provider": {
          "@type": "Organization",
          "name": "AFD Softworks"
        }
      }
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AFD Softworks",
    "url": "https://afdsoftworks.com",
    "description": "Sitios web modernos que funcionan",
    "publisher": {
      "@type": "Organization",
      "name": "AFD Softworks"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://afdsoftworks.com/proyectos?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
