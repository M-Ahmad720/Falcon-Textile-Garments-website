import { sanitizeHtml } from "@/lib/utils";

export default function SafeHtml({
  html,
  className,
}: {
  html?: string;
  className?: string;
}) {
  if (!html?.trim()) return null;
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
