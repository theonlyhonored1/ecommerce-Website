import { useState } from 'react'
import { useCategories } from '../../context/CategoryContext'
import { useProducts } from '../../context/ProductContext'

export default function AdminCategories() {
  const { categories, addCategory, renameCategory, deleteCategory } = useCategories()
  const { products, updateProduct } = useProducts()
  const [newCategory, setNewCategory] = useState('')
  const [error, setError] = useState('')
  const [renamingCategory, setRenamingCategory] = useState(null)
  const [renameValue, setRenameValue] = useState('')

  function countProducts(cat) {
    return products.filter((p) => p.category === cat).length
  }

  function handleAdd(e) {
    e.preventDefault()
    const trimmed = newCategory.trim()
    setError('')
    if (!trimmed) return
    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setError('That category already exists.')
      return
    }
    addCategory(trimmed)
    setNewCategory('')
  }

  function startRename(cat) {
    setRenamingCategory(cat)
    setRenameValue(cat)
    setError('')
  }

  function saveRename(oldName) {
    const trimmed = renameValue.trim()
    if (!trimmed) return
    if (trimmed !== oldName && categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setError('That category already exists.')
      return
    }
    if (trimmed !== oldName) {
      products.filter((p) => p.category === oldName).forEach((p) => updateProduct(p.id, { category: trimmed }))
      renameCategory(oldName, trimmed)
    }
    setRenamingCategory(null)
  }

  function handleDelete(cat) {
    setError('')
    const count = countProducts(cat)
    if (count > 0) {
      setError(`Can't delete "${cat}" — ${count} product(s) still use it. Reassign or delete them first.`)
      return
    }
    deleteCategory(cat)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage Categories</h2>

      <form onSubmit={handleAdd} className="flex gap-3 mb-4">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-md text-sm"
        >
          + Add Category
        </button>
      </form>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Products</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <tr key={cat}>
                <td className="px-4 py-3">
                  {renamingCategory === cat ? (
                    <input
                      autoFocus
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveRename(cat)}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="font-medium text-gray-900">{cat}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">{countProducts(cat)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    {renamingCategory === cat ? (
                      <>
                        <button onClick={() => saveRename(cat)} className="text-primary-600 hover:underline text-sm">
                          Save
                        </button>
                        <button onClick={() => setRenamingCategory(null)} className="text-gray-400 text-sm">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startRename(cat)} className="text-primary-600 hover:underline text-sm">
                          Rename
                        </button>
                        <button onClick={() => handleDelete(cat)} className="text-red-600 hover:underline text-sm">
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <p className="text-center text-gray-500 py-10">No categories yet. Add one above.</p>
        )}
      </div>
    </div>
  )
}
