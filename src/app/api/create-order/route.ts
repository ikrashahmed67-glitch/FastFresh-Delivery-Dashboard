import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const required = ["customer_name", "phone", "address", "order_items"]
    const missing = required.filter((key) => !body[key])
    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 }
      )
    }

    // ✅ Create Supabase client (Server-side key use karo)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: body.customer_name,
        phone: body.phone,
        address: body.address,
        city: body.city || "Multan",
        order_items: body.order_items,
        total_amount: body.total_amount || 0,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) throw error

    return NextResponse.json({ success: true, message: "✅ Order saved!" })
  } catch (error: any) {
    console.error("API ERROR:", error.message)
    return NextResponse.json(
      { success: false, error: error.message || "Server Error" },
      { status: 500 }
    )
  }
}

// 🧠 Allow only POST (avoid 405 confusion)
export async function GET() {
  return NextResponse.json({ message: "Only POST method allowed" }, { status: 405 })
}
