import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { CreateOrderRequest, OrderStatus } from '@/lib/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const VALID_STATUSES: OrderStatus[] = ['Pending', 'On The Way', 'Delivered', 'Cancelled']

// ✅ Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()

    // ✅ CORS headers for POST response
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    if (!body.customer_name || !body.phone || !body.address || !body.order_items) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: customer_name, phone, address, order_items' },
        { status: 400, headers: corsHeaders }
      )
    }

    const status = body.status && VALID_STATUSES.includes(body.status) 
      ? body.status 
      : 'Pending'

    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_name: body.customer_name,
        email: body.email || null,
        phone: body.phone,
        address: body.address,
        city: body.city || null,
        google_location: body.google_location || null,
        notes: body.notes || null,
        order_items: body.order_items || '',
        subtotal: body.subtotal || 0,
        delivery_charge: body.delivery_charge || 0,
        total_amount: body.total_amount || 0,
        status,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500, headers: corsHeaders }
      )
    }

    return NextResponse.json(
      { success: true, order: data },
      { status: 201, headers: corsHeaders }
    )
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    )
  }
}
