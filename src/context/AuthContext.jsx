import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const AuthContext = createContext(null)

const USERS_KEY = 'ecom_users'
const CURRENT_USER_KEY = 'ecom_current_user'

// Demo-only seed admin account so the admin panel is reachable without a signup step.
// NOTE: passwords are stored in plain text in localStorage. This is fine for a
// front-end-only demo but must never be done in a real application.
const SEED_USERS = [
  { name: 'Admin', email: 'admin@shop.com', password: 'admin123', role: 'admin' },
]

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadFromStorage(USERS_KEY, SEED_USERS))
  const [currentUser, setCurrentUser] = useState(() => loadFromStorage(CURRENT_USER_KEY, null))

  useEffect(() => {
    saveToStorage(USERS_KEY, users)
  }, [users])

  useEffect(() => {
    saveToStorage(CURRENT_USER_KEY, currentUser)
  }, [currentUser])

  function signup({ name, email, password, role = 'customer' }) {
    const normalizedEmail = email.trim().toLowerCase()
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = { name: name.trim(), email: normalizedEmail, password, role }
    setUsers((prev) => [...prev, newUser])
    setCurrentUser(newUser)
    return { ok: true }
  }

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase()
    const found = users.find((u) => u.email === normalizedEmail && u.password === password)
    if (!found) {
      return { ok: false, error: 'Invalid email or password.' }
    }
    setCurrentUser(found)
    return { ok: true }
  }

  function logout() {
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    isAdmin: currentUser?.role === 'admin',
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
