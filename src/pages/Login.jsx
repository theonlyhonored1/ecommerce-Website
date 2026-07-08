import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/account'

  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' })

  function handleLoginSubmit(e) {
    e.preventDefault()
    setError('')
    const res = login(loginForm.email, loginForm.password)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate(redirectTo)
  }

  function handleSignupSubmit(e) {
    e.preventDefault()
    setError('')
    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    const res = signup({
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
    })
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate(redirectTo)
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => { setMode('login'); setError('') }}
            className={`flex-1 pb-3 text-sm font-medium ${
              mode === 'login' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setMode('signup'); setError('') }}
            className={`flex-1 pb-3 text-sm font-medium ${
              mode === 'signup' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-400'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-md">
              Login
            </button>
            <p className="text-xs text-gray-400 text-center">
              Demo admin account: admin@shop.com / admin123
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={signupForm.name}
                onChange={(e) => setSignupForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={signupForm.email}
                onChange={(e) => setSignupForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={signupForm.password}
                onChange={(e) => setSignupForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-md">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
