import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SafeHtml from "@/components/ui/SafeHtml";
import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import { stripHtml } from "@/lib/utils";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
  getCategoryMeta,
} from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: stripHtml(product.shortDescription),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 3);
  const leafSlug = product.categorySlugs[product.categorySlugs.length - 1];
  const leafMeta = leafSlug ? getCategoryMeta(leafSlug) : null;
  const specs = [
    product.sku ? ["SKU", product.sku] : null,
    product.regularPrice ? ["Regular price", product.regularPrice] : null,
    product.salePrice ? ["Sale price", product.salePrice] : null,
    product.weight ? ["Weight (lbs)", product.weight] : null,
    product.length ? ["Length (in)", product.length] : null,
    product.width ? ["Width (in)", product.width] : null,
    product.height ? ["Height (in)", product.height] : null,
  ].filter(Boolean) as [string, string][];

  const relatedCategories = product.categorySlugs
    .map((s) => ({ slug: s, ...getCategoryMeta(s) }))
    .filter((c, i, arr) => arr.findIndex((x) => x.slug === c.slug) === i);

  return (
    <>
      <section className="bg-light-gray py-32 pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="mb-8 text-sm text-secondary-text">
            <Link href="/" className="hover:text-orange">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-orange">
              Products
            </Link>
            {leafMeta && leafSlug ? (
              <>
                <span className="mx-2">/</span>
                <Link href={`/product-category/${leafSlug}`} className="hover:text-orange">
                  {leafMeta.name}
                </Link>
              </>
            ) : null}
            <span className="mx-2">/</span>
            <span className="text-navy">{product.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ProductGallery name={product.name} images={product.images} />

            <div>
              {leafMeta ? (
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
                  {leafMeta.name}
                </p>
              ) : null}
              <h1 className="mt-3 font-display text-3xl font-bold text-navy lg:text-4xl">
                {product.name}
              </h1>
              <SafeHtml
                html={product.shortDescription}
                className="product-html mt-6 text-secondary-text leading-relaxed"
              />

              {specs.length > 0 ? (
                <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  {specs.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-orange">
                        {label}
                      </dt>
                      <dd className="mt-1 text-navy">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <Button href="/contact" variant="primary" size="lg" className="mt-10">
                Request a Quote
              </Button>
            </div>
          </div>

          {product.description.trim() ? (
            <div className="mt-16 rounded-sm bg-white p-8 lg:p-12">
              <h2 className="text-xs font-bold uppercase tracking-wider text-orange">
                Description
              </h2>
              <SafeHtml
                html={product.description}
                className="product-html mt-6 text-secondary-text leading-relaxed"
              />
            </div>
          ) : null}

          {relatedCategories.length > 0 ? (
            <div className="mt-10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-orange">
                Related Categories
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/product-category/${cat.slug}`}
                    className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-navy hover:text-orange"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-navy">Related Products</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
