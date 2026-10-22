import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecret) {
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const rawBody = await req.text();
    const paystackSignature = req.headers.get("x-paystack-signature");

    if (!paystackSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const hash = crypto
      .createHmac("sha512", paystackSecret)
      .update(rawBody)
      .digest("hex");

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(paystackSignature)
    );

    if (!isSignatureValid) {
      return NextResponse.json({ error: "Unauthorized payload signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === "charge.success") {
      const paymentData = event.data;
      const reference = paymentData.reference;

      // Update order status in Supabase orders table
      const { error } = await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("paystack_reference", reference);

      if (error) {
        console.error("Failed to update order status in Supabase:", error);
      } else {
        console.log(`[Paystack Success] Order ${reference} updated to PAID.`);
      }
    }

    return NextResponse.json({ status: "success", received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Paystack Webhook Exception:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
