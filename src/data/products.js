import { makePlaceholder } from '../utils/placeholder'

// Deterministic "days ago" so newest-sort has stable, meaningful ordering.
const daysAgo = (n) => Date.now() - n * 24 * 60 * 60 * 1000

function img(text, bg) {
  return makePlaceholder(text, { bg })
}

export const CATEGORIES = ['Facewash', 'Sunscreen', 'Moisturiser']

// Bump this whenever INITIAL_PRODUCTS changes shape/content so browsers with an
// older catalog cached in localStorage pick up the new seed data automatically.
export const PRODUCTS_VERSION = 2

export const INITIAL_PRODUCTS = [
  // Facewash (3)
  {
    id: 'p1',
    name: 'Gentle Foaming Facewash',
    category: 'Facewash',
    price: 12.99,
    discountPrice: 9.99,
    images: [img('Foaming Facewash', '#e0f2fe'), img('Foaming Facewash - tube', '#bae6fd')],
    description:
      'A soap-free foaming facewash that gently cleanses without stripping natural moisture. Suitable for daily use on all skin types.',
    rating: 4.5,
    numReviews: 210,
    stock: 60,
    createdAt: daysAgo(20),
  },
  {
    id: 'p2',
    name: 'Salicylic Acid Acne Control Facewash',
    category: 'Facewash',
    price: 14.99,
    discountPrice: 11.99,
    images: [img('Acne Control Facewash', '#e0f2fe'), img('Acne Control - tube', '#bae6fd')],
    description:
      '2% Salicylic Acid facewash that unclogs pores and helps control breakouts, ideal for oily and acne-prone skin.',
    rating: 4.3,
    numReviews: 145,
    stock: 45,
    createdAt: daysAgo(8),
  },
  {
    id: 'p3',
    name: 'Charcoal Detox Deep Cleansing Facewash',
    category: 'Facewash',
    price: 13.49,
    discountPrice: 10.49,
    images: [img('Charcoal Facewash', '#e0f2fe'), img('Charcoal Facewash - tube', '#bae6fd')],
    description:
      'Activated charcoal formula that draws out dirt, oil, and pollutants for a deep, refreshing clean.',
    rating: 4.4,
    numReviews: 98,
    stock: 50,
    createdAt: daysAgo(35),
  },

  // Sunscreen (3)
  {
    id: 'p4',
    name: 'SPF 50 Matte Sunscreen Gel',
    category: 'Sunscreen',
    price: 18.99,
    discountPrice: 15.99,
    images: [img('SPF 50 Sunscreen', '#fef3c7'), img('SPF 50 - bottle', '#fde68a')],
    description:
      'Lightweight, non-greasy gel with SPF 50 PA+++ broad-spectrum protection and a soft matte finish.',
    rating: 4.6,
    numReviews: 320,
    stock: 40,
    createdAt: daysAgo(5),
  },
  {
    id: 'p5',
    name: 'SPF 30 Daily Sunscreen Lotion',
    category: 'Sunscreen',
    price: 15.99,
    discountPrice: 12.99,
    images: [img('SPF 30 Sunscreen', '#fef3c7'), img('SPF 30 - bottle', '#fde68a')],
    description:
      'An everyday SPF 30 lotion that absorbs quickly and layers well under makeup for reliable daily sun protection.',
    rating: 4.2,
    numReviews: 88,
    stock: 55,
    createdAt: daysAgo(15),
  },
  {
    id: 'p6',
    name: 'Tinted Sunscreen SPF 45',
    category: 'Sunscreen',
    price: 21.99,
    discountPrice: 17.99,
    images: [img('Tinted Sunscreen', '#fef3c7'), img('Tinted Sunscreen - bottle', '#fde68a')],
    description:
      'SPF 45 sunscreen with a universal sheer tint that evens out skin tone while protecting against UVA/UVB rays.',
    rating: 4.7,
    numReviews: 176,
    stock: 30,
    createdAt: daysAgo(2),
  },

  // Moisturiser (4)
  {
    id: 'p7',
    name: 'Hyaluronic Acid Gel Moisturiser',
    category: 'Moisturiser',
    price: 19.99,
    discountPrice: 15.99,
    images: [img('Hyaluronic Moisturiser', '#dcfce7'), img('Hyaluronic - jar', '#bbf7d0')],
    description:
      'A water-based gel moisturiser with hyaluronic acid that delivers lightweight, long-lasting hydration.',
    rating: 4.5,
    numReviews: 250,
    stock: 50,
    createdAt: daysAgo(10),
  },
  {
    id: 'p8',
    name: 'Night Repair Cream Moisturiser',
    category: 'Moisturiser',
    price: 24.99,
    discountPrice: 19.99,
    images: [img('Night Repair Cream', '#dcfce7'), img('Night Repair - jar', '#bbf7d0')],
    description:
      'A rich overnight cream that supports skin repair while you sleep, leaving skin visibly smoother by morning.',
    rating: 4.6,
    numReviews: 132,
    stock: 35,
    createdAt: daysAgo(25),
  },
  {
    id: 'p9',
    name: 'Oil-Free Moisturiser for Oily Skin',
    category: 'Moisturiser',
    price: 16.99,
    discountPrice: 13.99,
    images: [img('Oil-Free Moisturiser', '#dcfce7'), img('Oil-Free - jar', '#bbf7d0')],
    description:
      'A non-comedogenic, oil-free formula that hydrates without adding shine, made for oily and combination skin.',
    rating: 4.3,
    numReviews: 110,
    stock: 45,
    createdAt: daysAgo(1),
  },
  {
    id: 'p10',
    name: 'Deep Hydration Cream for Dry Skin',
    category: 'Moisturiser',
    price: 22.99,
    discountPrice: 18.99,
    images: [img('Deep Hydration Cream', '#dcfce7'), img('Deep Hydration - jar', '#bbf7d0')],
    description:
      'A ceramide-rich cream that locks in moisture for up to 24 hours, formulated for dry and sensitive skin.',
    rating: 4.4,
    numReviews: 95,
    stock: 40,
    createdAt: daysAgo(40),
  },
]
