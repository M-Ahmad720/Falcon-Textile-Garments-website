import type { Metadata } from "next";
import QuoteForm from "@/components/forms/QuoteForm";
import FAQSection from "@/components/sections/FAQSection";
import PageBannerBg from "@/components/ui/PageBannerBg";
import { siteConfig } from "@/data/site";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Contact Industrial Workwear Manufacturer",
  description:
    "Contact Falcon Textile & Garments for custom industrial workwear, safety uniforms and bulk manufacturing quotes for your workforce.",
  path: "/contact",
  keywords: [
    "industrial workwear quote",
    "custom safety uniform supplier",
    "contact workwear manufacturer",
    "bulk workwear order",
  ],
  image: "/images/page-banners/1.jpeg",
});

export default function ContactPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] w-full items-end overflow-hidden bg-navy pb-16 pt-36 grain">
        <PageBannerBg src="/images/page-banners/1.jpeg" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
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
                {siteConfig.phones.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="mt-1 block text-lg text-navy hover:text-orange"
                  >
                    {p.label}
                  </a>
                ))}
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
