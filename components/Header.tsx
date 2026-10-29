"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/lib/cart";

const primaryLinks = [
  { href: "/bookings", label: "Bookings" },
  { href: "/shop", label: "Shop" },
  { href: "/swap", label: "Swaps" }
];

const moreLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" }
];

export default function Header() {
  const { items } = useCart();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (open && moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleScroll = () => {
      if (open) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        moreButtonRef.current?.focus();
      }
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <header className="border-b border-gray-800 bg-brand-charcoal/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-white">
          Balostech
        </Link>
        <div className="relative hidden flex-1 sm:block">
          <label className="visually-hidden" htmlFor="site-search">
            Search products
          </label>
          <input
            id="site-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-brand-black px-4 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
            placeholder="Search phones, repairs, accessories..."
          />
          <span className="pointer-events-none absolute right-3 top-2.5 text-xs text-gray-500">⌘K</span>
        </div>
        <nav aria-label="Main navigation" className="relative hidden items-center gap-4 text-sm font-semibold text-gray-200 lg:flex">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-red">
              {link.label}
            </Link>
          ))}
          <div className="relative" ref={moreRef}>
            <button
              ref={moreButtonRef}
              type="button"
              className="inline-flex items-center gap-1 rounded-md border border-gray-700 px-3 py-1 text-sm hover:border-brand-red"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              More
              <span aria-hidden>▾</span>
            </button>
            {open ? (
              <div id="more-links" className="absolute right-0 mt-2 w-36 rounded-lg border border-gray-700 bg-brand-black shadow-card">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-left text-sm text-gray-200 hover:bg-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="tel:+2347087910759" className="btn-secondary hidden md:inline-flex">
            Call: +234 708 791 0759
          </Link>
          <Link href="/cart" className="relative rounded-full border border-gray-700 p-2 hover:border-brand-red" aria-label="Cart">
            <span className="text-white">🛒</span>
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
      <nav
        aria-label="Mobile navigation"
        className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 pb-3 text-sm font-semibold text-gray-200 sm:px-6 lg:hidden"
      >
        {[...primaryLinks, ...moreLinks].map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-brand-red">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
