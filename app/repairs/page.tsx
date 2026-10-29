import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phone & gadget repairs",
  description: "Explore Balostech screen, battery, and board-level repair services.",
  alternates: { canonical: "/repairs" }
};

const repairCategories = [
  { name: "Screen replacement", turnaround: "Same-day for common models", cta: "Book screen repair" },
  { name: "Battery replacement", turnaround: "2-4 hours with appointment", cta: "Book battery service" },
  { name: "Board-level repair", turnaround: "2-5 days with diagnostics", cta: "Start diagnostics" }
];

export default function RepairsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">Repairs</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        {repairCategories.map((item) => (
          <article key={item.name} className="card flex flex-col gap-2">
            <h3 className="text-base font-semibold text-white">{item.name}</h3>
            <p className="text-sm text-gray-300">{item.turnaround}</p>
            <Link className="btn-secondary w-fit" href="/bookings">
              {item.cta}
            </Link>
          </article>
        ))}
      </div>
      <div className="space-y-2 text-sm text-gray-300">
        <p>Mail-in and walk-in options available. Water damage and board work require diagnostics first.</p>
        <p>After booking, we confirm parts availability and time slot via email/SMS.</p>
      </div>
    </div>
  );
}
