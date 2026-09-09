import type { Metadata } from "next";
import FabricShowcase from "@/components/sections/FabricShowcase";
import Button from "@/components/ui/Button";
import PageBannerBg from "@/components/ui/PageBannerBg";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Industrial Workwear Fabric Guide",
  description:
    "Explore workwear fabrics including cotton twill, poly-cotton, flame-resistant, hi-vis, winter and specialized industrial textiles from Falcon.",
  path: "/fabric-guide",
  keywords: [
    "industrial workwear fabrics",
    "flame resistant fabric",
    "hi visibility fabric",
    "cotton twill workwear fabric",
    "poly cotton uniform fabric",
  ],
  image: "/images/page-banners/3.jpeg",
});

export default function FabricGuidePage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] w-full items-end overflow-hidden bg-navy pb-16 pt-36 grain">
        <PageBannerBg src="/images/page-banners/3.jpeg" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
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
