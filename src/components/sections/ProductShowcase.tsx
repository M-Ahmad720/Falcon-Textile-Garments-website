"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "@/data/products";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const panels = containerRef.current.querySelectorAll(".showcase-panel");

    panels.forEach((panel, i) => {
      if (i === panels.length - 1) return;

      gsap.to(panel, {
        scale: 0.9,
        opacity: 0.3,
        scrollTrigger: {
          trigger: panel,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="bg-navy py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-12 font-display text-3xl font-bold text-white">
            Product Categories
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/product-category/${cat.slug}`}
                className="group overflow-hidden rounded-sm bg-steel/30"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="400px" />
                </div>
                <div className="p-6">
                  <span className="text-orange">{cat.number}</span>
                  <h3 className="mt-2 text-xl font-bold text-white">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative bg-navy">
      {categories.map((cat) => (
        <div
          key={cat.slug}
          className="showcase-panel sticky top-0 flex min-h-screen items-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover opacity-20"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
          </div>

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <span className="section-number text-8xl font-bold text-white/10 lg:text-9xl">
                {cat.number}
              </span>
              <h2 className="-mt-8 font-display text-5xl font-bold uppercase tracking-tight text-white lg:text-7xl">
                {cat.name}
              </h2>
              <p className="mt-6 max-w-md text-lg text-white/60">{cat.description}</p>
              <Link
                href={`/product-category/${cat.slug}`}
                className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-orange"
              >
                Explore Category
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
