import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <section className="py-32 pt-40">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-navy">
          Terms & Conditions
        </h1>
        <div className="prose prose-neutral mt-8 max-w-none text-secondary-text">
          <p>
            By using the Falcon Textile Garments website, you agree to these terms
            and conditions. All product information, pricing, and availability are
            subject to change without notice.
          </p>
          <p className="mt-4">
            For inquiries regarding orders, quotes, or custom manufacturing, please
            contact us directly.
          </p>
        </div>
      </div>
    </section>
  );
}
