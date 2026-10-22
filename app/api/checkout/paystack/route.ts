import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecret) {
      return NextResponse.json(
        { error: "Paystack secret key is missing." },
        { status: 500 }
      );
    }

    const { email, amountZAR, items, shippingAddress } = await req.json();

    if (!email || !amountZAR) {
      return NextResponse.json(
        { error: "Email and order amount are required." },
        { status: 400 }
      );
    }

    // Paystack accepts amount in lowest currency unit (cents for ZAR)
    const amountInCents = Math.round(amountZAR * 100);
    const reference = `ORIGIN54_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInCents,
        currency: "ZAR",
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://origin-54-app.vercel.app"}/account`,
        metadata: {
          items,
          shippingAddress,
        },
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || "Failed to initialize Paystack checkout." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error: any) {
    console.error("Checkout Initialization Error:", error);
    return NextResponse.json(
      { error: "Internal server error during checkout initialization." },
      { status: 500 }
    );
  }
}
