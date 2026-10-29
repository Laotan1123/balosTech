export default function ProductLoading() {
  return (
    <div className="grid gap-8 lg:grid-cols-2" role="status" aria-live="polite">
      <div className="card h-96 animate-pulse bg-brand-charcoal" aria-hidden="true" />
      <div className="card h-96 animate-pulse bg-brand-charcoal" aria-hidden="true">
        Loading product…
      </div>
    </div>
  );
}
