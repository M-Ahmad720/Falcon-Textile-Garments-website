"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  name: string;
  images: string[];
}

export default function ProductGallery({ name, images }: ProductGalleryProps) {
  const gallery = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const current = gallery[index] || "";

  const go = useCallback(
    (dir: number) => {
      if (!gallery.length) return;
      setIndex((i) => (i + dir + gallery.length) % gallery.length);
    },
    [gallery.length]
  );

  if (!gallery.length) return null;

  return (
    <div>
      <div className="relative overflow-hidden rounded-sm bg-white">
        <div className="relative aspect-[3/4]">
          <Image
            src={current}
            alt={name}
            fill
            priority
            className="object-contain p-4"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white/90 text-navy"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white/90 text-navy"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="absolute bottom-3 right-3 z-10 bg-navy/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white"
        >
          Fullscreen
        </button>
        <p className="absolute bottom-3 left-3 z-10 bg-navy/80 px-3 py-1.5 text-[10px] font-semibold text-white">
          {index + 1} / {gallery.length}
        </p>
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {gallery.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-sm border-2 bg-white",
                i === index ? "border-orange" : "border-transparent"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img} alt="" fill className="object-contain p-1" sizes="80px" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 text-sm font-semibold uppercase tracking-wider text-white"
            onClick={() => setLightbox(false)}
          >
            Close
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current} alt={name} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </div>
  );
}
