import { siteConfig } from "@/data/site";
import type { Inquiry } from "@/lib/inquiries";

export function inquiryInbox() {
  return process.env.INQUIRY_EMAIL || siteConfig.inquiryEmail || siteConfig.email;
}

export async function sendInquiryEmail(inquiry: Inquiry): Promise<void> {
  const to = inquiryInbox();
  const subject =
    inquiry.type === "newsletter"
      ? `Newsletter signup: ${inquiry.email}`
      : inquiry.type === "callback"
        ? `Call-back request from ${inquiry.name || inquiry.phone || inquiry.email}`
        : `Website inquiry from ${inquiry.name || inquiry.email}`;

  const text = Object.entries(inquiry)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Falcon Website <onboarding@resend.dev>",
        to: [to],
        reply_to: inquiry.email,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Resend failed: ${body.slice(0, 200)}`);
    }
    return;
  }

  if (process.env.WEB3FORMS_ACCESS_KEY) {
    // Web3Forms blocks server-to-server calls on the free plan, so the browser
    // must post directly. Rename the variable so the client picks it up.
    throw new Error(
      "Rename WEB3FORMS_ACCESS_KEY to NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local — Web3Forms only accepts submissions from the browser on the free plan.",
    );
  }

  throw new Error(
    "Email is not configured. Add RESEND_API_KEY or NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local.",
  );
}
