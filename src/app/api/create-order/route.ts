import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("✅ Order received from main site:", body);

    // --- Supabase connection ---
    const res = await fetch("https://yaflexlocwmhocjfrpov.supabase.co/rest/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        delivery_address: body.delivery_address,
        city: body.city,
        google_location: body.google_location,
        total_amount: body.total_amount,
        items: body.items,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Supabase insert failed:", text);
      return NextResponse.json({ error: "Failed to insert in Supabase" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Error in create-order API:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ Allow CORS (important)
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
