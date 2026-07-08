import { Link } from 'react-router-dom'
import StarRating from './StarRating'
import { formatCurrency, discountPercent } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const pct = discountPercent(product.price, product.discountPrice)
  const outOfStock = product.stock <= 0

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`} className="block relative">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {pct > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{pct}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
            Out of stock
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-gray-400 uppercase tracking-wide">{product.category}</span>
        <Link to={`/products/${product.id}`} className="mt-1 font-medium text-gray-900 line-clamp-2 hover:text-primary-600">
          {product.name}
        </Link>
        <div className="mt-2">
          <StarRating rating={product.rating} numReviews={product.numReviews} />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(product.discountPrice ?? product.price)}
          </span>
          {pct > 0 && (
            <span className="text-sm text-gray-400 line-through">{formatCurrency(product.price)}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product.id, 1)}
          disabled={outOfStock}
          className="mt-3 w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium py-2 rounded-md transition-colors"
        >
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
