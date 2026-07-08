import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCategories } from '../context/CategoryContext'
import { useSettings } from '../context/SettingsContext'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { products } = useProducts()
  const { categories } = useCategories()
  const { settings } = useSettings()

  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4)
  const newest = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4)

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{settings.heroTitle}</h1>
          <p className="mt-4 text-lg text-primary-50 max-w-2xl mx-auto">{settings.heroSubtitle}</p>
          <Link
            to="/products"
            className="mt-8 inline-block bg-white text-primary-700 font-semibold px-6 py-3 rounded-md hover:bg-primary-50 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center text-sm font-medium hover:border-primary-400 hover:text-primary-600 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Top Rated Products</h2>
          <Link to="/products" className="text-sm text-primary-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Arrivals</h2>
          <Link to="/products?sort=newest" className="text-sm text-primary-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
