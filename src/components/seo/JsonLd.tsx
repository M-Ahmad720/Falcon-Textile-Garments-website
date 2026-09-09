import { siteConfig } from "@/data/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/images/falcon-logo.png`,
        },
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Bismillah Stop, near Rangers Headquarters, Zarar Shaheed Road",
          addressLocality: "Lahore",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        contactPoint: siteConfig.phones.map((phone) => ({
          "@type": "ContactPoint",
          telephone: phone.label,
          contactType: "sales",
          availableLanguage: ["English", "Urdu"],
        })),
        founder: {
          "@type": "Person",
          name: siteConfig.founders.founder,
        },
        sameAs: [siteConfig.social.linkedin, siteConfig.social.facebook],
        areaServed: "Worldwide",
        knowsAbout: [
          "Industrial workwear",
          "Safety clothing",
          "Flame-resistant garments",
          "High-visibility workwear",
          "Custom industrial uniforms",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
