import CartSidebar from "@/components/CartSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false, follow: false }
};

export default function CartPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">Cart</h1>
      <CartSidebar />
    </div>
  );
}
