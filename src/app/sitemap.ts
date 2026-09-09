import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { catalogCategories, products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/fabric-guide`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/founder`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/team`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const categories = catalogCategories.map((category) => ({
    url: `${base}/product-category/${category.slug}`,
    changeFrequency: "weekly" as const,
    priority: category.parentSlug ? 0.7 : 0.8,
  }));

  const productPages = products
    .filter((product) => product.published && product.visibility !== "hidden")
    .map((product) => ({
      url: `${base}/product/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: product.featured ? 0.8 : 0.7,
    }));

  return [...staticPages, ...categories, ...productPages];
}
