import ScrollReveal from "@/components/ui/ScrollReveal";
import TextReveal from "@/components/ui/TextReveal";

const reasons = [
  {
    title: "The Falcon Creative Process",
    body: (
      <>
        <p>
          <strong>1: Needs Analysis:</strong>
          <br />
          On-site consultations with your safety team. Hazard assessment (heat,
          chemicals, visibility etc.)
        </p>
        <p className="mt-3">
          <strong>2: Conceptualization</strong>
          <br />
          3D garment prototyping. Material innovation lab testing.
        </p>
      </>
    ),
  },
  {
    title: "Unmatched Safety",
    body: (
      <>
        <p>
          <strong>1: Proprietary Fabrics:</strong>
          <br />
          FIRETEX® (550°C resistance for 8+ seconds). VIRASHIELD® (antiviral
          textile treatment)
        </p>
        <p className="mt-3">
          <strong>2: Patented Features:</strong>
          <br />
          Magnetic tool loops (9lb capacity). Knee pad docking system.
        </p>
      </>
    ),
  },
  {
    title: "Heavy Industry Workwear",
    body: (
      <>
        <p>
          <strong>1: Key Features:</strong>
          <br />
          Triple-stitched stress points. Abrasion-resistant panels (12,000+
          Martindale cycles)
        </p>
        <p className="mt-3">
          <strong>Corporate Branded Apparel</strong>
          <br />
          Italian wool blends. Laser-cut logos (0.2mm precision)
        </p>
      </>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
          Why Choose Us
        </p>
        <TextReveal className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase text-navy lg:text-4xl">
          Falcon Textile – Where Innovation Meets Excellence
        </TextReveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reasons.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <article className="shine-hover h-full border border-navy/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <h3 className="text-xl font-semibold uppercase text-navy">{item.title}</h3>
                <div className="mt-4 space-y-1 text-sm leading-relaxed text-secondary-text">
                  {item.body}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
