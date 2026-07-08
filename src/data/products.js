import { makePlaceholder } from '../utils/placeholder'

// Deterministic "days ago" so newest-sort has stable, meaningful ordering.
const daysAgo = (n) => Date.now() - n * 24 * 60 * 60 * 1000

function img(text, bg) {
  return makePlaceholder(text, { bg })
}

export const CATEGORIES = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Beauty']

export const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 79.99,
    discountPrice: 59.99,
    images: [img('Headphones', '#dbeafe'), img('Headphones - side', '#bfdbfe')],
    description:
      'Over-ear wireless headphones with active noise cancellation, 30-hour battery life, and plush memory-foam ear cushions for all-day comfort.',
    rating: 4.5,
    numReviews: 218,
    stock: 25,
    createdAt: daysAgo(40),
  },
  {
    id: 'p2',
    name: 'Smart Watch Fitness Tracker',
    category: 'Electronics',
    price: 129.99,
    discountPrice: 99.99,
    images: [img('Smart Watch', '#dbeafe'), img('Smart Watch - band', '#bfdbfe')],
    description:
      'Track heart rate, sleep, steps, and workouts with this water-resistant smart watch. Includes phone notifications and a 7-day battery.',
    rating: 4.2,
    numReviews: 156,
    stock: 15,
    createdAt: daysAgo(12),
  },
  {
    id: 'p3',
    name: "Men's Running Shoes",
    category: 'Fashion',
    price: 89.99,
    discountPrice: 69.99,
    images: [img('Running Shoes', '#fee2e2'), img('Running Shoes - sole', '#fecaca')],
    description:
      'Lightweight breathable running shoes with cushioned soles designed for daily training and long-distance comfort.',
    rating: 4.6,
    numReviews: 342,
    stock: 40,
    createdAt: daysAgo(60),
  },
  {
    id: 'p4',
    name: "Women's Leather Handbag",
    category: 'Fashion',
    price: 149.99,
    discountPrice: 119.99,
    images: [img('Handbag', '#fee2e2'), img('Handbag - interior', '#fecaca')],
    description:
      'Genuine leather handbag with spacious interior, adjustable strap, and elegant stitched detailing to match any outfit.',
    rating: 4.3,
    numReviews: 97,
    stock: 20,
    createdAt: daysAgo(5),
  },
  {
    id: 'p5',
    name: 'Stainless Steel Cookware Set',
    category: 'Home & Kitchen',
    price: 199.99,
    discountPrice: 159.99,
    images: [img('Cookware Set', '#dcfce7'), img('Cookware - pan', '#bbf7d0')],
    description:
      '10-piece stainless steel cookware set including pots, pans, and lids. Dishwasher safe and induction compatible.',
    rating: 4.7,
    numReviews: 88,
    stock: 10,
    createdAt: daysAgo(90),
  },
  {
    id: 'p6',
    name: 'Electric Coffee Maker',
    category: 'Home & Kitchen',
    price: 59.99,
    discountPrice: 44.99,
    images: [img('Coffee Maker', '#dcfce7'), img('Coffee Maker - pot', '#bbf7d0')],
    description:
      'Programmable 12-cup coffee maker with reusable filter, auto shut-off, and keep-warm plate.',
    rating: 4.1,
    numReviews: 65,
    stock: 30,
    createdAt: daysAgo(3),
  },
  {
    id: 'p7',
    name: 'The Art of Programming',
    category: 'Books',
    price: 39.99,
    discountPrice: 29.99,
    images: [img('Programming Book', '#fef9c3'), img('Programming Book - back', '#fef08a')],
    description:
      'A beginner-friendly guide covering core programming concepts, data structures, and problem-solving techniques.',
    rating: 4.8,
    numReviews: 410,
    stock: 50,
    createdAt: daysAgo(120),
  },
  {
    id: 'p8',
    name: 'Mystery Novel Collection',
    category: 'Books',
    price: 24.99,
    discountPrice: 19.99,
    images: [img('Novel Collection', '#fef9c3'), img('Novel Collection - spine', '#fef08a')],
    description:
      'A boxed set of three gripping mystery novels perfect for weekend reading.',
    rating: 4.4,
    numReviews: 73,
    stock: 35,
    createdAt: daysAgo(18),
  },
  {
    id: 'p9',
    name: 'Yoga Mat Premium',
    category: 'Sports',
    price: 34.99,
    discountPrice: 24.99,
    images: [img('Yoga Mat', '#ede9fe'), img('Yoga Mat - rolled', '#ddd6fe')],
    description:
      'Extra-thick non-slip yoga mat with carrying strap, ideal for yoga, pilates, and floor exercises.',
    rating: 4.5,
    numReviews: 201,
    stock: 60,
    createdAt: daysAgo(7),
  },
  {
    id: 'p10',
    name: 'Adjustable Dumbbell Set',
    category: 'Sports',
    price: 249.99,
    discountPrice: 199.99,
    images: [img('Dumbbell Set', '#ede9fe'), img('Dumbbell - single', '#ddd6fe')],
    description:
      'Space-saving adjustable dumbbells, 5-52.5 lbs per hand, replacing 15 sets of weights.',
    rating: 4.6,
    numReviews: 54,
    stock: 8,
    createdAt: daysAgo(75),
  },
  {
    id: 'p11',
    name: 'Organic Face Cream',
    category: 'Beauty',
    price: 29.99,
    discountPrice: 22.99,
    images: [img('Face Cream', '#fce7f3'), img('Face Cream - jar', '#fbcfe8')],
    description:
      'Hydrating organic face cream with shea butter and vitamin E for all skin types.',
    rating: 4.3,
    numReviews: 132,
    stock: 45,
    createdAt: daysAgo(22),
  },
  {
    id: 'p12',
    name: 'Herbal Shampoo & Conditioner Set',
    category: 'Beauty',
    price: 27.99,
    discountPrice: 19.99,
    images: [img('Shampoo Set', '#fce7f3'), img('Shampoo - bottle', '#fbcfe8')],
    description:
      'Sulfate-free herbal shampoo and conditioner duo formulated to nourish and strengthen hair.',
    rating: 4.0,
    numReviews: 61,
    stock: 55,
    createdAt: daysAgo(1),
  },
  {
    id: 'p13',
    name: '4K Ultra HD Smart TV 55"',
    category: 'Electronics',
    price: 599.99,
    discountPrice: 449.99,
    images: [img('Smart TV', '#dbeafe'), img('Smart TV - stand', '#bfdbfe')],
    description:
      '55-inch 4K UHD smart TV with HDR support, built-in streaming apps, and voice remote.',
    rating: 4.7,
    numReviews: 189,
    stock: 5,
    createdAt: daysAgo(2),
  },
  {
    id: 'p14',
    name: 'Portable Bluetooth Speaker',
    category: 'Electronics',
    price: 49.99,
    discountPrice: 34.99,
    images: [img('Bluetooth Speaker', '#dbeafe'), img('Speaker - top', '#bfdbfe')],
    description:
      'Compact waterproof Bluetooth speaker with 12-hour playtime and deep bass output.',
    rating: 4.2,
    numReviews: 275,
    stock: 70,
    createdAt: daysAgo(30),
  },
]
