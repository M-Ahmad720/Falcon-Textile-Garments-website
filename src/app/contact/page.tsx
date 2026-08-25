import type { Metadata } from "next";
import Image from "next/image";
import QuoteForm from "@/components/forms/QuoteForm";
import FAQSection from "@/components/sections/FAQSection";
import { siteConfig } from "@/data/site";
import { wpMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Falcon Textile & Garments. Request a quote for industrial workwear solutions.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-32 pt-40 grain">
        <div className="absolute inset-0">
          <Image src={wpMedia.contactBg} alt="" fill className="object-cover opacity-25" priority />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white lg:text-5xl">
            Let&apos;s Build Your Next Workwear Program.
          </h1>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">
              Contact Information
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange">
                  Phone
                </h3>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="mt-1 block text-lg text-navy hover:text-orange"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange">
                  Email
                </h3>
                <a
                  href={`mailto:${siteConfig.inquiryEmail}`}
                  className="mt-1 block text-lg text-navy hover:text-orange"
                >
                  {siteConfig.inquiryEmail}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 block text-sm text-secondary-text hover:text-orange"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange">
                  Address
                </h3>
                <p className="mt-1 text-secondary-text">{siteConfig.address}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange">
                  Hours
                </h3>
                <p className="mt-1 text-secondary-text">{siteConfig.hours.weekdays}</p>
                <p className="text-secondary-text">{siteConfig.hours.closed}</p>
              </div>
            </div>
          </div>

          <div className="rounded-sm bg-light-gray p-8 lg:p-10">
            <h2 className="font-display text-2xl font-bold text-navy">
              Send Your Message
            </h2>
            <p className="mt-2 text-sm text-secondary-text">
              Please feel free to get in touch using the form below.
            </p>
            <QuoteForm className="mt-8" />
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
