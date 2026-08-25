import wpProducts from "./wp-products.json";
import categoryImages from "./wp-category-images.json";
import wpCategories from "./wp-categories.json";
import { stripHtml } from "@/lib/utils";

export interface Product {
  id: string;
  type: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categories: string[];
  categorySlugs: string[];
  categoryPaths: string[];
  image: string;
  images: string[];
  tags: string[];
  inStock: boolean;
  published: boolean;
  featured: boolean;
  visibility?: string;
  sku?: string;
  regularPrice?: string;
  salePrice?: string;
  stock?: number;
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  brands?: string;
  parent?: string;
  upsells?: string;
  crossSells?: string;
  position?: number;
}

export interface CategoryRecord {
  slug: string;
  aliases: string[];
  name: string;
  parentSlug: string | null;
  parentName: string | null;
  count: number;
}

export const products = wpProducts as Product[];
export const catalogCategories = wpCategories as CategoryRecord[];

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlugs.includes(slug));
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryRecord(slug: string): CategoryRecord | undefined {
  return catalogCategories.find((c) => c.slug === slug || c.aliases.includes(slug));
}

export function getCategoryMeta(slug: string): {
  name: string;
  description: string;
  image: string;
  parentSlug: string | null;
  parentName: string | null;
} {
  const wp = getCategoryRecord(slug);
  const name = wp?.name || slug;
  const image =
    (categoryImages as Record<string, string>)[slug] ||
    (wp ? (categoryImages as Record<string, string>)[wp.slug] : "") ||
    getProductsByCategory(slug)[0]?.image ||
    "";
  return {
    name,
    description: "",
    image,
    parentSlug: wp?.parentSlug ?? null,
    parentName: wp?.parentName ?? null,
  };
}

export const allCategorySlugs = Array.from(
  new Set(catalogCategories.flatMap((c) => [c.slug, ...c.aliases]))
);

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const leaf =
    [...product.categorySlugs].reverse().find((slug) => {
      const rec = getCategoryRecord(slug);
      return rec?.parentSlug;
    }) || product.categorySlugs[0];

  const sameLeaf = getProductsByCategory(leaf).filter((p) => p.slug !== product.slug);
  if (sameLeaf.length >= limit) return sameLeaf.slice(0, limit);

  const parent = getCategoryRecord(leaf)?.parentSlug;
  const extra = parent
    ? getProductsByCategory(parent).filter(
        (p) => p.slug !== product.slug && !sameLeaf.some((s) => s.slug === p.slug)
      )
    : [];
  return [...sameLeaf, ...extra].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const hay = [
      p.name,
      ...p.categories,
      ...p.tags,
      stripHtml(p.shortDescription),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export const showcaseCategories = catalogCategories
  .filter((c) => c.parentSlug)
  .slice(0, 5)
  .map((c, i) => ({
    slug: c.slug,
    name: c.name,
    number: String(i + 1).padStart(2, "0"),
    image: (categoryImages as Record<string, string>)[c.slug] || "",
    description: "",
  }));

export const categories = showcaseCategories;
