import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const SettingsContext = createContext(null)
const SETTINGS_KEY = 'ecom_settings'

export const DEFAULT_SETTINGS = {
  heroTitle: 'Skincare that works, one cart away.',
  heroSubtitle: 'Discover top-rated facewash, sunscreen, and moisturisers — with great prices and fast checkout.',
  taxRate: 0.08,
  shippingFee: 6.99,
  freeShippingThreshold: 75,
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => loadFromStorage(SETTINGS_KEY, DEFAULT_SETTINGS))

  useEffect(() => {
    saveToStorage(SETTINGS_KEY, settings)
  }, [settings])

  function updateSettings(updates) {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  const value = { settings, updateSettings }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
