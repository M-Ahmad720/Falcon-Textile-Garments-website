"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTERVAL_MS = 3000;

const slides = [
  {
    src: "/images/hero/banner-1.jpg",
    alt: "Welcome to Falcon Textile Garments",
    lines: ["Welcome to Falcon", "Textile Garments", "Over!.."],
  },
  {
    src: "/images/hero/banner-2.jpg",
    alt: "Industrial workwear engineered for safety",
    lines: ["Industrial Workwear Engineered", "for Safety™"],
  },
  {
    src: "/images/hero/banner-3.jpg",
    alt: "Falcon Textile & Garments armoring industry professionals",
    lines: ["Falcon Textile & Garments", "Armoring Industry", "Professionals"],
  },
];

export default function Hero3D() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const reducedMotion = useReducedMotion();

  const goTo = useCallback(
    (nextIndex: number, dir: "next" | "prev") => {
      const wrapped = (nextIndex + slides.length) % slides.length;
      if (wrapped === index) return;
      setPrev(index);
      setDirection(dir);
      setIndex(wrapped);
    },
    [index]
  );

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => goTo(index + 1, "next"), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, index, goTo]);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy">
      {slides.map((slide, i) => {
        const isActive = i === index;
        const isLeaving = i === prev && prev !== index;

        return (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0",
              isActive ? "z-20" : isLeaving ? "z-10" : "z-0",
              isActive && !reducedMotion && direction === "next" && "hero-wipe-in",
              isActive && !reducedMotion && direction === "prev" && "hero-wipe-in-reverse",
              isLeaving && !reducedMotion && "hero-wipe-out"
            )}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn(
                "object-cover object-center",
                isActive && !reducedMotion && "ken-burns"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
          </div>
        );
      })}

      <div className="relative z-30 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <h1 className="font-display max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {slides[index].lines.map((line, lineIndex) => (
              <span
                key={`${slides[index].src}-${line}`}
                className={cn("block", !reducedMotion && "hero-line-in")}
                style={{ animationDelay: `${lineIndex * 0.12}s` }}
              >
                {line}
              </span>
            ))}
          </h1>
          <Link
            href="/contact"
            className="fg-fill-btn mt-8 inline-flex items-center gap-3 px-8 py-3.5 text-sm"
          >
            Request a Quote
            <span>→</span>
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1, "prev")}
        className="absolute left-4 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:border-orange hover:bg-orange sm:left-8"
        aria-label="Previous banner"
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1, "next")}
        className="absolute right-4 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:border-orange hover:bg-orange sm:right-8"
        aria-label="Next banner"
      >
        →
      </button>

      <div className="absolute bottom-8 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i, i > index ? "next" : "prev")}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-10 bg-orange" : "w-4 bg-white/40 hover:bg-white"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
