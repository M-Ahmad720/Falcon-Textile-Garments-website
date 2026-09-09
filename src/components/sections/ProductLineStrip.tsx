"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wpMedia } from "@/data/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { title: "Jackets", href: "/product-category/safety-jackets", image: wpMedia.jackets },
  { title: "Coveralls", href: "/product-category/coveralls", image: wpMedia.coveralls },
  { title: "Bibs & Braces", href: "/product-category/bibs-and-braces", image: wpMedia.aboutAlt },
  { title: "Trousers", href: "/product-category/trousers-cargo-trousers", image: wpMedia.trousers },
  { title: "Flame Retardant Coveralls", href: "/product-category/flame-resistant-clothing", image: wpMedia.fr },
];

export default function ProductLineStrip() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;
    const tiles = ref.current.querySelectorAll(".line-tile");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        tiles,
        { y: 80, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, ref);
    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
      gsap.set(tiles, { clearProps: "all" });
    };
  }, [reducedMotion]);

  return (
    <section ref={ref} className="bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-orange">
          Falcon Garments
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold uppercase text-white lg:text-3xl">
          Manufacturing Line
        </h2>
      </div>
      <div className="flex overflow-x-auto">
        {lines.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="line-tile group relative min-w-[70%] overflow-hidden sm:min-w-[45%] lg:min-w-[20%]"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                loading="lazy"
                quality={70}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="20vw"
              />
              <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                <h3 className="font-display text-lg font-bold uppercase text-white">
                  {item.title}
                </h3>
                <span className="mt-3 translate-y-3 text-[11px] font-bold uppercase tracking-widest text-orange opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View project →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
