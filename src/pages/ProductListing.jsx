import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ProductListing() {
  const { products } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'newest'

  const [localSearch, setLocalSearch] = useState(search)
  useEffect(() => setLocalSearch(search), [search])

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    updateParam('search', localSearch.trim())
  }

  const filtered = useMemo(() => {
    let list = [...products]

    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      )
    }
    if (category) {
      list = list.filter((p) => p.category === category)
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price))
        break
      case 'price-desc':
        list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price))
        break
      case 'popularity':
        list.sort((a, b) => b.numReviews - a.numReviews)
        break
      case 'newest':
      default:
        list.sort((a, b) => b.createdAt - a.createdAt)
        break
    }
    return list
  }, [products, search, category, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row gap-8">
        <aside className="sm:w-56 shrink-0">
          <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => updateParam('category', '')}
                className={`text-sm w-full text-left px-2 py-1.5 rounded-md ${
                  !category ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Categories
              </button>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => updateParam('category', cat)}
                  className={`text-sm w-full text-left px-2 py-1.5 rounded-md ${
                    category === cat ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1 min-w-0">
          <form onSubmit={handleSearchSubmit} className="sm:hidden mb-4 flex">
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="rounded-r-md bg-primary-600 text-white px-3 text-sm font-medium">Go</button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <p className="text-sm text-gray-500">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
              {search && (
                <>
                  {' '}for "<span className="font-medium text-gray-700">{search}</span>"
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-500">
                Sort by:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest</option>
                <option value="popularity">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No products match your search. Try a different keyword or category.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
