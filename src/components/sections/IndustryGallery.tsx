"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { industries } from "@/data/industries";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function IndustryGallery() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="overflow-hidden bg-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            Industries
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white lg:text-4xl">
            Built for Demanding Industries.
          </h2>
        </ScrollReveal>

        <div className="mt-12 flex gap-3 overflow-x-auto pb-4 lg:gap-4">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className={cn(
                "group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-sm transition-all duration-500",
                hovered === null || hovered === ind.id
                  ? hovered === ind.id
                    ? "w-80 lg:w-96"
                    : "w-48 lg:w-56"
                  : "w-32 opacity-50 lg:w-40"
              )}
              onMouseEnter={() => setHovered(ind.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white">{ind.name}</h3>
                  <p
                    className={cn(
                      "mt-2 text-sm text-white/70 transition-all duration-300",
                      hovered === ind.id ? "max-h-20 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    )}
                  >
                    {ind.description}
                  </p>
                  <div
                    className={cn(
                      "mt-3 h-0.5 bg-orange transition-all duration-300",
                      hovered === ind.id ? "w-full" : "w-0"
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
