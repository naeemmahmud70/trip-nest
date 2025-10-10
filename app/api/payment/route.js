import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbConnect } from "@/service/mongo";
import { bookingModel } from "@/models/booking-model";
import { getUserById } from "@/database/queries";
import { sendBookingConfirmation } from "@/lib/bookingConfirmation";

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
    const { hotelId, userId, hotelName, amount, checkin, checkout } =
      session?.metadata;
    await dbConnect();
    const userdetails = await getUserById(userId);

    const existingBooking = await bookingModel.findOne({
      stripeSessionId: sessionId,
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "Booking already created!", booking: existingBooking },
        { status: 200 }
      );
    }

    // Create the booking
    const newBooking = await bookingModel.create({
      hotelId,
      hotelName,
      userId,
      checkin,
      checkout,
      amount,
      stripeSessionId: sessionId,
      paymentStatus: "paid",
      createdAt: new Date(),
    });
    if (newBooking) {
      const name = userdetails[0]?.name;
      const email = userdetails[0]?.email;

      await sendBookingConfirmation(
        hotelId,
        hotelName,
        userId,
        checkin,
        checkout,
        amount,
        name,
        email
      );
    }

    return NextResponse.json(
      {
        status: 201,
        message: "Booking created successfully!",
        booking: newBooking,
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
