import Image from "next/image";

/** Product-matched banners from background.zip */
export const BANNER = {
  jacket: "/images/page-banners/1.jpeg",
  suit: "/images/page-banners/2.jpeg",
  fabric: "/images/page-banners/3.jpeg",
  trousers: "/images/page-banners/4.jpeg",
  company: "/images/page-banners/5.jpeg",
} as const;

/** Map product / category slug to the matching product banner. */
export function bannerForCategory(
  slug: string,
  parentSlug?: string | null
): string {
  const s = `${slug} ${parentSlug ?? ""}`.toLowerCase();

  if (
    /jacket|outerwear|wool-jacket|safety-jacket|parachute-vest|parka/.test(s)
  ) {
    return BANNER.jacket;
  }
  if (/trouser|pants|cargo-trouser|cargo-pant/.test(s)) {
    return BANNER.trousers;
  }
  if (
    /suit|coverall|overall|bib|braces|nomex-coverall|chemical-suit/.test(s)
  ) {
    return BANNER.suit;
  }
  if (
    /flame-resistant|flame-retardant|chemical-industrial|high-visibility|hi-visibility/.test(
      s
    )
  ) {
    return BANNER.suit;
  }
  if (/shirt|labwear|coat/.test(s)) {
    return BANNER.fabric;
  }
  if (/winter|seasonal|heavy-duty|corporate/.test(s)) {
    return BANNER.company;
  }
  return BANNER.suit;
}

type Props = {
  src: string;
  priority?: boolean;
};

/** Full-bleed page-title banner background. */
export default function PageBannerBg({ src, priority = true }: Props) {
  return (
    <div className="absolute inset-0 h-full w-full" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        className="h-full w-full object-cover object-center opacity-60"
        sizes="100vw"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/55 to-navy/40" />
    </div>
  );
}
