import Link from "next/link";
import type { Metadata } from "next";
import SwapForm from "@/components/SwapForm";
import { getProducts } from "@/lib/products";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Phone swaps",
  description: "Request a phone swap with inspection and a fair quote from Balostech.",
  alternates: { canonical: "/swap" }
};

export default async function SwapPage() {
  const { products } = await getProducts({ page: 1 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Phone swaps</h1>
        <p className="text-sm text-gray-400">
          Get a quote, schedule inspection, and leave with a verified device. Data wipe and setup support included.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="card">
          <SwapForm />
        </div>
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold text-white">Available swap targets</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {products.length ? products.slice(0, 5).map((product) => (
                <li key={product.id} className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0">
                  <div>
                    <p className="font-semibold text-white">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.condition}</p>
                  </div>
                  <Link href={`/shop/${product.slug}`} className="text-brand-red hover:underline">
                    View
                  </Link>
                </li>
              )) : <li className="text-sm text-gray-400" role="status">No swap targets are available right now.</li>}
          </ul>
          <div className="rounded-lg border border-gray-800 bg-brand-black px-3 py-2 text-xs text-gray-400">
            Swaps are finalized after inspection; bring valid ID. Payouts via transfer or instant swap credit.
          </div>
        </div>
      </div>
    </div>
  );
}
