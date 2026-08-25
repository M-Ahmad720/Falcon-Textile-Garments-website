import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-light-gray px-6 text-center">
      <h1 className="font-display text-6xl font-bold text-navy">404</h1>
      <p className="mt-4 text-secondary-text">Page not found</p>
      <Link
        href="/"
        className="mt-8 rounded-sm bg-orange px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white"
      >
        Back to Home
      </Link>
    </section>
  );
}
