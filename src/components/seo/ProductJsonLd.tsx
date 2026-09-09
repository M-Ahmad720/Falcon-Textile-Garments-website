import type { Product } from "@/data/products";
import { siteConfig } from "@/data/site";
import { stripHtml } from "@/lib/utils";

type Props = {
  product: Product;
  categoryName?: string;
  categorySlug?: string;
};

export default function ProductJsonLd({
  product,
  categoryName,
  categorySlug,
}: Props) {
  const productUrl = `${siteConfig.url}/product/${product.slug}`;
  const numericPrice = Number.parseFloat(
    (product.salePrice || product.regularPrice || "").replace(/[^0-9.]/g, "")
  );

  const productData = {
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    url: productUrl,
    description: stripHtml(product.shortDescription || product.description),
    image: product.images.length > 0 ? product.images : [product.image],
    sku: product.sku || undefined,
    category: product.categories.join(", "),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    offers: Number.isFinite(numericPrice)
      ? {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "USD",
          price: numericPrice,
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        }
      : undefined,
  };

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
      item: `${siteConfig.url}/products`,
    },
    ...(categoryName && categorySlug
      ? [
          {
            "@type": "ListItem",
            position: 3,
            name: categoryName,
            item: `${siteConfig.url}/product-category/${categorySlug}`,
          },
        ]
      : []),
    {
      "@type": "ListItem",
      position: categoryName && categorySlug ? 4 : 3,
      name: product.name,
      item: productUrl,
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      productData,
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
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
