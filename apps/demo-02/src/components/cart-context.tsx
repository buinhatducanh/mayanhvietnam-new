'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export interface CartItem {
  slug: string
  name: string
  variantName: string
  price: number
  image: string
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (slug: string, variantName: string) => void
  updateQuantity: (slug: string, variantName: string, quantity: number) => void
  totalCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.slug === item.slug && i.variantName === item.variantName,
      )
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug && i.variantName === item.variantName
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((slug: string, variantName: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.variantName === variantName)))
  }, [])

  const updateQuantity = useCallback((slug: string, variantName: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug && i.variantName === variantName ? { ...i, quantity } : i,
      ),
    )
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      totalCount: items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    [items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
