import type { ProductDTO } from "@/lib/api-contracts";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function ProductGrid({ products, onSwap }: { products: ProductDTO[]; onSwap?: (p: ProductDTO) => void }) {
  if (products.length === 0) {
    return (
      <div className="card space-y-3 text-center" role="status">
        <h2 className="text-lg font-semibold text-white">No products found</h2>
        <p className="text-sm text-gray-300">Try changing your search or filters.</p>
        <Link href="/shop" className="btn-secondary mx-auto w-fit">Browse all products</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSwap={onSwap} />
      ))}
    </div>
  );
}
