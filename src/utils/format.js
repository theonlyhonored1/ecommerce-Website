export function formatCurrency(amount) {
  return `$${Number(amount).toFixed(2)}`
}

export function discountPercent(price, discountPrice) {
  if (!discountPrice || discountPrice >= price) return 0
  return Math.round(((price - discountPrice) / price) * 100)
}
