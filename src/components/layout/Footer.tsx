"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { footerLinks as links } from "@/data/navigation";
import { siteConfig as config } from "@/data/site";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Logo from "./Logo";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".footer-inner", {
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="relative isolate bg-navy text-white">
      <div className="footer-inner relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo height={56} />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
              Founded by {config.founders.founder} and co-founded by{" "}
              {config.founders.coFounder}. Revolutionizing industrial safety wear
              through innovation, integrity, and quality.
            </p>
            <NewsletterForm />
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-orange">
              Company
            </h4>
            <ul className="space-y-2">
              {links.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-orange">
              Workwear
            </h4>
            <ul className="space-y-2">
              {links.workwear.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-orange">
              Accessories
            </h4>
            <ul className="space-y-2">
              {links.accessories.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-orange">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href={`tel:${config.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {config.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${config.email}`} className="hover:text-white">
                  {config.email}
                </a>
              </li>
              <li className="leading-relaxed">{config.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Falcon Textile Garments. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-white/40 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-xs text-white/40 hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
