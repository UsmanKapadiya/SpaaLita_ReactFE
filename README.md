# Spa A'lita – React frontend

Customer website for Spa A'lita: services, shop and gift cards, cart and Stripe checkout, and the customer account area. Built with React 19, TypeScript, Vite, Redux Toolkit (with redux-persist), React Router 7, MUI icons and Bootstrap.

It talks to the Laravel backend (`SpaaLita_Backend`).

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # http://localhost:5173
```

| Script            | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the dev server                                |
| `npm run build`   | Type-check (`tsc -b`), then build into `dist/`      |
| `npm run preview` | Serve the production build locally                  |

### Environment

| Variable                      | Purpose                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL`           | Backend API root, e.g. `http://localhost:5000/api/`                                         |
| `VITE_API_URL`                | Optional. Host serving uploaded images; defaults to `VITE_API_BASE_URL` without `/api`      |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key, from the same Stripe account and mode as the backend's secret key  |

## Project structure

```
src/
├── main.tsx              Entry: Redux provider, persisted store, global CSS
├── App.tsx               All routes
├── Component/            Reusable components (Header, Footer, ProductCatalog, ProtectedRoute, …)
├── Pages/                One folder per page / feature
│   ├── Services/         ServicesPage + ServiceDetailPage (one page for every service,
│   │                     configured in ServicesConstants.ts)
│   ├── Shop/, GiftCard/  Thin wrappers around Component/ProductCatalog
│   ├── CartAndCheckout/  Cart, Stripe checkout, order received
│   └── MyAccount/        Account area (behind ProtectedRoute)
├── Services/             API calls, one file per backend area; api.ts holds the axios instance
├── store/                Redux slices: cart (persisted items) and auth (persisted session)
├── utils/                Constants (booking URLs, contact info), pricing, sorting, coupon helpers
├── types/                Declarations for untyped packages
└── assets/               Images, fonts and global stylesheets
```

### Adding a service page

Add an entry to `SERVICE_DETAILS` in `src/Pages/Services/ServicesConstants.ts` (route, API search term, title, fallback banner and booking URL), and a menu link in `SERVICE_LINKS` in `src/Component/Header/Header.tsx`. The route is created automatically.

### Notes

- File and folder names are case-sensitive on the Linux build servers (Netlify / Vercel): an import must match the file name exactly.
- CSS files are global once imported. The import order in `App.tsx` sets the order of the page stylesheets in the bundle, so keep it when adding pages.
