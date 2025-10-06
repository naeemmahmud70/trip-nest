"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PaymentForm = ({ loggedInUser, hotelInfo, checkin, checkout }) => {
  console.log("info", hotelInfo);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const hotelId = hotelInfo?.id;
      const userId = loggedInUser?.id;
      const amount = (hotelInfo?.highRate + hotelInfo?.lowRate) / 2;
      console.log(hotelId, userId, amount);

      // Create checkout session
      const res = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelId,
          userId,
          hotelName: hotelInfo?.name,
          amount,
          checkin,
          checkout,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create checkout session");
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        setError(stripeError.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError("Payment processing failed. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <form className="my-8" onSubmit={onSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={loggedInUser?.name}
          disabled
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md bg-gray-50"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={loggedInUser?.email}
          disabled
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md bg-gray-50"
        />
      </div>

      <div className="my-4 space-y-2">
        <span className="block font-medium">Check in</span>
        <input
          type="date"
          name="checkin"
          value={checkin}
          id="checkin"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md bg-gray-50"
        />
      </div>

      <div className="my-4 space-y-2">
        <span className="block font-medium">Checkout</span>
        <input
          type="date"
          name="checkout"
          value={checkout}
          id="checkout"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md bg-gray-50"
        />
      </div>

      <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Test Mode:</strong> You'll be redirected to Stripe's secure
          checkout page.
          <br />
          Use test card:{" "}
          <code className="bg-white px-2 py-1 rounded">
            4242 4242 4242 4242
          </code>
        </p>
      </div>

      <button
        disabled={hotelInfo?.isBooked || isLoading}
        type="submit"
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading
          ? "Processing..."
          : `Pay Now ($${(hotelInfo?.highRate + hotelInfo?.lowRate) / 2})`}
      </button>
    </form>
  );
};

export default PaymentForm;
