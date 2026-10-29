"use client";

import type { ProductDTO } from "@/lib/api-contracts";
import { useCart } from "@/lib/cart";
import { useToast } from "./ToastProvider";

export default function AddToCartButton({ product }: { product: ProductDTO }) {
  const { addItem } = useCart();
  const { addToast } = useToast();

  const add = () => {
    addItem(product);
    addToast({ title: "Added to cart", description: product.name, variant: "success" });
  };

  return (
    <button type="button" className="btn w-full sm:w-auto" onClick={add}>
      Add to cart
    </button>
  );
}
