import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { searchProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Search",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  if (!query) redirect("/products");

  const results = searchProducts(query);

  return (
    <section className="bg-light-gray py-32 pt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-navy">Search</h1>
        <p className="mt-3 text-secondary-text">
          {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
        </p>
        <form action="/search" className="mt-8">
          <input
            type="search"
            name="q"
            defaultValue={query}
            className="w-full max-w-xl border border-navy/10 bg-white px-4 py-3 text-sm outline-none focus:border-orange"
          />
        </form>
        {results.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((product, i) => (
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
