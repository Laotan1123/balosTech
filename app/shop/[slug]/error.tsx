"use client";

export default function ProductError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="card space-y-3" role="alert">
      <h1 className="text-2xl font-bold text-white">Product details are unavailable</h1>
      <p className="text-sm text-gray-300">We couldn’t load this product. Please try again.</p>
      <button type="button" className="btn w-fit" onClick={reset}>Try again</button>
    </section>
  );
}
