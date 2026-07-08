import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import { useProducts } from '../context/ProductContext'
import { formatCurrency } from '../utils/format'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'cod', label: 'Cash on Delivery' },
  { id: 'upi', label: 'UPI' },
]

export default function Checkout() {
  const { cartLines, subtotal, tax, shipping, total, clearCart } = useCart()
  const { currentUser } = useAuth()
  const { createOrder } = useOrders()
  const { updateProduct } = useProducts()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  })
  const [errors, setErrors] = useState({})

  if (cartLines.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function validate() {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email is required'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    if (!form.address.trim()) errs.address = 'Address is required'
    if (!form.city.trim()) errs.city = 'City is required'
    if (!form.state.trim()) errs.state = 'State is required'
    if (!form.zip.trim()) errs.zip = 'ZIP / Postal code is required'
    if (form.paymentMethod === 'card') {
      if (!/^\d{12,19}$/.test(form.cardNumber.replace(/\s/g, ''))) errs.cardNumber = 'Enter a valid card number'
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) errs.cardExpiry = 'Use MM/YY format'
      if (!/^\d{3,4}$/.test(form.cardCvv)) errs.cardCvv = 'Enter a valid CVV'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handlePlaceOrder(e) {
    e.preventDefault()
    if (!validate()) return

    const order = createOrder({
      userEmail: currentUser.email,
      items: cartLines.map(({ product, qty }) => ({
        productId: product.id,
        name: product.name,
        image: product.images?.[0],
        price: product.discountPrice ?? product.price,
        qty,
      })),
      subtotal,
      tax,
      shipping,
      total,
      customer: { fullName: form.fullName, email: form.email, phone: form.phone },
      shippingAddress: {
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      },
      paymentMethod: PAYMENT_METHODS.find((m) => m.id === form.paymentMethod)?.label,
    })

    cartLines.forEach(({ product, qty }) => {
      updateProduct(product.id, { stock: Math.max(0, product.stock - qty) })
    })

    clearCart()
    navigate(`/order-confirmation/${order.id}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
              <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Street Address" name="address" value={form.address} onChange={handleChange} error={errors.address} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} />
                <Field label="State" name="state" value={form.state} onChange={handleChange} error={errors.state} />
                <Field label="ZIP Code" name="zip" value={form.zip} onChange={handleChange} error={errors.zip} />
              </div>
              <Field label="Country" name="country" value={form.country} onChange={handleChange} />
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-2 mb-4">
              {PAYMENT_METHODS.map((m) => (
                <label key={m.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={form.paymentMethod === m.id}
                    onChange={handleChange}
                  />
                  {m.label}
                </label>
              ))}
            </div>
            {form.paymentMethod === 'card' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field
                    label="Card Number"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <Field label="Expiry (MM/YY)" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} error={errors.cardExpiry} placeholder="MM/YY" />
                <Field label="CVV" name="cardCvv" value={form.cardCvv} onChange={handleChange} error={errors.cardCvv} placeholder="123" />
              </div>
            )}
            {form.paymentMethod !== 'card' && (
              <p className="text-sm text-gray-500">
                {form.paymentMethod === 'cod'
                  ? "You'll pay in cash when your order is delivered."
                  : "You'll complete payment via UPI after placing your order (demo only)."}
              </p>
            )}
          </section>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
          <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
            {cartLines.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3 items-center text-sm">
                <img src={product.images?.[0]} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-1 text-gray-800">{product.name}</p>
                  <p className="text-gray-400">Qty: {qty}</p>
                </div>
                <span className="font-medium text-gray-900">
                  {formatCurrency((product.discountPrice ?? product.price) * qty)}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm border-t border-gray-200 pt-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900 text-base">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-md"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
          error ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}
