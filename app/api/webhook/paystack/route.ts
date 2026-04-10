import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
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

    // Update your 'orders' table in Supabase
    await supabase.from("orders").insert({
      email: event.data.customer.email,
      amount: event.data.amount / 100,
      status: "paid",
      items: metadata.cartItems,
    });
  }

  return NextResponse.json({ status: "success" });
}
