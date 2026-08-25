"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { stats } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setCount(value);
      return;
    }

    let tween: gsap.core.Tween | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const obj = { val: 0 };
        tween = gsap.to(obj, {
          val: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [value, reducedMotion]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 lg:py-32 grain">
      <div className="absolute inset-0 opacity-10">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(241,90,36,0.45) 0%, transparent 50%)",
          }}
          className="h-full w-full"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center lg:text-left"
            >
              <div className="font-display text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-orange">
                {stat.label}
              </h3>
              <p className="mt-2 text-sm text-white/50">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
