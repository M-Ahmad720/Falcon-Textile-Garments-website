import type { Metadata } from "next";
import FabricShowcase from "@/components/sections/FabricShowcase";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Falcon Fabric Book",
  description:
    "Explore Falcon Textile's premium fabric guide — cotton twill, flame-retardant, hi-visibility, and specialized industrial textiles.",
};

export default function FabricGuidePage() {
  return (
    <>
      <section className="bg-navy py-32 pt-40 grain">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            Resources
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white lg:text-6xl">
            Falcon Fabric Book
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            Falcon Textile Garments — premium workwear fabrics and materials, from
            cotton twill and poly-cotton to FR, hospital, winter and hi-vis cloth.
          </p>
        </div>
      </section>
      <FabricShowcase />
      <section className="py-16 text-center">
        <Button href="/contact" variant="primary" size="lg">
          Request Fabric Samples
        </Button>
      </section>
    </>
  );
}
