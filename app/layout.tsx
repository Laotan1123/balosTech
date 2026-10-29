import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import ToastViewport from "@/components/ToastViewport";
import AnalyticsConsent from "@/components/AnalyticsConsent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Balostech — Gadget repairs, phone swaps & accessories across Nigeria",
    template: "%s | Balostech"
  },
  description: "Fast gadget repairs, trusted device sales, and fair phone swaps. Secure checkout with Paystack/Flutterwave.",
  applicationName: "Balostech",
  openGraph: {
    title: "Balostech — Gadget repairs, phone swaps & accessories across Nigeria",
    description: "Book repairs, shop phones, and swap devices with a trusted Nigerian team.",
    url: siteUrl,
    siteName: "Balostech",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-brand-black text-gray-100">
        <Providers>
          <a href="#content" className="visually-hidden">
            Skip to content
          </a>
          <Header />
          <main id="content" className="mx-auto flex max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
          <ToastViewport />
          <AnalyticsConsent />
        </Providers>
      </body>
    </html>
  );
}
