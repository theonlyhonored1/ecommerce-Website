import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'
import { useProducts } from './ProductContext'

const CartContext = createContext(null)
const CART_KEY = 'ecom_cart'

export function CartProvider({ children }) {
  const { getProduct } = useProducts()
  // items: [{ productId, qty }]
  const [items, setItems] = useState(() => loadFromStorage(CART_KEY, []))

  useEffect(() => {
    saveToStorage(CART_KEY, items)
  }, [items])

  function addToCart(productId, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...prev, { productId, qty }]
    })
  }

  function updateQty(productId, qty) {
    if (qty <= 0) {
      removeFromCart(productId)
      return
    }
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty } : i)))
  }

  function removeFromCart(productId) {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  function clearCart() {
    setItems([])
  }

  // Denormalized cart lines with live product data; filters out products
  // that no longer exist (e.g. deleted by an admin).
  const cartLines = items
    .map((i) => {
      const product = getProduct(i.productId)
      if (!product) return null
      return { ...i, product }
    })
    .filter(Boolean)

  const itemCount = cartLines.reduce((sum, l) => sum + l.qty, 0)
  const subtotal = cartLines.reduce(
    (sum, l) => sum + (l.product.discountPrice ?? l.product.price) * l.qty,
    0,
  )
  const TAX_RATE = 0.08
  const tax = subtotal * TAX_RATE
  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 6.99
  const total = subtotal + tax + shipping

  const value = {
    cartLines,
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
