import type { CheckoutResponse, OrderStatusResponse } from "./api-contracts";

const configuredApiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";
const API_BASE = configuredApiBase.replace(/\/+$/, "").replace(/\/api$/, "");

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export type CheckoutPayload = {
  items: Array<{ productId: string; quantity: number }>;
  email: string;
  phone: string;
  fulfillment: "shipping" | "pickup";
  address?: string;
  city?: string;
};

export async function initPaystackCheckout(payload: CheckoutPayload) {
  return postJSON<CheckoutResponse>("/api/payments/paystack/initialize", payload);
}

export async function initFlutterwaveCheckout(payload: CheckoutPayload) {
  return postJSON<CheckoutResponse>("/api/payments/flutterwave/initialize", payload);
}

export async function getOrderStatus(orderId: string) {
  const res = await fetch(`${API_BASE}/api/payments/orders/${encodeURIComponent(orderId)}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<OrderStatusResponse>;
}

export async function verifyOrderStatus(orderId: string, transactionId?: string) {
  const transactionQuery = transactionId ? `?transaction_id=${encodeURIComponent(transactionId)}` : "";
  const res = await fetch(
    `${API_BASE}/api/payments/orders/${encodeURIComponent(orderId)}/verify${transactionQuery}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<OrderStatusResponse>;
}
