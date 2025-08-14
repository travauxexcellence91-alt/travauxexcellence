# Travaux-like Backend (Node.js + Express + TypeScript + MongoDB Atlas)

Backend API for a leads marketplace (artisans/particuliers). Payments are intentionally omitted for now.

## Tech

- Express, TypeScript, Mongoose
- JWT auth (roles: artisan, client, admin)
- Minimal modules: auth, sectors, projects/leads

## Quickstart

1. Create a MongoDB Atlas cluster and get a connection string.
2. Copy `.env.example` to `.env` and fill values, or create `.env` using the template below.
3. Install deps and run dev:

```bash
cd backend
npm install
npm run dev
```

API at `http://localhost:$PORT` (default 4000).

### .env template

```
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority&appName=<app>
JWT_SECRET=change-me
CORS_ORIGINS=http://localhost:5173,http://localhost:5174

# INSEE SIRENE API (OAuth2 client credentials)
SIRENE_CLIENT_ID=
SIRENE_CLIENT_SECRET=

# Cloudinary (uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# SMTP (emails)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Travaux <no-reply@domain.com>"

# Twilio (optional SMS)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM=

# Optional for seeding admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin1234
```

## REST Endpoints

- Auth
  - POST `/api/auth/register-artisan` { email, password, siret, companyInfo? }
  - POST `/api/auth/register-client` { email, password, firstName, lastName, city? }
  - POST `/api/auth/login` { email, password }
  - GET `/api/auth/search-company?siret=12345678901234` (recherche d'entreprise par SIRET)
- Me
  - GET `/api/me` (any authenticated)
  - PATCH `/api/me/artisan` (artisan) { companyName?, addressLine1?, city?, postalCode?, logoUrl?, sectorIds?[] }
  - PATCH `/api/me/client` (client) { firstName?, lastName?, city? }
- Sectors
  - GET `/api/sectors`
  - POST `/api/sectors` (admin only)
  - PATCH `/api/sectors/:id` (admin only)
  - DELETE `/api/sectors/:id` (admin only)
- Projects/Leads
  - POST `/api/projects` (client only)
  - GET `/api/projects/mine` (client only)
  - GET `/api/projects/:id` (client owner, artisan with access, or admin)
  - GET `/api/leads` (artisan only)
  - POST `/api/leads/:id/reserve` (artisan only)
  - POST `/api/leads/:id/purchase` (artisan only, simulate purchase -> SOLD + Transaction)
  - GET `/api/me/leads` (artisan only)
- Admin
  - GET `/api/admin/users` | GET `/api/admin/users/:id` | POST `/api/admin/users/:id/toggle-suspension`
  - GET `/api/admin/projects` | PATCH `/api/admin/projects/:id` | DELETE `/api/admin/projects/:id`
  - GET `/api/admin/stats`
  - GET `/api/admin/transactions` | POST `/api/admin/transactions/:id/refund`
- Uploads
  - POST `/api/uploads/artisan/logo` (artisan) multipart form-data: `file`
  - POST `/api/uploads/projects/:id/files` (client) multipart form-data: `files[]`

## Seeding (admin + default sectors)

After `.env` is set, you can seed an admin user and default sectors:

```bash
npm run seed
```

## Next

- Replace simulated payments with a real PSP later.
