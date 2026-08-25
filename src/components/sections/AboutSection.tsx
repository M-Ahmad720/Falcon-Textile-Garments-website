"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { wpMedia } from "@/data/media";
import { siteConfig, stats } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".fg-tilt", {
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] lg:block">
        <Image
          src={wpMedia.consultingBg}
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="38vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-white" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[520px]">
          <div className="fg-tilt absolute left-2 top-10 h-48 w-40 -rotate-[14deg] bg-orange sm:h-56 sm:w-44" />
          <div className="fg-tilt float-y absolute left-6 top-14 h-48 w-40 -rotate-[14deg] overflow-hidden border-[3px] border-orange sm:h-56 sm:w-44">
            <Image src={wpMedia.aboutMain} alt="" fill className="object-cover" sizes="180px" />
          </div>
          <div className="fg-tilt absolute bottom-8 left-24 h-52 w-44 rotate-[8deg] bg-orange sm:left-32 sm:h-64 sm:w-52" />
          <div className="fg-tilt float-y absolute bottom-4 left-28 h-52 w-44 rotate-[8deg] overflow-hidden border-[3px] border-orange sm:left-36 sm:h-64 sm:w-52" style={{ animationDelay: "0.6s" }}>
            <Image src={wpMedia.homeAbout} alt="" fill className="object-cover" sizes="220px" />
          </div>
          <div className="fg-tilt absolute right-2 top-0 h-40 w-32 rotate-[18deg] bg-orange sm:h-48 sm:w-36" />
          <div className="fg-tilt float-y absolute right-0 top-4 h-40 w-32 rotate-[18deg] overflow-hidden border-[3px] border-orange sm:h-48 sm:w-36" style={{ animationDelay: "1.1s" }}>
            <Image src={wpMedia.aboutFloat} alt="" fill className="object-cover" sizes="150px" />
          </div>
        </div>

        <ScrollReveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-navy">
            About Falcon
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-navy lg:text-4xl">
            Safety Wear Engineered for Excellence
          </h2>
          <div className="mt-6">
            <h3 className="text-lg font-semibold uppercase text-navy">
              {siteConfig.name} – {siteConfig.tagline}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-secondary-text">
              Founded by {siteConfig.founders.founder} and co-founded by{" "}
              {siteConfig.founders.coFounder}, Falcon Textile Garments is dedicated
              to redefining industrial safety wear through cutting-edge innovation,
              uncompromising quality, and a commitment to worker protection.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "py-5",
                  i % 2 === 0 ? "pr-6" : "border-l border-navy/10 pl-6",
                  i > 1 ? "border-t border-navy/10" : "",
                ].join(" ")}
              >
                <p className="font-display text-3xl font-bold text-navy">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-secondary-text">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border-l-[3px] border-orange pl-4">
              <h3 className="font-semibold text-navy">Engineered for Hazardous Work</h3>
              <p className="mt-1 text-sm text-secondary-text">
                Durable, breathable fabrics designed for maximum safety and mobility.
              </p>
            </div>
            <div className="border-l-[3px] border-orange pl-4">
              <h3 className="font-semibold text-navy">Global Compliance</h3>
              <p className="mt-1 text-sm text-secondary-text">
                Meets international safety standards for oil & gas, construction,
                utilities, and more.
              </p>
            </div>
          </div>
          <Button href="/about" variant="secondary" size="md" className="mt-10">
            Read More
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
