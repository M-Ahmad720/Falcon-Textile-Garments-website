import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";
import ZoomOnView from "@/components/ui/ZoomOnView";
import Button from "@/components/ui/Button";
import AboutTestimonials from "@/components/sections/AboutTestimonials";
import ClientPride from "@/components/sections/ClientPride";
import { wpMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "About Company",
  description:
    "Founded by Suleman Alvi and co-founded by Eng. Awais Ali, Falcon Textile Garments is dedicated to redefining industrial safety wear through cutting-edge innovation, uncompromising quality, and a commitment to worker protection.",
};

const reasons = [
  {
    title: "Engineered for Hazardous Work",
    text: "Durable, breathable fabrics designed for maximum safety and mobility.",
  },
  {
    title: "Global Compliance",
    text: "Meets international safety standards for oil & gas, construction, utilities, and more.",
  },
  {
    title: "Fire-Retardant Mastery",
    text: "Life-saving protection for high-heat environments.",
  },
];

const aboutStats = [
  { to: 2.5, decimals: 1, suffix: "K", label: "Safety Kits Manufactured", note: "Successful Projects" },
  { to: 138, decimals: 0, suffix: "+", label: "Industrial Partners", note: "Experienced Staff" },
  { to: 99, decimals: 0, suffix: "%", label: "Client Satisfaction", note: "Client Satisfaction" },
];

const servedIndustries = [
  "Oil & Gas",
  "Construction & Engineering",
  "Energy & Utilities",
  "Logistics & Transportation",
  "Defense & Security",
  "Manufacturing",
];

const awards = [
  "Top Safety Wear Innovator 2023",
  "Best Industrial Textile Exporter",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-end bg-navy pb-16 pt-36 grain">
        <div className="absolute inset-0">
          <Image
            src={wpMedia.aboutMain}
            alt="About Falcon Textile & Garments"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          <nav className="mb-4 text-sm text-white/50">
            <Link href="/" className="hover:text-orange">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">About</span>
          </nav>
          <h1 className="font-display text-4xl font-bold text-white lg:text-6xl">
            About Company
          </h1>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <ScrollReveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
              About Falcon
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy lg:text-5xl">
              Safety Wear
              <br />
              Engineered for Excellence
            </h2>
            <p className="mt-6 text-base leading-relaxed text-secondary-text">
              Founded by Suleman Alvi and co-founded by Eng. Awais Ali,
              Falcon Textile Garments is dedicated to redefining industrial safety
              wear through cutting-edge innovation, uncompromising quality, and a
              commitment to worker protection.
            </p>
            <div className="mt-8 border-l-2 border-orange pl-5">
              <h3 className="text-xl font-bold text-navy">Suleman Alvi</h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                Founder
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            <ZoomOnView className="overflow-hidden rounded-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src={wpMedia.aboutFloat}
                  alt="Falcon workwear"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </ZoomOnView>
            <div className="absolute -bottom-6 -left-4 z-10 bg-orange px-8 py-6 text-white shadow-xl sm:-left-8">
              <p className="font-display text-5xl font-bold tabular-nums">
                <CountUp from={1} to={15} duration={2.2} />
              </p>
              <p className="mt-1 text-sm uppercase tracking-wider">
                Years
                <br />
                experience
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-gray py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <ZoomOnView className="overflow-hidden rounded-sm">
            <div className="relative aspect-[4/3]">
              <Image
                src={wpMedia.aboutAlt}
                alt="Falcon manufacturing"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </ZoomOnView>
          <div>
            <h2 className="font-display text-3xl font-bold text-navy lg:text-4xl">
              Reason for Choosing
              <br />
              Falcon
            </h2>
            <div className="mt-10 space-y-8">
              {reasons.map((item) => (
                <div key={item.title} className="border-l-4 border-orange pl-5">
                  <h3 className="font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-secondary-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 grain">
        <div className="absolute inset-0">
          <Image
            src={wpMedia.statsBg}
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 sm:grid-cols-3 lg:px-8">
          {aboutStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                {stat.label}
              </p>
              <p className="mt-3 font-display text-5xl font-bold tabular-nums text-white">
                <CountUp
                  from={stat.decimals > 0 ? 0 : 1}
                  to={stat.to}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  duration={2.1}
                />
              </p>
              <p className="mt-2 text-sm text-orange">{stat.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy lg:text-4xl">
                Industries we served
              </h2>
            </div>
            <p className="max-w-md text-secondary-text">
              We don&apos;t just make garments—we craft confidence, protection, and
              trust that you can wear.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servedIndustries.map((name) => (
              <div
                key={name}
                className="border border-navy/10 px-6 py-8 transition-colors hover:border-orange hover:bg-light-gray"
              >
                <h3 className="text-lg font-semibold text-navy">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 grain">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white lg:text-4xl">
            Best Industrial Textile Innovator
          </h2>
          <p className="mt-4 text-white/60">We have won 12+ awards in our career.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {awards.map((award) => (
              <div key={award} className="border border-white/10 bg-white/5 p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange">
                  Award
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{award}</h3>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/50">
            We have won 27 more awards in our career.
          </p>
        </div>
      </section>

      <AboutTestimonials />

      <ClientPride />

      <section className="py-20 text-center">
        <Button href="/contact" variant="primary" size="lg">
          Request a Quote
        </Button>
      </section>
    </>
  );
}
