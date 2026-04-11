import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email, amount, metadata } = await req.json();

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack counts in kobo/cents
        callback_url: `${process.env.NEXT_PUBLIC_URL}/thanks`,
        metadata
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed", message: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}


