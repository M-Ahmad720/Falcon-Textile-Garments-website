"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { MegaMenuGroup, MegaVisual } from "@/data/navigation";

interface MegaMenuProps {
  groups: MegaMenuGroup[];
  visual?: MegaVisual;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenu({
  groups,
  visual,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  const columns =
    groups.length === 1
      ? [groups[0].items]
      : groups.map((group) => group.items);

  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-full z-[110] px-4 pt-3 pb-16 transition-all duration-300 lg:px-8",
        isOpen
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-3 opacity-0 pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative mx-auto max-w-6xl overflow-visible">
        <div
          className={cn(
            "rounded-[40px] border border-white/50 bg-white/92 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl lg:p-10",
            visual && "lg:pr-56"
          )}
        >
          <div
            className={cn(
              "grid gap-x-10 gap-y-4",
              columns.length >= 4
                ? "grid-cols-2 lg:grid-cols-4"
                : columns.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : columns.length === 3
                    ? "grid-cols-1 lg:grid-cols-3"
                    : "grid-cols-1"
            )}
          >
            {columns.map((items, colIndex) => (
              <ul key={colIndex} className="space-y-3.5">
                {items.map((item) => (
                  <li key={item.href ?? item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="group flex items-start gap-3 text-[15px] font-medium text-navy transition-colors hover:text-orange"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 bg-orange" />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <span className="flex items-start gap-3 text-[15px] font-semibold uppercase tracking-wide text-navy">
                        <span className="mt-1.5 h-2 w-2 shrink-0 bg-orange" />
                        <span>{item.label}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {visual?.images[0] && (
          <div className="pointer-events-none absolute -bottom-14 -right-6 z-20 hidden h-[340px] w-[230px] sm:block lg:-right-10 lg:h-[400px] lg:w-[280px] [perspective:900px]">
            <div className="menu-visual-3d relative h-full w-full">
              <Image
                src={visual.images[0]}
                alt=""
                fill
                className="object-contain object-bottom drop-shadow-[0_20px_28px_rgba(0,0,0,0.22)]"
                sizes="280px"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
