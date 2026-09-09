import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import PageBannerBg from "@/components/ui/PageBannerBg";
import { teamMembers, siteConfig } from "@/data/site";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: `Founder & CEO – ${siteConfig.founders.founder}`,
  description: `Meet ${siteConfig.founders.founder}, Founder and CEO of Falcon Textile & Garments, and discover his vision for dependable industrial safety workwear.`,
  path: "/founder",
  keywords: [
    `${siteConfig.founders.founder} Falcon Textile`,
    "Falcon Textile founder",
    "industrial workwear leadership",
  ],
  image: "/images/page-banners/2.jpeg",
});

export default function FounderPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] w-full items-end overflow-hidden bg-navy pb-16 pt-36 grain">
        <PageBannerBg src="/images/page-banners/2.jpeg" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            Leadership
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white lg:text-6xl">
            Founder & CEO
          </h1>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-20">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.name} direction={i % 2 === 0 ? "up" : "right"}>
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
                >
                  <div className={`relative aspect-[3/4] overflow-hidden rounded-sm ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                      {member.role}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold text-navy">
                      {member.name}
                    </h2>
                    <p className="mt-6 text-secondary-text leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light-gray py-16 text-center">
        <Button href="/contact" variant="primary" size="lg">
          Get in Touch
        </Button>
      </section>
    </>
  );
}
