import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("📥 Incoming Order Data:", body)

    const {
      customer_name,
      phone,
      address,
      order_items,
      city,
      email,
      google_location,
      subtotal,
      delivery_charge,
      total_amount,
      notes,
      status,
      created_at,
    } = body

    // 🧩 Validate required fields
    if (!customer_name || !phone || !address || !order_items) {
      return NextResponse.json(
        { error: "Missing required fields: customer_name, phone, address, order_items", success: false },
        { status: 400 }
      )
    }

    // 🗄️ Insert into Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name,
          phone,
          address,
          city,
          email,
          google_location,
          subtotal,
          delivery_charge,
          total_amount,
          notes,
          status: status || "Pending",
          order_items,
          created_at: created_at || new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("❌ Supabase insert error:", error)
      return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }

    console.log("✅ Order saved successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error("❌ API Error:", err)
    return NextResponse.json({ error: "Server error", success: false }, { status: 500 })
  }
}
