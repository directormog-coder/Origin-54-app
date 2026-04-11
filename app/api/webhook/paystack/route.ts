import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; // Updated path
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const hash = crypto
    .createHmac("sha512", secret)
    .update(body)
    .digest("hex");

  // Verify the message actually came from Paystack
  if (hash !== req.headers.get("x-paystack-signature")) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const supabase = await createClient();
    const { metadata } = event.data;

    try {
      // Update your 'orders' table in Supabase
      const { error } = await supabase.from("orders").insert({
        email: event.data.customer.email,
        amount: event.data.amount / 100,
        status: "paid",
        items: metadata?.cartItems || [],
      });

      if (error) throw error;
    } catch (err) {
      console.error("Supabase insert error:", err);
      // Return 200 anyway to stop Paystack from retrying, but log the error
    }
  }

  return NextResponse.json({ status: "success" });
}


