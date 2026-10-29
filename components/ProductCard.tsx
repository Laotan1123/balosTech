"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductDTO } from "@/lib/api-contracts";
import { formatNGN } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useToast } from "./ToastProvider";

type Props = {
  product: ProductDTO;
  onSwap?: (product: ProductDTO) => void;
};

export default function ProductCard({ product, onSwap }: Props) {
  const { addItem } = useCart();
  const { addToast } = useToast();

  const handleAdd = () => {
    addItem(product);
    addToast({ title: "Added to cart", description: product.name, variant: "success" });
  };

  return (
    <article className="card flex h-full min-w-0 flex-col gap-3">
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden rounded-lg">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={320}
          className="h-56 w-full object-cover transition hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
          priority={false}
        />
      </Link>
      <div className="flex items-center justify-between text-xs uppercase text-gray-400">
        <span>{product.brand}</span>
        <span className="badge">{product.condition}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-100">
        <Link href={`/shop/${product.slug}`}>{product.name}</Link>
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
      <div className="text-xl font-bold text-white">{formatNGN(product.priceKobo)}</div>
      <div className="flex flex-wrap gap-2 text-xs text-gray-400">
        {product.specs.slice(0, 3).map((spec) => (
          <span key={spec} className="rounded-full bg-gray-800 px-3 py-1">
            {spec}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2">
        <button type="button" className="btn flex-1" onClick={handleAdd} aria-label={`Add ${product.name} to cart`}>
          Add to cart
        </button>
        <button
          type="button"
          className="btn-secondary flex-1"
          onClick={() => onSwap?.(product)}
          aria-label={`Swap ${product.name}`}
        >
          Swap
        </button>
      </div>
    </article>
  );
}
