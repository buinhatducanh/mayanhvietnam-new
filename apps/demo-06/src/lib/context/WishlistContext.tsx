"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/lib/data";

interface WishlistCtx {
  items: Product[];
  count: number;
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  remove: (productId: string) => void;
}

const WishlistContext = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const toggle = useCallback((product: Product) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const has = useCallback((productId: string) => items.some((p) => p.id === productId), [items]);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  return (
    <WishlistContext.Provider value={{ items, count: items.length, toggle, has, remove }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
}
