import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import {
  allCategorySlugs,
  catalogCategories,
  getCategoryMeta,
  getCategoryRecord,
  getProductsByCategory,
} from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allCategorySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCategoryMeta(slug);
  return {
    title: meta.name,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  if (!allCategorySlugs.includes(slug)) {
    notFound();
  }

  const meta = getCategoryMeta(slug);
  const record = getCategoryRecord(slug);
  const categoryProducts = getProductsByCategory(slug);
  const children = catalogCategories.filter(
    (c) => c.parentSlug === (record?.slug ?? slug)
  );

  return (
    <>
      <section className="relative flex min-h-[50vh] items-end bg-navy pb-16 pt-32 grain">
        {meta.image ? (
          <div className="absolute inset-0">
            <Image
              src={meta.image}
              alt={meta.name}
              fill
              className="object-cover opacity-25"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/70" />
          </div>
        ) : null}
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          <nav className="mb-6 text-sm text-white/50">
            <Link href="/" className="hover:text-orange">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-orange">
              Products
            </Link>
            {meta.parentSlug && meta.parentName ? (
              <>
                <span className="mx-2">/</span>
                <Link href={`/product-category/${meta.parentSlug}`} className="hover:text-orange">
                  {meta.parentName}
                </Link>
              </>
            ) : null}
          </nav>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase text-white lg:text-6xl">
            {meta.name}
          </h1>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {children.length > 0 ? (
            <div className="mb-16 flex flex-wrap gap-3">
              {children.map((child) => (
                <Link
                  key={child.slug}
                  href={`/product-category/${child.slug}`}
                  className="border border-navy/10 px-4 py-2 text-sm text-navy hover:border-orange hover:text-orange"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          ) : null}

          {categoryProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-sm bg-light-gray p-12 text-center">
              <p className="text-secondary-text">
                No products are listed in this category.{" "}
                <a href="/contact" className="text-orange hover:underline">
                  Contact us
                </a>{" "}
                for availability.
              </p>
            </div>
          )}

          <div className="mt-16 text-center">
            <Button href="/contact" variant="secondary" size="lg">
              Request a Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
