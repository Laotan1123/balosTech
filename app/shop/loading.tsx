export default function ShopLoading() {
  return (
    <div className="space-y-6" role="status" aria-live="polite">
      <h1 className="text-3xl font-bold text-white">Loading products…</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="card h-72 animate-pulse bg-brand-charcoal" />
        ))}
      </div>
    </div>
  );
}
