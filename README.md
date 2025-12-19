# Top Faceless YouTube Niches - SaaS

A complete SaaS web application for discovering high-earning faceless YouTube niches. Built with Next.js 14 (App Router), TypeScript, Prisma, Stripe, and NextAuth.

## Features

- **Top 50 Niches Grid**: Browsable grid of curated niches with locking mechanism.
- **Trending Section**: Real-time trending niches with revenue stats.
- **Premium System**: Lifetime access ($29) via Stripe to unlock full details.
- **Authentication**: User registration and login (Credentials) with role management.
- **Admin Dashboard**: Manage niches (CRUD), toggle trending status, and set premium access.
- **Secure Payments**: Stripe Checkout and Webhook integration.
- **Database**: SQLite (local) / PostgreSQL (production ready with Prisma).

## Tech Stack

- **Framework**: Next.js 14 + React 19
- **Database**: Prisma ORM + SQLite
- **Styling**: TailwindCSS v4
- **Auth**: NextAuth.js v4
- **Payments**: Stripe SDK
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd youtubeniches
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="supersecretkey123" # Generate a random string

# Stripe Keys (Get from Stripe Dashboard)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 3. Database Setup

Initialize the database and seed it with 60+ niches:

```bash
# Run migrations (This creates dev.db)
npx prisma migrate dev --name init

# Seed the database
npx prisma db seed
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Admin Access

The seed script does not create an admin user by default. Register a new user at `/register`, then manually update the database to make them an admin (using Prisma Studio):

```bash
npx prisma studio
```
Find your user in the User model and set `isAdmin` to `true`.
Access dashboard at `/admin`.

## Deployment (Vercel)

1. Push code to GitHub.
2. Import project in Vercel.
3. Add Environment Variables in Vercel Project Settings. 
   - Note: For production, switch `DATABASE_URL` to a PostgreSQL provider (e.g. Supabase, Neon) and update `schema.prisma` provider to `postgresql`.
4. Deploy.

## Stripe Webhook (Local Dev)

To test payments locally:
1. Install Stripe CLI.
2. Run `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
3. Copy the webhook secret to `.env`.
