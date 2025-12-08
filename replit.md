# Delivery Dashboard

## Overview
A production-ready delivery order dashboard built with Next.js 14 (App Router) and Supabase. This application allows delivery personnel to view and manage delivery orders in real-time.

## Current State
- Fully functional delivery dashboard with authentication
- Real-time order updates using Supabase channels
- Mobile-responsive design with TailwindCSS

## Features
- **Magic Link Authentication**: Secure passwordless login via email
- **Real-time Dashboard**: Orders update automatically across all logged-in users
- **Status Management**: Update order status (Pending, Out for delivery, Delivered, Cancelled)
- **Mobile-First Design**: Responsive card-based UI optimized for all devices

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)

## Project Structure
```
src/
  app/
    login/page.tsx       - Login page with magic link
    auth/callback/page.tsx - Auth callback handler
    dashboard/page.tsx   - Main orders dashboard
    page.tsx             - Root redirect
    layout.tsx           - Root layout
    globals.css          - Global styles
  lib/
    supabase.ts          - Supabase client
    types.ts             - TypeScript types
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
- order_date (timestamptz)
- status (text, default 'Pending')

## Running the Project
The development server runs on port 5000:
```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

## Recent Changes
- December 8, 2025: Initial project setup with complete authentication flow and real-time dashboard
