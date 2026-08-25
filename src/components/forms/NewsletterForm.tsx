"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/submit-inquiry";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "");
    const website = String(new FormData(form).get("website") || "");

    try {
      await submitInquiry("newsletter", { email, website });
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to subscribe.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        className="flex-1 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-orange"
        required
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-sm bg-orange px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange/90 disabled:opacity-60"
      >
        {status === "sending" ? "..." : "Subscribe"}
      </button>
      {status === "ok" && (
        <p className="text-xs text-white/70 sm:col-span-2">Subscribed. Thank you.</p>
      )}
      {status === "error" && (
        <p className="text-xs text-orange sm:col-span-2">{error}</p>
      )}
    </form>
  );
}
