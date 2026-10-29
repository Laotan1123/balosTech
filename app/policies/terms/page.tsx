import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Read the terms for using Balostech's website, ordering products, repairs, and swaps.",
  alternates: { canonical: "/policies/terms" }
};

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-800 bg-brand-charcoal px-5 py-6 shadow-card">
        <p className="text-xs uppercase tracking-[0.2em] text-red-200">Balos Tech</p>
        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-gray-300">Rules for using our site, ordering products, repairs, and swaps.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Using this site</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>You must be 18+ to place orders or book services.</li>
            <li>Provide accurate information when ordering, booking, or requesting swaps.</li>
            <li>Do not misuse the site (fraud, scraping, security attacks, or illegal activity).</li>
          </ul>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Orders & pricing</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Prices and availability may change; orders may be declined or canceled with a refund if needed.</li>
            <li>Product descriptions aim to be accurate; minor variations in condition/specs may occur (especially for refurbished/used devices).</li>
            <li>Ownership transfers upon full payment and delivery/pickup.</li>
          </ul>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Payments</h2>
          <p>
            Payments are processed by Paystack and Flutterwave; their terms apply to the transaction flow. You authorize us and our
            processors to charge your selected method for the order or service. We do not store full card/USSD/PIN details.
          </p>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Repairs</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>You confirm you own or are authorized to service the device and understand data loss risk; back up before repair.</li>
            <li>Water-damage and board-level work are best-effort; outcomes are not guaranteed without full board intervention.</li>
            <li>Diagnostics fees are non-refundable; service coverage details are confirmed per job.</li>
          </ul>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Swaps</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Quotes depend on accurate condition disclosure and inspection results.</li>
            <li>Once swap credit is issued and exchanged, the swap is final.</li>
            <li>Devices must be free of activation locks and not reported lost/stolen.</li>
          </ul>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Returns & refunds</h2>
          <p>
            Returns and refunds follow our Returns & Refunds Policy. Some items (clearance, damaged post-delivery, completed swaps,
            diagnostics fees) are non-returnable. Shipping/handling may be non-refundable unless an item was faulty on arrival.
          </p>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Liability</h2>
          <p>
            To the extent allowed by law, Balos Tech is not liable for indirect, incidental, or consequential damages. Our total
            liability related to an order or service is limited to the amount you paid for that order or service.
          </p>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">IP & content</h2>
          <p>
            Site content (branding, text, images) is owned by Balos Tech or its licensors. You may not reuse without permission except
            for normal site use.
          </p>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Governing law</h2>
          <p>These terms are governed by the laws of Nigeria. Disputes will be handled in Nigerian courts.</p>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Contact</h2>
          <p>Questions about these terms: Mujeebidogbe07@gmail.com or +234 708 791 0759.</p>
        </div>
      </div>
    </div>
  );
}
