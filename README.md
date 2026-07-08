# ShopEase — React + Tailwind Ecommerce Demo

A fully functional, front-end-only ecommerce site. No backend — all data (products,
users, cart, orders) lives in `localStorage`.

## Tech Stack
- React 18 + Vite
- React Router v6
- Tailwind CSS v3
- Plain JavaScript (no TypeScript)
- `localStorage` for persistence — no server, no paid APIs

## How to Run Locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

Other scripts:
```bash
npm run build     # production build into dist/
npm run preview   # preview the production build
```

## Folder Structure

```
ecommerce-app/
  index.html
  package.json
  tailwind.config.js
  postcss.config.js
  vite.config.js
  src/
    main.jsx                 # entry point, wraps app in all providers
    App.jsx                  # route table
    index.css                # Tailwind directives
    data/
      products.js             # 14 seed products
    context/
      AuthContext.jsx         # users, login/signup/logout
      ProductContext.jsx      # product catalog CRUD
      CartContext.jsx         # cart lines, totals (tax/shipping/subtotal)
      OrderContext.jsx        # order creation + history lookup
    components/
      Header.jsx, Footer.jsx, ProductCard.jsx, StarRating.jsx
      ProtectedRoute.jsx      # RequireAuth / RequireAdmin route guards
    pages/
      Home.jsx
      ProductListing.jsx      # search, category filter, sort
      ProductDetail.jsx       # gallery, qty selector, related products
      Cart.jsx
      Checkout.jsx            # customer + shipping + payment form
      OrderConfirmation.jsx
      Login.jsx                # login + signup tabs
      Account.jsx              # profile + order history
      Admin.jsx                 # product management (add/edit/delete)
      NotFound.jsx
    utils/
      storage.js               # localStorage read/write helpers
      placeholder.js            # generates offline SVG placeholder images
      format.js                 # currency + discount% formatting
```

## Demo Accounts

- **Admin:** `admin@shop.com` / `admin123` (seeded automatically)
- Or sign up as a new customer at `/login` → Sign Up tab. There's also an
  "admin account" checkbox on signup for testing the admin panel.

## Assumptions Made

1. **No backend** — everything persists in the browser's `localStorage`, keyed
   under `ecom_products`, `ecom_users`, `ecom_current_user`, `ecom_cart`, `ecom_orders`.
   Clearing browser storage resets the demo.
2. **Passwords stored in plain text in localStorage.** This is fine for a
   front-end-only demo but is **not secure** and must never be done in a real
   product with a real backend.
3. **Product images** are generated as inline SVG data URIs (no external image
   host), so the app works fully offline with no broken-image risk.
4. **Admin access** is granted via a `role: 'admin'` field on the user record.
   The signup form exposes a checkbox to self-register as admin, purely to make
   the admin panel reachable without a seeded database — in a real app this
   would never be user-selectable.
5. **Tax** is a flat 8% of subtotal; **shipping** is a flat $6.99, free over $75
   subtotal — arbitrary demo values, easy to change in `CartContext.jsx`.
6. **Cart is global (not per-user)** in localStorage — it persists across login/logout
   in this demo for simplicity, similar to many real storefronts that merge a
   guest cart into the account at checkout.
7. **Stock decrements** on successful order placement; there's no inventory
   reservation/rollback logic since there's no concurrent multi-user backend.
8. Payment method selection (Card / COD / UPI) is for UI completeness only —
   no real payment processing or validation beyond basic format checks.

## Verified Working End-to-End

Browse → search/filter/sort → product detail → add to cart → cart quantity/remove
→ login/signup → checkout (form validation, order summary) → place order →
order confirmation → order history in account page → admin add/edit/delete
product with live stock updates.
