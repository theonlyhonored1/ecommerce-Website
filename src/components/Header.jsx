import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { itemCount } = useCart()
  const { currentUser, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/products${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`)
    setMenuOpen(false)
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold text-primary-600">CrossBorder Shop</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-l-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="rounded-r-md bg-primary-600 hover:bg-primary-700 text-white px-4 text-sm font-medium"
            >
              Search
            </button>
          </form>

          <nav className="hidden md:flex items-center gap-5 shrink-0">
            <Link to="/products" className="text-sm font-medium text-gray-600 hover:text-primary-600">
              Products
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-primary-600">
                Admin
              </Link>
            )}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link to="/account" className="text-sm font-medium text-gray-600 hover:text-primary-600">
                  Hi, {currentUser.name.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
            )}
            <Link to="/cart" className="relative text-gray-700 hover:text-primary-600">
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <Link to="/cart" className="relative text-gray-700">
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen((v) => !v)} className="text-gray-700 p-1" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="rounded-r-md bg-primary-600 text-white px-3 text-sm font-medium">
                Go
              </button>
            </form>
            <div className="flex flex-col gap-2">
              <Link to="/products" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-600">
                Products
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-600">
                  Admin
                </Link>
              )}
              {currentUser ? (
                <>
                  <Link to="/account" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-600">
                    My Account
                  </Link>
                  <button onClick={handleLogout} className="text-left text-sm font-medium text-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-primary-600">
                  Login / Signup
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
}
