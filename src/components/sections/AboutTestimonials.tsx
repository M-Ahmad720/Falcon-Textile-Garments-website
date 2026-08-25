"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    quote:
      "The breathability of Falcon's coveralls keeps our utility workers safe without sacrificing comfort in extreme heat.",
    name: "Construction Project Manager",
    rating: 3,
    avatar:
      "https://falcontextilegarments.com/wp-content/uploads/2020/05/author-thumb-20.jpg",
  },
  {
    quote:
      "Falcon's fire-retardant gear has been a game-changer for our field teams in high-risk zones.",
    name: "Oil & Gas Industry Leader",
    rating: 4,
    avatar:
      "https://falcontextilegarments.com/wp-content/uploads/2020/05/author-thumb-21.jpg",
  },
  {
    quote:
      "As a logistics provider, we trust Falcon's cargo pants for their tear-resistant fabric and functional design.",
    name: "Energy Sector Safety Officer",
    rating: 3,
    avatar:
      "https://falcontextilegarments.com/wp-content/uploads/2020/05/author-thumb-19.jpg",
  },
];

function Stars({ filled }: { filled: number }) {
  return (
    <div className="flex gap-1.5" aria-label={`${filled} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            i < filled
              ? "h-3.5 w-3.5 rounded-full bg-navy"
              : "h-3.5 w-3.5 rounded-full border-2 border-navy/20 bg-transparent"
          }
        />
      ))}
    </div>
  );
}

export default function AboutTestimonials() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-testimonial-card", {
        y: 70,
        opacity: 0,
        duration: 0.85,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={ref} className="bg-light-gray py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
          Testimonials
        </p>
        <h2 className="mt-3 text-center font-display text-3xl font-bold text-navy lg:text-4xl">
          Words From Our Customers
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.name}
              className="about-testimonial-card rounded-xl bg-white p-8 shadow-xl shadow-black/10"
            >
              <Stars filled={card.rating} />
              <p className="mt-6 text-[15px] leading-relaxed text-secondary-text">
                {card.quote}
              </p>
              <div className="mt-8 border-t border-dashed border-navy/15 pt-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={card.avatar}
                      alt={card.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-navy">{card.name}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
