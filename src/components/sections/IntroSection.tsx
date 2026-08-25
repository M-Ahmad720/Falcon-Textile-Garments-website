"use client";

import TextReveal from "@/components/ui/TextReveal";

export default function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-light-gray py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            Falcon Textile & Garments
          </p>
          <TextReveal
            as="h2"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl xl:text-6xl"
            splitBy="words"
          >
            Workwear Engineered for Real-World Performance.
          </TextReveal>
          <div className="mx-auto mt-8 h-px w-24 bg-orange" />
        </div>
      </div>
    </section>
  );
}
