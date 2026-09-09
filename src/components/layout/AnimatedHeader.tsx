"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navigation } from "@/data/navigation";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { siteConfig } from "@/data/site";

function NavChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={cn("h-3 w-3 shrink-0 transition-transform duration-300", open && "rotate-180")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function AnimatedHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMegaEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMega(label);
  };

  const handleMegaLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 200);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] overflow-visible opacity-100 transition-colors duration-500",
          "bg-navy py-3 shadow-lg shadow-black/20",
          scrolled || activeMega || mobileOpen ? "py-3" : "py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.megaMenu || item.children
                    ? handleMegaEnter(item.label)
                    : setActiveMega(null)
                }
                onMouseLeave={handleMegaLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group relative text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:text-orange"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : item.children ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                        activeMega === item.label ? "text-orange" : "text-white/80 hover:text-white"
                      )}
                    >
                      {item.label}
                      <NavChevron open={activeMega === item.label} />
                    </button>
                    <div
                      className={cn(
                        "absolute left-0 top-full z-[110] pt-4 transition-all duration-300",
                        activeMega === item.label
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0 pointer-events-none"
                      )}
                    >
                      <div className="min-w-[240px] rounded-[28px] border border-white/50 bg-white/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href!}
                            className="flex items-start gap-3 py-2.5 text-[15px] font-medium text-navy transition-colors hover:text-orange"
                          >
                            <span className="mt-1.5 h-2 w-2 shrink-0 bg-orange" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                      activeMega === item.label
                        ? "text-orange"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {item.label}
                    <NavChevron open={activeMega === item.label} />
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-orange hover:bg-orange"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.6.4-1 1-1z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-orange hover:bg-orange"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M6.5 9H3v12h3.5V9zM4.8 3C3.5 3 2.5 4 2.5 5.3S3.5 7.5 4.8 7.5 7 6.5 7 5.3 6 3 4.8 3zM21 13.5c0-2.8-1.5-4.6-4.4-4.6-2 0-2.9 1.1-3.4 1.9V9H9.8c0 1.3 0 12 0 12H13.3v-6.7c0-.4 0-.7.1-1 .3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.6V21H21v-7.5z" />
              </svg>
            </a>
            <div
              className="relative"
              onMouseEnter={() => handleMegaEnter("phone")}
              onMouseLeave={handleMegaLeave}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-2 text-white transition-colors",
                  activeMega === "phone"
                    ? "border-orange bg-orange"
                    : "border-white/20 hover:border-orange hover:bg-orange"
                )}
                aria-label="Phone"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1l-2.3 2.9z" />
                </svg>
                <NavChevron open={activeMega === "phone"} />
              </button>
              <div
                className={cn(
                  "absolute right-0 top-full pt-3 transition-all duration-300",
                  activeMega === "phone"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0 pointer-events-none"
                )}
              >
                <div className="overflow-hidden rounded-sm border border-white/10 bg-navy/95 shadow-lg backdrop-blur-md">
                  {siteConfig.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="block whitespace-nowrap px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5 hover:text-orange"
                    >
                      {p.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
              aria-label="Open menu"
            >
              <span className="h-0.5 w-6 bg-white" />
              <span className="h-0.5 w-4 bg-white" />
            </button>
          </div>
        </div>

        {navigation.map(
          (item) =>
            item.megaMenu && (
              <MegaMenu
                key={item.label}
                groups={item.megaMenu}
                visual={item.megaVisual}
                isOpen={activeMega === item.label}
                onMouseEnter={() => handleMegaEnter(item.label)}
                onMouseLeave={handleMegaLeave}
              />
            )
        )}
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
