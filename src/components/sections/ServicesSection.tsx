"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import { services, wpMedia } from "@/data/media";

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 lg:py-32">
      <div className="absolute inset-0">
        <Image
          src={wpMedia.serviceBg}
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/80" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
          Our Services
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase text-white lg:text-4xl">
          Premium Workwear Solutions
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.12}>
              <TiltCard>
                <article className="shine-hover group overflow-hidden bg-white/5 backdrop-blur-sm">
                  <div className="relative aspect-[370/420] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="border-t-2 border-orange p-8">
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm text-white/60">{service.description}</p>
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
