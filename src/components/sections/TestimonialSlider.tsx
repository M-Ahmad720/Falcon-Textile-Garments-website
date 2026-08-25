"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/site";

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section className="overflow-hidden bg-light-gray py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
          Testimonials
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-navy lg:text-4xl">
          Words From Our Customers
        </h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              key={current.id}
              src={current.image}
              alt={current.client}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div>
            <blockquote className="font-display text-2xl font-medium leading-relaxed text-navy lg:text-3xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-semibold text-navy">{current.client}</p>
              <p className="text-sm text-secondary-text">{current.company}</p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <button
                onClick={() => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/10 transition-colors hover:border-orange hover:text-orange"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      active === i ? "w-8 bg-orange" : "w-4 bg-navy/20"
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/10 transition-colors hover:border-orange hover:text-orange"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
