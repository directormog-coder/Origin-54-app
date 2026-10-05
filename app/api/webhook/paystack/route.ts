import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    
    // Safety check for missing env variable during runtime or build
    if (!paystackSecret) {
      console.error("PAYSTACK_SECRET_KEY is missing from environment variables.");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature header" },
        { status: 400 }
      );
    }

    const body = await req.text();

    // Verify HMAC SHA512 signature
    const expectedHash = crypto
      .createHmac("sha512", paystackSecret)
      .update(body)
      .digest("hex");

    if (expectedHash !== signature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const supabase = await createClient();
      const { metadata, customer, amount, reference } = event.data || {};

      const { error } = await (supabase.from("orders") as any).insert({
        email: customer?.email,
        amount: amount ? amount / 100 : 0,
        status: "paid",
        items: metadata?.cartItems || [],
        paystack_reference: reference,
        customer_details: metadata?.customer || null,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: "Failed to record order" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    console.error("Paystack webhook error:", err.message);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
