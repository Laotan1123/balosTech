"use client";

export default function ShopError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="card space-y-3" role="alert">
      <h1 className="text-2xl font-bold text-white">Products are unavailable</h1>
      <p className="text-sm text-gray-300">We couldn’t load the shop right now. Please try again.</p>
      <button type="button" className="btn w-fit" onClick={reset}>Try again</button>
    </section>
  );
}
