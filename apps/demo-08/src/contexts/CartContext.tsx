'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product, formatPrice } from '@/data/products';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  variantId?: string;
  variantName?: string;
  maxQuantity: number;
  slug: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number, variantId?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, variantId?: string) => boolean;
  formatCartTotal: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'mavietnam_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, quantity = 1, variantId?: string) => {
    const variant = product.variants?.find(v => v.id === variantId);
    const price = variant?.price ?? product.price;
    const itemKey = `${product.id}${variantId ? `-${variantId}` : ''}`;

    setItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === itemKey);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: Math.min(updated[existingIdx].quantity + quantity, updated[existingIdx].maxQuantity),
        };
        return updated;
      }
      return [...prev, {
        id: itemKey,
        productId: product.id,
        name: product.name,
        thumbnail: product.thumbnail,
        price,
        originalPrice: variant?.originalPrice ?? product.originalPrice,
        quantity,
        variantId,
        variantName: variant?.name,
        maxQuantity: 10,
        slug: product.slug,
      }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== itemId));
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback((productId: string, variantId?: string) => {
    const key = `${productId}${variantId ? `-${variantId}` : ''}`;
    return items.some(item => item.id === key);
  }, [items]);

  const formatCartTotal = useCallback(() => formatPrice(subtotal), [subtotal]);

  return (
    <CartContext.Provider value={{
      items, itemCount, subtotal, isOpen,
      openCart, closeCart, addItem, removeItem, updateQuantity, clearCart, isInCart, formatCartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
