import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import { CATEGORIES } from '../data/products'
import { makePlaceholder } from '../utils/placeholder'
import { resizeImageFile } from '../utils/resizeImage'
import { formatCurrency } from '../utils/format'

const EMPTY_FORM = {
  name: '',
  category: CATEGORIES[0],
  price: '',
  discountPrice: '',
  description: '',
  rating: '4.0',
  stock: '',
  imagePreview: '',
}

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [imageError, setImageError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageError('')
    try {
      const dataUrl = await resizeImageFile(file)
      setForm((f) => ({ ...f, imagePreview: dataUrl }))
    } catch {
      setImageError('Could not read that image file. Try a different one.')
    }
  }

  function openAddForm() {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setImageError('')
    setShowForm(true)
  }

  function openEditForm(product) {
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      discountPrice: String(product.discountPrice ?? ''),
      description: product.description,
      rating: String(product.rating),
      stock: String(product.stock),
      imagePreview: product.images?.[0] || '',
    })
    setEditingId(product.id)
    setImageError('')
    setShowForm(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const price = parseFloat(form.price)
    const discountPrice = form.discountPrice ? parseFloat(form.discountPrice) : null
    const rating = parseFloat(form.rating) || 0
    const stock = parseInt(form.stock, 10) || 0

    const images = [form.imagePreview || makePlaceholder(form.name)]

    if (editingId) {
      updateProduct(editingId, {
        name: form.name,
        category: form.category,
        price,
        discountPrice,
        description: form.description,
        rating,
        stock,
        images,
      })
    } else {
      addProduct({
        name: form.name,
        category: form.category,
        price,
        discountPrice,
        description: form.description,
        rating,
        stock,
        images,
      })
    }
    setShowForm(false)
    setEditingId(null)
  }

  function handleDelete(id) {
    deleteProduct(id)
    setConfirmDeleteId(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
        <button
          onClick={openAddForm}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-md text-sm"
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40 p-4" onClick={() => setShowForm(false)}>
          <div
            className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="flex items-center gap-4">
                  <img
                    src={form.imagePreview || makePlaceholder(form.name || 'Preview')}
                    alt="Preview"
                    className="h-16 w-16 rounded-md object-cover border border-gray-200 shrink-0"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1 text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
                  />
                </div>
                {imageError && <p className="text-xs text-red-600 mt-1">{imageError}</p>}
                {!form.imagePreview && (
                  <p className="text-xs text-gray-400 mt-1">No image chosen yet — a placeholder will be used until you upload one.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={form.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price ($)</label>
                  <input
                    name="discountPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.discountPrice}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    required
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-md">
                  {editingId ? 'Save Changes' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.images?.[0]} alt={p.name} className="h-10 w-10 rounded-md object-cover" />
                    <span className="font-medium text-gray-900 line-clamp-1">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{p.category}</td>
                <td className="px-4 py-3 text-gray-600">
                  {formatCurrency(p.discountPrice ?? p.price)}
                  {p.discountPrice && (
                    <span className="text-gray-400 line-through ml-1">{formatCurrency(p.price)}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={p.stock === 0 ? 'text-red-600 font-medium' : 'text-gray-600'}>{p.stock}</span>
                </td>
                <td className="px-4 py-3 text-gray-600">{p.rating.toFixed(1)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditForm(p)}
                      className="text-primary-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    {confirmDeleteId === p.id ? (
                      <span className="flex items-center gap-2">
                        <button onClick={() => handleDelete(p.id)} className="text-red-600 font-medium text-sm">
                          Confirm?
                        </button>
                        <button onClick={() => setConfirmDeleteId(null)} className="text-gray-400 text-sm">
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(p.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center text-gray-500 py-10">No products yet. Add your first product above.</p>
        )}
      </div>
    </div>
  )
}
