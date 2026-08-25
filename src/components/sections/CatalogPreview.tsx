import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByCategory } from "@/data/products";

export default function CatalogPreview() {
  const workwear = getProductsByCategory("coveralls").slice(0, 4);
  const accessories = getProductsByCategory("parachute-vest").slice(0, 4);
  const items = [...workwear, ...accessories].slice(0, 8);

  if (!items.length) return null;

  return (
    <section className="bg-light-gray py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
              Catalog
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase text-navy lg:text-4xl">
              Workwear & Accessories
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-wider text-orange"
          >
            View All Products →
          </Link>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
