"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-all duration-500 lg:hidden",
        isOpen ? "visible" : "invisible"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-sm bg-navy transition-transform duration-500 ease-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        data-lenis-prevent
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <span className="text-sm font-bold uppercase tracking-wider text-white">
            Menu
          </span>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-white"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <nav className="p-6">
          {navigation.map((item) => (
            <div key={item.label} className="border-b border-white/5">
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-4 text-sm font-semibold uppercase tracking-wider text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between py-4 text-sm font-semibold uppercase tracking-wider text-white list-none">
                    {item.label}
                    <svg
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="pb-4 pl-4">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href!}
                        onClick={onClose}
                        className="block py-2 text-sm text-white/60 hover:text-orange"
                      >
                        {child.label}
                      </Link>
                    ))}
                    {item.megaMenu?.map((group) =>
                      group.items.map((sub) =>
                        sub.href ? (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={onClose}
                            className="block py-2 text-sm text-white/60 hover:text-orange"
                          >
                            {sub.label}
                          </Link>
                        ) : (
                          <p
                            key={sub.label}
                            className="pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-white/40"
                          >
                            {sub.label}
                          </p>
                        )
                      )
                    )}
                  </div>
                </details>
              )}
            </div>
          ))}
        </nav>

        <div className="flex gap-3 border-t border-white/10 p-6">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.6.4-1 1-1z" /></svg>
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6.5 9H3v12h3.5V9zM4.8 3C3.5 3 2.5 4 2.5 5.3S3.5 7.5 4.8 7.5 7 6.5 7 5.3 6 3 4.8 3zM21 13.5c0-2.8-1.5-4.6-4.4-4.6-2 0-2.9 1.1-3.4 1.9V9H9.8c0 1.3 0 12 0 12H13.3v-6.7c0-.4 0-.7.1-1 .3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.6V21H21v-7.5z" /></svg>
          </a>
          {siteConfig.phones.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className="flex items-center rounded-full border border-white/20 px-4 text-sm text-white"
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
