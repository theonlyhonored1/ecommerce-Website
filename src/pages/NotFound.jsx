import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-gray-500 mt-2">Page not found.</p>
      <Link to="/" className="mt-6 inline-block text-primary-600 hover:underline">
        Back to home
      </Link>
    </div>
  )
}
