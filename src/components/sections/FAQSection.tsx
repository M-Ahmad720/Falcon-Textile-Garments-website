"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { faqItems } from "@/data/faq";
import { siteConfig } from "@/data/site";
import CallbackForm from "@/components/forms/CallbackForm";
import { wpMedia } from "@/data/media";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-light-gray py-24 lg:py-32">
      <div className="absolute inset-0 opacity-30">
        <Image
          src={wpMedia.faqBg}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <div className="bg-navy p-8 text-white lg:p-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            Start Your Project
          </p>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="mt-4 block font-display text-3xl font-bold hover:text-orange"
          >
            {siteConfig.phone}
          </a>
          <p className="mt-6 text-sm text-white/70">
            Send mail on:{" "}
            <a
              href={`mailto:${siteConfig.inquiryEmail}`}
              className="text-white underline-offset-4 hover:underline"
            >
              {siteConfig.inquiryEmail}
            </a>
          </p>
          <ul className="mt-8 space-y-2 text-sm text-white/70">
            <li>{siteConfig.hours.weekdays}</li>
            <li>{siteConfig.hours.closed}</li>
          </ul>
          <CallbackForm />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            Faq&apos;s
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy lg:text-4xl">
            How can we help you
          </h2>

          <div className="mt-8 space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-sm border border-navy/5 bg-white transition-colors hover:border-navy/10"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={open === i}
                >
                  <span className="flex items-center gap-4">
                    <span className="text-sm font-bold text-orange/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-navy">{item.question}</span>
                  </span>
                  <span
                    className={cn(
                      "flex-shrink-0 text-xl text-orange transition-transform duration-300",
                      open === i && "rotate-45"
                    )}
                  >
                    +
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-orange/20 px-6 pb-6 pt-2">
                      <p className="pl-10 text-secondary-text">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
