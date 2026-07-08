import { Link, useParams } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'
import { formatCurrency } from '../utils/format'

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const { getOrder } = useOrders()
  const order = getOrder(orderId)

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-600">Order not found.</p>
        <Link to="/" className="text-primary-600 hover:underline mt-2 inline-block">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Order Confirmed!</h1>
        <p className="text-gray-500 mt-1">
          Thank you, {order.customer.fullName.split(' ')[0]}. Your order has been placed successfully.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Order ID: <span className="font-semibold text-gray-800">{order.id}</span>
        </p>
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Order Details</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-3 items-center text-sm">
              <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-md" />
              <div className="flex-1">
                <p className="text-gray-800">{item.name}</p>
                <p className="text-gray-400">Qty: {item.qty}</p>
              </div>
              <span className="font-medium text-gray-900">{formatCurrency(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>{formatCurrency(order.tax)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900 text-base border-t border-gray-200 pt-2">
            <span>Total Paid</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.address}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            <br />
            {order.shippingAddress.country}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
          <p className="text-sm text-gray-600">{order.paymentMethod}</p>
          <h3 className="font-semibold text-gray-900 mt-4 mb-2">Status</h3>
          <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
            {order.status}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/products" className="text-center bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md">
          Continue Shopping
        </Link>
        <Link to="/account" className="text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-md">
          View Order History
        </Link>
      </div>
    </div>
  )
}
