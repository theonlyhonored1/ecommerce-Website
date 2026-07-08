import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import StarRating from '../components/StarRating'
import ProductCard from '../components/ProductCard'
import { formatCurrency, discountPercent } from '../utils/format'

export default function ProductDetail() {
  const { id } = useParams()
  const { getProduct, products } = useProducts()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const product = getProduct(id)

  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-600">Product not found.</p>
        <Link to="/products" className="text-primary-600 hover:underline mt-2 inline-block">
          Back to products
        </Link>
      </div>
    )
  }

  const pct = discountPercent(product.price, product.discountPrice)
  const outOfStock = product.stock <= 0
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  function handleAddToCart() {
    addToCart(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addToCart(product.id, qty)
    navigate('/cart')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link> /{' '}
        <Link to="/products" className="hover:text-primary-600">Products</Link> /{' '}
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary-600">
          {product.category}
        </Link>{' '}
        / <span className="text-gray-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <img src={product.images?.[activeImage]} alt={product.name} className="w-full aspect-square object-cover" />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3 mt-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-16 w-16 rounded-md overflow-hidden border-2 ${
                    activeImage === idx ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-xs text-gray-400 uppercase tracking-wide">{product.category}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
          <div className="mt-2">
            <StarRating rating={product.rating} numReviews={product.numReviews} size="text-base" />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {formatCurrency(product.discountPrice ?? product.price)}
            </span>
            {pct > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatCurrency(product.price)}</span>
                <span className="text-sm font-semibold text-red-600">Save {pct}%</span>
              </>
            )}
          </div>

          <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

          <p className={`mt-4 text-sm font-medium ${outOfStock ? 'text-red-600' : 'text-green-600'}`}>
            {outOfStock ? 'Out of stock' : `In stock (${product.stock} available)`}
          </p>

          {!outOfStock && (
            <div className="mt-5 flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-md transition-colors"
            >
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className="flex-1 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-md transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
