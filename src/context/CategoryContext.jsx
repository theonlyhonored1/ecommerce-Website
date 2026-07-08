import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'
import { DEFAULT_CATEGORIES } from '../data/products'

const CategoryContext = createContext(null)
const CATEGORIES_KEY = 'ecom_categories'

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(() => loadFromStorage(CATEGORIES_KEY, DEFAULT_CATEGORIES))

  useEffect(() => {
    saveToStorage(CATEGORIES_KEY, categories)
  }, [categories])

  function addCategory(name) {
    setCategories((prev) => [...prev, name])
  }

  function renameCategory(oldName, newName) {
    setCategories((prev) => prev.map((c) => (c === oldName ? newName : c)))
  }

  function deleteCategory(name) {
    setCategories((prev) => prev.filter((c) => c !== name))
  }

  const value = { categories, addCategory, renameCategory, deleteCategory }

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
}

export function useCategories() {
  const ctx = useContext(CategoryContext)
  if (!ctx) throw new Error('useCategories must be used within CategoryProvider')
  return ctx
}
