import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecret) {
      console.error("Paystack Webhook Error: PAYSTACK_SECRET_KEY missing in environment variables.");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // 1. Extract raw request body text
    const rawBody = await req.text();

    // 2. Extract signature sent by Paystack
    const paystackSignature = req.headers.get("x-paystack-signature");

    if (!paystackSignature) {
      console.warn("Paystack Webhook Warning: Missing signature header.");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // 3. Generate expected HMAC SHA-512 hash
    const hash = crypto
      .createHmac("sha512", paystackSecret)
      .update(rawBody)
      .digest("hex");

    // 4. Cryptographically compare signatures (constant-time comparison prevents timing attacks)
    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(paystackSignature)
    );

    if (!isSignatureValid) {
      console.error("Paystack Webhook Security Failure: Invalid cryptographic signature detected!");
      return NextResponse.json(
        { error: "Unauthorized payload signature" },
        { status: 401 }
      );
    }

    // 5. Parse event payload after signature verification
    const event = JSON.parse(rawBody);

    // 6. Handle verified payment events
    switch (event.event) {
      case "charge.success": {
        const paymentData = event.data;
        const reference = paymentData.reference;
        const amountPaid = paymentData.amount / 100; // Paystack sends amounts in lowest currency unit (cents/kobo)
        const currency = paymentData.currency;
        const customerEmail = paymentData.customer?.email;

        console.log(`[Paystack Success] Ref: ${reference} | Amount: ${amountPaid} ${currency} | User: ${customerEmail}`);

        // TODO: Update Supabase order status to 'PAID' or trigger fulfillment workflow

        break;
      }

      default:
        console.log(`[Paystack Unhandled Event]: ${event.event}`);
    }

    return NextResponse.json({ status: "success", received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Paystack Webhook Processing Exception:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
