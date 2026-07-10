"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type DrawerType = "cart" | "wishlist" | null;

interface UICtx {
  drawer: DrawerType;
  openCart: () => void;
  openWishlist: () => void;
  close: () => void;
}

const UIContext = createContext<UICtx | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState<DrawerType>(null);

  const openCart = useCallback(() => setDrawer("cart"), []);
  const openWishlist = useCallback(() => setDrawer("wishlist"), []);
  const close = useCallback(() => setDrawer(null), []);

  return (
    <UIContext.Provider value={{ drawer, openCart, openWishlist, close }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be inside UIProvider");
  return ctx;
}
