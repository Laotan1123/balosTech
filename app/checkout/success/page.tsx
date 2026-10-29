"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOrderStatus, verifyOrderStatus } from "@/lib/payments";
import type { OrderStatusResponse } from "@/lib/api-contracts";
import { formatNGN } from "@/lib/format";
import Link from "next/link";
import { useCart } from "@/lib/cart";

function PaymentStatus() {
  const searchParams = useSearchParams();
  const clearCart = useCart((state) => state.clear);
  const orderId = searchParams.get("orderId");
  const transactionId = searchParams.get("transaction_id") ?? undefined;
  const [order, setOrder] = useState<OrderStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      return;
    }

    let active = true;
    let timeout: ReturnType<typeof setTimeout>;

    const refreshStatus = async () => {
      try {
        const nextOrder = await getOrderStatus(orderId);
        if (!active) return;
        setOrder(nextOrder);
        if (nextOrder.status === "Paid") {
          clearCart();
        } else if (nextOrder.status === "Pending") {
          timeout = setTimeout(refreshStatus, 2500);
        }
      } catch {
        if (active) setError("We couldn't retrieve your order status. Please contact support with your order reference.");
      }
    };

    void verifyOrderStatus(orderId, transactionId)
      .then((verifiedOrder) => {
        if (!active) return;
        setOrder(verifiedOrder);
        if (verifiedOrder.status === "Paid") {
          clearCart();
        } else if (verifiedOrder.status === "Pending") {
          timeout = setTimeout(refreshStatus, 2500);
        }
      })
      .catch(() => {
        if (active) setError("We couldn't verify your payment. Please contact support with your order reference.");
      });
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [orderId, transactionId, clearCart]);

  return (
    <main className="mx-auto max-w-2xl space-y-4 py-16">
      <h1 className="text-3xl font-bold text-white">Payment status</h1>
      {error || !orderId ? (
        <div role="alert" className="card space-y-3 text-red-200">
          <p>{error ?? "The payment return link is missing its order reference."}</p>
          {orderId && <p className="text-sm text-gray-300">Order reference: {orderId}</p>}
          <p className="text-sm text-gray-300">Your cart has not been cleared. Contact <a href="mailto:Mujeebidogbe07@gmail.com">support</a> if you need help.</p>
          <Link href="/checkout" className="btn w-fit">Return to checkout</Link>
        </div>
      ) : order ? (
        <section className="card space-y-3" aria-live="polite" aria-atomic="true">
          <p className="text-lg font-semibold text-white">
            {order.status === "Paid"
              ? "Payment confirmed"
              : order.status === "Failed"
                ? "Payment could not be completed"
                : "Waiting for payment confirmation"}
          </p>
          <p className="text-gray-300">Order total: {formatNGN(order.totalKobo)}</p>
          <p className="text-sm text-gray-400">Order reference: {order.id}</p>
          {order.status === "Pending" ? (
            <p className="text-sm text-gray-300">Your payment is not confirmed yet. Keep this page open; we’ll update it when the provider responds. If it remains pending, contact <a href="mailto:Mujeebidogbe07@gmail.com">support</a> with your order reference.</p>
          ) : order.status === "Paid" ? (
            <>
              <p className="text-sm text-green-200">Your payment is confirmed. We’ll follow up with your order details.</p>
              <Link href="/shop" className="btn w-fit">Continue shopping</Link>
            </>
          ) : (
            <>
              <p className="text-sm text-red-200">No payment was recorded for this order. Your cart is still available so you can try checkout again.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/checkout" className="btn w-fit">Try checkout again</Link>
                <Link href="/contact" className="btn-secondary w-fit">Contact support</Link>
              </div>
            </>
          )}
        </section>
      ) : (
        <p role="status" className="card text-gray-300">Loading your order status…</p>
      )}
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-2xl py-16 text-gray-300">Loading payment status…</main>}>
      <PaymentStatus />
    </Suspense>
  );
}
