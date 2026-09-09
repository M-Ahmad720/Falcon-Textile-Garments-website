"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const defaultLogos = [
  "/images/clients/client-7.png",
  "/images/clients/client-8.png",
  "/images/clients/client-9.png",
  "/images/clients/client-10.png",
  "/images/clients/client-11.png",
  "/images/clients/client-12.png",
  "/images/clients/client-13.png",
  "/images/clients/client-14.png",
];

interface ClientPrideProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  logos?: string[];
}

export default function ClientPride({
  eyebrow,
  title = "We Proud To Work",
  subtitle = "Which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish.",
  logos = defaultLogos,
}: ClientPrideProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;
    const logosEl = ref.current.querySelectorAll(".client-logo");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logosEl,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
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
      gsap.set(logosEl, { clearProps: "all" });
    };
  }, [reducedMotion]);

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            {eyebrow ? (
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="font-display text-3xl font-bold text-navy lg:text-4xl">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-secondary-text">
            {subtitle}
          </p>
        </div>
        <div className="mt-12 overflow-hidden">
          <div className="marquee-track flex w-max">
            {[...logos, ...logos].map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="client-logo flex h-28 w-48 shrink-0 items-center justify-center border border-navy/10 bg-white px-6"
              >
                <Image
                  src={src}
                  alt="Client logo"
                  width={140}
                  height={48}
                  loading="lazy"
                  quality={60}
                  className="max-h-10 w-auto object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
