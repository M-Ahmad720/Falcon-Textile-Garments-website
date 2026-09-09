import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnimatedHeader from "@/components/layout/AnimatedHeader";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import { coreKeywords } from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Industrial Workwear Manufacturer & Supplier | Falcon Textile",
    template: `%s | Falcon Textile & Garments`,
  },
  description:
    "Falcon Textile & Garments manufactures custom industrial workwear, safety uniforms, FR clothing, hi-vis garments, coveralls, jackets and trousers.",
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  keywords: coreKeywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Industrial Workwear Manufacturing",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
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
    title: "Industrial Workwear Manufacturer & Supplier | Falcon Textile",
    description:
      "Custom industrial workwear, safety uniforms, FR clothing, hi-vis garments, coveralls, jackets and trousers for demanding industries.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/page-banners/5.jpeg",
        alt: "Falcon Textile & Garments industrial safety workwear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Workwear Manufacturer & Supplier | Falcon Textile",
    description:
      "Custom safety uniforms, FR clothing, hi-vis workwear, coveralls, jackets and trousers for global industries.",
    images: ["/images/page-banners/5.jpeg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jakarta.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans antialiased"
        suppressHydrationWarning
      >
        <JsonLd />
        <SmoothScroll>
          <AnimatedHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
