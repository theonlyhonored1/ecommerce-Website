import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function RequireAuth({ children }) {
  const { currentUser } = useAuth()
  const location = useLocation()
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return children
}

export function RequireAdmin({ children }) {
  const { currentUser, isAdmin } = useAuth()
  const location = useLocation()
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }
  return children
}
