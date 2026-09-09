import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import {
  catalogCategories,
  products,
  getProductsByCategory,
  searchProducts,
} from "@/data/products";
import { createSeoMetadata } from "@/lib/seo";

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { category, q } = await searchParams;

  return createSeoMetadata({
    title: "Industrial Workwear Products",
    description:
      "Browse Falcon industrial workwear including coveralls, safety jackets, work trousers, FR clothing, hi-vis garments, chemical suits and custom uniforms.",
    path: "/products",
    keywords: [
      "industrial workwear products",
      "safety clothing catalog",
      "workwear coveralls",
      "safety jackets and trousers",
      "custom industrial uniforms",
    ],
    image: "/images/page-banners/2.jpeg",
    noIndex: Boolean(category || q),
  });
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category, q } = await searchParams;
  const query = q?.trim() ?? "";
  const parents = catalogCategories.filter((c) => !c.parentSlug);

  let list = query ? searchProducts(query) : products;
  if (category) {
    const inCat = new Set(getProductsByCategory(category).map((p) => p.slug));
    list = list.filter((p) => inCat.has(p.slug));
  }

  return (
    <section className="bg-light-gray py-32 pt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
          Catalog
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-navy lg:text-5xl">
          All Products
        </h1>

        <form action="/products" className="mt-8 flex flex-wrap gap-3">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search name, category, or tags"
            className="min-w-[240px] flex-1 border border-navy/10 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-orange"
          />
          <button
            type="submit"
            className="bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white"
          >
            Search
          </button>
        </form>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href={query ? `/products?q=${encodeURIComponent(query)}` : "/products"}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
              !category ? "bg-navy text-white" : "bg-white text-navy"
            }`}
          >
            All Products
          </Link>
          {parents.map((parent) => {
            const href = query
              ? `/products?category=${parent.slug}&q=${encodeURIComponent(query)}`
              : `/products?category=${parent.slug}`;
            return (
              <Link
                key={parent.slug}
                href={href}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                  category === parent.slug || parent.aliases.includes(category || "")
                    ? "bg-navy text-white"
                    : "bg-white text-navy"
                }`}
              >
                {parent.name}
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-secondary-text">{list.length} products</p>

        {list.length > 0 ? (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-secondary-text">No products matched this search.</p>
        )}
      </div>
    </section>
  );
}
