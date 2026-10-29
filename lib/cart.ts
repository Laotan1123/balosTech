"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ProductDTO } from "./api-contracts";
import { useSyncExternalStore } from "react";

export type CartItem = {
  product: ProductDTO;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: ProductDTO, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalKobo: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
              )
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },
      removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        })),
      clear: () => set({ items: [] }),
      totalKobo: () => get().items.reduce((sum, item) => sum + item.product.priceKobo * item.quantity, 0)
    }),
    {
      name: "balostech-cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : ({
              getItem: () => null,
              setItem: () => undefined,
              removeItem: () => undefined
            } as unknown as Storage)
      )
    }
  )
);

export function useCartHydrated() {
  return useSyncExternalStore(
    (onStoreChange) => useCart.persist.onFinishHydration(onStoreChange),
    () => useCart.persist.hasHydrated(),
    () => false
  );
}
