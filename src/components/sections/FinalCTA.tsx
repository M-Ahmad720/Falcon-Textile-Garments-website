"use client";

import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-32 grain">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(245,130,32,0.28) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(211,32,39,0.32) 0%, transparent 40%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full border border-orange/40 pulse-ring" />
        <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Ready to start your project?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
          Call {siteConfig.phone} or {siteConfig.phoneUS} or write to{" "}
          {siteConfig.inquiryEmail} for a quote on industrial workwear.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="primary" size="lg">
            Request a Quote
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Falcon
          </Button>
        </div>
      </div>
    </section>
  );
}
