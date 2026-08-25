"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { fabrics } from "@/data/fabrics";

const headerTint: Record<string, string> = {
  cotton: "from-[#d94a2e] to-[#f58634]",
  "poly-cotton": "from-[#b35e3e] to-[#c86d50]",
  fr: "from-[#7a3b22] to-[#b35e3e]",
  hospital: "from-[#c86d50] to-[#d94a2e]",
  winter: "from-[#2a1a13] to-[#7a3b22]",
  hivis: "from-[#f58634] to-[#c86d50]",
};

export default function FabricShowcase() {
  return (
    <section className="overflow-hidden bg-[#f8f1e6] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-[12px] bg-gradient-to-br from-[#d94a2e] to-[#f58634] px-8 py-12 text-center text-white shadow-[0_10px_30px_rgba(42,26,19,0.15)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Falcon Textile Garments
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold lg:text-5xl">
              Premium Quality Workwear Fabrics &amp; Materials
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/90">
              Quality You Can Trust • Performance You Can Rely On
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3" style={{ perspective: "1200px" }}>
          {fabrics.map((fabric, i) => (
            <ScrollReveal key={fabric.id} delay={i * 0.06}>
              <article className="fabric-card-3d overflow-hidden rounded-[10px] border border-[#e9dcd2] bg-white">
                <div className={`bg-gradient-to-br px-6 py-5 text-white ${headerTint[fabric.accent]}`}>
                  <h3 className="text-center text-xl font-bold">{fabric.name}</h3>
                </div>
                <div className="relative aspect-[5/3]">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <Spec label="Composition" value={fabric.composition} />
                  {fabric.weave && <Spec label="Weave" value={fabric.weave} />}
                  {fabric.dye && <Spec label="Dye options" value={fabric.dye} />}
                  {fabric.finish && <Spec label="Finish" value={fabric.finish} />}
                  {fabric.care && <Spec label="Care" value={fabric.care} />}
                  {fabric.standards && (
                    <Spec label="Standards" value={fabric.standards.join(", ")} />
                  )}
                  <div>
                    <h4 className="border-l-4 border-[#d94a2e] pl-2.5 text-sm font-bold text-[#7a3b22]">
                      Features
                    </h4>
                    <ul className="mt-2 space-y-1.5">
                      {fabric.features.map((item) => (
                        <li key={item} className="relative pl-5 text-sm text-secondary-text">
                          <span className="absolute left-0 text-[#d94a2e]">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border-l-4 border-[#f58634] bg-[#fdf6f0] p-4">
                    <h4 className="text-sm font-bold text-[#7a3b22]">Ideal For</h4>
                    <p className="mt-1 text-sm text-secondary-text">{fabric.idealFor}</p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-gradient-to-br from-[#2a1a13] to-[#7a3b22] px-6 py-8 text-center text-white">
          <h3 className="font-display text-2xl font-bold">Falcon Textile Garments</h3>
          <p className="mt-2 text-white/80">Quality You Can Trust • Performance You Can Rely On</p>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-dashed border-[#e9dcd2] pb-3 sm:flex-row">
      <span className="min-w-[120px] text-sm font-semibold text-[#7a1a13]">{label}</span>
      <span className="text-sm text-secondary-text">{value}</span>
    </div>
  );
}
