import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { allCategorySlugs, products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages = [
    "",
    "/about",
    "/founder",
    "/fabric-guide",
    "/team",
    "/products",
    "/search",
    "/contact",
    "/blog",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categories = allCategorySlugs.map((slug) => ({
    url: `${base}/product-category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productPages = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categories, ...productPages];
}
