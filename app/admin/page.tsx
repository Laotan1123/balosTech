import AdminShell from "@/components/admin/AdminShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">Admin (placeholder)</h1>
      <p className="text-sm text-gray-400">Protect this route with auth. This is a stub UI for order and booking monitoring.</p>
      <AdminShell />
    </div>
  );
}
