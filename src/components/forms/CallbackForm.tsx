"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/submit-inquiry";

export default function CallbackForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries(),
    ) as Record<string, string>;

    try {
      await submitInquiry("callback", data);
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-3">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input
        name="name"
        required
        placeholder="Your name"
        className="w-full rounded-sm border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange"
      />
      <input
        name="phone"
        type="tel"
        required
        placeholder="Phone number"
        className="w-full rounded-sm border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full rounded-sm border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-sm bg-orange px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-orange/90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Get Call Back"}
      </button>
      {status === "ok" && <p className="text-xs text-white/70">Request sent. We will call you shortly.</p>}
      {status === "error" && <p className="text-xs text-orange">{error}</p>}
    </form>
  );
}
