import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageBannerBg from "@/components/ui/PageBannerBg";
import { teamMembers } from "@/data/site";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Industrial Workwear Leadership Team",
  description:
    "Meet the Falcon Textile & Garments leadership team driving quality, innovation and dependable industrial safety workwear manufacturing.",
  path: "/team",
  keywords: [
    "Falcon Textile team",
    "workwear manufacturing leadership",
    "industrial garment experts",
  ],
  image: "/images/page-banners/5.jpeg",
});

export default function TeamPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] w-full items-end overflow-hidden bg-navy pb-16 pt-36 grain">
        <PageBannerBg src="/images/page-banners/5.jpeg" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            Our People
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white lg:text-6xl">
            Team Members
          </h1>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.name} direction={i % 2 === 0 ? "up" : "right"}>
                <article className="group overflow-hidden rounded-sm bg-light-gray">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-navy">{member.name}</h2>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-orange">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm text-secondary-text">{member.bio}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
