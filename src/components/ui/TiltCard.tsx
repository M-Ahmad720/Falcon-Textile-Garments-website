"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("transition-transform duration-200 will-change-transform", className)}
    >
      {children}
    </div>
  );
}
