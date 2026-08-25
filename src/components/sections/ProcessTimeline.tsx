"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/process";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || reducedMotion) return;

    gsap.to(lineRef.current, {
      scaleY: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
      },
    });
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-light-gray py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
          Manufacturing
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-navy lg:text-4xl">
          Production Journey
        </h2>

        <div className="relative mt-16">
          <div
            ref={lineRef}
            className="absolute left-6 top-0 hidden h-full w-px origin-top scale-y-0 bg-orange lg:left-1/2 lg:block"
          />

          <div className="space-y-16 lg:space-y-24">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className={`relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-video overflow-hidden rounded-sm">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
                  <span className="text-5xl font-bold text-orange/20 lg:text-7xl">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-navy">{step.title}</h3>
                  <p className="mt-4 text-secondary-text">{step.description}</p>
                  <div
                    className={`mt-4 h-0.5 w-16 bg-orange ${i % 2 === 1 ? "lg:ml-auto" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
