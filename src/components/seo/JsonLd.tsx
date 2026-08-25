import { siteConfig } from "@/data/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/falcon-logo.png`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    founder: [
      { "@type": "Person", name: siteConfig.founders.founder },
      { "@type": "Person", name: siteConfig.founders.coFounder },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
