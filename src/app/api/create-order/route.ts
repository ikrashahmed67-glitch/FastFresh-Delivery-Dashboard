import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("📥 Received order:", data);

    const { error } = await supabase.from("orders").insert([
      {
        customer_name: data.customer_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        google_location: data.google_location,
        subtotal: data.subtotal,
        delivery_charge: data.delivery_charge,
        total_amount: data.total_amount,
        status: data.status || "Pending",
        created_at: new Date().toISOString(),
        order_items: data.order_items,
      },
    ]);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Order saved to Supabase");
    return NextResponse.json({ success: true, message: "Order saved successfully" }, { status: 200 });
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ CORS Support (for requests from main website)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
