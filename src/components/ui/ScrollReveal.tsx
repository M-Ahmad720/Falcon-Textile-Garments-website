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
    const el = ref.current;
    if (!el || reducedMotion) return;

    const from: gsap.TweenVars = { autoAlpha: 0 };
    if (direction === "up") from.y = 60;
    if (direction === "down") from.y = -60;
    if (direction === "left") from.x = 60;
    if (direction === "right") from.x = -60;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        immediateRender: false,
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, ref);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
      gsap.set(el, { clearProps: "all" });
    };
  }, [direction, delay, duration, reducedMotion]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
