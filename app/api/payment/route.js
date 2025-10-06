// app/api/auth/payment/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbConnect } from "@/service/mongo";
import { bookingModel } from "@/models/booking-model"; // Adjust import path

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Verify the payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    // Extract metadata
    const { hotelId, userId, checkin, checkout } = session.metadata;

    await dbConnect();

    // Check if booking already exists (prevent duplicates)
    const existingBooking = await bookingModel.findOne({ 
      stripeSessionId: sessionId 
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "Booking already created", booking: existingBooking },
        { status: 200 }
      );
    }

    // Create the booking
    const newBooking = await bookingModel.create({
      hotelId,
      userId,
      checkin,
      checkout,
      stripeSessionId: sessionId,
      paymentStatus: "paid",
      amount: session.amount_total / 100, // Convert from cents
      createdAt: new Date(),
    });

    return NextResponse.json(
      { 
        message: "Booking created successfully",
        booking: newBooking 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}