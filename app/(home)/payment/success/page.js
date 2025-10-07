"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isProcessing, setIsProcessing] = useState(true);
  const hasProcessed = useRef(false);

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId || hasProcessed.current) {
        if (!sessionId) router.push("/");
        return;
      }

      hasProcessed.current = true;
      try {
        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (data?.session) {
          handleBookings(sessionId);
        }
        setIsProcessing(false);
      } catch (err) {
        console.error("Verification failed:", err);
        setIsProcessing(false);
      }
    }

    verifyPayment();
  }, [sessionId, router]);

  const handleBookings = async (sessionId) => {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const response = await res.json();
      if (response) {
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Bookings failed:", err);
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>

          <p className="text-gray-600 mb-6">
            Your booking has been confirmed. You'll receive a confirmation email
            shortly.
          </p>

          <div className="space-y-3">
            <Link
              href="/bookings"
              className="block w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary transition"
            >
              View My Bookings
            </Link>

            <Link
              href="/"
              className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
