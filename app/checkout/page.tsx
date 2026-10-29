"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { useCart, useCartHydrated } from "@/lib/cart";
import { formatNGN } from "@/lib/format";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalKobo } = useCart();
  const hydrated = useCartHydrated();

  if (!hydrated) {
    return <p className="card text-sm text-gray-300" role="status">Loading your checkout…</p>;
  }

  if (!items.length) {
    return (
      <section className="card space-y-3">
        <h1 className="text-3xl font-bold text-white">Your cart is empty</h1>
        <p className="text-sm text-gray-300">Add a product before starting checkout.</p>
        <Link href="/shop" className="btn w-fit">Browse products</Link>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
        <p className="text-sm text-gray-400">Shipping or pickup. Secure payments via Paystack or Flutterwave.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="card">
          <CheckoutForm />
        </div>
        <aside className="card space-y-3">
          <h2 className="text-lg font-semibold text-white">Order summary</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {items.map((item) => (
              <li key={item.product.id} className="flex justify-between">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>{formatNGN(item.product.priceKobo * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-gray-800 pt-3 text-base font-bold text-white">
            <span>Total</span>
            <span>{formatNGN(totalKobo())}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
