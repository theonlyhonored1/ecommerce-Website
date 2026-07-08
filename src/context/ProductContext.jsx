import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'
import { INITIAL_PRODUCTS } from '../data/products'

const ProductContext = createContext(null)
const PRODUCTS_KEY = 'ecom_products'

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => loadFromStorage(PRODUCTS_KEY, INITIAL_PRODUCTS))

  useEffect(() => {
    saveToStorage(PRODUCTS_KEY, products)
  }, [products])

  function getProduct(id) {
    return products.find((p) => p.id === id)
  }

  function addProduct(product) {
    const id = 'p' + Date.now()
    const newProduct = {
      id,
      images: [],
      rating: 0,
      numReviews: 0,
      createdAt: Date.now(),
      ...product,
    }
    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }

  function updateProduct(id, updates) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const value = { products, getProduct, addProduct, updateProduct, deleteProduct }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within ProductProvider')
  return ctx
}
