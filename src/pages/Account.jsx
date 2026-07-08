import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import { formatCurrency } from '../utils/format'

export default function Account() {
  const { currentUser } = useAuth()
  const { getOrdersForUser } = useOrders()
  const orders = getOrdersForUser(currentUser.email)
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3">Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <p><span className="text-gray-500">Name:</span> {currentUser.name}</p>
          <p><span className="text-gray-500">Email:</span> {currentUser.email}</p>
          <p>
            <span className="text-gray-500">Role:</span>{' '}
            <span className="capitalize">{currentUser.role}</span>
          </p>
        </div>
      </div>

      <h2 className="font-semibold text-gray-900 mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
          You haven't placed any orders yet.
          <div>
            <Link to="/products" className="text-primary-600 hover:underline mt-2 inline-block">
              Start shopping →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isOpen = expanded === order.id
            return (
              <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : order.id)}
                  className="w-full flex flex-wrap items-center justify-between gap-2 p-4 text-left hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-1 rounded">
                      {order.status}
                    </span>
                    <span className="font-semibold text-gray-900">{formatCurrency(order.total)}</span>
                    <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-gray-200 p-4 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex gap-3 items-center text-sm">
                        <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-md" />
                        <div className="flex-1">
                          <p className="text-gray-800">{item.name}</p>
                          <p className="text-gray-400">Qty: {item.qty}</p>
                        </div>
                        <span className="font-medium text-gray-900">{formatCurrency(item.price * item.qty)}</span>
                      </div>
                    ))}
                    <div className="text-sm text-gray-500 pt-2 border-t border-gray-100">
                      Shipping to: {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                      {order.shippingAddress.state} {order.shippingAddress.zip}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
