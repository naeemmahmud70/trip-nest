import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { sessionId } = await req.json();

    // Retrieve checkout session securely from server
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return Response.json({ session });
  } catch (error) {
    console.error("Stripe verify error:", error);
    return Response.json({ error: "Failed to verify session" }, { status: 500 });
  }
}
