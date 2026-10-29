import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a gadget repair",
  description: "Book a phone or gadget repair with Balostech. Same-day service is available for selected repairs.",
  alternates: { canonical: "/bookings" }
};

export default function BookingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">Book a repair</h1>
      <p className="text-sm text-gray-400">
        Same-day for screens/batteries; 2-5 days for board work. Lagos walk-in or nationwide mail-in.
      </p>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="card">
          <BookingForm />
        </div>
        <div className="space-y-3">
          <div className="card space-y-2">
            <h2 className="text-lg font-semibold text-white">What to expect</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
              <li>Diagnostics included for board work; we confirm pricing before repair.</li>
              <li>Same-day slots for screens and batteries when booked before 3pm.</li>
              <li>Mail-in? We share packing tips and courier pickup options.</li>
            </ul>
          </div>
          <div className="card space-y-1 text-sm text-gray-300">
            <h3 className="text-base font-semibold text-white">Branches</h3>
            <p>Surulere • Yaba</p>
            <p>Hours: Mon-Sat, 9am - 7pm</p>
            <p>Call/WhatsApp: +234 708 791 0759</p>
          </div>
          <div className="card space-y-1 text-sm text-gray-300">
            <h3 className="text-base font-semibold text-white">Good to know</h3>
            <p>Back up your data before hardware repairs. Water damage success is not guaranteed without full board work.</p>
            <p>Parts and service coverage are disclosed per job; ask for details when booking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
