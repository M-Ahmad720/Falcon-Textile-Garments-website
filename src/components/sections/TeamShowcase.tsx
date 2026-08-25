"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers } from "@/data/site";
import Button from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function TeamShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const member = teamMembers[0];

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".team-reveal", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="team-reveal relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
          </div>
          <div>
            <p className="team-reveal text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
              Leadership
            </p>
            <h2 className="team-reveal mt-3 font-display text-3xl font-bold text-navy lg:text-4xl">
              {member.name}
            </h2>
            <p className="team-reveal mt-2 text-sm font-semibold uppercase tracking-wider text-steel">
              {member.role}
            </p>
            <p className="team-reveal mt-6 text-base leading-relaxed text-secondary-text">
              {member.bio}
            </p>
            <Button href="/founder" variant="ghost" size="md" className="team-reveal mt-8 !px-0">
              Meet Our Founders →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
