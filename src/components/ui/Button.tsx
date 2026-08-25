import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
  magnetic?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-orange text-white hover:bg-rust shadow-lg shadow-orange/25",
  secondary:
    "bg-navy text-white hover:bg-steel",
  outline:
    "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
  ghost:
    "text-navy hover:text-orange",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  magnetic,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider transition-all duration-300 rounded-sm",
        variants[variant],
        sizes[size],
        magnetic && "magnetic-btn",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
