import { useState } from 'react'
import { useOrders } from '../../context/OrderContext'
import { formatCurrency } from '../../utils/format'

const STATUSES = ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useOrders()
  const [expanded, setExpanded] = useState(null)

  const sorted = [...orders].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">All Orders</h2>
      {sorted.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
          No orders have been placed yet.
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((order) => {
            const isOpen = expanded === order.id
            return (
              <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <button
                    onClick={() => setExpanded(isOpen ? null : order.id)}
                    className="text-left flex-1 min-w-[200px]"
                  >
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-500">
                      {order.customer?.fullName} · {order.userEmail} · {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </button>
                  <span className="font-semibold text-gray-900">{formatCurrency(order.total)}</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setExpanded(isOpen ? null : order.id)}
                    className="text-gray-400"
                    aria-label="Toggle order details"
                  >
                    {isOpen ? '▲' : '▼'}
                  </button>
                </div>
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
                      <br />
                      Payment: {order.paymentMethod}
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
