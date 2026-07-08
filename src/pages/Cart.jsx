import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/format'

export default function Cart() {
  const { cartLines, subtotal, tax, shipping, total, updateQty, removeFromCart } = useCart()
  const navigate = useNavigate()

  if (cartLines.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
        <Link
          to="/products"
          className="mt-6 inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartLines.map(({ product, qty }) => {
            const price = product.discountPrice ?? product.price
            return (
              <div
                key={product.id}
                className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 items-center"
              >
                <Link to={`/products/${product.id}`} className="shrink-0">
                  <img src={product.images?.[0]} alt={product.name} className="h-20 w-20 object-cover rounded-md" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${product.id}`} className="font-medium text-gray-900 hover:text-primary-600 line-clamp-1">
                    {product.name}
                  </Link>
                  <p className="text-sm text-gray-500">{formatCurrency(price)} each</p>
                  {qty > product.stock && (
                    <p className="text-xs text-red-600 mt-1">Only {product.stock} left in stock</p>
                  )}
                </div>
                <div className="flex items-center border border-gray-300 rounded-md shrink-0">
                  <button
                    onClick={() => updateQty(product.id, qty - 1)}
                    className="px-2.5 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-3 text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => updateQty(product.id, Math.min(product.stock, qty + 1))}
                    className="px-2.5 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="w-20 text-right font-semibold text-gray-900 shrink-0">
                  {formatCurrency(price * qty)}
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-gray-400 hover:text-red-600 shrink-0"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )
          })}
          <Link to="/products" className="inline-block text-primary-600 hover:underline text-sm">
            ← Continue Shopping
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (8%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-400">Free shipping on orders over $75</p>
            )}
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900 text-base">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="mt-5 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-md"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
