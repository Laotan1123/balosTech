import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping policy",
  description: "Read about delivery, pickup, and shipping for Balostech orders.",
  alternates: { canonical: "/policies/shipping" }
};

export default function ShippingPolicyPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold text-white">Shipping Policy</h1>
      <div className="card space-y-2 text-sm text-gray-300">
        <p>Specify processing times, courier partners, and tracking expectations.</p>
        <p>Note pickup options and any limitations on batteries/li-ion devices for shipping.</p>
      </div>
    </div>
  );
}
