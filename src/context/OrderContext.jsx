import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const OrderContext = createContext(null)
const ORDERS_KEY = 'ecom_orders'

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => loadFromStorage(ORDERS_KEY, []))

  useEffect(() => {
    saveToStorage(ORDERS_KEY, orders)
  }, [orders])

  function createOrder(order) {
    const id = 'ORD-' + Date.now().toString().slice(-8)
    const newOrder = { id, status: 'Confirmed', createdAt: Date.now(), ...order }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  function getOrder(id) {
    return orders.find((o) => o.id === id)
  }

  function getOrdersForUser(email) {
    return orders
      .filter((o) => o.userEmail === email)
      .sort((a, b) => b.createdAt - a.createdAt)
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  const value = { orders, createOrder, getOrder, getOrdersForUser, updateOrderStatus }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}
