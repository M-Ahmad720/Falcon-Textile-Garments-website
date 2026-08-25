"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/submit-inquiry";

export default function QuoteForm({ className }: { className?: string }) {
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
      await submitInquiry("quote", data);
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "company", label: "Company", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phone", label: "Phone", type: "tel", required: true },
          { name: "country", label: "Country", type: "text", required: true },
          { name: "quantity", label: "Quantity", type: "text", required: false },
        ].map((field) => (
          <div key={field.name}>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary-text">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              className="w-full rounded-sm border border-navy/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-orange focus:ring-1 focus:ring-orange/20"
            />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary-text">
          Product Category
        </label>
        <select
          name="category"
          className="w-full rounded-sm border border-navy/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-orange"
        >
          <option value="">Select category</option>
          <option value="coveralls">Coveralls</option>
          <option value="trousers">Trousers & Cargo</option>
          <option value="fr">Flame-Resistant</option>
          <option value="hivis">Hi-Visibility</option>
          <option value="chemical">Chemical Suits</option>
          <option value="custom">Custom Workwear</option>
        </select>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-secondary-text">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full resize-none rounded-sm border border-navy/10 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-orange focus:ring-1 focus:ring-orange/20"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-sm bg-orange px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-orange/90 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending..." : "Send Inquiry"}
      </button>
      {status === "ok" && (
        <p className="mt-4 text-sm text-navy">Thank you. Your inquiry has been emailed to our team.</p>
      )}
      {status === "error" && <p className="mt-4 text-sm text-orange">{error}</p>}
    </form>
  );
}
