"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  to: number;
  from?: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  to,
  from = 0,
  decimals = 0,
  suffix = "",
  duration = 1.8,
  className,
}: CountUpProps) {
  const [display, setDisplay] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setDisplay(to);
      return;
    }

    let tween: gsap.core.Tween | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const obj = { val: from };
        tween =         gsap.to(obj, {
          val: to,
          duration,
          ease: "none",
          onUpdate: () => {
            if (decimals > 0) {
              setDisplay(Number(obj.val.toFixed(decimals)));
            } else {
              setDisplay(Math.round(obj.val));
            }
          },
          onComplete: () => setDisplay(to),
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [to, from, decimals, duration, reducedMotion]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : display.toLocaleString("en-US");

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
