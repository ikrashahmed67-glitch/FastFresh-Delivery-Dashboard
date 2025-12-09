import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 🔐 Supabase client setup using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ✅ Handle POST requests (main website se orders aayenge)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🧾 Insert new order into Supabase
    const { data, error } = await supabase.from("orders").insert([
      {
        customer_name: body.customer_name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        google_location: body.google_location,
        total_amount: body.total_amount,
        items: body.items, // should be an array
        status: body.status || "Pending",
        created_at: body.created_at || new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Order saved to Supabase:", data);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error("❌ API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Optional: To handle other methods
export function GET() {
  return NextResponse.json({ message: "Only POST requests are allowed." }, { status: 405 });
}
