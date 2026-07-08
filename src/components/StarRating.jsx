export default function StarRating({ rating = 0, numReviews, size = 'text-sm' }) {
  const full = Math.round(rating)
  return (
    <div className={`flex items-center gap-1 ${size}`}>
      <span className="text-amber-400 tracking-tighter">
        {'★'.repeat(full)}
        <span className="text-gray-300">{'★'.repeat(5 - full)}</span>
      </span>
      <span className="text-gray-500">
        {rating.toFixed(1)}
        {typeof numReviews === 'number' ? ` (${numReviews})` : ''}
      </span>
    </div>
  )
}
