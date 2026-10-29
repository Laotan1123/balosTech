import type { Metadata } from "next";
import AnalyticsPreferencesButton from "@/components/AnalyticsPreferencesButton";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Read how Balostech handles personal information for shopping, repairs, and swaps.",
  alternates: { canonical: "/policies/privacy" }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-800 bg-gradient-to-r from-brand-charcoal to-brand-black px-5 py-6 shadow-card">
        <p className="text-xs uppercase tracking-[0.2em] text-red-200">Balos Tech</p>
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-300">
          How we handle your data when you shop, book repairs, or request swaps.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Data we collect</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Contact details: name, email, phone/WhatsApp.</li>
            <li>Orders & fulfillment: shipping address, pickup branch (Surulere / Yaba), items selected.</li>
            <li>Bookings & swaps: device model, condition, issue notes, and photos you upload (up to 4).</li>
            <li>Payments: intent details via Paystack/Flutterwave (we do not store card/USSD/PIN).</li>
            <li>Technical data: IP, device/browser info, and logs for security/performance.</li>
          </ul>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">How we use it</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Process orders, repairs, swaps, and support requests.</li>
            <li>Send status updates for delivery, pickup, and service confirmations.</li>
            <li>Fraud prevention, security, and performance monitoring.</li>
            <li>Improve our services and site experience.</li>
          </ul>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Payments</h2>
          <p>
            Paystack and Flutterwave process payments on their systems. They typically collect card/transfer/USSD details,
            device/network data, fraud signals, and transaction references. We receive confirmation tokens (e.g.,
            reference or session IDs) — not your full card or PIN details.
          </p>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Sharing</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Payments: Paystack, Flutterwave.</li>
            <li>Logistics: couriers for delivery or pickup coordination.</li>
            <li>Service tools: email/SMS providers for notifications.</li>
            <li>Legal: if required to comply with law or protect users and our services.</li>
          </ul>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Retention</h2>
          <p>We keep order/booking records for service, accounting, and legal needs, then delete or anonymize.</p>
        </div>

        <div id="analytics-preferences" className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Analytics and error monitoring</h2>
          <p>
            Optional Plausible analytics is loaded only after you opt in. You can change your choice at any time.
            When configured, Sentry receives technical error details to help us fix problems; we disable default
            personal-data collection and remove request headers, bodies, and query strings from reported events.
          </p>
          <AnalyticsPreferencesButton />
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Your choices</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Access, update, or request deletion of your personal data.</li>
            <li>Opt out of non-essential communications anytime.</li>
          </ul>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Age</h2>
          <p>Our services are intended for individuals 18+.</p>
        </div>

        <div className="card space-y-3 text-sm text-gray-300">
          <h2 className="text-base font-semibold text-white">Contact</h2>
          <p>Questions or privacy requests: Mujeebidogbe07@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
