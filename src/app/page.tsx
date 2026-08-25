import Hero3D from "@/components/sections/Hero3D";
import HomeTicker from "@/components/sections/HomeTicker";
import AboutSection from "@/components/sections/AboutSection";
import ProductLineStrip from "@/components/sections/ProductLineStrip";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CatalogPreview from "@/components/sections/CatalogPreview";
import AboutTestimonials from "@/components/sections/AboutTestimonials";
import FAQSection from "@/components/sections/FAQSection";
import ClientPride from "@/components/sections/ClientPride";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero3D />
      <HomeTicker />
      <AboutSection />
      <ProductLineStrip />
      <ServicesSection />
      <WhyChooseUs />
      <CatalogPreview />
      <AboutTestimonials />
      <FAQSection />
      <ClientPride
        eyebrow="Clients & Partners"
        title="Dedicated & Trusted Partners"
        subtitle="Partners who rely on Falcon for industrial workwear across demanding sites."
        logos={[
          "https://falcontextilegarments.com/wp-content/uploads/2021/11/clients-1.png",
          "https://falcontextilegarments.com/wp-content/uploads/2021/11/clients-2.png",
          "https://falcontextilegarments.com/wp-content/uploads/2021/11/clients-3.png",
          "https://falcontextilegarments.com/wp-content/uploads/2021/11/clients-4.png",
          "https://falcontextilegarments.com/wp-content/uploads/2021/11/clients-5.png",
          "https://falcontextilegarments.com/wp-content/uploads/2021/11/clients-6.png",
          "https://falcontextilegarments.com/wp-content/uploads/2021/11/clients-7.png",
          "https://falcontextilegarments.com/wp-content/uploads/2021/11/clients-8.png",
        ]}
      />
      <FinalCTA />
    </>
  );
}
