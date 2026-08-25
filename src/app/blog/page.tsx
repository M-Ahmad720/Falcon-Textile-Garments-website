import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest news and updates from Falcon Textile & Garments.",
};

const posts = [
  {
    slug: "business-ready-for-integration",
    title: "Is Your Business Ready For Integration?",
    excerpt: "Insights on integrating custom workwear programs into your operations.",
  },
  {
    slug: "marketing-plan-essentials",
    title: "What Should You Include In Your Marketing Plan",
    excerpt: "Key considerations for branded corporate workwear programs.",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-navy py-32 pt-40 grain">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange">
            News & Updates
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white lg:text-6xl">
            Blog
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-sm border border-navy/5 transition-shadow hover:shadow-lg"
              >
                <div className="p-8">
                  <h2 className="text-xl font-bold text-navy group-hover:text-orange">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-secondary-text">{post.excerpt}</p>
                  <Link
                    href="#"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
