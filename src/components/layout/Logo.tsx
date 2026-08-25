import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className, height = 48 }: LogoProps) {
  const width = Math.round(height * (640 / 160));

  return (
    <Link
      href="/"
      className={cn(
        "relative z-10 inline-flex shrink-0 items-center overflow-hidden rounded-[2px] bg-white",
        className
      )}
    >
      <Image
        src="/images/falcon-logo.png"
        alt="Falcon Textile & Garments"
        width={width}
        height={height}
        priority
        className="h-10 w-auto bg-white object-contain sm:h-12"
      />
    </Link>
  );
}
