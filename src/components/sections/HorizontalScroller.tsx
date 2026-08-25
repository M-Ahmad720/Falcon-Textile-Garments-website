"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "@/data/products";
import { wpMedia } from "@/data/media";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const horizontalCategories = [
  ...categories,
  {
    slug: "chemical-suits",
    name: "Chemical Suits",
    number: "06",
    description: "Chemical-resistant protection for hazardous environments.",
    image: wpMedia.chemical,
  },
  {
    slug: "nomex-coveralls",
    name: "Nomex",
    number: "07",
    description: "Inherent flame-resistant Nomex® coveralls.",
    image: wpMedia.nomex,
  },
];

export default function HorizontalScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || isMobile || reducedMotion) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-light-gray py-24 lg:py-0">
      <div ref={pinRef}>
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-24 lg:px-8 lg:pt-32">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
          Product Range
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-navy lg:text-4xl">
          Explore Our Workwear Categories
        </h2>
      </div>

      {isMobile || reducedMotion ? (
        <div className="flex gap-4 overflow-x-auto px-6 pb-12 snap-x snap-mandatory scrollbar-hide lg:px-8">
          {horizontalCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/product-category/${cat.slug}`}
              className="group w-72 flex-shrink-0 snap-start overflow-hidden rounded-sm bg-white shadow-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="288px"
                />
              </div>
              <div className="p-5">
                <span className="text-xs text-orange">{cat.number}</span>
                <h3 className="mt-1 text-lg font-bold text-navy">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div ref={trackRef} className="flex gap-8 px-8 will-change-transform">
          {horizontalCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/product-category/${cat.slug}`}
              className="group w-[400px] flex-shrink-0 overflow-hidden rounded-sm bg-white shadow-xl transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <span className="text-sm font-bold text-orange">{cat.number}</span>
                <h3 className="mt-1 text-xl font-bold text-navy">{cat.name}</h3>
                <p className="mt-2 text-sm text-secondary-text line-clamp-2">
                  {cat.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange opacity-0 transition-opacity group-hover:opacity-100">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
