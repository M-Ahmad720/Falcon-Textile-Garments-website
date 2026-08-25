"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { customFeatures } from "@/data/site";
import Button from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomWorkwear() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!imageRef.current || reducedMotion) return;

    gsap.to(imageRef.current, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            Custom Solutions
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy lg:text-5xl">
            Your Brand.
            <br />
            Your Workwear.
          </h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div ref={imageRef} className="relative mx-auto aspect-square w-64 lg:w-80">
            <Image
              src="https://falcontextilegarments.com/wp-content/uploads/2025/08/SiteSync-Custom-Hi-Vis-Sets.403Z.webp"
              alt="Custom workwear"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="320px"
            />
          </div>

          <div className="absolute inset-0 hidden lg:block">
            {customFeatures.map((feature, i) => {
              const angle = (i / customFeatures.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 220;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={feature}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                >
                  <span className="whitespace-nowrap rounded-full border border-navy/10 bg-white px-4 py-2 text-xs font-semibold text-navy shadow-lg">
                    {feature}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2 lg:hidden">
            {customFeatures.map((f) => (
              <span
                key={f}
                className="rounded-full border border-navy/10 bg-light-gray px-3 py-1.5 text-xs font-medium text-navy"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button href="/contact" variant="primary" size="lg">
            Discuss Your Requirements
          </Button>
        </div>
      </div>
    </section>
  );
}
