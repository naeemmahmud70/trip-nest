import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { hotelId, userId, hotelName, amount, checkin, checkout } =
      await request.json();
    console.log(
      "hotelId, userId, hotelName, amount, checkin, checkout",
      hotelId,
      userId,
      hotelName,
      amount,
      checkin,
      checkout
    );

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: hotelName || "Hotel Booking",
              description: `Check-in: ${checkin} | Check-out: ${checkout}`,
            },
            unit_amount: Math.round(amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/payment/cancel`,
      metadata: {
        hotelId,
        userId,
        checkin,
        checkout,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
