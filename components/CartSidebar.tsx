"use client";

import Link from "next/link";
import { useCart, useCartHydrated } from "@/lib/cart";
import { formatNGN } from "@/lib/format";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, totalKobo, clear } = useCart();
  const hydrated = useCartHydrated();

  if (!hydrated) {
    return <div className="card text-sm text-gray-300" role="status">Loading your cart…</div>;
  }

  if (!items.length) {
    return (
      <div className="card">
        <p className="text-sm text-gray-300">Your cart is empty.</p>
        <Link href="/shop" className="btn mt-3 w-fit">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <aside className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-100">Cart</h3>
        <button type="button" className="text-xs text-red-300 underline" onClick={clear}>
          Clear
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.product.id} className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3">
            <div>
              <p className="font-semibold text-gray-100">{item.product.name}</p>
              <p className="text-xs text-gray-400">{item.product.condition}</p>
              <div className="mt-2 flex items-center gap-2">
                <label className="text-xs text-gray-400" htmlFor={`quantity-${item.product.id}`}>Qty</label>
                <input
                  type="number"
                  id={`quantity-${item.product.id}`}
                  min={1}
                  step={1}
                  aria-label={`Quantity for ${item.product.name}`}
                  className="w-16 rounded border border-gray-700 bg-brand-black px-2 py-1 text-sm text-gray-100"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, Number(e.target.value) || 1)}
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-100">{formatNGN(item.product.priceKobo * item.quantity)}</p>
              <button
                type="button"
                className="text-xs text-red-400 underline"
                aria-label={`Remove ${item.product.name} from cart`}
                onClick={() => removeItem(item.product.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between text-sm">
        <span>Total</span>
        <span className="text-lg font-bold text-white">{formatNGN(totalKobo())}</span>
      </div>
      <Link href="/checkout" className="btn w-full text-center">
        Checkout
      </Link>
    </aside>
  );
}
