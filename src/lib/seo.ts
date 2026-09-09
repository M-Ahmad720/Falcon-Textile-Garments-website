import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const coreKeywords = [
  "industrial workwear manufacturer",
  "safety workwear supplier",
  "protective clothing manufacturer",
  "custom workwear uniforms",
  "flame resistant clothing",
  "high visibility workwear",
  "industrial uniforms Pakistan",
  "workwear exporter Pakistan",
];

type SeoMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

export function createSeoMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/images/page-banners/5.jpeg",
  noIndex = false,
}: SeoMetadataOptions): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");

  return {
    title,
    description,
    keywords: [...new Set([...keywords, ...coreKeywords])],
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [{ url: image, alt: `${title} | ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function categorySeoDescription(name: string): string {
  return `Explore ${name} from Falcon Textile & Garments, a trusted industrial workwear manufacturer offering durable, custom safety clothing for global industries.`;
}

export function conciseDescription(value: string, maxLength = 158): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const shortened = normalized.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 100 ? lastSpace : maxLength - 1)}…`;
}
