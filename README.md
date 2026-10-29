# CHAMPION SUPPLEMENT

A storefront for a sports-supplement shop. Customers browse and filter products, add them to a cart, and send the order through WhatsApp; there is no online payment. Store staff manage the catalogue from an admin dashboard. The site is available in English and Arabic (with right-to-left layout).

## Features

- 🛒 Shopping cart saved in `localStorage`
- 💳 Checkout by WhatsApp message (cart contents are sent to the shop)
- 🔍 Product filtering and search, product detail pages with image carousel
- 🌐 English / Arabic with RTL support
- 🛠 Admin dashboard: sign in with Supabase Auth, create / edit / delete products, upload product images
- 📱 Responsive layout

## Tech Stack

| Area | Tools |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui (Radix UI) |
| Routing | React Router |
| Data fetching | TanStack React Query |
| Backend | Supabase: PostgreSQL (`products`, `user_roles`), Auth, Storage (`product-images` bucket) |
| i18n | i18next / react-i18next |
| Tests | Vitest |

## Getting Started

**You need:** Node.js 18+ and a Supabase project.

1. Install dependencies:

   ```sh
   npm install
   ```

2. Configure Supabase. Copy `.env.example` to `.env` and fill in your project's ID, URL and publishable (anon) key from the Supabase dashboard (Settings > API):

   ```sh
   cp .env.example .env
   ```

3. Create the database schema by applying the SQL files in `supabase/migrations/` (for example with the Supabase CLI: `supabase db push`).

4. Start the development server, then open <http://localhost:8080>:

   ```sh
   npm run dev
   ```

To use the admin dashboard, create a user in Supabase Auth and add a row for it with the role `admin` in the `user_roles` table.

### Other scripts

```sh
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
npm test          # Vitest
```

## Project Structure

```
src/
├── components/     # UI components (cart, product grid, navbar, admin layout, ...)
├── pages/          # Storefront pages and admin pages
├── hooks/          # Custom hooks (auth, products, ...)
├── contexts/       # Cart context
├── integrations/   # Supabase client and database types
└── data/           # Static data
public/locales/     # en.json and ar.json translations
supabase/           # Supabase config and SQL migrations
```
