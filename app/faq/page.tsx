import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Find answers about Balostech repairs, shipping, payments, and phone swaps.",
  alternates: { canonical: "/faq" }
};

const faqs = [
  { q: "How long do repairs take?", a: "Screens/batteries: same-day. Board work: 2-5 business days after diagnostics." },
  { q: "Can I mail in my device?", a: "Yes. We share packing guidance and book courier pickup where available." },
  { q: "What payment options are supported?", a: "Paystack and Flutterwave for cards, transfers, USSD." }
];

export default function FAQPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">FAQs</h1>
      <div className="space-y-3">
        {faqs.map((item) => (
          <div key={item.q} className="card">
            <h3 className="text-sm font-semibold text-white">{item.q}</h3>
            <p className="text-sm text-gray-300">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
