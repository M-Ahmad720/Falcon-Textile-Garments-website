import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnimatedHeader from "@/components/layout/AnimatedHeader";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";

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
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
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
