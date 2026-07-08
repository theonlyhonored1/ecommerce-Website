// Downscales an uploaded image and re-encodes it as JPEG before it's stored in
// localStorage, since raw phone/camera photos (often 3-10MB) would otherwise
// blow through the browser's localStorage quota after a handful of products.
export function resizeImageFile(file, { maxWidth = 900, maxHeight = 900, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not read image file'))
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width, maxHeight / img.height)
        const width = Math.round(img.width * scale)
        const height = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
