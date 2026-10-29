import Link from "next/link";
import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Gadget repairs, device sales & phone swaps",
  description: "Book trusted gadget repairs, shop verified phones and accessories, or request a fair phone swap across Nigeria.",
  alternates: { canonical: "/" }
};

export default async function Home() {
  const { products } = await getProducts({ page: 1 });

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-gray-800 bg-gradient-to-r from-brand-charcoal to-brand-black px-6 py-10 shadow-card sm:px-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-red-200">Balostech</p>
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Gadget repairs, phone swaps & accessories across Nigeria.
          </h1>
          <p className="text-base text-gray-300">
            Same-day fixes, verified devices, and fair swaps. Pay securely with Paystack or Flutterwave.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn" href="/bookings">
              Book repair
            </Link>
            <Link className="btn-secondary" href="/shop">
              Shop phones
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="badge">Same-day repairs</span>
            <span className="badge">Nationwide shipping</span>
            <span className="badge">Paystack / Flutterwave</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured devices</h2>
            <p className="text-sm text-gray-400">Curated phones & accessories with clear quality checks.</p>
          </div>
          <Link href="/shop" className="text-sm text-brand-red hover:underline">
            View all
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "Repairs", desc: "Screens, batteries, and board work with genuine parts.", href: "/bookings" },
          { title: "Swaps", desc: "Fair quotes with inspection. Data-wipe and setup help.", href: "/swap" },
          { title: "Accessories", desc: "Chargers, power banks, and audio gear tested for QA.", href: "/shop" }
        ].map((card) => (
          <div key={card.title} className="card space-y-2">
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="text-sm text-gray-400">{card.desc}</p>
            <Link href={card.href} className="text-sm text-brand-red hover:underline">
              Explore
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
