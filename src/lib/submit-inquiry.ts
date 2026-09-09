"use client";

type InquiryType = "quote" | "newsletter";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

function subjectFor(type: InquiryType, data: Record<string, string>) {
  if (type === "newsletter") return `Newsletter signup: ${data.email}`;
  return `Website inquiry from ${data.name || data.email}`;
}

/**
 * Web3Forms rejects server-to-server calls on the free plan, so when a public
 * key is present the browser posts straight to Web3Forms. Otherwise the
 * submission goes through our API route (Resend).
 */
export async function submitInquiry(
  type: InquiryType,
  data: Record<string, string>,
): Promise<void> {
  if (data.website) return;

  if (WEB3FORMS_KEY) {
    const details = Object.entries(data)
      .filter(([key, value]) => value && key !== "website")
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: subjectFor(type, data),
        from_name: data.name || "Falcon website",
        email: data.email,
        phone: data.phone,
        message: details,
      }),
    });

    let json: { success?: boolean; message?: string } = {};
    try {
      json = await res.json();
    } catch {
      throw new Error("Email service did not respond correctly. Please try again.");
    }
    if (!res.ok || json.success === false) {
      throw new Error(json.message || "Unable to send your message.");
    }
    return;
  }

  const res = await fetch(`/api/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let json: { ok?: boolean; error?: string } = {};
  try {
    json = await res.json();
  } catch {
    throw new Error("Email is not configured yet. Please contact us directly.");
  }
  if (!res.ok || !json.ok) {
    throw new Error(json.error || "Unable to send your message.");
  }
}
