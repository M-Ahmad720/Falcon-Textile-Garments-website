"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  splitBy?: "words" | "chars" | "lines";
}

export default function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const parts =
    splitBy === "chars"
      ? children.split("")
      : splitBy === "lines"
        ? children.split("\n")
        : children.split(" ");

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll(".reveal-part"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: splitBy === "chars" ? 0.02 : 0.06,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [children, delay, splitBy, reducedMotion]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className={cn("inline-block overflow-hidden", splitBy === "lines" && "block")}
        >
          <span className="reveal-part inline-block">
            {part}
            {splitBy === "words" && i < parts.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
