import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Balostech",
  description: "Learn about Balostech's gadget repairs, device sales, phone swaps, and service locations in Lagos.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">About Balostech</h1>
      <div className="card space-y-3 text-sm text-gray-300">
        <p>
          Founded in 2015, Balostech began with a simple mission — to make gadget repair and device shopping in Nigeria
          reliable, transparent, and customer-focused. We grew from a small repair desk into a trusted brand for everyday
          users, students, professionals, and gadget enthusiasts across Lagos.
        </p>
        <p className="text-base font-semibold text-white">Our Story</p>
        <p>
          We set out to solve a common problem: unreliable technicians, unclear pricing, and the frustration of not
          knowing who to trust with your devices. Today, we combine skilled craftsmanship with modern diagnostic tools to
          deliver fast, dependable repairs — at prices you understand before we begin.
        </p>
        <p className="text-base font-semibold text-white">What We Do</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Gadget repairs for phones, laptops, headphones, speakers, and more.</li>
          <li>Phone swapping so you can trade in and upgrade without stress.</li>
          <li>Sales of quality devices and accessories from trusted suppliers.</li>
        </ul>
        <p>
          Everything we offer is backed by transparent pricing and handled by certified technicians who take pride in
          their work.
        </p>
        <p className="text-base font-semibold text-white">Our Locations</p>
        <p>You can visit any of our service points in Lagos:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Surulere</li>
          <li>Yaba</li>
        </ul>
        <p>Both branches handle diagnostics, repairs, swaps, and pickup orders.</p>
        <p className="text-base font-semibold text-white">Our Team</p>
        <p>
          We’re a small, experienced team of technicians and customer service professionals. Every repair is handled
          carefully, every device is tested thoroughly, and every customer is treated with respect.
        </p>
        <p className="text-base font-semibold text-white">Our Mission</p>
        <p>
          To deliver reliable gadget services built on transparency, quality workmanship, and genuine care — ensuring
          every customer feels confident and supported at every step.
        </p>
        <p className="text-base font-semibold text-white">Our Promise</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Clear and honest pricing</li>
          <li>Certified, skilled technicians</li>
          <li>Fast repair turnaround</li>
          <li>Quality parts and accessories</li>
          <li>Friendly customer support</li>
        </ul>
      </div>
    </div>
  );
}
