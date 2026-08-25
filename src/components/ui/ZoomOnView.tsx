"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function ZoomOnView({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: 0.55, opacity: 0.45, filter: "blur(6px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={ref} className={cn("origin-center will-change-transform", className)}>
      {children}
    </div>
  );
}
