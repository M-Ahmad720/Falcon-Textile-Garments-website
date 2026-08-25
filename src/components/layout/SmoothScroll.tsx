"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function jumpToPageStart(lenis?: Lenis | null) {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  if (hash) {
    const target = document.querySelector(hash);
    if (target instanceof HTMLElement) {
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else target.scrollIntoView();
      return;
    }
  }

  if (lenis) lenis.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }

    ScrollTrigger.getAll().forEach((st) => st.kill());

    if (reducedMotion) {
      jumpToPageStart();
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    jumpToPageStart(lenis);

    const refreshId = requestAnimationFrame(() => {
      jumpToPageStart(lenis);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      gsap.ticker.remove(onTick);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, [reducedMotion, pathname]);

  return (
    <div ref={wrapperRef} className="flex min-h-full flex-1 flex-col">
      {children}
    </div>
  );
}
