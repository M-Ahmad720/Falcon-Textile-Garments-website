"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { cn, stripHtml } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export default function ProductCard({ product, index, className }: ProductCardProps) {
  const excerpt = stripHtml(product.shortDescription);
  const category = product.categories[product.categories.length - 1];
  const price = product.salePrice || product.regularPrice;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group shine-hover block overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
        className
      )}
      style={{ animationDelay: index ? `${index * 0.1}s` : undefined }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-light-gray">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
        <div className="absolute inset-0 flex items-end justify-center bg-black/0 p-6 transition-colors duration-300 group-hover:bg-black/45">
          <span className="translate-y-3 text-[11px] font-bold uppercase tracking-widest text-orange opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View project →
          </span>
        </div>
      </div>
      <div className="p-5">
        {category ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange">
            {category}
          </p>
        ) : null}
        <h3 className="mt-2 font-semibold text-navy transition-colors group-hover:text-orange">
          {product.name}
        </h3>
        {excerpt ? (
          <p className="mt-2 line-clamp-2 text-sm text-secondary-text">{excerpt}</p>
        ) : null}
        {price ? (
          <p className="mt-3 text-sm font-semibold text-navy">{price}</p>
        ) : null}
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange">
          View Product
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
