import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { clean, isHoneypot, validEmail } from "@/lib/form-guard";

export async function POST(request: Request) {
  try {
    if (!rateLimit(`newsletter:${clientKey(request)}`)) {
      return NextResponse.json({ ok: false, error: "Too many requests. Please wait and try again." }, { status: 429 });
    }

    const body = await request.json();
    if (isHoneypot(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const email = clean(body.email, 120);
    if (!validEmail(email)) {
      return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
    }

    await saveInquiry({ type: "newsletter", email });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to subscribe.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
