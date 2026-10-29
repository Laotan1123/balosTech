import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-brand-charcoal">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-semibold text-gray-200">Balostech</p>
          <p>Trusted gadget repairs, sales, and swaps across Nigeria.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-brand-red" href="/policies/privacy">
            Privacy
          </Link>
          <Link className="hover:text-brand-red" href="/policies/returns">
            Returns
          </Link>
          <Link className="hover:text-brand-red" href="/policies/terms">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
