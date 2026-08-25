"use client";

const items = [
  "Flame-Resistant Workwear",
  "Hi-Visibility Jackets",
  "Industrial Coveralls",
  "Chemical-Resistant Suits",
  "Nomex Protection",
  "Custom Uniform Programs",
  "Safety Accessories",
  "Global Compliance",
];

export default function HomeTicker() {
  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-navy/10 bg-navy py-4">
      <div className="marquee-track flex w-max gap-10">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-xs font-bold uppercase tracking-[0.22em] text-white"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
        ))}
      </div>
    </section>
  );
}
