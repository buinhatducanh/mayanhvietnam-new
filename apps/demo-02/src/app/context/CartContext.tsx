import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: number) => void;
  update: (id: number, qty: number) => void;
  total: number;
  count: number;
}

const Ctx = createContext<CartCtx>({} as CartCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    { id: 1, name: "Canon EOS R6 Mark II", price: 49990000, qty: 1,
      img: "https://images.unsplash.com/photo-1549424163-0a584d010aed?w=200&h=160&fit=crop&auto=format" },
    { id: 4, name: "DJI Mavic 3 Pro", price: 52990000, qty: 1,
      img: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=200&h=160&fit=crop&auto=format" },
  ]);

  const add = (item: Omit<CartItem, "qty">) =>
    setItems(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });

  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

  const update = (id: number, qty: number) =>
    setItems(prev => qty < 1 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty } : i));

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return <Ctx.Provider value={{ items, add, remove, update, total, count }}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
