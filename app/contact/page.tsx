import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Balostech",
  description: "Contact Balostech for gadget repairs, device sales, orders, and phone swaps.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">Contact</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold text-white">Reach us</h2>
          <p className="text-sm text-gray-300">Mujeebidogbe07@gmail.com</p>
          <p className="text-sm text-gray-300">Call/WhatsApp: +234 708 791 0759</p>
          <p className="text-sm text-gray-300">Surulere / Yaba</p>
          <p className="text-xs text-gray-500">Walk-ins welcome. Same-day screen/battery repairs.</p>
        </div>
        <section className="card space-y-3">
          <h2 className="text-lg font-semibold text-white">Send us a message</h2>
          <p className="text-sm text-gray-300">Our message form is unavailable right now. Email us directly and include your name, contact number, and how we can help.</p>
          <a className="btn w-fit" href="mailto:Mujeebidogbe07@gmail.com">Email Balostech</a>
        </section>
      </div>
    </div>
  );
}
