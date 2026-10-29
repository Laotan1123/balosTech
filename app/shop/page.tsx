import Link from "next/link";
import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Shop phones & accessories",
  description: "Browse verified phones, tablets, and accessories from Balostech.",
  alternates: { canonical: "/shop" }
};

const PAGE_SIZE = 6;

type SearchParams = {
  q?: string;
  brand?: string;
  condition?: string;
  min?: string;
  max?: string;
  page?: string;
};

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const requestedPage = Number(sp.page ?? 1);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const { products, total } = await getProducts({
    search: sp.q,
    brand: sp.brand,
    condition: sp.condition,
    min: sp.min,
    max: sp.max,
    page
  });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const filterParams = new URLSearchParams();

  for (const key of ["q", "brand", "condition", "min", "max"] as const) {
    if (sp[key]) {
      filterParams.set(key, sp[key]);
    }
  }

  const pageHref = (targetPage: number) => {
    const params = new URLSearchParams(filterParams);
    params.set("page", String(targetPage));
    return `/shop?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Shop</h1>
        <p className="text-sm text-gray-400">Browse verified phones, tablets, and accessories.</p>
      </div>

      <form className="grid gap-3 rounded-xl border border-gray-800 bg-brand-charcoal px-4 py-4 sm:grid-cols-4 sm:items-end">
        <label className="flex flex-col gap-1">
          <span className="label">Search</span>
          <input defaultValue={sp.q} name="q" className="input" placeholder="Search devices" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="label">Brand</span>
          <select name="brand" defaultValue={sp.brand} className="input">
            <option value="">All</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Google">Google</option>
            <option value="Tecno">Tecno</option>
            <option value="Anker">Anker</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="label">Condition</span>
          <select name="condition" defaultValue={sp.condition} className="input">
            <option value="">Any</option>
            <option value="New">New</option>
            <option value="Refurbished">Refurbished</option>
            <option value="Used">Used</option>
          </select>
        </label>
        <div className="flex gap-2">
          <label className="flex w-1/2 flex-col gap-1">
            <span className="label text-xs">Min ₦</span>
            <input type="number" min="0" step="1" name="min" defaultValue={sp.min} className="input" placeholder="100000" />
          </label>
          <label className="flex w-1/2 flex-col gap-1">
            <span className="label text-xs">Max ₦</span>
            <input type="number" min="0" step="1" name="max" defaultValue={sp.max} className="input" placeholder="700000" />
          </label>
        </div>
        <button type="submit" className="btn sm:col-span-4 sm:w-fit">
          Apply filters
        </button>
      </form>

      <ProductGrid products={products} />

      <div className="flex items-center justify-between text-sm text-gray-300">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Link
            href={pageHref(Math.max(1, page - 1))}
            className={`btn-secondary ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : undefined}
          >
            Previous
          </Link>
          <Link
            href={pageHref(Math.min(totalPages, page + 1))}
            className={`btn-secondary ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={page >= totalPages}
            tabIndex={page >= totalPages ? -1 : undefined}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
