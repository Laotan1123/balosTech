import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & refunds",
  description: "Review Balostech's returns, refunds, and exchanges policy.",
  alternates: { canonical: "/policies/returns" }
};

export default function ReturnsPolicyPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-800 bg-brand-charcoal px-5 py-6 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge">Returns</span>
          <span className="badge bg-emerald-500/15 text-emerald-100">Refunds</span>
          <span className="badge bg-amber-500/15 text-amber-100">Exchanges</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-white">Returns & Refunds</h1>
        <p className="mt-2 text-sm text-gray-300">
          Fair, transparent policies for devices, accessories, swaps, and repairs.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-4">
          <div className="card space-y-3 text-sm text-gray-300">
            <h2 className="text-base font-semibold text-white">Eligibility windows</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-800 bg-brand-black/60 p-3">
                <p className="text-xs uppercase text-gray-400">Devices & accessories</p>
                <p className="text-sm text-white">Return within 7 days if unused, original condition/packaging.</p>
              </div>
              <div className="rounded-lg border border-gray-800 bg-brand-black/60 p-3">
                <p className="text-xs uppercase text-gray-400">Refurb/used devices</p>
                <p className="text-sm text-white">7-day window; must pass diagnostics on receipt.</p>
              </div>
              <div className="rounded-lg border border-gray-800 bg-brand-black/60 p-3">
                <p className="text-xs uppercase text-gray-400">Swaps</p>
                <p className="text-sm text-white">Final after inspection and credit issuance.</p>
              </div>
              <div className="rounded-lg border border-gray-800 bg-brand-black/60 p-3">
                <p className="text-xs uppercase text-gray-400">Repairs</p>
                <p className="text-sm text-white">Covered under workmanship guarantees; diagnostics fees non-refundable.</p>
              </div>
            </div>
          </div>

          <div className="card space-y-3 text-sm text-gray-300">
            <h2 className="text-base font-semibold text-white">Conditions</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Include all accessories, boxes, and proof of purchase.</li>
              <li>Device must match delivery condition; new damage voids eligibility.</li>
              <li>Remove any account locks (iCloud/Google) before return.</li>
              <li>Accessory packaging must be intact unless dead-on-arrival.</li>
            </ul>
          </div>

          <div className="card space-y-3 text-sm text-gray-300">
            <h2 className="text-base font-semibold text-white">How to request</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <span className="badge bg-brand-red text-white">1</span>
                <p>Contact us with order number, IMEI/serial (if applicable), photos, and reason.</p>
              </div>
              <div className="flex gap-3">
                <span className="badge bg-brand-red text-white">2</span>
                <p>We’ll share Surulere/Yaba drop-off or courier pickup instructions.</p>
              </div>
              <div className="flex gap-3">
                <span className="badge bg-brand-red text-white">3</span>
                <p>We inspect before approving refunds or exchanges.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card space-y-3 text-sm text-gray-300">
            <h2 className="text-base font-semibold text-white">Refunds & exchanges</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Refunds: original payment method (Paystack/Flutterwave) or store credit.</li>
              <li>Exchanges: subject to stock and price differences.</li>
              <li>Shipping/handling and diagnostics fees are non-refundable unless item was faulty on arrival.</li>
            </ul>
          </div>

          <div className="card space-y-3 text-sm text-gray-300">
            <h2 className="text-base font-semibold text-white">Non-returnable</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Final-sale/clearance items.</li>
              <li>Used or physically damaged items after delivery.</li>
              <li>Completed swaps after credit issuance and exchange.</li>
              <li>Diagnostics fees.</li>
            </ul>
          </div>

          <div className="card space-y-3 text-sm text-gray-300">
            <h2 className="text-base font-semibold text-white">Need help?</h2>
            <p>
              Email <span className="text-white">Mujeebidogbe07@gmail.com</span> or call/WhatsApp{" "}
              <span className="text-white">+234 708 791 0759</span>. We’ll guide you through drop-off or pickup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
