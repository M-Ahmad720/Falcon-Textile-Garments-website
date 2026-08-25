import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { clean, isHoneypot, validEmail } from "@/lib/form-guard";

export async function POST(request: Request) {
  try {
    if (!rateLimit(`quote:${clientKey(request)}`)) {
      return NextResponse.json({ ok: false, error: "Too many requests. Please wait and try again." }, { status: 429 });
    }

    const body = await request.json();
    if (isHoneypot(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const email = clean(body.email, 120);
    const name = clean(body.name, 80);
    if (!name || !validEmail(email)) {
      return NextResponse.json({ ok: false, error: "A valid name and email are required." }, { status: 400 });
    }

    await saveInquiry({
      type: "quote",
      name,
      company: clean(body.company, 120),
      email,
      phone: clean(body.phone, 40),
      country: clean(body.country, 80),
      quantity: clean(body.quantity, 80),
      category: clean(body.category, 80),
      message: clean(body.message, 4000),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send inquiry.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
