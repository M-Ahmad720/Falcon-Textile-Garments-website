import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-32 pt-40">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-navy">Privacy Policy</h1>
        <div className="prose prose-neutral mt-8 max-w-none text-secondary-text">
          <p>
            Falcon Textile Garments respects your privacy. This policy outlines how
            we collect, use, and protect your personal information when you visit our
            website or submit inquiries through our contact forms.
          </p>
          <p className="mt-4">
            For questions about this policy, contact us at info@falcontextilegarments.com.
          </p>
        </div>
      </div>
    </section>
  );
}
