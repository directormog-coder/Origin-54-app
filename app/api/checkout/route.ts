import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, amount, metadata } = await request.json();

    // Paystack amounts are in cents (e.g., R150.00 = 15000)
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, 
        callback_url: `${request.headers.get("origin")}/success`,
        metadata,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message);
    }

    // This returns the authorization_url to redirect the user
    return NextResponse.json({ url: data.data.authorization_url });
  } catch (err: any) {
    console.error("Paystack Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
