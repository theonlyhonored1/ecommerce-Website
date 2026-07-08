import { useState } from 'react'
import { useSettings } from '../../context/SettingsContext'

export default function AdminSettings() {
  const { settings, updateSettings } = useSettings()
  const [form, setForm] = useState({
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,
    taxRatePercent: String(settings.taxRate * 100),
    shippingFee: String(settings.shippingFee),
    freeShippingThreshold: String(settings.freeShippingThreshold),
  })
  const [saved, setSaved] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    updateSettings({
      heroTitle: form.heroTitle,
      heroSubtitle: form.heroSubtitle,
      taxRate: (parseFloat(form.taxRatePercent) || 0) / 100,
      shippingFee: parseFloat(form.shippingFee) || 0,
      freeShippingThreshold: parseFloat(form.freeShippingThreshold) || 0,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Site Settings</h2>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-5 max-w-2xl">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Homepage Hero</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
              <input
                name="heroTitle"
                value={form.heroTitle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
              <textarea
                name="heroSubtitle"
                rows={2}
                value={form.heroSubtitle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <h3 className="font-medium text-gray-900 mb-3">Pricing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input
                name="taxRatePercent"
                type="number"
                step="0.1"
                min="0"
                value={form.taxRatePercent}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Fee ($)</label>
              <input
                name="shippingFee"
                type="number"
                step="0.01"
                min="0"
                value={form.shippingFee}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Over ($)</label>
              <input
                name="freeShippingThreshold"
                type="number"
                step="0.01"
                min="0"
                value={form.freeShippingThreshold}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 rounded-md text-sm">
            Save Settings
          </button>
          {saved && <span className="text-sm text-green-600">Saved ✓</span>}
        </div>
      </form>
    </div>
  )
}
