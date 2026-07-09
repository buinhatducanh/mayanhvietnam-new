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

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: ProductSummary;
  variant: string | null;
  qty: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: ProductSummary; variant: string | null; qty: number }
  | { type: 'REMOVE'; productId: string; variant: string | null }
  | { type: 'UPDATE_QTY'; productId: string; variant: string | null; qty: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  addItem: (product: ProductSummary, variant?: string | null, qty?: number) => void;
  removeItem: (productId: string, variant?: string | null) => void;
  updateQty: (productId: string, variant: string | null, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

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
      if (action.qty <= 0) {
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
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId &&
          (i.variant ?? '') === (action.variant ?? '')
            ? { ...i, qty: action.qty }
            : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'HYDRATE':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'mavn_cart_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as CartItem[];
        dispatch({ type: 'HYDRATE', items });
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore quota errors
    }
  }, [state.items]);

  const addItem = useCallback(
    (product: ProductSummary, variant: string | null = null, qty = 1) => {
      dispatch({ type: 'ADD', product, variant, qty });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, variant: string | null = null) => {
      dispatch({ type: 'REMOVE', productId, variant });
    },
    []
  );

  const updateQty = useCallback(
    (productId: string, variant: string | null, qty: number) => {
      dispatch({ type: 'UPDATE_QTY', productId, variant, qty });
    },
    []
  );

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const itemCount = state.items.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = state.items.reduce(
    (acc, i) => acc + i.product.price * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
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
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
