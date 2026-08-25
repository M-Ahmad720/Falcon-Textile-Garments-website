"use client";

import { certifications } from "@/data/site";

export default function CertificationMarquee() {
  const items = [...certifications, ...certifications];

  return (
    <section className="overflow-hidden border-y border-navy/5 bg-light-gray py-12">
      <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
        Quality & Certifications
      </p>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee gap-16 whitespace-nowrap">
          {items.map((cert, i) => (
            <div
              key={`${cert.name}-${i}`}
              className="group flex flex-shrink-0 flex-col items-center gap-2 px-8 transition-transform hover:scale-105"
            >
              <span className="text-2xl font-bold text-navy">{cert.name}</span>
              <span className="text-xs text-secondary-text">{cert.description}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            white-space: normal;
          }
        }
      `}</style>
    </section>
  );
}
