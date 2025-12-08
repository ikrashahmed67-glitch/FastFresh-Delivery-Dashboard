# Delivery Dashboard

## Overview
A production-ready delivery order dashboard built with Next.js 14 (App Router), Supabase, and ShadCN UI. This application allows delivery personnel to view and manage delivery orders in real-time.

## Current State
- Fully functional delivery dashboard with email/password authentication
- Real-time order updates using Supabase channels
- API endpoint for order creation from mobile apps
- Order details page with status management
- Mobile-responsive design with TailwindCSS and ShadCN UI

## Features
- **Email/Password Authentication**: Secure login for delivery personnel
- **Real-time Dashboard**: Orders update automatically across all logged-in users
- **Status Management**: Update order status (Pending, On The Way, Delivered)
- **Order Details Page**: Full order information with Google Maps integration
- **API Endpoint**: Create orders programmatically from mobile apps
- **Mobile-First Design**: Responsive card-based UI optimized for all devices

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS, ShadCN UI
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **API**: Next.js API Routes

## Project Structure
```
src/
  app/
    api/
      create-order/route.ts  - API route for order creation
    login/page.tsx           - Login page with email/password
    auth/callback/page.tsx   - Auth callback handler
    dashboard/page.tsx       - Main orders dashboard
    orders/[id]/page.tsx     - Order details page
    page.tsx                 - Root redirect
    layout.tsx               - Root layout
    globals.css              - Global styles
  components/
    ui/                      - ShadCN UI components
  lib/
    supabase.ts              - Supabase client
    types.ts                 - TypeScript types
    utils.ts                 - Utility functions
```

## Routes
- `/` - Root (redirects to dashboard or login)
- `/login` - Login page (email + password)
- `/dashboard` - Orders dashboard (protected)
- `/orders/[id]` - Order details page (protected)
- `/api/create-order` - POST endpoint for creating orders

## API Endpoint

### POST /api/create-order
Creates a new order in the database.

**Request Body:**
```json
{
  "customer_name": "John Doe",
  "phone": "123-456-7890",
  "address": "123 Main St",
  "city": "New York",
  "email": "john@example.com",
  "google_location": "https://maps.google.com/...",
  "notes": "Ring doorbell twice",
  "order_items": "1x Pizza, 2x Soda",
  "subtotal": 25.00,
  "delivery_charge": 5.00,
  "total_amount": 30.00
}
```

**Required fields:** customer_name, phone, address, order_items

**Response:**
```json
{
  "success": true,
  "order": { ... }
}
```

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

## Database Schema
The `orders` table contains:
- id (uuid, primary key)
- customer_name (text)
- email (text)
- phone (text)
- address (text)
- city (text)
- google_location (text)
- notes (text)
- order_items (text)
- subtotal (numeric)
- delivery_charge (numeric)
- total_amount (numeric)
- order_date (timestamptz, default now())
- status (text, default 'Pending')

## Running the Project
The development server runs on port 5000:
```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

## Testing Locally

1. **Login**: Create a user in Supabase Auth dashboard, then login at `/login`

2. **Create Test Order** (via API):
```bash
curl -X POST https://your-domain.replit.dev/api/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Test Customer",
    "phone": "555-1234",
    "address": "456 Oak Avenue",
    "city": "Boston",
    "order_items": "2x Burger, 1x Fries",
    "subtotal": 18.99,
    "delivery_charge": 3.00,
    "total_amount": 21.99
  }'
```

3. **View Dashboard**: Orders appear in real-time at `/dashboard`

4. **Order Details**: Click "View Details" on any order to see full information

## Recent Changes
- December 8, 2025: Enhanced with email/password auth, ShadCN UI, API endpoint, and order details page
