import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'
import { INITIAL_PRODUCTS, PRODUCTS_VERSION } from '../data/products'

const ProductContext = createContext(null)
const PRODUCTS_KEY = 'ecom_products'
const PRODUCTS_VERSION_KEY = 'ecom_products_version'

// If the seed catalog has changed since this browser last loaded it, reseed
// instead of keeping the stale cached list (e.g. after the demo catalog is swapped out).
function getInitialProducts() {
  const storedVersion = loadFromStorage(PRODUCTS_VERSION_KEY, null)
  if (storedVersion !== PRODUCTS_VERSION) return INITIAL_PRODUCTS
  return loadFromStorage(PRODUCTS_KEY, INITIAL_PRODUCTS)
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(getInitialProducts)

  useEffect(() => {
    saveToStorage(PRODUCTS_KEY, products)
    saveToStorage(PRODUCTS_VERSION_KEY, PRODUCTS_VERSION)
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
