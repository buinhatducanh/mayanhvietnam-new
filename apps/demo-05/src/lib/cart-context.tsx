'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { ProductSummary } from '@mayanhvietnam/mock-data';

export interface CartItem {
  product: ProductSummary;
  variant: string | null;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD'; product: ProductSummary; variant: string | null; qty: number }
  | { type: 'REMOVE'; productId: string; variant: string | null }
  | { type: 'UPDATE_QTY'; productId: string; variant: string | null; qty: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'CLOSE_DRAWER' };

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: ProductSummary, variant?: string | null, qty?: number) => void;
  removeItem: (productId: string, variant?: string | null) => void;
  updateQty: (productId: string, variant: string | null, qty: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.product.id}::${action.variant ?? ''}`;
      const existing = state.items.find(
        (i) => `${i.product.id}::${i.variant ?? ''}` === key
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            `${i.product.id}::${i.variant ?? ''}` === key
              ? { ...i, qty: i.qty + action.qty }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, variant: action.variant, qty: action.qty },
        ],
        isOpen: true,
      };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.product.id === action.productId &&
              (i.variant ?? '') === (action.variant ?? '')
            )
        ),
      };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId && (i.variant ?? '') === (action.variant ?? '')
            ? { ...i, qty: Math.max(1, action.qty) }
            : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'HYDRATE':
      return { ...state, items: action.items };
    case 'TOGGLE_DRAWER':
      return { ...state, isOpen: !state.isOpen };
    case 'CLOSE_DRAWER':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) dispatch({ type: 'HYDRATE', items: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } else {
      localStorage.removeItem('cart');
    }
  }, [state.items]);

  const addItem = useCallback(
    (product: ProductSummary, variant: string | null = null, qty = 1) =>
      dispatch({ type: 'ADD', product, variant, qty }),
    []
  );
  const removeItem = useCallback(
    (productId: string, variant: string | null = null) =>
      dispatch({ type: 'REMOVE', productId, variant }),
    []
  );
  const updateQty = useCallback(
    (productId: string, variant: string | null, qty: number) =>
      dispatch({ type: 'UPDATE_QTY', productId, variant, qty }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);
  const toggleDrawer = useCallback(() => dispatch({ type: 'TOGGLE_DRAWER' }), []);
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), []);

  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        toggleDrawer,
        closeDrawer,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}