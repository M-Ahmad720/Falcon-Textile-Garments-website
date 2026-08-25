"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      const from: gsap.TweenVars = { opacity: 0, duration, delay, ease: "power3.out" };
      if (direction === "up") from.y = 60;
      if (direction === "down") from.y = -60;
      if (direction === "left") from.x = 60;
      if (direction === "right") from.x = -60;

      gsap.from(ref.current, {
        ...from,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [direction, delay, duration, reducedMotion]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
