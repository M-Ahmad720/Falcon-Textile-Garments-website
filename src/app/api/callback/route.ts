import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { clean, isHoneypot, validEmail } from "@/lib/form-guard";

export async function POST(request: Request) {
  try {
    if (!rateLimit(`callback:${clientKey(request)}`)) {
      return NextResponse.json({ ok: false, error: "Too many requests. Please wait and try again." }, { status: 429 });
    }

    const body = await request.json();
    if (isHoneypot(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(body.name, 80);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 120);
    if (!name || !phone || !validEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Name, phone and a valid email are required." },
        { status: 400 },
      );
    }

    await saveInquiry({
      type: "callback",
      name,
      phone,
      email,
      message: clean(body.message, 1000) || "Please call me back.",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to request a call back.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
