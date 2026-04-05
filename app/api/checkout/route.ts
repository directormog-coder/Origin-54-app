import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, amount, productName } = await request.json();

    // This automatically detects if you're on Localhost or Vercel
    const origin = request.headers.get("origin");

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), 
        callback_url: `${origin}/success`, // Automatically handles the redirect
        metadata: { 
          custom_fields: [
            { display_name: "Product", variable_name: "product", value: productName }
          ] 
        }
      }),
    });

    const data = await response.json();
    if (!data.status) throw new Error(data.message);

    return NextResponse.json({ url: data.data.authorization_url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
